import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { contact } from "@/data/contact";

interface ServiceQuoteCtaProps {
  /** Service-specific CTA heading from the data file. */
  ctaHeading: string;
  image: string;
  imageAlt: string;
}

/**
 * Quote CTA - full-width two-column band at the bottom of every service page.
 * Left (55%): ctaHeading, supporting copy, primary + phone buttons.
 * Right (38%): service-specific production photography, stacked below on mobile.
 * Controlled height via min-height so it feels substantial without being tall.
 */
export default function ServiceQuoteCta({
  ctaHeading,
  image,
  imageAlt,
}: ServiceQuoteCtaProps) {
  return (
    <section
      id="service-quote"
      className="bg-lsh-charcoal border-t border-[var(--lsh-border-dark)] overflow-hidden"
      aria-labelledby="service-cta-heading"
    >
      <div className="flex flex-col xl:flex-row xl:min-h-[340px]">
        {/* ── Left: content ── */}
        <div className="flex-1 flex items-center px-6 sm:px-8 xl:px-12 py-14 sm:py-16 xl:py-20">
          <div>
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              Get in Touch
            </p>
            <h2
              id="service-cta-heading"
              className="font-heading font-bold uppercase text-white leading-[0.88] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(2rem, calc(3vw + 1rem), 3.5rem)" }}
            >
              {ctaHeading}
            </h2>
            <p className="text-[0.9375rem] leading-[1.65] text-lsh-grey-300 mb-8 max-w-[480px]">
              Tell us about your event and we&rsquo;ll put together a tailored
              proposal with no obligation. We respond promptly to all enquiries.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 h-[50px] sm:h-[46px] px-7 text-[0.8125rem] font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-lsh-blue-hover active:bg-lsh-blue-dark transition-colors duration-200"
              >
                Get a Quote
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
              <a
                href={contact.phone.href}
                aria-label={contact.phone.ariaLabel}
                className="inline-flex items-center justify-center gap-2 h-[50px] sm:h-[46px] px-7 text-[0.8125rem] font-semibold text-lsh-grey-300 border border-[var(--lsh-border-dark)] rounded-[4px] hover:text-white hover:border-white/30 transition-colors duration-200"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
                {contact.phone.display}
              </a>
            </div>
          </div>
        </div>

        {/* ── Right: service-specific production image ── */}
        <div className="relative h-[240px] sm:h-[300px] xl:h-auto xl:w-[38%] xl:shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1279px) 100vw, 38vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-lsh-blue/15" aria-hidden="true" />
          <div
            className="absolute inset-0 hidden xl:block"
            style={{
              background:
                "linear-gradient(to right, rgba(23,26,31,0.68), transparent 42%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
