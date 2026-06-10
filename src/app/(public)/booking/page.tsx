export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "@/components/booking/booking-form";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book your professional podcast recording session at Easy Pod Studio.",
};

export default async function BookingPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, price: true },
  });

  const pkgs = packages.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            Book a Session
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Reserve Your Studio Time
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Fill out the form below and we&apos;ll confirm your session within
            24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — trust */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {[
                  "Professional studio setup",
                  "Expert sound engineer",
                  "Multi-camera recording",
                  "Real-time audio monitoring",
                  "Post-production editing",
                  "Platform-ready exports",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Clock,
                  title: "24hr Confirmation",
                  desc: "We confirm every booking within 24 hours",
                },
                {
                  icon: Shield,
                  title: "Flexible Rescheduling",
                  desc: "Reschedule up to 48hrs before your session",
                },
                {
                  icon: Headphones,
                  title: "WhatsApp Support",
                  desc: "Direct line to our team before & after",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100"
                >
                  <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {title}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <BookingForm packages={pkgs} />
          </div>
        </div>
      </div>
    </div>
  );
}
