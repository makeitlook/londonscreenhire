import { NextResponse } from "next/server";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * MCP Server Card (SEP-1649)
 * Served at /.well-known/mcp/server-card.json
 */
export async function GET() {
  const card = {
    $schema:
      "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/schemas/server-card.json",
    serverInfo: {
      name: SITE_NAME,
      version: "1.0.0",
      description:
        "London Screen Hire — Professional LED Screen, TV, Projector, Video Wall & AV Equipment Hire in London and the UK.",
    },
    transport: null,
    capabilities: {
      tools: false,
      resources: false,
      prompts: false,
    },
    contact: {
      website: `${SITE_URL}/`,
      email: "info@londonscreenhire.com",
    },
    documentation: `${SITE_URL}/llms.txt`,
    agentSkills: `${SITE_URL}/.well-known/agent-skills/index.json`,
  };

  return new NextResponse(JSON.stringify(card, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
