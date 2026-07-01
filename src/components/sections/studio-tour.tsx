"use client";

import { motion } from "framer-motion";
import { Camera, Lightbulb, Mic, Volume2 } from "lucide-react";
import { YouTubeEmbed } from "./youtube-embed";
import { site } from "@/lib/site";

const highlights = [
  { icon: Camera, label: "Sony & DJI multi-camera setup" },
  { icon: Lightbulb, label: "Godox cinematic lighting" },
  { icon: Mic, label: "DJI Mic 2 & Rode PodMic" },
  { icon: Volume2, label: "Acoustically treated room" },
];

export function StudioTour() {
  return (
    <section
      id="studio-tour"
      className="relative scroll-mt-20 overflow-hidden bg-black py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            Studio Tour
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            See the Studio Before You Book
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Take a walk through the cameras, lighting, audio setup, and recording
            environment — so you know exactly what you&apos;re booking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-purple-900/20 sm:p-3">
            <YouTubeEmbed
              videoId={site.studioTourVideoId}
              title="EasyPod Studio Tour — Dhaka video podcast studio"
            />
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Icon className="h-5 w-5 flex-shrink-0 text-purple-400" />
              <span className="text-sm text-white/70">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
