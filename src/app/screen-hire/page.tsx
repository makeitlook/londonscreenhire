import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import BackToTop from "@/components/shared/back-to-top";
import ServiceHero from "@/components/service-pages/service-hero";
import { ServiceCard } from "@/components/service-pages/related-services";
import ServiceQuoteCta from "@/components/service-pages/service-quote-cta";
import content from "@/content/service-hub.json";
import { getRelatedServices, services } from "@/data/services";
import { createServiceMetadata } from "@/lib/service-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = createServiceMetadata({
  slug: "screen-hire",
  metaTitle: content.title,
  metaDescription: content.description,
  heroImage: content.heroImage,
  heroAlt: content.heroAlt,
});

export default function ScreenHirePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: `${SITE_URL}/screen-hire`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.navLabel,
        url: `${SITE_URL}/${service.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }} />
      <SiteHeader />
      <main id="main-content">
        <ServiceHero eyebrow={content.eyebrow} h1={content.heading}
          shortIntro={content.intro} heroImage={content.heroImage} heroAlt={content.heroAlt} />
        {content.groups.map((group, index) => (
          <section key={group.heading} aria-labelledby={`service-group-${index}`}
            className="bg-lsh-off-white py-12 sm:py-16 border-b border-[var(--lsh-border-light)]">
            <div className="lsh-container">
              <h2 id={`service-group-${index}`} className="font-heading text-3xl sm:text-4xl font-bold uppercase text-lsh-dark mb-3">
                {group.heading}
              </h2>
              <p className="text-lsh-grey-700 mb-8 max-w-2xl">{group.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0">
                {getRelatedServices(group.slugs).map((service) => (
                  <li key={service.slug} className="min-w-0"><ServiceCard service={service} /></li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <ServiceQuoteCta ctaHeading={content.ctaHeading} image={content.heroImage} imageAlt={content.heroAlt} />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
