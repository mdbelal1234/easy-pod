"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Building2,
  GraduationCap,
  BookOpen,
  Rocket,
  Briefcase,
} from "lucide-react";

const audiences = [
  {
    icon: Mic,
    title: "Podcasters",
    description:
      "From hobbyist to full-time creator, get the studio quality your audience deserves.",
  },
  {
    icon: Building2,
    title: "Businesses",
    description:
      "Build thought leadership and brand authority through consistent podcast content.",
  },
  {
    icon: GraduationCap,
    title: "Coaches",
    description:
      "Share your expertise, attract clients, and scale your reach beyond 1-on-1.",
  },
  {
    icon: BookOpen,
    title: "Educators",
    description:
      "Create engaging educational content that helps your students learn better.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description:
      "Build your brand story and connect with investors, customers, and talent.",
  },
  {
    icon: Briefcase,
    title: "Agencies",
    description:
      "Produce content for your clients with professional studio infrastructure.",
  },
];

export function WhoIsThisFor() {
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
            Who It&apos;s For
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Every Creator
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whether you&apos;re just starting out or producing at scale, Easy
            Pod is the professional home for your content.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-purple-200 bg-white hover:bg-purple-50/30 transition-colors cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
