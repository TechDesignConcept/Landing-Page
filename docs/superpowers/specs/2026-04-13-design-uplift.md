# Tech Design Concept — Design Uplift

**Status:** Approved design, ready for implementation planning
**Date:** 2026-04-13
**Author:** Joshua Argy (with Claude Code)

## Summary

Full ground-up redesign of `techdesignconcept.com` (Jekyll on GitHub Pages) from its current soft-blue, light-mode, image-heavy layout into a modern, dark-first, typography-led aesthetic inspired by Vercel, Linear, and Stripe. Brand accent stays Azure blue (#0078D4). Geist typeface replaces system fonts. A new Case Studies section is added as a Jekyll collection. Generated AI imagery is replaced with a single new hero render, a new logo, and CSS-rendered blog cards. Motion is deliberate (cursor-follow glow, scroll reveals, animated counters, marquee). Contact form moves from mailto to Formspree.

## Goals

- Project a "modern technical boutique" brand — engineer-crafted, quality-obsessed, visually distinctive
- Replace inconsistent AI-generated imagery with a coherent visual system
- Introduce a Case Studies section to convert trust-seeking visitors
- Preserve everything that already works: Jekyll structure, GitHub Pages deploy, strict CSP, existing blog content
- Keep the site dependency-light: vanilla HTML/CSS/JS, no build step, no framework

## Non-Goals

- No CMS, no headless content source — markdown files remain the content format
- No framework (React, Vue, etc.) — stays plain Jekyll + vanilla JS
- No e-commerce, no authentication, no gated content
- No multi-language support
- No rewrite of existing blog post content (posts stay as-is; only their presentation changes)

## Brand & Visual Direction

- **Aesthetic:** Modern technical boutique — Vercel / Linear / Stripe reference points
- **Color mode:** Dark-first. No light-mode toggle.
- **Primary accent:** Azure blue `#0078D4` (unchanged from current brand)
- **Personality:** Precise, calm, confident. Typography-led. Whitespace-generous.
- **Anti-patterns to avoid:** Drop shadows on cards, gradient-heavy buttons, stock photography, rounded-bubble UI, Bootstrap-era components.

## Design Tokens

All tokens exposed as CSS custom properties on `:root` in `assets/css/main.css`.

### Colors

```
--bg-0: #0A0A0A            /* page background */
--bg-1: #111113            /* elevated surface (cards, nav) */
--bg-2: #17171A            /* hover / selected surface */
--border: #232327          /* default hairline border */
--border-strong: #2E2E33   /* inputs, dividers, hover borders */
--text-0: #F5F5F7          /* primary text */
--text-1: #A1A1AA          /* secondary text */
--text-2: #71717A          /* tertiary / meta / eyebrows */
--accent: #0078D4          /* Azure blue — links, primary CTA, focus ring */
--accent-hover: #3392DD
--accent-glow: rgba(0,120,212,0.35)
--success: #22C55E
--danger:  #EF4444
```

Contrast: text-0/bg-0 ≈ 16:1, text-1/bg-0 ≈ 7:1, accent/bg-0 ≈ 5:1 — all meet WCAG AA.

### Typography

Typeface: **Geist Sans** + **Geist Mono**, self-hosted as `.woff2` under `/assets/fonts/`, Latin subset. Licensed under OFL — free for commercial use. Self-hosting keeps the CSP locked down (no Google Fonts entry needed).

- **Display / H1:** Geist Sans, 600, 72–96px, tracking -0.03em, line-height 1.05
- **H2:** Geist Sans, 600, 40–56px, tracking -0.02em
- **H3:** Geist Sans, 600, 24–28px
- **Body:** Geist Sans, 400, 16px (18px on lede/hero), line-height 1.65
- **Mono (code, nav labels, eyebrows, stat units):** Geist Mono, 12–14px, tracking 0.08em for uppercase labels

### Spacing scale (4px base)

`--space-1: 4px` through `--space-11: 160px` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160).

