/**
 * Footer content data for London Screen Hire.
 *
 * ⚠️  socialLinks hrefs are PLACEHOLDER — set placeholder: false and provide a
 *     verified URL before enabling each platform row.
 * ⚠️  footerLocation and footerSummary coverage claims must be confirmed with
 *     the client before launch.
 */

export type FooterLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "youtube" | "linkedin";
  /** When true the row is hidden — set false only once a real URL is supplied. */
  placeholder: boolean;
};

export const quickLinks: FooterLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Events", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Get a Quote", href: "/#quote" },
];

export const serviceLinks: FooterLink[] = [
  { label: "LED Screen Hire", href: "/#services" },
  { label: "Audio Systems", href: "/#services" },
  { label: "Lighting", href: "/#services" },
  { label: "Staging", href: "/#services" },
  { label: "Live Streaming", href: "/#services" },
  { label: "Event Production", href: "/#services" },
];

/**
 * All entries are placeholder until verified profile URLs are confirmed.
 * To activate: set placeholder: false and add the full profile URL.
 */
export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "", icon: "facebook", placeholder: true },
  { label: "Instagram", href: "", icon: "instagram", placeholder: true },
  { label: "YouTube", href: "", icon: "youtube", placeholder: true },
  { label: "LinkedIn", href: "", icon: "linkedin", placeholder: true },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** ⚠️ PLACEHOLDER — confirm exact service coverage area with client. */
export const footerSummary =
  "Professional LED screen hire and AV production for corporate events, weddings, exhibitions, concerts and outdoor events across London and the UK.";

/** ⚠️ PLACEHOLDER — confirm coverage area. */
export const footerLocation = "London & UK";

/** Build-time year — acceptable for static export. */
export const copyright = `© ${new Date().getFullYear()} London Screen Hire. All rights reserved.`;
