interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceIntroProps {
  fullIntro: string;
  processSteps: ServiceProcessStep[];
}

/**
 * Service intro - off-white section.
 * Desktop: intro copy on the left (42%), connected process timeline on the right.
 * Mobile: stacked, intro first then timeline.
 * Timeline uses a vertical connecting line with numbered circles (no JS).
 */
export default function ServiceIntro({
  fullIntro,
  processSteps,
}: ServiceIntroProps) {
  return (
    <section
      className="bg-lsh-off-white py-14 sm:py-16 xl:py-20"
      aria-labelledby="service-process-heading"
    >
      <div className="lsh-container">
        <div className="grid grid-cols-1 items-start gap-y-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-14 xl:gap-x-20">
          {/* ── Left: intro copy ── */}
          <div>
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              {uiContent.servicePages.introEyebrow}
            </p>
            <p className="max-w-[600px] text-[0.9375rem] leading-[1.75] text-lsh-grey-700">
              {fullIntro}
            </p>
          </div>

          {/* ── Right: connected process timeline ── */}
          <div className="xl:flex-1">
            <h2
              id="service-process-heading"
              className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue"
            >
              {uiContent.servicePages.processHeading}
            </h2>

            <ol className="relative list-none m-0 p-0 space-y-0">
              {/* Vertical connecting line - hidden on last item via clip */}
              <div
                className="absolute left-[15px] top-[15px] bottom-[15px] w-[1px] bg-[var(--lsh-border-light)]"
                aria-hidden="true"
              />

              {processSteps.map((step) => (
                <li
                  key={step.step}
                  className="relative flex gap-4 pb-5 last:pb-0 sm:gap-5 sm:pb-6"
                >
                  {/* Step number bubble */}
                  <span
                    className="relative z-10 shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-full bg-lsh-blue text-white font-heading font-bold text-[0.75rem] leading-none ring-4 ring-lsh-off-white"
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>

                  {/* Step content */}
                  <div className="pt-[3px]">
                    <h3 className="font-heading font-bold uppercase tracking-wide text-lsh-dark text-[0.9375rem] leading-snug mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[0.875rem] leading-[1.65] text-lsh-grey-700">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
import uiContent from "@/content/ui.json";
