"use server";

import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { formatTaka, packages } from "@/lib/packages";
import { dayRange, fits, holdingStatuses, isIsoDate, occupiedHours, parseSlot } from "@/lib/schedule";
import { resend, emailConfigured, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { sendStudioAlert, whatsappConfigured } from "@/lib/whatsapp";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

export async function createBooking(formData: unknown) {
  const parsed = bookingSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: "Invalid form data", details: parsed.error.flatten() };
  }

  const data = parsed.data;
  const hours = Number(data.hours);
  const start = parseSlot(data.preferredTime);
  if (!isIsoDate(data.preferredDate) || start === null) {
    return { error: "Invalid form data" };
  }

  try {
    // The form only offers free times, but someone may have booked since.
    const sameDay = await prisma.booking.findMany({
      where: {
        deletedAt: null,
        status: { in: [...holdingStatuses] },
        preferredDate: dayRange(data.preferredDate),
      },
      select: { preferredTime: true, durationHours: true },
    });
    if (!fits(start, hours, occupiedHours(sameDay))) {
      return {
        error: "That time was just booked. Pick another start time.",
        slotTaken: true,
      };
    }

    // Packages are defined in code; link to the matching DB row when it exists.
    const pkg = data.package
      ? await prisma.package.findUnique({ where: { slug: data.package }, select: { id: true } })
      : null;
    const chosen = packages.find((p) => p.slug === data.package);
    const notes =
      chosen && !pkg
        ? [`Package: ${chosen.name}`, data.notes].filter(Boolean).join("\n\n")
        : data.notes;

    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        packageId: pkg?.id ?? null,
        recordingType: data.recordingType as never,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        durationHours: hours,
        // The estimate the visitor saw; admins can still change the final price.
        totalAmount: chosen ? chosen.price * hours : null,
        notes,
      },
      include: { package: true },
    });

    // The booking is saved; notifications run after the response and their
    // failures are logged, never shown to the visitor as a failed booking.
    const packageName = booking.package ?? (chosen ? { name: chosen.name } : null);
    after(() => notifyBooking({ ...booking, package: packageName }));

    revalidatePath("/admin/bookings");
    return { success: true, bookingId: booking.id };
  } catch (err) {
    console.error("Booking creation failed:", err);
    return { error: "Failed to create booking. Please try again." };
  }
}

type SavedBooking = Parameters<typeof adminBookingNotification>[0] & {
  email: string;
  recordingType: string;
};

async function notifyBooking(booking: SavedBooking) {
  const sendEmail = async (to: string, subject: string, html: string) => {
    if (!emailConfigured) {
      console.warn(`RESEND_API_KEY is not set; skipped email "${subject}"`);
      return;
    }
    const { error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
    if (error) throw new Error(`Resend: ${error.message}`);
  };

  const jobs: [string, Promise<void>][] = [
    [
      "client email",
      sendEmail(booking.email, "Booking Received — Easy Pod Studio", bookingConfirmationEmail(booking)),
    ],
    [
      "admin email",
      sendEmail(
        ADMIN_EMAIL,
        `New Booking: ${booking.name} — ${booking.recordingType}`,
        adminBookingNotification(booking)
      ),
    ],
  ];

  if (whatsappConfigured()) {
    const estimate = booking.totalAmount ? `, est. ${formatTaka(Number(booking.totalAmount))}` : "";
    jobs.push([
      "WhatsApp alert",
      sendStudioAlert([
        booking.name,
        booking.phone,
        booking.preferredDate.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }),
        booking.preferredTime,
        hoursLabel(booking.durationHours),
        `${booking.package?.name ?? "Not sure yet"}${estimate}`,
        booking.recordingType.replace("_", " ").toLowerCase(),
      ]),
    ]);
  }

  const results = await Promise.allSettled(jobs.map(([, job]) => job));
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`Booking ${jobs[i][0]} failed:`, result.reason);
    }
  });
}

const hoursLabel = (h: number) => `${h} hour${h === 1 ? "" : "s"}`;

function bookingConfirmationEmail(booking: {
  name: string;
  preferredDate: Date;
  preferredTime: string;
  durationHours: number;
  totalAmount?: unknown;
  package?: { name: string } | null;
}): string {
  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <div style="text-align:center;margin-bottom:32px">
        <h1 style="color:#7c3aed;font-size:24px">Easy Pod Studio</h1>
      </div>
      <h2 style="color:#111">Booking Received!</h2>
      <p style="color:#555">Hi ${booking.name},</p>
      <p style="color:#555">Thanks for booking a session at Easy Pod! We've received your request and will confirm your booking within 24 hours.</p>
      <div style="background:#f9f7ff;border:1px solid #e5deff;border-radius:12px;padding:20px;margin:24px 0">
        <p style="margin:0 0 8px;color:#555"><strong>Date:</strong> ${booking.preferredDate.toDateString()}</p>
        <p style="margin:0 0 8px;color:#555"><strong>Time:</strong> ${booking.preferredTime}, ${hoursLabel(booking.durationHours)}</p>
        ${booking.package ? `<p style="margin:0 0 8px;color:#555"><strong>Package:</strong> ${booking.package.name}</p>` : ""}
        ${booking.totalAmount ? `<p style="margin:0;color:#555"><strong>Estimate:</strong> ${formatTaka(Number(booking.totalAmount))}</p>` : ""}
      </div>
      <p style="color:#555">We'll reach out on WhatsApp to confirm your booking shortly.</p>
      <p style="color:#888;font-size:14px">Easy Pod Studio · Dhaka, Bangladesh</p>
    </div>
  `;
}

function adminBookingNotification(booking: {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  recordingType: string;
  preferredDate: Date;
  preferredTime: string;
  durationHours: number;
  totalAmount?: unknown;
  package?: { name: string } | null;
  notes?: string | null;
}): string {
  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <h2>New Booking Request</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Name</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Phone</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.phone}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Company</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.company || "—"}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Type</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.recordingType}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Date</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.preferredDate.toDateString()}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Time</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.preferredTime}, ${hoursLabel(booking.durationHours)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Estimate</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.totalAmount ? formatTaka(Number(booking.totalAmount)) : "—"}</td></tr>
        <tr><td style="padding:8px"><strong>Notes</strong></td><td style="padding:8px">${booking.notes || "—"}</td></tr>
      </table>
    </div>
  `;
}
