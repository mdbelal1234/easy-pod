import Image from "next/image";
import { photos, type Angle } from "@/lib/media";
import { cn } from "@/lib/utils";

const heroSrc = photos.hero.src;

/** One camera angle: the hero photo cropped to that camera's framing. Fills its parent. */
export function AngleShot({
  angle,
  sizes,
  eager = false,
  priority = false,
  className,
}: {
  angle: Angle;
  sizes: string;
  /** Above the fold: load now instead of lazily. */
  eager?: boolean;
  /** The first frame on program is the page's largest paint. */
  priority?: boolean;
  className?: string;
}) {
  if (!heroSrc) return null;
  return (
    <Image
      src={heroSrc}
      alt=""
      fill
      sizes={sizes}
      loading={eager || priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("object-cover", className)}
      style={{
        objectPosition: angle.position,
        transform: `scale(${angle.zoom})`,
        transformOrigin: angle.position,
      }}
    />
  );
}
