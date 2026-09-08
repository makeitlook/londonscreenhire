import { getServiceBySlug, getRelatedServices } from "@/data/services";
import ServicePageTemplate from "@/components/service-pages/service-page-template";
import { createServiceMetadata } from "@/lib/service-metadata";

const service = getServiceBySlug("speaker-hire-london")!;

export const metadata = createServiceMetadata(service);

export default function ServicePage() {
  return (
    <ServicePageTemplate
      service={service}
      relatedServices={getRelatedServices(service.relatedSlugs)}
    />
  );
}
