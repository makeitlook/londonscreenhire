import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * DNS-AID HTTPS endpoint for DNS-based agent discovery.
 * Referenced by DNS SVCB/HTTPS records:
 *   _index._agents.londonscreenhire.com. IN HTTPS 1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agents"
 *   _a2a._agents.londonscreenhire.com.   IN HTTPS 1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agent-skills/index.json"
 *
 * See: https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/
 */
export async function GET() {
  const index = {
    version: "1.0",
    domain: "londonscreenhire.com",
    description:
      "London Screen Hire — LED Screen, AV & Event Technology Hire in London and the UK.",
    endpoints: [
      {
        type: "api-catalog",
        rel: "api-catalog",
        url: `${SITE_URL}/.well-known/api-catalog`,
        contentType: "application/linkset+json",
      },
      {
        type: "agent-skills",
        rel: "agent-skills",
        url: `${SITE_URL}/.well-known/agent-skills/index.json`,
        contentType: "application/json",
      },
      {
        type: "mcp-server-card",
        rel: "mcp-server-card",
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        contentType: "application/json",
      },
      {
        type: "oauth-protected-resource",
        rel: "oauth-protected-resource",
        url: `${SITE_URL}/.well-known/oauth-protected-resource`,
        contentType: "application/json",
      },
      {
        type: "llms",
        rel: "describedby",
        url: `${SITE_URL}/llms.txt`,
        contentType: "text/plain",
      },
      {
        type: "markdown",
        rel: "alternate",
        url: `${SITE_URL}/api/markdown?path=/`,
        contentType: "text/markdown",
      },
    ],
  };

  return new NextResponse(JSON.stringify(index, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
