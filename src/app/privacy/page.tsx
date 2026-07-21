import type { Metadata } from "next";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { contact } from "@/data/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How London Screen Hire collects, uses and protects personal data when you use our website or request a quote.",
  alternates: { canonical: `${SITE_URL}/privacy` },
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

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mb-10 text-[0.8125rem] text-[var(--lsh-grey-500)]">
              Last updated 21 July 2026
            </p>

            <H2>Who We Are</H2>
            <P>
              London Screen Hire is the controller of the personal data
              described in this notice. You can contact us at{" "}
              <a href={contact.email.href} className={linkClass}>
                {contact.email.display}
              </a>{" "}
              or{" "}
              <a href={contact.phone.href} className={linkClass}>
                {contact.phone.display}
              </a>
              .
            </P>

            <H2>Information We Collect</H2>
            <P>
              When you request a quote, we collect the information entered in
              the form. This may include your name, email address, phone number,
              event type and date, venue, preferred screen size and the event
              details you choose to provide. We do not collect payment details
              through this website.
            </P>
            <P>
              Our hosting and security providers may process technical request
              data, such as IP address, browser information and server logs, to
              deliver and protect the website. If you accept optional analytics,
              we also receive aggregated usage and performance information.
            </P>

            <H2>How and Why We Use Your Information</H2>
            <P>
              We use enquiry information to respond, prepare a quote, discuss
              your requirements and take steps towards a booking at your request.
              We also process information where necessary for our legitimate
              interests in administering enquiries, keeping business records and
              protecting the website from misuse.
            </P>
            <P>
              Optional analytics load only after you accept them. We use the
              resulting aggregated information to understand site performance
              and improve the website. We do not use enquiry details for direct
              marketing unless you give separate permission.
            </P>

            <H2>Services That Process Data for Us</H2>
            <P>
              <strong className="font-semibold text-white">Web3Forms:</strong>{" "}
              quote requests are transmitted through Web3Forms so they can be
              delivered to us. Web3Forms states that submissions are encrypted
              at rest and may be retained for up to three years. Read the{" "}
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Web3Forms privacy policy
              </a>
              .
            </P>
            <P>
              <strong className="font-semibold text-white">
                Vercel Analytics and Speed Insights:
              </strong>{" "}
              if accepted, these tools provide aggregated website usage and
              performance metrics. Vercel states that Analytics does not
              associate data with an IP address and discards its temporary
              session identifier after 24 hours. Read Vercel&apos;s{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Analytics privacy information
              </a>
              .
            </P>

            <H2>International Transfers</H2>
            <P>
              Some suppliers may process data outside the UK. Where this occurs,
              we rely on the supplier&apos;s stated safeguards, such as an adequacy
              decision or approved standard contractual clauses, as applicable.
            </P>

            <H2>Cookies and Local Storage</H2>
            <P>
              We do not use advertising cookies. Your analytics choice is saved
              in your browser&apos;s local storage under the key{" "}
              <code className="text-[0.85em] text-lsh-blue">
                lsh-analytics-consent
              </code>
              . It is used to remember whether optional analytics may load and
              can be removed by clearing this site&apos;s browser data.
            </P>

            <H2>How Long We Keep Information</H2>
            <P>
              We keep enquiry and quote records for as long as reasonably needed
              to respond, manage any resulting booking, resolve disputes and meet
              legal or accounting obligations. Retention depends on whether an
              enquiry becomes a booking and the nature of the correspondence.
              Web3Forms states that it may retain submissions for a maximum of
              three years. We delete or anonymise information when it is no
              longer needed, subject to any legal requirement to retain it.
            </P>

            <H2>Your Rights</H2>
            <P>
              Depending on the circumstances, you may have rights to access,
              correct or erase your personal data, restrict or object to its use,
              and receive a portable copy. You may also withdraw an analytics
              choice by clearing this site&apos;s browser data. These rights are not
              absolute and exemptions may apply. Contact us using the details
              above to make a request.
            </P>
            <P>
              You may complain to the{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Information Commissioner&apos;s Office
              </a>
              . We would appreciate the opportunity to address your concern
              first.
            </P>

            <H2>Required Information and Automated Decisions</H2>
            <P>
              Required form fields are needed so we can assess and respond to
              your enquiry. If they are not provided, we may be unable to prepare
              a quote. We do not use the information submitted through this site
              for automated decision-making or profiling.
            </P>

            <H2>Changes to This Policy</H2>
            <P>
              We may update this notice when our website, suppliers or processing
              activities change. The current version and update date will remain
              available on this page.
            </P>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
