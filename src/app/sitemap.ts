import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easypod.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site: the home page is the only public route.
  const staticRoutes = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
  ];

  return staticRoutes.map((route) => ({
    ...route,
    lastModified: new Date(),
  }));
}
