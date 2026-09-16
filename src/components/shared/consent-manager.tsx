"use client";

/**
 * ConsentManager - GDPR analytics and marketing tracking consent.
 *
 * Reads the visitor's stored preference from localStorage and:
 *  - Renders nothing until hydration is complete (avoids SSR mismatch).
 *  - Shows the consent notice banner if no preference has been saved (consent === null).
 *  - Provides a persistent, accessible "Cookie settings" button to reopen preferences and withdraw or change consent.
 *  - Loads Vercel Analytics, Speed Insights, and Google tracking only when consent is "accepted".
 *
 * Preference is stored under the versioned key "lsh-tracking-consent-v2" in localStorage.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleTracking from "@/components/shared/google-tracking";
import uiContent from "@/content/ui.json";
import { CONSENT_STORAGE_KEY } from "@/lib/gtag";

type ConsentValue = "accepted" | "declined" | null;

export default function ConsentManager() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentValue | null;
    setConsent(stored ?? null);
    if (!stored) {
      setIsOpen(true);
    }
    setHydrated(true);

    const handleOpenSettings = () => setIsOpen(true);
    window.addEventListener("lsh:open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("lsh:open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
    setIsOpen(false);
  };

  // Do not render anything until client has hydrated - prevents SSR mismatch.
  if (!hydrated) return null;

  return (
    <>
      {/* Load analytics and marketing tracking only when accepted */}
      {consent === "accepted" && (
        <>
          <Analytics />
          <SpeedInsights />
          <GoogleTracking />
        </>
      )}

      {/* Accessible button to reopen cookie & tracking preferences */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-40 px-3 py-1.5 text-[0.75rem] font-medium text-[var(--lsh-grey-300)] bg-[var(--lsh-charcoal)] hover:bg-[var(--lsh-charcoal-light)] hover:text-white border border-white/15 rounded-[3px] shadow-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lsh-gold"
          aria-label="Manage cookie and tracking preferences"
        >
          {uiContent.consent.settingsButton}
        </button>
      )}

      {/* Consent banner / preferences panel */}
      {isOpen && (
        <div
          role="region"
          aria-label={uiContent.consent.ariaLabel}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10"
          style={{ backgroundColor: "var(--lsh-charcoal)" }}
        >
          <div className="lsh-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center md:py-5">
            <div className="flex-1 text-[0.8125rem] leading-relaxed" style={{ color: "var(--lsh-grey-300)" }}>
              <p>
                {uiContent.consent.message}{" "}
                <Link
                  href="/privacy"
                  className="text-lsh-gold hover:underline focus-visible:outline-none focus-visible:underline"
                >
                  {uiContent.consent.privacyLink}
                </Link>
              </p>
              {consent !== null && (
                <p className="mt-1 text-[0.75rem] text-[var(--lsh-grey-400)]">
                  {uiContent.consent.statusPrefix}{" "}
                  <strong className={consent === "accepted" ? "text-lsh-gold" : "text-white"}>
                    {consent === "accepted" ? uiContent.consent.statusAccepted : uiContent.consent.statusDeclined}
                  </strong>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={() => decide("declined")}
                className="px-4 py-2 text-[0.8125rem] font-semibold border border-white/20 rounded-sm hover:border-white/50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lsh-gold"
                style={{ color: "var(--lsh-grey-300)" }}
              >
                {uiContent.consent.decline}
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="px-4 py-2 text-[0.8125rem] font-semibold text-lsh-black bg-lsh-gold rounded-sm hover:bg-[var(--lsh-gold-hover)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {uiContent.consent.accept}
              </button>
              {consent !== null && (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-[0.8125rem] font-medium text-[var(--lsh-grey-400)] hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Close settings panel"
                >
                  {uiContent.consent.close}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
