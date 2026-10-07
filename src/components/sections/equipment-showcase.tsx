"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Photo } from "@/components/site/photo";
import { photos, type PhotoSlot } from "@/lib/media";
import { cn } from "@/lib/utils";

type Item = { name: string; role: string; benefit: string };

const groups: { label: string; photo: PhotoSlot; items: Item[] }[] = [
  {
    label: "Cameras",
    photo: photos.cameras,
    items: [
      {
        name: "Sony Alpha 7 IV",
        role: "Full-frame main camera",
        benefit: "Cinematic footage that looks like a TV production, not a webcam call.",
      },
      {
        name: "Sony ZV-1",
        role: "Close-up camera",
        benefit: "Sharp, flattering close-ups with a soft background.",
      },
      {
        name: "Sony ZV-E10",
        role: "Second-angle camera",
        benefit: "An extra interchangeable-lens angle that matches the main camera's colour.",
      },
    ],
  },
  {
    label: "Lenses",
    photo: photos.lenses,
    items: [
      {
        name: "Sony FE 85mm F1.8",
        role: "Portrait prime",
        benefit: "Magazine-style portraits of hosts and guests.",
      },
      {
        name: "Tamron 17-28mm F2.8",
        role: "Wide zoom",
        benefit: "Establishing shots that take in the whole set.",
      },
      {
        name: "Sony 18-105mm F4",
        role: "Standard zoom",
        benefit: "Product shots and B-roll without a lens change.",
      },
    ],
  },
  {
    label: "Lighting",
    photo: photos.lighting,
    items: [
      {
        name: "Godox SL60II",
        role: "Key and fill",
        benefit: "Soft, colour-accurate light on every face.",
      },
      {
        name: "Godox LC500R and RGB",
        role: "Background lighting",
        benefit: "Colour accents that set the mood and match your brand.",
      },
    ],
  },
  {
    label: "Audio",
    photo: photos.audio,
    items: [
      {
        name: "RodeCaster Duo",
        role: "Production console",
        benefit: "Levels mixed live, so there is less to fix later.",
      },
      {
        name: "Rode PodMic and DJI Mic 2",
        role: "Dynamic and wireless mics",
        benefit: "A warm, close voice with room noise kept out.",
      },
    ],
  },
  {
    label: "The room",
    photo: photos.room,
    items: [
      {
        name: "Acoustic treatment",
        role: "Controlled room",
        benefit: "Treated walls stop echo before it reaches the mic.",
      },
      {
        name: "Desview T12S",
        role: "Teleprompter",
        benefit: "Read intros and scripts while keeping eye contact with the lens.",
      },
      {
        name: "Synced multi-cam",
        role: "Recording",
        benefit: "Every angle recorded together, ready to cut into one edit.",
      },
    ],
  },
];

export function EquipmentShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const id = useId();
  const group = groups[active];

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
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-10">
        <div>
          <h2 className="reveal font-display-wide text-4xl leading-[1.02] sm:text-5xl">
            The kit, and what it does for you.
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
                aria-controls={`${id}-panel`}
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
                      "hidden size-2 rounded-[2px] transition-colors lg:block",
                      i === active ? "bg-tally" : "bg-transparent"
                    )}
                  />
                  {g.label}
                </span>
                <span className="hidden font-mono text-xs text-dim lg:inline">
                  {g.items.length} items
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-tight sm:aspect-[16/10]">
                <Photo slot={group.photo} sizes="(min-width: 1024px) 55vw, 100vw" />
              </div>

              <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <p className="font-medium text-paper">{item.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-tally">{item.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                      {item.benefit}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
