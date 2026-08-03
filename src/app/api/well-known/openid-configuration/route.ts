import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * OpenID Connect Discovery 1.0
 * Served at /.well-known/openid-configuration
 */
export async function GET() {
  const config = {
    issuer: SITE_URL,
    authorization_endpoint: `${SITE_URL}/oauth/authorize`,
    token_endpoint: `${SITE_URL}/oauth/token`,
    jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
    userinfo_endpoint: `${SITE_URL}/oauth/userinfo`,
    response_types_supported: [],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    grant_types_supported: [],
    scopes_supported: ["openid"],
    claims_supported: ["sub", "iss"],
    service_documentation: `${SITE_URL}/llms.txt`,
    op_policy_uri: `${SITE_URL}/privacy`,
    op_tos_uri: `${SITE_URL}/terms`,
    ui_locales_supported: ["en-GB"],
  };

  return new NextResponse(JSON.stringify(config, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
