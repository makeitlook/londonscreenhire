# London Screen Hire

Website for London Screen Hire, built with Next.js, React, TypeScript and
Tailwind CSS. The production build is exported as a static site.

## Getting started

You need:

- Node.js 22.13.0 (see `.nvmrc`)
- npm

Clone and set up the project:

```bash
git clone https://github.com/makeitlook/londonscreenhire.git
cd londonscreenhire
nvm use
npm ci
cp .env.example .env.local
```

If you do not use `nvm`, install the Node version listed in `.nvmrc`.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variable

The quote form uses Web3Forms. Add a test or production key to `.env.local`
only when you need to test a real form submission:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key
```

The website and form interface work locally without a key. Never commit
`.env.local` or a real access key.

## Useful commands

```bash
npm run dev         # Start local development
npm run lint        # Check code quality
npm run typecheck   # Check TypeScript
npm test            # Run automated tests
npm run test:watch  # Run tests while developing
npm run build       # Create the static production build in out/
npm run preview     # Preview an existing build
```

Run `npm run build` before `npm run preview`.

## Editing website content

All editable website copy is in [`src/content`](src/content) as JSON. Content
contributors should not need to change components or application code.

When editing content:

- Change only the relevant JSON files in `src/content/`.
- Keep existing keys and icon values unless a developer asks you to change them.
- Do not add comments or trailing commas; they are invalid in JSON.
- Treat items marked with `"placeholder": true` as unverified.
- Add website images to `public/images/` and update the matching JSON path.

See the [content editing guide](src/content/README.md) for the file list.

## Contributing

All work starts from `dev`:

```bash
git fetch origin
git switch dev
git pull --ff-only origin dev
git switch -c your-name/short-description
```

Make and preview your changes, then run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Commit and push your branch:

```bash
git add .
git commit -m "Describe your change"
git push -u origin your-name/short-description
```

Open a pull request from your branch into `dev`. Do not open feature or content
pull requests directly into `master`.

The release flow is:

```text
feature branch -> dev -> master
```

- Contributor pull requests require approval.
- The repository owner can merge their own pull requests after CI passes.
- Production releases are promoted from `dev` into `master`.

GitHub CI automatically runs linting, type-checking, tests and the production
build on pull requests and protected branches.

## Project structure

```text
src/app/          Pages, metadata and global styles
src/components/   Shared layout and page components
src/content/      Editable website content in JSON
src/data/         Typed adapters used by the application
src/lib/          Validation and shared configuration
public/images/    Website images
docs/             Design and performance guidance
```

For code or design changes, also read:

- [Design system](docs/LONDON_SCREEN_HIRE_DESIGN_SYSTEM.md)
- [Performance budget](docs/PERFORMANCE_BUDGET.md)
