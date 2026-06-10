"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

interface CTASectionProps {
  dark?: boolean;
  headline?: string;
  subheadline?: string;
}

export function CTASection({
  dark = true,
  headline = "Ready to Launch Your Podcast?",
  subheadline = "Book a session today. Limited slots available every week — don't miss your spot.",
}: CTASectionProps) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";
  const waMessage = encodeURIComponent(
    "Hi! I'm interested in booking a podcast session at Easy Pod."
  );

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        dark ? "bg-black" : "bg-purple-600"
      }`}
    >
      {dark && (
        <>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        </>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Limited slots available this month
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            {subheadline}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className={`h-12 px-8 text-base font-semibold border-0 ${
                dark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-white text-purple-700 hover:bg-gray-100"
              }`}
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
              className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <a
                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
