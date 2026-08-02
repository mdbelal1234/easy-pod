"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Video, Mic, Lightbulb, Snowflake, HardDrive, Wrench } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const includedFeatures = [
  { icon: Video, text: "Professional 4K video recording" },
  { icon: Mic, text: "Studio-quality audio" },
  { icon: Lightbulb, text: "Professional lighting setup" },
  { icon: Snowflake, text: "Air-conditioned recording studio" },
  { icon: HardDrive, text: "Instant raw footage handover" },
  { icon: Wrench, text: "Technical setup before recording" },
];

const packages = [
  {
    name: "Starter Session",
    price: "৳1,500",
    duration: "Hour",
    description: "Record Your First Podcast with Confidence. A simple, professional setup designed for creators who want high-quality content without unnecessary complexity.",
    features: [
      "1-camera 4K recording",
      "Professional audio for up to 2 speakers",
      "Professional lighting",
      "Raw footage handover",
      "Technical assistance throughout the session",
    ],
    isPopular: false,
    cta: "Book Starter Session",
  },
  {
    name: "Creator Pro",
    price: "৳2,000",
    duration: "Hour",
    description: "More Angles. More Engagement. Upgrade your content with dynamic camera angles that keep viewers watching longer and make your podcast look significantly more professional.",
    features: [
      "2-camera 4K multi-angle production",
      "Professional audio for up to 2 speakers",
      "Creative lighting setup",
      "Raw footage handover",
      "Technical assistance throughout the session",
    ],
    isPopular: true,
    cta: "Book Creator Pro",
  },
  {
    name: "Studio Signature",
    price: "৳2,500",
    duration: "Hour",
    description: "Your Podcast, Produced Like a Professional Show. Built for creators, brands, and businesses that want premium production quality and ready-to-share content for multiple platforms.",
    features: [
      "3-camera 4K cinematic production",
      "Dynamic multi-angle coverage",
      "Professional audio for up to 2 speakers",
      "Premium cinematic lighting",
      "Dedicated production assistant during the session",
      "Priority production support",
      "Raw footage handover",
    ],
    isPopular: false,
    cta: "Book Studio Signature",
  },
];

export function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 [content-visibility:auto] [contain-intrinsic-size:auto_1100px]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            Packages
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Simple, Transparent Packages
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Studio time, cameras, editing, and ready-to-post clips — bundled so
            you know exactly what you&apos;re getting.
          </p>
        </motion.div>

        {/* Every Session Includes Banner */}
        <motion.div
          className="mb-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 text-center mb-6">
            Every Session Includes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {includedFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-white/80 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium leading-tight">{item.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="grid items-start gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.1)}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              className={`relative rounded-3xl border p-8 transition-colors ${
                pkg.isPopular
                  ? "border-purple-500/50 bg-gradient-to-b from-purple-600/15 to-white/[0.02] shadow-2xl shadow-purple-900/30 lg:-mt-4 lg:mb-4"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
              variants={fadeInUp}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="border-0 bg-purple-600 px-4 py-1 font-semibold text-white shadow-lg shadow-purple-600/40">
                    Recommended
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-1 text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-sm text-white/50">{pkg.description}</p>
              </div>

              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  {pkg.price}
                </span>
                <span className="text-sm text-white/40">/ {pkg.duration}</span>
              </div>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        pkg.isPopular ? "bg-purple-600" : "bg-white/10"
                      }`}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  pkg.isPopular
                    ? "border-0 bg-purple-600 text-white shadow-lg shadow-purple-600/30 hover:bg-purple-700"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <Link href="/booking">
                  {pkg.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-center text-sm text-white/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Need a recurring or corporate package?{" "}
          <Link href="/contact" className="text-purple-400 hover:underline">
            Talk to us
          </Link>{" "}
          about a custom plan.
        </motion.p>
      </div>
    </section>
  );
}
