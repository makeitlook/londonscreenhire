import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import BackToTop from "@/components/shared/back-to-top";
import ServiceHero from "@/components/service-pages/service-hero";
import ServiceIntro from "@/components/service-pages/service-intro";
import ServiceBenefits from "@/components/service-pages/service-benefits";
import ServiceUses from "@/components/service-pages/service-uses";
import ServiceShowcase from "@/components/service-pages/service-showcase";
import ServiceFaqs from "@/components/service-pages/service-faqs";
import RelatedServices from "@/components/service-pages/related-services";
import ServiceQuoteCta from "@/components/service-pages/service-quote-cta";
import type { ServicePage } from "@/data/services";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface ServicePageTemplateProps {
  service: ServicePage;
  relatedServices: Pick<
    ServicePage,
    "slug" | "navLabel" | "shortIntro" | "eyebrow" | "heroImage" | "heroAlt"
  >[];
}

/**
 * ServicePageTemplate - shared layout for all nine service pages.
 * All sections are Server Components - no client JS required.
 *
 * Layout order:
 * 1. Header
 * 2. Hero (breadcrumbs inline)
 * 3. Intro + connected process timeline (off-white)
 * 4. Key benefits with icons (dark)
 * 5. Event types / use cases with optional links (off-white)
 * 6. Showcase - image + text split (charcoal)
 * 7. FAQs two-column (dark)
 * 8. Related services with image strips (off-white)
 * 9. Quote CTA two-column band (charcoal)
 * 10. Footer
 */
export default function ServicePageTemplate({
  service,
  relatedServices,
}: ServicePageTemplateProps) {
  const pageUrl = `${SITE_URL}/${service.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.navLabel,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.navLabel,
        description: service.metaDescription,
        url: pageUrl,
        image: `${SITE_URL}${service.heroImage}`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main id="main-content">
        <ServiceHero
          eyebrow={service.eyebrow}
          h1={service.h1}
          shortIntro={service.shortIntro}
          heroImage={service.heroImage}
          heroAlt={service.heroAlt}
          serviceLabel={service.navLabel}
        />
        <ServiceIntro
          fullIntro={service.fullIntro}
          processSteps={service.processSteps}
        />
        <ServiceBenefits benefits={service.benefits} />
        <ServiceUses useCases={service.useCases} />
        <ServiceShowcase
          h1={service.h1}
          image={service.showcaseImage}
          imageAlt={service.showcaseAlt}
          shortIntro={service.shortIntro}
        />
        <ServiceFaqs faqs={service.faqs} />
        <RelatedServices services={relatedServices} />
        <ServiceQuoteCta
          ctaHeading={service.ctaHeading}
          image={service.ctaImage}
          imageAlt={service.ctaImageAlt}
        />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
