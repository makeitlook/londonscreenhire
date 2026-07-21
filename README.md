# London Screen Hire

Production website for London Screen Hire, built as a lightweight static Next.js application. The site presents LED screen and event-production services, project photography, testimonials, contact information, and a Web3Forms quote enquiry flow.

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- shadcn/ui primitives for accessible interactive controls
- Lucide icons
- Framer Motion for restrained section entrances
- Web3Forms for quote submissions
- Vercel Analytics and Speed Insights, loaded only after consent

The project uses `output: "export"`, so `npm run build` produces a static site in `out/`.

## Local development

Requirements:

- Node.js 18 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` with the production or test Web3Forms access key:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key
```

The key is intentionally read through a `NEXT_PUBLIC_` variable because Web3Forms submissions are made directly from the browser. Do not hardcode it in source files.

If the key is absent, the form remains visible but shows an accessible contact-by-phone-or-email fallback when submitted.

## Commands

```bash
npm run dev        # Start the local development server
npm run lint       # Run ESLint directly
npm run typecheck  # Run TypeScript without emitting files
npm run build      # Create the production static export
npm run start      # Serve a Next.js production build where supported
```

Before handing off or deploying a change, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Project structure

```text
src/
  app/                  Routes, metadata, legal pages and global styles
  components/
    layout/             Shared header and footer
    sections/           Homepage sections and quote form
    service-pages/      Shared service-page template and sections
    shared/             Reusable site-specific components
    ui/                 shadcn/ui primitives
  data/                 Typed site, service and marketing content
  lib/                  Validation and shared site configuration
public/images/          Repository-hosted production imagery
docs/                   Design system and performance budget
```

## Content management

Content is intentionally repository-based rather than CMS-driven:

- Service content: `src/data/services.ts`
- Projects: `src/data/projects.ts`
- Testimonials: `src/data/testimonials.ts`
- Statistics: `src/data/statistics.ts`
- Contact details: `src/data/contact.ts`
- Footer and social links: `src/data/footer.ts`

Several data files contain explicit placeholder warnings. Unverified statistics, testimonials, service claims, contact details, coverage claims, and legal copy must be confirmed before launch.

## Images

The static export does not provide runtime image optimisation. Compress every photograph before committing it:

- Prefer AVIF or WebP.
- Keep desktop hero images at or below 300KB.
- Keep mobile hero crops at or below 180KB.
- Keep cards and section images at or below 100KB.
- Preserve the aspect ratio and focal point expected by the component.
- Update file paths in the relevant data file when changing formats.

Only true hero images should use priority loading. Below-the-fold images should remain lazy-loaded.

See `docs/PERFORMANCE_BUDGET.md` for the complete asset and Core Web Vitals targets.

## Design and accessibility

The approved mockup is the primary visual reference. Implementation decisions are documented in `docs/LONDON_SCREEN_HIRE_DESIGN_SYSTEM.md`.

Core requirements include:

- One page-level H1 and logical heading order
- Keyboard-accessible navigation and form controls
- Visible focus states and a skip link
- Reduced-motion support
- Descriptive alternative text
- Responsive review at 375, 390, 768, 1024, 1280, 1440 and 1920 pixels
- A shared 1440px maximum content frame while section backgrounds remain full width

## Quote form

The quote form uses native browser `fetch` to submit to Web3Forms. It includes client-side validation, a honeypot, field-level error associations, loading state, success confirmation, and a submission-level fallback.

After changing the form or deployment configuration, perform a clearly labelled test submission on the deployed site and confirm receipt at the configured destination address.

## Deployment

`npm run build` generates the static export in `out/`. Deploy that directory to the configured static host.

Before production deployment:

1. Confirm `SITE_URL` in `src/lib/site.ts`.
2. Confirm the Web3Forms access key in the hosting environment.
3. Replace or approve all content marked as placeholder.
4. Obtain professional approval for privacy and terms content.
5. Compress production imagery.
6. Verify the quote form, navigation, canonical URLs, sitemap, and social metadata on the deployed domain.
