# London Screen Hire Design System

## 1. Purpose

This document is the visual and implementation reference for the London Screen Hire website.

The supplied client mockup is the primary visual specification.

The website must reproduce the mockup as closely as reasonably possible while remaining:

- Responsive
- Accessible
- Fast
- Maintainable
- Production-ready

This document does not give permission to reinterpret the mockup or replace it with a generic marketing-site design.

## 2. Core design principle

The website should look like the supplied London Screen Hire mockup.

The mockup is not loose inspiration.

It defines:

- Overall visual direction
- Section order
- Colour balance
- Typography style
- Layout density
- Card proportions
- Image treatment
- Button treatment
- Spacing rhythm
- Dark and light section transitions
- Information hierarchy

Where this document and the mockup differ, the mockup takes priority unless the difference is required for accessibility, responsiveness or technical correctness.

## 3. Design character

The visual identity should feel:

- Premium
- Technical
- Confident
- Modern
- Event-focused
- High-impact
- Professional
- Reliable

The website should not feel:

- Playful
- Soft
- Pastel
- Overly rounded
- Like a SaaS dashboard
- Like a default shadcn website
- Like a generic AI-generated landing page
- Over-animated
- Visually cluttered

## 4. First-release page format

The first release is a single-page website.

Primary section order:

1. Header
2. Hero
3. Featured services strip
4. Recent projects
5. Why choose London Screen Hire
6. Statistics strip
7. Testimonials
8. Contact and quote form
9. Footer

Do not add additional homepage sections without approval.

Navigation items should scroll to page sections.

Supporting legal pages may use separate static routes.

## 5. Visual source-of-truth order

When making design decisions, use this priority:

1. Supplied client mockup
2. Approved London Screen Hire logo and brand assets
3. This design-system document
4. Confirmed client content
5. Existing project conventions
6. shadcn defaults

shadcn defaults must never override the mockup.

## 6. Layout system

### Content width

Use a consistent central content container.

Initial values:

```css
--container-max: 1440px;
--content-max: 1280px;
--content-padding-mobile: 20px;
--content-padding-tablet: 32px;
--content-padding-desktop: 48px;
```

These are starting values. Adjust them through direct visual comparison against the mockup.

### Section spacing

Desktop sections should generally use generous vertical spacing.

Initial ranges:

- Desktop: 96px to 128px
- Tablet: 72px to 96px
- Mobile: 56px to 72px

Do not force one universal padding value onto every section.
Match each section's height and density to the mockup.

### Grid behaviour

Use CSS Grid for structured card layouts.

Use Flexbox for:

- Navigation
- Inline actions
- Small alignment groups
- Icon and text combinations

Avoid unnecessary absolute positioning.

Absolute positioning is appropriate for:

- Hero overlays
- Decorative layers shown in the mockup
- Image labels
- Controlled overlapping elements

## 7. Colour system

Final colours must be sampled from the client's original logo and approved assets.

Until those assets are available, use these provisional values:

```css
:root {
  --lsh-black: #05070a;
  --lsh-dark: #0a0d12;
  --lsh-charcoal: #171a1f;
  --lsh-charcoal-light: #20242b;

  --lsh-blue: #0868f7;
  --lsh-blue-hover: #1977ff;
  --lsh-blue-dark: #0756ca;

  --lsh-white: #ffffff;
  --lsh-off-white: #f4f5f6;
  --lsh-grey-100: #e8eaed;
  --lsh-grey-300: #b8bec8;
  --lsh-grey-500: #858d99;
  --lsh-grey-700: #3d434c;

  --lsh-border-dark: rgba(255, 255, 255, 0.16);
  --lsh-border-light: rgba(5, 7, 10, 0.14);
}
```

### Colour usage

Use black and dark charcoal for:

- Header
- Hero
- Services
- Why choose us
- Contact
- Footer

Use white or off-white for:

- Projects
- Testimonials
- Selected content breaks shown in the mockup

Use blue for:

- Primary buttons
- Icons
- Statistics strip
- Links
- Focus states
- Small emphasis details

Do not introduce extra accent colours without approval.

Do not add gradients unless they are visible in the mockup.

## 8. shadcn theme mapping

shadcn/ui provides accessible primitives and interaction behaviour.

It does not define the London Screen Hire visual style.

Suggested variable mapping:

```css
:root {
  --background: 210 17% 98%;
  --foreground: 220 33% 3%;

  --card: 0 0% 100%;
  --card-foreground: 220 33% 3%;

  --primary: 216 94% 50%;
  --primary-foreground: 0 0% 100%;

  --secondary: 216 12% 12%;
  --secondary-foreground: 0 0% 100%;

  --muted: 216 14% 94%;
  --muted-foreground: 216 8% 40%;

  --border: 216 10% 82%;
  --input: 216 10% 82%;
  --ring: 216 94% 50%;

  --radius: 0.25rem;
}
```

Do not add a user-selectable light or dark mode.

Use explicit section colours where required to reproduce the mockup.

## 9. Typography

### Heading font

Use a bold condensed sans-serif similar to the mockup.

Initial choice: **Barlow Condensed**

