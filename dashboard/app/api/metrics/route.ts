import { NextResponse } from "next/server";

import { getDashboardMetrics } from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeZone = searchParams.get("timeZone") ?? undefined;

  return NextResponse.json(getDashboardMetrics({ timeZone }));
}
