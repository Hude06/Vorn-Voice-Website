const downloadMetadataUrl =
  process.env.DOWNLOAD_METADATA_URL ??
  "https://vorn.judemakes.dev/updates/mac/stable/latest-mac.yml";

const downloadBaseUrl =
  process.env.DOWNLOAD_BASE_URL ??
  "https://vorn.judemakes.dev/updates/mac/stable";

export async function resolveDownloadUrl() {
  const response = await fetch(downloadMetadataUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load metadata (${response.status})`);
  }

  const metadata = await response.text();
  const urls = Array.from(metadata.matchAll(/^\s*-\s+url:\s*(.+)$/gm)).map((match) =>
    stripYaml(match[1]),
  );
  const dmgUrl = urls.find((url) => url.endsWith(".dmg"));
  const fallbackPath = metadata.match(/^path:\s*(.+)$/m);
  const selectedUrl = dmgUrl ?? (fallbackPath ? stripYaml(fallbackPath[1]) : "");

  if (!selectedUrl) {
    throw new Error("Metadata did not include a macOS download URL");
  }

  return selectedUrl.startsWith("http") ? selectedUrl : `${downloadBaseUrl}/${selectedUrl}`;
}

export function getDownloadMetadataUrl() {
  return downloadMetadataUrl;
}

function stripYaml(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}
