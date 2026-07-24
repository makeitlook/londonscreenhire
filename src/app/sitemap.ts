import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { services } from "@/data/services";

export const dynamic = "force-static";

/**
 * Generates /sitemap.xml via Next.js App Router.
 * Works with static export (output: "export").
 *
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
