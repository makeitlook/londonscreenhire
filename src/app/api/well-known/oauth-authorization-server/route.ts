import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * OAuth Authorization Server Metadata (RFC 8414)
 * Also satisfies OpenID Connect Discovery 1.0
 * Served at /.well-known/oauth-authorization-server
 */
export async function GET() {
  const metadata = {
    issuer: SITE_URL,
    authorization_endpoint: `${SITE_URL}/oauth/authorize`,
    token_endpoint: `${SITE_URL}/oauth/token`,
    jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
    scopes_supported: ["openid"],
    response_types_supported: [],
    grant_types_supported: [],
    token_endpoint_auth_methods_supported: [],
    service_documentation: `${SITE_URL}/llms.txt`,
    op_policy_uri: `${SITE_URL}/privacy`,
    op_tos_uri: `${SITE_URL}/terms`,
    ui_locales_supported: ["en-GB"],
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
