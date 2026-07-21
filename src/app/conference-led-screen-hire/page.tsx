import type { Metadata } from "next";
import { getServiceBySlug, getRelatedServices } from "@/data/services";
import ServicePageTemplate from "@/components/service-pages/service-page-template";
import { SITE_URL } from "@/lib/site";

const service = getServiceBySlug("conference-led-screen-hire")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/conference-led-screen-hire`,
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `${SITE_URL}/conference-led-screen-hire`,
    siteName: "London Screen Hire",
    locale: "en_GB",
    type: "website",
  },
};

export default function ConferenceLedScreenHirePage() {
  const related = getRelatedServices(service.relatedSlugs);
  return <ServicePageTemplate service={service} relatedServices={related} />;
}
