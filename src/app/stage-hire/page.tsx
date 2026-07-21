import type { Metadata } from "next";
import { getServiceBySlug, getRelatedServices } from "@/data/services";
import ServicePageTemplate from "@/components/service-pages/service-page-template";
import { SITE_URL } from "@/lib/site";

const service = getServiceBySlug("stage-hire")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/stage-hire`,
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `${SITE_URL}/stage-hire`,
    siteName: "London Screen Hire",
    locale: "en_GB",
    type: "website",
  },
};

export default function StageHirePage() {
  const related = getRelatedServices(service.relatedSlugs);
  return <ServicePageTemplate service={service} relatedServices={related} />;
}
