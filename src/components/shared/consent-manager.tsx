"use client";

/**
 * ConsentManager - GDPR analytics consent.
 *
 * Reads the visitor's stored preference from localStorage and:
 *  - Renders nothing until hydration is complete (avoids SSR mismatch).
 *  - Shows a one-time notice banner if no preference has been saved.
 *  - Loads Vercel Analytics and Speed Insights only when consent is "accepted".
 *
 * Preference is stored under the key "lsh-analytics-consent" in localStorage
 * (not a cookie - no cookie banner paradox).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import uiContent from "@/content/ui.json";

const CONSENT_KEY = "lsh-analytics-consent";
type ConsentValue = "accepted" | "declined" | null;

export default function ConsentManager() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    setConsent(stored ?? null);
    setHydrated(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  // Do not render anything until client has hydrated - prevents SSR mismatch.
  if (!hydrated) return null;

  return (
    <>
      {/* Load analytics only when accepted */}
      {consent === "accepted" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {/* Banner shown once, until the visitor makes a choice */}
      {consent === null && (
        <div
          role="region"
          aria-label={uiContent.consent.ariaLabel}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10"
          style={{ backgroundColor: "var(--lsh-charcoal)" }}
        >
          <div className="lsh-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center md:py-5">
            <p className="flex-1 text-[0.8125rem] leading-relaxed" style={{ color: "var(--lsh-grey-300)" }}>
              {uiContent.consent.message}{" "}
              <Link
                href="/privacy"
                className="text-lsh-blue hover:underline focus-visible:outline-none focus-visible:underline"
              >
                {uiContent.consent.privacyLink}
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => decide("declined")}
                className="px-4 py-2 text-[0.8125rem] font-semibold border border-white/20 rounded-sm hover:border-white/50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lsh-blue"
                style={{ color: "var(--lsh-grey-300)" }}
              >
                {uiContent.consent.decline}
              </button>
              <button
                onClick={() => decide("accepted")}
                className="px-4 py-2 text-[0.8125rem] font-semibold text-white bg-lsh-blue rounded-sm hover:bg-[var(--lsh-blue-hover)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {uiContent.consent.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
