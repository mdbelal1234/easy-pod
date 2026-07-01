"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/lib/actions/admin";
import { toast } from "sonner";
import { ChevronDown, Check, X, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
}

export function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const [isPending, startTransition] = useTransition();

  const update = (
    status: "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED"
  ) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors">
        Actions
        <ChevronDown className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {currentStatus !== "APPROVED" && (
          <DropdownMenuItem
            onClick={() => update("APPROVED")}
            className="text-green-700 data-highlighted:bg-green-50"
          >
            <Check className="w-3.5 h-3.5" />
            Approve
          </DropdownMenuItem>
        )}
        {currentStatus !== "REJECTED" && (
          <DropdownMenuItem
            onClick={() => update("REJECTED")}
            className="text-red-700 data-highlighted:bg-red-50"
          >
            <X className="w-3.5 h-3.5" />
            Reject
          </DropdownMenuItem>
        )}
        {currentStatus !== "COMPLETED" && (
          <DropdownMenuItem
            onClick={() => update("COMPLETED")}
            className="text-blue-700 data-highlighted:bg-blue-50"
          >
            <Check className="w-3.5 h-3.5" />
            Complete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
