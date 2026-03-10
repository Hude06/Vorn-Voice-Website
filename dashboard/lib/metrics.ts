import crypto from "node:crypto";

import { getDb } from "@/lib/db";

export type DailyMetricPoint = {
  date: string;
  downloads: number;
  uniqueDownloaders: number;
};

export type RecentDownload = {
  id: number;
  createdAt: string;
  destinationUrl: string;
  requestHost: string | null;
  referer: string | null;
  userAgent: string | null;
  ipHash: string | null;
};

export type DashboardMetrics = {
  totalDownloads: number;
  uniqueDownloaders: number;
  downloadsToday: number;
  downloadsLast7Days: number;
  downloadsLast30Days: number;
  uniquesLast30Days: number;
  latestDestination: string | null;
  dailySeries: DailyMetricPoint[];
  recentDownloads: RecentDownload[];
};

type CountRow = { total: number };
type LatestDestinationRow = { destinationUrl: string | null };
type DailyRow = { date: string; downloads: number; uniqueDownloaders: number };
type RecentRow = {
  id: number;
  createdAt: string;
  destinationUrl: string;
  requestHost: string | null;
  referer: string | null;
  userAgent: string | null;
  ipHash: string | null;
};

export function getDashboardMetrics(): DashboardMetrics {
  const db = getDb();

  const totalDownloads = db
    .prepare<[], CountRow>("SELECT COUNT(*) AS total FROM download_events")
    .get()?.total ?? 0;

  const uniqueDownloaders = db
    .prepare<[], CountRow>(
      "SELECT COUNT(DISTINCT ip_hash) AS total FROM download_events WHERE ip_hash IS NOT NULL",
    )
    .get()?.total ?? 0;

  const downloadsToday = db
    .prepare<[], CountRow>(
      "SELECT COUNT(*) AS total FROM download_events WHERE created_at >= datetime('now', 'start of day')",
    )
    .get()?.total ?? 0;

  const downloadsLast7Days = db
    .prepare<[], CountRow>(
      "SELECT COUNT(*) AS total FROM download_events WHERE created_at >= datetime('now', '-6 days', 'start of day')",
    )
    .get()?.total ?? 0;

  const downloadsLast30Days = db
    .prepare<[], CountRow>(
      "SELECT COUNT(*) AS total FROM download_events WHERE created_at >= datetime('now', '-29 days', 'start of day')",
    )
    .get()?.total ?? 0;

  const uniquesLast30Days = db
    .prepare<[], CountRow>(
      "SELECT COUNT(DISTINCT ip_hash) AS total FROM download_events WHERE ip_hash IS NOT NULL AND created_at >= datetime('now', '-29 days', 'start of day')",
    )
    .get()?.total ?? 0;

  const latestDestination = db
    .prepare<[], LatestDestinationRow>(
      "SELECT destination_url AS destinationUrl FROM download_events ORDER BY created_at DESC LIMIT 1",
    )
    .get()?.destinationUrl ?? null;

  const dailyRows = db
    .prepare<[], DailyRow>(
      `SELECT
        DATE(created_at) AS date,
        COUNT(*) AS downloads,
        COUNT(DISTINCT ip_hash) AS uniqueDownloaders
      FROM download_events
      WHERE created_at >= datetime('now', '-29 days', 'start of day')
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC`,
    )
    .all();

  const recentDownloads = db
    .prepare<[], RecentRow>(
      `SELECT
        id,
        created_at AS createdAt,
        destination_url AS destinationUrl,
        request_host AS requestHost,
        referer,
        user_agent AS userAgent,
        ip_hash AS ipHash
      FROM download_events
      ORDER BY created_at DESC
      LIMIT 12`,
    )
    .all();

  return {
    totalDownloads,
    uniqueDownloaders,
    downloadsToday,
    downloadsLast7Days,
    downloadsLast30Days,
    uniquesLast30Days,
    latestDestination,
    dailySeries: fillSeriesGaps(dailyRows),
    recentDownloads,
  };
}

export function recordDownloadEvent(input: {
  productKey: string;
  destinationUrl: string;
  requestHost: string | null;
  referer: string | null;
  userAgent: string | null;
  ipAddress: string | null;
}) {
  const db = getDb();
  const ipHash = hashIp(input.ipAddress);

  db.prepare(
    `INSERT INTO download_events (
      product_key,
      destination_url,
      request_host,
      referer,
      user_agent,
      ip_hash
    ) VALUES (
      @productKey,
      @destinationUrl,
      @requestHost,
      @referer,
      @userAgent,
      @ipHash
    )`,
  ).run({
    productKey: input.productKey,
    destinationUrl: input.destinationUrl,
    requestHost: input.requestHost,
    referer: input.referer,
    userAgent: input.userAgent,
    ipHash,
  });
}

function hashIp(ipAddress: string | null) {
  if (!ipAddress) {
    return null;
  }

  const salt = process.env.IP_HASH_SALT;

  if (!salt) {
    throw new Error("IP_HASH_SALT is required for production download tracking");
  }

  return crypto.createHash("sha256").update(`${salt}:${ipAddress}`).digest("hex");
}

function fillSeriesGaps(rows: DailyRow[]) {
  const byDate = new Map(rows.map((row) => [row.date, row]));
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - 29);

  return Array.from({ length: 30 }, (_, index) => {
    const pointDate = new Date(start);
    pointDate.setUTCDate(start.getUTCDate() + index);
    const key = pointDate.toISOString().slice(0, 10);
    const row = byDate.get(key);

    return {
      date: key,
      downloads: row?.downloads ?? 0,
      uniqueDownloaders: row?.uniqueDownloaders ?? 0,
    };
  });
}
