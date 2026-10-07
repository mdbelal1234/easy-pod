/**
 * Studio packages. Shown in the pricing section and the booking form.
 * `slug` matches the Package rows in the database so bookings stay linked.
 */
export const packages = [
  {
    slug: "starter-session",
    name: "Starter Session",
    price: 1500,
    pitch: "One clean 4K angle for your first episodes.",
    cameras: 1,
    featured: false,
  },
  {
    slug: "creator-pro",
    name: "Creator Pro",
    price: 2000,
    pitch: "Two angles that keep viewers watching longer.",
    cameras: 2,
    featured: true,
  },
  {
    slug: "studio-signature",
    name: "Studio Signature",
    price: 2500,
    pitch: "Three cameras, produced like a professional show.",
    cameras: 3,
    featured: false,
  },
] as const;

export type PackageSlug = (typeof packages)[number]["slug"];

export const packageSlugs = packages.map((p) => p.slug) as [PackageSlug, ...PackageSlug[]];

export const formatTaka = (amount: number) => `৳${amount.toLocaleString("en-US")}`;
