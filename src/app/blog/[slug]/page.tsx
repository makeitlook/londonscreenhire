import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blog";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import BlogCard from "@/components/blog/blog-card";
import BlogShareButtons from "@/components/blog/blog-share-buttons";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import siteContent from "@/content/site.json";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Tag,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | London Screen Hire Blog`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "London Screen Hire",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: `${SITE_URL}${post.coverImage}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}${post.coverImage}`],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  // Schema.org Article Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${siteContent.logo.image}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader />

      <main
        id="main-content"
        className="min-h-screen bg-lsh-dark pt-[76px] xl:pt-[86px]"
      >
        {/* Article Breadcrumb & Top Bar */}
        <div className="border-b border-[var(--lsh-border-dark)] bg-lsh-black/60 py-4">
          <div className="lsh-container flex flex-wrap items-center justify-between gap-4 text-xs">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[var(--lsh-grey-400)]"
            >
              <Link href="/" className="hover:text-lsh-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--lsh-grey-500)]" />
              <Link href="/blog" className="hover:text-lsh-gold transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--lsh-grey-500)]" />
              <span className="text-white font-medium truncate max-w-[200px] sm:max-w-md">
                {post.title}
              </span>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-lsh-gold hover:underline font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header Hero */}
        <header className="py-12 md:py-16 border-b border-[var(--lsh-border-dark)] bg-gradient-to-b from-lsh-black to-lsh-dark">
          <div className="lsh-container space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-lsh-gold px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-lsh-black">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--lsh-grey-400)]">
                <Calendar className="h-3.5 w-3.5 text-lsh-gold" />
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--lsh-grey-400)]">
                <Clock className="h-3.5 w-3.5 text-lsh-gold" />
                {post.readTime}
              </span>
            </div>

            <h1
              className="font-heading font-bold uppercase leading-[1.05] text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              {post.title}
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-[var(--lsh-grey-300)]">
              {post.excerpt}
            </p>

            {/* Author & Share Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--lsh-border-dark)] pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lsh-gold/40 bg-lsh-charcoal text-lsh-gold font-bold">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-[var(--lsh-grey-400)]">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <BlogShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>
        </header>

        {/* Article Featured Cover Image */}
        <div className="lsh-container py-8">
          <div className="relative w-full overflow-hidden rounded-md border border-[var(--lsh-border-dark)] shadow-2xl bg-lsh-black">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Article Body Content */}
        <article className="lsh-container pb-16">
          {/* Introduction */}
          <div className="mb-10 rounded-md border-l-4 border-lsh-gold bg-lsh-charcoal p-6 text-base md:text-lg leading-relaxed text-white shadow-sm">
            {post.content.introduction}
          </div>

          {/* Structured Sections */}
          <div className="space-y-12">
            {post.content.sections.map((section, idx) => {
              const isFaq =
                /faq|frequently asked/i.test(section.heading);

              if (isFaq) {
                // Parse each paragraph as "Question? Answer text."
                const faqs = section.paragraphs.map((p) => {
                  const firstQ = p.indexOf("?");
                  if (firstQ === -1) return { q: p, a: "" };
                  return {
                    q: p.slice(0, firstQ + 1).trim(),
                    a: p.slice(firstQ + 1).trim(),
                  };
                });

                return (
                  <section key={section.heading} className="space-y-4">
                    <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-white flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-lsh-gold/15 text-xs font-bold text-lsh-gold border border-lsh-gold/30">
                        {idx + 1}
                      </span>
                      {section.heading}
                    </h2>

                    <div className="divide-y divide-[var(--lsh-border-dark)] rounded-md border border-[var(--lsh-border-dark)] overflow-hidden">
                      {faqs.map(({ q, a }, fIdx) => (
                        <details
                          key={fIdx}
                          className="group bg-lsh-charcoal open:bg-lsh-charcoal-light transition-colors duration-200"
                        >
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 select-none">
                            <span className="font-heading text-sm md:text-base font-semibold uppercase tracking-wide text-white group-open:text-lsh-gold transition-colors duration-200">
                              {q}
                            </span>
                            {/* +/− indicator */}
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--lsh-border-dark)] text-lsh-gold text-sm font-bold group-open:rotate-45 transition-transform duration-200">
                              +
                            </span>
                          </summary>
                          {a && (
                            <p className="px-5 pb-5 pt-1 text-xs md:text-sm leading-relaxed text-[var(--lsh-grey-300)]">
                              {a}
                            </p>
                          )}
                        </details>
                      ))}
                    </div>
                  </section>
                );
              }

              return (
                <section key={section.heading} className="space-y-4">
                  <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-white flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-lsh-gold/15 text-xs font-bold text-lsh-gold border border-lsh-gold/30">
                      {idx + 1}
                    </span>
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm md:text-base leading-relaxed text-[var(--lsh-grey-300)]"
                    >
                      {p}
                    </p>
                  ))}

                  {section.callout && (
                    <div className="my-6 rounded bg-lsh-black/80 border border-lsh-gold/30 p-5 text-sm leading-relaxed text-lsh-gold flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 mt-0.5 text-lsh-gold" />
                      <div>{section.callout}</div>
                    </div>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="my-4 space-y-2.5 rounded bg-lsh-charcoal p-5 border border-[var(--lsh-border-dark)]">
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-xs md:text-sm text-[var(--lsh-grey-300)]"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-lsh-gold" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-md border border-[var(--lsh-border-dark)] bg-lsh-charcoal p-6 space-y-3">
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              Summary & Key Takeaway
            </h3>
            <p className="text-sm leading-relaxed text-[var(--lsh-grey-300)]">
              {post.content.conclusion}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-[var(--lsh-border-dark)] pt-6">
            <Tag className="h-4 w-4 text-lsh-gold mr-1" />
            <span className="text-xs text-[var(--lsh-grey-400)] font-semibold uppercase tracking-wider mr-2">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-lsh-charcoal-light px-3 py-1 text-xs text-[var(--lsh-grey-300)] border border-[var(--lsh-border-dark)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* CTA Section */}
        <section className="border-t border-b border-[var(--lsh-border-dark)] bg-lsh-black py-12">
          <div className="lsh-container max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-white">
                Planning an Event in London or the UK?
              </h3>
              <p className="text-xs md:text-sm text-[var(--lsh-grey-400)] mt-1">
                Get advice from our technical production team or request a formal quote today.
              </p>
            </div>
            <Link
              href="/#quote"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-lsh-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-lsh-black hover:bg-lsh-gold-hover transition-transform hover:scale-105"
            >
              Get a Fast Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="lsh-container py-16 space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--lsh-border-dark)] pb-4">
              <h2 className="font-heading text-xl md:text-2xl font-bold uppercase text-white">
                More Technical Guides & Articles
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-lsh-gold hover:underline"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <BlogCard key={relPost.slug} post={relPost} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
