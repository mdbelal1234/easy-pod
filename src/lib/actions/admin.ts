"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { resend, FROM_EMAIL } from "@/lib/resend";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}

// ─── Booking Actions ──────────────────────────────────────────────────────────

export async function updateBookingStatus(
  bookingId: string,
  status: "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED",
  adminNotes?: string
) {
  await requireAdmin();

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status, adminNotes },
  });

  // Notify client of status change
  if (status === "APPROVED" || status === "REJECTED") {
    const subject =
      status === "APPROVED"
        ? "Your Booking is Confirmed! — Easy Pod"
        : "Booking Update — Easy Pod";
    const message =
      status === "APPROVED"
        ? `Great news! Your session on ${booking.preferredDate.toDateString()} at ${booking.preferredTime} has been confirmed.`
        : `We're sorry, but your requested session couldn't be accommodated. Please rebook at your convenience.`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject,
      html: `
        <div style="font-family:Inter,sans-serif;padding:24px">
          <h2 style="color:#7c3aed">Easy Pod Studio</h2>
          <p>Hi ${booking.name},</p>
          <p>${message}</p>
          ${adminNotes ? `<p><strong>Note:</strong> ${adminNotes}</p>` : ""}
          <p>Reach us on WhatsApp if you have questions.</p>
        </div>
      `,
    });
  }

  revalidatePath("/admin/bookings");
  return { success: true };
}

// ─── Lead Actions ─────────────────────────────────────────────────────────────

export async function updateLeadStatus(
  leadId: string,
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST",
  notes?: string
) {
  await requireAdmin();
  await prisma.lead.update({
    where: { id: leadId },
    data: { status, notes },
  });
  revalidatePath("/admin/leads");
  return { success: true };
}

// ─── CRUD helpers ─────────────────────────────────────────────────────────────

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/testimonials");
}

export async function deleteFAQ(id: string) {
  await requireAdmin();
  await prisma.fAQ.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/faqs");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/services");
}

export async function deletePackage(id: string) {
  await requireAdmin();
  await prisma.package.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/packages");
}

export async function deleteGallery(id: string) {
  await requireAdmin();
  await prisma.gallery.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/gallery");
}

export async function upsertSiteSetting(key: string, value: string, group = "general") {
  await requireAdmin();
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value, group },
  });
  revalidatePath("/admin/settings");
}
