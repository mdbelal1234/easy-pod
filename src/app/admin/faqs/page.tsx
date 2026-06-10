export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteFAQ } from "@/lib/actions/admin";

export default async function AdminFAQsPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0">
          <Link href="/admin/faqs/new">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-sm">No FAQs yet</p>
        ) : (
          faqs.map((f) => (
            <div key={f.id} className="flex items-start justify-between px-6 py-4">
              <div className="flex-1 min-w-0 mr-4">
                <div className="font-medium text-gray-900 text-sm">{f.question}</div>
                <div className="text-gray-400 text-xs mt-1 line-clamp-2">{f.answer}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href={`/admin/faqs/${f.id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton id={f.id} action={deleteFAQ} label="FAQ" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
