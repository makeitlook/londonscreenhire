"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Phone, MessageCircle, ChevronDown } from "lucide-react";
import SiteLogo from "@/components/shared/site-logo";
import navigationContent from "@/content/navigation.json";
import siteContent from "@/content/site.json";
import { contact } from "@/data/contact";
import { socialLinks } from "@/data/footer";
import { services } from "@/data/services";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const { header: headerContent } = navigationContent;
const [screenServices, productionServices] = headerContent.serviceGroups;
const NAV_ITEMS = headerContent.links;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [servicesOpen]);

  const openServicesAndFocusFirstLink = () => {
    setServicesOpen(true);
    requestAnimationFrame(() => {
      servicesRef.current
        ?.querySelector<HTMLAnchorElement>("[data-service-link]")
        ?.focus();
    });
  };

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-[3px] bg-lsh-gold px-4 py-3 text-sm font-semibold text-lsh-black shadow-lg transition-transform focus:translate-y-0"
      >
        {headerContent.skipLink}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-lsh-dark border-b border-[var(--lsh-border-dark)]"
            : "bg-lsh-dark/95 border-b border-transparent"
        }`}
      >
      {/*
       * Padding system - consistent across header / hero / services:
       *   320–639px  → 16px  (px-4)
       *   640–767px  → 24px  (sm:px-6)
       *   768–1279px → 32px  (md:px-8)
       *   1280px+    → 48px  (xl:px-12)
       */}
      <div className="lsh-container">
        {/*
         * Three-column grid keeps the nav truly centred regardless of
         * logo / CTA width differences.
         * h-[76px] on mobile, h-[86px] on desktop (xl).
         */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-[76px] xl:h-[86px]">
          {/* ── Logo - always left ── */}
          <Link
            href="/"
            aria-label={siteContent.logo.homeAriaLabel}
            className="shrink-0"
          >
            <SiteLogo />
          </Link>

          {/* ── Desktop navigation - centred in the middle column, xl+ only ── */}
          <nav
            className="hidden xl:flex items-center justify-center gap-7"
            aria-label={headerContent.mainNavAriaLabel}
          >
            {/* Home */}
            <Link
              href="/#home"
              className="text-[0.8125rem] font-medium tracking-wide text-lsh-grey-300 hover:text-lsh-white transition-colors duration-200"
            >
              {headerContent.homeLabel}
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              ref={servicesRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setServicesOpen(false);
                }
              }}
            >
              <button
                ref={servicesButtonRef}
                aria-expanded={servicesOpen}
                aria-controls="desktop-services-navigation"
                onClick={() => setServicesOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    openServicesAndFocusFirstLink();
                  }
                }}
                className="flex items-center gap-1 text-[0.8125rem] font-medium tracking-wide text-lsh-grey-300 hover:text-lsh-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-lsh-gold focus-visible:outline-offset-2 rounded-[2px]"
              >
                {headerContent.servicesLabel}
                <ChevronDown
                  size={13}
                  strokeWidth={1.75}
                  className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {servicesOpen && (
                <div
                  id="desktop-services-navigation"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[660px] bg-lsh-charcoal border border-[var(--lsh-border-dark)] rounded-[4px] shadow-xl z-50 p-5"
                >
                  <div className="grid grid-cols-2 gap-x-6">
                    {/* ── LED Screens group ── */}
                    <div>
                      <p className="mb-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-lsh-grey-500">
                        {screenServices.label}
                      </p>
                      {services
                        .filter((s) =>
                          screenServices.slugs.includes(s.slug),
                        )
                        .map((service) => (
                          <Link
                            key={service.slug}
                            href={`/${service.slug}`}
                            data-service-link
                            onClick={() => setServicesOpen(false)}
                            className="flex flex-col px-2 py-2 rounded-[3px] hover:bg-lsh-charcoal-light transition-colors duration-200 group"
                          >
                            <span className="text-[0.8125rem] font-medium text-lsh-grey-300 group-hover:text-white transition-colors duration-200">
                              {service.navLabel}
                            </span>
                          </Link>
                        ))}
                    </div>

                    {/* ── Event Production group ── */}
                    <div>
                      <p className="mb-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-lsh-grey-500">
                        {productionServices.label}
                      </p>
                      {services
                        .filter((s) =>
                          productionServices.slugs.includes(s.slug),
                        )
                        .map((service) => (
                          <Link
                            key={service.slug}
                            href={`/${service.slug}`}
                            data-service-link
                            onClick={() => setServicesOpen(false)}
                            className="flex flex-col px-2 py-2 rounded-[3px] hover:bg-lsh-charcoal-light transition-colors duration-200 group"
                          >
                            <span className="text-[0.8125rem] font-medium text-lsh-grey-300 group-hover:text-white transition-colors duration-200">
                              {service.navLabel}
                            </span>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining nav items */}
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[0.8125rem] font-medium tracking-wide text-lsh-grey-300 hover:text-lsh-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Middle column spacer on mobile / tablet (keeps grid stable) */}
          <span className="xl:hidden" aria-hidden="true" />

          {/* ── Right column - adapts per breakpoint ── */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Desktop CTA - xl+ only */}
            <Link
              href="/#quote"
              className="hidden xl:inline-flex items-center justify-center h-[44px] px-6 text-[0.8125rem] font-semibold text-lsh-black bg-lsh-gold rounded-[4px] hover:bg-lsh-gold-hover active:bg-lsh-gold-dark transition-colors duration-200 shrink-0"
            >
              {headerContent.quoteCta}
            </Link>

            {/* Compact quote - sm to lg only (640–1279px) */}
            <Link
              href="/#quote"
              className="hidden sm:inline-flex xl:hidden items-center justify-center h-9 px-4 text-xs font-semibold text-lsh-black bg-lsh-gold rounded-[4px] hover:bg-lsh-gold-hover transition-colors duration-200 shrink-0"
            >
              {headerContent.quoteCta}
            </Link>

            {/* Hamburger - hidden on xl+ */}
            <Sheet
              open={menuOpen}
              onOpenChange={(open) => {
                setMenuOpen(open);
                if (!open) setMobileServicesOpen(false);
              }}
            >
              <SheetTrigger asChild>
                {/* 44×44px touch target */}
                <button
                  aria-label={headerContent.openMenuAriaLabel}
                  className="xl:hidden flex items-center justify-center h-11 w-11 -mr-2 text-white hover:text-lsh-grey-300 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-lsh-gold"
                >
                  <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </SheetTrigger>

              <SheetContent
                side={"right" as const}
                className="w-[300px] p-0 bg-lsh-charcoal border-l border-[var(--lsh-border-dark)]"
              >
                <SheetTitle className="sr-only">
                  {headerContent.menuTitle}
                </SheetTitle>

                <div className="flex flex-col h-full">
                  {/* Sheet header */}
                  <div className="flex items-center px-5 h-[76px] border-b border-[var(--lsh-border-dark)] shrink-0">
                    <SiteLogo />
                  </div>

                  {/* Sheet navigation links */}
                  <nav
                    className="flex flex-col px-3 pt-3 pb-1 gap-0.5 flex-1 overflow-y-auto"
                    aria-label={headerContent.mobileNavAriaLabel}
                  >
                    {/* Home */}
                    <Link
                      href="/#home"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center py-3 px-3 text-[0.9375rem] font-medium text-lsh-grey-300 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                    >
                      {headerContent.homeLabel}
                    </Link>

                    {/* Services accordion */}
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                        className="flex items-center justify-between w-full py-3 px-3 text-[0.9375rem] font-medium text-lsh-grey-300 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                      >
                        {headerContent.servicesLabel}
                        <ChevronDown
                          size={15}
                          strokeWidth={1.75}
                          className={`text-lsh-gold transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      {mobileServicesOpen && (
                        <div className="mt-0.5 ml-3 border-l border-[var(--lsh-border-dark)] pl-3">
                          {/* LED Screens group */}
                          <p className="px-2 pt-2 pb-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-lsh-grey-500">
                            {screenServices.label}
                          </p>
                          {services
                            .filter((s) =>
                              screenServices.slugs.includes(s.slug),
                            )
                            .map((service) => (
                              <Link
                                key={service.slug}
                                href={`/${service.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center py-2 px-2 text-[0.875rem] font-medium text-lsh-grey-300 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[3px] transition-colors duration-200"
                              >
                                {service.navLabel}
                              </Link>
                            ))}

                          {/* Event Production group */}
                          <p className="px-2 pt-3 pb-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-lsh-grey-500">
                            {productionServices.label}
                          </p>
                          {services
                            .filter((s) =>
                              productionServices.slugs.includes(s.slug),
                            )
                            .map((service) => (
                              <Link
                                key={service.slug}
                                href={`/${service.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center py-2 px-2 text-[0.875rem] font-medium text-lsh-grey-300 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[3px] transition-colors duration-200"
                              >
                                {service.navLabel}
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Remaining items */}
                    <div className="mt-1">
                      {NAV_ITEMS.map(({ label, href }) => (
                        <Link
                          key={label}
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center py-3 px-3 text-[0.9375rem] font-medium text-lsh-grey-300 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Contact shortcuts - driven by src/data/contact.ts */}
                  <div className="px-3 pb-3 flex flex-col gap-1">
                    <a
                      href={contact.phone.href}
                      aria-label={contact.phone.ariaLabel}
                      className="flex items-center gap-3 py-3 px-3 text-[0.875rem] font-medium text-lsh-grey-400 hover:text-lsh-white hover:bg-lsh-charcoal-light rounded-[4px] transition-colors duration-200"
                    >
                      <Phone
                        size={16}
                        strokeWidth={1.5}
                        className="text-lsh-gold shrink-0"
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
                          className="text-lsh-gold shrink-0"
                          aria-hidden="true"
                        />
                        {contact.whatsapp.display}
                      </a>
                    )}
                  </div>

                  {/* Sheet footer CTA */}
                  <div className="p-4 border-t border-[var(--lsh-border-dark)] shrink-0 flex items-center gap-3">
                    <Link
                      href="/#quote"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 flex items-center justify-center h-11 text-[0.9375rem] font-semibold text-lsh-black bg-lsh-gold rounded-[4px] hover:bg-lsh-gold-hover transition-colors duration-200"
                    >
                      {headerContent.quoteCta}
                    </Link>
                    {socialLinks
                      .filter(
                        (s) =>
                          s.icon === "instagram" && !s.placeholder && s.href,
                      )
                      .map((s) => (
                        <a
                          key={s.icon}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={headerContent.instagramAriaLabel}
                          className="flex items-center justify-center h-11 w-11 shrink-0 rounded-[4px] border border-[var(--lsh-border-dark)] text-[var(--lsh-grey-400)] hover:border-lsh-gold hover:text-white transition-colors duration-200"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            />
                            <circle cx="12" cy="12" r="4" />
                            <circle
                              cx="17.5"
                              cy="6.5"
                              r="0.5"
                              fill="currentColor"
                              stroke="none"
                            />
                          </svg>
                        </a>
                      ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </header>
    </>
  );
}
