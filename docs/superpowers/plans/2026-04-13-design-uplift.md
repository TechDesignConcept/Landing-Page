# TDC Landing Page Design Uplift — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `techdesignconcept.com` end-to-end in a dark-first, Geist-typography, Azure-blue design system modelled on Vercel / Linear / Stripe.

**Architecture:** Single `assets/css/main.css` driven by CSS custom properties (design tokens). Plain HTML/Jekyll includes; no build step. Vanilla JS for motion (`motion.js`) and contact form (`contact.js`). New Jekyll collection `_case_studies` serves a `/work/` section. Self-hosted Geist fonts under `/assets/fonts/`.

**Tech Stack:** Jekyll (GitHub Pages), vanilla HTML/CSS/JS, Font Awesome (CDN), Formspree (existing endpoint `xgvaqnyd`), Google Analytics (existing `G-8V446GX4QE`).

**Testing approach:** This project has no test suite. "Tests" are visual + behavioural verification via `bundle exec jekyll serve` at `http://localhost:4000`, browser DevTools console checks (zero CSP violations, zero errors), and Lighthouse audits. Each task specifies the exact verification step.

**Reference:** Spec at `docs/superpowers/specs/2026-04-13-design-uplift.md`.

---

## Phase 0 — Baseline and foundations

### Task 0.1: Snapshot current state and create a feature branch

**Files:**
- Modify: git refs only

- [ ] **Step 1: Confirm working tree is clean**

Run: `git status`
Expected: no staged/unstaged files beyond spec + plan.

- [ ] **Step 2: Create and switch to a feature branch**

Run: `git checkout -b design-uplift-2026-04`
Expected: `Switched to a new branch 'design-uplift-2026-04'`

- [ ] **Step 3: Commit any outstanding docs first**

If `git status` shows untracked plan/spec files, add and commit them:

```bash
git add docs/superpowers/plans/2026-04-13-design-uplift.md
git commit -m "docs: add design uplift implementation plan"
```

---

### Task 0.2: Download and install Geist fonts

Geist is licensed OFL / free for commercial use. The `.woff2` files are distributed at https://github.com/vercel/geist-font (in `packages/next/dist`). Download the Latin subset variants we need.

**Files:**
- Create: `assets/fonts/GeistVF.woff2` (variable font, all weights)
- Create: `assets/fonts/GeistMonoVF.woff2` (variable font, all weights)
- Create: `assets/fonts/LICENSE.txt` (OFL license text)

- [ ] **Step 1: Create fonts directory**

Run: `mkdir -p assets/fonts`

- [ ] **Step 2: Download the variable font files**

Manual step. Fetch these from the Vercel Geist GitHub release or https://vercel.com/font:
- `GeistVF.woff2`
- `GeistMonoVF.woff2`
- `OFL.txt` → save as `assets/fonts/LICENSE.txt`

Place them in `assets/fonts/`.

- [ ] **Step 3: Verify files exist and are reasonable size**

Run: `ls -la assets/fonts/`
Expected: both woff2 files present, each ~60–100 KB.

- [ ] **Step 4: Commit**

```bash
git add assets/fonts/
git commit -m "chore: add Geist and Geist Mono variable fonts (OFL licensed)"
```

---

## Phase 1 — Design tokens and base CSS

### Task 1.1: Replace `main.css` with token-driven base styles

This rewrites the file in phases. Task 1.1 lays down the tokens + reset + typography. Subsequent tasks append components.

**Files:**
- Modify: `assets/css/main.css` (full rewrite)

- [ ] **Step 1: Back up the existing CSS to a reference copy**

Run: `cp assets/css/main.css assets/css/main.legacy.css`

This gives a reference while building. It's removed in Phase 14.

- [ ] **Step 2: Overwrite `assets/css/main.css` with the new base**

Replace the entire file with:

```css
---
---
/*
 * Tech Design Concept — main.css
 * Dark-first design system. Geist typography. Azure blue accent.
 * See docs/superpowers/specs/2026-04-13-design-uplift.md
 */

/* ─────────────────────────────────────────────────────────────
   1. Fonts
   ───────────────────────────────────────────────────────────── */
@font-face {
    font-family: 'Geist';
    src: url('/assets/fonts/GeistVF.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Geist Mono';
    src: url('/assets/fonts/GeistMonoVF.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}

/* ─────────────────────────────────────────────────────────────
   2. Tokens
   ───────────────────────────────────────────────────────────── */
:root {
    /* Color — surfaces */
    --bg-0: #0A0A0A;
    --bg-1: #111113;
    --bg-2: #17171A;

    /* Color — borders */
    --border: #232327;
    --border-strong: #2E2E33;

    /* Color — text */
    --text-0: #F5F5F7;
    --text-1: #A1A1AA;
    --text-2: #71717A;

    /* Color — brand accent */
    --accent: #0078D4;
    --accent-hover: #3392DD;
    --accent-glow: rgba(0, 120, 212, 0.35);
    --accent-glow-soft: rgba(0, 120, 212, 0.08);

    /* Color — semantic */
    --success: #22C55E;
    --danger: #EF4444;

    /* Typography */
    --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'Geist Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

    /* Spacing — 4px base */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 48px;
    --space-8: 64px;
    --space-9: 96px;
    --space-10: 128px;
    --space-11: 160px;

    /* Radii */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-pill: 999px;

    /* Motion */
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --dur-fast: 150ms;
    --dur-base: 200ms;
    --dur-slow: 400ms;

    /* Z-index scale */
    --z-nav: 100;
    --z-overlay: 200;
}

/* ─────────────────────────────────────────────────────────────
   3. Reset + base
   ───────────────────────────────────────────────────────────── */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

body {
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.65;
    color: var(--text-0);
    background-color: var(--bg-0);
    padding-top: 64px; /* header offset */
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Site-wide atmospheric gradient + noise */
body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at 50% -20%, var(--accent-glow-soft), transparent 60%);
    pointer-events: none;
    z-index: 0;
}
body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.03 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
}
main, header, footer { position: relative; z-index: 1; }

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-sans);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text-0);
}

h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); letter-spacing: -0.03em; line-height: 1.05; }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }

p {
    color: var(--text-1);
    font-size: 1rem;
    line-height: 1.65;
}

p.lede {
    font-size: 1.125rem;
    color: var(--text-0);
    max-width: 60ch;
}

a {
    color: var(--accent);
    text-decoration: none;
    transition: color var(--dur-base) var(--ease);
}
a:hover { color: var(--accent-hover); }

strong { color: var(--text-0); font-weight: 600; }

code, pre {
    font-family: var(--font-mono);
    font-size: 0.9em;
}

code {
    background: var(--bg-1);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    color: var(--text-0);
}

pre {
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-5);
    overflow-x: auto;
    margin: var(--space-5) 0;
}

pre code { background: transparent; padding: 0; }

ul, ol {
    color: var(--text-1);
    padding-left: 1.5rem;
    margin-bottom: var(--space-5);
}
li { margin-bottom: var(--space-2); }
li strong { color: var(--text-0); }

blockquote {
    border-left: 2px solid var(--accent);
    padding-left: var(--space-5);
    margin: var(--space-6) 0;
    color: var(--text-1);
    font-style: italic;
}

img { max-width: 100%; height: auto; display: block; }

*:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
}

/* Screen-reader only */
.sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
}

/* Skip link */
.skip-link {
    position: absolute;
    top: -100px; left: 0;
    background: var(--accent);
    color: white;
    padding: var(--space-3) var(--space-5);
    z-index: var(--z-overlay);
    text-decoration: none;
}
.skip-link:focus { top: 0; color: white; }
```

- [ ] **Step 3: Verify the site still builds locally**

Run: `bundle exec jekyll serve`
Expected: build succeeds, site at http://localhost:4000 now renders in dark mode (most layout will be broken — components not yet added — that's fine).

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css assets/css/main.legacy.css
git commit -m "feat(css): replace main.css with dark-first token system and base styles"
```

---

### Task 1.2: Add layout primitives to `main.css`

**Files:**
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Append layout primitives**

Append to the end of `assets/css/main.css`:

```css
/* ─────────────────────────────────────────────────────────────
   4. Layout primitives
   ───────────────────────────────────────────────────────────── */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-5);
}

.container-wide {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--space-5);
}

.section {
    padding: var(--space-9) 0;
}
@media (max-width: 768px) {
    .section { padding: var(--space-8) 0; }
}

.section-divider {
    border: 0;
    border-top: 1px solid var(--border);
    margin: 0;
}

.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); }

@media (max-width: 1024px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; gap: var(--space-5); }
}

.stack { display: flex; flex-direction: column; gap: var(--space-5); }
.cluster { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }

main { min-height: calc(100vh - 200px); }
```

- [ ] **Step 2: Verify by viewing any page**

Run: `bundle exec jekyll serve`
Expected: content is vertically spaced and horizontally constrained to 1200px on the home page.

- [ ] **Step 3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat(css): add layout primitives (container, section, grid)"
```

---

## Phase 2 — Component CSS

### Task 2.1: Add button components

**Files:**
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Append button styles**

