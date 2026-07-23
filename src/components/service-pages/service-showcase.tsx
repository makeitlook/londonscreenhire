import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import uiContent from "@/content/ui.json";

interface ServiceShowcaseProps {
  h1: string;
  image: string;
  imageAlt: string;
  shortIntro: string;
}

/**
 * ServiceShowcase - dark section between Uses and FAQs.
 * Desktop: hero image on the left (55%), text panel on the right (45%).
 * Mobile: image above, text below (stacked).
 *
 * The image is displayed at higher opacity here than in the hero - this is
 * a pure visual section, not a text-overlay hero.
 */
export default function ServiceShowcase({
  h1,
  image,
  imageAlt,
  shortIntro,
}: ServiceShowcaseProps) {
  return (
    <section
      id="service-showcase"
      className="bg-lsh-charcoal overflow-hidden"
      aria-labelledby="service-showcase-heading"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col xl:min-h-[420px] xl:flex-row">

        {/* ── Image panel ── */}
        <div className="relative w-full xl:w-[55%] aspect-[16/9] xl:aspect-auto">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1279px) 100vw, (max-width: 1440px) 55vw, 792px"
            className="object-cover object-center opacity-80"
          />
          {/* Subtle right-edge fade into text panel on desktop */}
          <div
            className="absolute inset-0 hidden xl:block"
            style={{
              background:
                "linear-gradient(to right, transparent 60%, rgba(23,26,31,0.7) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Text panel ── */}
        <div className="xl:w-[45%] xl:shrink-0 flex items-center px-6 sm:px-8 xl:px-12 py-10 xl:py-14">
          <div>
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              {uiContent.servicePages.showcaseEyebrow}
            </p>
            <h2
              id="service-showcase-heading"
              className="font-heading font-bold uppercase text-white leading-[0.9] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)" }}
            >
              {h1}
            </h2>
            <p className="text-[0.9375rem] leading-[1.7] text-lsh-grey-300 mb-8 max-w-[400px]">
              {shortIntro}
            </p>
            <Link
              href="/#quote"
              className="inline-flex items-center gap-2 h-[44px] px-6 text-[0.8125rem] font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-lsh-blue-hover active:bg-lsh-blue-dark transition-colors duration-200"
            >
              {uiContent.servicePages.quoteCta}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
