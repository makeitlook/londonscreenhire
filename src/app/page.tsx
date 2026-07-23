import SiteHeader from "@/components/layout/site-header";
import BackToTop from "@/components/shared/back-to-top";
import SiteFooter from "@/components/layout/site-footer";
import HeroSection from "@/components/sections/hero-section";
import FeaturedServices from "@/components/sections/featured-services";
import ProjectsSection from "@/components/sections/projects-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";
import StatisticsStrip from "@/components/sections/statistics-strip";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import { contact } from "@/data/contact";
import { socialLinks } from "@/data/footer";
import { services } from "@/data/services";
import siteContent from "@/content/site.json";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const verifiedSocialProfiles = socialLinks
  .filter((link) => !link.placeholder && link.href)
  .map((link) => link.href);

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: siteContent.business.description,
  url: SITE_URL,
  telephone: contact.phone.href.replace("tel:", ""),
  email: contact.email.display,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteContent.business.addressLocality,
    addressCountry: siteContent.business.addressCountry,
  },
  areaServed: {
    "@type": "Country",
    name: siteContent.business.areaServed,
  },
  priceRange: siteContent.business.priceRange,
  image: `${SITE_URL}${siteContent.homeMetadata.socialImage}`,
  sameAs: verifiedSocialProfiles,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: siteContent.business.offerCatalogName,
    itemListElement: services.map((service) => {
      const serviceUrl = `${SITE_URL}/${service.slug}`;

      return {
        "@type": "Offer",
        url: serviceUrl,
        itemOffered: {
          "@type": "Service",
          name: service.navLabel,
          url: serviceUrl,
        },
      };
    }),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <SiteHeader />
      <main id="main-content">
        {/* Hero + overlapping services panel share the same dark background */}
        <div className="relative bg-lsh-dark">
          <HeroSection />
          {/*
           * Graduated overlap - services panel rises into the hero's bottom gradient zone.
           * Mobile: no overlap (hero content area needs full height)
           * sm:  -32px  640px+
           * md:  -48px  768px+
           * lg:  -72px  1024px+
           * xl:  -80px  1280px+
           */}
          <div className="relative z-10 -mt-5 sm:-mt-8 md:-mt-12 lg:-mt-[72px] xl:-mt-20 pb-5 md:pb-8 xl:pb-10">
            <FeaturedServices />
          </div>
        </div>

        {/* Recent Projects - off-white, sharp transition from dark */}
        <ProjectsSection />

        {/* Why Choose Us - dark, sharp transition from off-white */}
        <WhyChooseUsSection />

        {/* Statistics strip - blue, attaches directly beneath dark section */}
        <StatisticsStrip />

        {/* Testimonials - off-white, attaches directly beneath blue strip */}
        <TestimonialsSection />

        {/* Contact & Quote - dark, attaches directly beneath off-white Testimonials */}
        <ContactSection />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
