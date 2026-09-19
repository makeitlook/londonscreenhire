import Script from "next/script";
import {
  CONSENT_STORAGE_KEY,
  CONVERSION_PROVIDER,
  GA_MEASUREMENT_ID,
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
      {/* Google Consent Mode v2: sets default state to denied (or granted if user previously accepted in localStorage) */}
      <Script id="google-consent-mode" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          (function(){
            try {
              var storedConsent = localStorage.getItem('${CONSENT_STORAGE_KEY}');
              var isGranted = storedConsent === 'accepted';
              gtag('consent', 'default', {
                'ad_storage': isGranted ? 'granted' : 'denied',
                'ad_user_data': isGranted ? 'granted' : 'denied',
                'ad_personalization': isGranted ? 'granted' : 'denied',
                'analytics_storage': isGranted ? 'granted' : 'denied'
              });
            } catch (e) {
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
            }
          })();
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* Google Analytics (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      {/* Standalone Google Ads tag (gtag.js) - omitted when conversions are managed through GTM */}
      {!isGtmOnly && (
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      )}
    </>
  );
}

