"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Aperture,
  Smartphone,
  Sliders,
  Mic,
  Layers,
  Lightbulb,
  Volume2,
} from "lucide-react";

type Item = {
  icon: typeof Camera;
  name: string;
  spec: string;
  benefit: string;
};

const groups: { category: string; accent: string; items: Item[] }[] = [
  {
    category: "Cameras",
    accent: "text-purple-300",
    items: [
      {
        icon: Camera,
        name: "Sony A7 V",
        spec: "Full-frame hero camera",
        benefit:
          "Cinematic, full-frame footage that makes your podcast look like a premium TV show — not a webcam.",
      },
      {
        icon: Aperture,
        name: "Sony ZV-E1",
        spec: "Low-light creator camera",
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
    category: "Audio",
    accent: "text-fuchsia-300",
    items: [
      {
        icon: Sliders,
        name: "Rodecaster Pro II",
        spec: "Production console",
        benefit:
          "A broadcast-grade mixer that delivers clean, balanced sound and instant effects — no post-production guesswork.",
      },
      {
        icon: Mic,
        name: "Rode PodMic",
        spec: "Dynamic broadcast mic",
        benefit:
          "Warm, radio-quality voice with background noise rejected, so your audience hears every word clearly.",
      },
    ],
  },
  {
    category: "Production",
    accent: "text-amber-300",
    items: [
      {
        icon: Layers,
        name: "Multi-Camera Recording",
        spec: "Synced angles",
        benefit:
          "Multiple synced angles edited into one dynamic episode that holds attention from intro to outro.",
      },
      {
        icon: Lightbulb,
        name: "Professional Lighting",
        spec: "Cinematic key + fill",
        benefit:
          "Studio lighting that sets the mood and makes you look polished and confident on every shot.",
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
