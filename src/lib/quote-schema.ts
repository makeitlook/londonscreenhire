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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ── Name ── */
  const name = fields.name.trim();
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  /* ── Email ── */
  const email = fields.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
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
    errors.phone = "Please enter a contact phone number.";
  } else if (
    phone.length > 30 ||
    !PHONE_CHARS_RE.test(phone) ||
    phone.replace(/\D/g, "").length < 7
  ) {
    errors.phone = "Enter a valid phone number";
  }

  /* ── Event type ── */
  if (!fields.eventType) {
    errors.eventType = "Please select an event type.";
  }

  /* ── Event date ── */
  if (!fields.eventDate) {
    errors.eventDate = "Please select an event date.";
  } else if (fields.eventDate < today) {
    errors.eventDate = "Event date must not be in the past.";
  }

  /* ── Venue ── */
  const venue = fields.venue.trim();
  if (!venue) {
    errors.venue = "Please enter a venue or event location.";
  } else if (venue.length < 2) {
    errors.venue = "Venue must be at least 2 characters.";
  } else if (venue.length > 150) {
    errors.venue = "Venue must be 150 characters or fewer.";
  }

  /* ── Screen size ── */
  if (!fields.screenSize) {
    errors.screenSize = "Please select a screen size.";
  }

  /* ── Message ── */
  const message = fields.message.trim();
  if (!message) {
    errors.message = "Please describe your event requirements.";
  } else if (message.length < 10) {
    errors.message = "Please provide at least 10 characters.";
  } else if (message.length > 1500) {
    errors.message = "Message must be 1500 characters or fewer.";
  }

  /* ── Privacy notice acknowledgement ── */
  if (!fields.consent) {
    errors.consent = "Please confirm you have read the Privacy Policy.";
  }

  return errors;
}
