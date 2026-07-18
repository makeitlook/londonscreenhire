/**
 * Privacy Policy page — placeholder content.
 * ⚠️  All legal content below is a placeholder and must be reviewed and
 *     approved by a qualified professional before launch.
 */
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How London Screen Hire collects, uses and protects your personal data when you use our website or request a quote.",
  robots: { index: false, follow: false },
};

// Heading and section helpers keep the page short and readable
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading font-semibold uppercase text-white text-xl tracking-wide mt-10 mb-3">
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.9375rem] text-[var(--lsh-grey-300)] leading-relaxed mb-4">
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="bg-lsh-dark min-h-screen pt-[68px] xl:pt-[78px]"
      >
        <div className="px-4 sm:px-6 md:px-8 xl:px-12 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              Legal
            </p>
            <h1
              className="font-heading font-bold uppercase text-white leading-[0.9] mb-4"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-[0.8125rem] text-[var(--lsh-grey-500)] mb-10">
              Last updated {new Date().getFullYear()}
            </p>

            <H2>Who We Are</H2>
            <P>
              London Screen Hire provides professional LED screen hire and AV
              production services across London and the UK. Our contact details
              are available on the{" "}
              <Link href="/#quote" className="text-lsh-blue hover:underline">
                contact page
              </Link>
              .
            </P>

            <H2>Information We Collect</H2>
            <P>
              When you submit a quote request through our website form, we
              collect your name, email address, phone number, event details,
              venue information, and any additional requirements you provide. We
              do not collect payment information through this website.
            </P>
            <P>
              If you accept our optional analytics notice, we collect anonymous
              usage data such as the page visited, the referring URL, your
              approximate country, and device type. No name, email address, or
              persistent identifier is recorded by this analytics service.
            </P>

            <H2>How We Use Your Information</H2>
            <P>
              We use the information you provide solely to respond to your
              enquiry and to put together a quote for your event. We will not
              use your details for unsolicited marketing without your separate
              consent.
            </P>
            <P>
              Anonymous analytics data is used only to understand how visitors
              use the site so we can improve it. It is not used for advertising,
              profiling, or any form of personalised tracking.
            </P>

            <H2>Third-Party Processors</H2>
            <P>
              <strong className="text-white font-semibold">Web3Forms</strong> —
              Quote requests submitted through this website are transmitted via
              Web3Forms (web3forms.com), a third-party form processing service
              that delivers your enquiry to us by email. Please refer to the{" "}
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lsh-blue hover:underline"
              >
                Web3Forms privacy policy
              </a>{" "}
              for details of how they handle data in transit.
            </P>
            <P>
              <strong className="text-white font-semibold">
                Vercel Analytics &amp; Speed Insights
              </strong>{" "}
              — If you choose to accept analytics, this website uses Vercel
              Analytics and Vercel Speed Insights. These services are cookieless
              and do not store your IP address. They record only aggregated,
              anonymous metrics (page URL, referrer, country, device type, and
              performance timings). Vercel is GDPR-compliant and processes data
              under Standard Contractual Clauses. See the{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lsh-blue hover:underline"
              >
                Vercel privacy policy
              </a>{" "}
              for full details.
            </P>

            <H2>Cookies and Local Storage</H2>
            <P>
              This website does not set any tracking or advertising cookies. If
              you interact with the analytics consent notice, your preference
              (&ldquo;accepted&rdquo; or &ldquo;declined&rdquo;) is saved in
              your browser&apos;s{" "}
              <code className="text-lsh-blue text-[0.85em]">localStorage</code>{" "}
              under the key{" "}
              <code className="text-lsh-blue text-[0.85em]">
                lsh-analytics-consent
              </code>
              . This value is never transmitted to any server. You can clear it
              at any time by clearing your browser&apos;s site data.
            </P>

            <H2>Data Retention</H2>
            <P>
              We retain enquiry data only for as long as is necessary to respond
              to and follow up on your request. Specific retention periods are
              subject to confirmation. To request deletion of your data, please
              contact us directly.
            </P>

            <H2>Your Rights</H2>
            <P>
              Under UK GDPR you have the right to access, correct, or request
              deletion of personal data we hold about you, to restrict or object
              to processing, and to data portability. To exercise these rights,
              please contact us using the details on our{" "}
              <Link href="/#quote" className="text-lsh-blue hover:underline">
                contact page
              </Link>
              . You also have the right to lodge a complaint with the{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lsh-blue hover:underline"
              >
                Information Commissioner&apos;s Office (ICO)
              </a>
              .
            </P>

            <H2>Changes to This Policy</H2>
            <P>
              We may update this policy from time to time. The current version
              will always be available on this page.
            </P>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
