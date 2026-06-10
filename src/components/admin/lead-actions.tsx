"use client";

import { useTransition, useState } from "react";
import { updateLeadStatus } from "@/lib/actions/admin";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"] as const;

interface LeadActionsProps {
  leadId: string;
  currentStatus: string;
}

export function LeadActions({ leadId, currentStatus }: LeadActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = (status: (typeof statuses)[number]) => {
    setOpen(false);
    startTransition(async () => {
      const result = await updateLeadStatus(leadId, status);
      if (result.success) {
        toast.success("Lead status updated");
      } else {
        toast.error("Failed to update");
      }
    });
  };

  if (isPending) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
      >
        Status
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-1 min-w-32">
            {statuses
              .filter((s) => s !== currentStatus)
              .map((s) => (
                <button
                  key={s}
                  onClick={() => update(s)}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  {s}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
