import { site } from "@/lib/site";

/**
 * Booking alerts to the studio's own WhatsApp through Meta's WhatsApp Cloud
 * API. Messages the business starts must use a template Meta has approved;
 * the template text lives in DEPLOYMENT.md ("WhatsApp booking alerts").
 * Without WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID it does nothing.
 */
const API_VERSION = process.env.WHATSAPP_API_VERSION || "v23.0";
const TEMPLATE = process.env.WHATSAPP_TEMPLATE || "new_booking";
const TEMPLATE_LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";

/** Template parameters may not contain newlines, tabs or long runs of spaces. */
const param = (value: string) => ({
  type: "text" as const,
  text: value.replace(/\s+/g, " ").trim().slice(0, 300) || "-",
});

export const whatsappConfigured = () =>
  Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);

/** Fills the template's {{1}}..{{n}} in order. Throws with Meta's error message on failure. */
export async function sendStudioAlert(params: string[]) {
  const to = (process.env.WHATSAPP_NOTIFY_TO || site.whatsapp).replace(/\D/g, "");

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: TEMPLATE,
          language: { code: TEMPLATE_LANGUAGE },
          components: [{ type: "body", parameters: params.map(param) }],
        },
      }),
      signal: AbortSignal.timeout(10_000),
    }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(`WhatsApp ${res.status}: ${body?.error?.message ?? res.statusText}`);
  }
}
