export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { LeadActions } from "@/components/admin/lead-actions";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  QUALIFIED: "bg-purple-100 text-purple-700",
  CONVERTED: "bg-green-100 text-green-700",
  LOST: "bg-gray-100 text-gray-600",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;

  const leads = await prisma.lead.findMany({
    where: {
      deletedAt: null,
      ...(status ? { status: status as never } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-4 flex flex-wrap gap-2">
        {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"].map(
          (s) => (
            <a
              key={s}
              href={s === "ALL" ? "/admin/leads" : `/admin/leads?status=${s}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                status === s || (!status && s === "ALL")
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </a>
          )
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Name", "Email", "Phone", "Company", "Source", "Status", "Date", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {l.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{l.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {l.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {l.company || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {l.source.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[l.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {format(new Date(l.createdAt), "MMM d")}
                    </td>
                    <td className="px-4 py-3">
                      <LeadActions leadId={l.id} currentStatus={l.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
