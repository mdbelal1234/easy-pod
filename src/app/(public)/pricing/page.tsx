export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { Check, Video, Mic, Lightbulb, Snowflake, HardDrive, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for professional podcast production at Easy Pod Studio.",
};

const includedFeatures = [
  { icon: Video, text: "Professional 4K video recording" },
  { icon: Mic, text: "Studio-quality audio" },
  { icon: Lightbulb, text: "Professional lighting setup" },
  { icon: Snowflake, text: "Air-conditioned recording studio" },
  { icon: HardDrive, text: "Instant raw footage handover" },
  { icon: Wrench, text: "Technical setup before recording" },
];

export default async function PricingPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <section className="bg-black pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-white/50 text-lg">
            No hidden fees. No upsells. Pick your plan and start creating.
          </p>
        </div>
      </section>

      {/* Dynamic packages from DB */}
      {packages.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Every Session Includes Banner */}
            <div className="mb-16 rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600 text-center mb-6">
                Every Session Includes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {includedFeatures.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-gray-700 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium leading-tight">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl p-8 border ${
                    pkg.isPopular
                      ? "border-purple-500 bg-purple-600 text-white shadow-xl shadow-purple-500/20"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-white text-purple-700 border-0 px-4 py-1 font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      pkg.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`text-4xl font-bold ${
                        pkg.isPopular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ৳{Number(pkg.price).toLocaleString()}
                    </span>
                    <span
                      className={`ml-2 text-sm ${
                        pkg.isPopular ? "text-white/60" : "text-gray-400"
                      }`}
                    >
                      / {pkg.duration}
                    </span>
                  </div>
                  {pkg.description && (
                    <p
                      className={`text-sm mb-6 ${
                        pkg.isPopular ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {pkg.description}
                    </p>
                  )}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 ${
                            pkg.isPopular ? "text-white" : "text-purple-600"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            pkg.isPopular ? "text-white/80" : "text-gray-600"
                          }`}
                        >
                          {f}
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
                    <Link href="/booking">Book This Package</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {packages.length === 0 && <PricingSection />}

      <FAQSection />
      <CTASection />
    </>
  );
}