```css
/* ─────────────────────────────────────────────────────────────
   5. Components — Buttons
   ───────────────────────────────────────────────────────────── */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: 0 var(--space-5);
    height: 44px;
    background: var(--accent);
    color: #fff;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    font-weight: 500;
    border: 1px solid var(--accent);
    border-radius: var(--radius-sm);
    text-decoration: none;
    cursor: pointer;
    transition: all var(--dur-base) var(--ease);
    white-space: nowrap;
}
.btn:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 0 40px var(--accent-glow);
}
.btn:active { transform: translateY(0); }

.btn-secondary {
    background: transparent;
    color: var(--text-0);
    border: 1px solid var(--border-strong);
}
.btn-secondary:hover {
    background: var(--bg-2);
    border-color: var(--border-strong);
    color: var(--text-0);
    box-shadow: none;
}

.btn-ghost {
    background: transparent;
    color: var(--text-0);
    border: 0;
    padding: 0 var(--space-2);
    height: auto;
}
.btn-ghost:hover {
    background: transparent;
    color: var(--accent);
    box-shadow: none;
    transform: none;
}
.btn-ghost .fa-arrow-right,
.btn-ghost .fas.fa-arrow-right {
    transition: transform var(--dur-base) var(--ease);
}
.btn-ghost:hover .fa-arrow-right { transform: translateX(3px); }

.btn-sm { height: 36px; padding: 0 var(--space-4); font-size: 0.875rem; }
.btn-lg { height: 52px; padding: 0 var(--space-6); font-size: 1rem; }
```

- [ ] **Step 2: Visual check — place a button on the home page and inspect**

Open `index.html`, confirm `.btn` wrapped CTAs render with the new dark blue fill.

- [ ] **Step 3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat(css): add button component styles"
```

---

### Task 2.2: Add card, tag, eyebrow, stat components

**Files:**
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Append**

```css
/* ─────────────────────────────────────────────────────────────
   6. Components — Cards, tags, eyebrows
   ───────────────────────────────────────────────────────────── */
.eyebrow {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-2);
    margin-bottom: var(--space-4);
}

.tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    background: var(--bg-1);
    border: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-1);
}

.card {
    position: relative;
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    transition: border-color var(--dur-base) var(--ease),
                transform var(--dur-base) var(--ease);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}
.card:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
}

/* Service card — icon + title + body + link */
.card-service .icon-tile {
    width: 48px; height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--accent);
    font-size: 1.25rem;
    background: var(--bg-2);
}
.card-service h3 { margin: 0; }
.card-service p { margin: 0; }

/* Team card — no photo */
.card-team h3 { margin-bottom: var(--space-1); }
.card-team .role {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: var(--space-3);
}
.card-team .socials { display: flex; gap: var(--space-3); margin-top: var(--space-3); }
.card-team .socials a { color: var(--text-2); font-size: 1.125rem; }
.card-team .socials a:hover { color: var(--accent); }

/* Post card — CSS-rendered, no image */
.card-post {
    padding: 0;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
}
.card-post .card-post-banner {
    position: relative;
    aspect-ratio: 16 / 9;
    background:
        linear-gradient(135deg, rgba(0,120,212,0.25), transparent 60%),
        radial-gradient(circle at 85% 15%, rgba(0,120,212,0.35), transparent 50%),
        var(--bg-2);
    display: flex;
    align-items: flex-end;
    padding: var(--space-5);
    border-bottom: 1px solid var(--border);
}
.card-post .card-post-banner h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-0);
    line-height: 1.3;
    margin: 0;
}
.card-post .card-post-body {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}
.card-post .meta {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-2);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

/* Case study card — larger, with metrics */
.card-case-study {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--space-7);
    padding: var(--space-7);
    align-items: center;
}
@media (max-width: 768px) {
    .card-case-study { grid-template-columns: 1fr; gap: var(--space-5); padding: var(--space-6); }
}
.card-case-study .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
}
.card-case-study h3 { font-size: 1.75rem; margin-bottom: var(--space-4); }

/* Stat */
.stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-4) 0;
}
.stat .stat-number {
    font-family: var(--font-sans);
    font-size: 2.25rem;
    font-weight: 600;
    color: var(--text-0);
    line-height: 1;
    letter-spacing: -0.02em;
}
.stat .stat-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-2);
}
.stat-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--space-5);
    border-top: 1px solid var(--border);
    padding-top: var(--space-5);
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/main.css
git commit -m "feat(css): add card, tag, eyebrow, stat components"
```

---

### Task 2.3: Add nav/header + footer styles

**Files:**
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Append**

```css
/* ─────────────────────────────────────────────────────────────
   7. Components — Header + Nav
   ───────────────────────────────────────────────────────────── */
.site-header {
    position: fixed;
    inset: 0 0 auto 0;
    height: 64px;
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    z-index: var(--z-nav);
}
.site-header .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.logo-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    color: var(--text-0);
    font-weight: 600;
    letter-spacing: -0.01em;
}
.logo-link:hover { color: var(--text-0); }
.logo-mark { width: 28px; height: 28px; color: var(--accent); }
.logo-wordmark { font-size: 0.9375rem; }

.main-nav { display: flex; align-items: center; gap: var(--space-6); }
.menu {
    display: flex;
    list-style: none;
    gap: var(--space-5);
    padding: 0; margin: 0;
}
.menu a {
    color: var(--text-1);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    padding: var(--space-2) 0;
    position: relative;
    transition: color var(--dur-base) var(--ease);
}
.menu a:hover { color: var(--text-0); }
.menu a.active { color: var(--text-0); }
.menu a.active::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: -2px;
    height: 1px;
    background: var(--accent);
}

.menu-toggle {
    display: none;
    background: transparent;
    border: 0;
    color: var(--text-0);
    font-size: 1.25rem;
    cursor: pointer;
    padding: var(--space-2);
}

@media (max-width: 768px) {
    .menu-toggle { display: inline-flex; }
    .menu {
        position: fixed;
        top: 64px; left: 0; right: 0;
        flex-direction: column;
        background: rgba(10,10,10,0.95);
        backdrop-filter: blur(12px);
        padding: var(--space-4) var(--space-5);
        border-bottom: 1px solid var(--border);
        transform: translateY(-110%);
        transition: transform var(--dur-base) var(--ease);
        gap: 0;
    }
    .menu.active { transform: translateY(0); }
    .menu li { width: 100%; }
    .menu a {
        display: block;
        padding: var(--space-4) 0;
        border-bottom: 1px solid var(--border);
    }
    .menu a.active::after { display: none; }
    .header-cta { display: none; }
}

/* ─────────────────────────────────────────────────────────────
   8. Components — Footer
   ───────────────────────────────────────────────────────────── */
.site-footer {
    border-top: 1px solid var(--border);
    padding: var(--space-8) 0 var(--space-5);
    margin-top: var(--space-9);
    background: transparent;
}
.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-7);
    margin-bottom: var(--space-7);
}
@media (max-width: 768px) {
    .footer-content { grid-template-columns: 1fr; gap: var(--space-5); }
}
.footer-section h4 {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-2);
    margin-bottom: var(--space-4);
    font-weight: 500;
}
.footer-section p, .footer-section li { color: var(--text-1); font-size: 0.9375rem; }
.footer-menu { list-style: none; padding: 0; }
.footer-menu li { margin-bottom: var(--space-2); }
.footer-menu a { color: var(--text-1); text-decoration: none; }
.footer-menu a:hover { color: var(--text-0); }

.footer-brand .logo-link { margin-bottom: var(--space-4); }
.footer-brand p { max-width: 40ch; }

.footer-socials { display: flex; gap: var(--space-4); margin-top: var(--space-4); }
.footer-socials a {
    color: var(--text-2);
    font-size: 1.125rem;
    transition: color var(--dur-base) var(--ease);
}
.footer-socials a:hover { color: var(--accent); }

.footer-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: var(--space-5);
    border-top: 1px solid var(--border);
    color: var(--text-2);
    font-size: 0.8125rem;
}
@media (max-width: 768px) {
    .footer-bottom { flex-direction: column; gap: var(--space-2); text-align: center; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/main.css
git commit -m "feat(css): add header, nav, and footer components"
```

---

### Task 2.4: Add form, marquee, glow, hero components

**Files:**
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Append**

```css
/* ─────────────────────────────────────────────────────────────
   9. Components — Forms
   ───────────────────────────────────────────────────────────── */
.form-field { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4); }
.form-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-2);
}
.form-control {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background: var(--bg-1);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    color: var(--text-0);
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    transition: border-color var(--dur-base) var(--ease),
                box-shadow var(--dur-base) var(--ease);
}
.form-control:focus {
    outline: 0;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.15);
}
.form-control::placeholder { color: var(--text-2); }
textarea.form-control { min-height: 140px; resize: vertical; font-family: var(--font-sans); }
select.form-control {
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23A1A1AA' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>");
    background-repeat: no-repeat;
    background-position: right var(--space-4) center;
    padding-right: var(--space-7);
}
.form-success {
    border: 1px solid var(--success);
    border-radius: var(--radius-md);
    padding: var(--space-5);
    background: rgba(34, 197, 94, 0.06);
    color: var(--text-0);
}
.form-error { color: var(--danger); font-size: 0.8125rem; margin-top: var(--space-1); }

/* ─────────────────────────────────────────────────────────────
   10. Components — Marquee
   ───────────────────────────────────────────────────────────── */
