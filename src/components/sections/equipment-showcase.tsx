"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Aperture,
  Smartphone,
  Sliders,
  Mic2,
  Layers,
  Presentation,
  Volume2,
  Focus,
  Frame,
  ZoomIn,
  SunMedium,
} from "lucide-react";

type Item = {
  icon: typeof Camera;
  name: string;
  spec: string;
  benefit: string;
};

const groups: { category: string; accent: string; items: Item[] }[] = [
  {
    category: "Professional Multi-Camera Setup",
    accent: "text-purple-300",
    items: [
      {
        icon: Camera,
        name: "Sony Alpha 7 IV",
        spec: "Full-frame hero camera",
        benefit:
          "Cinematic, full-frame footage that makes your podcast look like a premium TV show — not a webcam.",
      },
      {
        icon: Aperture,
        name: "Sony ZV-1",
        spec: "Compact creator camera",
        benefit:
          "Crisp, flattering close-ups with beautiful background blur, so every guest looks their best on camera.",
      },
      {
        icon: Smartphone,
        name: "DJI Osmo Pocket 3",
        spec: "Dynamic angle",
        benefit:
          "Smooth, gimbal-stabilised B-roll and reaction shots that keep long episodes visually engaging.",
      },
    ],
  },
  {
    category: "Premium Lens Collection",
    accent: "text-sky-300",
    items: [
      {
        icon: Focus,
        name: "Sony FE 85mm F1.8",
        spec: "Portrait prime",
        benefit:
          "Beautiful background blur for flattering, magazine-style portrait close-ups of hosts and guests.",
      },
      {
        icon: Frame,
        name: "Tamron 17-28mm F2.8",
        spec: "Wide-angle zoom",
        benefit:
          "Wide, cinematic establishing shots that capture the full energy of the studio in one frame.",
      },
      {
        icon: ZoomIn,
        name: "Sony 18-105mm F4",
        spec: "Versatile zoom",
        benefit:
          "One lens for product shots and cinematic B-roll, so every angle stays sharp without a lens change.",
      },
    ],
  },
  {
    category: "Professional Lighting",
    accent: "text-amber-300",
    items: [
      {
        icon: SunMedium,
        name: "Godox SL60II Series",
        spec: "Key & fill lighting",
        benefit:
          "Adjustable, colour-accurate key and fill lights that give every shot a soft, cinematic studio look.",
      },
      {
        icon: Presentation,
        name: "Godox RGB Lighting",
        spec: "LC500R & background lights",
        benefit:
          "Full-colour RGB accents and background lighting that add mood and brand personality to your set.",
      },
    ],
  },
  {
    category: "Audio",
    accent: "text-fuchsia-300",
    items: [
      {
        icon: Sliders,
        name: "RodeCaster Duo",
        spec: "Production console",
        benefit:
          "A broadcast-grade mixer that delivers clean, balanced sound and instant effects — no post-production guesswork.",
      },
      {
        icon: Mic2,
        name: "DJI Mic 2 & Rode PodMic",
        spec: "Wireless + dynamic mics",
        benefit:
          "Warm, radio-quality voice with background noise rejected, so your audience hears every word clearly.",
      },
    ],
  },
  {
    category: "Production",
    accent: "text-emerald-300",
    items: [
      {
        icon: Layers,
        name: "Multi-Camera Recording",
        spec: "Synced angles",
        benefit:
          "Multiple synced angles edited into one dynamic episode that holds attention from intro to outro.",
      },
      {
        icon: Volume2,
        name: "Acoustic Treatment",
        spec: "Controlled room",
        benefit:
          "A sound-treated room that kills echo and noise, giving you a clean recording every single session.",
      },
    ],
  },
];

export function EquipmentShowcase() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            The Gear
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Pro Equipment, Working for You
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            We invested in the gear so you don&apos;t have to. Here&apos;s what
            it actually means for your content.
          </p>
        </motion.div>

        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="mb-5 flex items-center gap-4">
                <h3
                  className={`text-xs font-semibold uppercase tracking-[0.25em] ${group.accent}`}
                >
                  {group.category}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(({ icon: Icon, name, spec, benefit }, i) => (
                  <motion.div
                    key={name}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-purple-500/40 hover:bg-white/[0.05]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-600/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-600/10 transition-colors group-hover:bg-purple-600/20">
                        <Icon className="h-6 w-6 text-purple-300" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wide text-white/30">
                        {spec}
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {name}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/55">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
