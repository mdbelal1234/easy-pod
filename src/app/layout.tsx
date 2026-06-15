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
    default: "EasyPod Studio — Premium Podcast Studio in Dhaka, Bangladesh",
    template: "%s | EasyPod Studio",
  },
  description:
    "Record, produce, and grow your podcast at EasyPod Studio Dhaka. Multi-camera video, studio-grade audio, expert lighting, and full editing support in Gulshan, Dhaka, Bangladesh.",
  keywords: [
    "podcast studio bangladesh",
    "video podcast studio dhaka",
    "podcast recording studio dhaka",
    "podcast production bangladesh",
    "podcast editing services dhaka",
    "podcast studio dhaka",
  ],
  authors: [{ name: "EasyPod Studio" }],
  creator: "EasyPod Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easypod.studio",
    siteName: "EasyPod Studio",
    title: "EasyPod Studio — Premium Podcast Studio in Dhaka, Bangladesh",
    description:
      "Bangladesh's premium video podcast studio. Multi-camera recording, studio-grade audio, and full production support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EasyPod Studio — Dhaka video podcast studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyPod Studio — Premium Podcast Studio in Dhaka",
    description:
      "Record your video podcast in Dhaka with multi-camera production and studio-grade audio.",
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
