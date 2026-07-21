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
  const staticRoutes: MetadataRoute.Sitemap = [{ url: SITE_URL }];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/${service.slug}`,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
