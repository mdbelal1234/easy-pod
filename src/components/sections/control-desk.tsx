"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { AngleShot } from "@/components/site/angle-shot";
import { ButtonLink } from "@/components/site/button-link";
import { Monitor } from "@/components/site/monitor";
import { StudioClock } from "@/components/site/studio-clock";
import { bookingHref, dayLabel, nextOpenSlots, shortTime, type DaySchedule } from "@/lib/desk";
import { angles, photos } from "@/lib/media";
import { formatTaka, packages, type PackageSlug } from "@/lib/packages";
import { sessionLengths, studioNow, type SessionLength } from "@/lib/schedule";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** How long an angle stays on program before the next cut. */
const SHOT_MS = 2600;
/** Taking an angle by hand holds it for this many shots before cutting resumes. */
const HOLD_SHOTS = 2;

const hoursLabel = (h: string) => `${h} hour${h === "1" ? "" : "s"}`;
const legend = "ident text-[11px] text-muted-ink";
const link =
  "text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper";

/** Open times for the next seven days, fetched once. `days` is null until loaded. */
function useWeek() {
  const [week, setWeek] = useState<{ days: DaySchedule[] | null; failed: boolean }>({
    days: null,
    failed: false,
  });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`/api/availability?from=${studioNow().date}&days=7`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { days: DaySchedule[] }) => setWeek({ days: d.days, failed: false }))
      .catch(() => {
        if (!ctrl.signal.aborted) setWeek({ days: null, failed: true });
      });
    return () => ctrl.abort();
  }, []);

  return week;
}

/**
 * Phones: whether the docked summary bar should show. It shows while the
 * desk is on screen and its own estimate is still below the fold, then
 * docks into that estimate. Flags <html data-dock> so the WhatsApp button
 * can make room.
 */
function useDock(desk: React.RefObject<HTMLElement | null>, readout: React.RefObject<HTMLElement | null>) {
  const [dock, setDock] = useState(false);

  useEffect(() => {
    const section = desk.current;
    const estimate = readout.current;
    if (!section || !estimate) return;
    const phone = window.matchMedia("(max-width: 63.98rem)");
    let deskOn = false;
    let estimateBelow = false;

    const apply = () => {
      const on = phone.matches && deskOn && estimateBelow;
      setDock(on);
      document.documentElement.toggleAttribute("data-dock", on);
    };
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === section) deskOn = entry.isIntersecting;
        if (entry.target === estimate) {
          estimateBelow = !entry.isIntersecting && entry.boundingClientRect.top > 0;
        }
      }
      apply();
    });
    io.observe(section);
    io.observe(estimate);
    phone.addEventListener("change", apply);
    return () => {
      io.disconnect();
      phone.removeEventListener("change", apply);
      document.documentElement.removeAttribute("data-dock");
    };
  }, [desk, readout]);

  return dock;
}

/**
 * The homepage hero: a working production desk. Choosing cameras, hours and
 * a slot answers at once on the program monitor and the estimate; TAKE
 * opens the booking form with those choices filled in.
 */
