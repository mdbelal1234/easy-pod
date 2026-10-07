import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "tally" | "line";

const variants: Record<Variant, string> = {
  tally: "bg-tally text-ink hover:bg-tally-hover",
  line: "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5",
};

/**
 * The public site's only button shape: 4px corners, single line, a physical
 * 1px press on :active. External links (http, wa.me) render a plain anchor.
 */
export function ButtonLink({
  href,
  variant = "tally",
  className,
  onClick,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const classes = cn(
    "group inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-tight px-6 text-[15px] font-medium transition-[background-color,border-color,transform] duration-200 active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    className
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
