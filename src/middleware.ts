import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge Middleware for agent discovery.
 *
 * 1. Markdown for Agents (RFC / Cloudflare spec):
 *    Requests with Accept: text/markdown, or from known AI bot user-agents
 *    that do NOT explicitly want HTML, are rewritten to /api/markdown?path=<pathname>.
 *
 * 2. Link response headers (RFC 8288):
 *    Adds Link headers on every HTML response pointing agents to discovery resources.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, Next.js internals, API routes, and well-known endpoints.
  // The X-Bypass-Markdown header prevents recursive markdown fetching.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/.well-known/") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2|ttf|otf|css|js|txt|md|json|xml|webmanifest)$/) ||
    request.headers.get("X-Bypass-Markdown") === "true"
  ) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept") || "";
  const userAgent = request.headers.get("user-agent") || "";

  // Known AI bots and crawlers that prefer structured content
  const AI_BOTS = [
    "GPTBot",
    "ChatGPT",
    "ClaudeBot",
    "Claude-Web",
    "Anthropic",
    "Perplexity",
    "PerplexityBot",
    "Google-Extended",
    "OAI-SearchBot",
    "CCBot",
    "cohere-ai",
    "Diffbot",
    "YouBot",
    "Bytespider",
  ];

  const isAiBot = AI_BOTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase()),
  );

  const explicitlyWantsHtml = accept.includes("text/html");
  const explicitlyWantsMarkdown = accept.includes("text/markdown");
  const wantsMarkdown =
    explicitlyWantsMarkdown || (isAiBot && !explicitlyWantsHtml);

  // Rewrite to markdown conversion endpoint (Vercel serverless function: api/markdown.js)
  if (wantsMarkdown) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  // For normal HTML requests: add Link discovery headers (RFC 8288)
  const response = NextResponse.next();

  const linkHeader = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</llms.txt>; rel="describedby"',
    '</auth.md>; rel="auth"',
    '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
    '</.well-known/agent-skills/index.json>; rel="agent-skills"',
    '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  ].join(", ");

  response.headers.set("Link", linkHeader);

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
