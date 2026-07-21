"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to delay the animation start. */
  delay?: number;
}

/**
 * FadeIn - scroll-triggered fade-up wrapper.
 *
 * Fires once when the element enters the viewport.
 * Respects prefers-reduced-motion via useReducedMotion().
 * Renders as a <div> - pass className to preserve flex/grid child behaviour.
 */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
