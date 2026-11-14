import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  bookingHref,
  dayLabel,
  dhakaClock,
  nextOpenSlots,
  parseSessionParams,
  scheduleByDay,
  shortTime,
  studioStatus,
} from "./desk";

test("addDays crosses month ends", () => {
  assert.equal(addDays("2026-10-31", 1), "2026-11-01");
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
});

test("nextOpenSlots skips past hours today and booked hours", () => {
  const slots = nextOpenSlots(
    [
      { date: "2026-10-11", occupied: [16, 17] },
      { date: "2026-10-12", occupied: [] },
    ],
    1,
    { date: "2026-10-11", hour: 15 }
  );
  assert.deepEqual(
    slots.map((s) => `${s.date} ${s.time}`),
    ["2026-10-11 6:00 PM", "2026-10-12 9:00 AM", "2026-10-12 10:00 AM"]
  );
});

test("nextOpenSlots rolls to tomorrow after the last start hour", () => {
  const slots = nextOpenSlots(
    [
      { date: "2026-10-11", occupied: [] },
      { date: "2026-10-12", occupied: [9] },
    ],
    2,
    { date: "2026-10-11", hour: 19 },
    2
  );
  assert.deepEqual(
    slots.map((s) => s.time),
    ["10:00 AM", "11:00 AM"]
  );
});

test("nextOpenSlots returns nothing for a fully booked day", () => {
  const full = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  assert.deepEqual(
    nextOpenSlots([{ date: "2026-10-12", occupied: full }], 1, { date: "2026-10-11", hour: 10 }),
    []
  );
});

test("scheduleByDay lists every day in the range with its booked hours", () => {
  const days = scheduleByDay(
    [
      { preferredDate: new Date("2026-10-12T00:00:00Z"), preferredTime: "10:00 AM", durationHours: 2 },
      { preferredDate: new Date("2026-10-12T00:00:00Z"), preferredTime: "3:00 PM", durationHours: 1 },
      { preferredDate: new Date("2026-10-13T00:00:00Z"), preferredTime: "9:00 AM", durationHours: 1 },
    ],
    "2026-10-11",
    3
  );
  assert.deepEqual(days, [
    { date: "2026-10-11", occupied: [] },
    { date: "2026-10-12", occupied: [10, 11, 15] },
    { date: "2026-10-13", occupied: [9] },
  ]);
});

test("dayLabel and shortTime", () => {
  assert.equal(dayLabel("2026-10-11", "2026-10-11"), "Today");
  assert.equal(dayLabel("2026-10-12", "2026-10-11"), "Tomorrow");
  assert.equal(dayLabel("2026-10-14", "2026-10-11"), "Wed 14");
  assert.equal(shortTime(9), "9 AM");
  assert.equal(shortTime(12), "12 PM");
  assert.equal(shortTime(16), "4 PM");
});

test("dhakaClock shows studio time (UTC+6)", () => {
  assert.equal(dhakaClock(new Date("2026-10-11T10:04:09Z")), "16:04:09");
  assert.equal(dhakaClock(new Date("2026-10-11T18:30:00Z")), "00:30:00");
});

test("studioStatus follows 9 AM to 10 PM", () => {
  assert.equal(studioStatus(8).open, false);
  assert.equal(studioStatus(9).open, true);
  assert.equal(studioStatus(21).open, true);
  assert.equal(studioStatus(22).open, false);
});

test("bookingHref carries only what was chosen", () => {
  assert.equal(bookingHref({}), "/#book");
  assert.equal(
    bookingHref({ package: "creator-pro", hours: "2", date: "2026-10-12", time: "4:00 PM" }),
    "/?package=creator-pro&hours=2&date=2026-10-12&time=4%3A00+PM#book"
  );
});

test("parseSessionParams drops invalid values and keeps valid ones", () => {
  const p = (q: string) => parseSessionParams(new URLSearchParams(q), "2026-10-11");
  assert.deepEqual(p("package=creator-pro&hours=2&date=2026-10-12&time=4%3A00+PM"), {
    package: "creator-pro",
    hours: "2",
    date: "2026-10-12",
    time: "4:00 PM",
  });
  assert.deepEqual(p("package=nope&hours=9&date=2026-10-01&time=4+PM"), {});
  assert.deepEqual(p("time=8%3A00+PM"), {});
});
