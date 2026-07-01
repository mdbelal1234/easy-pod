"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/lib/actions/admin";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"] as const;

interface LeadActionsProps {
  leadId: string;
  currentStatus: string;
}

export function LeadActions({ leadId, currentStatus }: LeadActionsProps) {
  const [isPending, startTransition] = useTransition();

  const update = (status: (typeof statuses)[number]) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors">
        Status
        <ChevronDown className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses
          .filter((s) => s !== currentStatus)
          .map((s) => (
            <DropdownMenuItem
              key={s}
              onClick={() => update(s)}
              className="text-gray-700"
            >
              {s}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
