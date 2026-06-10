"use server";

import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: unknown) {
  const parsed = bookingSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: "Invalid form data", details: parsed.error.flatten() };
  }

  const data = parsed.data;

  try {
    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        packageId: data.packageId || null,
        recordingType: data.recordingType as never,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        notes: data.notes,
      },
      include: { package: true },
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Booking Received — Easy Pod Studio",
      html: bookingConfirmationEmail(booking),
    });

    // Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${data.name} — ${data.recordingType}`,
      html: adminBookingNotification(booking),
    });

    revalidatePath("/admin/bookings");
    return { success: true, bookingId: booking.id };
  } catch (err) {
    console.error("Booking creation failed:", err);
    return { error: "Failed to create booking. Please try again." };
  }
}

function bookingConfirmationEmail(booking: {
  name: string;
  preferredDate: Date;
  preferredTime: string;
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
        <p style="margin:0 0 8px;color:#555"><strong>Time:</strong> ${booking.preferredTime}</p>
        ${booking.package ? `<p style="margin:0;color:#555"><strong>Package:</strong> ${booking.package.name}</p>` : ""}
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
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Time</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${booking.preferredTime}</td></tr>
        <tr><td style="padding:8px"><strong>Notes</strong></td><td style="padding:8px">${booking.notes || "—"}</td></tr>
      </table>
    </div>
  `;
}