### Radii

`--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 16px`, `--radius-pill: 999px`.

### Elevation

No drop shadows by default. Elevation is communicated via `1px solid var(--border)` and `var(--bg-1)` surfaces. Exceptions: accent-glow shadows on primary CTAs (`0 0 40px var(--accent-glow)`) and on the hero object.

### Breakpoints

640, 768, 1024, 1280, 1536.

### Motion

- All CSS transitions use `200ms cubic-bezier(0.4, 0, 0.2, 1)` by default
- All JS animations check `prefers-reduced-motion: reduce` and become no-ops when set

## Component Library

Utility classes in `assets/css/main.css`. No JS framework.

### Buttons
- `.btn` — primary. Azure-blue fill, white text, `--radius-sm`, 44px tall. Hover: accent-glow shadow + 1px translate-Y(-1px).
- `.btn-secondary` — transparent fill, 1px `--border-strong`, text-0 label. Hover: bg `--bg-2`.
- `.btn-ghost` — no border, padded text + arrow icon. For inline tertiary CTAs.
- Sizes: `.btn-sm` (36px), default (44px), `.btn-lg` (52px).
- Focus: 2px `--accent` ring with 2px offset.

### Navigation
Fixed header, 64px tall, `backdrop-filter: blur(12px)` on `rgba(10,10,10,0.7)`, 1px `--border` bottom. Logo left, menu center-right, "Book a call" CTA far right. Active route indicated by 1px `--accent` underline (no background fill). Mobile: existing hamburger pattern, restyled.

### Cards
- `.card` — base surface: `--bg-1`, 1px `--border`, `--radius-md`, 24–32px padding. Hover: `--border-strong`, translate-Y(-2px).
- Variants: `.card-case-study`, `.card-service`, `.card-post`, `.card-team`.

### Forms
- `.form-control` — `--bg-1` bg, 1px `--border-strong`, `--radius-sm`, 14px vertical padding. Mono label above in `--text-2`. Focus: 2px `--accent` ring.
- Validation: `--success` / `--danger` as 2px left border only.

### Icons
Font Awesome stays (already CSP-allowed). Icons inherit `currentColor`. Service icons: 28–32px inside a 48×48 square with 1px hairline border and `--radius-md`.

### Misc primitives
- `.eyebrow` — uppercase Geist Mono, 12px, `--text-2`, tracking 0.08em
- `.tag` — pill-shaped mono label, `--bg-1` bg, 1px `--border`
- `.divider` — full-width 1px `--border` rule, optional centered mono label
- `.glow` — absolutely-positioned div with radial-gradient of `--accent-glow`
- `.marquee` — horizontal auto-scrolling logo strip, edge-masked, pauses on hover
- `.stat` — big number + mono unit label, animates from 0 on scroll-into-view
- `.testimonial` — large quote glyph + quote + attribution (opt-in; only renders when real quotes exist)
- `.noise` — SVG noise overlay at 3% opacity sitewide

## Layout Primitives

- `.container` — max-width 1200px, 24px gutter
- `.container-wide` — max-width 1440px (marquees, hero bleed)
- `.section` — 96px vertical padding (64px on mobile)
- `.grid-2` / `.grid-3` / `.grid-4` — responsive grids
- `.hero` — full-width, 88vh min, 2-column desktop / stacked mobile
- Page atmospherics — slow animated radial gradient (accent-glow at 5% opacity, 40s cycle) anchored top-center of every page

## Page Treatments

### Home (`index.html`)
1. Hero — large headline, subhead, primary + secondary CTAs, 3D abstract render (right) with cursor-follow glow
2. Trust marquee — Azure / Microsoft / GitHub / Terraform / Bicep / Entra ID / Defender logos, auto-scrolling
3. Services — three `.card-service` (Migration / Security / DevOps) with icons + "Learn more →"
4. Featured case study — single large `.card-case-study` with metric block + animated counters
5. Approach — four-step numbered blocks (Discover / Design / Implement / Enable)
6. Recent writing — three most recent blog posts as `.card-post`
7. CTA band — "Ready to transform?" + book-a-call button

