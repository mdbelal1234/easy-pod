"use client";

import { useId, useRef, useState } from "react";
import { Monitor } from "@/components/site/monitor";
import { Photo } from "@/components/site/photo";
import { photos, type PhotoSlot } from "@/lib/media";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/site";

type Point = { title: string; body: string };

// Outcomes, not model numbers: the full equipment list is shared on WhatsApp.
const groups: { label: string; photo: PhotoSlot; lead: string; points: Point[] }[] = [
  {
    label: "Cameras",
    photo: photos.cameras,
    lead: "Up to three 4K angles, so your episode cuts like a show instead of a video call.",
    points: [
      {
        title: "Wide, medium and close",
        body: "Switching between angles keeps viewers watching and gives you clean frames for clips and thumbnails.",
      },
      {
        title: "Framed for you",
        body: "We set height, framing and focus before you sit down. You never touch a camera.",
      },
      {
        title: "Recorded in sync",
        body: "Every angle runs together, so editing the episode afterwards is quick.",
      },
    ],
  },
  {
    label: "Lenses",
    photo: photos.lenses,
    lead: "The right lens is the difference between a cinematic shot and a flat one.",
    points: [
      {
        title: "Soft, blurred backgrounds",
        body: "Portrait lenses keep the focus on your face and make the set feel deeper.",
      },
      {
        title: "The whole conversation",
        body: "Wide shots show everyone at the table, so viewers always know who is talking to whom.",
      },
      {
        title: "Products and details",
        body: "Holding up a book or a product? We frame it sharply without stopping the session.",
      },
    ],
  },
  {
    label: "Lighting",
    photo: photos.lighting,
    lead: "Good light makes you look rested and sharp, even at the end of a long day.",
    points: [
      {
        title: "Flattering on every face",
        body: "Soft key and fill light avoids harsh shadows, for hosts and guests alike.",
      },
      {
        title: "Your colours on set",
        body: "Coloured background light and a choice of backdrops let the set match your brand.",
      },
    ],
  },
  {
    label: "Sound",
    photo: photos.audio,
    lead: "Viewers forgive average video. They click away from bad sound.",
    points: [
      {
        title: "A mic for every voice",
        body: "Each speaker gets their own microphone, so nobody sounds distant or drowned out.",
      },
      {
        title: "Mixed while you talk",
        body: "Levels are balanced live during recording, so there is less to clean up later.",
      },
      {
        title: "Your voice, not the room",
        body: "Close-range broadcast mics pick up what you say and leave the background out.",
      },
    ],
  },
  {
    label: "The room",
    photo: photos.room,
    lead: "A quiet, comfortable space where you forget you are being recorded.",
    points: [
      {
        title: "No echo",
        body: "Acoustic treatment on the walls keeps every voice clear and close.",
      },
      {
        title: "Comfortable for long sessions",
        body: "Air-conditioned, with seating for guests while they wait their turn.",
      },
      {
        title: "Read without looking away",
        body: "A teleprompter lets you deliver intros and scripts while keeping eye contact with the camera.",
      },
    ],
  },
];

/**
 * The studio as a source bus: take a source and the monitor cuts to it, the
 * picture coming up from black. Every panel shares one grid cell, so the
 * section keeps the height of the tallest and switching never shifts the page.
 */
export function StudioSources() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + groups.length) % groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="studio" className="scroll-mt-16 bg-ink-2/40 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[14ch] font-display-wide text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02]">
            What the studio does for you.
          </h2>
          <p className="text-sm text-muted-ink lg:pb-2">
            Want the exact equipment list?{" "}
            <a
              href={waLink("Hi! Could you share the full equipment list for EasyPod Studio?")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
            >
              Ask us on WhatsApp
            </a>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-10 lg:mt-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
          {/* Source bus */}
          <div
            role="tablist"
            aria-label="Studio sources"
            aria-orientation="vertical"
            className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-0 lg:self-start lg:overflow-visible lg:px-0"
          >
            {groups.map((g, i) => {
              const on = i === active;
              return (
                <button
                  key={g.label}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${id}-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "group flex shrink-0 snap-start items-center gap-3 rounded-tight border px-4 py-2.5 text-left transition-colors",
                    "lg:rounded-none lg:border-0 lg:border-t lg:border-paper/10 lg:px-0 lg:py-5 lg:last:border-b",
                    on ? "border-paper/60 text-paper" : "border-paper/15 text-dim hover:text-paper"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-2 shrink-0 rounded-full transition-colors",
                      on ? "bg-tally" : "bg-paper/20 group-hover:bg-paper/50"
                    )}
                  />
                  <span className="text-base font-medium lg:font-display-wide lg:text-2xl">{g.label}</span>
                </button>
              );
            })}
          </div>

          {/* Program: the source on air */}
          <div className="mt-8 grid lg:mt-0">
            {groups.map((g, i) => {
              const on = i === active;
              return (
                <div
                  key={g.label}
                  role="tabpanel"
                  id={`${id}-panel-${i}`}
                  aria-labelledby={`${id}-tab-${i}`}
                  aria-hidden={!on}
                  inert={!on}
                  className={cn("col-start-1 row-start-1", !on && "invisible")}
                >
                  <div className="relative">
                    {/* Lights come up as the monitor scrolls in, and again on every cut. */}
                    <div className="lit rounded-tight">
                      <Monitor
                        live
                        className={cn(on && "lit-now")}
                        note={g.photo.stock ? "Stock photo" : undefined}
                        label={
                          <>
                            PGM<span className="text-paper/55">· {g.label}</span>
                          </>
                        }
                      >
                        <Photo slot={g.photo} sizes="(min-width: 1024px) 66vw, 100vw" />
                      </Monitor>
                    </div>
                    <p className="mt-6 max-w-[52ch] text-pretty text-xl leading-snug text-paper lg:absolute lg:bottom-[7%] lg:left-[4.5%] lg:z-10 lg:mt-0 lg:max-w-[min(60%,34rem)] lg:bg-glass/90 lg:px-5 lg:py-4">
                      {g.lead}
                    </p>
                  </div>

                  <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-3">
                    {g.points.map((point) => (
                      <li key={point.title}>
                        <p className="font-medium text-paper">{point.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-ink">{point.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
