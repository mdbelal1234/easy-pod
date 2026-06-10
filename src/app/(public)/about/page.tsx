import { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { Mic, Target, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story and mission behind Easy Pod Studio.",
};

const values = [
  {
    icon: Mic,
    title: "Crafted for Creators",
    description:
      "Every detail of our studio is designed with creators in mind — from the gear to the workflow to the editing.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We don't just record. We help you create content that grows your audience, builds your brand, and drives real results.",
  },
  {
    icon: Heart,
    title: "Creator-First",
    description:
      "We love what we do, and it shows. Our team is made up of content creators who understand your challenges.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description:
      "Time is your most valuable asset. We deliver fast without sacrificing quality.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            We Built the Studio We Wished We Had
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Easy Pod was born out of frustration. As content creators ourselves,
            we knew that great ideas were being held back by expensive equipment,
            complicated setups, and inconsistent audio quality. So we built the
            solution.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Easy Pod Story
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              In 2022, our founder started recording a podcast from a small home
              office in Dhaka. The audio was inconsistent, the video looked
              amateur, and editing took hours every week. Sound familiar?
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              After talking to hundreds of podcasters, YouTubers, coaches, and
              business owners across Bangladesh, we saw the same problem
              everywhere: amazing ideas, struggling to reach their audience
              because of a lack of professional production infrastructure.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Easy Pod Studio was built to solve that. We&apos;ve invested in
              the best equipment, hired experienced producers, and built a
              workflow that makes professional content creation simple. You focus
              on your ideas. We handle everything else.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we&apos;ve helped 200+ creators, businesses, and brands
              produce over 1,000 episodes and pieces of content. And we&apos;re
              just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-2xl border border-gray-100"
              >
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Mission
          </p>
          <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
            &ldquo;To make professional content production accessible to every
            creator in Bangladesh — regardless of budget, technical skill, or
            equipment.&rdquo;
          </blockquote>
        </div>
      </section>

      <CTASection />
    </>
  );
}
