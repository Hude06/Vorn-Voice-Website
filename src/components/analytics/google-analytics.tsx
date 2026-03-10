"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const measurementId = "G-5S85L38R1M";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    if (!pathname) {
      return;
    }

    let timeoutId: number | undefined;

    const trackPageView = () => {
      if (typeof window.gtag !== "function") {
        timeoutId = window.setTimeout(trackPageView, 150);
        return;
      }

      const pagePath = `${pathname}${window.location.search}`;

      if (lastTrackedPath.current === pagePath) {
        return;
      }

      lastTrackedPath.current = pagePath;

      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    };

    trackPageView();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
