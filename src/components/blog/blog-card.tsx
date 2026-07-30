import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import type { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-md border border-[var(--lsh-border-dark)] bg-lsh-charcoal transition-all duration-300 hover:border-lsh-gold/50 hover:shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden lg:col-span-7 lg:aspect-auto">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lsh-charcoal via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="rounded bg-lsh-gold px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-lsh-black">
                Featured Article
              </span>
              <span className="rounded bg-lsh-black/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-[var(--lsh-border-dark)]">
                {post.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-8 lg:col-span-5 lg:p-10">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-4 text-[0.8125rem] text-[var(--lsh-grey-400)]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-lsh-gold" />
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-lsh-gold" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="mb-3 font-heading text-2xl font-bold uppercase leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-lsh-gold md:text-3xl">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h2>

              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[var(--lsh-grey-300)]">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--lsh-border-dark)] pt-6">
              <div className="inline-flex items-center gap-2 text-xs text-[var(--lsh-grey-400)]">
                <User className="h-3.5 w-3.5 text-lsh-gold" />
                <span>{post.author.name}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lsh-gold transition-all duration-200 group-hover:translate-x-1"
                aria-label={`Read full article: ${post.title}`}
              >
                Read Article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[var(--lsh-border-dark)] bg-lsh-charcoal transition-all duration-300 hover:border-lsh-gold/50 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded bg-lsh-black/85 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-lsh-gold backdrop-blur-sm border border-[var(--lsh-border-dark)]">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="mb-3 flex items-center justify-between text-[0.75rem] text-[var(--lsh-grey-400)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-lsh-gold" />
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-lsh-gold" />
              {post.readTime}
            </span>
          </div>

          <h3 className="mb-2 font-heading text-lg font-bold uppercase leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-lsh-gold">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>

          <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[var(--lsh-grey-300)]">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--lsh-border-dark)] pt-4">
          <div className="inline-flex items-center gap-1.5 text-[0.75rem] text-[var(--lsh-grey-400)]">
            <User className="h-3 w-3 text-lsh-gold" />
            <span className="truncate max-w-[130px]">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-lsh-gold transition-transform duration-200 group-hover:translate-x-1"
            aria-label={`Read article: ${post.title}`}
          >
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