.marquee {
    position: relative;
    overflow: hidden;
    padding: var(--space-6) 0;
    mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
}
.marquee-track {
    display: flex;
    gap: var(--space-9);
    width: max-content;
    animation: marquee 40s linear infinite;
}
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-item {
    flex: 0 0 auto;
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    opacity: 0.7;
    transition: opacity var(--dur-base) var(--ease);
}
.marquee-item:hover { opacity: 1; }
.marquee-item svg { width: 20px; height: 20px; }
@keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}

/* ─────────────────────────────────────────────────────────────
   11. Components — Glow + Hero
   ───────────────────────────────────────────────────────────── */
.glow {
    position: absolute;
    pointer-events: none;
    width: 600px; height: 600px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%);
    filter: blur(60px);
    opacity: 0.6;
    z-index: 0;
}

.hero {
    position: relative;
    min-height: 88vh;
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: var(--space-7);
    padding: var(--space-9) 0 var(--space-8);
}
@media (max-width: 1024px) {
    .hero { grid-template-columns: 1fr; min-height: auto; padding-top: var(--space-8); }
}
.hero-copy { position: relative; z-index: 2; }
.hero-copy h1 { margin-bottom: var(--space-5); }
.hero-copy .lede { margin-bottom: var(--space-6); color: var(--text-1); }
.hero-ctas { display: flex; flex-wrap: wrap; gap: var(--space-3); }
.hero-visual {
    position: relative;
    aspect-ratio: 1 / 1;
    width: 100%;
    max-width: 560px;
    justify-self: end;
}
@media (max-width: 1024px) {
    .hero-visual { justify-self: center; max-width: 440px; }
}
.hero-visual .glow { inset: -60px; width: auto; height: auto; opacity: 0.8; }
.hero-visual img,
.hero-visual svg {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
}

/* Page headers */
.page-header {
    padding: var(--space-9) 0 var(--space-7);
    text-align: left;
}
.page-header .lede { margin-top: var(--space-4); font-size: 1.25rem; max-width: 56ch; }

/* CTA band */
.cta-band {
    text-align: center;
    padding: var(--space-9) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin: var(--space-9) 0 0;
}
.cta-band h2 { margin-bottom: var(--space-4); }
.cta-band .lede { max-width: 60ch; margin: 0 auto var(--space-6); }
.cta-band .cluster { justify-content: center; }

/* Numbered approach blocks */
.steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
}
@media (max-width: 1024px) { .steps { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .steps { grid-template-columns: 1fr; } }
.step { border-top: 1px solid var(--border); padding-top: var(--space-4); }
.step .step-num {
    font-family: var(--font-mono);
    color: var(--accent);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
}
.step h3 { margin: var(--space-2) 0 var(--space-2); font-size: 1.125rem; }
.step p { font-size: 0.9375rem; }

/* Utilities */
.text-center { text-align: center; }
.mt-0 { margin-top: 0; } .mt-4 { margin-top: var(--space-4); } .mt-6 { margin-top: var(--space-6); }
.mb-0 { margin-bottom: 0; } .mb-4 { margin-bottom: var(--space-4); } .mb-6 { margin-bottom: var(--space-6); }

/* Scroll-reveal */
.reveal {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 600ms var(--ease), transform 600ms var(--ease);
}
.reveal.is-revealed { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/main.css
git commit -m "feat(css): add form, marquee, hero, CTA, steps components"
```

---

## Phase 3 — Base layout (header, footer, default layout, CSP)

### Task 3.1: Update `_layouts/default.html` with new CSP and skip link

**Files:**
- Modify: `_layouts/default.html`
- Create: `assets/js/gtag-init.js`

- [ ] **Step 1: Extract the inline GA init into its own file**

Create `assets/js/gtag-init.js`:

```js
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-8V446GX4QE');
```

- [ ] **Step 2: Overwrite `_layouts/default.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% if page.title %}{{ page.title }} | {{ site.title }}{% else %}{{ site.title }} — Azure & Cloud Consulting{% endif %}</title>

    <link rel="apple-touch-icon" sizes="180x180" href="/assets/imgs/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/imgs/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/imgs/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#0A0A0A">

    <link rel="preload" href="/assets/fonts/GeistVF.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/assets/fonts/GeistMonoVF.woff2" as="font" type="font/woff2" crossorigin>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="alternate" type="application/atom+xml" title="{{ site.title }} Feed" href="/feed.xml" />

    <!-- Security headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self' https://cdnjs.cloudflare.com https://use.fontawesome.com data:; connect-src 'self' https://formspree.io https://www.google-analytics.com;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()">

    {% seo title=false %}

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8V446GX4QE"></script>
    <script src="/assets/js/gtag-init.js"></script>
</head>
<body>
    <a href="#main" class="skip-link">Skip to content</a>
    {% include header.html %}

    <main id="main">
        {{ content }}
    </main>

    {% include footer.html %}

    <script src="/assets/js/menu.js"></script>
    <script src="/assets/js/motion.js"></script>
</body>
</html>
```

Note: COEP/COOP/CORP headers are dropped — they were causing cross-origin noise with the Font Awesome CDN and provide little benefit for a static marketing site.

- [ ] **Step 3: Commit**

```bash
git add _layouts/default.html assets/js/gtag-init.js
git commit -m "feat(layout): update default.html with Geist preload, externalised GA init, new CSP (Formspree + GA)"
```

---

### Task 3.2: Create `_includes/logo.html` (placeholder, replaced in Phase 5)

**Files:**
- Create: `_includes/logo.html`

- [ ] **Step 1: Create file**

```html
<svg class="logo-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="7" width="26" height="5" rx="1" fill="currentColor" opacity="0.4"/>
    <rect x="3" y="13.5" width="26" height="5" rx="1" fill="currentColor" opacity="0.7"/>
    <rect x="3" y="20" width="26" height="5" rx="1" fill="currentColor"/>
</svg>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/logo.html
git commit -m "feat(logo): add placeholder stacked-layers SVG mark"
```

---

### Task 3.3: Rebuild `_includes/header.html`

**Files:**
- Modify: `_includes/header.html`

- [ ] **Step 1: Overwrite**

```html
<header class="site-header">
    <div class="container">
        <a href="/" class="logo-link" aria-label="Tech Design Concept home">
            {% include logo.html %}
            <span class="logo-wordmark">Tech Design Concept</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
            <button class="menu-toggle" aria-expanded="false" aria-controls="main-menu">
                <span class="sr-only">Toggle Menu</span>
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
            <ul id="main-menu" class="menu">
                {% assign path = page.url %}
                <li><a href="/"         {% if path == '/' %}class="active"{% endif %}>Home</a></li>
                <li><a href="/services/"{% if path contains '/services' %}class="active"{% endif %}>Services</a></li>
                <li><a href="/work/"    {% if path contains '/work' %}class="active"{% endif %}>Work</a></li>
                <li><a href="/about/"   {% if path contains '/about' %}class="active"{% endif %}>About</a></li>
                <li><a href="/blog/"    {% if path contains '/blog' %}class="active"{% endif %}>Blog</a></li>
            </ul>
            <a href="/contact/" class="btn btn-sm header-cta">Get in touch</a>
        </nav>
    </div>
</header>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/header.html
git commit -m "feat(header): rebuild nav with Work link and inline logo include"
```

---

### Task 3.4: Rebuild `_includes/footer.html`

**Files:**
- Modify: `_includes/footer.html`

- [ ] **Step 1: Overwrite**

```html
<footer class="site-footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section footer-brand">
                <a href="/" class="logo-link">
                    {% include logo.html %}
                    <span class="logo-wordmark">Tech Design Concept</span>
                </a>
                <p>Azure and cloud consulting — engineered by specialists, delivered with partnership.</p>
                <div class="footer-socials">
                    <a href="https://linkedin.com/company/tech-design-concept" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
                    <a href="https://github.com/techdesignconcept" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
                    <a href="mailto:info@techdesignconcept.com" aria-label="Email"><i class="fas fa-envelope" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Services</h4>
                <ul class="footer-menu">
                    <li><a href="/services/#cloud-migration">Cloud Migration</a></li>
                    <li><a href="/services/#security-solutions">Security</a></li>
                    <li><a href="/services/#devops-automation">DevOps &amp; Automation</a></li>
                    <li><a href="/services/">All services</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Company</h4>
                <ul class="footer-menu">
                    <li><a href="/about/">About</a></li>
                    <li><a href="/work/">Work</a></li>
                    <li><a href="/blog/">Blog</a></li>
                    <li><a href="/contact/">Contact</a></li>
                    <li><a href="/privacy/">Privacy</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>&copy; {{ 'now' | date: '%Y' }} Tech Design Concept Pty Ltd. All rights reserved.</span>
            <span>Built with Jekyll &amp; care.</span>
        </div>
    </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/footer.html
git commit -m "feat(footer): rebuild with brand column, service/company links, social icons"
```

---

## Phase 4 — Motion JS + mobile menu

### Task 4.1: Rewrite `assets/js/menu.js`

**Files:**
- Modify: `assets/js/menu.js`

- [ ] **Step 1: Overwrite**

```js
(function () {
    'use strict';
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('main-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            toggle.focus();
        }
    });
})();
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/menu.js
git commit -m "feat(menu): rewrite mobile menu with a11y and ESC close"
```

---

### Task 4.2: Create `assets/js/motion.js`

**Files:**
- Create: `assets/js/motion.js`

- [ ] **Step 1: Create file**

Uses `cloneNode` instead of `innerHTML` mutation to avoid XSS risk (even though the content is trusted — good-practice DOM API).

```js
(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-revealed'); });
        return;
    }

    /* ───── Scroll reveal ───── */
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    /* ───── Animated stat counters ───── */
    function parseTarget(el) {
        const raw = el.dataset.target || el.textContent;
        const match = raw.match(/([\d.]+)/);
        return match ? parseFloat(match[1]) : 0;
    }
    function renderNumber(el, value, suffix, prefix) {
        const rounded = value >= 100 ? Math.round(value) : value.toFixed(value % 1 ? 1 : 0);
        el.textContent = (prefix || '') + rounded + (suffix || '');
    }
    const statIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseTarget(el);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1400;
            const start = performance.now();
            function frame(now) {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                renderNumber(el, target * eased, suffix, prefix);
                if (t < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
            statIo.unobserve(el);
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('[data-count]').forEach(function (el) { statIo.observe(el); });

    /* ───── Cursor-follow hero glow ───── */
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const glow = heroVisual.querySelector('.glow');
        if (glow) {
            heroVisual.addEventListener('mousemove', function (e) {
                const rect = heroVisual.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                glow.style.transform = 'translate(' + ((x - 50) * 0.4) + 'px, ' + ((y - 50) * 0.4) + 'px)';
            });
            heroVisual.addEventListener('mouseleave', function () {
                glow.style.transform = '';
            });
        }
    }

    /* ───── Marquee seamless loop — clone children via cloneNode (safe DOM) ───── */
    document.querySelectorAll('.marquee-track').forEach(function (track) {
        const originals = Array.from(track.children);
        originals.forEach(function (child) { track.appendChild(child.cloneNode(true)); });
    });
})();
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/motion.js
git commit -m "feat(motion): scroll reveal, stat counters, cursor glow, marquee via cloneNode"
```

---

## Phase 5 — Final logo

### Task 5.1: Replace placeholder logo with final SVG

**Files:**
- Modify: `_includes/logo.html`
- Create: `assets/imgs/logo-mark.svg`

- [ ] **Step 1: Overwrite `_includes/logo.html`**

```html
<svg class="logo-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 9 L22 9 L26 13 L10 13 Z" fill="currentColor" opacity="0.35"/>
    <path d="M6 15 L22 15 L26 19 L10 19 Z" fill="currentColor" opacity="0.65"/>
    <path d="M6 21 L22 21 L26 25 L10 25 Z" fill="currentColor"/>
