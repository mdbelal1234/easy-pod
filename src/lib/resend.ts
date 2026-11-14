import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// Without a key, emails are skipped instead of crashing every page that
// imports this module (the Resend constructor throws on a missing key).
export const emailConfigured = Boolean(apiKey);
export const resend = new Resend(apiKey || "re_not_configured");

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "noreply@easypod.studio";
export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "admin@easypod.studio";
