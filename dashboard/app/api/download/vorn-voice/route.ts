import { NextResponse } from "next/server";

import { getDownloadMetadataUrl, resolveDownloadUrl } from "@/lib/download-source";
import { recordDownloadEvent } from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let destinationUrl = getDownloadMetadataUrl();

  try {
    destinationUrl = await resolveDownloadUrl();
  } catch (error) {
    console.error("Failed to resolve download URL", error);
  }

  try {
    recordDownloadEvent({
      productKey: "vorn_voice",
      destinationUrl,
      requestHost: request.headers.get("x-forwarded-host") ?? request.headers.get("host"),
      referer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
      ipAddress: getClientIp(request),
    });
  } catch (error) {
    console.error("Failed to record download event", error);
  }

  return NextResponse.redirect(destinationUrl, 302);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip");
}
