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

## To do later — checklist

Tick these off as you go (`- [x]`). Items are in order of importance.

### 1. Change the admin password — do this first

- [ ] Open https://easypod.studio/admin/login and sign in as `admin@easypod.studio`
      with the random password from setup. It was saved on the setup machine in the
      Claude scratchpad as `admin-password.txt`, not in this repo.
- [ ] Change the password in the admin panel and store the new one in a password manager.
- [ ] If you lose it: reset it with a one-off script against `DATABASE_URL_UNPOOLED`
      (bcrypt hash, cost 12, on the `User` row with that email).

### 2. Turn on booking emails (Resend)

Right now emails are skipped: bookings still save, and the logs show
`RESEND_API_KEY is not set; skipped email ...`.

- [ ] Sign in at https://resend.com → **Domains → Add domain** → `easypod.studio`.
- [ ] Resend lists some DNS records (usually a DKIM TXT `resend._domainkey`, plus an
      MX and an SPF TXT on the `send` subdomain). Add each one at **Hostinger → Domains
      → easypod.studio → DNS / Nameservers**.
      Don't touch the existing `@` MX records (`mx1/mx2.hostinger.com`): they run your inbox.
- [ ] Wait until Resend shows the domain as **Verified**.
- [ ] Resend → **API Keys → Create** (permission: *Sending access*, domain: easypod.studio).
- [ ] Add it to Vercel, then redeploy:
      ```bash
      vercel env add RESEND_API_KEY production --sensitive
      vercel env add RESEND_API_KEY preview --sensitive
      vercel deploy --prod
      ```
- [ ] Test: make a booking on the site with your own email → you get the confirmation,
      and `admin@easypod.studio` gets the alert.
- [ ] Optional: if the admin alert should go to another inbox, change `ADMIN_EMAIL`
      on Vercel (`vercel env rm ADMIN_EMAIL production` then `vercel env add ...`).

### 3. Turn on WhatsApp booking alerts

- [ ] Follow `DEPLOYMENT.md` → **WhatsApp booking alerts** (Meta app, sending number,
      permanent System User token, `new_booking` template, which needs approval).
- [ ] Add the values to Vercel and redeploy:
      ```bash
      vercel env add WHATSAPP_ACCESS_TOKEN production --sensitive
      vercel env add WHATSAPP_PHONE_NUMBER_ID production
      # optional: send alerts to a different number than the public one
      vercel env add WHATSAPP_NOTIFY_TO production
      vercel deploy --prod
      ```
- [ ] Test with a booking; check `vercel logs --level error` if nothing arrives.

### 4. Bring over old data from Hostinger (only if there was real data)

The Neon database started fresh, with only the admin user and the 3 packages from the seed.

- [ ] Check whether the old Hostinger site had real bookings or leads you still need.
- [ ] If yes, dump only the data from the old database:
      ```bash
      pg_dump "<old DATABASE_URL>" --data-only --no-owner \
        -t '"Booking"' -t '"Lead"' > old-data.sql
      ```
      (Leave out `"User"` and `"Package"`, which already exist in Neon, unless you
      want the old rows to replace them.)
- [ ] Get the Neon direct URL **without** overwriting your local `.env.local`:
      ```bash
      vercel env pull /tmp/prod.env --environment=production
      grep DATABASE_URL_UNPOOLED /tmp/prod.env
      ```
- [ ] Import: `psql "<DATABASE_URL_UNPOOLED>" -f old-data.sql`, then delete
      `/tmp/prod.env` and `old-data.sql`.
- [ ] Open the admin bookings page and confirm the old bookings show up.

### 5. Auto-deploy on every push to GitHub

Deploys only happen from the CLI right now (`vercel deploy --prod`).

- [ ] Vercel dashboard → project **easy-pod** → **Settings → Git → Connect Git
      Repository** → GitHub → install or configure the Vercel app and give it
      access to `mdbelal1234/easy-pod`.
      (Or grant access at https://github.com/settings/installations, then run `vercel git connect`.)
- [ ] Check: push a small commit to `main` → a new production deployment shows up in the dashboard.
- [ ] Any other branch or PR then gets its own preview URL.

### 6. Shut down the old Hostinger website

- [ ] After a few days without problems on Vercel, stop or cancel the Hostinger
      **website/hosting** plan.
      **Keep** the **domain** registration and **Hostinger Mail**: both still live at Hostinger.
- [ ] Then delete the `ftp` A record (`82.29.157.124`) in Hostinger DNS.
- [ ] Never click Hostinger's "Connect domain to website" or "Point domain": that
      puts back the `@` ALIAS and sends traffic to Hostinger again.
- [ ] Make sure the domain's **auto-renew** is on at Hostinger, so the domain doesn't
      expire and take the site down.

### 7. Nice to have

- [ ] **Google Maps embed:** set `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` (Google Maps →
      Share → Embed a map → copy the `src` URL), then redeploy. `NEXT_PUBLIC_*`
      values are baked in at build time.
- [ ] **Search Console:** add `easypod.studio` at https://search.google.com/search-console
      and submit `https://easypod.studio/sitemap.xml`, so Google picks up the new site quickly.
- [ ] **Analytics:** enable Vercel Web Analytics / Speed Insights in the project dashboard if you want visitor stats.
- [ ] **Neon free plan limits:** 0.5 GB storage, and the database sleeps when idle
      (the first request after a quiet period is ~0.5–1 s slower). Upgrade to the
      *Launch* plan if bookings grow or the cold start bothers you.
- [ ] **Database backups:** check Neon's restore window (free plan keeps a short
      history), or run a weekly `pg_dump` of `DATABASE_URL_UNPOOLED` and keep it safe.
- [ ] **Vercel CLI:** update it (`npm i -g vercel@latest`); the installed 59.x is outdated.
- [ ] **Cleanup:** remove the unused Neon Auth variables (`NEON_AUTH_BASE_URL`,
      `VITE_NEON_AUTH_URL`) from the project if you don't plan to use Neon Auth.
      They're harmless.
- [ ] **pg SSL warning in the logs:** the logs show a harmless warning about
      `sslmode`. To silence it, append `&sslmode=verify-full` (or replace
      `sslmode=require`) in `DATABASE_URL` and `DATABASE_URL_UNPOOLED` on Vercel.

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