</svg>
```

- [ ] **Step 2: Create `assets/imgs/logo-mark.svg` (standalone, for favicon generation)**

```svg
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
    <rect width="32" height="32" fill="#0A0A0A"/>
    <path d="M6 9 L22 9 L26 13 L10 13 Z" fill="#0078D4" opacity="0.35"/>
    <path d="M6 15 L22 15 L26 19 L10 19 Z" fill="#0078D4" opacity="0.65"/>
    <path d="M6 21 L22 21 L26 25 L10 25 Z" fill="#0078D4"/>
</svg>
```

- [ ] **Step 3: Regenerate favicon PNGs**

Manual: use https://realfavicongenerator.net with `assets/imgs/logo-mark.svg` as input. Download and overwrite in `assets/imgs/`:
- `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `favicon.ico`

- [ ] **Step 4: Update `site.webmanifest` theme color**

Read the file and change `theme_color` and `background_color` to `#0A0A0A`.

- [ ] **Step 5: Commit**

```bash
git add _includes/logo.html assets/imgs/logo-mark.svg assets/imgs/favicon-*.png assets/imgs/apple-touch-icon.png assets/imgs/android-chrome-*.png assets/imgs/favicon.ico site.webmanifest
git commit -m "feat(brand): final stacked-layers logo mark + regenerated favicons"
```

---

## Phase 6 — Home page

### Task 6.1: Create supporting includes (marquee, blog-card, hero-visual placeholder)

**Files:**
- Create: `_includes/marquee.html`
- Create: `_includes/blog-card.html`
- Create: `_includes/hero-visual.html`

- [ ] **Step 1: Create `_includes/marquee.html`**

```html
<div class="marquee" aria-label="Tools we work with">
    <div class="marquee-track">
        <span class="marquee-item"><i class="fab fa-microsoft" aria-hidden="true"></i> Microsoft Azure</span>
        <span class="marquee-item"><i class="fab fa-github" aria-hidden="true"></i> GitHub</span>
        <span class="marquee-item"><i class="fas fa-code-branch" aria-hidden="true"></i> Terraform</span>
        <span class="marquee-item"><i class="fas fa-layer-group" aria-hidden="true"></i> Bicep</span>
        <span class="marquee-item"><i class="fas fa-id-badge" aria-hidden="true"></i> Entra ID</span>
        <span class="marquee-item"><i class="fas fa-shield-halved" aria-hidden="true"></i> Defender for Cloud</span>
        <span class="marquee-item"><i class="fas fa-network-wired" aria-hidden="true"></i> Azure Arc</span>
        <span class="marquee-item"><i class="fas fa-database" aria-hidden="true"></i> Azure SQL</span>
    </div>
</div>
```

- [ ] **Step 2: Create `_includes/blog-card.html`**

```html
<a class="card card-post reveal" href="{{ include.post.url }}">
    <div class="card-post-banner">
        <h3>{{ include.post.title }}</h3>
    </div>
    <div class="card-post-body">
        <span class="meta">{{ include.post.date | date: '%b %d, %Y' }}{% if include.post.author %} — {{ include.post.author }}{% endif %}</span>
        <p>{{ include.post.excerpt | strip_html | truncatewords: 22 }}</p>
    </div>
</a>
```

- [ ] **Step 3: Create `_includes/hero-visual.html` (placeholder, replaced in Phase 12)**

```html
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="face1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0078D4" stop-opacity="0.9"/>
            <stop offset="1" stop-color="#0078D4" stop-opacity="0.2"/>
        </linearGradient>
        <linearGradient id="face2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stop-color="#3392DD" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#0078D4" stop-opacity="0.15"/>
        </linearGradient>
    </defs>
    <g transform="translate(200 200)">
        <polygon points="-100,-60 0,-120 100,-60 0,0" fill="url(#face1)" stroke="#0078D4" stroke-opacity="0.5"/>
        <polygon points="-100,-60 0,0 0,120 -100,60" fill="url(#face2)" stroke="#0078D4" stroke-opacity="0.5"/>
        <polygon points="100,-60 100,60 0,120 0,0" fill="#0078D4" fill-opacity="0.25" stroke="#0078D4" stroke-opacity="0.5"/>
    </g>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add _includes/marquee.html _includes/blog-card.html _includes/hero-visual.html
git commit -m "feat(includes): add marquee, blog-card, and placeholder hero-visual"
```

---

### Task 6.2: Rewrite `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
title: Home
description: Tech Design Concept — Azure & cloud consulting, engineered by specialists.
---

<section class="hero">
    <div class="container">
        <div class="hero-copy reveal">
            <p class="eyebrow">Tech Design Concept</p>
            <h1>Cloud infrastructure, engineered.</h1>
            <p class="lede">Azure consulting for teams that want quality engineering, not slide decks. We design, implement, and hand over cloud platforms built for the long run.</p>
            <div class="hero-ctas">
                <a href="/contact/" class="btn btn-lg">Start a conversation</a>
                <a href="/work/" class="btn btn-secondary btn-lg">See our work</a>
            </div>
        </div>
        <div class="hero-visual reveal">
            <div class="glow"></div>
            {% include hero-visual.html %}
        </div>
    </div>
</section>

<section class="section">
    <div class="container-wide">
        {% include marquee.html %}
    </div>
</section>

<section class="section">
    <div class="container">
        <p class="eyebrow">What we do</p>
        <h2 class="mb-6">Three core capabilities.</h2>
        <div class="grid-3">
            <a href="/services/#cloud-migration" class="card card-service reveal" style="text-decoration:none;color:inherit">
                <span class="icon-tile"><i class="fas fa-cloud" aria-hidden="true"></i></span>
                <h3>Cloud Migration</h3>
                <p>Assess, plan, and execute Azure migrations that cut risk and deliver measurable outcomes.</p>
                <span class="btn-ghost">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
            </a>
            <a href="/services/#security-solutions" class="card card-service reveal" style="text-decoration:none;color:inherit">
                <span class="icon-tile"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                <h3>Security Solutions</h3>
                <p>Defence-in-depth architectures using Defender, Sentinel, Entra, and Azure Policy.</p>
                <span class="btn-ghost">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
            </a>
            <a href="/services/#devops-automation" class="card card-service reveal" style="text-decoration:none;color:inherit">
                <span class="icon-tile"><i class="fas fa-gears" aria-hidden="true"></i></span>
                <h3>DevOps &amp; Automation</h3>
                <p>CI/CD, Infrastructure as Code (Bicep, Terraform), and platform engineering that scales.</p>
                <span class="btn-ghost">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
            </a>
        </div>
    </div>
</section>

