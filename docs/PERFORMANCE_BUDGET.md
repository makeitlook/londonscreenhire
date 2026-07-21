# Performance Budget — London Screen Hire

## User-facing goal

Perceived load time of approximately two seconds on a representative mobile connection.

This target is achievable under normal conditions for a static, lightweight site.
It is subject to device capability, network quality and hosting infrastructure.

## Core Web Vitals targets

| Metric | Target  |
|--------|---------|
| LCP    | ≤ 2.5 s |
| CLS    | ≤ 0.1   |
| INP    | ≤ 200 ms|
| FCP    | ≤ 1.8 s |

## Asset budgets

| Asset type              | Target           |
|-------------------------|------------------|
| HTML per page           | < 50 KB          |
| Critical CSS            | < 20 KB          |
| Initial JS (parsed)     | < 100 KB         |
| Hero image — mobile     | < 180 KB         |
| Hero image — desktop    | < 300 KB         |
| Card / section images   | < 100 KB each    |
| Service placeholder SVG | < 5 KB each      |

## Static-export image strategy

This project uses `output: "export"` with `images: { unoptimized: true }` in
`next.config.js`. Next.js image optimisation is disabled at runtime.

**Implication:** All images committed to the repository are served as-is.
Large originals will be delivered at full size to every visitor.

### Required before launching with real photography

1. **Pre-compress every image** before committing it to the repository.
   - Format: AVIF (preferred) or WebP
   - Hero images: ≤ 180 KB at mobile crop (≈ 800 × 450 px), ≤ 300 KB at desktop (≈ 1400 × 790 px)
   - Card and section images: ≤ 100 KB
   - Use a tool such as Squoosh, ImageOptim or a CI compression step

2. **Replace placeholder SVGs** in `public/images/services/` with pre-compressed
   real photography once supplied by the client.

3. **Provide correct `sizes` attributes** on every `next/image` call to match
   the actual rendered dimensions at each breakpoint (already implemented).

4. **Hero images only** use `priority` loading. All below-fold images are lazy.

### Alternative image-handling approaches (for consideration)

| Option | Trade-off |
|--------|-----------|
| Keep static export + pre-compressed assets | No server cost; manual process required before each deploy |
| Add a compatible loader (e.g. Cloudflare Images) | Automated optimisation; requires hosting configuration |
| Remove static export and use Next.js image optimisation | Best DX; requires a Node.js-capable host (Vercel, etc.) |

Do not remove `output: "export"` without explicit client approval.

## Performance principles applied

- Server Components by default — no unnecessary client JS
- `"use client"` used only for interactive elements (header scroll, mobile menu)
- No Framer Motion on service pages — CSS-only transitions
- Native `<details>/<summary>` for FAQs — zero JS dependency
- Fonts loaded via `next/font` with `display: swap`
- No autoplay video
- No unnecessary third-party scripts
- Minimal shadcn component imports
