export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestimonial } from "@/lib/actions/admin";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0">
          <Link href="/admin/testimonials/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.length === 0 ? (
          <p className="text-gray-400 text-sm col-span-3 text-center py-12">No testimonials yet</p>
        ) : (
          testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{t.content}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.company}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="text-xs h-7">
                    <Link href={`/admin/testimonials/${t.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteButton id={t.id} action={deleteTestimonial} label="testimonial" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
