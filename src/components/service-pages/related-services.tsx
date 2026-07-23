import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import uiContent from "@/content/ui.json";
import type { ServicePage } from "@/data/services";

interface RelatedServicesProps {
  services: Pick<
    ServicePage,
    "slug" | "navLabel" | "shortIntro" | "eyebrow" | "heroImage" | "heroAlt"
  >[];
}

type ServiceItem = RelatedServicesProps["services"][number];

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href={`/${service.slug}`}
      className="group flex flex-col h-full bg-white border border-[var(--lsh-border-light)] rounded-[3px] overflow-hidden hover:border-lsh-blue/40 transition-colors duration-200"
    >
      {/* Image strip */}
      <div className="relative w-full aspect-[16/9] bg-lsh-charcoal overflow-hidden">
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center opacity-70 group-hover:opacity-85 transition-opacity duration-300"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,13,18,0.5) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-lsh-blue mb-1.5">
          {service.eyebrow}
        </p>
        <h3 className="font-heading font-bold uppercase tracking-wide text-lsh-dark text-[1rem] leading-snug mb-2 group-hover:text-lsh-blue transition-colors duration-200">
          {service.navLabel}
        </h3>
        <p className="text-[0.875rem] leading-[1.6] text-lsh-grey-700 flex-1">
          {service.shortIntro}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-lsh-blue">
          {uiContent.servicePages.learnMore}
          <ArrowRight
            size={13}
            strokeWidth={2}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * Related services - off-white section.
 * Mobile (<sm): horizontal snap-scroll, ~82vw cards, no scrollbar.
 * Tablet+:       2-col / 3-col CSS grid.
 */
export default function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section
      className="bg-lsh-off-white py-14 sm:py-16 xl:py-20"
      aria-labelledby="related-services-heading"
    >
      <div className="lsh-container">
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
          {uiContent.servicePages.relatedEyebrow}
        </p>
        <h2
          id="related-services-heading"
          className="font-heading font-bold uppercase text-lsh-dark leading-[0.9] tracking-[-0.01em] mb-8"
          style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)" }}
        >
          {uiContent.servicePages.relatedHeading}
        </h2>

        {/* ── Mobile swipe row (< sm) ── */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <ul
            className="flex gap-4 snap-x snap-mandatory pr-4 list-none m-0 p-0"
            style={{ width: "max-content" }}
            role="list"
          >
            {services.map((service) => (
              <li
                key={service.slug}
                className="snap-start shrink-0"
                style={{ width: "82vw" }}
              >
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tablet + desktop grid (sm+) ── */}
        <ul
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none m-0 p-0"
          role="list"
        >
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
