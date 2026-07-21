import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="bg-lsh-dark min-h-screen flex flex-col items-center justify-center pt-[68px] xl:pt-[78px] px-4 sm:px-6 text-center"
      >
        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
          Error 404
        </p>
        <h1
          className="font-heading font-bold uppercase text-white leading-[0.9] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Page Not Found
        </h1>
        <p className="text-[0.9375rem] text-[var(--lsh-grey-300)] leading-relaxed mb-8 max-w-[400px]">
          The page you&rsquo;re looking for doesn&rsquo;t exist. It may have
          been moved or the URL may be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-[44px] px-7 text-[0.8125rem] font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-[var(--lsh-blue-hover)] active:bg-[var(--lsh-blue-dark)] transition-colors duration-200"
        >
          Back to Homepage
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
