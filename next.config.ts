import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  // Compress output
  compress: true,
  // Power with Next.js server
  poweredByHeader: false,
  // The site used to have separate pages; send old links to the matching section.
  async redirects() {
    return [
      { source: "/studio", destination: "/#studio", permanent: true },
      { source: "/services", destination: "/#studio", permanent: true },
      { source: "/pricing", destination: "/#pricing", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/booking", destination: "/#book", permanent: true },
    ];
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
