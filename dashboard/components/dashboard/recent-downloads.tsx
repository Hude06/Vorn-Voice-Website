import { Globe, Link2, MonitorDown } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecentDownload } from "@/lib/metrics";
import { formatRelativeDate } from "@/lib/utils";

type RecentDownloadsProps = {
  items: RecentDownload[];
  timeZone: string;
};

export function RecentDownloads({ items, timeZone }: RecentDownloadsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent download activity</CardTitle>
        <CardDescription>Latest tracked redirect events in {timeZone}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-[1.25rem] border border-dashed border-white/10 bg-black/10 px-4 py-8 text-sm text-muted-foreground">
            No downloads tracked yet.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-[1.25rem] border border-white/8 bg-black/10 px-4 py-4 sm:grid-cols-[1.4fr_1fr_0.8fr] sm:items-center"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <MonitorDown className="h-4 w-4 text-primary" />
                  Vorn Voice download
                </div>
                <div className="inline-flex max-w-full items-center gap-2 text-xs text-muted-foreground">
                  <Link2 className="h-3.5 w-3.5" />
                  <span className="truncate">{item.destinationUrl}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {item.countryName ? `${item.countryName} • ` : ""}
                    {item.requestHost ?? "direct"}
                  </span>
                </div>
                <div className="truncate">{item.referer ?? "No referer"}</div>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground sm:text-right">
                <div>{formatRelativeDate(item.createdAt, { timeZone })}</div>
                <div className="font-mono uppercase tracking-[0.16em] text-[10px]">
                  {item.ipHash ? item.ipHash.slice(0, 10) : "no-ip"}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
