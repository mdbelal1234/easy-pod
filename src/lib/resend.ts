import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "noreply@easypod.studio";
export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "admin@easypod.studio";
