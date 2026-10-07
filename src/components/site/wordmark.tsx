import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * EasyPod Studio logo. Generated from public/logo/Easypod-studio-Option-White.png:
 * "compact" drops the tagline for small sizes (nav), "full" keeps it (footer).
 */
export function Wordmark({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const full = variant === "full";
  return (
    <Image
      src={full ? "/logo/easypod-lockup.png" : "/logo/easypod-nav.png"}
      alt="EasyPod Studio"
      width={full ? 1000 : 600}
      height={full ? 325 : 195}
      preload={!full}
      // Already small, web-sized PNGs: serve them as-is from /public.
      unoptimized
      className={cn("h-auto w-auto", className)}
    />
  );
}
