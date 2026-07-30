"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

interface BlogShareButtonsProps {
  title: string;
  slug: string;
}

export default function BlogShareButtons({ title, slug }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/blog/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--lsh-grey-400)]">
        <Share2 className="h-3.5 w-3.5 text-lsh-gold" />
        Share:
      </span>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 rounded border border-[var(--lsh-border-dark)] bg-lsh-charcoal-light px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-lsh-gold hover:text-lsh-gold"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-400" />
            <span className="text-green-400">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
