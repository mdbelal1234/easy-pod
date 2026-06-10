"use client";

import { motion } from "framer-motion";
import { Mic, Video, Scissors, Radio, Zap, Film } from "lucide-react";

const features = [
  { icon: Mic, label: "Professional Microphones" },
  { icon: Video, label: "Multi-Camera Recording" },
  { icon: Film, label: "Video Production" },
  { icon: Scissors, label: "Audio Editing" },
  { icon: Radio, label: "Live Streaming" },
  { icon: Zap, label: "Fast Delivery" },
];

export function TrustBar() {
  return (
    <section className="bg-black border-y border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-2 text-center group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="w-10 h-10 bg-purple-600/10 group-hover:bg-purple-600/20 border border-purple-500/20 rounded-xl flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-white/60 text-xs font-medium">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
