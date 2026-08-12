import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * OAuth Authorization Server Metadata (RFC 8414)
 * Served at /.well-known/oauth-authorization-server
 * See: https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md
 */
export async function GET() {
  const metadata = {
    issuer: SITE_URL,
    scopes_supported: ["public", "read"],
    response_types_supported: [],
    grant_types_supported: [],
    token_endpoint_auth_methods_supported: ["none"],
    service_documentation: `${SITE_URL}/auth.md`,
    op_policy_uri: `${SITE_URL}/privacy`,
    op_tos_uri: `${SITE_URL}/terms`,
    ui_locales_supported: ["en-GB"],
    agent_auth: {
      skill: "https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md",
      register_uri: null,
      identity_types_supported: ["anonymous", "public"],
      credential_types_supported: ["none"],
      anonymous: {
        credential_types_supported: ["none"],
        claim_uri: null,
      },
      identity_types: ["anonymous", "public"],
      credential_types: ["none"],
      claim_uri: null,
      claim_url: null,
      revocation_uri: null,
      revocation_url: null,
      notes: "No agent registration required. All site resources and AI discovery endpoints are publicly accessible.",
    },
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
