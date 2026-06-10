export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CTASection } from "@/components/sections/cta-section";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full range of podcast production services at Easy Pod Studio.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Services
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything You Need to Produce Great Content
          </h1>
          <p className="text-white/50 text-lg">
            From raw recording to polished, published content — we cover every
            step.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, i) => (
              <div
                key={service.id}
                id={service.slug}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">
                    0{i + 1}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-purple-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`aspect-video rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-800/5 border border-purple-100 flex items-center justify-center ${
                    i % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold text-xl">0{i + 1}</span>
                    </div>
                    <p className="text-sm">{service.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
