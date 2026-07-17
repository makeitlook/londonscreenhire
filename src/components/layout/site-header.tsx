"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone, MessageCircle } from "lucide-react";
import SiteLogo from "@/components/shared/site-logo";
import { contact } from "@/data/contact";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Screens", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#quote" },
] as const;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-lsh-dark border-b border-[var(--lsh-border-dark)]"
          : "bg-lsh-dark/95 border-b border-transparent"
      }`}
    >
      {/*
       * Padding system — consistent across header / hero / services:
       *   320–639px  → 16px  (px-4)
       *   640–767px  → 24px  (sm:px-6)
       *   768–1279px → 32px  (md:px-8)
       *   1280px+    → 48px  (xl:px-12)
       */}
      <div className="w-full px-4 sm:px-6 md:px-8 xl:px-12">
        {/*
         * Three-column grid keeps the nav truly centred regardless of
         * logo / CTA width differences.
         * h-[68px] on mobile, h-[78px] on desktop (xl).
         */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-[68px] xl:h-[78px]">
          {/* ── Logo — always left ── */}
          <Link
            href="/"
            aria-label="London Screen Hire — return to homepage"
            className="shrink-0"
          >
            <SiteLogo />
          </Link>

          {/* ── Desktop navigation — centred in the middle column, xl+ only ── */}
          <nav
            className="hidden xl:flex items-center justify-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[0.8125rem] font-medium tracking-wide text-lsh-grey-300 hover:text-lsh-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Middle column spacer on mobile / tablet (keeps grid stable) */}
          <span className="xl:hidden" aria-hidden="true" />

          {/* ── Right column — adapts per breakpoint ── */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Desktop CTA — xl+ only */}
            <Link
              href="/#quote"
              className="hidden xl:inline-flex items-center justify-center h-[44px] px-6 text-[0.8125rem] font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-lsh-blue-hover active:bg-lsh-blue-dark transition-colors duration-200 shrink-0"
            >
              Get a Quote
            </Link>

            {/* Compact quote — sm to lg only (640–1279px) */}
            <Link
              href="/#quote"
              className="hidden sm:inline-flex xl:hidden items-center justify-center h-9 px-4 text-xs font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-lsh-blue-hover transition-colors duration-200 shrink-0"
            >
              Get a Quote
            </Link>

            {/* Hamburger — hidden on xl+ */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                {/* 44×44px touch target */}
                <button
                  aria-label="Open navigation menu"
                  className="xl:hidden flex items-center justify-center h-11 w-11 -mr-2 text-white hover:text-lsh-grey-300 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-lsh-blue"
                >
                  <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </SheetTrigger>

              <SheetContent
                side={"right" as const}
                className="w-[300px] p-0 bg-lsh-charcoal border-l border-[var(--lsh-border-dark)]"
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>

                <div className="flex flex-col h-full">
                  {/* Sheet header */}
                  <div className="flex items-center px-5 h-[68px] border-b border-[var(--lsh-border-dark)] shrink-0">
                    <SiteLogo />
                  </div>

                  {/* Sheet navigation links */}
                  <nav
                    className="flex flex-col px-3 pt-3 pb-1 gap-0.5 flex-1 overflow-y-auto"
                    aria-label="Mobile navigation"
                  >
                    {NAV_ITEMS.map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center py-3 px-3 text-[0.9375rem] font-medium text-lsh-grey-300 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                      >
                        {label}
                      </a>
                    ))}
                  </nav>

                  {/* Contact shortcuts — driven by src/data/contact.ts */}
                  <div className="px-3 pb-3 flex flex-col gap-1">
                    <a
                      href={contact.phone.href}
                      aria-label={contact.phone.ariaLabel}
                      className="flex items-center gap-3 py-3 px-3 text-[0.875rem] font-medium text-lsh-grey-400 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                    >
                      <Phone
                        size={16}
                        strokeWidth={1.5}
                        className="text-lsh-blue shrink-0"
                        aria-hidden="true"
                      />
                      {contact.phone.display}
                    </a>
                    {contact.whatsapp && (
                      <a
                        href={contact.whatsapp.href}
                        aria-label={contact.whatsapp.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 py-3 px-3 text-[0.875rem] font-medium text-lsh-grey-400 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                      >
                        <MessageCircle
                          size={16}
                          strokeWidth={1.5}
                          className="text-lsh-blue shrink-0"
                          aria-hidden="true"
                        />
                        {contact.whatsapp.display}
                      </a>
                    )}
                  </div>

                  {/* Sheet footer CTA */}
                  <div className="p-4 border-t border-[var(--lsh-border-dark)] shrink-0">
                    <Link
                      href="/#quote"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center w-full h-11 text-[0.9375rem] font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-lsh-blue-hover transition-colors duration-200"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
