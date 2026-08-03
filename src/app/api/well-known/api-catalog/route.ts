import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * RFC 9727 API Catalog
 * Served at /.well-known/api-catalog
 * Content-Type: application/linkset+json
 */
export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${SITE_URL}/`,
        "service-doc": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/plain",
          },
        ],
        describedby: [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/plain",
          },
        ],
        status: [
          {
            href: `${SITE_URL}/`,
            type: "text/html",
          },
        ],
        "agent-skills": [
          {
            href: `${SITE_URL}/.well-known/agent-skills/index.json`,
            type: "application/json",
          },
        ],
        "mcp-server-card": [
          {
            href: `${SITE_URL}/.well-known/mcp/server-card.json`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
