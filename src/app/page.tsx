import SiteHeader from "@/components/layout/site-header";
import BackToTop from "@/components/shared/back-to-top";
import SiteFooter from "@/components/layout/site-footer";
import HeroSection from "@/components/sections/hero-section";
import FeaturedServices from "@/components/sections/featured-services";
import ServiceOverviewSection from "@/components/sections/service-overview-section";
import ProjectsSection from "@/components/sections/projects-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";
import StatisticsStrip from "@/components/sections/statistics-strip";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import ServiceFaqs from "@/components/service-pages/service-faqs";
import homeContent from "@/content/home.json";
import { contact } from "@/data/contact";
import { socialLinks } from "@/data/footer";
import { services } from "@/data/services";
import siteContent from "@/content/site.json";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const verifiedSocialProfiles = socialLinks
  .filter((link) => !link.placeholder && link.href)
  .map((link) => link.href);

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: siteContent.homeMetadata.description,
      inLanguage: siteContent.language,
      publisher: {
        "@id": `${SITE_URL}/#business`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: siteContent.homeMetadata.title,
      description: siteContent.homeMetadata.description,
      inLanguage: siteContent.language,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#business`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${siteContent.homeMetadata.socialImage}`,
      },
    },
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: siteContent.business.description,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${siteContent.logo.image}`,
        width: 841,
        height: 457,
      },
      telephone: contact.phone.href.replace("tel:", ""),
      email: contact.email.display,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteContent.business.streetAddress,
        addressLocality: siteContent.business.addressLocality,
        addressRegion: siteContent.business.addressRegion,
        postalCode: siteContent.business.postalCode,
        addressCountry: siteContent.business.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteContent.business.latitude,
        longitude: siteContent.business.longitude,
      },
      areaServed: {
        "@type": "Country",
        name: siteContent.business.areaServed,
      },
      priceRange: siteContent.business.priceRange,
      image: `${SITE_URL}${siteContent.homeMetadata.socialImage}`,
      sameAs: verifiedSocialProfiles,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteContent.business.openingHours.days,
        opens: siteContent.business.openingHours.opens,
        closes: siteContent.business.openingHours.closes,
      },
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
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faqs`,
      mainEntity: homeContent.faqs.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <SiteHeader />
      <main id="main-content">
        {/* Hero + overlapping services panel share the same dark background */}
        <div className="relative bg-lsh-dark">
          <HeroSection />
          {/*
           * Restrained overlap keeps the panel connected to the hero while
           * preserving a clear gap beneath the hero actions.
           */}
          <div className="relative z-10 mt-0 sm:-mt-6 md:-mt-8 lg:-mt-8 xl:-mt-8 pb-5 md:pb-8 xl:pb-10">
            <FeaturedServices />
          </div>
        </div>

        <ServiceOverviewSection />

        {/* Recent Projects - off-white, sharp transition from dark */}
        <ProjectsSection />

        {/* Why Choose Us - dark, sharp transition from off-white */}
        <WhyChooseUsSection />

        {/* Statistics strip - gold, attaches directly beneath dark section */}
        <StatisticsStrip />

        {/* Testimonials - off-white, attaches directly beneath gold strip */}
        <TestimonialsSection />

        <ServiceFaqs
          faqs={homeContent.faqs.items}
          eyebrow={homeContent.faqs.eyebrow}
          heading={homeContent.faqs.heading}
          prompt={homeContent.faqs.prompt}
          headingId="homepage-faqs-heading"
          tone="light"
        />

        {/* Contact & Quote - dark, follows the homepage FAQs */}
        <ContactSection />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
