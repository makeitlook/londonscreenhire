export const GA_TRACKING_ID = "AW-18422810681";
export const GTM_ID = "GTM-5V42SDFR";
export const LEAD_CONVERSION_SEND_TO = "AW-18422810681/V4a1CKj5g-wcELmQ19BE";
export const CONSENT_STORAGE_KEY = "lsh-tracking-consent-v2";

export type ConversionProvider = "gtm" | "gtag";

/**
 * Configure which provider handles Google Ads conversion tracking to prevent duplicate counting.
 *
 * - "gtm": Conversions are handled via Google Tag Manager. Pushes 'lead_form_submission' to dataLayer.
 *          Does NOT execute direct gtag conversion to prevent duplicate counts.
 * - "gtag": Conversions are handled directly via Google Ads gtag.js ('AW-18422810681').
 *           Does NOT trigger GTM lead_form_submission event.
 *
 * Defaults to "gtm" if NEXT_PUBLIC_CONVERSION_PROVIDER is set to "gtm", otherwise "gtag".
 */
export const CONVERSION_PROVIDER: ConversionProvider =
  (process.env.NEXT_PUBLIC_CONVERSION_PROVIDER as ConversionProvider) || "gtag";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the lead form conversion event only if the visitor has explicitly accepted analytics/marketing tracking.
 * Routes through EITHER GTM or standalone gtag (never both) to prevent duplicate conversion counting.
 * Omits value and currency so Google Ads uses the default value/currency configured in Google Ads.
 */
export function trackLeadConversion(
  provider: ConversionProvider = CONVERSION_PROVIDER,
): void {
  if (typeof window === "undefined") return;

  // Tracking must respect user consent
  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (consent !== "accepted") {
      return;
    }
  } catch {
    return;
  }

  if (provider === "gtm") {
    // Route exclusively through GTM dataLayer - avoids duplicate direct gtag call
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submission",
      conversion_id: LEAD_CONVERSION_SEND_TO,
    });
  } else {
    // Route exclusively through direct gtag - avoids triggering duplicate GTM conversion tags
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: LEAD_CONVERSION_SEND_TO,
      });
    }
  }
}
