"use client";

import { useEffect, useRef } from "react";

/**
 * Viewfinder REC readout. Ticks once a second by writing to the DOM directly,
 * so it never re-renders React. Stays frozen at 00:00:00 for reduced motion.
 */
export function RecTimecode() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = Date.now();
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = window.setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      if (ref.current) {
        ref.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-2 font-mono text-xs tabular-nums text-paper/80">
      <span className="size-2 rounded-full bg-tally motion-safe:animate-pulse" />
      REC
      <span ref={ref}>00:00:00</span>
    </span>
  );
}
