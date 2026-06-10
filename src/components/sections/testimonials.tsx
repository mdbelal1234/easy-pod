"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arif Rahman",
    company: "TechTalk BD",
    role: "Podcast Host",
    content:
      "Easy Pod completely transformed my podcast. The studio quality is unmatched and the team is incredibly professional. My downloads tripled after just one session.",
    rating: 5,
  },
  {
    name: "Nadia Islam",
    company: "StartupDhaka",
    role: "Founder & CEO",
    content:
      "We've been recording our company podcast at Easy Pod for 6 months. The equipment, the team, and the editing quality are all top-tier. Highly recommended for any business.",
    rating: 5,
  },
  {
    name: "Tariq Hossain",
    company: "The Coach Room",
    role: "Executive Coach",
    content:
      "As a coach, I need to look and sound credible. Easy Pod delivers exactly that. Professional setup, fast delivery, and the reels they create get massive engagement.",
    rating: 5,
  },
  {
    name: "Sadia Khatun",
    company: "EduBD",
    role: "Educator & YouTuber",
    content:
      "I was worried about the technical side but the Easy Pod team handled everything. I just showed up and focused on my content. Best decision for my YouTube channel.",
    rating: 5,
  },
  {
    name: "Minhaj Chowdhury",
    company: "Digital Agency BD",
    role: "Creative Director",
    content:
      "We produce content for multiple clients at Easy Pod. The studio handles everything from recording to post-production. It's our secret weapon for client delivery.",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Creators Say
          </h2>
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
              <Quote className="w-10 h-10 text-purple-400/40 mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg">
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
