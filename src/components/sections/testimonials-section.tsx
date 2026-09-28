"use client";

import { useRef, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import homeContent from "@/content/home.json";
import { testimonials } from "@/data/testimonials";
import { FadeIn } from "@/components/shared/fade-in";

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    const el = scrollRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    let animationFrameId: number;
    let isHovered = false;

    const scrollStep = () => {
      if (!isHovered && el) {
        el.scrollLeft += 1;
        // Reset scroll if reached the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => (isHovered = false);

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section
      id="testimonials"
      className="bg-lsh-off-white pt-14 pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[76px] xl:scroll-mt-[86px]"
      aria-labelledby="testimonials-heading"
    >
      <div className="lsh-container">
        <FadeIn>
          <div className="flex flex-col items-center mb-8 md:mb-10">
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold-ink">
              {homeContent.testimonials.eyebrow}
            </p>
            <h2
              id="testimonials-heading"
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-lsh-dark text-center mb-2.5"
              style={{
                fontSize: "clamp(2.125rem, calc(2.5vw + 1.125rem), 3.25rem)",
              }}
            >
              {homeContent.testimonials.heading}
            </h2>
            <span
              className="block bg-lsh-gold rounded-sm"
              style={{ width: "40px", height: "2px" }}
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="relative group" ref={containerRef}>
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md hover:bg-white text-lsh-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-lsh-gold"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Scrollable Container */}
            <div className="-mx-4 sm:mx-0 overflow-hidden px-4 pb-4 sm:px-0 sm:pb-0">
              <ul
                ref={scrollRef}
                className="flex w-full gap-4 px-4 sm:px-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                role="list"
              >
                {testimonials.map((t, idx) => (
                  <li
                    key={t.name + idx}
                    className="w-[86vw] sm:w-[350px] md:w-[380px] shrink-0"
                  >
                    <TestimonialCard testimonial={t} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md hover:bg-white text-lsh-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-lsh-gold"
              aria-label="Scroll Right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </FadeIn>
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
    <blockquote className="flex flex-col h-full bg-white border border-[var(--lsh-border-light)] rounded-[4px] shadow-[0_1px_4px_rgba(5,7,10,0.07)] p-6 xl:p-7 transition-transform duration-300 hover:-translate-y-1">
      <Quote
        size={24}
        strokeWidth={1.5}
        className="text-lsh-gold-ink mb-4 shrink-0"
        aria-hidden="true"
      />

      <p className="flex-1 text-[0.9rem] leading-[1.7] text-lsh-grey-700 mb-6">
        {testimonial.quote}
      </p>

      <footer className="flex items-center gap-3 mt-auto">
        <div
          className="flex items-center justify-center w-11 h-11 rounded-full bg-lsh-dark text-white text-[0.875rem] font-bold shrink-0"
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
