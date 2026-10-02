# Anas Mehmood — Portfolio

**Live site: <https://mehmoodanas.github.io/>**

A fast, accessible, static portfolio website built with [Astro](https://astro.build). All text
lives in **one data file**, and the site builds to plain HTML, CSS and a tiny bit of JavaScript
that can be hosted for free (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

- **Design:** neutral warm background, one teal accent, layered cards with soft shadows, and one
  small CSS-only 3D element in the hero. No 3D library, no particles, no custom cursor, no scroll
  hijacking.
- **Motion:** gentle and optional. The hero decoration floats for five seconds and then rests. With
  "reduce motion" turned on in the operating system, all animation stops and the decoration stays
  still. Browsers that cannot do 3D transforms show a flat stack of cards instead.
- **Pages:** one home page (Hero, About, Skills, Projects, Education & certifications, Contact),
  one case-study page for each featured project, and a 404 page.

## Quick start

You need [Node.js](https://nodejs.org) **22.12 or newer** (Node 22 LTS or 24; `.nvmrc` says 22).

```bash
npm install        # once, to download dependencies
npm run dev        # live preview at http://localhost:4321 (updates as you edit)
```

| Command                        | What it does                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| `npm run dev`                  | Starts the live-reloading preview                                                       |
| `npm run build`                | Creates the finished site in `dist/`                                                    |
| `npm run preview`              | Serves `dist/` locally, exactly as it will look online                                  |
| `npm run check`                | Type-checks the code and content                                                        |
| `npm run verify`               | After a build: checks pages, links, anchors, alt text, meta tags and the CV download    |
| `npm run verify:external`      | Same, and also requests every external link                                             |
| `npm run icons` / `npm run og` | Re-creates the touch icon / the social-sharing image (see "Branding")                   |

## Project structure

```
src/
  data/portfolio.ts      ← ALL CONTENT (edit this)
  data/types.ts          ← shape of the content (rarely needs editing)
  components/            ← Hero, About, Skills, Projects, Education, Contact, Header, Footer…
  pages/index.astro      ← home page
  pages/projects/[slug].astro   ← case-study pages (one per featured project)
  layouts/BaseLayout.astro      ← <head>, SEO, social metadata, header/footer
  styles/global.css      ← colours, typography, buttons, cards (design tokens at the top)
  scripts/site.ts        ← mobile menu, active link, reveal-on-scroll, copy email, hero tilt
  assets/projects/       ← real project images (optimised automatically at build time)
public/
  cv/Anas-Mehmood-CV.docx   ← the CV served by every "Download CV" button
  favicon.svg, og-image.png, apple-touch-icon.png
scripts/                 ← verify.mjs, generate-og.mjs, generate-icons.mjs
docs/                    ← UPDATING.md, CONTENT-NOTES.md
.github/workflows/deploy.yml  ← automatic deployment to GitHub Pages
_reference-material/     ← the source files used to write the content (git-ignored, not part of the site)
```

## Updating the content

Short version: open `src/data/portfolio.ts`, change the text, save. The full guide — adding a
project, replacing the CV, showing your phone number, changing the colour — is in
[docs/UPDATING.md](docs/UPDATING.md).

## Deploying

The repository already contains a workflow (`.github/workflows/deploy.yml`) that type-checks,
builds, verifies and publishes the site to **GitHub Pages** on every push to `main`. It works out
the right address and base path from the repository name, so no settings are needed beyond a
one-time switch: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

| Repository name               | Site address                                  |
| ----------------------------- | --------------------------------------------- |
| `mehmoodanas.github.io`       | `https://mehmoodanas.github.io/`              |
| anything else, e.g. `portfolio` | `https://mehmoodanas.github.io/portfolio/`  |

The live site is published at the root from the `mehmoodanas.github.io` repository. The
`portfolio` repository holds a second copy of the same project that publishes to `/portfolio/`;
it can be kept as a backup or deleted.

### The old site

The previous portfolio (plain HTML) was replaced on 2 October 2026. Nothing was lost: it is kept
under the tag `old-site` in the `mehmoodanas.github.io` repository and is part of that
repository's history. To look at it: `git checkout old-site`. To put it back, create a branch from
that tag, copy its files over the new ones and set **Settings → Pages → Source** back to "Deploy
from a branch" (`main`, `/ (root)`).

### Publishing the same project to a second repository

```bash
git remote add site https://github.com/mehmoodanas/mehmoodanas.github.io.git
git push site main        # the workflow in .github/workflows/deploy.yml publishes it
```

### Overriding the address (custom domain, other hosts)

Add repository variables `SITE_URL` and `BASE_PATH` (**Settings → Secrets and variables → Actions →
Variables**). If you set them with the GitHub CLI on Windows in Git Bash, prefix the command with
`MSYS_NO_PATHCONV=1`, otherwise `/portfolio` is silently rewritten into a Windows path (the build
now refuses values like that). To build by hand with a sub-path:

```powershell
$env:SITE_URL = "https://mehmoodanas.github.io"; $env:BASE_PATH = "/portfolio"; npm run build
```

### Netlify, Vercel or Cloudflare Pages

Import the repository and use: build command `npm run build`, output directory `dist`. Set the
environment variable `SITE_URL` to the address you are given, for example
`https://your-name.netlify.app`, so canonical links and the social-sharing image use the right
domain (leave `BASE_PATH` unset).

### Search engines

The site lives at the root of `mehmoodanas.github.io`, so `robots.txt` and the sitemap are found
automatically. For faster indexing, submit `https://mehmoodanas.github.io/sitemap-index.xml` in
Google Search Console and Bing Webmaster Tools.

## Contact form

The site deliberately has **no contact form**. A form needs a backend service, and a form that
cannot deliver messages is worse than none. Visitors can email you with one click or copy the
address. If you want a form later, [Formspree](https://formspree.io) or
[Web3Forms](https://web3forms.com) work with a static site: create a form there, then add an HTML
`<form action="https://formspree.io/f/YOUR_ID" method="POST">` to `src/components/Contact.astro`
and show a message only after the service confirms the submission.

## Branding

- `public/favicon.svg` — the "AM" monogram. `npm run icons` regenerates `apple-touch-icon.png` from it.
- `public/og-image.png` — the 1200×630 picture shown when the link is shared on LinkedIn, Slack,
  WhatsApp and similar. `npm run og` regenerates it from `scripts/og/template.html` using the
  Edge or Chrome browser installed on your computer.
- The accent colour is a set of tokens at the top of `src/styles/global.css`. `favicon.svg` and
  `scripts/og/template.html` contain the colour as well; edit them and re-run `npm run icons` and
  `npm run og` if you change it.

## Accessibility and performance notes

- Semantic landmarks, one `<h1>` per page, a skip link, visible focus outlines, a keyboard-operable
  menu (Escape closes it), 44 px touch targets for buttons and navigation, and WCAG AA colour contrast.
- The site is usable without JavaScript (the mobile menu becomes a plain row of links).
- Fonts are bundled with the site (no Google Fonts requests). Images are converted to WebP at
  several sizes with explicit dimensions to avoid layout shift and lazy-loaded below the fold.
- The only JavaScript is `src/scripts/site.ts` (about 2 KB gzipped).

## What still needs your input

See [docs/CONTENT-NOTES.md](docs/CONTENT-NOTES.md) for the list of details that could not be
confirmed from your sources (for example the LinkedIn address, CV dates and a few skills).
