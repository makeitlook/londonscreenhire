import navigationContent from "@/content/navigation.json";

export type FooterLink = { label: string; href: string };
export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "youtube" | "linkedin" | "trustpilot";
  placeholder: boolean;
};

const { footer } = navigationContent;

export const quickLinks: FooterLink[] = footer.quickLinks;
export const serviceLinks: FooterLink[] = footer.serviceLinks;
export const socialLinks = footer.socialLinks as SocialLink[];
export const legalLinks: FooterLink[] = footer.legalLinks;
export const footerSummary = footer.summary;
export const footerLocation = footer.location;
export const copyright = footer.copyrightTemplate.replace(
  "{year}",
  String(new Date().getFullYear()),
);
