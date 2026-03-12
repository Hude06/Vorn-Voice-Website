import { NextResponse } from "next/server";

import { resolveCountryCode } from "@/lib/country-lookup";
import { normalizeCountryCode } from "@/lib/geo";
import { getDownloadMetadataUrl, resolveDownloadUrl } from "@/lib/download-source";
import { recordDownloadEvent } from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ipAddress = getClientIp(request);
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const referer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");
  const [destinationResult, countryCodeResult] = await Promise.allSettled([
    resolveDownloadUrl(),
    resolveCountryCode({
      headerCountryCode: getClientCountryCodeFromHeaders(request),
      ipAddress,
    }),
  ]);
  let destinationUrl = getDownloadMetadataUrl();
  let countryCode: string | null = null;

  if (destinationResult.status === "fulfilled") {
    destinationUrl = destinationResult.value;
  } else {
    console.error("Failed to resolve download URL", destinationResult.reason);
  }

  if (countryCodeResult.status === "fulfilled") {
    countryCode = countryCodeResult.value;
  }

  try {
    recordDownloadEvent({
      productKey: "vorn_voice",
      destinationUrl,
      requestHost,
      referer,
      userAgent,
      ipAddress,
      countryCode,
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

function getClientCountryCodeFromHeaders(request: Request) {
  return normalizeCountryCode(
    request.headers.get("x-geo-country-code") ??
      request.headers.get("cf-ipcountry") ??
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cloudfront-viewer-country") ??
      request.headers.get("fastly-client-country-code") ??
      request.headers.get("x-appengine-country"),
  );
}
