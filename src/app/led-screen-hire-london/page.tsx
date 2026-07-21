import { getServiceBySlug, getRelatedServices } from "@/data/services";
import ServicePageTemplate from "@/components/service-pages/service-page-template";
import { createServiceMetadata } from "@/lib/service-metadata";

const service = getServiceBySlug("led-screen-hire-london")!;

export const metadata = createServiceMetadata(service);

export default function LedScreenHireLondonPage() {
  const related = getRelatedServices(service.relatedSlugs);
  return <ServicePageTemplate service={service} relatedServices={related} />;
}
