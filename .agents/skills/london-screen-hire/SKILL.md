---
name: london-screen-hire
description: Build and maintain the London Screen Hire website while matching the approved mockup, following the project design system and keeping the implementation lightweight.
---

# London Screen Hire Website Skill

## Objective

Build a lightweight, high-performing single-page website for London Screen Hire.

The supplied client mockup is the visual specification.

The implementation must closely reproduce the mockup rather than reinterpret it as a generic marketing website.

Before modifying any UI, read:

`docs/LONDON_SCREEN_HIRE_DESIGN_SYSTEM.md`

## Required technology

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Lucide icons
- Framer Motion for restrained, section-specific animation
- Static typed data or JSON
- Repository-hosted images
- Web3Forms via native browser fetch for the quote form

Do not introduce without explicit instruction:

- CMS
- Database
- Authentication
- Admin dashboard
- Global state library
- Alternative UI framework
- Alternative icon library
- Client-side email package
- Generic page builder
- Design-token package
- Unnecessary animation framework
- Speculative infrastructure

## Decision process

Before adding code, ask:

1. Does this need to exist?
2. Does the repository already contain a suitable implementation?
3. Can standard HTML, CSS or JavaScript solve it?
4. Does React, Next.js or the browser provide it natively?
5. Can an installed dependency solve it cleanly?
6. Can it remain clear without another abstraction?
7. Only then create the minimum implementation that works.

Use YAGNI.

Do not create speculative infrastructure.

## Visual source of truth

Use this priority:

1. Supplied client mockup
2. Approved London Screen Hire brand assets
3. `docs/LONDON_SCREEN_HIRE_DESIGN_SYSTEM.md`
4. Confirmed client content
5. Existing project conventions
6. shadcn defaults

Never allow default shadcn styling to determine the final appearance.

shadcn is used for:

- Accessibility
- Interaction behaviour
- Form foundations
- Dialogs
- Sheets
- Carousels
- Notifications

Tailwind and project CSS define the appearance.

## Mockup fidelity

Match the mockup's:

- Section order
- Section proportions
- Header structure
- Hero composition
- Heading scale
- Typography character
- Blue accent usage
- Dark and light section sequence
- Card dimensions
- Image ratios
- Borders
- Button shape
- Spacing rhythm
- Alignment
- Content density

Do not add decorative features merely to make the website appear more modern.

Do not replace the design with:

- Gradient-heavy styling
- Glassmorphism
- Huge rounded cards
- Pill-shaped controls
- Floating navigation
- SaaS dashboard patterns
- Generic bento grids
- Excessive animation
- AI-style decorative backgrounds

## Architecture principles

Server Components are the default.

Add `"use client"` only when required for:

- User interaction
- Browser APIs
- Form state
- Carousel controls
- Dialog controls
- Mobile navigation
- Toast notifications
- Framer Motion hooks or animated elements

Keep Client Components as small and local as possible.

Do not convert an entire section or page into a Client Component because one child needs interaction.

## Component principles

Reuse existing components before creating new ones.

Create components for:

- Repeated visual patterns
- Meaningful interactive units
- Complex sections that benefit from isolation
- shadcn primitives
- Repeated project-specific styling

Do not create:

- One-line wrapper components
- Generic abstractions used once
- Premature variants
- Large prop-driven components for imagined future layouts
- Barrel exports without a clear benefit
- Duplicate button, card or container systems

Keep section components readable and self-contained.

## Styling principles

Use Tailwind for component styling.

Use global CSS for:

- Design variables
- Font variables
- Base element styling
- Shared accessibility behaviour
- Carefully justified global utilities

Do not place section-specific layout rules in global CSS unless Tailwind would be substantially less clear.

Use:

- Small corner radii
- Thin borders
- Restrained shadows
- Approved blue accents
- Strong dark and light section contrast

Do not introduce unapproved colours.

Do not use gradients unless visible in the supplied mockup.

## Typography principles

Use the approved condensed heading font and neutral body font.

Headings should generally be:

- Uppercase
- Bold or semibold
- Condensed
- Tightly tracked
- Tightly spaced vertically

Do not arbitrarily alter heading line breaks from the mockup.

Use responsive type sizing that preserves the intended composition.

## Image principles

Use real London Screen Hire images once supplied.

Do not use stock imagery in the final implementation.

Use `next/image` unless a valid technical reason prevents it.

For every image:

- Set dimensions or a controlled aspect ratio
- Use an appropriate `sizes` value
- Optimise loading priority
- Preserve the focal point
- Provide correct alt text
- Avoid unnecessary quality settings
- Avoid using the original full-resolution asset where a smaller source is sufficient

Only the true hero image should normally use priority loading.

## Animation principles

Use CSS transitions for simple hover, focus and image-scale effects.

Use Framer Motion only when it provides meaningful control.

Approved uses include:

- Hero content entrance
- Header background transition on scroll
- Service-card reveal
- Project-card reveal
- Statistics reveal
- Testimonial entrance
- Contact-section entrance
- Internal mobile-menu content

Rules:

