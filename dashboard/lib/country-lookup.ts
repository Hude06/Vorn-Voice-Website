import { isIP } from "node:net";

import { normalizeCountryCode } from "@/lib/geo";

type CountryLookupInput = {
  headerCountryCode?: string | null;
  ipAddress: string | null;
};

type CountryLookupResponse = {
  country?: string;
};

type CachedCountryCode = {
  countryCode: string | null;
  expiresAt: number;
};

const countryLookupBaseUrl = (process.env.COUNTRY_LOOKUP_BASE_URL ?? "https://api.country.is").replace(/\/+$/, "");
const countryLookupTimeoutMs = parsePositiveInteger(process.env.COUNTRY_LOOKUP_TIMEOUT_MS, 900);
const cacheTtlMs = 24 * 60 * 60 * 1000;
const countryCodeCache = new Map<string, CachedCountryCode>();

export async function resolveCountryCode({ headerCountryCode, ipAddress }: CountryLookupInput) {
  if (headerCountryCode) {
    return headerCountryCode;
  }

  const normalizedIpAddress = normalizeIpAddress(ipAddress);

  if (!normalizedIpAddress || !isPublicIpAddress(normalizedIpAddress)) {
    return null;
  }

  const cached = countryCodeCache.get(normalizedIpAddress);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.countryCode;
  }

  try {
    const response = await fetch(`${countryLookupBaseUrl}/${encodeURIComponent(normalizedIpAddress)}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(countryLookupTimeoutMs),
    });

    if (!response.ok) {
      throw new Error(`Country lookup failed (${response.status})`);
    }

    const payload = (await response.json()) as CountryLookupResponse;
    const countryCode = normalizeCountryCode(payload.country);

    countryCodeCache.set(normalizedIpAddress, {
      countryCode,
      expiresAt: Date.now() + cacheTtlMs,
    });

    return countryCode;
  } catch (error: unknown) {
    if (!(error instanceof DOMException && error.name === "AbortError")) {
      console.error("Failed to resolve download country", error);
    }

    return null;
  }
}

function normalizeIpAddress(value: string | null) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const bracketlessValue =
    trimmed.startsWith("[") && trimmed.includes("]") ? trimmed.slice(1, trimmed.indexOf("]")) : trimmed;
  const zoneLessValue = bracketlessValue.split("%")[0] ?? bracketlessValue;
  const lowerCaseValue = zoneLessValue.toLowerCase();

  if (lowerCaseValue.startsWith("::ffff:")) {
    const mappedAddress = zoneLessValue.slice("::ffff:".length);

    return isIP(mappedAddress) === 4 ? mappedAddress : null;
  }

  return isIP(zoneLessValue) > 0 ? zoneLessValue : null;
}

function isPublicIpAddress(value: string) {
  if (isIP(value) === 4) {
    const [firstOctet, secondOctet] = value.split(".").map(Number);

    if (firstOctet === 0 || firstOctet === 10 || firstOctet === 127) {
      return false;
    }

    if (firstOctet === 100 && secondOctet >= 64 && secondOctet <= 127) {
      return false;
    }

    if (firstOctet === 169 && secondOctet === 254) {
      return false;
    }

    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
      return false;
    }

    if (firstOctet === 192 && secondOctet === 168) {
      return false;
    }

    if (firstOctet >= 224) {
      return false;
    }

    return true;
  }

  const normalizedValue = value.toLowerCase();

  if (normalizedValue === "::" || normalizedValue === "::1" || normalizedValue.startsWith("2001:db8")) {
    return false;
  }

  if (normalizedValue.startsWith("fc") || normalizedValue.startsWith("fd")) {
    return false;
  }

  return !["fe8", "fe9", "fea", "feb"].some((prefix) => normalizedValue.startsWith(prefix));
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
