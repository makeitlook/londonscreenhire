"use client";

import Script from "next/script";
import {
  CONVERSION_PROVIDER,
  GA_TRACKING_ID,
  GTM_ID,
  type ConversionProvider,
} from "@/lib/gtag";

interface GoogleTrackingProps {
  /**
   * Provider handling conversion tracking.
   * If "gtm", only GTM is loaded (standalone gtag is omitted to prevent duplicate tags).
   * If "gtag", standalone gtag is loaded alongside GTM.
   */
  provider?: ConversionProvider;
}

export default function GoogleTracking({
  provider = CONVERSION_PROVIDER,
}: GoogleTrackingProps) {
  const isGtmOnly = provider === "gtm";

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* Standalone Google Ads tag (gtag.js) - omitted when conversions are managed through GTM */}
      {!isGtmOnly && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
