# Vorn download dashboard

Private React + Next.js dashboard for first-party Vorn Voice download tracking.

## What it does

- records direct-download starts in SQLite before redirecting to the latest DMG
- serves a private dashboard with modern cards and charts
- shows a small country-level origin map when the proxy forwards geo headers
- exposes a metrics API for future extensions
- expects nginx basic auth in front of the dashboard routes

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` for the dashboard.

Use `http://localhost:3000/api/download/vorn-voice` to test the tracked redirect endpoint.

## Environment variables

- `DOWNLOAD_METADATA_URL`: source `latest-mac.yml`
- `DOWNLOAD_BASE_URL`: base URL used when metadata contains relative asset paths
- `DASHBOARD_DB_PATH`: SQLite file path
- `IP_HASH_SALT`: required for salted IP hashing

## Production wiring

1. Deploy the `dashboard/` app as its own Node service.
2. Point `stats.judemakes.dev` at that service through nginx.
3. Leave `/api/download/vorn-voice` public.
4. Protect `/` and `/api/metrics` with nginx basic auth.
5. Point the public website download page at `https://stats.judemakes.dev/api/download/vorn-voice`.

See `dashboard/deploy/nginx/stats.judemakes.dev.conf` for the nginx example.
See `dashboard/deploy/systemd/vorn-stats.service` for a matching systemd unit.

## Geo map notes

- The map reads country codes from common upstream headers such as `CF-IPCountry`, `X-Vercel-IP-Country`, `CloudFront-Viewer-Country`, or a custom `X-Geo-Country-Code`.
- Existing rows stay valid after deploy. Older downloads without `country_code` still appear in totals, charts, and recent activity; they simply do not show on the map.
- If your nginx host has GeoIP2 configured, pass the country code through as `X-Geo-Country-Code` to populate the map for new downloads.