Approved fallback for evaluation: Oswald

Do not change the heading font without comparing it directly against the mockup.

### Body font

Use: **Inter**

### Heading behaviour

Primary headings should generally be:

- Uppercase
- Condensed
- Bold or semibold
- Tightly tracked
- Tightly spaced vertically
- Visually dominant

Suggested Tailwind direction:

```
font-heading uppercase font-semibold tracking-[-0.02em] leading-[0.92]
```

### Initial type scale

Treat these as starting points:

**Hero heading:**

- Mobile: 3.25rem
- Tablet: 5rem
- Desktop: 7rem to 8rem

**Section heading:**

- Mobile: 2.25rem
- Tablet: 3rem
- Desktop: 4rem to 4.75rem

**Card heading:** 1.125rem to 1.5rem

**Body:** 1rem to 1.125rem

**Small label:** 0.75rem to 0.875rem

Use responsive `clamp()` values where they preserve the mockup more accurately.

Do not allow responsive type to create line breaks that significantly change the supplied composition.

## 10. Buttons

### Primary button

Use:

- Electric blue background
- White text
- Rectangular shape
- Small corner radius
- Medium or bold label
- Optional arrow icon
- Clear hover state
- No pill shape
- No excessive shadow

### Secondary button

Use:

- Transparent or dark background
- White border on dark sections
- Dark border on light sections
- Strong contrast
- Same height as the primary button

### Behaviour

Buttons must have:

- Visible keyboard focus
- Disabled state
- Hover state
- Active state
- Sufficient touch target
- Clear wording

Avoid elastic, bouncy or exaggerated animation.

## 11. Borders, radius and shadows

The mockup uses structured and precise cards.

Default direction:

- Radius: 2px to 6px
- Border: 1px
- Shadow: minimal or none

Do not use:

- Large 16px to 32px card radii
- Pill-shaped cards
- Heavy floating shadows
- Glassmorphism
- Blurred translucent panels unless explicitly shown in the mockup

## 12. Header

### Desktop requirements

- Logo on the left
- Navigation visually balanced through the centre
- Quote button on the right
- Dark background
- Clear active and hover states
- Sticky or fixed behaviour matching the intended mockup experience
- No floating rounded navbar treatment

### Mobile requirements

- Logo
- Menu trigger
- Prominent quote or contact action
- shadcn Sheet for accessible navigation
- Correct focus trapping and dismissal
- No crowded desktop navigation squeezed onto mobile

Framer Motion may animate internal menu content, but shadcn Sheet must provide the menu foundation.

## 13. Hero

The hero is the most important visual section.

Requirements:

- Large real LED event image
- Dark overlay for readability
- Strong left-aligned heading
- Supporting copy
- Primary quote button
- Optional secondary action only if it matches the composition
- Correct image focal point
- Height and crop matched to the mockup

No stock photography in the final version.

Do not use autoplay video in the initial release unless approved.

Only the true hero image should normally use priority loading.

## 14. Featured services strip

The strip beneath the hero must feel attached to the hero composition.

Requirements:

- Six featured services on desktop
- Thin separators or card borders
- Blue line icons
- Compact descriptions
- Consistent item height
- Dark background
- Exact alignment with the main content container

Mobile may use:

- Two-column grid
- Horizontal scroll
- Compact stacked cards

Choose the approach that best preserves the supplied hierarchy.

## 15. Projects section

Project imagery is a core visual element.

Requirements:

- White or off-white section as shown in the mockup
- Strong image-led cards
- Consistent image ratio
- Minimal text
- Controlled image crops
- Subtle hover movement
- Multi-column desktop arrangement matching the reference
- No unnecessary card chrome

Use a shadcn Dialog for enlarged images only if approved or needed.

## 16. Why choose us section

Use the split composition shown in the mockup:

- Brand statement and supporting content on the left
- Structured benefit cards on the right

Cards should contain:

- Lucide or approved custom icon
- Short title
- Brief supporting text
- Thin border
- Dark background
- Restrained hover state

Do not publish claims that the client has not verified.

## 17. Statistics strip

The statistics area should use brand blue as a strong horizontal break.

Requirements:

- High-contrast white numbers
- Condensed typography
- Short labels
- Even column distribution
- Responsive stacking
- Verified values only

Keep unconfirmed numbers visibly marked as placeholders in the data source.

## 18. Testimonials

Requirements:

- White or off-white section
- Three-column desktop layout
- Strong quote hierarchy
- Client name and role
- Star rating only where verified
- Controlled card height
- Mobile carousel only if it improves use

Do not invent reviews.

## 19. Contact and quote section

The final conversion section should be dark and visually substantial.

Requirements:

- Contact information
- Phone link
- Email link
- WhatsApp action
- Quote form
- Strong section heading
- Clear submit action
- Privacy and consent text
- Accessible labels
- Useful error messages
- Web3Forms submission via native browser fetch

The form will use:

- shadcn form controls
- Client-side validation
- Honeypot spam protection
- Local loading, success and error state
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

Do not hardcode the access key.

## 20. Iconography

Use Lucide icons unless the mockup or client assets require custom icons.

