import type { Metadata } from "next";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import legalContent from "@/content/legal.json";
import { contact } from "@/data/contact";
import { SITE_URL } from "@/lib/site";

const content = legalContent.terms;

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: false, follow: false },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-3 font-heading text-xl font-semibold uppercase tracking-wide text-white">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[0.9375rem] leading-relaxed text-[var(--lsh-grey-300)]">
      {children}
    </p>
  );
}

const linkClass = "text-lsh-gold hover:underline";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="min-h-screen bg-lsh-dark pt-[76px] xl:pt-[86px]"
      >
        <div className="lsh-container py-16 md:py-20">
          <article className="max-w-3xl">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
              {legalContent.eyebrow}
            </p>
            <h1
              className="mb-4 font-heading font-bold uppercase leading-[0.9] text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
            >
              {content.heading}
            </h1>
            <p className="mb-10 text-[0.8125rem] text-[var(--lsh-grey-500)]">
              {content.lastUpdated}
            </p>

            <H2>{content.about.heading}</H2>
            <P>
              {content.about.prefix}{" "}
              <a href={contact.email.href} className={linkClass}>
                {contact.email.display}
              </a>{" "}
              {content.about.connector}{" "}
              <a href={contact.phone.href} className={linkClass}>
                {contact.phone.display}
              </a>
              .
            </P>

            {content.sections.map((section) => (
              <section key={section.heading}>
                <H2>{section.heading}</H2>
                {section.paragraphs.map((paragraph) => (
                  <P key={paragraph}>{paragraph}</P>
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
