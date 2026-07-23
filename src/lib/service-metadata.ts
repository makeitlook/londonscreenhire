import type { Metadata } from "next";
import type { ServicePage } from "@/data/services";
import siteContent from "@/content/site.json";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type ServiceMetadataSource = Pick<
  ServicePage,
  "slug" | "metaTitle" | "metaDescription" | "heroImage" | "heroAlt"
>;

/** Keep canonical, Open Graph and X/Twitter metadata consistent across services. */
export function createServiceMetadata(
  service: ServiceMetadataSource,
): Metadata {
  const pageUrl = `${SITE_URL}/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: siteContent.socialLocale,
      type: "website",
      images: [{ url: service.heroImage, alt: service.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.heroImage],
    },
  };
}
