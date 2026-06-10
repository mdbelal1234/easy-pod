"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus } from "@/lib/actions/admin";
import { toast } from "sonner";
import { ChevronDown, Check, X, Loader2 } from "lucide-react";

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
}

export function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = (
    status: "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED"
  ) => {
    setOpen(false);
    startTransition(async () => {
      const result = await updateBookingStatus(bookingId, status);
      if (result.success) {
        toast.success(`Booking ${status.toLowerCase()}`);
      } else {
        toast.error("Failed to update booking");
      }
    });
  };

  if (isPending) {
    return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
      >
        Actions
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-1 min-w-32">
            {currentStatus !== "APPROVED" && (
              <button
                onClick={() => update("APPROVED")}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-green-700 hover:bg-green-50 rounded-lg"
              >
                <Check className="w-3.5 h-3.5" />
                Approve
              </button>
            )}
            {currentStatus !== "REJECTED" && (
              <button
                onClick={() => update("REJECTED")}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-700 hover:bg-red-50 rounded-lg"
              >
                <X className="w-3.5 h-3.5" />
                Reject
              </button>
            )}
            {currentStatus !== "COMPLETED" && (
              <button
                onClick={() => update("COMPLETED")}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-blue-700 hover:bg-blue-50 rounded-lg"
              >
                <Check className="w-3.5 h-3.5" />
                Complete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
