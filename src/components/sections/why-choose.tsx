"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Award,
  Video,
  AudioLines,
  PackageCheck,
  Scissors,
  Smile,
  ArrowRight,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const reasons = [
  {
    icon: Award,
    title: "Professional Production Quality",
    description:
      "Every episode is shot and mixed to a broadcast standard, so your brand looks the part from day one.",
  },
  {
    icon: Video,
    title: "Multi-Camera Recording",
    description:
      "Several synced 4K angles cut into one dynamic edit that keeps viewers watching longer.",
  },
  {
    icon: AudioLines,
    title: "Studio-Grade Audio",
    description:
      "Rode PodMic and DJI Mic 2 through a RodeCaster Duo in an acoustically treated room mean clean, rich sound every time.",
  },
  {
    icon: PackageCheck,
    title: "Content-Ready Delivery",
    description:
      "Leave with episodes and clips formatted and ready to publish — no extra production work on your side.",
  },
  {
    icon: Scissors,
    title: "Editing Support",
    description:
      "Our team handles the cutting, colour, captions, and clips so you can focus on the conversation.",
  },
  {
    icon: Smile,
    title: "Beginner-Friendly Experience",
    description:
      "Never recorded before? We guide you through everything. Just show up and talk — we handle the tech.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-black py-24 [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            Why EasyPod
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Premium Choice in Dhaka
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Everything you need to sound credible, look professional, and publish
            consistently — under one roof.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.07)}
        >
          {reasons.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-purple-500/30 hover:bg-white/[0.05]"
              variants={fadeInUp}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-600/10 transition-colors group-hover:bg-purple-600/20">
                <Icon className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/55">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
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
              Book a Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
