export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CTASection } from "@/components/sections/cta-section";
import { Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Watch our podcast production work at Easy Pod Studio.",
};

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default async function PortfolioPage() {
  const items = await prisma.portfolio.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  const categories = ["All", ...new Set(items.map((i) => i.category))];

  return (
    <>
      <section className="bg-black pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Work We&apos;re Proud Of
          </h1>
          <p className="text-white/50 text-lg">
            Real episodes, real clients, real results.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-lg font-medium text-gray-600 mb-2">
                Portfolio Coming Soon
              </p>
              <p className="text-gray-400 text-sm">
                We&apos;re adding our best work here. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* Category filter (static, no JS state needed for SSR) */}
              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
                  return (
                    <div
                      key={item.id}
                      className="group rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 transition-all hover:shadow-lg"
                    >
                      {ytId ? (
                        <div className="aspect-video">
                          <iframe
                            src={`https://www.youtube.com/embed/${ytId}`}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          <Play className="w-10 h-10 text-gray-300" />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 mt-1 mb-1">
                          {item.title}
                        </h3>
                        {item.clientName && (
                          <p className="text-gray-400 text-xs">
                            {item.clientName}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
