import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * OAuth Protected Resource Metadata (RFC 9728)
 * Served at /.well-known/oauth-protected-resource
 */
export async function GET() {
  const metadata = {
    resource: `${SITE_URL}/`,
    authorization_servers: [],
    bearer_methods_supported: [],
    scopes_supported: [],
    resource_documentation: `${SITE_URL}/llms.txt`,
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
