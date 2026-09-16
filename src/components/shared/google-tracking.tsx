"use client";

import Script from "next/script";
import { GA_TRACKING_ID, GTM_ID } from "@/lib/gtag";

interface GoogleTrackingProps {
  /**
   * If Google Ads is configured inside the GTM container, set to false to avoid duplicate tags.
   * Defaults to true to support standalone Google Ads tracking until GTM tags are verified.
   */
  enableStandaloneGtag?: boolean;
}

export default function GoogleTracking({
  enableStandaloneGtag = true,
}: GoogleTrackingProps) {
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

      {/* Standalone Google Ads tag (gtag.js) */}
      {enableStandaloneGtag && (
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
