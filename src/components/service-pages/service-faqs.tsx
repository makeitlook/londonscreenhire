import { contact } from "@/data/contact";

interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceFaqsProps {
  faqs: ServiceFaq[];
}

/**
 * FAQs - dark section, two-column on desktop.
 * Left: eyebrow + heading + contact prompt (32% width).
 * Right: full accordion using native <details>/<summary> (no JS).
 * Accessible, keyboard-navigable, respects prefers-reduced-motion.
 */
export default function ServiceFaqs({ faqs }: ServiceFaqsProps) {
  return (
    <section
      className="bg-lsh-dark py-14 sm:py-16 xl:py-20"
      aria-labelledby="service-faqs-heading"
    >
      <div className="px-4 sm:px-6 md:px-8 xl:px-12">
        <div className="flex flex-col xl:flex-row xl:gap-16 xl:items-start">
          {/* ── Left: heading + contact ── */}
          <div className="xl:w-[32%] xl:shrink-0 mb-10 xl:mb-0 xl:sticky xl:top-28">
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              FAQs
            </p>
            <h2
              id="service-faqs-heading"
              className="font-heading font-bold uppercase text-white leading-[0.9] tracking-[-0.01em] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)" }}
            >
              Common Questions
            </h2>
            <p className="text-[0.9rem] leading-[1.65] text-lsh-grey-400 mb-5">
              Can&rsquo;t find an answer? Get in touch and we&rsquo;ll respond
              promptly.
            </p>
            <a
              href={contact.phone.href}
              aria-label={contact.phone.ariaLabel}
              className="text-[0.875rem] font-semibold text-lsh-blue hover:text-white transition-colors duration-200"
            >
              {contact.phone.display}
            </a>
          </div>

          {/* ── Right: accordion ── */}
          <div className="xl:flex-1 space-y-2">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-lsh-charcoal border border-[var(--lsh-border-dark)] rounded-[3px] overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none text-white hover:bg-lsh-charcoal-light transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-lsh-blue focus-visible:outline-offset-[-2px]">
                  <span className="font-heading font-semibold uppercase tracking-wide text-[0.9375rem] leading-snug">
                    {faq.question}
                  </span>
                  {/* Chevron rotates when open */}
                  <svg
                    className="shrink-0 w-4 h-4 text-lsh-blue transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 border-t border-[var(--lsh-border-dark)]">
                  <p className="text-[0.9rem] leading-[1.7] text-lsh-grey-300">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