### About (`about/index.html`)
1. Page header — eyebrow "About", display headline, lede paragraph
2. Story — 2-column layout, copy left, pull-quote or stat right
3. Approach — numbered list (same four-step motif as home)
4. Team — `.card-team` (no photos) with name, role, bio, social links
5. Certifications — mono-labeled grid (Microsoft / Security / Project Management)

### Services (`services/index.html`)
1. Page header — eyebrow + display headline
2. Three deep-dive full-width sections (Cloud Migration / Security / DevOps) — each 2-column with large "01 / 02 / 03" number eyebrow, headline, copy, bulleted scope list, one focal icon. No stock imagery.
3. Additional services grid — 4 `.card-service` (Infrastructure / Data / Training / AI)
4. CTA band

### Work — Case Studies (new: `work/index.html` + `_case_studies/` collection + `_layouts/case-study.html`)
1. Page header — eyebrow "Work", headline "Recent engagements"
2. List of case studies from the collection as `.card-case-study`
3. Individual case study page (`/work/:slug/`) — hero with title + metric block, then Challenge / Approach / Outcome sections

### Blog (`blog/`)
1. Page header — eyebrow "Writing", headline
2. Posts grid — uniform CSS-rendered cards (dark gradient bg + title overlay) driven by post frontmatter. No per-post generated images on the index.
3. Individual post pages — Geist body type, `pre`/`code` in Geist Mono on `--bg-1` surface, clean typography. Existing in-body post images remain.

### Contact (`contact/index.html`)
1. Page header — eyebrow "Let's talk", display headline
2. Two-column layout:
   - Left: form (name / email / company / message) submitting via Formspree
   - Right: contact details, social links, response-time expectation
3. Successful submit replaces form with inline success state (no page reload)

### Privacy, 404
Light restyle to match the system. No layout changes.

## Assets

### Generated (new)
1. **Logo** — abstract geometric mark (stacked cloud layers / layered architectural form) + "Tech Design Concept" wordmark. Delivered as inline SVG (CSP-safe, scalable). Favicon + Apple touch icon regenerated from the mark.
2. **Hero render** — abstract floating geometric composition in Azure-blue tones with chromatic-aberration glow, ~1600×1600 PNG with transparency. Replaces `LandingPageImage.png`.
3. **OG / social share image** — 1200×630 branded card, wired via `jekyll-seo-tag`.
4. **Blog card template** — CSS-rendered (not generated images) so new posts auto-generate cards from frontmatter.

### Removed
- `LandingPageImage.png`, `cloud-technology-vector-logo.png`, `modern-security.png`, `microsoft-azure-migration-gb-S-1.png`, `githubdevops.png`
- Three UUID-named AI-generated photos including the team photo at `about/`
- Existing blog post featured images stay in the repo (still referenced as in-body imagery inside post markdown), but are not shown on the blog index card grid

### Font files
- `Geist-Regular.woff2`, `Geist-Medium.woff2`, `Geist-SemiBold.woff2`, `GeistMono-Regular.woff2`, `GeistMono-Medium.woff2` at `/assets/fonts/`. Latin subset to minimize payload.

### Trust-marquee logos
Small monochrome SVGs inlined for CSP safety: Azure, Microsoft, GitHub, Terraform, Bicep, Entra ID, Defender for Cloud. Sourced from each vendor's brand kit under their permitted marketing-usage terms.

## Technical Architecture

