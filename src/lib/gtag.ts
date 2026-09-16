export const GA_TRACKING_ID = "AW-18422810681";
export const GTM_ID = "GTM-5V42SDFR";
export const LEAD_CONVERSION_SEND_TO = "AW-18422810681/V4a1CKj5g-wcELmQ19BE";
export const CONSENT_STORAGE_KEY = "lsh-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the lead form conversion event only if the visitor has explicitly accepted analytics/marketing tracking.
 * Pushes to dataLayer for GTM triggers and invokes gtag if initialized.
 * Omits value and currency so Google Ads uses the default value/currency configured in Google Ads.
 */
export function trackLeadConversion(): void {
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

  // Push custom event to dataLayer (for GTM tag configuration)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_form_submission",
    conversion_id: LEAD_CONVERSION_SEND_TO,
  });

  // Call gtag conversion event if gtag is active
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
    });
  }
}
