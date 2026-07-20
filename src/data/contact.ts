/**
 * Contact details for London Screen Hire.
 *
 * ⚠️  ALL values below are PLACEHOLDERS.
 *     Replace phone, email and (if required) WhatsApp with client-confirmed
 *     details before launch.
 *
 * WhatsApp row is intentionally hidden until a verified number is supplied.
 * To enable it, uncomment the `whatsapp` block and set the correct href.
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
  /** Optional — omit until a verified WhatsApp number is supplied. */
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