{% assign featured = site.case_studies | where: 'featured', true | first %}
{% unless featured %}{% assign featured = site.case_studies | first %}{% endunless %}
{% if featured %}
<section class="section">
    <div class="container">
        <p class="eyebrow">Featured engagement</p>
        <article class="card card-case-study reveal">
            <div>
                <div class="meta-row">
                    <span class="tag">{{ featured.industry }}</span>
                    <span class="tag">{{ featured.duration }}</span>
                    {% for s in featured.services %}<span class="tag">{{ s }}</span>{% endfor %}
                </div>
                <h3>{{ featured.title }}</h3>
                <p>{{ featured.summary }}</p>
                <a href="{{ featured.url }}" class="btn-ghost">Read the case study <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </div>
            <div>
                <div class="stat-row">
                    {% for m in featured.metrics %}
                        {% assign parts = m | split: '|' %}
                        <div class="stat">
                            <span class="stat-number" data-count data-target="{{ parts[0] }}" data-suffix="{{ parts[1] }}">{{ parts[0] }}{{ parts[1] }}</span>
                            <span class="stat-label">{{ parts[2] }}</span>
                        </div>
                    {% endfor %}
                </div>
            </div>
        </article>
    </div>
</section>
{% endif %}

<section class="section">
    <div class="container">
        <p class="eyebrow">How we work</p>
        <h2 class="mb-6">A four-step engagement.</h2>
        <div class="steps">
            <div class="step reveal"><span class="step-num">01 — Discover</span><h3>Understand</h3><p>Deep dive into your environment, constraints, and goals.</p></div>
            <div class="step reveal"><span class="step-num">02 — Design</span><h3>Architect</h3><p>Target-state architecture and a staged migration plan.</p></div>
            <div class="step reveal"><span class="step-num">03 — Implement</span><h3>Deliver</h3><p>Hands-on-keyboard execution with continuous validation.</p></div>
            <div class="step reveal"><span class="step-num">04 — Enable</span><h3>Hand over</h3><p>Your team owns the platform, with the skills to run it.</p></div>
        </div>
    </div>
</section>

{% assign recent = site.posts | slice: 0, 3 %}
{% if recent.size > 0 %}
<section class="section">
    <div class="container">
        <p class="eyebrow">Recent writing</p>
        <h2 class="mb-6">From the blog.</h2>
        <div class="grid-3">
            {% for post in recent %}
                {% include blog-card.html post=post %}
            {% endfor %}
        </div>
    </div>
</section>
{% endif %}

<section class="cta-band">
    <div class="container">
        <h2>Ready to build something well?</h2>
        <p class="lede">Let's scope your next Azure engagement.</p>
        <div class="cluster">
            <a href="/contact/" class="btn btn-lg">Get in touch</a>
            <a href="/services/" class="btn btn-secondary btn-lg">Browse services</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Verify `bundle exec jekyll serve` renders the home page with hero, marquee, services, approach, CTA**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(home): rebuild landing with hero, services, approach, recent posts, CTA"
```

---

## Phase 7 — Services page

### Task 7.1: Rewrite `services/index.html`

**Files:**
- Modify: `services/index.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
title: Services
description: Azure and cloud consulting services — migration, security, DevOps, and more.
---

<section class="page-header">
    <div class="container">
        <p class="eyebrow">Services</p>
        <h1>What we do.</h1>
        <p class="lede">End-to-end Azure consulting. Pick an engagement below or combine them into a program.</p>
    </div>
</section>

<section id="cloud-migration" class="section">
    <div class="container">
        <div class="grid-2">
            <div class="reveal">
                <p class="eyebrow">01 — Migration</p>
                <h2>Cloud Migration</h2>
                <p class="lede">Workloads moved to Azure with a plan that accounts for every dependency — and every user.</p>
                <p>Rehost, refactor, rearchitect, or rebuild: the right strategy depends on the workload. We lead discovery, produce a pragmatic migration plan, and execute with you.</p>
                <ul>
                    <li><strong>Assessment &amp; Discovery</strong> — full environment dependency mapping</li>
                    <li><strong>Migration Strategy</strong> — prioritised roadmap across the 5 R's</li>
                    <li><strong>Proof of Concept</strong> — validate the approach on a representative workload</li>
                    <li><strong>Execution</strong> — wave-based migration with continuous validation</li>
                    <li><strong>Stabilisation</strong> — post-migration optimisation and handover</li>
                </ul>
            </div>
            <div class="reveal text-center">
                <span class="icon-tile" style="width:120px;height:120px;font-size:3rem"><i class="fas fa-cloud-arrow-up" aria-hidden="true"></i></span>
            </div>
        </div>
    </div>
</section>

<hr class="section-divider">

<section id="security-solutions" class="section">
    <div class="container">
        <div class="grid-2">
            <div class="reveal text-center">
                <span class="icon-tile" style="width:120px;height:120px;font-size:3rem"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
            </div>
            <div class="reveal">
                <p class="eyebrow">02 — Security</p>
                <h2>Security Solutions</h2>
                <p class="lede">Defence-in-depth designed around the Azure security reference architecture.</p>
                <p>We map your posture against CIS/NIST/ISO benchmarks, design an architecture that closes the gaps, and operationalise it with automation.</p>
                <ul>
                    <li><strong>Posture Assessment</strong> — Defender / Secure Score / policy audit</li>
                    <li><strong>Identity Hardening</strong> — Entra ID, Conditional Access, PIM</li>
                    <li><strong>Threat Protection</strong> — Defender for Cloud, Sentinel SIEM/SOAR</li>
                    <li><strong>Data Protection</strong> — Key Vault, encryption, DLP</li>
                    <li><strong>Compliance</strong> — Azure Policy + Blueprints for regulated workloads</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<hr class="section-divider">

<section id="devops-automation" class="section">
    <div class="container">
        <div class="grid-2">
            <div class="reveal">
                <p class="eyebrow">03 — DevOps</p>
                <h2>DevOps &amp; Automation</h2>
                <p class="lede">Platforms that ship software fast, safely, and repeatedly.</p>
                <p>Infrastructure as Code, CI/CD pipelines, and golden-path patterns so every team in your org gets the same production-grade foundations.</p>
                <ul>
                    <li><strong>DevOps Assessment</strong> — current-state + target-state gap analysis</li>
                    <li><strong>IaC Implementation</strong> — Bicep or Terraform, AVM-aligned</li>
                    <li><strong>CI/CD Pipelines</strong> — GitHub Actions or Azure DevOps, with environment promotion</li>
                    <li><strong>Observability</strong> — Azure Monitor, Log Analytics, workbooks</li>
                    <li><strong>Platform Engineering</strong> — golden paths and self-service tooling</li>
                </ul>
            </div>
            <div class="reveal text-center">
                <span class="icon-tile" style="width:120px;height:120px;font-size:3rem"><i class="fas fa-gears" aria-hidden="true"></i></span>
            </div>
        </div>
    </div>
</section>

<hr class="section-divider">

<section class="section">
    <div class="container">
        <p class="eyebrow">Additional capabilities</p>
        <h2 class="mb-6">Also available.</h2>
        <div class="grid-4">
            <div class="card card-service reveal"><span class="icon-tile"><i class="fas fa-server" aria-hidden="true"></i></span><h3>Infrastructure Optimisation</h3><p>Cost, performance, and scalability tuning across your Azure estate.</p></div>
            <div class="card card-service reveal"><span class="icon-tile"><i class="fas fa-database" aria-hidden="true"></i></span><h3>Data Solutions</h3><p>Azure SQL, Cosmos DB, Synapse — modern data platforms with governance built in.</p></div>
            <div class="card card-service reveal"><span class="icon-tile"><i class="fas fa-graduation-cap" aria-hidden="true"></i></span><h3>Training &amp; Enablement</h3><p>Custom Azure training and governance workshops for your teams.</p></div>
            <div class="card card-service reveal"><span class="icon-tile"><i class="fas fa-brain" aria-hidden="true"></i></span><h3>AI &amp; Analytics</h3><p>Azure OpenAI, Cognitive Services, and ML integrations tied to real use cases.</p></div>
        </div>
    </div>
</section>

<section class="cta-band">
    <div class="container">
        <h2>Scope your engagement.</h2>
        <p class="lede">Tell us what you're working on — we'll tell you how we'd approach it.</p>
        <div class="cluster">
            <a href="/contact/" class="btn btn-lg">Start a conversation</a>
            <a href="/about/" class="btn btn-secondary btn-lg">About us</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add services/index.html
git commit -m "feat(services): rewrite services page with icon-first dark design"
```

---

## Phase 8 — About page

### Task 8.1: Rewrite `about/index.html`

**Files:**
- Modify: `about/index.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
title: About
description: Engineers first. Consultants second. About Tech Design Concept.
---

