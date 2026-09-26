"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import homeContent from "@/content/home.json";
import { services } from "@/data/services";
import { FadeIn } from "@/components/shared/fade-in";

export default function ProjectsSection() {
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
        // Reset scroll if reached the end (smooth looping can be complex, so we just reset)
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
      id="projects"
      className="bg-lsh-off-white pt-8 pb-14 md:pt-10 md:pb-16 xl:pt-12 xl:pb-20 scroll-mt-[76px] xl:scroll-mt-[86px]"
      aria-labelledby="projects-heading"
    >
      <div className="lsh-container">
        <FadeIn>
          <div className="flex flex-col items-center mb-6 md:mb-8 xl:mb-10">
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold-ink">
              {homeContent.projects.eyebrow}
            </p>

            <h2
              id="projects-heading"
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-lsh-dark text-center mb-2.5"
              style={{ fontSize: "clamp(2rem, calc(2.5vw + 1.125rem), 3rem)" }}
            >
              {homeContent.projects.heading}
            </h2>

            <span
              className="block bg-lsh-gold rounded-sm"
              style={{ width: "38px", height: "2px" }}
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
            <div className="-mx-4 sm:mx-0 overflow-hidden">
              <ul
                ref={scrollRef}
                className="flex w-full gap-4 px-4 sm:px-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                role="list"
              >
                {services.map((service) => (
                  <li
                    key={service.slug}
                    className="w-[78vw] sm:w-[300px] md:w-[320px] shrink-0"
                  >
                    <ServiceCarouselCard service={service} />
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

function ServiceCarouselCard({ service }: { service: (typeof services)[number] }) {
  return (
    <Link href={`/${service.slug}`} className="group block h-full">
      <article className="h-full">
        <div className="relative overflow-hidden rounded-[3px] aspect-[3/2]">
          <Image
            src={service.heroImage}
            alt={service.heroAlt}
            fill
            sizes="(max-width: 639px) 78vw, 320px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        <h3 className="font-heading font-bold uppercase text-[0.875rem] sm:text-[0.9375rem] leading-snug tracking-wide text-lsh-dark mt-2.5 group-hover:text-lsh-gold-ink transition-colors duration-200">
          {service.navLabel}
        </h3>
      </article>
    </Link>
  );
}
