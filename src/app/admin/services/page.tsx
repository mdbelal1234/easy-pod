export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteService } from "@/lib/actions/admin";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 text-sm mt-1">{services.length} services</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0">
          <Link href="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {services.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-sm">No services yet</p>
        ) : (
          services.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-gray-900">{s.title}</div>
                <div className="text-gray-400 text-xs mt-0.5">{s.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href={`/admin/services/${s.id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton id={s.id} action={deleteService} label="service" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
