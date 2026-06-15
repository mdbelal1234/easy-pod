/**
 * Central place for brand + contact details used across the marketing site.
 * Swap the placeholder media IDs / coordinates for production values.
 */
export const site = {
  name: "EasyPod Studio",
  tagline: "Bangladesh's Premium Video Podcast Studio",
  city: "Dhaka",
  country: "Bangladesh",
  email: "hello@easypod.studio",
  phone: "+880 1700 000000",
  // Digits only, for wa.me links (replace with the real WhatsApp number).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://easypod.studio",
  address: {
    street: "Gulshan Avenue",
    locality: "Dhaka",
    region: "Dhaka",
    country: "BD",
  },
  // Google Maps embed centred on Gulshan, Dhaka (placeholder — replace with the
  // studio's exact "Embed a map" share URL from Google Maps).
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.4125!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000",
  mapsLink: "https://maps.google.com/?q=EasyPod+Studio+Gulshan+Dhaka",
  // Replace with the real YouTube video IDs.
  studioTourVideoId: "aqz-KE-bpKQ",
  social: {
    instagram: "https://instagram.com/easypodstudio",
    youtube: "https://youtube.com/@easypodstudio",
    facebook: "https://facebook.com/easypodstudio",
    tiktok: "https://tiktok.com/@easypodstudio",
  },
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
