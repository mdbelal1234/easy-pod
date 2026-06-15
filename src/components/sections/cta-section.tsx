"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarClock, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

interface CTASectionProps {
  dark?: boolean;
  headline?: string;
  subheadline?: string;
  /** When true, the secondary button links to the consultation page instead of WhatsApp. */
  consultation?: boolean;
}

export function CTASection({
  dark = true,
  headline = "Ready to Start Your Podcast?",
  subheadline = "Record with professional equipment and leave with content ready to publish.",
  consultation = false,
}: CTASectionProps) {
  return (
    <section
      className={`relative overflow-hidden py-24 ${
        dark ? "bg-black" : "bg-gradient-to-br from-purple-700 to-purple-900"
      }`}
    >
      {dark && (
        <>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/25 blur-[120px]" />
        </>
      )}

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
            Limited sessions available this month
          </div>

          <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">
            {subheadline}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className={`h-12 border-0 px-8 text-base font-semibold ${
                dark
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 hover:bg-purple-700"
                  : "bg-white text-purple-700 hover:bg-gray-100"
              }`}
            >
              <Link href="/booking">
                Book Your Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {consultation ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
              >
                <Link href="/contact">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Schedule a Consultation
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
              >
                <a
                  href={waLink(
                    "Hi! I'm interested in booking a podcast session at EasyPod Studio."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
