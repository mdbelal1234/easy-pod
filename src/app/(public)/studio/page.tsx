import { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import {
  Check,
  Mic,
  Video,
  Radio,
  Users,
  Zap,
  Monitor,
  Aperture,
  Presentation,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Studio",
  description:
    "Explore Easy Pod Studio — a professional video podcast studio in Dhaka with Sony & DJI cameras, RodeCaster Duo audio, Godox cinematic lighting, premium lenses, and full acoustic treatment.",
};

const equipment: {
  category: string;
  subtitle?: string;
  icon: typeof Video;
  items: string[];
}[] = [
  {
    category: "Professional Multi-Camera Setup",
    subtitle:
      "Capture your podcast from multiple cinematic angles using professional Sony and DJI cameras.",
    icon: Video,
    items: [
      "Sony Alpha 7 IV",
      "Sony ZV-1",
      "DJI Osmo Pocket 3",
      "4K multi-camera synced recording",
    ],
  },
  {
    category: "Premium Lens Collection",
    subtitle:
      "Beautiful background blur, wide-angle shots, portrait close-ups, product shots, and cinematic B-roll.",
    icon: Aperture,
    items: [
      "Sony FE 85mm F1.8",
      "Sony FE 35mm F1.8",
      "Tamron 17-28mm F2.8",
      "Sony 18-105mm F4",
    ],
  },
  {
    category: "Audio",
    icon: Mic,
    items: [
      "DJI Mic 2 — 2 transmitters, 1 receiver",
      "2x Rode PodMic broadcast microphones",
      "RodeCaster Duo audio processor",
      "Broadcast-grade, noise-reduced sound",
    ],
  },
  {
    category: "Professional Lighting Equipment",
    icon: Zap,
    items: [
      "Godox SL60II D & SL60II Bi",
      "Godox LC500R & SZ150R",
      "Godox T30",
      "RGB background lighting",
    ],
  },
  {
    category: "Teleprompter & Backdrops",
    icon: Presentation,
    items: [
      "Desview T12S Teleprompter",
      "For courses, presentations & scripted podcasts",
      "White, black, gray, blue, green backdrops",
      "Choose the backdrop matching your brand",
    ],
  },
  {
    category: "Live Streaming",
    icon: Radio,
    items: [
      "250Mbps symmetric fiber",
      "Streamlabs OBS setup",
      "Multi-platform streaming",
      "Stream recording included",
    ],
  },
  {
    category: "Studio Environment",
    icon: Users,
    items: [
      "Professionally acoustic-treated, echo-free room",
      "Quiet, air-conditioned & comfortable space",
      "6 guest capacity",
      "Dedicated green room & seating",
    ],
  },
  {
    category: "Editing Services",
    icon: Monitor,
    items: [
      "Two dedicated professional video editors",
      "Multi-camera sync, audio enhancement & color correction",
      "Motion graphics, reels, shorts & subtitles",
      "Thumbnail design assistance",
    ],
  },
];

export default function StudioPage() {
  return (
    <>
      <section className="bg-black pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            The Studio
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Professional Grade, Creator Friendly
          </h1>
          <p className="text-white/50 text-lg">
            Bangladesh&apos;s multi-camera podcast studio — Sony &amp; DJI
            cameras, RodeCaster Duo audio, and Godox cinematic lighting, all
            chosen for quality, reliability, and ease of use.
          </p>
        </div>
      </section>

      {/* Studio gallery placeholder */}
      <section className="py-12 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Recording Room", "Camera Setup", "Control Area", "Guest Lounge"].map(
              (label) => (
                <div
                  key={label}
                  className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <span className="text-white/30 text-sm">{label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Equipment
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We invest in the best gear so you can focus on your content.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map(({ category, subtitle, icon: Icon, items }) => (
              <div
                key={category}
                className="p-6 rounded-2xl border border-gray-100 hover:border-purple-200 transition-colors bg-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </div>
                {subtitle && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {subtitle}
                  </p>
                )}
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Experience the Studio for Yourself"
        subheadline="Book a session and see why 200+ creators choose Easy Pod."
      />
    </>
  );
}
