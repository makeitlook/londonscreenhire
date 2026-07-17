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
    display: "+44 20 1234 5678",
    href: "tel:+442012345678",
    ariaLabel: "Call us on +44 20 1234 5678",
    icon: "phone",
  },
  email: {
    label: "Email",
    display: "info@londonscreenhire.co.uk",
    href: "mailto:info@londonscreenhire.co.uk",
    ariaLabel: "Email info@londonscreenhire.co.uk",
    icon: "mail",
  },
  // whatsapp is disabled until a verified number is provided.
  // Uncomment and update before enabling the WhatsApp row:
  //
  // whatsapp: {
  //   label: "WhatsApp",
  //   display: "Message us on WhatsApp",
  //   href: "https://wa.me/44XXXXXXXXXX",
  //   ariaLabel: "Message us on WhatsApp",
  //   icon: "whatsapp",
  // },
};
