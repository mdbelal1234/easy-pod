"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonLink } from "@/components/site/button-link";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import { createBooking } from "@/lib/actions/booking";
import { parseSessionParams, type SessionRequest } from "@/lib/desk";
import { formatTaka, packages, type PackageSlug } from "@/lib/packages";
import { waLink } from "@/lib/site";
import {
  fits,
  isIsoDate,
  parseSlot,
  sessionLengths,
  slotLabel,
  startHours,
  studioNow,
  type SessionLength,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

const recordingTypes = [
  { value: "PODCAST", label: "Audio podcast" },
  { value: "VIDEO_PODCAST", label: "Video podcast" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "LIVESTREAM", label: "Live stream" },
  { value: "SHORTS_REELS", label: "Shorts and reels" },
  { value: "CORPORATE", label: "Corporate content" },
  { value: "OTHER", label: "Something else" },
] as const;

const hoursLabel = (h: number) => `${h} hour${h === 1 ? "" : "s"}`;

const shortDay = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

/**
 * Clock hours already booked on `date`, fetched whenever the date changes.
 * `refresh` re-asks after the server reports a slot was taken meanwhile.
 */
function useOccupiedHours(date: string | undefined, refresh: number) {
  const key = date && isIsoDate(date) ? `${date}#${refresh}` : null;
  const [result, setResult] = useState<{ key: string; occupied: number[]; failed: boolean } | null>(null);

  useEffect(() => {
    if (!key) return;
    const ctrl = new AbortController();
    fetch(`/api/availability?date=${key.split("#")[0]}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { occupied: number[] }) => setResult({ key, occupied: d.occupied, failed: false }))
      .catch(() => {
        if (!ctrl.signal.aborted) setResult({ key, occupied: [], failed: true });
      });
    return () => ctrl.abort();
  }, [key]);

  const current = key && result?.key === key ? result : null;
  return {
    occupied: current?.occupied ?? [],
    loading: Boolean(key) && !current,
    failed: current?.failed ?? false,
  };
}

/** Every selectable option is a desk key: a radio hidden inside it, lit when chosen. */
const option = "key text-sm";

const labelText = "text-sm font-medium text-paper";

/**
 * Fills in what the desk or a pricing button passed as
 * `?package=&hours=&date=&time=`; values the form can't accept are dropped.
 */
function SessionFromUrl({ onSession }: { onSession: (session: SessionRequest) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const session = parseSessionParams(params, studioNow().date);
    if (Object.keys(session).length > 0) onSession(session);
  }, [params, onSession]);
  return null;
}

function ErrorText({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-tally-hover">
      {error.message}
    </p>
  );
}

function Optional() {
  return <span className="font-normal text-dim"> (optional)</span>;
}

function Confirmation({ date, time, hours }: { date: string; time: string; hours: number }) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  const day = new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="py-6 sm:py-10">
      {/* The REC dot from the submit button settles into the check. */}
      <span className="settle flex size-12 items-center justify-center rounded-tight bg-tally text-ink">
        <Check className="settle-check size-6" strokeWidth={2.5} />
      </span>
      <h3
        ref={heading}
        tabIndex={-1}
        className="rise mt-8 font-display-wide text-3xl leading-tight outline-none sm:text-4xl"
        style={{ "--d": "250ms" } as React.CSSProperties}
      >
        Request received.
      </h3>
      <p
        className="rise mt-4 max-w-[46ch] text-pretty text-lg leading-relaxed text-muted-ink"
        style={{ "--d": "330ms" } as React.CSSProperties}
      >
        We&apos;ve got your request for {day} at {time}, {hoursLabel(hours)}.
        Expect a confirmation by email and WhatsApp within 24 hours.
      </p>
      <div className="rise mt-8" style={{ "--d": "410ms" } as React.CSSProperties}>
        <ButtonLink
          href={waLink(`Hi! I just requested a session at EasyPod Studio for ${day} at ${time}.`)}
          variant="line"
        >
          Chat on WhatsApp
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </div>
  );
}

export function BookingForm() {
  const [booked, setBooked] = useState<{ date: string; time: string; hours: number } | null>(null);
  /** Package option to flash after arriving from a pricing button. */
  const [cue, setCue] = useState<PackageSlug | null>(null);
  const [refresh, setRefresh] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { package: "", hours: "1" },
  });

  const [pkgSlug, hoursValue, date, time] = useWatch({
    control,
    name: ["package", "hours", "preferredDate", "preferredTime"],
  });

  const applySession = useCallback(
    (session: SessionRequest) => {
      if (session.package) {
        setValue("package", session.package);
        setCue(session.package);
      }
      if (session.hours) setValue("hours", session.hours as SessionLength);
      if (session.date) setValue("preferredDate", session.date);
      if (session.time) setValue("preferredTime", session.time);
    },
    [setValue]
  );

  const hours = Number(hoursValue) || 1;
  const pkg = packages.find((p) => p.slug === pkgSlug);
  const { occupied, loading, failed } = useOccupiedHours(date, refresh);

  // Today, sessions can only start after the current hour.
  const now = studioNow();
  const notBefore = date === now.date ? now.hour + 1 : 0;
  const isFree = (start: number) => !date || fits(start, hours, occupied, notBefore);

  const dayChecked = Boolean(date) && !loading && !failed;
  const dayFull = dayChecked && startHours.every((h) => !isFree(h));
  const chosenStart = time ? parseSlot(time) : null;
  const conflict = dayChecked && chosenStart !== null && !isFree(chosenStart);

  const onSubmit = async (data: BookingFormData) => {
    if (conflict) {
      setError("preferredTime", { message: "That time isn't free any more. Pick another." });
      return;
    }
    const result = await createBooking(data);
    if (result.error) {
      if ("slotTaken" in result) {
        setRefresh((n) => n + 1);
        setError("preferredTime", { message: result.error });
      }
      toast.error(result.error);
      return;
    }
    setBooked({ date: data.preferredDate, time: data.preferredTime, hours: Number(data.hours) });
  };

  if (booked) return <Confirmation {...booked} />;

  /** aria wiring for a field and its error message. */
  const a11y = (name: keyof BookingFormData) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const end = chosenStart !== null ? chosenStart + hours : null;
  const when = date
    ? `${shortDay(date)}${chosenStart !== null && end !== null ? `, ${slotLabel(chosenStart)} to ${slotLabel(end)}` : ""}`
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-9">
      <Suspense fallback={null}>
        <SessionFromUrl onSession={applySession} />
      </Suspense>

      <fieldset>
        <legend className={labelText}>Package</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {packages.map((p) => (
            <label
              key={p.slug}
              className={cn(option, "flex-col gap-1 p-3.5", cue === p.slug && "cue")}
              onAnimationEnd={(e) => {
                if (e.animationName.startsWith("cue")) setCue(null);
              }}
            >
              <input type="radio" value={p.slug} {...register("package")} className="sr-only" />
              <span className="font-medium leading-snug">{p.name}</span>
              <span className="key-sub font-mono text-xs tabular-nums">
                {formatTaka(p.price)} / hour
              </span>
            </label>
          ))}
          <label className={cn(option, "flex-col gap-1 p-3.5")}>
            <input type="radio" value="" {...register("package")} className="sr-only" />
            <span className="font-medium leading-snug">Not sure yet</span>
            <span className="key-sub text-xs">We&apos;ll help you pick</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelText}>What are you recording?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {recordingTypes.map((type) => (
            <label key={type.value} className={cn(option, "px-3.5 py-2")}>
              <input
                type="radio"
                value={type.value}
                {...register("recordingType")}
                {...a11y("recordingType")}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
        <ErrorText id="recordingType-error" error={errors.recordingType} />
      </fieldset>

      <div className="grid gap-x-4 gap-y-9 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <div>
          <label htmlFor="preferredDate" className={labelText}>
            Date
          </label>
          <Input
            id="preferredDate"
            type="date"
            {...register("preferredDate")}
            {...a11y("preferredDate")}
            min={now.date}
            className="mt-3"
          />
          <ErrorText id="preferredDate-error" error={errors.preferredDate} />
        </div>

        <fieldset>
          <legend className={labelText}>How long?</legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {sessionLengths.map((length) => (
              <label key={length} className={cn(option, "justify-center px-1 py-2.5 tabular-nums")}>
                <input type="radio" value={length} {...register("hours")} className="sr-only" />
                {hoursLabel(Number(length))}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset aria-describedby="slot-status">
        <legend className={labelText}>Start time</legend>
        <div
          aria-busy={loading || undefined}
          className={cn(
            "mt-3 grid grid-cols-3 gap-2 transition-opacity duration-200 sm:grid-cols-5",
            loading && "opacity-50"
          )}
        >
          {startHours.map((h) => {
            const label = slotLabel(h);
            const free = isFree(h);
            return (
              <label
                key={h}
                className={cn(
                  option,
                  "justify-center py-2.5 tabular-nums",
                  !free &&
                    "cursor-not-allowed line-through decoration-paper/30 has-checked:border-tally-hover has-checked:bg-transparent has-checked:text-tally-hover has-checked:decoration-tally-hover"
                )}
              >
                <input
                  type="radio"
                  value={label}
                  disabled={!free && time !== label}
                  {...register("preferredTime")}
                  {...a11y("preferredTime")}
                  className="sr-only"
                />
                {label}
                {!free && <span className="sr-only"> (not available)</span>}
              </label>
            );
          })}
        </div>
        <p id="slot-status" role="status" className="mt-3 text-sm text-muted-ink empty:hidden">
          {!date
            ? "Pick a date to see which times are open."
            : loading
            ? "Checking open times…"
            : failed
            ? "We couldn't check open times. Pick one and we'll confirm it."
            : dayFull
            ? `Nothing is free for ${hoursLabel(hours)} that day. Try a shorter session or another date.`
            : conflict
            ? `${time} isn't free for ${hoursLabel(hours)} that day. Pick another time.`
            : ""}
        </p>
        <ErrorText id="preferredTime-error" error={errors.preferredTime} />
      </fieldset>

      <div className="grid gap-x-4 gap-y-6 border-t border-paper/10 pt-9 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelText}>
            Name
          </label>
          <Input id="name" autoComplete="name" {...register("name")} {...a11y("name")} className="mt-2" />
          <ErrorText id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="phone" className={labelText}>
            Phone or WhatsApp
          </label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+880 1XXX-XXXXXX"
            {...register("phone")}
            {...a11y("phone")}
            className="mt-2"
          />
          <ErrorText id="phone-error" error={errors.phone} />
        </div>
        <div>
          <label htmlFor="email" className={labelText}>
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            {...a11y("email")}
            className="mt-2"
          />
          <ErrorText id="email-error" error={errors.email} />
        </div>
        <div>
          <label htmlFor="company" className={labelText}>
            Company or show name
            <Optional />
          </label>
          <Input id="company" autoComplete="organization" {...register("company")} className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelText}>
            Anything we should know?
            <Optional />
          </label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Number of guests, the format of the show, a backdrop colour you'd like"
            rows={3}
            className="mt-2"
          />
        </div>
      </div>

      {/* Live summary of the request, so the price is never a surprise. */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-paper/10 pt-7">
        <div className="min-w-0">
          <p className="text-paper">
            {pkg ? pkg.name : "No package yet"}
            <span className="text-muted-ink"> · {hoursLabel(hours)}</span>
          </p>
          <p className="mt-1 text-sm text-muted-ink tabular-nums">{when ?? "Pick a date and start time"}</p>
        </div>
        <div className="sm:text-right" aria-live="polite" aria-atomic="true">
          {pkg ? (
            <>
              <p className="text-sm text-muted-ink">Estimate</p>
              <p key={pkg.price * hours} className="tick font-display-wide text-3xl tabular-nums sm:text-4xl">
                {formatTaka(pkg.price * hours)}
              </p>
            </>
          ) : (
            <p className="max-w-[24ch] text-sm text-muted-ink">
              Pick a package to see a price, or we&apos;ll help you choose.
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-tight bg-tally text-[15px] font-medium text-ink transition-[background-color,transform] duration-200 hover:bg-tally-hover active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <span aria-hidden className="size-2 rounded-full bg-ink motion-safe:animate-pulse" />
            Sending request
          </>
        ) : (
          "Request booking"
        )}
      </button>
    </form>
  );
}