Rules:

- Consistent stroke width
- Primarily blue on dark backgrounds
- Simple line style
- No mixed icon libraries
- No decorative icons without meaning
- Accessible labels where required

## 21. Imagery

Final imagery must come from London Screen Hire.

Relevant categories include:

- Indoor LED screens
- Outdoor LED screens
- Corporate events
- Weddings
- Concerts
- Festivals
- Staging
- Lighting
- Sound equipment
- Installations
- Technical team

Rules:

- Preserve natural event lighting
- Avoid excessive filters
- Use consistent crop ratios
- Use AVIF or WebP where suitable
- Provide meaningful alt text
- Use empty alt text for decorative images
- Do not load full-resolution originals in small cards
- Use `next/image` unless a genuine technical limitation applies

## 22. Motion

Animations should feel premium, restrained and intentional.

### Approved use cases

- Hero heading and supporting copy entrance
- Header background transition on scroll
- Service-card reveal
- Project-card reveal
- Statistics reveal
- Testimonial entrance
- Contact-section entrance
- Internal mobile-menu content
- Subtle image scale on hover

Use CSS transitions for simple hover and focus behaviour.

Use Framer Motion for section-specific effects where it provides meaningful control.

### Rules

- Respect `prefers-reduced-motion`
- Use `useReducedMotion()` where Framer Motion is involved
- No looping animation
- No large parallax
- No cursor-following effects
- No artificial loading screen
- No text scrambling
- No delayed access to content
- No excessive stagger
- Maximum recommended stagger: 0.1 seconds between no more than three grouped items
- Do not turn the whole page into a Client Component

## 23. Responsive design

Design each section deliberately for mobile, tablet and desktop.

Do not rely on simply stacking the desktop layout.

Test at minimum:

- 375px
- 390px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

### Mobile priorities

- Strong but legible hero
- Prominent call and quote actions
- Useful image crops
- Comfortable form controls
- Clear service presentation
- No horizontal overflow
- Reduced motion where requested
- Consistent visual identity

## 24. Accessibility

Minimum requirements:

- Semantic landmarks
- One page-level H1
- Logical heading hierarchy
- Keyboard-accessible navigation
- Visible focus styles
- Proper form labels
- Sufficient colour contrast
- Descriptive action labels
- Accessible shadcn Sheet and Dialog behaviour
- Reduced-motion support
- Correct alt text
- No content conveyed by colour alone

Do not remove accessibility behaviour for visual fidelity.

Find an accessible implementation that remains visually faithful.

## 25. Performance

The website should remain lightweight.

Priorities:

- Server Components by default
- Minimal client JavaScript
- Optimised images
- Locally stored content
- Next.js-managed or local fonts
- Minimal third-party scripts
- Lazy loading below the fold
- No CMS runtime
- No database
- No unnecessary global state
- No client-side data fetching for static content
- No unused shadcn components
- No unnecessary dynamic imports

Framer Motion should only be included in bundles for components that actually use it.

## 26. Component principles

Create a component when:

- It is reused
- It has meaningful independent behaviour
- It isolates a clear repeated pattern
- It makes a complex section easier to understand
- It wraps a shadcn primitive with project-specific styling

Do not create a component when:

- It is a one-line wrapper
- It is used once and adds indirection
- It exists only for possible future reuse
- Native HTML is clearer
- A current shadcn primitive already provides the behaviour

Do not create a generic page-builder system.

## 27. Data principles

Store content in typed TypeScript files or JSON in the repository.

Suggested content groups:

- Site details
- Navigation
- Services
- Projects
- Benefits
- Statistics
- Testimonials
- Contact details

Prefer TypeScript when:

- Values reference icon components
- Literal types are useful
- Compile-time validation improves safety

Prefer JSON when:

- Content is purely serialisable
- No imports are required
- Simpler editing is useful

Do not build a data-access abstraction.

Never invent:

- Client statistics
- Testimonials
- Customer logos
- Accreditations
- Years in business
- Event counts
- Geographic coverage
- Equipment specifications

Use explicit placeholders until confirmed.

## 28. Visual QA

Every major section must be compared directly against the supplied mockup.

Check:

- Section height
- Container width
- Horizontal alignment
- Typography scale
- Heading wrapping
- Image crop
- Card ratio
- Border weight
- Corner radius
- Button dimensions
- Colour balance
- Vertical spacing
- Dark and light transitions
- Relationship to the sections above and below

### Recommended workflow

1. Build one section
2. Render it at the reference viewport
3. Compare it against the mockup
4. Correct visible differences
5. Check responsive behaviour
6. Continue only after the section is visually close
7. Review the complete page after every major addition

A section is not complete merely because it looks attractive independently.

It must match the full-page composition.

## 29. Implementation decision rule

Before creating code, ask:

1. Does this need to exist?
2. Is an appropriate implementation already present?
3. Can standard HTML, CSS or JavaScript solve it?
4. Is there a native React, Next.js or browser feature?
5. Can an existing installed dependency solve it?
6. Can it remain simple without another abstraction?

Only then create the minimum implementation that works.

Use YAGNI.
