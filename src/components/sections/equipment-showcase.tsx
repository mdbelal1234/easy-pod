"use client";

import { useId, useRef, useState } from "react";
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
    label: "Audio",
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

export function EquipmentShowcase() {
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
    <section id="studio" className="scroll-mt-16 border-t border-paper/10 bg-ink-2/40 py-24 lg:py-32">
      {/* Mobile: heading and tabs, the panel, then the WhatsApp line. Desktop: tabs beside the panel. */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-x-20 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:px-10">
        <div>
          <h2 className="reveal font-display-wide text-4xl leading-[1.02] sm:text-5xl">
            What the studio does for you.
          </h2>

          <div
            role="tablist"
            aria-label="Studio equipment"
            aria-orientation="vertical"
            className="-mx-4 mt-10 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:mt-14 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {groups.map((g, i) => (
              <button
                key={g.label}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group flex shrink-0 snap-start items-baseline justify-between gap-6 rounded-tight border px-4 py-2.5 text-left transition-colors",
                  "lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-5 lg:last:border-b",
                  i === active
                    ? "border-tally text-paper lg:border-paper/10"
                    : "border-paper/15 text-dim hover:text-paper lg:border-paper/10"
                )}
              >
                <span className="flex items-center gap-3 text-base font-medium lg:font-display-wide lg:text-2xl">
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-2 w-5 origin-left rounded-[2px] transition-[transform,background-color] duration-300 ease-out lg:block",
                      i === active ? "bg-tally" : "scale-x-0 bg-paper/40 group-hover:scale-x-40"
                    )}
                  />
                  {g.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Every panel shares one grid cell, so the section keeps the height of
            the tallest and switching tabs never shifts the page below. */}
        <div className="mt-8 grid lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
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
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  on ? "visible opacity-100" : "invisible translate-y-2 opacity-0"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-tight sm:aspect-[16/10]">
                  <Photo slot={g.photo} sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>

                <p className="mt-8 max-w-[52ch] text-pretty text-xl leading-snug text-paper">
                  {g.lead}
                </p>

                <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {g.points.map((point) => (
                    <li key={point.title}>
                      <p className="font-medium text-paper">{point.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                        {point.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-muted-ink lg:mt-8">
          Want the exact equipment list?{" "}
          <a
            href={waLink("Hi! Could you share the full equipment list for EasyPod Studio?")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline decoration-tally underline-offset-4 hover:text-tally"
          >
            Ask us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
