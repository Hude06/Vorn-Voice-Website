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

## Analytics

- Google Analytics 4 is loaded globally from `src/components/analytics/google-analytics.tsx`
- The active GA measurement ID is `G-5S85L38R1M`
- Standard page views are sent on page load and client-side route changes
- App download attempts are tracked from `src/app/download/page.tsx` with the custom GA event `download_start`

## Deployment Notes

- This project uses static export via `next.config.ts`
- Run `npm run lint` and `npm run build` before deploying
- After deploy, verify traffic in Google Analytics Realtime and confirm `download_start` fires when visiting `/download`
