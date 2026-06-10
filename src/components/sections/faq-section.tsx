"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I book a session at Easy Pod?",
    answer:
      "Simply click the 'Book a Session' button, fill in your details, choose your package and preferred date/time. We'll confirm your booking within 24 hours via email and WhatsApp.",
  },
  {
    question: "What equipment do you have available?",
    answer:
      "We have professional condenser microphones (Shure, Rode), DSLR and mirrorless cameras for multi-angle recording, professional lighting rigs, acoustic treatment panels, and high-speed fiber internet for live streaming.",
  },
  {
    question: "Do you provide editing services?",
    answer:
      "Yes! All our Growth and Premium packages include full audio and video editing. We handle noise reduction, color grading, captions, intros/outros, and platform-optimized exports.",
  },
  {
    question: "How many people can record at once?",
    answer:
      "Our studio comfortably accommodates up to 6 guests for podcast recording. For larger corporate events, contact us for custom arrangements.",
  },
  {
    question: "How fast do you deliver the edited content?",
    answer:
      "Typical turnaround is 2-3 business days for full editing. Same-day delivery is available for Growth and Premium packages at no extra cost.",
  },
  {
    question: "Can I bring my own equipment?",
    answer:
      "Absolutely! If you prefer using your own microphones or cameras, you're welcome to bring them. Our engineers will integrate them seamlessly with our studio setup.",
  },
  {
    question: "Do you offer packages for corporate teams?",
    answer:
      "Yes! We have dedicated corporate packages for internal communications, training videos, thought-leadership content, and company podcasts. Contact us for custom corporate pricing.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  {open === i ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