- Use `useReducedMotion()` where Framer Motion is involved
- Respect `prefers-reduced-motion`
- No looping animations
- No large parallax
- No cursor-following effects
- No artificial loading screen
- No text scrambling
- No delayed access to content
- No excessive stagger
- Maximum recommended stagger is 0.1 seconds across no more than three grouped items
- Do not animate every element simply because animation is available

## Data principles

Store content in repository data files.

Use typed TypeScript data when values include:

- Icon components
- Literal categories
- Compile-time constraints
- Imported assets

Use JSON for simple serialisable content.

Do not introduce:

- Repository classes
- Service classes
- Fetch wrappers
- API layers
- Schema systems

unless a real requirement needs them.

Never invent:

- Client statistics
- Testimonials
- Customer logos
- Accreditations
- Years in business
- Event counts
- Geographic coverage
- Equipment specifications

Use explicit placeholders until content is confirmed.

## Form principles

The quote form must use:

- shadcn form controls
- Client-side validation
- Native `fetch`
- Web3Forms
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
- Honeypot spam protection
- Accessible labels
- Clear field errors
- Loading, success and error states
- A clear submission confirmation

Do not:

- Hardcode the access key
- Add EmailJS
- Add a server-side email provider unless requested
- Add a custom API route unless requested
- Expose unnecessary user data
- Use placeholder-only labels

## Responsive principles

Design each section deliberately for:

- Mobile
- Tablet
- Desktop
- Large desktop

Do not treat mobile as an automatic vertical stack.

Maintain:

- Visual hierarchy
- Strong hero impact
- Clear calls to action
- Legible typography
- Useful image crops
- Comfortable touch targets
- Appropriate section spacing

Prevent horizontal overflow.

Test at:

- 375px
- 390px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## Accessibility principles

Use semantic HTML.

Required:

- One H1
- Logical heading order
- Landmark elements
- Keyboard navigation
- Visible focus states
- Accessible shadcn Sheet and Dialog behaviour
- Form labels
- Error associations
- Sufficient contrast
- Reduced-motion support
- Appropriate alt text
- Descriptive link and button labels

Do not remove accessibility behaviour to achieve visual fidelity.

Find a visually faithful accessible solution.

## Performance principles

Keep the site lightweight.

Prefer:

- Static rendering
- Server Components
- Native CSS
- Optimised images
- Local data
- Minimal dependencies
- Minimal third-party scripts

Avoid:

- Hydrating static content
- Loading unused shadcn components
- Large animation bundles
- Duplicate icon packages
- Client-side fetching for static content
- Generic utility libraries for trivial logic
- Unnecessary dynamic imports
- Premature memoisation

Do not optimise without evidence, but do not knowingly introduce obvious waste.

## shadcn principles

Use shadcn primitives only where they provide useful accessible behaviour.

Examples:

- Button
- Sheet
- Form controls
- Dialog
- Carousel
- Sonner

Do not install shadcn components before they are needed.

Do not use default shadcn appearance without adapting it to the London Screen Hire design system.

The mobile navigation must use shadcn Sheet rather than a custom menu implementation.

## Change workflow

Before editing:

1. Inspect related files.
2. Identify existing patterns.
3. Read `docs/LONDON_SCREEN_HIRE_DESIGN_SYSTEM.md`.
4. Confirm the relevant mockup section.
5. Reuse existing primitives where suitable.
6. Plan the smallest coherent change.

During implementation:

1. Build the structural layout.
2. Match dimensions and spacing.
3. Apply typography.
4. Apply colours and borders.
5. Add responsive behaviour.
6. Add interaction only where required.
7. Compare against the mockup.

After implementation:

1. Run lint.
2. Run typecheck.
3. Run the production build.
4. Check for console warnings.
5. Check for hydration errors.
6. Review at required viewport sizes.
7. Report files changed and key decisions.

## Visual QA checklist

For every completed section, verify:

- Does its height match the reference?
- Is the content container aligned correctly?
- Does the heading wrap in the correct place?
- Is the image crop equivalent?
- Are card widths and heights correct?
- Is border weight accurate?
- Is the corner radius restrained?
- Are button dimensions accurate?
- Is blue used in the correct places?
- Is vertical spacing consistent with the mockup?
- Does the section transition correctly into the next section?
- Does mobile preserve the design character?

A section is not complete merely because it is functional.

## Code quality rules

- TypeScript must remain strict.
- Do not use `any` unless unavoidable and documented.
- Avoid duplicated constants.
- Avoid unused abstractions.
- Avoid deeply nested conditional rendering.
- Prefer clear names over comments.
- Add comments only where intent is not apparent.
- Keep imports organised.
- Remove dead code.
- Do not leave commented-out implementations.
- Do not suppress lint rules without a documented reason.
- Do not change unrelated files.
- Preserve the existing package manager.

## Completion report

After each implementation task, report:

1. What was changed
2. Files created
3. Files modified
4. Files removed
5. Existing components reused
6. New dependencies, if any
7. Design-system decisions followed
8. Responsive behaviour implemented
9. Validation results
10. Remaining placeholders or unresolved content
