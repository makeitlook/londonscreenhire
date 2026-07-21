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
      <div className="px-4 sm:px-6 md:px-8 xl:px-12">
        <div className="flex flex-col xl:flex-row xl:gap-20 xl:items-start">
          {/* ── Left: intro copy ── */}
          <div className="xl:w-[42%] xl:shrink-0 mb-12 xl:mb-0">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              About This Service
            </p>
            <p className="text-[0.9375rem] leading-[1.75] text-lsh-grey-700">
              {fullIntro}
            </p>
          </div>

          {/* ── Right: connected process timeline ── */}
          <div className="xl:flex-1">
            <p
              id="service-process-heading"
              className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue"
            >
              How It Works
            </p>

            <ol className="relative list-none m-0 p-0 space-y-0">
              {/* Vertical connecting line - hidden on last item via clip */}
              <div
                className="absolute left-[15px] top-[15px] bottom-[15px] w-[1px] bg-[var(--lsh-border-light)]"
                aria-hidden="true"
              />

              {processSteps.map((step) => (
                <li
                  key={step.step}
                  className="relative flex gap-5 pb-6 last:pb-0"
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