<section class="page-header">
    <div class="container">
        <p class="eyebrow">About</p>
        <h1>Engineers first.<br>Consultants second.</h1>
        <p class="lede">We founded Tech Design Concept to do cloud consulting the way we wanted it done when we were on the client side — technically excellent, pragmatic, and transparent about trade-offs.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="grid-2">
            <div class="reveal">
                <h2>Our story.</h2>
                <p>We started Tech Design Concept because too many Azure engagements ship slide decks, not platforms. Our focus is narrow by design — Microsoft Azure, end-to-end — and the depth shows in the work.</p>
                <p>Our mission is to help organisations harness cloud technology through expert guidance and engineering-grade delivery. Successful cloud adoption needs more than tooling; it needs people who understand both the technology and the business around it.</p>
            </div>
            <div class="reveal">
                <blockquote>"Our job is to leave you with a platform your team can run — not a dependency on us."</blockquote>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <p class="eyebrow">How we work</p>
        <h2 class="mb-6">A four-step engagement.</h2>
        <div class="steps">
            <div class="step reveal"><span class="step-num">01 — Discover</span><h3>Understand</h3><p>Deep dive into your environment, constraints, and goals.</p></div>
            <div class="step reveal"><span class="step-num">02 — Design</span><h3>Architect</h3><p>Target-state architecture and a staged migration plan.</p></div>
            <div class="step reveal"><span class="step-num">03 — Implement</span><h3>Deliver</h3><p>Hands-on-keyboard execution with continuous validation.</p></div>
            <div class="step reveal"><span class="step-num">04 — Enable</span><h3>Hand over</h3><p>Your team owns the platform, with the skills to run it.</p></div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <p class="eyebrow">The team</p>
        <h2 class="mb-6">Small, senior, hands-on.</h2>
        <div class="grid-3">
            <div class="card card-team reveal">
                <h3>Joshua Argy</h3>
                <p class="role">Founder &amp; Principal Engineer</p>
                <p>Azure platform engineering, DevOps, and security automation. Focused on building cloud platforms that teams actually want to work on.</p>
                <div class="socials">
                    <a href="https://linkedin.com/in/" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
                    <a href="https://github.com/" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <p class="eyebrow">Credentials</p>
        <h2 class="mb-6">Certified. Current.</h2>
        <div class="grid-3">
            <div class="card card-service reveal"><span class="icon-tile"><i class="fab fa-microsoft" aria-hidden="true"></i></span><h3>Microsoft Certified</h3><p>Azure Solutions Architect Expert, DevOps Engineer Expert, Administrator Associate.</p></div>
            <div class="card card-service reveal"><span class="icon-tile"><i class="fas fa-shield-halved" aria-hidden="true"></i></span><h3>Security</h3><p>Microsoft Security Engineer, CISSP.</p></div>
            <div class="card card-service reveal"><span class="icon-tile"><i class="fas fa-diagram-project" aria-hidden="true"></i></span><h3>Delivery</h3><p>PMP, ITIL Foundation, Certified Scrum Master.</p></div>
        </div>
    </div>
</section>

<section class="cta-band">
    <div class="container">
        <h2>Work with us.</h2>
        <p class="lede">We take on a small number of engagements at a time. If we're a fit, we'll say so.</p>
        <div class="cluster">
            <a href="/contact/" class="btn btn-lg">Get in touch</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add about/index.html
git commit -m "feat(about): rewrite with card-only team (no AI photos) and pull-quote"
```

---

## Phase 9 — Blog page + post layout

### Task 9.1: Rewrite `blog/index.html`

**Files:**
- Modify: `blog/index.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
title: Blog
description: Azure and cloud technology insights from Tech Design Concept.
---

<section class="page-header">
    <div class="container">
        <p class="eyebrow">Writing</p>
        <h1>Notes from the field.</h1>
        <p class="lede">Pragmatic deep-dives on Azure, security, and platform engineering — written for engineers.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        {% if site.posts.size == 0 %}
            <div class="card text-center" style="padding:var(--space-9)">
                <h3>Coming soon</h3>
                <p>Our first posts are on the way.</p>
            </div>
        {% else %}
            <div class="grid-3">
                {% for post in site.posts %}
                    {% include blog-card.html post=post %}
                {% endfor %}
            </div>
        {% endif %}
    </div>
</section>
```

Note: The broken newsletter form (posting to `404.html`) is removed entirely.

- [ ] **Step 2: Commit**

```bash
git add blog/index.html
git commit -m "feat(blog): rewrite blog index with CSS-rendered cards, drop broken newsletter form"
```

---

### Task 9.2: Rewrite `_layouts/post.html`

**Files:**
- Modify: `_layouts/post.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
---
<article class="section">
    <div class="container" style="max-width:760px">
        <p class="eyebrow">
            <a href="/blog/" style="color:inherit">← All posts</a>
        </p>
        <h1 style="margin-bottom:var(--space-4)">{{ page.title }}</h1>
        <p style="font-family:var(--font-mono);color:var(--text-2);font-size:0.875rem;margin-bottom:var(--space-6)">
            {{ page.date | date: '%B %d, %Y' }}{% if page.author %} — {{ page.author }}{% endif %}
            {% if page.tags %} · {% for tag in page.tags %}<span class="tag" style="margin-right:var(--space-1)">{{ tag }}</span>{% endfor %}{% endif %}
        </p>

        {% if page.image %}
            <img src="{{ page.image }}" alt="" style="width:100%;border-radius:var(--radius-md);border:1px solid var(--border);margin-bottom:var(--space-6)">
        {% endif %}

        <div class="post-content">
            {{ content }}
        </div>

        <hr class="section-divider" style="margin:var(--space-7) 0">

        <div class="cluster" style="justify-content:space-between">
            <a href="/blog/" class="btn-ghost"><i class="fas fa-arrow-left" aria-hidden="true"></i> Back to blog</a>
            <div class="cluster">
                <a class="btn-ghost" href="https://twitter.com/intent/tweet?text={{ page.title | url_encode }}&url={{ site.url }}{{ page.url }}" target="_blank" rel="noopener">Share on X</a>
                <a class="btn-ghost" href="https://www.linkedin.com/sharing/share-offsite/?url={{ site.url }}{{ page.url }}" target="_blank" rel="noopener">Share on LinkedIn</a>
            </div>
        </div>
    </div>
</article>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/post.html
git commit -m "feat(blog): rewrite post layout with Geist typography and minimal chrome"
```

---

## Phase 10 — Case Studies collection

### Task 10.1: Configure the `_case_studies` collection

**Files:**
- Modify: `_config.yml`

- [ ] **Step 1: Edit `_config.yml`**

Replace the `collections` block and extend `defaults` so it reads:

```yaml
# Collections
collections:
  posts:
    output: true
    permalink: /blog/:title/
  case_studies:
    output: true
    permalink: /work/:slug/

# Default front matter
defaults:
  - scope:
      path: ""
    values:
      layout: default
  - scope:
      path: "_posts"
    values:
      layout: post
  - scope:
      path: ""
      type: "case_studies"
    values:
      layout: case-study
```

- [ ] **Step 2: Restart Jekyll server to pick up config change**

Stop and re-run `bundle exec jekyll serve`.

- [ ] **Step 3: Commit**

```bash
git add _config.yml
git commit -m "feat(config): add _case_studies collection at /work/:slug/"
```

---

### Task 10.2: Add case study include and work index

**Files:**
- Create: `_includes/case-study-card.html`
- Create: `work/index.html`

- [ ] **Step 1: Create `_includes/case-study-card.html`**

```html
<article class="card card-case-study reveal">
    <div>
        <div class="meta-row">
            {% if include.study.industry %}<span class="tag">{{ include.study.industry }}</span>{% endif %}
            {% if include.study.duration %}<span class="tag">{{ include.study.duration }}</span>{% endif %}
            {% for s in include.study.services %}<span class="tag">{{ s }}</span>{% endfor %}
        </div>
        <h3>{{ include.study.title }}</h3>
        <p>{{ include.study.summary }}</p>
        <a href="{{ include.study.url }}" class="btn-ghost">Read case study <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </div>
    <div>
        {% if include.study.metrics %}
        <div class="stat-row">
            {% for m in include.study.metrics %}
                {% assign parts = m | split: '|' %}
                <div class="stat">
                    <span class="stat-number" data-count data-target="{{ parts[0] }}" data-suffix="{{ parts[1] }}">{{ parts[0] }}{{ parts[1] }}</span>
                    <span class="stat-label">{{ parts[2] }}</span>
                </div>
            {% endfor %}
        </div>
        {% endif %}
    </div>
</article>
```

- [ ] **Step 2: Create `work/index.html`**

```html
---
layout: default
title: Work
description: Recent Azure engagements by Tech Design Concept.
---

<section class="page-header">
    <div class="container">
        <p class="eyebrow">Work</p>
        <h1>Recent engagements.</h1>
        <p class="lede">A selection of projects — some anonymised, all real.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        {% if site.case_studies.size == 0 %}
            <div class="card text-center" style="padding:var(--space-9)">
                <h3>Case studies coming soon</h3>
                <p>We're writing these up. Meanwhile, get in touch to hear about relevant engagements in person.</p>
                <a href="/contact/" class="btn mt-4">Get in touch</a>
            </div>
        {% else %}
            <div class="stack">
                {% for study in site.case_studies %}
                    {% include case-study-card.html study=study %}
                {% endfor %}
            </div>
        {% endif %}
    </div>
</section>

<section class="cta-band">
    <div class="container">
        <h2>Got a project in mind?</h2>
        <p class="lede">Tell us about it.</p>
        <div class="cluster">
            <a href="/contact/" class="btn btn-lg">Start a conversation</a>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add _includes/case-study-card.html work/index.html
