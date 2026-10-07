import Image from "next/image";
import { Camera } from "lucide-react";
import type { PhotoSlot } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Fills its (relatively positioned) parent. Renders the real photo when the
 * slot has a `src`, otherwise a placeholder that names the missing shot.
 */
export function Photo({
  slot,
  sizes,
  preload = false,
  className,
}: {
  slot: PhotoSlot;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  if (slot.src) {
    return (
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={slot.alt}
      className={cn(
        "absolute inset-0 flex items-end bg-ink-2 bg-[radial-gradient(120%_80%_at_70%_20%,var(--color-ink-3),transparent)] p-5",
        className
      )}
    >
      <span className="flex items-center gap-2 font-mono text-xs text-dim">
        <Camera className="size-3.5" strokeWidth={1.5} />
        Photo needed: {slot.hint}
      </span>
    </div>
  );
}
