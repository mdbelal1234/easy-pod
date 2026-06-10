"use server";

import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { revalidatePath } from "next/cache";

export async function createLead(formData: unknown) {
  const parsed = leadSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const data = parsed.data;

  try {
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        source: data.source as never,
      },
    });

    // Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Lead: ${data.name} (${data.source})`,
      html: `
        <div style="font-family:Inter,sans-serif;padding:24px">
          <h2>New Lead</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "—"}</p>
          <p><strong>Company:</strong> ${data.company || "—"}</p>
          <p><strong>Source:</strong> ${data.source}</p>
          <p><strong>Message:</strong> ${data.message || "—"}</p>
        </div>
      `,
    });

    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err) {
    console.error("Lead creation failed:", err);
    return { error: "Failed to submit. Please try again." };
  }
}
