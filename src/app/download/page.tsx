"use client";

import { useEffect, useState } from "react";

const updateBasePath = "https://vorn.judemakes.dev/updates/mac/stable";
const metadataUrl = `${updateBasePath}/latest-mac.yml`;

export default function DownloadPage() {
  const [fileUrl, setFileUrl] = useState(metadataUrl);

  useEffect(() => {
    let cancelled = false;

    const resolveDownloadUrl = async () => {
      try {
        const response = await fetch(metadataUrl, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to load metadata (${response.status})`);
        }

        const metadata = await response.text();
        const urls = Array.from(metadata.matchAll(/^\s*-\s+url:\s*(.+)$/gm)).map((match) => stripYaml(match[1]));
        const dmgUrl = urls.find((url) => url.endsWith(".dmg"));
        const fallbackPath = metadata.match(/^path:\s*(.+)$/m);
        const selectedUrl = dmgUrl ?? (fallbackPath ? stripYaml(fallbackPath[1]) : "");

        if (!selectedUrl || cancelled) {
          return;
        }

        const absoluteUrl = selectedUrl.startsWith("http") ? selectedUrl : `${updateBasePath}/${selectedUrl}`;
        setFileUrl(absoluteUrl);
        window.location.replace(absoluteUrl);
      } catch {
        if (!cancelled) {
          window.location.replace(metadataUrl);
        }
      }
    };

    void resolveDownloadUrl();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mesh-background relative flex min-h-screen items-center justify-center px-4 py-8 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary/12 via-primary/4 to-transparent" />
      <div className="glass-panel relative w-full max-w-2xl space-y-4 rounded-[1.75rem] border border-border/90 bg-card/85 p-6 sm:rounded-3xl sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Starting your download...</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          If the download does not start, use the direct link below.
        </p>
        <a
          className="inline-flex w-full items-center justify-center rounded-full border border-primary/35 bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          href={fileUrl}
        >
          Download Vorn Voice for macOS
        </a>
      </div>
    </main>
  );
}

function stripYaml(value: string): string {
  const trimmed = value.trim();
  if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}
