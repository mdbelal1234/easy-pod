export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePackage } from "@/lib/actions/admin";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0">
          <Link href="/admin/packages/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {packages.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-sm">No packages yet</p>
        ) : (
          packages.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{p.name}</span>
                  {p.isPopular && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </div>
                <div className="text-gray-400 text-xs mt-0.5">
                  ৳{Number(p.price).toLocaleString()} · {p.duration}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href={`/admin/packages/${p.id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton id={p.id} action={deletePackage} label="package" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
