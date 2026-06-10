import { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { Check, Mic, Video, Radio, Users, Zap, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Studio",
  description:
    "Explore Easy Pod Studio — professional equipment, acoustic treatment, and everything you need.",
};

const equipment = [
  {
    category: "Microphones",
    icon: Mic,
    items: [
      "Shure SM7B Dynamic Microphone",
      "Rode NT1 Condenser Microphone",
      "Focusrite Scarlett 18i20 Interface",
      "Up to 6 simultaneous inputs",
    ],
  },
  {
    category: "Cameras",
    icon: Video,
    items: [
      "Sony ZV-E10 (Multiple units)",
      "4K/60fps video capability",
      "Elgato Cam Link capture cards",
      "Adjustable camera rigs & tripods",
    ],
  },
  {
    category: "Lighting",
    icon: Zap,
    items: [
      "Elgato Key Light Pro",
      "Softbox diffuser panels",
      "RGB background lighting",
      "Colour-accurate setup",
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
    category: "Recording Space",
    icon: Users,
    items: [
      "Acoustically treated room",
      "6 guest capacity",
      "Dedicated green room",
      "Comfortable seating",
    ],
  },
  {
    category: "Post Production",
    icon: Monitor,
    items: [
      "Adobe Premiere Pro",
      "Adobe Audition",
      "DaVinci Resolve",
      "Descript for transcription",
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
            Every piece of equipment chosen for quality, reliability, and ease
            of use.
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
            {equipment.map(({ category, icon: Icon, items }) => (
              <div
                key={category}
                className="p-6 rounded-2xl border border-gray-100 hover:border-purple-200 transition-colors bg-white"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </div>
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
