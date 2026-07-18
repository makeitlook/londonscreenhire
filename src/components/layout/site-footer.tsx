import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  type LucideProps,
} from "lucide-react";
import SiteLogo from "@/components/shared/site-logo";
import { contact, type ContactItem } from "@/data/contact";
import {
  quickLinks,
  serviceLinks,
  socialLinks,
  legalLinks,
  footerSummary,
  footerLocation,
  copyright,
} from "@/data/footer";

// ── Contact icon map ──────────────────────────────────────────────────────────
const contactIconMap: Record<
  ContactItem["icon"],
  React.ComponentType<LucideProps>
> = { phone: Phone, mail: Mail, whatsapp: MessageCircle };

// ── Shared styles ─────────────────────────────────────────────────────────────
const colLabel =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-lsh-blue";
const linkClass =
  "text-[0.875rem] text-[var(--lsh-grey-400)] hover:text-white transition-colors duration-200";

// ── Component ─────────────────────────────────────────────────────────────────
export default function SiteFooter() {
  const contactItems: ContactItem[] = [
    contact.phone,
    contact.email,
    ...(contact.whatsapp ? [contact.whatsapp] : []),
  ];

  // Social rows hidden until a verified URL is supplied (placeholder: false + href set)
  const activeSocial = socialLinks.filter((s) => !s.placeholder && s.href);

  return (
    <footer
      className="relative bg-lsh-black border-t border-[var(--lsh-border-dark)] overflow-hidden"
      aria-label="Site footer"
    >
      {/* ── Background image + overlay ───────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/footer/footer.png)",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #05070a 0%, rgba(5,7,10,0.96) 25%, rgba(5,7,10,0.80) 50%, rgba(5,7,10,0.40) 75%, rgba(5,7,10,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 xl:px-12 pt-14 pb-12 md:pt-16 md:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.75fr_1fr_1fr_1.5fr] gap-10 sm:gap-x-8 sm:gap-y-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="London Screen Hire — return to homepage">
              <SiteLogo />
            </Link>
            <p className="mt-5 text-[0.875rem] text-[var(--lsh-grey-400)] leading-relaxed max-w-[300px] lg:max-w-none">
              {footerSummary}
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className={colLabel}>Quick Links</p>
            <nav aria-label="Footer quick links">
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className={colLabel}>Services</p>
            <nav aria-label="Footer services">
              <ul className="mt-4 space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className={colLabel}>Contact</p>
            <address className="not-italic mt-4">
              <ul className="space-y-3">
                {contactItems.map((item) => {
                  const Icon = contactIconMap[item.icon];
                  return (
                    <li key={item.icon}>
                      <a
                        href={item.href}
                        className="flex items-start gap-2.5 group"
                        aria-label={item.ariaLabel}
                      >
                        <Icon
                          size={14}
                          className="mt-0.5 shrink-0 text-lsh-blue"
                          aria-hidden="true"
                        />
                        <span className="text-[0.875rem] text-[var(--lsh-grey-400)] group-hover:text-white transition-colors duration-200">
                          {item.display}
                        </span>
                      </a>
                    </li>
                  );
                })}
                <li className="flex items-start gap-2.5">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-lsh-blue"
                    aria-hidden="true"
                  />
                  <span className="text-[0.875rem] text-[var(--lsh-grey-400)]">
                    {footerLocation}
                  </span>
                </li>
              </ul>
            </address>

            {/* Social — only rendered when verified URLs exist */}
            {activeSocial.length > 0 && (
              <div className="mt-6">
                <p className={colLabel}>Follow Us</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeSocial.map((s) => (
                    <a
                      key={s.icon}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} — opens in a new tab`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-[3px] border border-[var(--lsh-border-dark)] text-[var(--lsh-grey-400)] text-[0.6875rem] font-semibold hover:border-lsh-blue hover:text-white transition-colors duration-200"
                    >
                      {s.label.slice(0, 2).toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-[var(--lsh-border-dark)] px-4 sm:px-6 md:px-8 xl:px-12 py-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-[var(--lsh-grey-500)]">
            {copyright}
          </p>
          <p className="text-[0.75rem] text-[var(--lsh-grey-500)]">
            Website designed by{" "}
            <a
              href="https://www.makeitlook.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Make It Look
            </a>
          </p>
          <nav aria-label="Legal links">
            <ul className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.75rem] text-[var(--lsh-grey-500)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
