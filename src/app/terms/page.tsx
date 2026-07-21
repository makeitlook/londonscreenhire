import type { Metadata } from "next";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { contact } from "@/data/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description:
    "Terms governing use of the London Screen Hire website and its quote request service.",
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

const linkClass = "text-lsh-blue hover:underline";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="min-h-screen bg-lsh-dark pt-[68px] xl:pt-[78px]"
      >
        <div className="lsh-container py-16 md:py-20">
          <article className="max-w-3xl">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              Legal
            </p>
            <h1
              className="mb-4 font-heading font-bold uppercase leading-[0.9] text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
            >
              Website Terms of Use
            </h1>
            <p className="mb-10 text-[0.8125rem] text-[var(--lsh-grey-500)]">
              Last updated 21 July 2026
            </p>

            <H2>About These Terms</H2>
            <P>
              These terms apply when you use the London Screen Hire website.
              They cover the website and its enquiry service; they are not the
              hire terms for an event booking. Questions can be sent to{" "}
              <a href={contact.email.href} className={linkClass}>
                {contact.email.display}
              </a>{" "}
              or discussed on{" "}
              <a href={contact.phone.href} className={linkClass}>
                {contact.phone.display}
              </a>
              .
            </P>

            <H2>Website Information</H2>
            <P>
              Service pages provide general information and examples. The
              equipment, crew, timings, delivery area, technical specification
              and services included in a booking will be set out in the relevant
              written quote or booking documents.
            </P>

            <H2>Enquiries, Quotes and Bookings</H2>
            <P>
              Sending an enquiry does not create a booking or require either
              party to proceed. Quotes are subject to availability and may have
              an expiry date. A booking is confirmed only when the written quote
              has been accepted and any stated booking requirements, such as a
              deposit or signed hire terms, have been completed.
            </P>

            <H2>Availability and Changes</H2>
            <P>
              We may update, suspend or withdraw parts of the website without
              notice. We cannot guarantee uninterrupted access, and equipment or
              crew shown on the site may not be available for every date or
              venue.
            </P>

            <H2>Acceptable Use</H2>
            <P>
              You must not misuse the website, attempt unauthorised access,
              introduce malicious code, interfere with its operation, submit
              unlawful material or use the enquiry form to send spam or abusive
              content.
            </P>

            <H2>Intellectual Property</H2>
            <P>
              Unless stated otherwise, the text, branding, layout and original
              media on this website belong to London Screen Hire or are used with
              permission. You may view the site for your own lawful use, but may
              not reproduce or commercially exploit its content without prior
              written permission.
            </P>

            <H2>Third-Party Links</H2>
            <P>
              Links to third-party websites are provided for convenience. We do
              not control those websites and are not responsible for their
              content, availability or privacy practices.
            </P>

            <H2>Liability</H2>
            <P>
              Nothing in these terms excludes or limits liability where doing so
              would be unlawful, including liability for death or personal
              injury caused by negligence, or for fraud. To the extent permitted
              by law, we are not responsible for loss caused solely by temporary
              website unavailability or reasonable reliance on general website
              information instead of an agreed written quote. Liability relating
              to a confirmed booking is governed by the applicable booking
              documents and mandatory law.
            </P>

            <H2>Governing Law</H2>
            <P>
              These website terms are governed by the laws of England and Wales.
              The courts of England and Wales will have jurisdiction, although
              consumers keep any mandatory rights to bring a claim in another
              part of the UK where applicable.
            </P>

            <H2>Changes to These Terms</H2>
            <P>
              We may revise these terms when the website or relevant law changes.
              The current version and update date will remain available on this
              page.
            </P>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
