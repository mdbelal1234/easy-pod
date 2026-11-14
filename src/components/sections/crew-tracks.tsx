"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const phases = ["Before you arrive", "You sit down", "You talk", "You wrap"] as const;

/** A clip on the session timeline, in eighths of the session: two per phase. */
type Clip = { label: string; from: number; to: number };

const tracks: { name: string; you?: boolean; clips: Clip[] }[] = [
  {
    name: "Light",
    clips: [
      { label: "Key and fill light", from: 0, to: 1 },
      { label: "Brand colour on the backdrop", from: 1, to: 2 },
    ],
  },
  {
    name: "Cameras",
    clips: [
      { label: "Height, framing and focus set", from: 0, to: 2 },
      { label: "Framing checked with you", from: 2, to: 4 },
      { label: "Every angle recording in sync", from: 4, to: 6 },
    ],
  },
  {
    name: "Sound",
    clips: [
      { label: "A mic for every speaker", from: 0, to: 2 },
      { label: "Mic placement checked", from: 2, to: 4 },
      { label: "Levels balanced live", from: 4, to: 6 },
    ],
  },
  {
    name: "Floor",
    clips: [
      { label: "Walks you through the session", from: 2, to: 4 },
      { label: "Hands over your raw footage", from: 6, to: 8 },
    ],
  },
  { name: "You", you: true, clips: [{ label: "Talk", from: 4, to: 6 }] },
];

const TALK_PHASE = 2;

/** Scroll position inside the pinned section -> playhead (0..1), with a short dwell at each end. */
const playheadAt = (progress: number) => Math.min(1, Math.max(0, (progress - 0.08) / 0.84));

/**
 * "Four tracks are ours. One is yours." On desktop the section pins and the
 * scroll drives a playhead along a session timeline; each clip lights as it
 * plays and only the visitor's one clip, Talk, goes red. Phones, reduced
 * motion and screen readers get the same session as a list by phase.
 */
export function CrewTracks() {
  const section = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(phases.length - 1);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const scrub = window.matchMedia("(min-width: 64rem) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? playheadAt(-rect.top / travel) : 1;
      el.style.setProperty("--p", p.toFixed(4));
      setPhase(Math.min(phases.length - 1, Math.floor(p * phases.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      frame = 0;
      el.style.removeProperty("--p");
    };
    const sync = () => {
      stop();
      if (!scrub.matches) return;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    };

    sync();
    scrub.addEventListener("change", sync);
    return () => {
      stop();
      scrub.removeEventListener("change", sync);
    };
  }, []);

  const youLive = phase === TALK_PHASE;

  return (
    <section
      ref={section}
      id="process"
      aria-labelledby="process-title"
      className="relative scroll-mt-16 motion-safe:lg:h-[240vh]"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:flex lg:min-h-[calc(100dvh-4rem)] lg:flex-col lg:justify-center lg:px-10 lg:py-10 motion-safe:lg:sticky motion-safe:lg:top-16">
        <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              id="process-title"
              className="max-w-[16ch] font-display-wide text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02]"
            >
              Four tracks are ours. One is yours.
            </h2>
            <p className="mt-6 max-w-[54ch] text-pretty text-lg leading-relaxed text-muted-ink">
              From before you arrive until you leave with your footage, the crew
              runs light, cameras, sound and the floor. Your track has one
              thing on it.
            </p>
          </div>

          {/* What the playhead is over right now */}
          <div aria-hidden className="hidden w-[19rem] shrink-0 rounded-tight bg-glass px-5 py-4 ring-1 ring-paper/10 lg:block motion-reduce:lg:hidden">
            <p className="ident flex items-center gap-2 text-[11px] text-muted-ink">
              <span className={cn("size-2 rounded-full", youLive ? "bg-tally" : "bg-paper/25")} />
              {youLive ? "You are live" : "Now"}
            </p>
            <p className="mt-2 font-display-wide text-2xl">{phases[phase]}</p>
          </div>
        </div>

        {/* Desktop: the session as an editing timeline */}
        <div aria-hidden className="mt-10 hidden rounded-tight bg-glass p-5 ring-1 ring-paper/10 lg:flex">
          <div className="w-32 shrink-0">
            <div className="h-9" />
            {tracks.map((track) => (
              <div
                key={track.name}
                className={cn(
                  "ident flex h-16 items-center text-[11px]",
                  track.you ? "text-paper" : "text-muted-ink",
                  track.you ? "mt-4" : "mt-2"
                )}
              >
                {track.name}
              </div>
            ))}
          </div>

          <div className="relative min-w-0 flex-1">
            <div className="grid h-9 grid-cols-4">
              {phases.map((name) => (
                <div key={name} className="ident border-l border-paper/15 pl-2.5 pt-0.5 text-[11px] text-muted-ink">
                  {name}
                </div>
              ))}
            </div>

            {tracks.map((track) => (
              <div
                key={track.name}
                className={cn(
                  "grid h-16 grid-cols-8 gap-1.5",
                  track.you ? "mt-4 border-t border-dashed border-paper/15 pt-0" : "mt-2"
                )}
              >
                {track.clips.map((clip) => (
                  <div
                    key={clip.label}
                    className="clip relative h-16 overflow-hidden rounded-tight bg-ink-2 ring-1 ring-paper/10"
                    style={
                      {
                        gridColumn: `${clip.from + 1} / ${clip.to + 1}`,
                        "--s": clip.from / 8,
                        "--e": clip.to / 8,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={cn(
                        "flex h-full items-center px-3 leading-snug text-paper/45",
                        track.you ? "font-display-wide text-2xl" : "text-[13px]"
                      )}
                    >
                      {clip.label}
                    </span>
                    {/* The played part: lit, and swept exactly where the playhead has passed */}
                    <span
                      className={cn(
                        "clip-ink absolute inset-0 flex items-center px-3 leading-snug",
                        track.you
                          ? "bg-tally font-display-wide text-2xl text-ink"
                          : "bg-paper/[0.13] text-[13px] text-paper"
                      )}
                    >
                      {clip.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            <span className="playhead pointer-events-none absolute -bottom-1 top-0 w-px -translate-x-1/2 bg-paper">
              <span className="absolute -left-[5px] top-0 h-2.5 w-[11px] rounded-[2px] bg-paper" />
            </span>
          </div>
        </div>

        {/* Phones and screen readers: the same session by phase */}
        <ol className="mt-12 space-y-10 lg:sr-only">
          {phases.map((name, i) => (
            <li key={name}>
              <h3 className="font-display-wide text-2xl">{name}</h3>
              <ul className="mt-4 space-y-2.5">
                {tracks.flatMap((track) =>
                  track.clips
                    .filter((clip) => Math.floor(clip.from / 2) === i)
                    .map((clip) => (
                      <li
                        key={clip.label}
                        className={cn(
                          "flex items-baseline gap-3 rounded-tight px-3 py-2.5",
                          track.you ? "bg-tally text-ink" : "bg-ink-2 text-paper/90"
                        )}
                      >
                        <span className={cn("ident w-[5.25rem] shrink-0 text-[10px]", track.you ? "text-ink/70" : "text-muted-ink")}>
                          {track.you ? "You" : track.name}
                        </span>
                        <span className={track.you ? "font-display-wide text-lg" : "text-[15px]"}>{clip.label}</span>
                      </li>
                    ))
                )}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-muted-ink lg:mt-6">
          Want it edited too? Full episode editing and vertical clips are
          add-ons, usually ready in 3 business days.
        </p>
      </div>
    </section>
  );
}