export function ControlDesk() {
  const [pkgSlug, setPkgSlug] = useState<PackageSlug>("creator-pro");
  const [hours, setHours] = useState<SessionLength>("1");
  const [picked, setPicked] = useState<string | null>(null);
  const [onAir, setOnAir] = useState(0);
  const hold = useRef(0);
  const desk = useRef<HTMLElement>(null);
  const readout = useRef<HTMLDivElement>(null);
  const week = useWeek();
  const dock = useDock(desk, readout);

  const pkg = packages.find((p) => p.slug === pkgSlug) ?? packages[1];
  const cams = pkg.cameras;
  const live = Math.min(onAir, cams - 1);

  // Cut between the package's cameras while the desk is on screen.
  useEffect(() => {
    if (cams < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    if (desk.current) io.observe(desk.current);
    const id = window.setInterval(() => {
      if (!onScreen || document.hidden) return;
      if (hold.current > 0) {
        hold.current -= 1;
        return;
      }
      setOnAir((a) => (a + 1) % cams);
    }, SHOT_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [cams]);

  const choosePackage = (slug: PackageSlug) => {
    const next = packages.find((p) => p.slug === slug);
    if (!next) return;
    setPkgSlug(slug);
    // Cut straight to the package's newest camera, and hold it for a beat.
    setOnAir(next.cameras - 1);
    hold.current = 1;
  };

  const take = (i: number) => {
    const upgrade = i >= cams ? packages.find((p) => p.cameras === i + 1) : undefined;
    if (upgrade) setPkgSlug(upgrade.slug);
    setOnAir(i);
    hold.current = HOLD_SHOTS;
  };

  const now = week.days ? studioNow() : null;
  const slots = week.days && now ? nextOpenSlots(week.days, Number(hours), now) : [];
  // A slot that no longer fits the chosen hours drops out of the list, and so out of the request.
  const slot = slots.find((s) => `${s.date}|${s.hour}` === picked) ?? null;
  const total = pkg.price * Number(hours);
  const checking = week.days === null && !week.failed;
  const request = bookingHref({ package: pkgSlug, hours, date: slot?.date, time: slot?.time });
  const when = slot && now ? `${dayLabel(slot.date, now.date)}, ${slot.time}` : null;

  return (
    <section ref={desk} aria-labelledby="desk-title" className="relative">
      <div className="desk mx-auto max-w-[1400px] gap-x-8 gap-y-5 px-4 pb-16 pt-24 sm:px-6 lg:px-10 lg:pb-12 lg:pt-20">
        <h1
          id="desk-title"
          className="relative z-10 flex flex-col items-start [grid-area:title] lg:mb-[6.5%] lg:ml-[4.5%] lg:self-end lg:[grid-area:monitor]"
        >
          <span className="bg-paper px-3 pb-1.5 pt-2.5 font-display-wide text-[clamp(2.25rem,4.4vw,4.25rem)] leading-none text-ink sm:px-4">
            You talk.
          </span>
          <span className="bg-glass px-3 pb-2.5 pt-2 font-display-wide text-[clamp(1.375rem,2.5vw,2.5rem)] leading-tight text-paper sm:px-4">
            We run the show.
          </span>
        </h1>

        <p className="max-w-[40ch] text-pretty text-lg leading-relaxed text-paper/85 [grid-area:intro] lg:text-base lg:leading-relaxed">
          A crewed video podcast studio in Vatara, Dhaka, booked by the hour.
        </p>

        {/* Program monitor */}
        <div className="[grid-area:monitor]">
          <Monitor
            live
            className="lit-now"
            label={
              <>
                PGM<span className="text-paper/55">· CAM {live + 1}</span>
              </>
            }
            meta={
              <>
                <span className="ident text-paper/55">Dhaka</span>
                <StudioClock />
              </>
            }
            note={photos.hero.stock ? "Stock photo" : undefined}
          >
            <span
              role="img"
              aria-label={`Program monitor cutting between ${cams} camera ${cams === 1 ? "angle" : "angles"} of a podcast set`}
              className="absolute inset-0 block"
            >
              {angles.map((angle, i) => (
                <span
                  key={angle.name}
                  className={cn("absolute inset-0 block overflow-hidden", i !== live && "invisible")}
                >
                  <AngleShot
                    angle={angle}
                    sizes="(min-width: 1024px) 64vw, 100vw"
                    eager
                    priority={i === 0}
                    className={cn(i === live && "shot-live")}
                  />
                </span>
              ))}
            </span>
          </Monitor>
        </div>

        {/* Angle tiles: take an angle to program, or add the camera a package lacks */}
        <div className="grid grid-cols-3 gap-2 [grid-area:tiles] sm:gap-3">
          {angles.map((angle, i) => {
            const active = i < cams;
            const adds = packages.find((p) => p.cameras === i + 1);
            return (
              <button
                key={angle.name}
                type="button"
                onClick={() => take(i)}
                aria-pressed={active ? i === live : undefined}
                aria-label={
                  active
                    ? `Put camera ${i + 1}, the ${angle.name.toLowerCase()} shot, on program`
                    : `Add camera ${i + 1} by switching to ${adds?.name}`
                }
                className="group block w-full rounded-[5px] text-left"
              >
                <Monitor
                  as="span"
                  size="sm"
                  live={active && i === live}
                  label={
                    <>
                      CAM {i + 1}
                      <span className="hidden text-paper/55 sm:inline">· {angle.name}</span>
                    </>
                  }
                >
                  <AngleShot
                    angle={angle}
                    sizes="(min-width: 1024px) 21vw, 33vw"
                    eager
                    className={cn(
                      "transition-[filter] duration-300",
                      active ? "group-hover:brightness-110" : "brightness-[0.2] grayscale"
                    )}
                  />
                  {!active && (
                    <span className="absolute bottom-[6%] left-[calc(6%+1.125rem)] right-2 z-[3] flex items-center gap-1 text-[11px] leading-none text-paper/85 sm:text-xs">
                      <Plus aria-hidden className="size-3 shrink-0" strokeWidth={2.25} />
                      <span className="sm:hidden">Add</span>
                      <span className="hidden sm:inline">
                        <span className="text-muted-ink">Add with </span>
                        {adds?.name}
                      </span>
                    </span>
                  )}
                </Monitor>
              </button>
            );
          })}
        </div>

        {/* Controls, packed like a console; the readout and TAKE sit at the foot */}
        <div className="flex flex-col gap-6 [grid-area:panel]">
          <fieldset>
            <legend className={legend}>Cameras</legend>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {packages.map((p) => (
                <label key={p.slug} className="key items-center gap-2.5 px-2.5 py-2.5 sm:px-3">
                  <input
                    type="radio"
                    name="desk-package"
                    value={p.slug}
                    checked={p.slug === pkgSlug}
                    onChange={() => choosePackage(p.slug)}
                    aria-label={`${p.name}: ${p.cameras} ${p.cameras === 1 ? "camera" : "cameras"}, ${formatTaka(p.price)} an hour`}
                    className="sr-only"
                  />
                  <span aria-hidden className="font-display-wide text-[1.75rem] leading-none">
                    {p.cameras}
                  </span>
                  <span aria-hidden className="min-w-0">
                    <span className="block text-xs font-medium leading-tight">{p.name}</span>
                    <span className="key-sub mt-0.5 block font-mono text-[11px] tabular-nums">
                      {formatTaka(p.price)}/h
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={legend}>Hours</legend>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {sessionLengths.map((h) => (
                <label key={h} className="key items-center justify-center py-2 text-sm tabular-nums">
                  <input
                    type="radio"
                    name="desk-hours"
                    value={h}
                    checked={h === hours}
                    onChange={() => setHours(h)}
                    aria-label={hoursLabel(h)}
                    className="sr-only"
                  />
                  <span aria-hidden>{h}h</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset aria-describedby="desk-slot-status">
            <legend className={legend}>Next open</legend>
            <div aria-busy={checking || undefined} className="mt-2.5 grid grid-cols-3 gap-2">
              {checking
                ? [0, 1, 2].map((i) => (
                    <span
                      key={i}
                      aria-hidden
                      className="key pointer-events-none h-[42px] opacity-60 motion-safe:animate-pulse"
                    />
                  ))
                : now &&
                  slots.map((s) => {
                    const value = `${s.date}|${s.hour}`;
                    return (
                      <label key={value} className="key items-baseline justify-center gap-1.5 px-1 py-2.5 text-xs">
                        <input
                          type="radio"
                          name="desk-slot"
                          value={value}
                          checked={value === picked}
                          onChange={() => setPicked(value)}
                          aria-label={`${dayLabel(s.date, now.date)} at ${s.time}`}
                          className="sr-only"
                        />
                        <span aria-hidden>{dayLabel(s.date, now.date)}</span>
                        <span aria-hidden className="font-mono tabular-nums">
                          {shortTime(s.hour)}
                        </span>
                      </label>
                    );
                  })}
            </div>
            <p id="desk-slot-status" role="status" className="mt-2 text-xs leading-relaxed text-muted-ink empty:hidden">
              {checking ? (
                "Checking open times…"
              ) : week.failed ? (
                <>
                  We couldn&apos;t check open times.{" "}
                  <a href="#book" className={link}>
                    Pick one in the form
                  </a>
                  .
                </>
              ) : slots.length === 0 ? (
                `Nothing is free this week for ${hoursLabel(hours)}. Try fewer hours, or ask us on WhatsApp.`
              ) : (
                ""
              )}
            </p>
          </fieldset>

          <div ref={readout}>
            {/* The readout: a small display on the desk */}
            <div className="rounded-tight bg-glass p-4 ring-1 ring-paper/10">
              <p className={legend}>Estimate</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-paper">
                    {pkg.name} · {hoursLabel(hours)}
                  </p>
                  <p className="text-xs text-muted-ink">
                    {when ?? "Crew, lights and 4K cameras included"}
                  </p>
                </div>
                <p aria-live="polite" aria-atomic="true" className="shrink-0">
                  <span className="sr-only">Estimate: </span>
                  <span key={total} className="tick block font-display-wide text-4xl leading-none tabular-nums">
                    {formatTaka(total)}
                  </span>
                </p>
              </div>
            </div>

            <ButtonLink href={request} className="mt-3 w-full">
              Request this session
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-muted-ink">
              Questions first?{" "}
              <a
                href={waLink("Hi! I have a question before I book a session at EasyPod Studio.")}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Phones: the estimate and TAKE ride along until the desk's own readout scrolls in */}
      <div
        inert={!dock}
        aria-hidden={!dock}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-paper/12 bg-ink-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_32px_-20px_rgb(0_0_0/0.9)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:px-6 lg:hidden",
          dock ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-ink">
              {pkg.name} · {hoursLabel(hours)}
              {when ? ` · ${when}` : ""}
            </p>
            <p key={total} className="tick font-display-wide text-2xl leading-tight tabular-nums">
              {formatTaka(total)}
            </p>
          </div>
          <ButtonLink href={request} className="h-11 shrink-0 px-4 text-sm">
            Request
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
