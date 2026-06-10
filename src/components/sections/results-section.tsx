"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const transformations = [
  {
    before: "Poor audio quality",
    after: "Studio-grade crystal clear audio",
  },
  {
    before: "Bad, inconsistent lighting",
    after: "Professional cinematic lighting",
  },
  {
    before: "Messy DIY home setup",
    after: "Premium branded studio space",
  },
  {
    before: "Hours spent on editing",
    after: "Delivered in 24-48 hours",
  },
  {
    before: "Low viewer engagement",
    after: "High-converting short clips",
  },
  {
    before: "Unprofessional brand image",
    after: "Premium, credible content",
  },
];

export function ResultsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">
            The Transformation
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Before Easy Pod vs. After
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            See the real difference a professional studio makes to your content
            and brand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {transformations.map(({ before, after }, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-red-500" />
                </div>
                <span className="text-red-700 text-sm">{before}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-green-800 text-sm font-medium">
                  {after}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
