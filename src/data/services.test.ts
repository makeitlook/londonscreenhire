import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import navigation from "@/content/navigation.json";
import hub from "@/content/service-hub.json";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/site";

describe("service page discovery", () => {
  it("gives every service a route, unique metadata and valid related services", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(services.length);
    expect(new Set(services.map((service) => service.metaTitle)).size).toBe(services.length);
    expect(new Set(services.map((service) => service.metaDescription)).size).toBe(services.length);
    for (const service of services) {
      expect(existsSync(`src/app/${service.slug}/page.tsx`)).toBe(true);
      for (const image of [service.heroImage, service.showcaseImage, service.ctaImage]) {
        expect(existsSync(`public${image}`)).toBe(true);
      }
      for (const slug of service.relatedSlugs) {
        expect(slugs).toContain(slug);
        expect(slug).not.toBe(service.slug);
      }
      for (const benefit of service.benefits) expect(benefit.icon).toBeDefined();
    }
  });

  it("includes every service once in the hub and menu, and in the sitemap", () => {
    const expected = services.map((service) => service.slug).sort();
    expect(hub.groups.flatMap((group) => group.slugs).sort()).toEqual(expected);
    expect(navigation.header.serviceGroups.flatMap((group) => group.slugs).sort()).toEqual(expected);
    const urls = sitemap().map((entry) => entry.url);
    for (const slug of ["screen-hire", ...expected]) {
      expect(urls).toContain(`${SITE_URL}/${slug}`);
    }
  });
});
