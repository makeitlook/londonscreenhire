/**
 * Vercel Serverless Function: Markdown for Agents
 *
 * Lives in /api/markdown.js (top-level /api/ directory) — handled by Vercel
 * as a serverless function independently of the Next.js static export.
 *
 * Fetches the requested page as HTML and converts it to Markdown.
 * Called by middleware when a request carries Accept: text/markdown
 * or comes from a known AI bot user-agent.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
export default async function handler(req, res) {
  const { path = "/" } = req.query;

  // Build absolute URL from Vercel-injected headers
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["host"] || "www.londonscreenhire.com";
  const targetUrl = `${protocol}://${host}${path}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        // Prevent recursive middleware processing
        "X-Bypass-Markdown": "true",
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      res.status(response.status).send(`Error fetching page: ${response.statusText}`);
      return;
    }

    const html = await response.text();

    // Convert HTML to Markdown progressively
    const markdown = html
      // Remove non-content elements
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      // Headings
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n\n# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n\n## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n\n### $1\n\n")
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "\n\n#### $1\n\n")
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "\n\n##### $1\n\n")
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "\n\n###### $1\n\n")
      // Paragraphs and breaks
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "\n$1\n")
      .replace(/<br\s*[/]?>/gi, "\n")
      // Lists
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      // Links
      .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      // Bold / italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "_$1_")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "_$1_")
      // Strip remaining tags
      .replace(/<[^>]+>/g, "")
      // Decode common HTML entities
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
      // Clean up excess whitespace
      .replace(/^[ \t]+/gm, "")
      .replace(/\n\s*\n\s*\n+/g, "\n\n")
      .trim();

    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("Vary", "Accept");
    res.status(200).send(markdown);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error}`);
  }
}
