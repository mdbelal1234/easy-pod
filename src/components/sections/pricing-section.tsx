"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Starter",
    price: "৳4,999",
    duration: "2 Hours",
    description: "Perfect for first-time podcasters and solo creators.",
    features: [
      "2-Hour Studio Session",
      "2 Microphone Setup",
      "Basic Audio Editing",
      "1 Camera Setup",
      "RAW File Delivery",
      "WhatsApp Support",
    ],
    isPopular: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "৳8,999",
    duration: "4 Hours",
    description: "Most popular for growing podcast brands and content creators.",
    features: [
      "4-Hour Studio Session",
      "4 Microphone Setup",
      "Full Audio & Video Editing",
      "3 Camera Setup",
      "Thumbnail Design",
      "3 Short Clips / Reels",
      "Same-Day Delivery",
      "Priority Support",
    ],
    isPopular: true,
    cta: "Get Growth",
  },
  {
    name: "Premium",
    price: "৳14,999",
    duration: "Full Day",
    description:
      "Full-service production for brands and professional creators.",
    features: [
      "Full-Day Studio Access",
      "Unlimited Microphones",
      "Multi-Camera Production",
      "Professional Lighting",
      "Live Streaming Ready",
      "Full Editing Suite",
      "10+ Short Clips",
      "Thumbnail & Artwork",
      "Dedicated Producer",
      "1-Year Content Archive",
    ],
    isPopular: false,
    cta: "Go Premium",
  },
];

export function PricingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            No hidden fees. No surprises. Pick the plan that fits your needs and
            start recording today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                pkg.isPopular
                  ? "border-purple-500 bg-purple-600 text-white shadow-xl shadow-purple-500/20"
                  : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-lg"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-white text-purple-700 border-0 px-4 py-1 font-semibold shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    pkg.isPopular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm ${
                    pkg.isPopular ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {pkg.description}
                </p>
              </div>

              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${
                    pkg.isPopular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {pkg.price}
                </span>
                <span
                  className={`ml-2 text-sm ${
                    pkg.isPopular ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  / {pkg.duration}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        pkg.isPopular ? "text-white" : "text-purple-600"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        pkg.isPopular ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  pkg.isPopular
                    ? "bg-white text-purple-700 hover:bg-gray-100 border-0"
                    : "bg-purple-600 hover:bg-purple-700 text-white border-0"
                }`}
              >
                <Link href="/booking">
                  {pkg.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-gray-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Need a custom package?{" "}
          <Link href="/contact" className="text-purple-600 hover:underline">
            Contact us
          </Link>{" "}
          for enterprise pricing.
        </motion.p>
      </div>
    </section>
  );
}
