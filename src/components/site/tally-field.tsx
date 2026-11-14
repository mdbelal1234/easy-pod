"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A full-width tally-red section. Red from the first paint; when it starts
 * below the fold, script dims it and it snaps on as it scrolls into view,
 * like a tally light going live. Reduced motion keeps it simply red.
 */
export function TallyField({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.armed = "true";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        delete el.dataset.armed;
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.armed;
    };
  }, []);

  return (
    <section ref={ref} className={cn("tally-field", className)} {...props}>
      {children}
    </section>
  );
}
