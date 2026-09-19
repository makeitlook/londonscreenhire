import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  GA_MEASUREMENT_ID,
  GA_TRACKING_ID,
  GTM_ID,
  LEAD_CONVERSION_SEND_TO,
  CONSENT_STORAGE_KEY,
  CONVERSION_PROVIDER,
  trackLeadConversion,
} from "@/lib/gtag";

describe("gtag tracking and consent handling", () => {
  let mockDataLayer: unknown[];
  let mockGtag: ReturnType<typeof vi.fn>;
  let mockStorage: Record<string, string>;

  beforeEach(() => {
    mockStorage = {};
    mockDataLayer = [];
    mockGtag = vi.fn();

    const mockWindow = {
      dataLayer: mockDataLayer,
      gtag: mockGtag,
    };

    const mockLocalStorage = {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
    };

    vi.stubGlobal("window", mockWindow);
    vi.stubGlobal("localStorage", mockLocalStorage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("exports valid tracking constants and versioned consent key", () => {
    expect(GA_MEASUREMENT_ID).toBe("G-FQPFHDB4ZM");
    expect(GA_TRACKING_ID).toBe("AW-18422810681");
    expect(GTM_ID).toBe("GTM-5V42SDFR");
    expect(LEAD_CONVERSION_SEND_TO).toBe("AW-18422810681/V4a1CKj5g-wcELmQ19BE");
    expect(CONSENT_STORAGE_KEY).toBe("lsh-tracking-consent-v2");
    expect(["gtm", "gtag"]).toContain(CONVERSION_PROVIDER);
  });

  it("does not fire conversion if consent has not been given (null)", () => {
    trackLeadConversion();

    expect(mockDataLayer).toHaveLength(0);
    expect(mockGtag).not.toHaveBeenCalled();
  });

  it("does not fire conversion if consent was declined", () => {
    mockStorage[CONSENT_STORAGE_KEY] = "declined";

    trackLeadConversion();

    expect(mockDataLayer).toHaveLength(0);
    expect(mockGtag).not.toHaveBeenCalled();
  });

  it("routes conversion exclusively through gtag when provider is 'gtag'", () => {
    mockStorage[CONSENT_STORAGE_KEY] = "accepted";

    trackLeadConversion("gtag");

    // Calls gtag
    expect(mockGtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
    });

    // Does NOT push to dataLayer (preventing duplicate GTM tags)
    expect(mockDataLayer).toHaveLength(0);

    // Ensures INR currency or hardcoded arbitrary values are NOT sent
    const gtagCalls = mockGtag.mock.calls;
    const conversionCallPayload = gtagCalls[0][2] as Record<string, unknown>;
    expect(conversionCallPayload).not.toHaveProperty("currency", "INR");
    expect(conversionCallPayload).not.toHaveProperty("value", 1.0);
  });

  it("routes conversion exclusively through GTM dataLayer when provider is 'gtm'", () => {
    mockStorage[CONSENT_STORAGE_KEY] = "accepted";

    trackLeadConversion("gtm");

    // Pushes to dataLayer for GTM tag configuration
    expect(mockDataLayer).toContainEqual({
      event: "lead_form_submission",
      conversion_id: LEAD_CONVERSION_SEND_TO,
    });

    // Does NOT call gtag (preventing duplicate conversion count)
    expect(mockGtag).not.toHaveBeenCalled();
  });

  it("safely exits in a non-browser / SSR environment without throwing", () => {
    vi.stubGlobal("window", undefined);

    expect(() => trackLeadConversion()).not.toThrow();
  });
});
