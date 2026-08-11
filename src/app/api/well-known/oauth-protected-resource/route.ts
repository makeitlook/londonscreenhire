import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * OAuth Protected Resource Metadata (RFC 9728)
 * Served at /.well-known/oauth-protected-resource
 * See: https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md
 */
export async function GET() {
  const metadata = {
    resource: `${SITE_URL}/`,
    authorization_servers: [SITE_URL],
    bearer_methods_supported: ["header"],
    scopes_supported: ["public", "read"],
    resource_documentation: `${SITE_URL}/auth.md`,
    resource_policy_uri: `${SITE_URL}/privacy`,
    tls_client_certificate_bound_access_tokens: false,
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
