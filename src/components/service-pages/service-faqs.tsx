import { Phone } from "lucide-react";
import uiContent from "@/content/ui.json";
import { contact } from "@/data/contact";

interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceFaqsProps {
  faqs: ServiceFaq[];
  eyebrow?: string;
  heading?: string;
  prompt?: string;
  headingId?: string;
  tone?: "dark" | "light";
}

/**
 * FAQs - light or dark section, two-column on desktop.
 * Left: eyebrow + heading + contact prompt (32% width).
 * Right: full accordion using native <details>/<summary> (no JS).
 * Accessible, keyboard-navigable, respects prefers-reduced-motion.
 */
export default function ServiceFaqs({
  faqs,
  eyebrow = uiContent.servicePages.faqsEyebrow,
  heading = uiContent.servicePages.faqsHeading,
  prompt = uiContent.servicePages.faqsPrompt,
  headingId = "service-faqs-heading",
  tone = "dark",
}: ServiceFaqsProps) {
  const isLight = tone === "light";

  return (
    <section
      className={`${isLight ? "bg-white" : "bg-lsh-dark"} py-14 sm:py-16 xl:py-20`}
      aria-labelledby={headingId}
    >
      <div className="lsh-container">
        <div className="flex flex-col xl:flex-row xl:gap-16 xl:items-start">
          {/* ── Left: heading + contact ── */}
          <div className="xl:w-[32%] xl:shrink-0 mb-10 xl:mb-0 xl:sticky xl:top-28">
            <p
              className={`mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] ${isLight ? "text-lsh-gold-ink" : "text-lsh-gold"}`}
            >
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className={`font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] mb-5 ${isLight ? "text-lsh-dark" : "text-white"}`}
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)" }}
            >
              {heading}
            </h2>
            <p
              className={`text-[0.9rem] leading-[1.65] mb-5 ${isLight ? "text-lsh-grey-700" : "text-lsh-grey-400"}`}
            >
              {prompt}
            </p>
            <a
              href={contact.phone.href}
              aria-label={contact.phone.ariaLabel}
              className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-[4px] bg-lsh-gold px-6 text-[0.8125rem] font-semibold text-lsh-black transition-colors duration-200 hover:bg-lsh-gold-hover active:bg-lsh-gold-dark sm:w-auto focus-visible:outline-2 focus-visible:outline-lsh-gold-focus focus-visible:outline-offset-2"
            >
              <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
              {uiContent.servicePages.callPrefix} {contact.phone.display}
            </a>
          </div>

          {/* ── Right: accordion ── */}
          <div className="xl:flex-1 space-y-2">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className={`group overflow-hidden rounded-[3px] border ${isLight ? "border-[var(--lsh-border-light)] bg-lsh-off-white" : "border-[var(--lsh-border-dark)] bg-lsh-charcoal"}`}
              >
                <summary
                  className={`flex cursor-pointer list-none select-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-lsh-gold focus-visible:outline-offset-[-2px] sm:px-6 ${isLight ? "text-lsh-dark hover:bg-white" : "text-white hover:bg-lsh-charcoal-light"}`}
                >
                  <span className="font-heading font-semibold uppercase tracking-wide text-[0.9375rem] leading-snug">
                    {faq.question}
                  </span>
                  {/* Chevron rotates when open */}
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 ${isLight ? "text-lsh-gold-ink" : "text-lsh-gold"}`}
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
                <div
                  className={`border-t px-5 py-5 sm:px-6 ${isLight ? "border-[var(--lsh-border-light)]" : "border-[var(--lsh-border-dark)]"}`}
                >
                  <p
                    className={`text-[0.9rem] leading-[1.7] ${isLight ? "text-lsh-grey-700" : "text-lsh-grey-300"}`}
                  >
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
