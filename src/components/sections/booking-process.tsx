"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, CalendarDays, Mic, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Choose Package",
    description: "Select the plan that matches your recording needs and budget.",
  },
  {
    icon: CalendarDays,
    step: "02",
    title: "Select Date",
    description:
      "Pick your preferred recording date and time from our availability.",
  },
  {
    icon: Mic,
    step: "03",
    title: "Record Podcast",
    description:
      "Show up at our studio. We handle all the technical setup for you.",
  },
  {
    icon: Download,
    step: "04",
    title: "Receive Content",
    description:
      "Get your edited, polished content delivered within 24-48 hours.",
  },
];

export function BookingProcess() {
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
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            4 Steps to Your First Episode
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From booking to broadcast, the process is simple. No technical
            knowledge required.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ icon: Icon, step, title, description }, i) => (
              <motion.div
                key={step}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white border-0 h-12 px-8"
          >
            <Link href="/booking">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
