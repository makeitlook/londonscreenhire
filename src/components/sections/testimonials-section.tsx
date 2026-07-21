import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { FadeIn } from "@/components/shared/fade-in";

/**
 * TestimonialsSection - server component.
 *
 * Off-white section attaching directly beneath the blue statistics strip.
 * Desktop (lg+):  3-col grid, one row.
 * Tablet (sm–lg): 2-col grid, third card in col-1 of second row.
 * Mobile (<sm):   Native horizontal scroll with snap, ~86vw cards.
 * Pagination:     Decorative dots, first dot blue, rest grey. aria-hidden.
 */
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      /*
       * Bottom padding:
       *   Mobile (<sm): pb-10 - space for dots beneath scroll row
       *   sm+:          pb-14 - dots hidden, slightly tighter
       *   md+:          pb-16
       *   xl+:          pb-20
       */
      className="bg-lsh-off-white pt-14 pb-10 sm:pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[68px] xl:scroll-mt-[78px]"
      aria-labelledby="testimonials-heading"
    >
      <div className="lsh-container">
        {/* ── Heading block ── */}
        <FadeIn>
          <div className="flex flex-col items-center mb-8 md:mb-10">
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              What Our Clients Say
            </p>
            <h2
              id="testimonials-heading"
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-lsh-dark text-center mb-2.5"
              style={{
                fontSize: "clamp(2.125rem, calc(2.5vw + 1.125rem), 3.25rem)",
              }}
            >
              What Our Clients Say
            </h2>
            <span
              className="block bg-lsh-blue rounded-sm"
              style={{ width: "40px", height: "2px" }}
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        {/* A single list becomes a snap row on mobile and a grid at sm+ so
         * testimonial copy is not duplicated in the rendered document. */}
        <FadeIn>
          <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            <ul className="flex w-max snap-x snap-mandatory gap-4 pr-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:pr-0 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li
                  key={t.name}
                  className="w-[86vw] shrink-0 snap-start sm:w-auto"
                >
                  <TestimonialCard testimonial={t} />
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/*
         * Pagination dots - decorative scroll cue, mobile only.
         * Visible:  < sm (640px) where horizontal scroll is active.
         * Hidden:   sm+ where all three cards are visible in the grid.
         */}
        <div
          className="sm:hidden flex items-center justify-center gap-2 mt-6"
          aria-hidden="true"
        >
          <span className="block w-2 h-2 rounded-full bg-lsh-blue" />
          <span className="block w-2 h-2 rounded-full bg-lsh-grey-300" />
          <span className="block w-2 h-2 rounded-full bg-lsh-grey-300" />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <blockquote className="flex flex-col h-full bg-white border border-[var(--lsh-border-light)] rounded-[4px] shadow-[0_1px_4px_rgba(5,7,10,0.07)] p-6 xl:p-7">
      {/* Opening quote icon */}
      <Quote
        size={24}
        strokeWidth={1.5}
        className="text-lsh-blue mb-4 shrink-0"
        aria-hidden="true"
      />

      {/* Quote body - grows to push identity block down */}
      <p className="flex-1 text-[0.9rem] leading-[1.7] text-lsh-grey-700 mb-6">
        {testimonial.quote}
      </p>

      {/* Identity block */}
      <footer className="flex items-center gap-3">
        {/* Avatar initial */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-lsh-dark text-white text-[0.875rem] font-bold shrink-0"
          aria-hidden="true"
        >
          {testimonial.initial}
        </div>
        <div>
          <p className="text-[0.875rem] font-semibold text-lsh-dark leading-snug">
            {testimonial.name}
          </p>
          <p className="text-[0.75rem] text-lsh-grey-500 leading-snug">
            {testimonial.role}
          </p>
        </div>
      </footer>
    </blockquote>
  );
}
