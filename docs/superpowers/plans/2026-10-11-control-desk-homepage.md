# Control Desk Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public homepage as a working broadcast "control desk" so it reads as creative and visually striking, while keeping every fact, anchor and the booking flow.

**Architecture:** Same single page and section anchors. The hero becomes a client-side desk (program monitor, camera/hour/slot keys, live estimate) that hands its choices to the booking form through URL params. Pure scheduling/desk logic lives in `src/lib/desk.ts` with `node:test` tests. Visual primitives (keys, monitor frame, light-up, scrub, tally field) are CSS in `globals.css` plus three small components.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19.2, Tailwind CSS v4, react-hook-form + zod, Prisma 7, `tsx` for running tests with Node's built-in runner.

**Spec:** `.impeccable/surfaces/src-app-public-page-tsx.md` (direction contract) and `PRODUCT.md` (product truth).

## Global Constraints

- No new npm dependencies. Tests run with `node --import tsx --test`.
- Next 16: `next/image` uses `preload`, never `priority`; components calling `useSearchParams` stay inside `<Suspense>`.
- Palette only: ink `#141311`, ink-2 `#1d1b19`, ink-3 `#282522`, glass `#0c0b0a`, paper `#f1eee8`, muted-ink `#aaa59d`, dim `#8c877f`, tally `#f0533a`, tally-hover `#ff6a4d`.
- Tally red marks only what is live (program tally, the source on air, open-now lamp, the "Talk" clip) and primary actions (TAKE / submit). Choices you are making light up paper-white.
- Type: Archivo wide (`font-display-wide`) for headlines and idents, Geist for text, Geist Mono only for real numbers (prices, times, clocks). Display size max 6rem.
- Corners 4px (`rounded-tight`). Every monitor and angle tile is 16:9.
- Copy: plain, direct; no invented proof, stats or testimonials; stock photos are never described as EasyPod's own room.
- `prefers-reduced-motion`: no auto-cuts, no scroll scrub, no light-up; all content visible.
- Anchors stay: `#studio`, `#pricing`, `#process`, `#book`, `#faq`, `#contact`.
- The uncommitted booking-duration / availability work in the tree is kept and built on, not rewritten.

## Review Focus

- Availability API fails or the DB is down: the desk says it couldn't check times, and TAKE still opens the form (without a slot). Pinned in Task 3 step 4.
- A visit after 6 PM Dhaka time (no start hours left today): next open slots roll to the next day; after 10 PM the status says Closed. Pinned in Task 1 tests.
- Hours changed after picking a slot that no longer fits: the slot selection clears and the TAKE link carries no stale date/time. Pinned in Task 1 tests (`nextOpenSlots`) and Task 3 step 4.
- A stale or hand-edited URL (`?date` in the past, `?hours=9`, `?time=4 PM`, unknown package): the form ignores each bad value and keeps the good ones. Pinned in Task 1 tests (`parseSessionParams`).
- Keyboard-only and reduced-motion visitors: every desk key, angle tile and source key is reachable and operable; nothing auto-cuts or scrubs. Pinned in Task 10 step 3.

---

### Task 1: Desk logic, tests and an availability range query

**Files:**
- Create: `src/lib/desk.ts`
- Create: `src/lib/desk.test.ts`
- Modify: `src/app/api/availability/route.ts`

**Interfaces:**
- Consumes: `fits`, `isIsoDate`, `parseSlot`, `sessionLengths`, `slotLabel`, `startHours`, `CLOSING_HOUR`, `STUDIO_TIME_ZONE` from `src/lib/schedule.ts`; `packages`, `PackageSlug` from `src/lib/packages.ts`.
- Produces:
  - `OPENING_HOUR = 9`
  - `type DaySchedule = { date: string; occupied: number[] }`
  - `type OpenSlot = { date: string; hour: number; time: string }`
  - `type SessionRequest = { package?: PackageSlug; hours?: string; date?: string; time?: string }`
  - `addDays(date: string, days: number): string`
  - `nextOpenSlots(days: DaySchedule[], hours: number, now: { date: string; hour: number }, limit?: number): OpenSlot[]`
  - `dayLabel(date: string, today: string): string` ("Today" | "Tomorrow" | "Tue 14")
  - `shortTime(hour: number): string` (16 -> "4 PM")
  - `studioStatus(hour: number): { open: boolean; label: string }`
  - `dhakaClock(now?: Date): string` ("16:04:09")
  - `bookingHref(s: SessionRequest): string` ("/?package=…&hours=…&date=…&time=…#book")
  - `parseSessionParams(params: { get(name: string): string | null }, today: string): SessionRequest`
  - `GET /api/availability?from=YYYY-MM-DD&days=N` (1–14) → `{ days: DaySchedule[] }`; the existing `?date=` form is unchanged.

