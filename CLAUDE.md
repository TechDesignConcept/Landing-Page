# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Jekyll static site for Tech Design Concept (Azure/cloud consulting). Deployed via GitHub Pages from `main`; custom domain `techdesignconcept.com` (see `CNAME`).

## Commands

```bash
bundle install                 # install Ruby gem dependencies
bundle exec jekyll serve       # local dev server with live reload
bundle exec jekyll build       # build to _site/
bundle exec jekyll serve --drafts  # include posts in _drafts/
```

No test suite, linter, or JS build step — this is plain HTML/CSS/JS served through Jekyll.

## Architecture

Standard Jekyll layout; a few site-specific conventions worth knowing:

- **Permalinks**: blog posts are served at `/blog/:title/` (configured in `_config.yml`), not the default `/YYYY/MM/DD/title/`. Internal links to posts should use this pattern.
- **Layout defaults**: every page defaults to `layout: default`; every file in `_posts/` defaults to `layout: post`. Front matter can omit `layout` unless overriding.
- **Top-level section directories** (`about/`, `services/`, `blog/`, `contact/`, `privacy/`) each contain an `index.html` with its own front matter — this is how "pages" are organized rather than using `_pages/`.
- **Includes**: `header.html`, `footer.html`, `logo.html`, `marquee.html`, `blog-card.html`, `case-study-card.html`, `hero-visual.html` — `_layouts/default.html` wires header/footer around `{{ content }}`.
- **Assets**: single `assets/css/main.css`; JS split into `menu.js` (mobile nav), `motion.js` (scroll reveal + counters + glow + marquee), `contact.js` (Formspree AJAX), `gtag-init.js` (GA bootstrap). Font Awesome loaded from cdnjs; Geist + Geist Mono self-hosted at `/assets/fonts/`. No bundler.

### Design system

- Tokens live in `:root` at the top of `assets/css/main.css` (colors, spacing, radii, motion)
- Geist + Geist Mono self-hosted at `/assets/fonts/`
- Dark-first; no light-mode toggle
- `motion.js` handles scroll reveal, stat counters, cursor-follow glow, marquee
- `contact.js` handles AJAX submit to Formspree (`xgvaqnyd`)

## Content conventions

### Blog post front matter (required fields)

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
author: "Name"
image: "/assets/imgs/featured.png"
excerpt: "Short summary"
tags: [tag1, tag2]
---
```

Filename must be `YYYY-MM-DD-title-of-post.md` for Jekyll to pick it up.

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

### Security headers

`_layouts/default.html` sets a strict CSP via `<meta http-equiv>` tags. When adding external scripts, styles, fonts, or image sources, the CSP `script-src` / `style-src` / `img-src` / `font-src` / `connect-src` directives must be updated — otherwise the resource will be blocked silently in the browser. Currently allowed: self, cdnjs.cloudflare.com (styles/fonts), use.fontawesome.com (fonts), data: (images), formspree.io (form submit), googletagmanager.com + google-analytics.com (GA). GA (`gtag.js`) is loaded in `default.html`; init lives in `assets/js/gtag-init.js`.

## Deployment

Pushing to `main` triggers GitHub Pages to build and deploy. `_site/` is generated output — do not hand-edit or commit meaningful changes there.
