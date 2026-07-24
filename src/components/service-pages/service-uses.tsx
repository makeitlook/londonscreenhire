import Link from "next/link";
import { ArrowRight } from "lucide-react";
import uiContent from "@/content/ui.json";

interface ServiceUseCase {
  title: string;
  description: string;
  /** Optional internal page link - renders card as an anchor when present. */
  href?: string;
}

interface ServiceUsesProps {
  useCases: ServiceUseCase[];
}

/**
 * Suitable event types / applications - off-white section.
 * Cards with an optional internal link. Linked cards get a hover arrow and
 * gold border highlight; static cards display a plain gold dot instead.
 */
export default function ServiceUses({ useCases }: ServiceUsesProps) {
  return (
    <section
      className="bg-lsh-off-white py-14 sm:py-16 xl:py-20"
      aria-labelledby="service-uses-heading"
    >
      <div className="lsh-container">
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold-ink">
          {uiContent.servicePages.usesEyebrow}
        </p>
        <h2
          id="service-uses-heading"
          className="font-heading font-bold uppercase text-lsh-dark leading-[0.9] tracking-[-0.01em] mb-8"
          style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)" }}
        >
          {uiContent.servicePages.usesHeading}
        </h2>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none m-0 p-0"
          role="list"
        >
          {useCases.map((useCase) =>
            useCase.href ? (
              /* Linked card */
              <li key={useCase.title}>
                <Link
                  href={useCase.href}
                  className="group flex flex-col bg-white border border-[var(--lsh-border-light)] rounded-[3px] p-5 sm:p-6 h-full hover:border-lsh-gold/40 transition-colors duration-200"
                >
                  <h3 className="font-heading font-semibold uppercase tracking-wide text-lsh-dark text-[0.9375rem] leading-snug mb-1.5 group-hover:text-lsh-gold-ink transition-colors duration-200">
                    {useCase.title}
                  </h3>
                  <p className="text-[0.875rem] leading-[1.6] text-lsh-grey-700 flex-1">
                    {useCase.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-lsh-gold-ink">
                    {uiContent.servicePages.learnMore}
                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ) : (
              /* Static card */
              <li key={useCase.title}>
                <article className="flex flex-col bg-white border border-[var(--lsh-border-light)] rounded-[3px] p-5 sm:p-6 h-full">
                  <span
                    className="block w-[6px] h-[6px] rounded-full bg-lsh-gold mb-3 shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading font-semibold uppercase tracking-wide text-lsh-dark text-[0.9375rem] leading-snug mb-1.5">
                    {useCase.title}
                  </h3>
                  <p className="text-[0.875rem] leading-[1.6] text-lsh-grey-700">
                    {useCase.description}
                  </p>
                </article>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
