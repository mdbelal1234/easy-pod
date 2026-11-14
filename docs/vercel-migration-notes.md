# Vercel migration — what's done and what still needs changing

Moved from Hostinger to Vercel on 2026-11-14.

## What runs where now

| Piece | Where | Notes |
|---|---|---|
| App | Vercel project `easy-pod` (team `mdbelal1234-5602`) | Functions pinned to `sin1` (Singapore) in `vercel.json`. Static pages are served from the nearest edge (Mumbai `bom1` for Bangladesh). |
| Database | Neon Postgres `easypod-db`, `aws-ap-southeast-1` (Singapore), free plan | Created through the Vercel Marketplace; `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct, used by migrations) are injected automatically. |
| Domain registration + DNS | Still Hostinger (nameservers `*.dns-parking.com`) | Only the website records were changed. Email stays on Hostinger. |
| Email inbox | Hostinger Mail | MX, DKIM, autodiscover and autoconfig records were left as they were. |

The build (`npm run build`) runs `prisma migrate deploy` against Neon first, so new
migrations are applied automatically on every deploy.

## Still to change (in order of importance)

1. **Change the admin password.** The production admin (`admin@easypod.studio`) was
   given a random password during setup (handed over in the setup chat, not stored
   here). Sign in at https://easypod.studio/admin/login and change it.
2. **Add `RESEND_API_KEY` on Vercel.** It is not set, so booking confirmation and
   admin emails are skipped (logged as a warning; bookings still save).
   `vercel env add RESEND_API_KEY production` (and `preview`), then redeploy.
   Also verify `easypod.studio` in the Resend dashboard: it will ask for DKIM/SPF
   records — add them at Hostinger (DNS records page). No Resend records exist
   in DNS today, so sending from `noreply@easypod.studio` will fail until that's done.
3. **WhatsApp booking alerts.** Add `WHATSAPP_ACCESS_TOKEN` and
   `WHATSAPP_PHONE_NUMBER_ID` on Vercel (see `DEPLOYMENT.md` → "WhatsApp booking
   alerts"). Until then alerts are skipped.
4. **Old bookings/data.** The Neon database started fresh (migrations + seed:
   admin user and the packages). If the Hostinger site's database had real
   bookings or leads, export them (`pg_dump --data-only`) and import into Neon
   with `DATABASE_URL_UNPOOLED` (get it with `vercel env pull`).
5. **Auto-deploy from GitHub.** The project deploys from the CLI right now; linking
   the repo failed because the Vercel GitHub app has no access to
   `mdbelal1234/easy-pod`. Install it (Vercel dashboard → project → Settings → Git →
   Connect, grant the repo), or run `vercel git connect` after granting access.
   Then every push to `main` deploys to production.
6. **Retire the Hostinger website.** The old app still runs on the Hostinger plan
   but no longer receives traffic. When you're happy, cancel/stop it. Don't use
   Hostinger's "connect domain to website" button — it would put back the ALIAS
   record and send traffic to Hostinger again. The `ftp` A record (`82.29.157.124`)
   points at that hosting and can be deleted once it's gone.
7. **Optional:** `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` is empty; set it if the map
   embed should show. Neon's free plan sleeps the database after inactivity (first
   request after idle is slower) and caps storage at 0.5 GB — upgrade to Launch if
   that becomes a problem. Update the Vercel CLI (`npm i -g vercel@latest`).

## Environment variables on Vercel (Production + Preview)

Set: `AUTH_SECRET` (new, generated for Vercel), `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`,
`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, plus
the Neon variables (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`).

Not set: `RESEND_API_KEY`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`,
`WHATSAPP_NOTIFY_TO`, `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`. `AUTH_URL` is
intentionally unset — Auth.js detects the host on Vercel.

`NEXT_PUBLIC_*` values are baked in at build time: redeploy after changing them
(`vercel deploy --prod`).

## DNS changes made at Hostinger (and how to roll back)

| Record | Before | After |
|---|---|---|
| `@` | ALIAS `easypod.studio.cdn.hstgr.net` | A `216.198.79.1` and A `64.29.17.1` |
| `www` | CNAME `www.easypod.studio.cdn.hstgr.net` | CNAME `1e9d8d3a0849c752.vercel-dns-017.com` |

`www.easypod.studio` redirects (308) to `easypod.studio` — set on the Vercel domain.
To roll back, delete the two `@` A records, re-add the ALIAS, and set `www` back.
