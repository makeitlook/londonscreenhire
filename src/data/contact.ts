import contactContent from "@/content/contact.json";

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
  whatsapp?: ContactItem;
}

export const contact = contactContent as ContactData;