git commit -m "feat(work): add case study include and /work/ index listing"
```

---

### Task 10.3: Create `_layouts/case-study.html`

**Files:**
- Create: `_layouts/case-study.html`

- [ ] **Step 1: Create file**

```html
---
layout: default
---
<section class="page-header">
    <div class="container" style="max-width:880px">
        <p class="eyebrow">
            <a href="/work/" style="color:inherit">← All work</a>
        </p>
        <div class="meta-row" style="margin-bottom:var(--space-5)">
            {% if page.industry %}<span class="tag">{{ page.industry }}</span>{% endif %}
            {% if page.duration %}<span class="tag">{{ page.duration }}</span>{% endif %}
            {% for s in page.services %}<span class="tag">{{ s }}</span>{% endfor %}
        </div>
        <h1>{{ page.title }}</h1>
        {% if page.summary %}<p class="lede">{{ page.summary }}</p>{% endif %}
        {% if page.client %}<p style="color:var(--text-2);font-family:var(--font-mono);font-size:0.8125rem">{{ page.client }}</p>{% endif %}

        {% if page.metrics %}
        <div class="stat-row" style="margin-top:var(--space-6)">
            {% for m in page.metrics %}
                {% assign parts = m | split: '|' %}
                <div class="stat">
                    <span class="stat-number" data-count data-target="{{ parts[0] }}" data-suffix="{{ parts[1] }}">{{ parts[0] }}{{ parts[1] }}</span>
                    <span class="stat-label">{{ parts[2] }}</span>
                </div>
            {% endfor %}
        </div>
        {% endif %}
    </div>
</section>

<section class="section">
    <div class="container" style="max-width:760px">
        <div class="post-content">{{ content }}</div>
    </div>
</section>

<section class="cta-band">
    <div class="container">
        <h2>Similar project in mind?</h2>
        <div class="cluster">
            <a href="/contact/" class="btn btn-lg">Get in touch</a>
            <a href="/work/" class="btn btn-secondary btn-lg">More case studies</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/case-study.html
git commit -m "feat(work): add case-study layout with metric hero and body content"
```

---

### Task 10.4: Add one seed case study

**Files:**
- Create: `_case_studies/2026-seed-case-study.md`

Josh will replace this seed content with real engagement details.

The metrics format is pipe-delimited: `value|suffix|label`. The counter animates `value` and appends `suffix`.

- [ ] **Step 1: Create seed file**

```markdown
---
title: "Fintech lift-and-shift to Azure"
client: "Confidential — tier-1 financial services"
industry: "Financial Services"
duration: "8 weeks"
services:
  - Cloud Migration
  - Security
summary: "Two hundred VMs migrated to Azure with zero production downtime, cutting infrastructure cost by a third and establishing the platform foundation for all future workloads."
featured: true
metrics:
  - "200|+|VMs migrated"
  - "0|%|production downtime"
  - "32|%|cost reduction"
---

## Challenge

Our client, a tier-1 financial services provider, was running a sprawling on-premise VMware estate that couldn't keep pace with their product roadmap. Capacity planning was manual, disaster recovery was untested, and every new workload took weeks of infrastructure lead time. They had committed to Azure but needed a partner to make the migration actually happen — not just plan it.

## Approach

We ran a four-week discovery phase, mapping every workload, dependency, and failover path. Workloads were clustered into migration waves and each cluster went through a standard track: landing-zone preparation, pilot migration on a non-critical subset, full wave migration, and stabilisation.

Security was built in from the start — identity was re-architected on Entra ID with Conditional Access policies, Defender for Cloud was enabled across every subscription from day one, and Azure Policy enforced baseline controls (tagging, encryption, diagnostic settings) on every deployment.

All target-state infrastructure was defined in Bicep, aligned to the Azure Verified Modules standard. CI/CD pipelines in GitHub Actions handled promotion through dev / UAT / prod environments.

## Outcome

The migration completed on time with zero production downtime. Annualised infrastructure cost dropped by 32% within the first quarter of operation, and new-workload provisioning went from weeks to under an hour. The client's platform team took over ongoing operations at handover, supported by the runbooks and training we delivered.
```

- [ ] **Step 2: Verify `/work/` lists this case study and the individual page renders at `/work/2026-seed-case-study/`**

- [ ] **Step 3: Commit**

```bash
git add _case_studies/2026-seed-case-study.md
git commit -m "feat(work): add seed case study (to be refined with real details)"
```

---

## Phase 11 — Contact page

### Task 11.1: Rewrite `contact/index.html`

**Files:**
- Modify: `contact/index.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
title: Contact
description: Get in touch with Tech Design Concept to discuss your Azure engagement.
---

<section class="page-header">
    <div class="container">
        <p class="eyebrow">Let's talk</p>
        <h1>Get in touch.</h1>
        <p class="lede">Tell us about what you're working on. We usually reply within one business day.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="grid-2" style="align-items:start;gap:var(--space-9)">
            <div class="reveal">
                <div class="card">
                    <form id="contact-form" action="https://formspree.io/f/xgvaqnyd" method="POST">
                        <div class="form-field">
                            <label class="form-label" for="name">Name</label>
                            <input class="form-control" type="text" id="name" name="name" required autocomplete="name">
                        </div>
                        <div class="form-field">
                            <label class="form-label" for="email">Email</label>
                            <input class="form-control" type="email" id="email" name="_replyto" required autocomplete="email">
                        </div>
                        <div class="form-field">
                            <label class="form-label" for="company">Company</label>
                            <input class="form-control" type="text" id="company" name="company" autocomplete="organization">
                        </div>
                        <div class="form-field">
                            <label class="form-label" for="service">Service of interest</label>
                            <select class="form-control" id="service" name="service">
                                <option value="">— Select a service —</option>
                                <option>Cloud Migration</option>
                                <option>Security Solutions</option>
                                <option>DevOps &amp; Automation</option>
                                <option>Infrastructure Optimisation</option>
                                <option>Data Solutions</option>
                                <option>Training &amp; Enablement</option>
                                <option>AI &amp; Analytics</option>
                                <option>Not sure yet</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label class="form-label" for="message">Message</label>
                            <textarea class="form-control" id="message" name="message" required></textarea>
                        </div>
                        <input type="hidden" name="_subject" value="Tech Design Concept website inquiry">
                        <button type="submit" class="btn btn-lg">Send message <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
                    </form>
                    <div id="contact-success" class="form-success" hidden>
                        <h3 style="margin-bottom:var(--space-2)">Thanks — message received.</h3>
                        <p>We'll get back to you within one business day.</p>
                    </div>
                </div>
            </div>
            <div class="reveal">
                <p class="eyebrow">Or reach us directly</p>
                <h2>Direct contact.</h2>
                <div class="stack mt-6">
                    <div>
                        <p class="eyebrow" style="margin-bottom:var(--space-1)">Email</p>
                        <p><a href="mailto:info@techdesignconcept.com">info@techdesignconcept.com</a></p>
                    </div>
                    <div>
                        <p class="eyebrow" style="margin-bottom:var(--space-1)">Hours</p>
                        <p>Monday – Friday, 9:00–17:30 AEST</p>
                    </div>
                    <div>
                        <p class="eyebrow" style="margin-bottom:var(--space-1)">Social</p>
                        <div class="footer-socials">
                            <a href="https://linkedin.com/company/tech-design-concept" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
                            <a href="https://github.com/techdesignconcept" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add contact/index.html
git commit -m "feat(contact): rewrite with dark form and right-side direct contact block"
```

---

### Task 11.2: Add `assets/js/contact.js`

**Files:**
- Create: `assets/js/contact.js`
- Modify: `_layouts/default.html` (add script tag)

- [ ] **Step 1: Create `assets/js/contact.js`**

Uses DOM text APIs (no `innerHTML`) for the sending/error messages.

```js
(function () {
    'use strict';
    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');
    if (!form || !success) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnLabel = submitBtn ? submitBtn.textContent.trim() : 'Send';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = new FormData(form);

        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(function (res) {
            if (!res.ok) throw new Error('network');
            form.hidden = true;
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }).catch(function () {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnLabel; }
            alert('Sorry — something went wrong. Please email info@techdesignconcept.com directly.');
        });
    });
})();
```

- [ ] **Step 2: Reference it in `_layouts/default.html`**

In `_layouts/default.html`, add this line after the `motion.js` script tag:

```html
<script src="/assets/js/contact.js"></script>
```

- [ ] **Step 3: Submit the form manually (real or throwaway email)**

Expected: success state appears inline without reload. A Formspree confirmation email is sent on first submit.

- [ ] **Step 4: Commit**

```bash
git add assets/js/contact.js _layouts/default.html
git commit -m "feat(contact): AJAX submit with inline success state"
```

---

## Phase 12 — Hero 3D render asset

### Task 12.1: Generate and wire the real hero render

**Files:**
- Create: `assets/imgs/hero-render.png` (or `.webp`)
- Modify: `_includes/hero-visual.html`

- [ ] **Step 1: Generate the hero image**

Use an image generation tool of your choice with a prompt like:

> Abstract 3D render, floating layered geometric architecture, translucent Azure blue crystalline planes stacked at angles, soft inner glow, subtle chromatic aberration, dark charcoal background, modern minimal product-shot aesthetic, dramatic rim light, 1:1 aspect, 1600×1600, alpha background.

Iterate until satisfied. Save as `assets/imgs/hero-render.png` (prefer webp if the generator supports it).

- [ ] **Step 2: Replace `_includes/hero-visual.html`**

```html
<img src="/assets/imgs/hero-render.png"
     alt=""
     loading="eager"
     fetchpriority="high"
     width="1600" height="1600">
