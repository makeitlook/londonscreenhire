import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  validateQuote,
  type QuoteFields,
} from "@/lib/quote-schema";

const validFields = (): QuoteFields => ({
  name: "Alex Morgan",
  email: "alex@example.com",
  phone: "+44 7946 123456",
  eventType: "Conference",
  eventDate: new Date(2026, 6, 24),
  venue: "Central London",
  screenSize: "Large",
  message: "We need an LED screen for a conference.",
  consent: true,
});

describe("validateQuote", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 23, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("accepts a complete valid enquiry", () => {
    expect(validateQuote(validFields())).toEqual({});
  });

  it("reports every required field when the form is empty", () => {
    const errors = validateQuote({
      name: " ",
      email: "",
      phone: "",
      eventType: "",
      eventDate: undefined,
      venue: "",
      screenSize: "",
      message: "",
      consent: false,
    });

    expect(Object.keys(errors).sort()).toEqual([
      "consent",
      "email",
      "eventDate",
      "eventType",
      "message",
      "name",
      "phone",
      "screenSize",
      "venue",
    ]);
  });

  it("rejects invalid contact details and dates in the past", () => {
    const errors = validateQuote({
      ...validFields(),
      email: "alex@example",
      phone: "call me tomorrow",
      eventDate: new Date(2026, 6, 22),
    });

    expect(errors).toHaveProperty("email");
    expect(errors).toHaveProperty("phone");
    expect(errors).toHaveProperty("eventDate");
  });

  it("applies minimum lengths after trimming whitespace", () => {
    const errors = validateQuote({
      ...validFields(),
      name: " A ",
      venue: " X ",
      message: " short ",
    });

    expect(errors).toHaveProperty("name");
    expect(errors).toHaveProperty("venue");
    expect(errors).toHaveProperty("message");
  });
});
