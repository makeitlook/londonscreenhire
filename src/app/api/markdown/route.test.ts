import { describe, it, expect } from "vitest";
import { GET as getMarkdown } from "./route";
import { NextRequest } from "next/server";

describe("Markdown for Agents Content Negotiation", () => {
  it("GET /api/markdown returns text/markdown with x-markdown-tokens header", async () => {
    const req = new NextRequest("https://www.londonscreenhire.com/api/markdown?path=/");
    const response = await getMarkdown(req);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    expect(response.headers.get("x-markdown-tokens")).toBeDefined();
    expect(response.headers.get("Vary")).toContain("Accept");

    const text = await response.text();
    expect(text).toContain("London Screen Hire");
    expect(text.length).toBeGreaterThan(0);

    const tokens = parseInt(response.headers.get("x-markdown-tokens") || "0", 10);
    expect(tokens).toBeGreaterThan(0);
  });

  it("GET /api/markdown?path=/conference-led-screen-hire returns valid markdown content", async () => {
    const req = new NextRequest(
      "https://www.londonscreenhire.com/api/markdown?path=/conference-led-screen-hire"
    );
    const response = await getMarkdown(req);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    const text = await response.text();
    expect(text).toContain("LED Screen");
  });
});
