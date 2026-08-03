"use client";

import { useEffect } from "react";

/**
 * WebMCP Provider — exposes site tools to AI agents via the browser.
 * Uses the navigator.modelContext API (WebMCP, Chrome experimental).
 * Silently no-ops on browsers that do not support the API.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 * @see https://developer.chrome.com/blog/webmcp-epp
 */
export default function WebMcpProvider() {
  useEffect(() => {
    // navigator.modelContext is only available in Chrome with WebMCP flag enabled
    if (
      typeof navigator === "undefined" ||
      !("modelContext" in navigator) ||
      typeof (navigator as unknown as { modelContext?: { provideContext: unknown } }).modelContext?.provideContext !== "function"
    ) {
      return;
    }

    const modelContext = (
      navigator as unknown as {
        modelContext: {
          provideContext: (ctx: unknown) => void;
        };
      }
    ).modelContext;

    modelContext.provideContext({
      tools: [
        {
          name: "request_quote",
          description:
            "Navigate to the quote request form to enquire about LED screen hire, AV equipment hire, or event technology services from London Screen Hire.",
          inputSchema: {
            type: "object",
            properties: {
              service: {
                type: "string",
                description:
                  "The service being enquired about, e.g. 'LED screen hire', 'projector hire', 'video wall hire'.",
              },
              eventType: {
                type: "string",
                description:
                  "The type of event, e.g. 'conference', 'exhibition', 'wedding', 'corporate event'.",
              },
              eventDate: {
                type: "string",
                description: "The approximate date of the event (ISO 8601 format or free text).",
              },
            },
            required: [],
          },
          execute: async (input: Record<string, string>) => {
            const params = new URLSearchParams();
            if (input.service) params.set("service", input.service);
            if (input.eventType) params.set("eventType", input.eventType);
            if (input.eventDate) params.set("eventDate", input.eventDate);

            const hash = params.toString() ? `#quote?${params}` : "#quote";
            window.location.href = hash;

            return { success: true, redirected_to: hash };
          },
        },
        {
          name: "browse_services",
          description:
            "Get a list of all available hire services offered by London Screen Hire.",
          inputSchema: {
            type: "object",
            properties: {},
            required: [],
          },
          execute: async () => {
            return {
              services: [
                {
                  name: "LED Screen Hire",
                  url: "https://www.londonscreenhire.com/led-screen-hire-london",
                },
                {
                  name: "Indoor LED Screen Hire",
                  url: "https://www.londonscreenhire.com/indoor-led-screen-hire",
                },
                {
                  name: "Outdoor LED Screen Hire",
                  url: "https://www.londonscreenhire.com/outdoor-led-screen-hire",
                },
                {
                  name: "Conference AV Hire",
                  url: "https://www.londonscreenhire.com/corporate-av-hire",
                },
                {
                  name: "Exhibition Screen Hire",
                  url: "https://www.londonscreenhire.com/exhibition-led-screen-hire",
                },
                {
                  name: "Conference LED Screen Hire",
                  url: "https://www.londonscreenhire.com/conference-led-screen-hire",
                },
                {
                  name: "Wedding LED Screen Hire",
                  url: "https://www.londonscreenhire.com/wedding-led-screen-hire",
                },
                {
                  name: "Stage Hire",
                  url: "https://www.londonscreenhire.com/stage-hire",
                },
                {
                  name: "Lighting Hire",
                  url: "https://www.londonscreenhire.com/lighting-hire",
                },
              ],
            };
          },
        },
        {
          name: "get_contact_info",
          description:
            "Get contact information for London Screen Hire including phone, email, and address.",
          inputSchema: {
            type: "object",
            properties: {},
            required: [],
          },
          execute: async () => {
            return {
              name: "London Screen Hire",
              website: "https://www.londonscreenhire.com/",
              email: "info@londonscreenhire.com",
              phone: "+44 7946098813",
              quoteForm: "https://www.londonscreenhire.com/#quote",
              serviceArea: "London and the UK",
            };
          },
        },
      ],
    });
  }, []);

  // Renders nothing — purely a side-effect component
  return null;
}