- [ ] **Step 1: Write the failing tests** in `src/lib/desk.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, bookingHref, dayLabel, nextOpenSlots, parseSessionParams, shortTime, studioStatus } from "./desk";

test("addDays crosses month ends", () => {
  assert.equal(addDays("2026-10-31", 1), "2026-11-01");
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
});

test("nextOpenSlots skips past hours today and booked hours", () => {
  const slots = nextOpenSlots(
    [{ date: "2026-10-11", occupied: [16, 17] }, { date: "2026-10-12", occupied: [] }],
    1,
    { date: "2026-10-11", hour: 15 }
  );
  assert.deepEqual(slots.map((s) => `${s.date} ${s.time}`), [
    "2026-10-11 6:00 PM",
    "2026-10-12 9:00 AM",
    "2026-10-12 10:00 AM",
  ]);
});

test("nextOpenSlots rolls to tomorrow after the last start hour", () => {
  const slots = nextOpenSlots(
    [{ date: "2026-10-11", occupied: [] }, { date: "2026-10-12", occupied: [9] }],
    2,
    { date: "2026-10-11", hour: 19 },
    2
  );
  assert.deepEqual(slots.map((s) => s.time), ["10:00 AM", "11:00 AM"]);
});

test("nextOpenSlots returns nothing for a fully booked day", () => {
  const full = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  assert.deepEqual(nextOpenSlots([{ date: "2026-10-12", occupied: full }], 1, { date: "2026-10-11", hour: 10 }), []);
});

test("dayLabel and shortTime", () => {
  assert.equal(dayLabel("2026-10-11", "2026-10-11"), "Today");
  assert.equal(dayLabel("2026-10-12", "2026-10-11"), "Tomorrow");
  assert.equal(dayLabel("2026-10-14", "2026-10-11"), "Wed 14");
  assert.equal(shortTime(9), "9 AM");
  assert.equal(shortTime(12), "12 PM");
  assert.equal(shortTime(16), "4 PM");
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
    package: "creator-pro", hours: "2", date: "2026-10-12", time: "4:00 PM",
  });
  assert.deepEqual(p("package=nope&hours=9&date=2026-10-01&time=4+PM"), {});
  assert.deepEqual(p("time=8%3A00+PM"), {});
});
```

- [ ] **Step 2: Run to verify they fail**
Run: `node --import tsx --test src/lib/desk.test.ts`
Expected: FAIL, cannot find module `./desk`.

- [ ] **Step 3: Implement `src/lib/desk.ts`** with the interfaces above. `nextOpenSlots` walks days in order, skips days before `now.date`, uses `notBefore = now.hour + 1` on today, and calls `fits(start, hours, occupied, notBefore)` for each of `startHours`. `parseSessionParams` accepts a time only when `parseSlot(time)` is one of `startHours`, re-emitting it through `slotLabel`. `dhakaClock` formats with `Intl.DateTimeFormat("en-GB", { timeZone: STUDIO_TIME_ZONE, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" })`.

- [ ] **Step 4: Run tests to verify they pass**
Run: `node --import tsx --test src/lib/desk.test.ts` → all pass.

- [ ] **Step 5: Add the range query** to `src/app/api/availability/route.ts`: when `from` is an ISO date and `days` is 1–14, query bookings with `preferredDate` in `[from, addDays(from, days))`, group `occupiedHours` by `preferredDate.toISOString().slice(0, 10)`, and return every day in the range (empty `occupied` when free). Check with `curl "localhost:3000/api/availability?from=2026-10-11&days=3"` → `{"days":[{"date":"2026-10-11","occupied":[…]},…]}`; `?from=bad` → 400.

### Task 2: Desk primitives and motion system

**Files:**
- Modify: `src/app/globals.css` (tokens `--color-glass`, `.key`, `.monitor`, `.lit`, `.shot-live`, `.tally-field`, scrollbar and caret theming)
- Create: `src/components/site/monitor.tsx`, `src/components/site/studio-clock.tsx`, `src/components/site/studio-status.tsx`
- Modify: `src/lib/media.ts` (add `angles`)

