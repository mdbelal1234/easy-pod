"use client";

import { useSyncExternalStore } from "react";
import { studioStatus } from "@/lib/desk";
import { studioNow } from "@/lib/schedule";
import { cn } from "@/lib/utils";

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const currentHour = () => studioNow().hour;
const noHour = () => null;

/**
 * Whether the studio is open right now (Dhaka time). The lamp is red only
 * while it is; the server renders the opening hours instead.
 */
export function StudioStatus({ className }: { className?: string }) {
  const hour = useSyncExternalStore(subscribe, currentHour, noHour);
  const status = hour === null ? null : studioStatus(hour);

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className={cn("size-2 rounded-full", status?.open ? "bg-tally" : "bg-paper/25")}
      />
      {status ? status.label : "Open daily, 9 AM to 10 PM"}
    </span>
  );
}
