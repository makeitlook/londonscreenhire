import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import {
  getAllBlogPosts,
  getFeaturedBlogPost,
  getBlogCategories,
} from "@/data/blog";
import BlogCard from "@/components/blog/blog-card";
import BlogListClient from "@/components/blog/blog-list-client";
import { SITE_URL } from "@/lib/site";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "LED Screen Hire Blog & Technical Guides | London Screen Hire",
  description:
    "Expert technical advice, pixel pitch guides, outdoor AV weatherproofing tips, and event production insights from London Screen Hire.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "LED Screen Hire Blog & Technical Guides | London Screen Hire",
    description:
      "Expert technical advice, pixel pitch guides, outdoor AV weatherproofing tips, and event production insights from London Screen Hire.",
    url: `${SITE_URL}/blog`,
    siteName: "London Screen Hire",
    type: "website",
  },
};

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const featuredPost = getFeaturedBlogPost();
  const categories = getBlogCategories();

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="min-h-screen bg-lsh-dark pt-[76px] xl:pt-[86px]">
        {/* Page Hero Header */}
        <section className="relative border-b border-[var(--lsh-border-dark)] bg-lsh-black py-16 md:py-24">
          <div className="lsh-container relative z-10">
            <div className="max-w-3xl">
              <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold">
                London Screen Hire Knowledge Base
              </p>
              <h1
                className="mb-4 font-heading font-bold uppercase leading-[0.95] text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              >
                Blog & Technical Guides
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-[var(--lsh-grey-300)] max-w-2xl">
                Industry insights, AV technical specifications, pixel pitch selection guides, and event production advice from our team of LED screen specialists in London.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="lsh-container py-12 md:py-16 space-y-16">
          {/* Featured Article Section */}
          {featuredPost && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-lsh-gold" />
                <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                  Spotlight Guide
                </h2>
              </div>
              <BlogCard post={featuredPost} featured />
            </section>
          )}

          {/* All Articles Section with Client Filtering */}
          <section className="space-y-6">
            <div className="border-b border-[var(--lsh-border-dark)] pb-4">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
                All Articles & Guides
              </h2>
              <p className="text-xs text-[var(--lsh-grey-400)] mt-1">
                Browse our complete collection of technical guides and production advice
              </p>
            </div>

            <BlogListClient initialPosts={allPosts} categories={categories} />
          </section>

          {/* Call to Action Box */}
          <section className="rounded-md border border-[var(--lsh-border-dark)] bg-gradient-to-r from-lsh-charcoal via-lsh-charcoal-light to-lsh-charcoal p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-lsh-gold">
                Ready To Hire?
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-white">
                Need an LED Screen for Your Upcoming London Event?
              </h3>
              <p className="text-xs md:text-sm text-[var(--lsh-grey-300)]">
                Our technicians provide complete end-to-end delivery, setup, and live operator support across London and the UK.
              </p>
            </div>

            <Link
              href="/#quote"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-lsh-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-lsh-black transition-transform duration-200 hover:bg-lsh-gold-hover hover:scale-105 shadow-lg"
            >
              Get a Fast Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
