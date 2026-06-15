"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Star, Video, Mic, Sparkles } from "lucide-react";

const floatingStats = [
  { label: "Cameras", value: "Multi-cam 4K" },
  { label: "Audio", value: "Rodecaster Pro II" },
  { label: "Delivery", value: "Content-ready" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-purple-600/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 border-purple-500/30 bg-purple-600/15 text-purple-200 hover:bg-purple-600/25">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-purple-400" />
                Bangladesh&apos;s Premium Video Podcast Studio
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Launch Your Podcast With{" "}
              <span className="text-gradient">Professional Video</span> &amp;
              Audio Production
            </motion.h1>

            <motion.p
              className="mb-9 max-w-xl text-lg leading-relaxed text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Record in a professionally equipped Dhaka studio with multi-camera
              video, studio-grade audio, expert lighting, and full production
              support. Walk in with an idea — walk out with content ready to
              publish.
            </motion.p>

            <motion.div
              className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="h-13 border-0 bg-purple-600 px-7 text-base shadow-lg shadow-purple-600/30 hover:bg-purple-700"
              >
                <Link href="/booking">
                  Book a Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-white/20 bg-transparent px-7 text-base text-white hover:bg-white/5"
              >
                <Link href="#studio-tour">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Studio Tour
                </Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-purple-500 to-purple-700 text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">50+</div>
                  <div className="text-xs text-white/50">Happy clients</div>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">4.9/5</div>
                  <div className="text-xs text-white/50">Client rating</div>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-sm font-semibold text-white">150+</div>
                  <div className="text-xs text-white/50">Episodes recorded</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Studio visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-zinc-900 to-black">
              {/* Replace this block with a real studio photo / next/image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/30 bg-purple-600/30">
                    <Video className="h-10 w-10 text-purple-300" />
                  </div>
                  <p className="text-sm text-white/40">
                    Studio &amp; equipment showcase
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Recording badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-xs font-medium text-white">
                  Multi-camera recording
                </span>
              </div>

              {/* Spec strip */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-3">
                  {floatingStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-sm font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute -right-4 -top-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/80 p-3 backdrop-blur"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  Shorts &amp; Reels included
                </div>
                <div className="text-xs text-white/40">Ready to post</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
