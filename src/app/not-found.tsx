import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import uiContent from "@/content/ui.json";

export const metadata: Metadata = {
  title: uiContent.notFound.metadataTitle,
  description: uiContent.notFound.metadataDescription,
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="bg-lsh-dark min-h-screen flex flex-col items-center justify-center pt-[76px] xl:pt-[86px] px-4 sm:px-6 text-center"
      >
        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
          {uiContent.notFound.eyebrow}
        </p>
        <h1
          className="font-heading font-bold uppercase text-white leading-[0.9] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          {uiContent.notFound.heading}
        </h1>
        <p className="text-[0.9375rem] text-[var(--lsh-grey-300)] leading-relaxed mb-8 max-w-[400px]">
          {uiContent.notFound.message}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-[44px] px-7 text-[0.8125rem] font-semibold text-lsh-black bg-lsh-gold rounded-[4px] hover:bg-[var(--lsh-gold-hover)] active:bg-[var(--lsh-gold-dark)] transition-colors duration-200"
        >
          {uiContent.notFound.homeCta}
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
