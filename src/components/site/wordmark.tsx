import { cn } from "@/lib/utils";

/** "easypod" set in wide Archivo, with the tally light as the brand mark. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden className="size-[0.55em] rounded-[2px] bg-tally" />
      <span className="font-display-wide leading-none">easypod</span>
    </span>
  );
}
