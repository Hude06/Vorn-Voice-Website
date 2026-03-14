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

## Marketing Positioning

- The public site is currently optimized for first-time visitors who do not already know the product.
- The core message is: Vorn Voice turns speech into text in the Mac app already in front of you.
- The primary pricing message is: `"$9.99"` one time, no recurring subscription.
- The homepage and product page both call out how Vorn differs from Wispr Flow, with the comparison shown directly on-page rather than on a separate comparison page.
- Comparison claims should stay factual and restrained. Current copy positions Vorn as the smaller, simpler, one-time-purchase option, while Wispr Flow is described as a broader subscription product.
- Public marketing copy is centralized in `src/lib/site-content.ts` so homepage, product page, footer, and download copy stay aligned.

## March 2026 Site Refresh

- Rewrote the homepage hero to explain the app in plain language instead of assuming a technical audience.
- Moved the one-time price and Wispr Flow differentiation into the first viewport.
- Replaced the older stretched two-column section with clearer, balanced sections for workflow, use cases, and included features.
- Updated the `/vorn-voice` page to reinforce the same pricing and comparison story.
- Updated shared header, footer, metadata, and download page copy so the message stays consistent across the site.
- Validation for this refresh was run with `npm run lint` and `npm run build`.

## Deployment Notes

- This project uses static export via `next.config.ts`
- Run `npm run lint` and `npm run build` before deploying
- Deploy `dashboard/` as a separate Node service behind nginx on `stats.judemakes.dev`
- Protect the dashboard UI and `/api/metrics` with nginx basic auth while leaving the public download redirect route open
