import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Agent Skills Discovery Index (RFC v0.2.0)
 * Served at /.well-known/agent-skills/index.json
 */
export async function GET() {
  const skills = {
    $schema: "https://agentskills.io/schema/index.json",
    version: "0.2.0",
    skills: [
      {
        name: "request_quote",
        type: "action",
        description:
          "Request a quote for LED screen hire, AV equipment hire, or event technology services from London Screen Hire.",
        url: `${SITE_URL}/#quote`,
        digest: "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
      },
      {
        name: "browse_services",
        type: "resource",
        description:
          "Browse all available LED screen, projector, TV, and AV equipment hire services.",
        url: `${SITE_URL}/llms.txt`,
        digest: "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
      },
      {
        name: "read_markdown",
        type: "resource",
        description:
          "Read site content in Markdown format by sending Accept: text/markdown.",
        url: `${SITE_URL}/api/markdown?path=/`,
        digest: "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
      },
    ],
  };

  return new NextResponse(JSON.stringify(skills, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
