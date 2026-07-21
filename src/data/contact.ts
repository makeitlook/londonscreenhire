/**
 * Confirmed contact details for London Screen Hire. Keep telephone and email
 * links sourced from this module so they remain consistent across the site.
 */

export interface ContactItem {
  label: string;
  display: string;
  href: string;
  ariaLabel: string;
  icon: "phone" | "mail" | "whatsapp";
}

export interface ContactData {
  phone: ContactItem;
  email: ContactItem;
  /** Optional - omit if WhatsApp is no longer offered. */
  whatsapp?: ContactItem;
}

export const contact: ContactData = {
  phone: {
    label: "Phone",
    display: "07946 098813",
    href: "tel:+447946098813",
    ariaLabel: "Call us on 07946 098813",
    icon: "phone",
  },
  email: {
    label: "Email",
    display: "info@londonscreenhire.com",
    href: "mailto:info@londonscreenhire.com",
    ariaLabel: "Email info@londonscreenhire.com",
    icon: "mail",
  },
  whatsapp: {
    label: "WhatsApp",
    display: "Message us on WhatsApp",
    href: "https://wa.me/447946098813",
    ariaLabel: "Message us on WhatsApp",
    icon: "whatsapp",
  },
};
