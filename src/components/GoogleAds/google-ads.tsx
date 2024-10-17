"use client";

import Script from "next/script";
import { useEffect } from "react";

function GoogleAdsense() {
  useEffect(() => {
    const handleError = (e: Event) => {
      console.error("Google AdSense script failed to load", e);
    };

    const script = document.querySelector('script[src*="googlesyndication"]');
    script?.addEventListener("error", handleError);

    return () => {
      script?.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
      crossOrigin="anonymous"
    />
  );
}

export default GoogleAdsense;
