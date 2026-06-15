"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { YouTubeEmbed } from "./youtube-embed";

// Replace videoId values with real client episodes / sample work.
const episodes = [
  {
    videoId: "aqz-KE-bpKQ",
    title: "Founder interview — business growth podcast",
    category: "Business",
  },
  {
    videoId: "aqz-KE-bpKQ",
    title: "Coaching show — multi-camera episode",
    category: "Coaching",
  },
  {
    videoId: "aqz-KE-bpKQ",
    title: "Creator vlogcast — full production",
    category: "Lifestyle",
  },
];

export function Portfolio() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Work We&apos;ve Produced
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Real episodes recorded and produced at EasyPod — from first-time
            hosts to established brands.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <YouTubeEmbed
                videoId={ep.videoId}
                title={ep.title}
                className="rounded-none border-0"
              />
              <div className="p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
                  {ep.category}
                </span>
                <h3 className="mt-1.5 text-base font-semibold leading-snug text-white">
                  {ep.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/20 bg-transparent px-8 text-white hover:bg-white/5"
          >
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
