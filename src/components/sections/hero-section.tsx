import Image from "next/image";
import HeroContent from "./hero-content";

/**
 * HeroSection - server component.
 *
 * Height: clamp(560px, 72vw, 660px)
 *   560px floor  - covers all mobile sizes without clipping content
 *   72vw midpoint - scales naturally through tablet
 *   660px ceiling - desktop cap keeps it compact and crisp
 *
 * Padding: matches the site-wide system (px-4 / sm:px-6 / md:px-8 / xl:px-12).
 * Header offset: 68px mobile, 78px xl - matches header heights exactly.
 *
 * Overlay strategy:
 *   Left-heavy dark gradient  → text zone always readable
 *   Bottom-up dark gradient   → merges into the dark services panel
 *   Flat dark tint            → reduces blown-out brightness
 *
 * Image focal point:
 *   Mobile  → object-[60%_50%] - more of the screen graphic visible
 *   Desktop → object-[70%_50%] - right-side LED screen prominent
 *   (Replace with client photography and tune object-position per image.)
 */
export default function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ height: "clamp(560px, 72vw, 660px)" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.png"
          alt=""
          fill
          className="object-cover object-[60%_50%] md:object-[70%_50%]"
          priority
          sizes="100vw"
        />

        {/*
         * Mobile overlay (< md, 768px):
         * Heavier left coverage (70–80% of width dark) so text is always readable.
         * Preserves visible blue image detail on the far right edge.
         */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to right, #0a0d12 0%, rgba(10,13,18,0.97) 28%, rgba(10,13,18,0.88) 52%, rgba(10,13,18,0.50) 72%, rgba(10,13,18,0.18) 88%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/*
         * Tablet / desktop overlay (md+):
         * Lighter - image contributes more to the composition.
         */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #0a0d12 0%, rgba(10,13,18,0.92) 20%, rgba(10,13,18,0.72) 42%, rgba(10,13,18,0.25) 65%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/*
         * Mobile bottom-content backing (< md):
         * Subtle dark zone behind the paragraph and CTA buttons area.
         * Ensures legibility even if real photography is bright in that region.
         */}
        <div
          className="absolute inset-x-0 bottom-0 md:hidden"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(10,13,18,0.88) 0%, rgba(10,13,18,0.60) 45%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom-up gradient - blends into the dark services panel below (all sizes) */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to top, #0a0d12 0%, rgba(10,13,18,0.65) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Thin global dark tint - prevents the image looking washed out */}
        <div className="absolute inset-0 bg-lsh-dark/15" aria-hidden="true" />
      </div>

      {/* ── Content - vertically centred within the non-header space ── */}
      <div className="relative z-10 flex flex-col justify-center flex-1 pt-[68px] xl:pt-[78px]">
        {/*
         * mt-4 on mobile shifts the visual centre ~16px lower than true centre.
         * This gives a more grounded, less floating feel at small viewports.
         * Reset to 0 at sm+ where the wider layout handles this naturally.
         */}
        <div className="w-full px-4 sm:px-6 md:px-8 xl:px-12 mt-4 sm:mt-0">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
