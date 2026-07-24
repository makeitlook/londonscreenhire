import type { LucideIcon } from "lucide-react";
import uiContent from "@/content/ui.json";

interface ServiceBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ServiceBenefitsProps {
  benefits: ServiceBenefit[];
}

/**
 * Key benefits - dark section, 2-3 column card grid with Lucide icons.
 * Icon sits centred at the top of each card, matching the homepage
 * Why Choose Us visual language.
 */
export default function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <section
      className="bg-lsh-dark py-14 sm:py-16 xl:py-20"
      aria-labelledby="service-benefits-heading"
    >
      <div className="lsh-container">
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
          {uiContent.servicePages.benefitsEyebrow}
        </p>
        <h2
          id="service-benefits-heading"
          className="font-heading font-bold uppercase text-white leading-[0.9] tracking-[-0.01em] mb-8"
          style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)" }}
        >
          {uiContent.servicePages.benefitsHeading}
        </h2>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none m-0 p-0"
          role="list"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <li key={benefit.title}>
                <article className="flex flex-col h-full bg-lsh-charcoal border border-[var(--lsh-border-dark)] rounded-[3px] p-5 sm:p-6 hover:bg-lsh-charcoal-light transition-colors duration-200">
                  {/* Icon */}
                  <span
                    className="mb-4 shrink-0 text-lsh-gold"
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-heading font-bold uppercase tracking-wide text-white text-[0.9375rem] leading-snug mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[0.875rem] leading-[1.6] text-lsh-grey-300">
                    {benefit.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
