"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Star, Users, Mic } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30">
                <span className="w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse" />
                Now Open for Bookings
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Launch a{" "}
              <span className="text-gradient">Professional Podcast</span>{" "}
              Without Buying Expensive Equipment
            </motion.h1>

            <motion.p
              className="text-lg text-white/60 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Record, livestream, and produce studio-quality podcasts with
              professional audio, video, and editing support. Just show up and
              create.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white border-0 text-base h-12 px-6"
              >
                <Link href="/booking">
                  Book a Session
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 text-base h-12 px-6 bg-transparent"
              >
                <Link href="/studio">
                  <Play className="mr-2 w-4 h-4" />
                  View Studio
                </Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 border-2 border-black flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">200+</div>
                  <div className="text-white/50 text-xs">Happy Clients</div>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">4.9/5</div>
                  <div className="text-white/50 text-xs">Rating</div>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-white font-semibold text-sm">1,000+</div>
                  <div className="text-white/50 text-xs">Episodes Produced</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Studio visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900/40 to-black aspect-[4/3]">
              {/* Placeholder for studio image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                    <Mic className="w-10 h-10 text-purple-400" />
                  </div>
                  <p className="text-white/40 text-sm">Studio Preview</p>
                </div>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Live badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur rounded-full px-3 py-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-xs font-medium">
                  Live Streaming Ready
                </span>
              </div>

              {/* Stats card */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Microphones", value: "6+" },
                    { label: "Cameras", value: "4K" },
                    { label: "Delivery", value: "24hr" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-white font-bold text-lg">
                        {stat.value}
                      </div>
                      <div className="text-white/50 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              className="absolute -top-4 -right-4 bg-black/80 backdrop-blur border border-white/10 rounded-xl p-3 flex items-center gap-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white text-xs font-semibold">
                  New booking
                </div>
                <div className="text-white/40 text-xs">2 min ago</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
