import type { Metadata } from "next";
import { getServiceBySlug, getRelatedServices } from "@/data/services";
import ServicePageTemplate from "@/components/service-pages/service-page-template";
import { SITE_URL } from "@/lib/site";

const service = getServiceBySlug("exhibition-led-screen-hire")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/exhibition-led-screen-hire`,
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `${SITE_URL}/exhibition-led-screen-hire`,
    siteName: "London Screen Hire",
    locale: "en_GB",
    type: "website",
  },
};

export default function ExhibitionLedScreenHirePage() {
  const related = getRelatedServices(service.relatedSlugs);
  return <ServicePageTemplate service={service} relatedServices={related} />;
}
