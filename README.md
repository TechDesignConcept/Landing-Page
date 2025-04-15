# Tech Design Concept Website

This repository contains the source code for the Tech Design Concept company website, built with Jekyll.

## Overview

This responsive landing page showcases Tech Design Concept's cloud consulting services with a modern, clean design optimised for all devices. The site features a professional appearance with Azure-inspired color schemes and intuitive navigation.

## Website Structure

The website follows a standard Jekyll structure:

- `_config.yml` - Jekyll configuration
- `_layouts/` - Templates for pages and posts
- `_includes/` - Reusable HTML components (header, footer)
- `_posts/` - Blog posts in Markdown format
- `assets/` - CSS, JavaScript, and image files
- Various top-level directories for main sections (about, services, blog, contact, privacy)

## Features

- **Responsive Design**: Optimised for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with Azure-inspired aesthetics
- **Performance Optimised**: Fast loading with optimised assets
- **SEO Ready**: Structured for search engine visibility
- **Security Enhanced**: Implements recommended security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy

## Technologies

- HTML5
- CSS3 (with Flexbox/Grid layouts)
- JavaScript
- Font Awesome icons
- Responsive design techniques

## Local Development

### Prerequisites

- Ruby version 2.7.0 or higher
- Bundler gem

### Setup

1. Clone the repository
2. Install dependencies:

```
bundle install
```

3. Start the local development server:

```
bundle exec jekyll serve
```

4. View the site at `http://localhost:4000`

## Deployment

The site is configured for deployment on GitHub Pages, but can be deployed to any static site host.

### GitHub Pages

The site will automatically build when changes are pushed to the main branch.

### Manual Deployment

To build the site manually:

```
bundle exec jekyll build
```

The built site will be in the `_site` directory, which can be deployed to any static hosting service.

## Adding Content

### Blog Posts

To add a new blog post, create a Markdown file in the `_posts` directory with the naming convention:
`YYYY-MM-DD-title-of-post.md`

Include the following front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
author: "Author Name"
image: "path/to/featured/image.jpg"
excerpt: "A brief excerpt of the post content"
tags: [tag1, tag2]
---
```

### Pages

To add a new page, create an `index.html` file in a new directory with the appropriate front matter:

```yaml
---
layout: default
title: Page Title
description: Page description for SEO
---
```

## Security

The site implements best practices for web security through appropriate HTTP headers. See the security report in the documentation folder for details.

## License

Copyright © 2025 Tech Design Concept Pty Ltd. All rights reserved.