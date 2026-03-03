"use client";

import { useEffect } from "react";

const fileUrl = "/download/Vorn-Voice.dmg";

export default function DownloadPage() {
  useEffect(() => {
    window.location.replace(fileUrl);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Starting your download...</h1>
        <p className="text-sm text-muted-foreground">
          If the download does not start, use the direct link below.
        </p>
        <a className="underline" href={fileUrl}>
          Download Vorn Voice for macOS
        </a>
      </div>
    </main>
  );
}
