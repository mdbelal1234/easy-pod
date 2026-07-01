export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { BookingActions } from "@/components/admin/booking-actions";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-gray-100 text-gray-700",
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const q = params.q;

  const bookings = await prisma.booking.findMany({
    where: {
      deletedAt: null,
      ...(status ? { status: status as never } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { package: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">{bookings.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-4 flex flex-wrap items-center gap-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED", "COMPLETED"].map((s) => (
          <a
            key={s}
            href={`/admin/bookings?${new URLSearchParams({
              ...(s !== "ALL" ? { status: s } : {}),
              ...(q ? { q } : {}),
            }).toString()}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              (status === s || (!status && s === "ALL"))
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s}
          </a>
        ))}

        <form
          method="GET"
          action="/admin/bookings"
          className="ml-auto flex items-center gap-2"
        >
          {status && <input type="hidden" name="status" value={status} />}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search name or email…"
              className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-300 w-48"
            />
          </div>
          {q && (
            <a
              href={status ? `/admin/bookings?status=${status}` : "/admin/bookings"}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Name", "Email", "Type", "Date", "Package", "Status", "Actions"].map(
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
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{b.name}</div>
                      <div className="text-gray-400 text-xs">{b.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.recordingType.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {format(new Date(b.preferredDate), "MMM d, yyyy")}
                      <div className="text-xs text-gray-400">{b.preferredTime}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.package?.name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[b.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <BookingActions bookingId={b.id} currentStatus={b.status} />
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
