import type { MetadataRoute } from "next";
import siteContent from "@/content/site.json";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Screen Hire",
    description: siteContent.homeMetadata.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d12",
    theme_color: "#0a0d12",
    icons: [
      {
        src: siteContent.icons.android192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteContent.icons.android512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
