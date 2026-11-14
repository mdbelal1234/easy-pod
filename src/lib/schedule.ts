/**
 * Studio schedule rules, shared by the booking form and the server so both
 * agree on which start times are free. Hours are whole 24h clock hours in
 * Dhaka time; bookings store their start as a label like "11:00 AM".
 */
export const STUDIO_TIME_ZONE = "Asia/Dhaka";

/** The studio closes at 10 PM; no session may run past it. */
export const CLOSING_HOUR = 22;

/** Bookable start times, 9 AM to 6 PM. */
export const startHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;

export const sessionLengths = ["1", "2", "3", "4"] as const;
export type SessionLength = (typeof sessionLengths)[number];

/** Bookings in these states hold their slot. */
export const holdingStatuses = ["PENDING", "APPROVED"] as const;

export function slotLabel(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${hour < 12 ? "AM" : "PM"}`;
}

/** "11:00 AM" -> 11. Returns null for anything that isn't a slot label. */
export function parseSlot(label: string): number | null {
  const match = /^(\d{1,2}):00 (AM|PM)$/.exec(label.trim());
  if (!match) return null;
  const h = Number(match[1]) % 12;
  return match[2] === "PM" ? h + 12 : h;
}

/** Every clock hour taken by existing bookings on one day. */
export function occupiedHours(bookings: { preferredTime: string; durationHours: number }[]) {
  const hours = new Set<number>();
  for (const b of bookings) {
    const start = parseSlot(b.preferredTime);
    if (start === null) continue;
    for (let h = start; h < start + b.durationHours; h++) hours.add(h);
  }
  return [...hours].sort((a, b) => a - b);
}

/** A session fits when every hour it needs is open and it ends by closing. */
export function fits(start: number, length: number, occupied: Iterable<number>, notBefore = 0) {
  if (start < notBefore || start + length > CLOSING_HOUR) return false;
  const taken = new Set(occupied);
  for (let h = start; h < start + length; h++) if (taken.has(h)) return false;
  return true;
}

/** Today's date (YYYY-MM-DD) and current hour at the studio. */
export function studioNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: STUDIO_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour) };
}

/** The UTC-midnight range a "YYYY-MM-DD" booking date is stored under. */
export function dayRange(date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  return { gte: start, lt: new Date(start.getTime() + 86_400_000) };
}

export const isIsoDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
