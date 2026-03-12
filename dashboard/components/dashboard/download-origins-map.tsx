import { Compass, Globe2, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DownloadOrigin } from "@/lib/metrics";
import { formatNumber, formatPercent } from "@/lib/utils";

type DownloadOriginsMapProps = {
  items: DownloadOrigin[];
  downloadsWithCountryLast30Days: number;
  downloadsWithoutCountryLast30Days: number;
};

const mapHeight = 320;
const mapWidth = 720;
const topCountryLimit = 5;

export function DownloadOriginsMap({
  items,
  downloadsWithCountryLast30Days,
  downloadsWithoutCountryLast30Days,
}: DownloadOriginsMapProps) {
  const visibleItems = items.slice(0, 10);
  const mappedItems = visibleItems.filter(
    (item): item is DownloadOrigin & { latitude: number; longitude: number } =>
      item.latitude !== null && item.longitude !== null,
  );
  const maxDownloads = visibleItems[0]?.downloads ?? 0;

  return (
    <Card className="panel-glow h-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl">Download map</CardTitle>
            <CardDescription>Country-level origins for the last 30 days.</CardDescription>
          </div>
          <Badge className="border-primary/20 bg-primary/10 text-primary">
            {formatNumber(downloadsWithCountryLast30Days)} mapped
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mappedItems.length > 0 ? (
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-16 bg-gradient-to-b from-primary/10 to-transparent" />
            <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="h-[240px] w-full">
              <defs>
                <radialGradient id="origin-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="55%" stopColor="rgba(241,176,72,0.7)" />
                  <stop offset="100%" stopColor="rgba(241,176,72,0)" />
                </radialGradient>
              </defs>

              <rect width={mapWidth} height={mapHeight} fill="rgba(255,255,255,0.02)" />
              {[-120, -60, 0, 60, 120].map((longitude) => (
                <line
                  key={longitude}
                  x1={projectLongitude(longitude)}
                  x2={projectLongitude(longitude)}
                  y1={0}
                  y2={mapHeight}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 8"
                />
              ))}
              {[-60, -30, 0, 30, 60].map((latitude) => (
                <line
                  key={latitude}
                  x1={0}
                  x2={mapWidth}
                  y1={projectLatitude(latitude)}
                  y2={projectLatitude(latitude)}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 8"
                />
              ))}

              <g fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5">
                <path d="M66 84c18-16 55-28 97-26 27 1 56 14 74 35 10 12 16 26 15 39-2 15-16 24-36 28-17 4-31 8-39 18-12 16-19 21-31 18-15-4-22-18-41-25-20-8-43-13-58-28-12-12-16-30-10-45 4-8 14-12 29-14z" />
                <path d="M193 206c13-6 30 4 35 20 4 13 3 31-5 46-7 14-15 27-20 44-4 12-12 15-22 10-10-5-14-18-12-33 2-20 1-36 7-54 4-14 8-26 17-33z" />
                <path d="M348 79c16-10 40-13 64-9 22 3 39 15 50 29 9 12 25 15 45 16 26 2 56 10 78 25 21 15 33 31 35 50 2 17-6 30-23 38-14 7-31 7-48 6-20-1-33 4-42 18-10 17-16 38-30 49-17 13-39 12-57 3-17-9-26-28-26-48 0-12-4-22-12-31-13-14-22-34-24-57-2-21-7-34-17-47-6-7-4-13 7-19z" />
                <path d="M452 228c15-5 28 1 36 14 10 16 17 36 19 58 2 17-2 31-12 41-8 8-19 11-31 8-14-3-24-15-27-31-4-18-10-34-18-50-7-14-5-24 7-31 8-4 17-7 26-9z" />
                <path d="M572 219c17-11 42-16 69-13 23 3 45 12 59 27 12 13 19 27 18 42-1 12-8 22-21 29-18 10-42 9-64 5-17-4-30-2-39 10-7 9-17 12-30 8-14-4-20-16-18-32 2-21-4-38-18-51-10-10-8-18 8-25 11-5 23-5 36 0z" />
                <path d="M601 290c12-9 29-13 46-11 16 2 30 10 39 23 7 10 9 20 4 31-5 10-15 16-28 18-16 3-31 1-44-7-15-10-23-22-24-38-1-7 1-12 7-16z" />
              </g>

              {mappedItems.map((item, index) => {
                const x = projectLongitude(item.longitude);
                const y = projectLatitude(item.latitude);
                const radius = 6 + Math.round((item.downloads / Math.max(maxDownloads, 1)) * 8);

                return (
                  <g key={item.countryCode}>
                    <circle cx={x} cy={y} r={radius * 2.4} fill="url(#origin-glow)" />
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={index === 0 ? "rgba(125, 232, 255, 0.95)" : "rgba(241, 176, 72, 0.92)"}
                      stroke="rgba(11,14,20,0.85)"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          <div className="rounded-[1.6rem] border border-dashed border-white/10 bg-black/10 px-4 py-8 text-sm leading-6 text-muted-foreground">
            No country data has been recorded yet. Existing download rows still work; the map will start filling as new
            downloads arrive.
          </div>
        )}

        <div className="grid gap-3">
          {visibleItems.slice(0, topCountryLimit).map((item, index) => (
            <div
              key={item.countryCode}
              className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-white/8 bg-black/10 px-3 py-3"
            >
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {index === 0 ? <Compass className="h-4 w-4 text-cyan-300" /> : <Globe2 className="h-4 w-4 text-primary" />}
                  <span className="truncate">{item.countryName}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatNumber(item.uniqueDownloaders)} unique
                  {item.latitude === null || item.longitude === null ? " • listed only" : ""}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{formatNumber(item.downloads)}</div>
                <div className="text-xs text-muted-foreground">{formatPercent(item.share)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-[1.2rem] border border-white/8 bg-white/4 px-3 py-3 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{formatNumber(downloadsWithCountryLast30Days)} downloads include country metadata.</span>
          {downloadsWithoutCountryLast30Days > 0 ? (
            <span>
              {formatNumber(downloadsWithoutCountryLast30Days)} do not. Older rows stay valid and remain counted in the
              totals.
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function projectLongitude(longitude: number) {
  return ((longitude + 180) / 360) * mapWidth;
}

function projectLatitude(latitude: number) {
  return ((90 - latitude) / 180) * mapHeight;
}
