"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const packages = [
  {
    name: "Starter",
    price: "৳7,999",
    duration: "2-hour session",
    description: "Perfect for first-time hosts and solo creators testing the waters.",
    features: [
      "2 hours studio time",
      "1–2 camera angles",
      "Studio-grade audio recording",
      "Basic audio clean-up",
      "1 short / reel included",
      "Delivery in 5 business days",
    ],
    isPopular: false,
    cta: "Start with Starter",
  },
  {
    name: "Professional",
    price: "৳14,999",
    duration: "3-hour session",
    description: "Our most popular package for serious, consistent podcasters.",
    features: [
      "3 hours studio time",
      "3 camera multi-cam edit",
      "Full audio + video editing",
      "Colour grading & captions",
      "4 shorts / reels included",
      "Thumbnail design",
      "Delivery in 3 business days",
    ],
    isPopular: true,
    cta: "Choose Professional",
  },
  {
    name: "Premium",
    price: "৳26,999",
    duration: "Half-day session",
    description: "Full-service production for brands and high-output creators.",
    features: [
      "Up to 5 hours studio time",
      "Multi-camera + dynamic B-roll",
      "Full edit suite & sound design",
      "8 shorts / reels included",
      "Thumbnails & episode artwork",
      "Dedicated producer on set",
      "Priority delivery in 48 hours",
    ],
    isPopular: false,
    cta: "Go Premium",
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