**Interfaces:**
- Produces:
  - CSS `.key` (label or button styled as a desk key; lit when it `:has(input:checked)` or `[aria-pressed="true"]`; standby when disabled); `.key-live` adds the red lamp.
  - `<Monitor live? label meta? className? children>`: 16:9 glass frame, 2px tally border when `live`, label strip top-left with lamp, `meta` top-right, safe-area corner marks.
  - `<StudioClock />`: Dhaka `HH:MM:SS`, ticks by writing to the DOM once a second, renders `--:--:--` on the server.
  - `<StudioStatus className? />`: lamp + "Open now · until 10 PM" / "Closed · opens 9 AM", red lamp only when open; server render shows "Open daily, 9 AM to 10 PM".
  - `angles: readonly { name: "Wide" | "Medium" | "Close"; position: string; zoom: number }[]` in `media.ts`, all cropping `photos.hero`.
  - Motion classes: `.lit` (photo comes up from black on entering view), `.shot-live` (slow push-in on the angle on air), `.tally-field` (red field powers on).

- [ ] Step 1: Add the tokens and classes; every animation sits under `@media (prefers-reduced-motion: no-preference)` and view-timeline effects under `@supports (animation-timeline: view())`.
- [ ] Step 2: Build the three components.
- [ ] Step 3: `npx tsc --noEmit` passes.

### Task 3: Control Desk hero

**Files:**
- Create: `src/components/sections/control-desk.tsx` (client)
- Delete: `src/components/sections/hero.tsx`, `src/components/site/rec-timecode.tsx`
- Modify: `src/app/(public)/page.tsx`

**Interfaces:**
- Consumes: `nextOpenSlots`, `dayLabel`, `shortTime`, `bookingHref`, `addDays`, `type DaySchedule`, `type OpenSlot` (Task 1); `.key`, `<Monitor>`, `<StudioClock>`, `angles` (Task 2); `packages`, `formatTaka`; `studioNow`; `ButtonLink`; `waLink`.
- Produces: `export function ControlDesk()`.

Behaviour:
- Defaults: Creator Pro (2 cameras), 1 hour, no slot.
- Layout (lg): grid areas `"monitor intro" "monitor panel" "tiles panel"`, columns `8fr 4fr`. Mobile: `title, intro, monitor, tiles, panel`. The H1 is a two-tier lower third ("You talk." on a paper strap, "We run the show." on an ink strap) inside the monitor on lg, above it on mobile.
- Program monitor: three stacked layers of the hero photo cropped by `angles`; hard cut between active angles every 2.6 s while the desk is on screen and the tab is visible; choosing a package cuts straight to its newest camera; no auto-cut for reduced motion.
- Angle tiles: CAM 1–3. Active tiles are buttons that take that angle to program (auto-cut pauses 6 s). Inactive tiles say which package adds them and select it.
- Panel: one-line offer; Cameras keys (1/2/3 with per-hour price); Hours keys (1–4); Next open (3 slot keys from `GET /api/availability?from=today&days=7`, loading and failure states); Estimate (`formatTaka(price × hours)`, `aria-live="polite"`); TAKE `ButtonLink` to `bookingHref(...)`; WhatsApp link.

- [ ] Step 1: Build the component and swap it into `page.tsx`.
- [ ] Step 2: `npx tsc --noEmit` and `npm run lint` pass.
- [ ] Step 3: In the browser: pressing 3 cameras cuts the monitor to CAM 3 and the estimate reads ৳2,500; 2 hours reads ৳5,000.
- [ ] Step 4: With `/api/availability` blocked (Playwright `page.route` abort) the slot area says times couldn't be checked and TAKE links to `/?package=creator-pro&hours=1#book`; picking a 1-hour slot then switching to 4 hours clears the slot if it no longer fits.

### Task 4: Booking form takes the desk's choices

**Files:**
- Modify: `src/components/booking/booking-form.tsx`, `src/components/sections/booking-section.tsx`

**Interfaces:**
- Consumes: `parseSessionParams`, `studioNow`.
- Produces: `SessionFromUrl` (replaces `PackageFromUrl`) calling `setValue` for package, hours, preferredDate, preferredTime, and cueing the package.