```

(`alt=""` is intentional — the image is decorative; the headline conveys the meaning.)

- [ ] **Step 3: Verify the home page**

Expected: render loads in the right-hand grid column, cursor-follow glow sits behind it.

- [ ] **Step 4: Commit**

```bash
git add assets/imgs/hero-render.png _includes/hero-visual.html
git commit -m "feat(hero): wire final 3D abstract render"
```

---

## Phase 13 — Privacy + 404 restyle

### Task 13.1: Restyle `privacy/index.html`

**Files:**
- Modify: `privacy/index.html`

- [ ] **Step 1: Read the existing privacy content**

Open `privacy/index.html` and preserve the policy body text.

- [ ] **Step 2: Wrap it in the new page shell**

Replace only the wrapper markup, keeping the policy text body verbatim inside `.post-content`:

```html
---
layout: default
title: Privacy Policy
description: Privacy policy for Tech Design Concept.
---

<section class="page-header">
    <div class="container" style="max-width:760px">
        <p class="eyebrow">Legal</p>
        <h1>Privacy policy.</h1>
    </div>
</section>

<section class="section">
    <div class="container" style="max-width:760px">
        <div class="post-content">
            <!-- PRESERVE the existing privacy policy body text here, verbatim -->
        </div>
    </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add privacy/index.html
git commit -m "style(privacy): wrap in new dark page shell, preserve policy text"
```

---

### Task 13.2: Rewrite `404.html`

**Files:**
- Modify: `404.html`

- [ ] **Step 1: Overwrite**

```html
---
layout: default
title: Not Found
description: The page you were looking for doesn't exist.
---

<section class="section" style="text-align:center;min-height:60vh;display:flex;align-items:center;justify-content:center">
    <div class="container" style="max-width:520px">
        <p class="eyebrow">Error 404</p>
        <h1 style="margin-bottom:var(--space-4)">Page not found.</h1>
        <p class="lede">We couldn't find that page. It may have moved, or you may have followed a stale link.</p>
        <div class="cluster" style="justify-content:center;margin-top:var(--space-6)">
            <a href="/" class="btn">Go home</a>
            <a href="/blog/" class="btn btn-secondary">Read the blog</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add 404.html
git commit -m "feat(404): rewrite with on-brand dark layout"
```

---

## Phase 14 — Cleanup

### Task 14.1: Remove obsolete assets and legacy CSS

**Files to delete (pending confirmation they are unused):**
- `assets/css/main.legacy.css`
- `assets/imgs/LandingPageImage.png`
- `assets/imgs/cloud-technology-vector-logo.png`
- `assets/imgs/modern-security.png`
- `assets/imgs/microsoft-azure-migration-gb-S-1.png`
- `assets/imgs/githubdevops.png`
- `assets/imgs/3d2df4d8-800b-4e13-a419-b8f260f6d6a4.png`
- `assets/imgs/a55cd087-202e-482d-a8dd-2e5c4cd13b79.png`
- `assets/imgs/495292b3-8c8f-42af-a3b7-7e219413277c.png`

- [ ] **Step 1: Confirm no remaining references**

Use Grep (not shell grep):

```
pattern: LandingPageImage|cloud-technology-vector-logo|modern-security|microsoft-azure-migration|githubdevops|3d2df4d8|a55cd087|495292b3|main\.legacy
glob: **/*.{html,md,css}
```

Expected: zero matches (excluding `_site/` and `.jekyll-cache/`).

If any blog post still references one of the listed images in its body markdown, skip that one image from deletion.

- [ ] **Step 2: Delete the confirmed-unused files**

```bash
rm assets/css/main.legacy.css
rm assets/imgs/LandingPageImage.png
rm assets/imgs/cloud-technology-vector-logo.png
rm assets/imgs/modern-security.png
rm assets/imgs/microsoft-azure-migration-gb-S-1.png
rm assets/imgs/githubdevops.png
rm assets/imgs/3d2df4d8-800b-4e13-a419-b8f260f6d6a4.png
rm assets/imgs/a55cd087-202e-482d-a8dd-2e5c4cd13b79.png
rm assets/imgs/495292b3-8c8f-42af-a3b7-7e219413277c.png
```

- [ ] **Step 3: Rebuild and verify zero broken image links**

Run `bundle exec jekyll serve`, walk each page with the DevTools Network tab open. Expected: no 404s for images.

- [ ] **Step 4: Commit**

```bash
git add -u
git commit -m "chore: remove legacy CSS and obsolete AI-generated images"
```

---

### Task 14.2: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the CSP directive listing**

In CLAUDE.md replace the "Security headers" paragraph's allowlist with the current set (self, cdnjs, use.fontawesome.com, formspree.io, googletagmanager, google-analytics).

- [ ] **Step 2: Add a new "Case studies" section**

Insert under "Content conventions":

```markdown
### Case studies

`_case_studies/` is a Jekyll collection served at `/work/:slug/`. Each markdown file needs this frontmatter:

```yaml
---
title: "Engagement title"
client: "Client name or anonymised descriptor"
industry: "Industry label"
duration: "e.g. 8 weeks"
services: [Cloud Migration, Security]
summary: "Short card/hero summary."
featured: true   # optional; exactly one case study should be featured on the home page
metrics:
  - "200|+|VMs migrated"     # format: value|suffix|label
  - "32|%|cost reduction"
---
```

Body uses `## Challenge`, `## Approach`, `## Outcome` sections by convention.
```

- [ ] **Step 3: Add a "Design system" note**

Add under Architecture:

```markdown
### Design system

- Tokens live in `:root` at the top of `assets/css/main.css` (colors, spacing, radii, motion)
- Geist + Geist Mono self-hosted at `/assets/fonts/`
- Dark-first; no light-mode toggle
- `motion.js` handles scroll reveal, stat counters, cursor-follow glow, marquee
- `contact.js` handles AJAX submit to Formspree (`xgvaqnyd`)
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with new CSP, case studies, and design system notes"
```

---

## Phase 15 — Verification and QA

### Task 15.1: Responsive check across breakpoints

- [ ] **Step 1: Start dev server**

Run: `bundle exec jekyll serve`

- [ ] **Step 2: Walk every page at every breakpoint**

In Chrome DevTools Device Mode, load each of `/`, `/services/`, `/work/`, `/about/`, `/blog/`, `/contact/`, `/privacy/`, `/404.html`, one blog post, and `/work/2026-seed-case-study/` at 375, 640, 768, 1024, 1280, 1920.

Record any visual regression (horizontal scroll, overlap, broken grid) and fix inline in `assets/css/main.css`.

- [ ] **Step 3: Commit any fixes**

```bash
git add -u
git commit -m "fix(css): responsive tweaks from QA pass"
```

---

### Task 15.2: Console and CSP check

- [ ] **Step 1: With DevTools console open, visit each page**

Expected: zero errors, zero CSP violations, zero 404s.

- [ ] **Step 2: End-to-end contact form submit**

Submit with a throwaway email. Expected: success state inline, email arrives in Formspree inbox (Josh verifies).

- [ ] **Step 3: Fix any CSP violations by adjusting `_layouts/default.html`**

- [ ] **Step 4: Commit if anything changed**

```bash
git add -u
git commit -m "fix(csp): resolve violations found during QA"
```

---

### Task 15.3: Lighthouse audit

- [ ] **Step 1: Build and serve the production output**

```bash
bundle exec jekyll build
python -m http.server --directory _site 8000
```

- [ ] **Step 2: Run Lighthouse (Navigation, Mobile, all categories) on `/`, `/services/`, `/work/`, `/about/`, `/contact/`**

Targets: ≥95 for Performance, Accessibility, Best Practices, SEO.

- [ ] **Step 3: Address any sub-95 score**

Common culprits: oversized hero render (compress via `cwebp` or similar), missing `loading="lazy"` on below-the-fold imagery, missing `alt` attributes, color-contrast issues.

- [ ] **Step 4: Commit final fixes**

```bash
git add -u
git commit -m "perf(a11y): final Lighthouse pass"
```

---

### Task 15.4: Merge the design-uplift branch

- [ ] **Step 1: Pre-merge status check**

Run: `git status && git log main..HEAD --oneline`
Expected: clean working tree, a full list of commits for the uplift.

- [ ] **Step 2: Merge locally**

GitHub Pages deploys from `main` on push — no PR needed unless Josh prefers one.

```bash
git checkout main
git merge --no-ff design-uplift-2026-04 -m "Merge design uplift — full dark-first redesign"
```

- [ ] **Step 3: Push**

```bash
git push origin main
```

Expected: GitHub Pages build triggers; live site reflects the new design within ~2–3 minutes.

- [ ] **Step 4: Clean up the feature branch**

```bash
git branch -d design-uplift-2026-04
git push origin --delete design-uplift-2026-04
```

---

## Success Criteria (from spec)

- [ ] Every existing page renders in the new design system without missing content
- [ ] Lighthouse scores ≥95 for Performance, Accessibility, Best Practices, SEO on home, services, about, work, contact
- [ ] Total CSS payload ≤ 30KB gzipped
- [ ] Total JS payload ≤ 10KB gzipped (excluding `gtag.js`)
- [ ] Contact form submits successfully to Formspree end-to-end
- [ ] At least one case study published under `_case_studies/`
- [ ] Zero console errors, zero CSP violations in Chrome, Firefox, Safari
- [ ] Mobile (375px) through desktop (1920px) render correctly with no horizontal scroll
