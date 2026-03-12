import crypto from "node:crypto";

import { getDb } from "@/lib/db";
import { countryCentroids, resolveCountryName } from "@/lib/geo";

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
  countryCode: string | null;
  countryName: string | null;
};

export type DownloadOrigin = {
  countryCode: string;
  countryName: string;
  downloads: number;
  uniqueDownloaders: number;
  latitude: number | null;
  longitude: number | null;
  share: number;
};

export type DashboardMetrics = {
  timeZone: string;
  totalDownloads: number;
  uniqueDownloaders: number;
  downloadsToday: number;
  downloadsLast7Days: number;
  downloadsLast30Days: number;
  uniquesLast30Days: number;
  latestDestination: string | null;
  dailySeries: DailyMetricPoint[];
  recentDownloads: RecentDownload[];
  originSummary: DownloadOrigin[];
  downloadsWithCountryLast30Days: number;
  downloadsWithoutCountryLast30Days: number;
};

type CountRow = { total: number };
type LatestDestinationRow = { destinationUrl: string | null };
type DailyRow = { date: string; downloads: number; uniqueDownloaders: number };
type WindowRow = { createdAt: string; ipHash: string | null; countryCode: string | null };
type RecentRow = {
  id: number;
  createdAt: string;
  destinationUrl: string;
  requestHost: string | null;
  referer: string | null;
  userAgent: string | null;
  ipHash: string | null;
  countryCode: string | null;
};

const trailingWindowDays = 30;
const trailingWindowBufferDays = 32;
const defaultDashboardTimeZone = "UTC";

export function getDashboardMetrics(options: { timeZone?: string } = {}): DashboardMetrics {
  const db = getDb();
  const timeZone = resolveDashboardTimeZone(options.timeZone);

  const totalDownloads = db
    .prepare<[], CountRow>("SELECT COUNT(*) AS total FROM download_events")
    .get()?.total ?? 0;

  const uniqueDownloaders = db
    .prepare<[], CountRow>(
      "SELECT COUNT(DISTINCT ip_hash) AS total FROM download_events WHERE ip_hash IS NOT NULL",
    )
    .get()?.total ?? 0;

  const latestDestination = db
    .prepare<[], LatestDestinationRow>(
      "SELECT destination_url AS destinationUrl FROM download_events ORDER BY created_at DESC LIMIT 1",
    )
    .get()?.destinationUrl ?? null;

  const trailingRows = db
    .prepare<[], WindowRow>(
      `SELECT
        created_at AS createdAt,
        ip_hash AS ipHash,
        country_code AS countryCode
      FROM download_events
      WHERE created_at >= datetime('now', '-${trailingWindowBufferDays} days', 'start of day')
      ORDER BY created_at ASC`,
    )
    .all();

  const rollingMetrics = buildRollingMetrics(trailingRows, timeZone);

  const recentDownloads = db
    .prepare<[], RecentRow>(
      `SELECT
        id,
        created_at AS createdAt,
        destination_url AS destinationUrl,
        request_host AS requestHost,
        referer,
        user_agent AS userAgent,
        ip_hash AS ipHash,
        country_code AS countryCode
      FROM download_events
      ORDER BY created_at DESC
      LIMIT 12`,
    )
    .all()
    .map((row) => ({
      ...row,
      countryName: row.countryCode ? resolveCountryName(row.countryCode) : null,
    }));

  return {
    timeZone,
    totalDownloads,
    uniqueDownloaders,
    downloadsToday: rollingMetrics.downloadsToday,
    downloadsLast7Days: rollingMetrics.downloadsLast7Days,
    downloadsLast30Days: rollingMetrics.downloadsLast30Days,
    uniquesLast30Days: rollingMetrics.uniquesLast30Days,
    latestDestination,
    dailySeries: rollingMetrics.dailySeries,
    recentDownloads,
    originSummary: rollingMetrics.originSummary,
    downloadsWithCountryLast30Days: rollingMetrics.downloadsWithCountryLast30Days,
    downloadsWithoutCountryLast30Days: rollingMetrics.downloadsWithoutCountryLast30Days,
  };
}

