"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
}

export function DeleteButton({ id, action, label }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete this ${label}?`)) return;
    startTransition(async () => {
      try {
        await action(id);
        toast.success(`${label} deleted`);
      } catch {
        toast.error("Failed to delete");
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 text-xs"
    >
      {isPending ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Trash2 className="w-3 h-3" />
      )}
    </Button>
  );
}
