"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import BlogCard from "./blog-card";

interface BlogListClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export default function BlogListClient({
  initialPosts,
  categories,
}: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, categories]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 240;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 320);
  };

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filters & Search Toolbar */}
      <div className="flex flex-col gap-4 rounded-md border border-[var(--lsh-border-dark)] bg-lsh-charcoal p-4 md:flex-row md:items-center md:justify-between md:p-6">
        {/* Category Pills with Left & Right Arrows */}
        <div className="relative flex items-center gap-1.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
              canScrollLeft
                ? "border-[var(--lsh-border-dark)] bg-lsh-dark text-white hover:border-lsh-gold hover:bg-lsh-gold hover:text-lsh-black active:scale-95 shadow-sm cursor-pointer"
                : "border-[var(--lsh-border-dark)]/30 bg-lsh-dark/40 text-[var(--lsh-grey-700)] cursor-not-allowed opacity-30"
            }`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
                checkScroll();
              }
            }}
            className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scrollbar-none flex-1 min-w-0"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`whitespace-nowrap rounded px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                selectedCategory === "All"
                  ? "bg-lsh-gold text-lsh-black shadow-md font-bold"
                  : "bg-lsh-dark text-[var(--lsh-grey-300)] hover:border-lsh-gold/40 hover:text-white border border-[var(--lsh-border-dark)]"
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  selectedCategory === category
                    ? "bg-lsh-gold text-lsh-black shadow-md font-bold"
                    : "bg-lsh-dark text-[var(--lsh-grey-300)] hover:border-lsh-gold/40 hover:text-white border border-[var(--lsh-border-dark)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
              canScrollRight
                ? "border-[var(--lsh-border-dark)] bg-lsh-dark text-white hover:border-lsh-gold hover:bg-lsh-gold hover:text-lsh-black active:scale-95 shadow-sm cursor-pointer"
                : "border-[var(--lsh-border-dark)]/30 bg-lsh-dark/40 text-[var(--lsh-grey-700)] cursor-not-allowed opacity-30"
            }`}
            aria-label="Next categories"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--lsh-grey-400)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className="w-full rounded border border-[var(--lsh-border-dark)] bg-lsh-dark pl-9 pr-9 py-2 text-xs text-white placeholder-[var(--lsh-grey-500)] transition-colors focus:border-lsh-gold focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lsh-grey-400)] hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Header / Active Filters indicator */}
      {(selectedCategory !== "All" || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-[var(--lsh-grey-400)] border-b border-[var(--lsh-border-dark)] pb-4">
          <span>
            Showing <strong className="text-white">{filteredPosts.length}</strong>{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedCategory !== "All" && (
              <> in <span className="text-lsh-gold">{selectedCategory}</span></>
            )}
            {searchQuery && (
              <> matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;</>
            )}
          </span>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-lsh-gold hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Grid of Articles */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-[var(--lsh-border-dark)] bg-lsh-charcoal p-12 text-center">
          <SlidersHorizontal className="mx-auto mb-4 h-10 w-10 text-[var(--lsh-grey-500)]" />
          <h3 className="mb-2 font-heading text-lg font-bold uppercase text-white">
            No articles found
          </h3>
          <p className="mx-auto max-w-md text-xs text-[var(--lsh-grey-400)] mb-6">
            We couldn&apos;t find any articles matching your selected category or search terms. Try clearing your search or browsing another topic.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="inline-flex items-center justify-center rounded bg-lsh-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-lsh-black hover:bg-lsh-gold-hover"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}
