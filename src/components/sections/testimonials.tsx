"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arif Rahman",
    company: "Growth Mindset BD",
    role: "Business Coach",
    result: "Booked 12 new clients from one season",
    content:
      "EasyPod made my coaching podcast look like a TV show. The multi-camera edits and reels brought in twelve new high-ticket clients in a single season. Worth every taka.",
    rating: 5,
  },
  {
    name: "Nadia Islam",
    company: "Founders of Dhaka",
    role: "Host & Entrepreneur",
    result: "Grew to 40k subscribers in 6 months",
    content:
      "I walked in with zero recording experience. The team guided me through everything and I left with publish-ready episodes. We hit 40k YouTube subscribers in six months.",
    rating: 5,
  },
  {
    name: "Tariq Hossain",
    company: "Scale & Capital",
    role: "Managing Partner",
    result: "3x more inbound leads",
    content:
      "We use EasyPod for our corporate thought-leadership series. The audio is broadcast-grade and the shorts perform incredibly on LinkedIn — inbound leads tripled.",
    rating: 5,
  },
  {
    name: "Sadia Khatun",
    company: "The Wellness Room",
    role: "Coach & Creator",
    result: "Reels averaging 100k+ views",
    content:
      "The short-form clips they produce consistently hit six figures of views. EasyPod doesn't just record — they understand what makes content actually grow.",
    rating: 5,
  },
  {
    name: "Minhaj Chowdhury",
    company: "Chowdhury Media",
    role: "Agency Director",
    result: "Our go-to studio for every client",
    content:
      "As an agency we need reliability and quality. EasyPod delivers on both, every time. It's now the only studio we book for our clients in Dhaka.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Results Our Clients Talk About
          </h2>
          <p className="mx-auto max-w-xl text-white/50">
            Real stories from Bangladesh creators, coaches, and brands who grew
            with EasyPod.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <Quote className="mb-6 h-10 w-10 text-purple-400/40" />
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-200">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                {testimonials[current].result}
              </div>
              <p className="mb-8 text-lg leading-relaxed text-white/80">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-lg font-bold text-white">
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonials[current].name}
                    </div>
                    <div className="text-white/50 text-sm">
                      {testimonials[current].role} · {testimonials[current].company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-purple-500 w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
