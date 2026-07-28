import {
  Building2,
  Monitor,
  Sun,
  Video,
  type LucideIcon,
} from "lucide-react";
import homeContent from "@/content/home.json";
import { FadeIn } from "@/components/shared/fade-in";

const overviewIcons: LucideIcon[] = [Monitor, Video, Building2, Sun];

export default function ServiceOverviewSection() {
  return (
    <section
      className="bg-lsh-off-white pt-14 pb-8 md:pt-16 md:pb-10 xl:pt-20 xl:pb-12"
      aria-label={homeContent.serviceOverview.ariaLabel}
    >
      <div className="lsh-container">
        <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-12 xl:gap-16">
          <FadeIn className="min-w-0 max-w-[540px]">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold-ink">
              {homeContent.serviceOverview.eyebrow}
            </p>
            <p
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.015em] text-lsh-dark"
              style={{
                fontSize:
                  "clamp(2.125rem, calc(2.8vw + 1.25rem), 4.25rem)",
              }}
            >
              {homeContent.serviceOverview.heading}
            </p>
            <div
              className="my-5 h-0.5 w-12 bg-lsh-gold"
              aria-hidden="true"
            />
            <p className="max-w-[470px] text-[0.9375rem] leading-[1.75] text-lsh-grey-700">
              {homeContent.serviceOverview.description}
            </p>
          </FadeIn>

          <FadeIn className="min-w-0">
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {homeContent.serviceOverview.items.map((item, index) => {
                const Icon = overviewIcons[index];

                return (
                  <article
                    key={item.heading}
                    className="group relative min-h-[190px] min-w-0 overflow-hidden rounded-[3px] border border-[var(--lsh-border-dark)] bg-lsh-charcoal px-6 py-6 transition-colors duration-200 hover:bg-lsh-charcoal-light sm:px-7 sm:py-7"
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-0.5 bg-lsh-gold"
                      aria-hidden="true"
                    />
                    <div className="mb-8 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/15 bg-lsh-dark text-lsh-gold transition-colors duration-200 group-hover:border-lsh-gold/50">
                        <Icon
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="font-heading text-[0.8125rem] font-semibold tracking-[0.18em] text-lsh-grey-500"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="break-words mb-2.5 font-heading text-[1.25rem] font-bold uppercase leading-[1] tracking-[-0.005em] text-white sm:text-[1.5rem]">
                      {item.heading}
                    </h2>
                    <p className="text-[0.8125rem] leading-[1.65] text-lsh-grey-300 sm:text-[0.875rem]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
