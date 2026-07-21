import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contact } from "@/data/contact";
import ServiceBreadcrumbs from "./service-breadcrumbs";

interface ServiceHeroProps {
  eyebrow: string;
  h1: string;
  shortIntro: string;
  heroImage: string;
  heroAlt: string;
  serviceLabel: string;
}

/**
 * Service page hero - full-width dark hero matching the homepage height and
 * gradient language. Content is left-heavy (≤ 48% wide on desktop) so the
 * background image reads through on the right.
 *
 * Mobile gradient:  strong left-to-right fade + bottom fade so text is legible
 * Desktop gradient: left-heavy, image shows through on the right 40%
 */
export default function ServiceHero({
  eyebrow,
  h1,
  shortIntro,
  heroImage,
  heroAlt,
  serviceLabel,
}: ServiceHeroProps) {
  return (
    <section
      className="relative min-h-0 overflow-hidden bg-lsh-dark sm:min-h-[clamp(480px,60vh,640px)]"
      aria-label="Service overview"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        {/* Mobile overlay: heavy bottom + moderate horizontal fade */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,13,18,0.7) 0%, rgba(10,13,18,0.85) 60%, rgba(10,13,18,0.97) 100%), linear-gradient(to right, rgba(10,13,18,0.9) 0%, rgba(10,13,18,0.4) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Desktop overlay: left-heavy gradient lets image show on right */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(10,13,18,0.96) 0%, rgba(10,13,18,0.88) 38%, rgba(10,13,18,0.60) 62%, rgba(10,13,18,0.28) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content - constrained left column */}
      <div className="lsh-container relative z-10 flex items-center pb-12 pt-[100px] sm:pb-20 sm:pt-[128px] xl:pb-24 xl:pt-[148px]">
        <div className="w-full sm:max-w-[72%] md:max-w-[58%] xl:max-w-[46%]">
          {/* Breadcrumbs */}
          <div className="mb-5">
            <ServiceBreadcrumbs serviceLabel={serviceLabel} />
          </div>

          {/* Eyebrow */}
          <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
            {eyebrow}
          </p>

          {/* H1 */}
          <h1
            className="mb-4 font-heading font-bold uppercase leading-[0.88] tracking-[-0.02em] text-white sm:mb-5"
            style={{ fontSize: "clamp(2.25rem, calc(4.2vw + 1rem), 4.5rem)" }}
          >
            {h1}
          </h1>

          {/* Short intro */}
          <p className="mb-7 max-w-[440px] text-[0.9375rem] leading-[1.65] text-lsh-grey-300 sm:mb-8 sm:text-[1rem]">
            {shortIntro}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
              className="inline-flex items-center justify-center h-[50px] sm:h-[46px] px-7 text-[0.8125rem] font-semibold text-white border border-white/25 rounded-[4px] hover:border-white/40 hover:bg-white/5 transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
