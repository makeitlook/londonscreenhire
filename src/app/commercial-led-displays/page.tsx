import { getServiceBySlug, getRelatedServices } from "@/data/services";
import ServicePageTemplate from "@/components/service-pages/service-page-template";
import { createServiceMetadata } from "@/lib/service-metadata";

const service = getServiceBySlug("commercial-led-displays")!;

export const metadata = createServiceMetadata(service);

export default function CommercialLedDisplaysPage() {
  const related = getRelatedServices(service.relatedSlugs);
  return <ServicePageTemplate service={service} relatedServices={related} />;
}
