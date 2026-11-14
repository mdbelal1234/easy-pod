import { cn } from "@/lib/utils";

const mark = "absolute size-3.5 border-paper/40";

/**
 * A broadcast monitor: a black bezel around 16:9 glass, a label box
 * top-left (with a red tally lamp and border while `live`), optional `meta`
 * top-right, an optional `note` bottom-right, and title-safe corner marks.
 * Children fill the glass. Built from spans so it can sit inside a button.
 */
export function Monitor({
  as: Root = "div",
  size = "md",
  live = false,
  label,
  meta,
  note,
  className,
  children,
}: {
  as?: "div" | "span";
  /** Bezel weight: "sm" for preview tiles. */
  size?: "sm" | "md";
  live?: boolean;
  label: React.ReactNode;
  meta?: React.ReactNode;
  note?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Root
      className={cn(
        "relative isolate block bg-[#070605] shadow-[0_28px_60px_-34px_rgb(0_0_0/0.95)]",
        size === "md" ? "rounded-[6px] p-1.5" : "rounded-[5px] p-1",
        live ? "ring-2 ring-tally" : "ring-1 ring-paper/12",
        className
      )}
    >
      <span className="relative block aspect-video overflow-hidden rounded-[3px] bg-glass">
        {children}

        <span aria-hidden className="pointer-events-none absolute inset-[6%] z-[2] block">
          <span className={`${mark} left-0 top-0 border-l border-t`} />
          <span className={`${mark} right-0 top-0 border-r border-t`} />
          <span className={`${mark} bottom-0 left-0 border-b border-l`} />
          <span className={`${mark} bottom-0 right-0 border-b border-r`} />
        </span>

        <span className="pointer-events-none absolute inset-x-0 top-0 z-[3] flex items-start justify-between gap-3 p-2 sm:p-3">
          <span className="ident flex items-center gap-2 rounded-[2px] bg-glass/85 px-2 py-1 text-[10px] text-paper sm:text-[11px]">
            <span
              aria-hidden
              className={cn("size-1.5 shrink-0 rounded-full", live ? "bg-tally" : "bg-paper/30")}
            />
            {label}
          </span>
          {meta && (
            <span className="flex items-center gap-2 rounded-[2px] bg-glass/85 px-2 py-1 text-[10px] text-paper/85 sm:text-[11px]">
              {meta}
            </span>
          )}
        </span>

        {note && (
          <span className="ident pointer-events-none absolute bottom-2 right-2 z-[3] rounded-[2px] bg-glass/80 px-1.5 py-0.5 text-[9px] text-paper/60 sm:bottom-3 sm:right-3 sm:text-[10px]">
            {note}
          </span>
        )}

        {/* The glass: a hairline edge and a little shade under the bezel lip. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] rounded-[3px] shadow-[inset_0_0_0_1px_rgb(241_238_232/0.07),inset_0_12px_24px_-16px_rgb(0_0_0/0.85)]"
        />
      </span>
    </Root>
  );
}
