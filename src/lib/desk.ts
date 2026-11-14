/**
 * Helpers for the homepage desk: the next open slots, the studio's live
 * status and the hand-off link that pre-fills the booking form. Pure
 * functions, so the tests in desk.test.ts can pin them down.
 */
import { packages, type PackageSlug } from "@/lib/packages";
import {
  CLOSING_HOUR,
  STUDIO_TIME_ZONE,
  fits,
  isIsoDate,
  occupiedHours,
  parseSlot,
  sessionLengths,
  slotLabel,
  startHours,
} from "@/lib/schedule";

/** The studio opens at 9 AM every day. */
export const OPENING_HOUR = 9;

export type DaySchedule = { date: string; occupied: number[] };
export type OpenSlot = { date: string; hour: number; time: string };

/** What the desk hands to the booking form. Every field is optional. */
export type SessionRequest = {
  package?: PackageSlug;
  hours?: string;
  date?: string;
  time?: string;
};

/** "2026-10-31" + 1 -> "2026-11-01". Calendar math in UTC, so no DST drift. */
export function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Every day from `from` for `days` days, with the clock hours bookings hold on it. */
export function scheduleByDay(
  bookings: { preferredDate: Date; preferredTime: string; durationHours: number }[],
  from: string,
  days: number
): DaySchedule[] {
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(from, i);
    const held = bookings.filter((b) => b.preferredDate.toISOString().slice(0, 10) === date);
    return { date, occupied: occupiedHours(held) };
  });
}

/** The first `limit` start times that fit a session of `hours`, earliest first. */
export function nextOpenSlots(
  days: DaySchedule[],
  hours: number,
  now: { date: string; hour: number },
  limit = 3
): OpenSlot[] {
  const slots: OpenSlot[] = [];
  for (const day of days) {
    if (day.date < now.date) continue;
    // Today, a session can only start after the current hour.
    const notBefore = day.date === now.date ? now.hour + 1 : 0;
    for (const hour of startHours) {
      if (!fits(hour, hours, day.occupied, notBefore)) continue;
      slots.push({ date: day.date, hour, time: slotLabel(hour) });
      if (slots.length === limit) return slots;
    }
  }
  return slots;
}

/** "Today", "Tomorrow", or a short day such as "Wed 14". */
export function dayLabel(date: string, today: string) {
  if (date === today) return "Today";
  if (date === addDays(today, 1)) return "Tomorrow";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** 16 -> "4 PM", for compact slot keys. */
export function shortTime(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h} ${hour < 12 ? "AM" : "PM"}`;
}

/** Open daily from 9 AM until 10 PM, studio time. */
export function studioStatus(hour: number) {
  const open = hour >= OPENING_HOUR && hour < CLOSING_HOUR;
  return { open, label: open ? "Open now · until 10 PM" : "Closed · opens 9 AM" };
}

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: STUDIO_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/** Studio wall-clock time, e.g. "16:04:09". */
export function dhakaClock(now = new Date()) {
  return clock.format(now);
}

/** Link to the booking form with the desk's choices filled in. */
export function bookingHref(session: SessionRequest) {
  const query = new URLSearchParams();
  for (const key of ["package", "hours", "date", "time"] as const) {
    const value = session[key];
    if (value) query.set(key, value);
  }
  const qs = query.toString();
  return `/${qs ? `?${qs}` : ""}#book`;
}

/** Reads ?package=&hours=&date=&time= and keeps only values the form accepts. */
export function parseSessionParams(
  params: { get(name: string): string | null },
  today: string
): SessionRequest {
  const session: SessionRequest = {};

  const pkg = packages.find((p) => p.slug === params.get("package"));
  if (pkg) session.package = pkg.slug;

  const hours = params.get("hours");
  if (hours && (sessionLengths as readonly string[]).includes(hours)) session.hours = hours;

  const date = params.get("date");
  if (date && isIsoDate(date) && date >= today) session.date = date;

  const start = parseSlot(params.get("time") ?? "");
  if (start !== null && (startHours as readonly number[]).includes(start)) {
    session.time = slotLabel(start);
  }

  return session;
}
