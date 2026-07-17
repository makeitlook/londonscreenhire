"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * HeroContent — client component isolated to contain Framer Motion.
 * Keeps the parent HeroSection as a server component.
 *
 * Typography scale:
 *   H1 clamp: 2.375rem (38px) at 320–390px → scales to 5.125rem (82px) at 1290px+
 *   Formula: clamp(2.375rem, calc(5vw + 1.125rem), 5.125rem)
 *   This produces natural linear growth without sudden jumps.
 *
 * Content width:
 *   Mobile      → w-full (text fills left-padded area; gradient covers it)
 *   sm (640px)  → max-w-[80%]
 *   md (768px)  → max-w-[58%]
 *   xl (1280px) → max-w-[46%]
 *
 * CTAs:
 *   Mobile (<sm) → stacked full-width column
 *   sm+          → inline row
 */
export default function HeroContent() {
  const reduce = useReducedMotion();

  const hidden = { opacity: 0, y: reduce ? 0 : 18 };
  const visible = { opacity: 1, y: 0 };
  const ease = "easeOut" as const;

  return (
    <div className="flex flex-col items-start w-full sm:max-w-[80%] md:max-w-[58%] xl:max-w-[46%]">
      {/*
       * Eyebrow — two responsive spans, one for mobile/tablet, one for desktop.
       * display:none removes the inactive span from the accessibility tree,
       * so screen readers only announce the visible version.
       *
       * Mobile/tablet (< sm): shorter — fits on one line at 320px+
       * Desktop (sm+): full version
       */}
      <motion.p
        initial={hidden}
        animate={visible}
        transition={{ duration: 0.4, ease }}
        className="mb-3 text-[0.6875rem] font-semibold uppercase text-lsh-blue"
      >
        <span className="tracking-[0.16em] sm:hidden">
          LED Screen Hire &amp; AV Solutions
        </span>
        <span className="hidden sm:inline tracking-[0.22em]">
          Professional LED Screen &amp; AV Solutions
        </span>
      </motion.p>

      {/*
       * H1 — calibrated clamp targeting:
       *   320px → 38px  (clamp floor)
       *   360px → ~40px
       *   390px → ~42px
       *   430px → ~44px
       *   1290px+ → 82px (clamp ceiling)
       * Formula: clamp(2.375rem, calc(5.7vw + 1.25rem), 5.125rem)
       */}
      <motion.h1
        initial={hidden}
        animate={visible}
        transition={{ duration: 0.45, delay: reduce ? 0 : 0.08, ease }}
        className="font-heading font-bold uppercase leading-[0.88] tracking-[-0.02em] text-white mb-4 sm:mb-5"
        style={{ fontSize: "clamp(2.375rem, calc(5.7vw + 1.25rem), 5.125rem)" }}
      >
        BIGGER SCREENS.
        <br />
        BIGGER IMPACT.
      </motion.h1>

      {/* Supporting copy + CTAs */}
      <motion.div
        initial={hidden}
        animate={visible}
        transition={{ duration: 0.45, delay: reduce ? 0 : 0.16, ease }}
        className="flex flex-col items-start gap-4 sm:gap-5 w-full"
      >
        <p className="text-[0.875rem] sm:text-[0.9rem] leading-[1.6] text-lsh-grey-300 max-w-[400px]">
          Professional LED screen hire, audiovisual production and event
          solutions across London and the UK.
        </p>

        {/*
         * Mobile (< sm): stacked, full-width — 50px height, 12px gap
         * sm+: inline row — 46px height, gap auto
         */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 h-[50px] sm:h-[46px] px-7 text-[0.8125rem] font-semibold text-white bg-lsh-blue rounded-[4px] hover:bg-lsh-blue-hover active:bg-lsh-blue-dark transition-colors duration-200"
          >
            Get a Quote
            <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center h-[50px] sm:h-[46px] px-7 text-[0.8125rem] font-semibold text-white border border-white/25 rounded-[4px] hover:border-white/40 hover:bg-white/5 transition-colors duration-200 whitespace-nowrap"
          >
            Our Services
          </a>
        </div>
      </motion.div>
    </div>
  );
}
