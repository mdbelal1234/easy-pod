"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  Mic,
  Scissors,
  Download,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book Your Session",
    description:
      "Pick a package and a time that suits you. Confirmation lands within hours.",
  },
  {
    icon: Mic,
    title: "Arrive & Record",
    description:
      "Just show up. We handle cameras, mics, and lighting — you focus on the conversation.",
  },
  {
    icon: Scissors,
    title: "We Edit & Produce",
    description:
      "Our team cuts the multi-cam edit, cleans the audio, and crafts your short-form clips.",
  },
  {
    icon: Download,
    title: "Receive Content",
    description:
      "Get your finished episode plus reels delivered, formatted, and ready to publish.",
  },
  {
    icon: TrendingUp,
    title: "Publish & Grow",
    description:
      "Post across YouTube and social, build your audience, and keep the momentum going.",
  },
];

export function BookingProcess() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 [content-visibility:auto] [contain-intrinsic-size:auto_700px]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From Idea to Published in 5 Steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            A simple, guided process — no technical knowledge required.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent lg:block" />

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1)}
          >
            {steps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                className="relative flex flex-col items-center text-center"
                variants={fadeInUp}
              >
                <div className="relative mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-600 shadow-lg shadow-purple-600/30">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black">
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 border-0 bg-purple-600 px-8 shadow-lg shadow-purple-600/30 hover:bg-purple-700"
          >
            <Link href="/booking">
              Book Your Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
