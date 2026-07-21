"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    const shouldReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={[
        "fixed bottom-24 right-5 sm:right-6 z-50",
        "flex items-center justify-center w-10 h-10",
        "bg-lsh-blue hover:bg-[var(--lsh-blue-hover)] text-white",
        "border border-[var(--lsh-border-dark)] rounded-[3px]",
        "shadow-lg transition-all duration-200",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
