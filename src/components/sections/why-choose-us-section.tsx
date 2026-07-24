import Link from "next/link";
import { ArrowRight } from "lucide-react";
import homeContent from "@/content/home.json";
import { benefits } from "@/data/benefits";
import { FadeIn } from "@/components/shared/fade-in";

/**
 * WhyChooseUsSection - server component.
 *
 * Dark navy section immediately after the off-white Projects section.
 * Desktop (xl+): two-column flex - left content (~36%) + right 3×2 card grid.
 * Tablet (md–xl): left content full-width above, cards below in 2-col (md) / 3-col (lg).
 * Mobile (<md): stacked; cards 2-col from base (≥340px), 1-col only at very narrow (< xs).
 */
export default function WhyChooseUsSection() {
  return (
    <section
      id="about"
      /*
       * Vertical padding - compact, matching mockup density.
       * Mobile:  pt-12 pb-12  (48px)
       * md:      pt-16 pb-16  (64px)
       * xl:      pt-20 pb-20  (80px)
       */
      className="bg-lsh-dark pt-12 pb-12 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[76px] xl:scroll-mt-[86px]"
      aria-labelledby="why-choose-heading"
    >
      <div className="lsh-container">
        {/*
         * Two-column split on xl+.
         * Left: xl:w-[36%], vertically centred against card grid.
         * Right: flex-1, 3×2 card grid.
         * Column gap: xl:gap-14 (56px).
         * Stack on mobile/tablet with mb-8 (32px) separation.
         */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:gap-14">
          {/* ── Left content block ── */}
          <FadeIn className="xl:w-[36%] xl:shrink-0 mb-8 md:mb-10 xl:mb-0">
            {/* Eyebrow */}
            <p className="mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
              {homeContent.whyChoose.eyebrow}
            </p>

            {/*
             * Heading clamp targets:
             *   320px → ~36px   390px → ~40px
             *   768px → ~47px  1280px → ~54px
             * Formula: clamp(2.25rem, calc(3vw + 1rem), 3.375rem)
             */}
            <h2
              id="why-choose-heading"
              className="font-heading font-bold uppercase leading-[0.88] tracking-[-0.01em] text-white mb-4"
              style={{ fontSize: "clamp(2.25rem, calc(3vw + 1rem), 3.375rem)" }}
            >
              {homeContent.whyChoose.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {/* Supporting copy */}
            <p className="text-[0.9rem] leading-[1.65] text-lsh-grey-300 mb-6 max-w-[460px]">
              {homeContent.whyChoose.description}
            </p>

            {/* CTA - drives to the quote form */}
            <Link
              href="/#quote"
              className="inline-flex items-center gap-2 h-[44px] px-6 text-[0.8125rem] font-semibold text-lsh-black bg-lsh-gold rounded-[4px] hover:bg-lsh-gold-hover active:bg-lsh-gold-dark transition-colors duration-200"
            >
              {homeContent.whyChoose.cta}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </FadeIn>

          {/* ── Benefit card grid ── */}
          {/*
           * Grid progression:
           *   base (≥340px):  2-col
           *   xs  (<340px):   1-col  (handled via min-w-0 + natural reflow)
           *   md  (768px+):   2-col
           *   lg  (1024px+):  3-col
           *   xl  (1280px+):  3-col (right side of desktop split)
           * Gap: 2 (8px) - panel feel, not loose cards
           */}
          <FadeIn className="xl:flex-1">
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2" role="list">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <li key={benefit.title} className="min-w-0">
                    <article
                      className="flex flex-col items-center text-center h-full bg-lsh-charcoal border border-[var(--lsh-border-dark)] rounded-[3px] transition-colors duration-200 hover:bg-lsh-charcoal-light hover:border-white/20
                    p-[18px] sm:p-5 xl:p-6"
                    >
                      <Icon
                        size={28}
                        strokeWidth={1.4}
                        className="text-lsh-gold mb-2.5 shrink-0 sm:mb-3"
                        aria-hidden="true"
                      />
                      <h3 className="font-heading font-bold uppercase tracking-wide text-white text-[0.8125rem] sm:text-[0.875rem] xl:text-[0.9375rem] leading-snug mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-[0.75rem] sm:text-[0.8125rem] xl:text-[0.875rem] leading-[1.5] text-lsh-grey-300">
                        {benefit.description}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
