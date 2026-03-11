import { NextResponse } from "next/server";

import {
  clearAllDownloads,
  clearTodaysDownloads,
  getDashboardMetrics,
} from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ResetScope = "today" | "all";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    scope?: ResetScope;
    timeZone?: string;
  } | null;

  if (!body?.scope || (body.scope !== "today" && body.scope !== "all")) {
    return NextResponse.json({ error: "Invalid reset scope." }, { status: 400 });
  }

  const timeZone = body.timeZone ?? undefined;
  const deleted =
    body.scope === "today"
      ? clearTodaysDownloads({ timeZone })
      : clearAllDownloads();

  return NextResponse.json({
    deleted,
    metrics: getDashboardMetrics({ timeZone }),
  });
}
