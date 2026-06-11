export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePortfolio } from "@/lib/actions/admin";

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolio.findMany({
    where: { deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0">
          <Link href="/admin/portfolio/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="text-gray-400 text-sm col-span-3 text-center py-12">No portfolio items yet</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {item.videoUrl ? (
                  <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-400 hover:text-purple-600 transition-colors">
                    <Play className="w-8 h-8" />
                    <span className="text-xs">Watch</span>
                  </a>
                ) : (
                  <Play className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{item.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.category}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button asChild variant="outline" size="sm" className="text-xs h-7">
                      <Link href={`/admin/portfolio/${item.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteButton id={item.id} action={deletePortfolio} label="portfolio item" />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
