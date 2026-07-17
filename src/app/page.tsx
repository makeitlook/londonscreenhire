import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import HeroSection from "@/components/sections/hero-section";
import FeaturedServices from "@/components/sections/featured-services";
import ProjectsSection from "@/components/sections/projects-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";
import StatisticsStrip from "@/components/sections/statistics-strip";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero + overlapping services panel share the same dark background */}
        <div className="relative bg-lsh-dark">
          <HeroSection />
          {/*
           * Graduated overlap — services panel rises into the hero's bottom gradient zone.
           * Mobile: no overlap (hero content area needs full height)
           * sm:  -32px  640px+
           * md:  -48px  768px+
           * lg:  -72px  1024px+
           * xl:  -80px  1280px+
           */}
          <div className="relative z-10 -mt-5 sm:-mt-8 md:-mt-12 lg:-mt-[72px] xl:-mt-20 pb-8 md:pb-12 xl:pb-16">
            <FeaturedServices />
          </div>
        </div>

        {/* Recent Projects — off-white, sharp transition from dark */}
        <ProjectsSection />

        {/* Why Choose Us — dark, sharp transition from off-white */}
        <WhyChooseUsSection />

        {/* Statistics strip — blue, attaches directly beneath dark section */}
        <StatisticsStrip />

        {/* Testimonials — off-white, attaches directly beneath blue strip */}
        <TestimonialsSection />

        {/* Contact & Quote — dark, attaches directly beneath off-white Testimonials */}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
