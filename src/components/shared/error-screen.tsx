"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import SiteLogo from "@/components/shared/site-logo";
import siteContent from "@/content/site.json";
import uiContent from "@/content/ui.json";
import { contact } from "@/data/contact";

interface ErrorScreenProps {
  reset: () => void;
}

/** Minimal recovery UI shared by route and root error boundaries. */
export default function ErrorScreen({ reset }: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-lsh-dark text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-10 -translate-y-24 rounded-[3px] bg-lsh-gold px-4 py-3 text-sm font-semibold text-lsh-black shadow-lg transition-transform focus:translate-y-0"
      >
        {uiContent.error.skipLink}
      </a>

      <header className="border-b border-[var(--lsh-border-dark)] bg-lsh-dark">
        <div className="lsh-container flex h-[76px] items-center xl:h-[86px]">
          <Link href="/" aria-label={siteContent.logo.homeAriaLabel}>
            <SiteLogo />
          </Link>
        </div>
      </header>

      <main
        id="main-content"
        className="lsh-container flex w-full flex-1 items-center py-16 sm:py-20"
      >
        <div className="max-w-[620px]">
          <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
            {uiContent.error.eyebrow}
          </p>
          <h1
            className="mb-5 font-heading font-bold uppercase leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {uiContent.error.heading}
          </h1>
          <p className="mb-8 max-w-[520px] text-[0.9375rem] leading-[1.7] text-lsh-grey-300 sm:text-base">
            {uiContent.error.message}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[4px] bg-lsh-gold px-7 text-[0.8125rem] font-semibold text-lsh-black transition-colors duration-200 hover:bg-lsh-gold-hover active:bg-lsh-gold-dark focus-visible:outline-2 focus-visible:outline-lsh-gold-focus focus-visible:outline-offset-2"
            >
              <RefreshCw size={15} strokeWidth={2} aria-hidden="true" />
              {uiContent.error.retry}
            </button>
            <Link
              href="/"
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[4px] border border-white/25 px-7 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-lsh-gold focus-visible:outline-offset-2"
            >
              <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
              {uiContent.error.homeCta}
            </Link>
          </div>

          <p className="mt-7 text-[0.8125rem] leading-relaxed text-lsh-grey-400">
            {uiContent.error.helpPrefix}{" "}
            <a
              href={contact.email.href}
              className="font-medium text-white underline decoration-lsh-gold underline-offset-4 hover:text-lsh-gold"
            >
              {contact.email.display}
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
