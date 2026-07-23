/**
 * Validation rules for the London Screen Hire quote form.
 * Plain TypeScript - no Zod or external schema library required.
 */

export interface QuoteFields {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: Date | undefined;
  venue: string;
  screenSize: string;
  message: string;
  consent: boolean;
}

export interface QuoteErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  venue?: string;
  screenSize?: string;
  message?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Only these characters are permitted - rejects any letter a-z/A-Z
const PHONE_CHARS_RE = /^[0-9\s+()\-]+$/;

export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};
  const messages = formsContent.quote.validation;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ── Name ── */
  const name = fields.name.trim();
  if (!name) {
    errors.name = messages.nameRequired;
  } else if (name.length < 2) {
    errors.name = messages.nameShort;
  } else if (name.length > 100) {
    errors.name = messages.nameLong;
  }

  /* ── Email ── */
  const email = fields.email.trim();
  if (!email) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_RE.test(email)) {
    errors.email = messages.emailInvalid;
  }

  /* ── Phone ──
     Rules:
       1. Required
       2. Max 30 characters
       3. Only digits, spaces, +, (, ), - permitted (no letters)
       4. At least 7 digits after stripping non-digit characters
  ── */
  const phone = fields.phone.trim();
  if (!phone) {
    errors.phone = messages.phoneRequired;
  } else if (
    phone.length > 30 ||
    !PHONE_CHARS_RE.test(phone) ||
    phone.replace(/\D/g, "").length < 7
  ) {
    errors.phone = messages.phoneInvalid;
  }

  /* ── Event type ── */
  if (!fields.eventType) {
    errors.eventType = messages.eventTypeRequired;
  }

  /* ── Event date ── */
  if (!fields.eventDate) {
    errors.eventDate = messages.eventDateRequired;
  } else if (fields.eventDate < today) {
    errors.eventDate = messages.eventDatePast;
  }

  /* ── Venue ── */
  const venue = fields.venue.trim();
  if (!venue) {
    errors.venue = messages.venueRequired;
  } else if (venue.length < 2) {
    errors.venue = messages.venueShort;
  } else if (venue.length > 150) {
    errors.venue = messages.venueLong;
  }

  /* ── Screen size ── */
  if (!fields.screenSize) {
    errors.screenSize = messages.screenSizeRequired;
  }

  /* ── Message ── */
  const message = fields.message.trim();
  if (!message) {
    errors.message = messages.messageRequired;
  } else if (message.length < 10) {
    errors.message = messages.messageShort;
  } else if (message.length > 1500) {
    errors.message = messages.messageLong;
  }

  /* ── Privacy notice acknowledgement ── */
  if (!fields.consent) {
    errors.consent = messages.consentRequired;
  }

  return errors;
}
import formsContent from "@/content/forms.json";
