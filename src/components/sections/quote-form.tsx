"use client";

import { useState, useId, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import formsContent from "@/content/forms.json";
import { cn } from "@/lib/utils";
import { validateQuote, type QuoteErrors } from "@/lib/quote-schema";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success";

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputBase =
  "w-full h-[46px] px-3.5 bg-[var(--lsh-charcoal-light)] border border-[var(--lsh-border-dark)] " +
  "rounded-[3px] text-white text-[0.9375rem] placeholder:text-[var(--lsh-grey-500)] " +
  "focus:outline-none focus:border-lsh-blue focus:ring-1 focus:ring-lsh-blue/30 transition-colors";
const inputErr = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelBase =
  "block mb-1.5 text-[0.8125rem] font-medium text-[var(--lsh-grey-300)]";
const groupHeading =
  "col-span-full text-[0.6875rem] font-semibold uppercase tracking-[0.18em] " +
  "text-[var(--lsh-grey-400)] pt-2 pb-0.5";

// ── Date helper ────────────────────────────────────────────────────────────────
function formatUK(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toDateInputValue(date: Date | undefined): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateInputValue(value: string): Date | undefined {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function QuoteForm() {
  const content = formsContent.quote;
  const id = useId();
  const [formState, setFormState] = useState<FormState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [screenSize, setScreenSize] = useState("");
  const [consent, setConsent] = useState(false);
  const [shouldFocusName, setShouldFocusName] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const submitErrorRef = useRef<HTMLDivElement>(null);

  // Focus Full Name after reset
  useEffect(() => {
    if (shouldFocusName && nameRef.current) {
      nameRef.current.focus();
      setShouldFocusName(false);
    }
  }, [shouldFocusName]);

  // ── Reset ───────────────────────────────────────────────────────────────────
  function handleReset() {
    setEventType("");
    setEventDate(undefined);
    setScreenSize("");
    setConsent(false);
    setErrors({});
    setSubmitError(null);
    setFormState("idle");
    setShouldFocusName(true);
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formState === "loading") return;
    const formEl = e.currentTarget;
    const raw = new FormData(formEl);

    // Honeypot - silently swallow bot submissions
    if (raw.get("botcheck")) {
      setFormState("success");
      return;
    }

    const fields = {
      name: raw.get("name")?.toString() ?? "",
      email: raw.get("email")?.toString() ?? "",
      phone: raw.get("phone")?.toString() ?? "",
      eventType,
      eventDate,
      venue: raw.get("venue")?.toString() ?? "",
      screenSize,
      message: raw.get("message")?.toString() ?? "",
      consent,
    };

    const errs = validateQuote(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const focusMap: Record<string, string> = {
        name: "name",
        email: "email",
        phone: "phone",
        venue: "venue",
        message: "message",
      };
      const firstKey = Object.keys(errs)[0];
      if (focusMap[firstKey]) {
        (
          formEl.elements.namedItem(focusMap[firstKey]) as HTMLElement | null
        )?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitError(null);

    // Guard: missing access key
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
    if (!accessKey) {
      setSubmitError(
        content.unavailableError,
      );
      setTimeout(() => submitErrorRef.current?.focus(), 0);
      return;
    }

    setFormState("loading");

    const payload = new FormData();
    payload.set("access_key", accessKey);
    payload.set("subject", content.emailSubject);
    payload.set("from_name", content.emailFromName);
    payload.set(content.emailFields.name, fields.name.trim());
    payload.set(content.emailFields.email, fields.email.trim());
    payload.set(content.emailFields.phone, fields.phone.trim());
    payload.set(content.emailFields.eventType, fields.eventType);
    payload.set(
      content.emailFields.eventDate,
      fields.eventDate ? formatUK(fields.eventDate) : content.notSpecified,
    );
    payload.set(content.emailFields.venue, fields.venue.trim());
    payload.set(content.emailFields.screenSize, fields.screenSize);
    payload.set(content.emailFields.message, fields.message.trim());
    payload.set(content.emailFields.consent, content.yes);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const json = (await res.json()) as { success: boolean };
      if (json.success) {
        setFormState("success");
      } else {
        setFormState("idle");
        setSubmitError(
          content.submitError,
        );
        setTimeout(() => submitErrorRef.current?.focus(), 0);
      }
    } catch {
      setFormState("idle");
      setSubmitError(
        content.submitError,
      );
      setTimeout(() => submitErrorRef.current?.focus(), 0);
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center py-14 px-4">
        <CheckCircle2 size={48} className="text-lsh-blue" aria-hidden="true" />
        <h3 className="font-heading font-bold uppercase text-white text-2xl leading-tight">
          {content.successHeading}
        </h3>
        <p className="text-[var(--lsh-grey-300)] text-[0.9375rem] leading-relaxed max-w-xs">
          {content.successMessage}
        </p>
        <button
          onClick={handleReset}
          className={cn(
            "mt-2 inline-flex items-center gap-2 h-[40px] px-6",
            "bg-transparent border border-[var(--lsh-border-dark)] text-[var(--lsh-grey-300)]",
            "text-[0.875rem] font-medium rounded-[3px] transition-colors",
            "hover:border-lsh-blue hover:text-white",
            "focus:outline-none focus:ring-2 focus:ring-lsh-blue focus:ring-offset-2",
            "focus:ring-offset-[var(--lsh-charcoal)]",
          )}
        >
          {content.reset}
        </button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate aria-label={content.ariaLabel}>
      {/* Honeypot - invisible to real users */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        {/* ── Group: Your Details ── */}
        <p className={groupHeading}>{content.groups.details}</p>

        {/* Full Name */}
        <div>
          <FLabel htmlFor={`${id}-name`} required>
            {content.fields.name}
          </FLabel>
          <input
            ref={nameRef}
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            aria-describedby={errors.name ? `${id}-name-e` : undefined}
            aria-invalid={errors.name ? "true" : undefined}
            className={cn(inputBase, errors.name && inputErr)}
          />
          <FError id={`${id}-name-e`}>{errors.name}</FError>
        </div>

        {/* Email */}
        <div>
          <FLabel htmlFor={`${id}-email`} required>
            {content.fields.email}
          </FLabel>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? `${id}-email-e` : undefined}
            aria-invalid={errors.email ? "true" : undefined}
            className={cn(inputBase, errors.email && inputErr)}
          />
          <FError id={`${id}-email-e`}>{errors.email}</FError>
        </div>

        {/* Phone */}
        <div>
          <FLabel htmlFor={`${id}-phone`} required>
            {content.fields.phone}
          </FLabel>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-describedby={errors.phone ? `${id}-phone-e` : undefined}
            aria-invalid={errors.phone ? "true" : undefined}
            className={cn(inputBase, errors.phone && inputErr)}
          />
          <FError id={`${id}-phone-e`}>{errors.phone}</FError>
        </div>

        {/* Event Type */}
        <div>
          <FLabel htmlFor={`${id}-event-type`} required>
            {content.fields.eventType}
          </FLabel>
          <select
            id={`${id}-event-type`}
            name="eventType"
            value={eventType}
            onChange={(event) => setEventType(event.target.value)}
            aria-describedby={errors.eventType ? `${id}-et-e` : undefined}
            aria-invalid={errors.eventType ? "true" : undefined}
            className={cn(
              inputBase,
              "cursor-pointer [color-scheme:dark]",
              !eventType && "text-[var(--lsh-grey-500)]",
              errors.eventType && inputErr,
            )}
          >
            <option value="" disabled>
              {content.eventTypePlaceholder}
            </option>
            {content.eventTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FError id={`${id}-et-e`}>{errors.eventType}</FError>
        </div>

        {/* ── Group: Event Information ── */}
        <p className={groupHeading}>{content.groups.event}</p>

        {/* Event Date */}
        <div>
          <FLabel htmlFor={`${id}-date`} required>
            {content.fields.eventDate}
          </FLabel>
          <input
            id={`${id}-date`}
            name="eventDate"
            type="date"
            min={toDateInputValue(new Date())}
            value={toDateInputValue(eventDate)}
            onChange={(event) =>
              setEventDate(fromDateInputValue(event.target.value))
            }
            aria-describedby={errors.eventDate ? `${id}-date-e` : undefined}
            aria-invalid={errors.eventDate ? "true" : undefined}
            className={cn(
              inputBase,
              "[color-scheme:dark]",
              !eventDate && "text-[var(--lsh-grey-500)]",
              errors.eventDate && inputErr,
            )}
          />
          <FError id={`${id}-date-e`}>{errors.eventDate}</FError>
        </div>

        {/* Venue */}
        <div>
          <FLabel htmlFor={`${id}-venue`} required>
            {content.fields.venue}
          </FLabel>
          <input
            id={`${id}-venue`}
            name="venue"
            type="text"
            maxLength={150}
            placeholder={content.fields.venuePlaceholder}
            autoComplete="off"
            aria-describedby={errors.venue ? `${id}-venue-e` : undefined}
            aria-invalid={errors.venue ? "true" : undefined}
            className={cn(inputBase, errors.venue && inputErr)}
          />
          <FError id={`${id}-venue-e`}>{errors.venue}</FError>
        </div>

        {/* Screen Size - full width */}
        <div className="sm:col-span-2">
          <FLabel htmlFor={`${id}-screen-size`} required>
            {content.fields.screenSize}
          </FLabel>
          <select
            id={`${id}-screen-size`}
            name="screenSize"
            value={screenSize}
            onChange={(event) => setScreenSize(event.target.value)}
            aria-describedby={errors.screenSize ? `${id}-ss-e` : undefined}
            aria-invalid={errors.screenSize ? "true" : undefined}
            className={cn(
              inputBase,
              "cursor-pointer [color-scheme:dark]",
              !screenSize && "text-[var(--lsh-grey-500)]",
              errors.screenSize && inputErr,
            )}
          >
            <option value="" disabled>
              {content.screenSizePlaceholder}
            </option>
            {content.screenSizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FError id={`${id}-ss-e`}>{errors.screenSize}</FError>
        </div>

        {/* Message - full width */}
        <div className="sm:col-span-2">
          <FLabel htmlFor={`${id}-msg`} required>
            {content.fields.message}
          </FLabel>
          <textarea
            id={`${id}-msg`}
            name="message"
            rows={5}
            maxLength={1500}
            placeholder={content.fields.messagePlaceholder}
            aria-describedby={errors.message ? `${id}-msg-e` : undefined}
            aria-invalid={errors.message ? "true" : undefined}
            className={cn(
              inputBase,
              "h-auto py-3 resize-y min-h-[130px]",
              errors.message && inputErr,
            )}
          />
          <FError id={`${id}-msg-e`}>{errors.message}</FError>
        </div>

        {/* Consent - full width */}
        <div className="sm:col-span-2 flex flex-col gap-1">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id={`${id}-consent`}
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              aria-describedby={errors.consent ? `${id}-consent-e` : undefined}
              aria-invalid={errors.consent ? "true" : undefined}
              className={cn(
                "mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[var(--lsh-blue)]",
                errors.consent && "border-red-500",
              )}
            />
            <label
              htmlFor={`${id}-consent`}
              className="text-[0.875rem] text-[var(--lsh-grey-300)] leading-snug cursor-pointer"
            >
              {content.consent}
              <span className="text-red-400 ml-0.5" aria-hidden="true">
                *
              </span>
            </label>
          </div>
          <FError id={`${id}-consent-e`}>{errors.consent}</FError>
          <p className="text-[0.725rem] text-[var(--lsh-grey-500)] leading-snug ml-[calc(18px+0.75rem)]">
            {content.privacyPrefix}{" "}
            <Link href="/privacy" className="text-lsh-blue hover:underline">
              {content.privacyLink}
            </Link>
            . {content.privacySuffix}
          </p>
        </div>

        {/* Inline submit error - full width */}
        {submitError && (
          <div
            ref={submitErrorRef}
            role="alert"
            tabIndex={-1}
            className="sm:col-span-2 flex items-start gap-3 p-3.5 rounded-[3px] bg-red-950/60 border border-red-700/60 focus:outline-none"
          >
            <AlertTriangle
              size={16}
              className="shrink-0 mt-0.5 text-red-400"
              aria-hidden="true"
            />
            <p className="text-[0.875rem] text-red-300 leading-snug">
              {submitError}
            </p>
          </div>
        )}

        {/* Submit - full width */}
        <div className="sm:col-span-2 pt-1">
          <button
            type="submit"
            disabled={formState === "loading"}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-[46px] px-8 w-full sm:w-auto",
              "bg-lsh-blue hover:bg-[var(--lsh-blue-hover)] text-white text-[0.9375rem] font-semibold",
              "rounded-[3px] transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-lsh-blue focus:ring-offset-2",
              "focus:ring-offset-[var(--lsh-charcoal)]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            )}
          >
            {formState === "loading" ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                  aria-hidden="true"
                />
                {content.submitting}
              </>
            ) : (
              <>
                {content.submit}
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function FLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={labelBase}>
      {children}
      {required && (
        <span className="text-red-400 ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FError({ id, children }: { id?: string; children?: string }) {
  if (!children) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1 text-[0.75rem] text-red-400 leading-tight"
    >
      {children}
    </p>
  );
}
