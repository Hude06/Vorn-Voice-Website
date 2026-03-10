"use client";

import { useEffect } from "react";

const trackedDownloadUrl =
  process.env.NEXT_PUBLIC_DOWNLOAD_TRACKING_URL ??
  "https://stats.judemakes.dev/api/download/vorn-voice";

export default function DownloadPage() {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.replace(trackedDownloadUrl);
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="mesh-background relative flex min-h-screen items-center justify-center px-4 py-8 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary/12 via-primary/4 to-transparent" />
      <div className="glass-panel relative w-full max-w-2xl space-y-4 rounded-[1.75rem] border border-border/90 bg-card/85 p-6 sm:rounded-3xl sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Starting your download...</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We are routing this through the private stats service before sending you to the latest macOS build.
        </p>
        <a
          className="inline-flex w-full items-center justify-center rounded-full border border-primary/35 bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          href={trackedDownloadUrl}
        >
          Download Vorn Voice for macOS
        </a>
      </div>
    </main>
  );
}
