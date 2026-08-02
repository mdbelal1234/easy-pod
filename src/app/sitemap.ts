import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easypod.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/studio`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/booking`, changeFrequency: "weekly" as const, priority: 1 },
  ];

  return staticRoutes.map((route) => ({
    ...route,
    lastModified: new Date(),
  }));
}
