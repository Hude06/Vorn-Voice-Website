export type CountryCentroid = {
  latitude: number;
  longitude: number;
};

export const countryCentroids: Readonly<Record<string, CountryCentroid>> = {
  AE: { latitude: 24.4, longitude: 54.4 },
  AR: { latitude: -34.0, longitude: -64.0 },
  AT: { latitude: 47.5, longitude: 14.5 },
  AU: { latitude: -25.3, longitude: 133.8 },
  BE: { latitude: 50.8, longitude: 4.5 },
  BG: { latitude: 42.7, longitude: 25.5 },
  BR: { latitude: -14.2, longitude: -51.9 },
  CA: { latitude: 56.1, longitude: -106.3 },
  CH: { latitude: 46.8, longitude: 8.2 },
  CL: { latitude: -35.7, longitude: -71.5 },
  CN: { latitude: 35.9, longitude: 104.2 },
  CO: { latitude: 4.6, longitude: -74.1 },
  CZ: { latitude: 49.8, longitude: 15.5 },
  DE: { latitude: 51.2, longitude: 10.4 },
  DK: { latitude: 56.1, longitude: 9.5 },
  EE: { latitude: 58.6, longitude: 25.0 },
  EG: { latitude: 26.8, longitude: 30.8 },
  ES: { latitude: 40.4, longitude: -3.7 },
  EU: { latitude: 50.1, longitude: 14.4 },
  FI: { latitude: 64.5, longitude: 26.0 },
  FR: { latitude: 46.2, longitude: 2.2 },
  GB: { latitude: 55.4, longitude: -3.4 },
  GR: { latitude: 39.1, longitude: 22.9 },
  HK: { latitude: 22.3, longitude: 114.2 },
  HR: { latitude: 45.1, longitude: 15.2 },
  HU: { latitude: 47.2, longitude: 19.5 },
  ID: { latitude: -2.5, longitude: 118.0 },
  IE: { latitude: 53.1, longitude: -8.2 },
  IL: { latitude: 31.0, longitude: 35.0 },
  IN: { latitude: 20.6, longitude: 78.9 },
  IS: { latitude: 64.9, longitude: -18.6 },
  IT: { latitude: 41.9, longitude: 12.6 },
  JP: { latitude: 36.2, longitude: 138.3 },
  KR: { latitude: 36.5, longitude: 127.8 },
  LT: { latitude: 55.2, longitude: 23.9 },
  LU: { latitude: 49.8, longitude: 6.1 },
  LV: { latitude: 56.9, longitude: 24.6 },
  MX: { latitude: 23.6, longitude: -102.5 },
  MY: { latitude: 4.2, longitude: 101.9 },
  NG: { latitude: 9.1, longitude: 8.7 },
  NL: { latitude: 52.1, longitude: 5.3 },
  NO: { latitude: 60.5, longitude: 8.5 },
  NZ: { latitude: -40.9, longitude: 174.9 },
  PE: { latitude: -9.2, longitude: -75.0 },
  PH: { latitude: 12.9, longitude: 122.8 },
  PK: { latitude: 30.4, longitude: 69.4 },
  PL: { latitude: 52.1, longitude: 19.1 },
  PT: { latitude: 39.4, longitude: -8.2 },
  RO: { latitude: 45.9, longitude: 24.9 },
  RS: { latitude: 44.0, longitude: 20.9 },
  RU: { latitude: 61.5, longitude: 105.3 },
  SA: { latitude: 23.9, longitude: 45.1 },
  SE: { latitude: 60.1, longitude: 18.6 },
  SG: { latitude: 1.4, longitude: 103.8 },
  SI: { latitude: 46.2, longitude: 14.9 },
  SK: { latitude: 48.7, longitude: 19.7 },
  TH: { latitude: 15.9, longitude: 101.0 },
  TR: { latitude: 39.0, longitude: 35.2 },
  TW: { latitude: 23.7, longitude: 121.0 },
  UA: { latitude: 49.0, longitude: 31.4 },
  US: { latitude: 39.8, longitude: -98.6 },
  VN: { latitude: 14.1, longitude: 108.3 },
  ZA: { latitude: -30.6, longitude: 22.9 },
} as const;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const invalidCountryCodes = new Set(["A1", "A2", "O1", "T1", "XX", "ZZ"]);

export function normalizeCountryCode(value: string | null | undefined) {
  const normalized = value?.trim().toUpperCase();

  if (!normalized || !/^[A-Z]{2}$/.test(normalized) || invalidCountryCodes.has(normalized)) {
    return null;
  }

  return normalized;
}

export function resolveCountryName(countryCode: string) {
  return regionNames.of(countryCode) ?? countryCode;
}
