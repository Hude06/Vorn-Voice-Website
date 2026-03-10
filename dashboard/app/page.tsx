import type { ComponentType } from "react";

import { Activity, Database, ShieldCheck, Sparkles } from "lucide-react";

import { DownloadsChart } from "@/components/dashboard/downloads-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentDownloads } from "@/components/dashboard/recent-downloads";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/metrics";
import { formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();

  return (
    <main className="mesh min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="panel-glow relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 px-6 py-8 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute left-[-4rem] top-[-6rem] h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute right-[-4rem] top-8 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <Badge className="border-primary/20 bg-primary/10 text-primary">Private analytics</Badge>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-balance text-[clamp(2.4rem,7vw,5rem)] font-semibold tracking-[-0.06em]">
                  Download telemetry for Vorn Voice, without Google Analytics.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  This dashboard reads first-party download redirects from SQLite on the stats service and stays protected behind nginx basic auth.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[24rem]">
              <StatusPill icon={ShieldCheck} label="Protected" value="nginx basic auth" />
              <StatusPill icon={Database} label="Storage" value="SQLite" />
              <StatusPill icon={Activity} label="Feed" value="live redirect logs" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard
            label="Total downloads"
            value={formatNumber(metrics.totalDownloads)}
            hint="All tracked redirect starts"
            trend={`${formatNumber(metrics.downloadsLast30Days)} in the last 30 days`}
          />
          <MetricCard
            label="Approx unique"
            value={formatNumber(metrics.uniqueDownloaders)}
            hint="Distinct hashed IPs across all time"
            trend={`${formatNumber(metrics.uniquesLast30Days)} unique in 30 days`}
          />
          <MetricCard
            label="Today"
            value={formatNumber(metrics.downloadsToday)}
            hint="Tracked since midnight UTC"
            trend={`${formatNumber(metrics.downloadsLast7Days)} in the last 7 days`}
          />
          <MetricCard
            label="Current target"
            value={metrics.latestDestination ? "Live" : "Waiting"}
            hint={metrics.latestDestination ?? "No redirect target has been resolved yet."}
            trend="Update source is configured" 
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <Card className="panel-glow overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <CardTitle className="text-2xl">Download trend</CardTitle>
                  <CardDescription>Daily volume and approximate unique downloaders for the last 30 days.</CardDescription>
                </div>
                <Button variant="outline" size="sm">Last 30 days</Button>
              </div>
            </CardHeader>
            <CardContent>
              <DownloadsChart data={metrics.dailySeries} />
            </CardContent>
          </Card>

          <Card className="panel-glow">
            <CardHeader>
              <CardTitle className="text-2xl">System notes</CardTitle>
              <CardDescription>Operational context for the private stats service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoPanel
                title="Tracking model"
                body="A download is recorded when the public site redirects through the stats service before sending the user to the latest DMG."
              />
              <InfoPanel
                title="Privacy"
                body="Raw IPs are never stored. The service keeps a salted SHA-256 hash for approximate unique counts."
              />
              <InfoPanel
                title="Lockdown"
                body="Protect the dashboard and metrics API with nginx basic auth while leaving the public download redirect route open."
              />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
          <RecentDownloads items={metrics.recentDownloads} />

          <Card className="panel-glow h-full">
            <CardHeader>
              <CardTitle>Quick view</CardTitle>
              <CardDescription>A few simple markers for the current deployment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <QuickStat label="Last 30 days" value={formatNumber(metrics.downloadsLast30Days)} />
              <QuickStat label="Last 7 days" value={formatNumber(metrics.downloadsLast7Days)} />
              <QuickStat label="Unique in 30 days" value={formatNumber(metrics.uniquesLast30Days)} />
              <QuickStat label="Recent events shown" value={formatNumber(metrics.recentDownloads.length)} />

              <div className="rounded-[1.4rem] border border-primary/15 bg-primary/8 p-4 text-sm leading-6 text-muted-foreground">
                <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Recommended next step
                </div>
                Point the public `/download` page at `https://stats.judemakes.dev/api/download/vorn-voice`, then enable the nginx auth block before exposing the dashboard.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function StatusPill({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-xl">
      <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function InfoPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.3rem] border border-white/8 bg-black/12 p-4">
      <div className="mb-1 text-sm font-medium text-foreground">{title}</div>
      <p className="text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-black/12 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
