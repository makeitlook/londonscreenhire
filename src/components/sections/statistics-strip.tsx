import { statistics } from "@/data/statistics";
import homeContent from "@/content/home.json";
import { FadeIn } from "@/components/shared/fade-in";

/**
 * StatisticsStrip - server component.
 *
 * Full-width brand-gold band that attaches directly beneath the dark
 * Why Choose Us section with no gap or separator.
 *
 * Layout:
 *   Mobile  (<sm):  2-col × 2-row grid
 *   Tablet (sm–lg): 2-col × 2-row grid (wider cells)
 *   Desktop (lg+):  4-col × 1-row
 *
 * Dividers: right-border on non-last column cells; bottom-border on
 * top-row mobile/tablet cells. All borders use white/20 transparency.
 * No outer border.
 */

/**
 * Per-item border classes.
 *
 * 4 items, 3 layouts:
 *   Mobile / tablet 2×2:
 *     [0] right + bottom  [1] bottom
 *     [2] right           [3] -
 *   Desktop 4×1:
 *     [0] right  [1] right  [2] right  [3] -
 */
const BORDERS = [
  "border-r border-b lg:border-b-0 border-black/20",
  "border-b lg:border-b-0 lg:border-r border-black/20",
  "border-r lg:border-r border-black/20",
  "",
] as const;

export default function StatisticsStrip() {
  return (
    <section
      id="stats"
      aria-label={homeContent.statisticsAriaLabel}
      className="bg-lsh-gold scroll-mt-[76px] xl:scroll-mt-[86px]"
    >
      <div className="lsh-container">
        <FadeIn>
          <ul
            className="grid grid-cols-2 lg:grid-cols-4 list-none m-0 p-0"
            role="list"
          >
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <li
                  key={stat.label}
                  className={`flex items-center justify-center gap-3 sm:gap-4 py-8 sm:py-9 lg:py-10 ${BORDERS[index]}`}
                >
                  {/* Icon */}
                  <Icon
                    size={30}
                    strokeWidth={1.4}
                    className="text-lsh-black/75 shrink-0 hidden sm:block lg:block"
                    aria-hidden="true"
                  />
                  {/* Value + label stack */}
                  <div className="flex flex-col items-center sm:items-start">
                    <span
                      className="font-heading font-bold text-lsh-black leading-none"
                      style={{
                        fontSize: "clamp(1.75rem, calc(2vw + 1rem), 2.625rem)",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[0.6875rem] sm:text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-lsh-black/75">
                      {stat.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
