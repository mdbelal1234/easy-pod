export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteGallery } from "@/lib/actions/admin";
import Image from "next/image";

export default async function AdminGalleryPage() {
  const items = await prisma.gallery.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0">
          <Link href="/admin/gallery/new">
            <Plus className="w-4 h-4 mr-2" />
            Upload Image
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 ? (
          <div className="col-span-4 text-center py-12 text-gray-400">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No gallery images yet</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-100">
              <Image
                src={item.imageUrl}
                alt={item.altText || item.title || "Gallery image"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="flex gap-2 w-full">
                  <Button asChild variant="outline" size="sm" className="text-xs flex-1 bg-white/90 border-0 text-gray-900">
                    <Link href={`/admin/gallery/${item.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteButton id={item.id} action={deleteGallery} label="image" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
