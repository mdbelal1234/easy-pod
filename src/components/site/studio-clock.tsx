"use client";

import { useEffect, useRef } from "react";
import { dhakaClock } from "@/lib/desk";
import { cn } from "@/lib/utils";

/**
 * The studio's wall clock (Dhaka time). Ticks once a second by writing to
 * the DOM directly, so it never re-renders React; the server renders dashes.
 */
export function StudioClock({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (ref.current) ref.current.textContent = dhakaClock();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      --:--:--
    </span>
  );
}
