export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { CalendarCheck, Users, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default async function AdminDashboard() {
  const [totalBookings, pendingBookings, totalLeads, newLeads, recentBookings] =
    await Promise.all([
      prisma.booking.count({ where: { deletedAt: null } }),
      prisma.booking.count({ where: { status: "PENDING", deletedAt: null } }),
      prisma.lead.count({ where: { deletedAt: null } }),
      prisma.lead.count({ where: { status: "NEW", deletedAt: null } }),
      prisma.booking.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { package: { select: { name: true } } },
      }),
    ]);

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: CalendarCheck,
      color: "bg-purple-100 text-purple-600",
      href: "/admin/bookings",
    },
    {
      label: "Pending Review",
      value: pendingBookings,
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
      href: "/admin/bookings?status=PENDING",
    },
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      href: "/admin/leads",
    },
    {
      label: "New Leads",
      value: newLeads,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      href: "/admin/leads?status=NEW",
    },
  ];

  const statusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your studio performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{label}</span>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-purple-600 text-sm hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentBookings.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">
              No bookings yet
            </p>
          ) : (
            recentBookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">
                    {b.name}
                  </div>
                  <div className="text-gray-400 text-xs truncate">
                    {b.email} · {b.recordingType.replace("_", " ")}
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="text-gray-500 text-xs hidden sm:block">
                    {format(new Date(b.preferredDate), "MMM d, yyyy")}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[b.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