export function recordDownloadEvent(input: {
  productKey: string;
  destinationUrl: string;
  requestHost: string | null;
  referer: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  countryCode: string | null;
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
      ip_hash,
      country_code
    ) VALUES (
      @productKey,
      @destinationUrl,
      @requestHost,
      @referer,
      @userAgent,
      @ipHash,
      @countryCode
    )`,
  ).run({
    productKey: input.productKey,
    destinationUrl: input.destinationUrl,
    requestHost: input.requestHost,
    referer: input.referer,
    userAgent: input.userAgent,
    ipHash,
    countryCode: input.countryCode,
  });
}

export function clearTodaysDownloads(options: { timeZone?: string } = {}) {
  const db = getDb();
  const timeZone = resolveDashboardTimeZone(options.timeZone);
  const { startUtc, endUtc } = getLocalDayUtcRange(timeZone);

  return db
    .prepare(
      `DELETE FROM download_events
      WHERE created_at >= @startUtc
        AND created_at < @endUtc`,
    )
    .run({
      startUtc: formatSqliteTimestamp(startUtc),
      endUtc: formatSqliteTimestamp(endUtc),
    }).changes;
}

export function clearAllDownloads() {
  const db = getDb();
  return db.prepare("DELETE FROM download_events").run().changes;
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

function buildRollingMetrics(rows: WindowRow[], timeZone: string) {
  const todayKey = getDateKey(new Date(), timeZone);
  const dateKeys = buildTrailingDateKeys(todayKey, trailingWindowDays);
  const validKeys = new Set(dateKeys);
  const dailyCounts = new Map<string, DailyRow>();
  const uniqueKeysByDate = new Map<string, Set<string>>();
  const uniqueKeysLast30Days = new Set<string>();
  const originsByCountry = new Map<
    string,
    {
      countryCode: string;
      countryName: string;
      downloads: number;
      uniqueKeys: Set<string>;
    }
  >();
  let downloadsWithoutCountryLast30Days = 0;

  for (const key of dateKeys) {
    dailyCounts.set(key, {
      date: key,
      downloads: 0,
      uniqueDownloaders: 0,
    });
  }

  for (const row of rows) {
    const dateKey = getDateKey(parseSqliteTimestamp(row.createdAt), timeZone);

    if (!validKeys.has(dateKey)) {
      continue;
    }

    const entry = dailyCounts.get(dateKey);

    if (!entry) {
      continue;
    }

    entry.downloads += 1;

    if (row.ipHash) {
      const dailyUniqueKeys = uniqueKeysByDate.get(dateKey) ?? new Set<string>();
      dailyUniqueKeys.add(row.ipHash);
      uniqueKeysByDate.set(dateKey, dailyUniqueKeys);
      uniqueKeysLast30Days.add(row.ipHash);
    }

    if (row.countryCode) {
      const origin = originsByCountry.get(row.countryCode) ?? {
        countryCode: row.countryCode,
        countryName: resolveCountryName(row.countryCode),
        downloads: 0,
        uniqueKeys: new Set<string>(),
      };

      origin.downloads += 1;

      if (row.ipHash) {
        origin.uniqueKeys.add(row.ipHash);
      }

      originsByCountry.set(row.countryCode, origin);
    } else {
      downloadsWithoutCountryLast30Days += 1;
    }
  }

  const dailySeries = dateKeys.map((dateKey) => {
    const entry = dailyCounts.get(dateKey);
    const uniqueDownloaders = uniqueKeysByDate.get(dateKey)?.size ?? 0;

    return {
      date: dateKey,
      downloads: entry?.downloads ?? 0,
      uniqueDownloaders,
    };
  });

  const downloadsLast30Days = sumDownloads(dailySeries);
  const originSummary = Array.from(originsByCountry.values())
    .map((origin) => {
      const centroid = countryCentroids[origin.countryCode];

      return {
        countryCode: origin.countryCode,
        countryName: origin.countryName,
        downloads: origin.downloads,
        uniqueDownloaders: origin.uniqueKeys.size,
        latitude: centroid?.latitude ?? null,
        longitude: centroid?.longitude ?? null,
        share: downloadsLast30Days > 0 ? origin.downloads / downloadsLast30Days : 0,
      };
    })
    .sort((left, right) => {
      if (right.downloads !== left.downloads) {
        return right.downloads - left.downloads;
      }

      return left.countryName.localeCompare(right.countryName);
    });

  return {
    dailySeries,
    downloadsToday: dailySeries.at(-1)?.downloads ?? 0,
    downloadsLast7Days: sumDownloads(dailySeries.slice(-7)),
    downloadsLast30Days,
    uniquesLast30Days: uniqueKeysLast30Days.size,
    originSummary,
    downloadsWithCountryLast30Days: originSummary.reduce((total, origin) => total + origin.downloads, 0),
    downloadsWithoutCountryLast30Days,
  };
}

function sumDownloads(rows: DailyRow[]) {
  return rows.reduce((total, row) => total + row.downloads, 0);
}

function resolveDashboardTimeZone(value?: string) {
  if (!value) {
    return defaultDashboardTimeZone;
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return value;
  } catch {
    return defaultDashboardTimeZone;
  }
}

function buildTrailingDateKeys(todayKey: string, length: number) {
  const [year, month, day] = todayKey.split("-").map(Number);
  const anchor = new Date(Date.UTC(year, month - 1, day));

  return Array.from({ length }, (_, index) => {
    const pointDate = new Date(anchor);
    pointDate.setUTCDate(anchor.getUTCDate() - (length - index - 1));
    return pointDate.toISOString().slice(0, 10);
  });
}

function getDateKey(value: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error(`Failed to derive local date key for timezone ${timeZone}`);
  }

  return `${year}-${month}-${day}`;
}

function parseSqliteTimestamp(value: string) {
  const [datePart, timePart = "00:00:00"] = value.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds ?? 0));
}

function getLocalDayUtcRange(timeZone: string) {
  const todayKey = getDateKey(new Date(), timeZone);
  const [year, month, day] = todayKey.split("-").map(Number);

  return {
    startUtc: getUtcInstantForLocalTime({ year, month, day, hour: 0 }, timeZone),
    endUtc: getUtcInstantForLocalTime(getNextDay({ year, month, day }), timeZone),
  };
}

function getNextDay({ year, month, day }: { year: number; month: number; day: number }) {
  const value = new Date(Date.UTC(year, month - 1, day));
  value.setUTCDate(value.getUTCDate() + 1);

  return {
    year: value.getUTCFullYear(),
    month: value.getUTCMonth() + 1,
    day: value.getUTCDate(),
    hour: 0,
  };
}

function getUtcInstantForLocalTime(
  localTime: { year: number; month: number; day: number; hour: number },
  timeZone: string,
) {
  const utcGuess = Date.UTC(localTime.year, localTime.month - 1, localTime.day, localTime.hour);
  const offsetMinutes = getTimeZoneOffsetMinutes(new Date(utcGuess), timeZone);

  return new Date(utcGuess - offsetMinutes * 60_000);
}

function getTimeZoneOffsetMinutes(value: Date, timeZone: string) {
  const zone = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
  })
    .formatToParts(value)
    .find((part) => part.type === "timeZoneName")?.value;

  if (!zone) {
    throw new Error(`Failed to resolve timezone offset for ${timeZone}`);
  }

  if (zone === "GMT") {
    return 0;
  }

  const match = zone.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);

  if (!match) {
    throw new Error(`Unsupported timezone offset format: ${zone}`);
  }

  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? "0");

  return sign * (hours * 60 + minutes);
}

function formatSqliteTimestamp(value: Date) {
  const year = value.getUTCFullYear();
  const month = `${value.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${value.getUTCDate()}`.padStart(2, "0");
  const hours = `${value.getUTCHours()}`.padStart(2, "0");
  const minutes = `${value.getUTCMinutes()}`.padStart(2, "0");
  const seconds = `${value.getUTCSeconds()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
