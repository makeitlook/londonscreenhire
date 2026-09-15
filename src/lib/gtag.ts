export const GA_TRACKING_ID = "AW-18422810681";
export const LEAD_CONVERSION_SEND_TO = "AW-18422810681/V4a1CKj5g-wcELmQ19BE";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the Google Ads conversion event for a completed quote / lead form submission.
 */
export function trackLeadConversion(): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "INR",
    });
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push([
      "event",
      "conversion",
      {
        send_to: LEAD_CONVERSION_SEND_TO,
        value: 1.0,
        currency: "INR",
      },
    ]);
  }
}