### CSS organization — single `assets/css/main.css`
1. `@font-face` declarations
2. `:root` design tokens
3. Reset + base (html, body, typography, focus rings, `prefers-reduced-motion`)
4. Layout primitives
5. Components
6. Page-specific sections (only where they can't be expressed as components)
7. Utilities
8. Responsive overrides at the bottom, grouped by breakpoint

Target: 900–1100 lines total.

### JS organization — vanilla, no libraries
- `assets/js/menu.js` — existing mobile menu, kept with minor restyle wiring
- `assets/js/motion.js` (new) — IntersectionObserver-based scroll reveals, cursor-follow hero glow, animated stat counters, marquee pause-on-hover. Respects `prefers-reduced-motion`.
- `assets/js/contact.js` (new) — Formspree fetch submission, client-side validation, inline success state

### Jekyll configuration

In `_config.yml`:
- Add `collections: case_studies:` with `output: true` and `permalink: /work/:slug/`
- Add default frontmatter mapping `_case_studies/*` → `layout: case-study`
- Add `formspree_id: <value>` for the contact form action URL

New files:
- `_layouts/case-study.html` — individual case study layout
- `work/index.html` — collection listing page
- `_includes/case-study-card.html`
- `_includes/blog-card.html`
- `_includes/stat.html`
- `_includes/marquee.html`
- `_case_studies/` directory for content

### Case study frontmatter schema

```yaml
---
title: "Fintech lift-and-shift to Azure"
client: "Confidential — tier-1 financial services"
industry: "Financial Services"
duration: "8 weeks"
services: [Cloud Migration, Security]
summary: "Short 1–2 sentence outcome hook shown on the card."
metrics:
  - "200+ VMs migrated"
  - "Zero production downtime"
  - "32% infra cost reduction"
---

## Challenge
...

## Approach
...

## Outcome
...
```

### CSP updates in `_layouts/default.html`

- `font-src` — no external font CDN; keeps `'self'` and Font Awesome allowances
- `connect-src` — add `https://formspree.io`
- `img-src` — remove unused `https://source.unsplash.com`; keeps `'self' data:`
- `script-src`, `style-src`, COEP/COOP/CORP — unchanged from current

### Formspree wiring

User creates a free Formspree form, stores the ID in `_config.yml` as `formspree_id`. The contact form uses that ID as its action URL. No secret in the repo; public form IDs are safe to commit.

### Build / deploy
Zero change. GitHub Pages from `main`, `bundle exec jekyll serve` locally.

### Accessibility
- Contrast checked for every token combination (all meet WCAG AA)
- All interactive elements keyboard-reachable with visible focus ring
- `prefers-reduced-motion` kills all JS animations and CSS transitions
- Proper landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`), a skip-to-main link, strict heading hierarchy on every page

## Success Criteria

- Every existing page renders in the new design system without missing content
- Lighthouse scores remain ≥95 for Performance, Accessibility, Best Practices, SEO
- Total CSS payload ≤ 30KB gzipped
- Total JS payload ≤ 10KB gzipped (excluding the existing `gtag.js` third-party script)
- Contact form submits successfully to Formspree end-to-end
- At least one real case study is published under `_case_studies/`
- Zero console errors, zero CSP violations in Chrome, Firefox, Safari
- Mobile (375px) through desktop (1920px) all render correctly with no horizontal scroll

## Open Items (to resolve during implementation)

- Exact 3D hero render prompt and generation workflow — to be finalized when we generate it
- Exact logo mark concept — several iterations expected; final selected during implementation
- Final copy for hero headline, approach steps, and CTAs — current site copy carries over as a starting point; may be refined during build
- Primary CTA wiring — label copy uses "Book a call" / "Get in touch" in the design; actual link target stays as mailto (same as today) unless a calendar-booking URL is provided later

## Out of Scope (explicitly deferred)

- Testimonial content — `.testimonial` component is built but only rendered once real quotes are collected
- Light-mode toggle — can be added later if needed; not part of this project
- Pricing / engagement-models page — not added in this pass
- Analytics changes beyond the existing GA4 (`G-8V446GX4QE`) integration
