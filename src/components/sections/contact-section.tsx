import { Phone, Mail, MessageCircle, type LucideProps } from "lucide-react";
import homeContent from "@/content/home.json";
import QuoteForm from "./quote-form";
import { contact, type ContactItem } from "@/data/contact";
import { FadeIn } from "@/components/shared/fade-in";

/**
 * ContactSection - server component outer shell.
 *
 * Dark section attaching directly beneath the off-white Testimonials section.
 * Desktop (lg+): two-column flex - left contact content (~42%) + right quote form (~58%).
 * Tablet/mobile: stacked - heading block, contact details, then form.
 *
 */

const iconMap: Record<ContactItem["icon"], React.ComponentType<LucideProps>> = {
  phone: Phone,
  mail: Mail,
  whatsapp: MessageCircle,
};

function ContactRow({ item }: { item: ContactItem }) {
  const Icon = iconMap[item.icon];
  const isExternal = item.href.startsWith("https://");
  return (
    <li>
      <a
        href={item.href}
        className="flex items-center gap-3 group"
        aria-label={item.ariaLabel}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-[3px] bg-[var(--lsh-charcoal)] border border-[var(--lsh-border-dark)] text-lsh-gold group-hover:bg-lsh-gold group-hover:text-lsh-black transition-colors shrink-0">
          <Icon size={17} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[0.75rem] text-[var(--lsh-grey-400)] leading-none mb-0.5">
            {item.label}
          </p>
          <p className="text-white text-[0.9375rem] font-medium leading-snug group-hover:text-lsh-gold transition-colors">
            {item.display}
          </p>
        </div>
      </a>
    </li>
  );
}

export default function ContactSection() {
  const contactItems = [
    contact.phone,
    contact.email,
    ...(contact.whatsapp ? [contact.whatsapp] : []),
  ];

  return (
    <section
      id="quote"
      className="bg-lsh-dark border-t-2 border-lsh-gold pt-14 pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[76px] xl:scroll-mt-[86px]"
      aria-labelledby="contact-heading"
    >
      <div className="lsh-container">
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-20">
          {/* ── Left: contact content ── */}
          <FadeIn className="lg:w-[42%] lg:shrink-0 mb-10 lg:mb-0">
            {/* Eyebrow */}
            <p className="mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
              {homeContent.contactSection.eyebrow}
            </p>

            {/* Heading */}
            <h2
              id="contact-heading"
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-white mb-4"
              style={{
                fontSize: "clamp(2.125rem, calc(2.5vw + 1.125rem), 3.25rem)",
              }}
            >
              {homeContent.contactSection.heading}
            </h2>

            {/* Supporting copy */}
            <p className="text-[var(--lsh-grey-300)] text-[0.9375rem] leading-relaxed mb-8 max-w-[420px]">
              {homeContent.contactSection.description}
            </p>

            {/* Contact details - driven by src/data/contact.ts */}
            <ul
              className="space-y-4"
              aria-label={homeContent.contactSection.contactListAriaLabel}
            >
              {contactItems.map((item) => (
                <ContactRow key={item.icon} item={item} />
              ))}
            </ul>
          </FadeIn>

          {/* ── Right: quote form ── */}
          <FadeIn className="flex-1 bg-[var(--lsh-charcoal)] border border-[var(--lsh-border-dark)] rounded-[4px] p-6 md:p-8">
            <QuoteForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
