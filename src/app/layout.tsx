import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://easypod.studio"
  ),
  title: {
    default: "Easy Pod — Professional Podcast Studio in Bangladesh",
    template: "%s | Easy Pod",
  },
  description:
    "Record, livestream, and produce studio-quality podcasts at Easy Pod. Professional audio, multi-camera video, and full editing support in Dhaka, Bangladesh.",
  keywords: [
    "podcast studio bangladesh",
    "podcast recording studio",
    "video podcast studio",
    "podcast production service",
    "podcast studio dhaka",
    "professional podcast recording",
  ],
  authors: [{ name: "Easy Pod" }],
  creator: "Easy Pod",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easypod.studio",
    siteName: "Easy Pod",
    title: "Easy Pod — Professional Podcast Studio in Bangladesh",
    description:
      "Record, livestream, and produce studio-quality podcasts at Easy Pod.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Easy Pod Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Pod — Professional Podcast Studio",
    description: "Record, livestream, and produce studio-quality podcasts.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
