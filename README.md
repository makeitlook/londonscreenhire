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

## Getting started

Requirements:

- Node.js 22.13.0 (pinned in `.nvmrc`)
- npm

Clone the repository, install dependencies and create your local environment
file:

```bash
git clone https://github.com/makeitlook/londonscreenhire.git
cd londonscreenhire
nvm use
npm ci
cp .env.example .env.local
```

If you do not use `nvm`, install the Node version declared in `.nvmrc` with
your preferred version manager before running `npm ci`.

Add a Web3Forms access key to `.env.local` if you need to test quote-form
submissions. You can leave it empty for normal page and content work.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Changes appear as you edit
the project. Stop the server with `Ctrl+C`.

## Environment variables

The setup command above copies `.env.example` to `.env.local`. Set the
production or test Web3Forms access key there:

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
npm run preview    # Serve the generated out/ directory locally
```

Run `npm run build` before `npm run preview`. The preview command serves the
already-generated static export from `out/`.

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
  content/              All editor-facing website content in JSON
  data/                 Typed adapters between JSON content and components
  lib/                  Validation and shared site configuration
public/images/          Repository-hosted production imagery
docs/                   Design system and performance budget
```

## Content management

All editable website copy is kept in [`src/content`](src/content) as JSON so a
content contributor can work without changing components or application code.
See the [`src/content` editing guide](src/content/README.md) for the complete
file map and editing rules.

For content-only changes:

1. Change only the relevant files in `src/content/`.
2. Keep existing JSON keys and icon values unless a developer is coordinating
   the change.
3. Do not add comments or trailing commas; both are invalid in JSON.
4. Preview the affected pages locally.
5. Run the validation commands below before opening a pull request.

Files in `src/data/` are TypeScript adapters used by the application. Content
editors should not need to change them. Items marked with
`"placeholder": true` are not client-verified and must be confirmed before
being published as factual claims.

## Making a change

Start every change from the latest `dev` branch and use a short-lived feature
branch:

```bash
git fetch origin
git switch dev
git pull --ff-only origin dev
git switch -c your-name/short-description
```

Keep each branch focused on one task. Check the changed pages locally, then run:

```bash
npm run lint
npm run typecheck
npm run build
```

Commit and push your feature branch, then open a pull request with `dev` as the
base branch. This step is required.

## Pull request and release workflow

The required merge path is:

```text
feature branch -> pull request to dev -> review/test on dev -> pull request from dev to main
```

- Do not open feature or content pull requests directly against `main`.
- All day-to-day changes must be reviewed and merged into `dev` first.
- Once the combined changes on `dev` have been checked and approved, open a
  separate pull request from `dev` into `main`.
- `main` is the production/release branch.

If `dev` is not available on the remote, ask a maintainer to create or restore
it before starting work; do not use `main` as a substitute.

## Images

The static export does not provide runtime image optimisation. Compress every photograph before committing it:

- Prefer AVIF or WebP.
- Keep desktop hero images at or below 300KB.
- Keep mobile hero crops at or below 180KB.
- Keep cards and section images at or below 100KB.
- Preserve the aspect ratio and focal point expected by the component.
- Update file paths in the relevant `src/content/` JSON file when changing formats.

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

When changing layout or components, follow the documented design system and
reuse the existing shared components before introducing new patterns.

## Quote form

The quote form uses native browser `fetch` to submit to Web3Forms. It includes client-side validation, a honeypot, field-level error associations, loading state, success confirmation, and a submission-level fallback.

After changing the form or deployment configuration, perform a clearly labelled test submission on the deployed site and confirm receipt at the configured destination address.

## Deployment

`npm run build` generates the static export in `out/`. Deploy that directory to the configured static host.

Vercel reads the production security headers from `vercel.json`. Keep its Content Security Policy in sync if the form, analytics provider, fonts, or external media sources change.

Before production deployment:

1. Confirm the site URL in `src/content/site.json`.
2. Confirm the Web3Forms access key in the hosting environment.
3. Verify statistics and obtain permission for published testimonials.
4. Have the privacy notice, website terms and booking terms reviewed for the final trading entity and business process.
5. Compress production imagery.
6. Verify the quote form, navigation, canonical URLs, sitemap, and social metadata on the deployed domain.
