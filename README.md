# Vorn Website

Marketing site for the Vorn product family, built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Main Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Download Tracking

- The public marketing site no longer uses Google Analytics.
- App download attempts are routed from `src/app/download/page.tsx` to the first-party stats service.
- Set `NEXT_PUBLIC_DOWNLOAD_TRACKING_URL` to the tracked redirect endpoint for your deployment.
- The private dashboard lives in `dashboard/` and stores download events in SQLite.

## Deployment Notes

- This project uses static export via `next.config.ts`
- Run `npm run lint` and `npm run build` before deploying
- Deploy `dashboard/` as a separate Node service behind nginx on `stats.judemakes.dev`
- Protect the dashboard UI and `/api/metrics` with nginx basic auth while leaving the public download redirect route open
