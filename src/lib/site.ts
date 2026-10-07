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
  phone: "+880 1620 309061",
  // Digits only, for wa.me links.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801620309061",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://easypod.studio",
  address: {
    street: "Salam Tower, Vatara",
    locality: "Dhaka",
    region: "Dhaka",
    country: "BD",
  },
  // Google Maps has no listing for Salam Tower yet, so the map and directions
  // anchor on nearby Evercare Hospital. Once the studio has its own Google
  // Business listing, swap in its "Embed a map" and share URLs.
  mapEmbedSrc:
    "https://maps.google.com/maps?q=Evercare%20Hospital%20Dhaka&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Evercare+Hospital+Dhaka",
  // YouTube ID of the studio tour. While null, the tour section is hidden and
  // the hero links to the gear section instead.
  studioTourVideoId: null as string | null,
  social: {
    instagram: "https://instagram.com/easypodstudio",
    youtube: "https://youtube.com/@easypodstudio",
    facebook: "https://facebook.com/easypodstudio",
    tiktok: "https://tiktok.com/@easypodstudio",
  },
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
