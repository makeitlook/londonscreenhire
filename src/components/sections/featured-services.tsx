import { featuredServices } from "@/data/featured-services";
import { FadeIn } from "@/components/shared/fade-in";

/**
 * Separator classes for 6 items across three grid states.
 *
 * Grid progression:
 *   base (320px+) → 2 columns (3 rows of 2)
 *   sm   (640px+) → 3 columns (2 rows of 3)
 *   xl  (1280px+) → 6 columns (1 row of 6)
 *
 * Border derivation per index:
 *   Index 0: 2-col r+b | 3-col r+b | 6-col r
 *   Index 1: 2-col b   | 3-col r+b | 6-col r
 *   Index 2: 2-col r+b | 3-col b   | 6-col r
 *   Index 3: 2-col b   | 3-col r   | 6-col r
 *   Index 4: 2-col r   | 3-col r   | 6-col r
 *   Index 5: 2-col —   | 3-col —   | 6-col —
 */
const ITEM_BORDERS = [
  "border-r border-b xl:border-b-0",
  "border-b sm:border-r xl:border-b-0",
  "border-r border-b sm:border-r-0 xl:border-r xl:border-b-0",
  "border-b sm:border-r sm:border-b-0",
  "border-r",
  "",
] as const;

/**
 * FeaturedServices — server component.
 *
 * Dark panel that overlaps the hero on tablet/desktop.
 * Mobile: 2-col compact grid with reduced vertical padding.
 * Padding matches the site-wide system (px-4 / sm:px-6 / md:px-8 / xl:px-12).
 */
export default function FeaturedServices() {
  return (
    <section
      id="services"
      aria-label="Featured services"
      className="bg-lsh-dark py-0 scroll-mt-[68px] xl:scroll-mt-[78px]"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 xl:px-12">
        <FadeIn>
          <div className="bg-lsh-charcoal border border-[var(--lsh-border-dark)] rounded-[4px] overflow-hidden">
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 list-none m-0 p-0"
              role="list"
            >
              {featuredServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <li
                    key={service.title}
                    className={`flex flex-col items-center text-center gap-2.5 sm:gap-3 xl:gap-4 py-5 px-3 sm:py-7 sm:px-5 xl:py-9 border-[var(--lsh-border-dark)] transition-colors duration-200 hover:bg-lsh-charcoal-light ${ITEM_BORDERS[index]}`}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.4}
                      className="text-lsh-blue shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-heading font-bold uppercase tracking-wide text-lsh-white text-[0.9375rem] xl:text-[1rem] leading-snug mb-1">
                        {service.title}
                      </h3>
                      <p className="text-[0.75rem] sm:text-[0.8125rem] leading-[1.5] sm:leading-[1.6] text-lsh-grey-400">
                        {service.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
