/**
 * Terms and Conditions page — placeholder content.
 * ⚠️  All legal content below is a placeholder and must be reviewed and
 *     approved by a qualified professional before launch.
 */
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the hire of screens and AV equipment from London Screen Hire.",
  robots: { index: false, follow: false },
};

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

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-[0.8125rem] text-[var(--lsh-grey-500)] mb-10">
              Last updated {new Date().getFullYear()}
            </p>

            <H2>Use of This Website</H2>
            <P>
              By accessing this website you agree to these terms. This website
              is operated by London Screen Hire and is intended for
              informational purposes and enquiry submissions only.
            </P>

            <H2>Quote Requests</H2>
            <P>
              Submitting a quote request through this website does not
              constitute a confirmed booking or contract. All quotations are
              subject to availability and agreement of specific terms at the
              time of booking.
            </P>

            <H2>Service Availability</H2>
            <P>
              Equipment and crew availability is subject to confirmation at the
              time of enquiry. London Screen Hire reserves the right to decline
              or refer enquiries at its discretion.
            </P>

            <H2>Accuracy of Content</H2>
            <P>
              We endeavour to keep the information on this website accurate and
              up to date. However, we make no warranties regarding the
              completeness or accuracy of any content and reserve the right to
              update it at any time.
            </P>

            <H2>Limitation of Liability</H2>
            {/* ⚠️ Liability wording requires review by a qualified legal professional before launch. */}
            <P>
              To the fullest extent permitted by law, London Screen Hire shall
              not be liable for any indirect or consequential loss arising from
              use of this website or reliance on its content. This clause is
              subject to legal review before publication.
            </P>

            <H2>Intellectual Property</H2>
            <P>
              All content on this website, including text, images, and design,
              is the property of London Screen Hire or its licensors. You may
              not reproduce or distribute any content without prior written
              permission.
            </P>

            <H2>Governing Law</H2>
            <P>
              These terms are governed by the laws of England and Wales. Any
              disputes shall be subject to the exclusive jurisdiction of the
              courts of England and Wales.
            </P>

            <H2>Changes to These Terms</H2>
            <P>
              We may update these terms at any time. The current version will
              always be available on this page.
            </P>

            <H2>Contact</H2>
            <P>
              If you have any questions about these terms, please contact us via
              the{" "}
              <Link href="/#quote" className="text-lsh-blue hover:underline">
                contact page
              </Link>
              .
            </P>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
