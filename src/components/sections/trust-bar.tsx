"use client";

import { motion } from "framer-motion";
import { Mic, Users, Clock, Star } from "lucide-react";

const metrics = [
  { icon: Mic, value: "150+", label: "Episodes Recorded" },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Clock, value: "500+", label: "Production Hours" },
  { icon: Star, value: "4.9/5", label: "Client Satisfaction" },
];

// Placeholder client roster — swap for real client logos when available.
const clients = [
  "Coaches",
  "Founders",
  "YouTubers",
  "Consultants",
  "Corporates",
  "Creators",
];

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-black py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-2 bg-black px-6 py-8 text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Icon className="mb-1 h-6 w-6 text-purple-400" />
              <span className="text-3xl font-bold text-white sm:text-4xl">
                {value}
              </span>
              <span className="text-sm text-white/50">{label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Trusted by Bangladesh&apos;s creators &amp; brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {clients.map((c) => (
              <span
                key={c}
                className="text-base font-semibold tracking-tight text-white/35 transition-colors hover:text-white/60"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
