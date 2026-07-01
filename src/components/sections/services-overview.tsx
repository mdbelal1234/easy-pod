"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Video, Scissors, Radio, Zap, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const services = [
  {
    icon: Mic,
    number: "01",
    title: "Podcast Recording",
    description:
      "Crystal-clear audio in our acoustically treated studio. Up to 6 guests, professional-grade microphones, real-time monitoring.",
    href: "/services#podcast-recording",
  },
  {
    icon: Video,
    number: "02",
    title: "Video Podcast Production",
    description:
      "Multi-camera 4K setup with cinema-quality lighting. Look as professional as you sound.",
    href: "/services#video-podcast",
  },
  {
    icon: Scissors,
    number: "03",
    title: "Editing & Post Production",
    description:
      "Full audio cleaning, color grading, captions, and platform-optimized exports. We handle everything.",
    href: "/services#editing",
  },
  {
    icon: Radio,
    number: "04",
    title: "Live Streaming",
    description:
      "Stream to YouTube, Facebook, and multiple platforms simultaneously with professional production.",
    href: "/services#live-streaming",
  },
  {
    icon: Zap,
    number: "05",
    title: "Shorts & Reels Creation",
    description:
      "Turn long-form content into viral short-form clips optimized for every platform.",
    href: "/services#shorts",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to Produce
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From raw recording to polished, published content — we cover every
            step of your podcast production journey.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.08)}
        >
          {services.map(({ icon: Icon, number, title, description, href }) => (
            <motion.a
              key={title}
              href={href}
              className="group p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 bg-white/3 hover:bg-purple-600/5 transition-colors"
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-purple-600/10 group-hover:bg-purple-600/20 border border-purple-500/20 rounded-xl flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-white/20 font-mono text-sm">{number}</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {description}
              </p>
            </motion.a>
          ))}

          {/* CTA card */}
          <motion.div
            className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-purple-800/10 flex flex-col justify-between"
            variants={fadeInUp}
          >
            <div>
              <h3 className="font-semibold text-white mb-2 text-lg">
                Ready to start recording?
              </h3>
              <p className="text-white/50 text-sm">
                Book your session today and create content that moves people.
              </p>
            </div>
            <Button
              asChild
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white border-0 w-full"
            >
              <Link href="/booking">
                Book a Session
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