- [ ] Step 1: Replace `PackageFromUrl` with `SessionFromUrl`; options use the `.key` class (paper-lit selection, red stays for the submit and the arrival cue).
- [ ] Step 2: Restyle the section as the desk's request panel; copy unchanged.
- [ ] Step 3: Browser check: TAKE from the desk lands on `#book` with package, hours, date and time already selected and the estimate showing.

### Task 5: "Four tracks are ours. One is yours." (`#process`)

**Files:**
- Create: `src/components/sections/crew-tracks.tsx` (client)
- Delete: `src/components/sections/booking-process.tsx`

Content (facts from existing copy only): phases "Before you arrive", "You sit down", "You talk", "You wrap". Tracks: Light (Key and fill set; Your colour on the backdrop), Cameras (Height, framing and focus set; Framing checked with you; Every angle recording in sync), Sound (A mic for every speaker; Mic placement checked; Levels balanced live), Floor (Walks you through the session; Hands over your raw footage), You (Talk). Desktop: an editing-timeline grid inside a 240vh section with a sticky frame; scroll drives a red playhead (`--p` set by one rAF-throttled listener) that fills each clip as it passes, and only the "Talk" clip fills red. Mobile and screen readers: an ordered list by phase. Reduced motion: no sticky, all clips filled.

- [ ] Step 1: Build; Step 2: tsc + lint; Step 3: browser check at 1440 and 390 wide.

### Task 6: Studio sources (`#studio`)

**Files:**
- Create: `src/components/sections/studio-sources.tsx` (client; carries the existing five groups and their copy)
- Delete: `src/components/sections/equipment-showcase.tsx`

Layout: H2 "What the studio does for you."; lg: vertical source bus (cols 1–3, tablist, the source on air gets the red lamp) beside a 16:9 monitor (cols 4–12) whose lower third carries the group's lead; points in columns under the monitor; WhatsApp equipment-list link. Switching sources is a hard cut with the photo lit up from black. Keeps the current arrow-key tab behaviour.

- [ ] Step 1: Build; Step 2: tsc + lint; Step 3: browser check.

### Task 7: Rate card (`#pricing`)

**Files:** Modify `src/components/sections/pricing-section.tsx`

Each package column opens with three 16:9 angle tiles: the package's cameras show their angle, the rest show standby. Keep the table semantics on desktop and the swipe cards on phones; same rows, copy and links (`/?package=<slug>#book`).

- [ ] Step 1: Build; Step 2: tsc + lint; Step 3: browser check.

### Task 8: FAQ, location and navbar status

**Files:** Modify `src/components/sections/faq-section.tsx`, `src/components/sections/location.tsx`, `src/components/layout/navbar.tsx`

FAQ questions set in Archivo wide; location card gains `<StudioStatus />`; desktop navbar shows `<StudioStatus />` beside the Book button.

- [ ] Step 1: Build; Step 2: tsc + lint.

### Task 9: The tally close and footer

**Files:** Modify `src/components/layout/footer.tsx`, `src/components/layout/whatsapp-button.tsx` (hide over the red field)

The footer becomes a full-width tally-red field (ink text, 5.3:1 contrast): "Pick a time. We'll light the room.", sub "Sessions from ৳1,500 an hour, crew included. We confirm within 24 hours.", ink TAKE "Request a session" to `#book`, outline "WhatsApp us", then the existing links, contacts, socials and copyright.

- [ ] Step 1: Build; Step 2: tsc + lint.

### Task 10: Verify and finish

- [ ] Step 1: `node --import tsx --test src/lib/desk.test.ts`, `npx tsc --noEmit`, `npm run lint`, `npx next build --webpack` all pass.
- [ ] Step 2: Capture `.impeccable/review/desktop.png` (1440 wide, full page) and `.impeccable/review/mobile.png` (390 wide) with entrance motion settled; inspect, fix in one batch, recapture once.
- [ ] Step 3: Keyboard pass (Tab through desk keys, tiles, sources, form) and an emulated `prefers-reduced-motion: reduce` pass: no auto-cut, no scrub, everything visible.
- [ ] Step 4: `impeccable detect --json` on the changed files; fix mechanical findings.
- [ ] Step 5: Fresh `impeccable-finish-reviewer` with the request, answers, contract, screenshots; act on its disposition.
- [ ] Step 6: `impeccable-documenter` writes `DESIGN.md` and `.impeccable/design.json`.
