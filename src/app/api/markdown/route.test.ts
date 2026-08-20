import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET as getMarkdown } from "./route";
import { NextRequest } from "next/server";

describe("Markdown for Agents Content Negotiation", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("converts fetched HTML to Markdown successfully", async () => {
    const mockHtml = `
      <html>
        <body>
          <h1>London Screen Hire Test Page</h1>
          <p>Welcome to <strong>London Screen Hire</strong> with a <a href="/services">services link</a>.</p>
        </body>
      </html>
    `;

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml,
    } as Response);

    const req = new NextRequest("https://www.londonscreenhire.com/api/markdown?path=/");
    const response = await getMarkdown(req);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    expect(response.headers.get("x-markdown-tokens")).toBeDefined();
    expect(response.headers.get("Vary")).toContain("Accept");

    const markdown = await response.text();
    expect(markdown).toContain("# London Screen Hire Test Page");
    expect(markdown).toContain("**London Screen Hire**");
    expect(markdown).toContain("[services link](/services)");

    const tokens = parseInt(response.headers.get("x-markdown-tokens") || "0", 10);
    expect(tokens).toBeGreaterThan(0);
  });

  it("handles fetch failure gracefully and returns fallback markdown content", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const req = new NextRequest(
      "https://www.londonscreenhire.com/api/markdown?path=/conference-led-screen-hire"
    );
    const response = await getMarkdown(req);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    const markdown = await response.text();
    expect(markdown).toContain("London Screen Hire");
    expect(markdown).toContain("/conference-led-screen-hire");
  });
});
