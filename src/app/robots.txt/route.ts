import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}

# Content Signals (https://contentsignals.org/)
# ai-train: no  — do not use our content to train AI models
# search: yes   — allow indexing for search
# ai-input: no  — do not use our content as direct AI prompt input
Content-Signal: ai-train=no, search=yes, ai-input=no
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
