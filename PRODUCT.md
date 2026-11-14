# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (confirmed 2026-10-11): brands and companies in Dhaka (marketing teams, founders, corporate communications) who want video podcasts, interviews or corporate content produced without owning gear or hiring a crew. They need to see polish and reliability before they request a booking, and they often book on behalf of someone else who will sit at the mic.

Also served: first-time hosts and working creators. The existing FAQ copy says most clients so far are first-time hosts; the page is pitched at the company buyer without shutting them out.

## Product Purpose

EasyPod Studio is a staffed video podcast studio in Vatara, Dhaka, rented by the hour. The public site exists to turn visitors into booking requests through one on-page booking form, with WhatsApp as the human fallback. Success is qualified booking requests and WhatsApp conversations, especially from companies.

## Positioning

Two beliefs every visitor should leave with (confirmed 2026-10-11):

1. **You just talk.** The crew sets up and runs cameras, sound and light before and during the session; the people on camera never touch equipment.
2. **Pro output, hourly price.** Broadcast-grade production (up to three synced 4K angles, studio audio, lighting) from ৳1,500 an hour, with the raw footage handed over before you leave.

## Operating Context

- Booking request: package, recording type, date, 1 to 4 hour duration, start time with live availability (`/api/availability`), then name, phone/WhatsApp, email, optional company and notes. The studio confirms within 24 hours by email and WhatsApp; sessions can be moved up to 48 hours before they start.
- WhatsApp is a primary channel: floating button plus inline links throughout the page.
- Studio: Salam Tower, Vatara, near Evercare Hospital, Dhaka. Open daily 9 AM to 10 PM, other times by appointment. Free visitor parking, valet on request.
- In the room: up to four people on camera, each with their own microphone; teleprompter; acoustically treated, air-conditioned room; coloured background light and a choice of backdrops.
- Add-ons: full episode editing, audio cleanup, custom branding, vertical clips for Reels, TikTok and Shorts; usual turnaround 3 business days.

## Capabilities and Constraints

- Single-page public site (user's choice, 2026-10-07): sections anchored at `#studio`, `#pricing`, `#process`, `#book`, `#faq`, `#contact`; old inner routes 308-redirect to those anchors.
- One form only: the booking form. No separate contact form.
- Packages live in `src/lib/packages.ts` and link to database rows by slug: Starter Session ৳1,500/hour (1 camera), Creator Pro ৳2,000/hour (2 cameras, recommended), Studio Signature ৳2,500/hour (3 cameras).
- The admin panel is a separate surface with its own tokens and is out of scope for public-site design.
- Stack: Next.js 16 App Router, Tailwind CSS v4, deployed on Hostinger with a webpack build.
- Open, not confirmed: the share of mobile visitors and typical connection speeds. Until known, keep the page light enough for mid-range phones on mobile data.

## Brand Commitments

- Name and mark: EasyPod Studio, white microphone-mark lockup in `public/logo/` (full lockup carries the tagline "Record. Create. Connect.").
- Visual identity "On Air" approved 2026-10-07 and reconfirmed 2026-10-11 with the instruction to push it much further: broadcast control-room feel, warm charcoal, one tally-light red accent, wide Archivo display type.
- Voice: plain, direct English. Describe gear by what it does for the client, not by model numbers; the exact equipment list is shared on WhatsApp on request.

## Evidence on Hand

- Real: package names and prices, inclusions, process, FAQ answers, address, hours, phone (+880 1620 309061), email (hello@easypod.studio), social handles (@easypodstudio), logo files.
- Photos in `public/studio/` are temporary Unsplash stock, not EasyPod's studio (confirmed 2026-10-11: design with stock for now, swap for real photos before launch). Never present them as the actual studio in copy.
- No studio tour video yet (`site.studioTourVideoId` is null).
- No testimonials, client logos, ratings or audience stats exist. Never invent them; placeholder proof was removed on 2026-10-07.

## Product Principles

1. Effortless for the client: every part of the page should make recording feel like "show up and talk".
2. Prove with specifics, never with invented proof: real prices, real inclusions, the real sequence of a session.
3. Price is never hidden: the hourly rate and what it includes stay visible and comparable.
4. One way to book, one human fallback: the booking form, then WhatsApp.

## Accessibility & Inclusion

No product-specific standard has been set. The current build honours `prefers-reduced-motion`, keyboard navigation and visible focus; keep that baseline.
