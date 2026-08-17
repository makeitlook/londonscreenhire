import { NextRequest, NextResponse } from "next/server";
import homeContent from "@/content/home.json";

/**
 * Markdown Content Negotiation Endpoint (Markdown for Agents).
 * Converts HTML pages to Markdown when Accept: text/markdown is specified.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 * @see https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md
 */
export async function GET(request: NextRequest) {
  let path = "/";
  try {
    path = request.nextUrl?.searchParams?.get("path") || "/";
  } catch {
    path = "/";
  }

  let host = "www.londonscreenhire.com";
  let protocol = "https";
  try {
    host = request.headers.get("host") || "www.londonscreenhire.com";
    protocol = request.headers.get("x-forwarded-proto") || "https";
  } catch {
    // static prerender fallback
  }
  const targetUrl = `${protocol}://${host}${path}`;

  let markdown = "";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "X-Bypass-Markdown": "true",
        Accept: "text/html",
      },
    });

    if (response.ok) {
      const html = await response.text();
      markdown = convertHtmlToMarkdown(html);
    } else {
      markdown = generateFallbackMarkdown(path);
    }
  } catch (error) {
    markdown = generateFallbackMarkdown(path);
  }

  const tokenCount = Math.ceil(markdown.length / 4);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": tokenCount.toString(),
      "X-Markdown-Tokens": tokenCount.toString(),
      "Cache-Control": "public, max-age=60",
      Vary: "Accept",
    },
  });
}

function convertHtmlToMarkdown(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n\n# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "\n\n#### $1\n\n")
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "\n\n##### $1\n\n")
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "\n\n###### $1\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "\n$1\n")
    .replace(/<br\s*[/]?>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "_$1_")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "_$1_")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, "-")
    .replace(/&copy;/g, "©")
    .replace(/^[ \t]+/gm, "")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

function generateFallbackMarkdown(path: string): string {
  const title = homeContent.hero?.headingLines?.join(" ") || "London Screen Hire — LED Screen & AV Hire in London";
  const subtitle = homeContent.hero?.description || "Professional LED screen hire, video wall rental, and audio-visual equipment hire in London and across the UK.";

  return `# ${title}

${subtitle}

## Service Overview

London Screen Hire provides high-resolution indoor and outdoor LED screens, video walls, stage lighting, and complete audio-visual production services for corporate events, exhibitions, conferences, and weddings.

## Key Services

- **Indoor LED Screen Hire**: Ultra-fine pitch LED panels for conferences, exhibitions, and corporate presentations.
- **Outdoor LED Screen Hire**: Weather-proof IP65 high-brightness outdoor displays for festivals, sports events, and outdoor cinema.
- **Conference AV & Stage Hire**: Audio visual packages, PA systems, microphony, and custom stage structures.
- **Lighting Hire**: Moving heads, uplighting, ambient stage lighting, and DMX lighting control systems.

## Contact & Quote Request

- **Website**: https://www.londonscreenhire.com/
- **Quote Form**: https://www.londonscreenhire.com/#quote
- **Email**: info@londonscreenhire.com
- **Path**: ${path}
`;
}
