# Anas Mehmood — Portfolio

A fast, accessible, static portfolio website built with [Astro](https://astro.build). All
text lives in **one data file**, and the site builds to plain HTML, CSS and a tiny bit of
JavaScript that can be hosted for free (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

- **Design:** neutral warm background, one teal accent, layered cards with soft shadows, and one
  small CSS-only 3D element in the hero. No 3D library, no particles, no custom cursor, no scroll
  hijacking.
- **Motion:** gentle and optional. With "reduce motion" turned on in the operating system, all
  animation stops and the hero decoration stays still. Browsers that cannot do 3D transforms show a
  flat stack of cards instead.
- **Pages:** one home page (Hero, About, Skills, Projects, Education & certifications, Contact),
  one case-study page for each featured project, and a 404 page.

## Quick start

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # once, to download dependencies
npm run dev        # live preview at http://localhost:4321 (updates as you edit)
```

| Command                        | What it does                                                            |
| ------------------------------ | ----------------------------------------------------------------------- |
| `npm run dev`                  | Starts the live-reloading preview                                       |
| `npm run build`                | Creates the finished site in `dist/`                                    |
| `npm run preview`              | Serves `dist/` locally, exactly as it will look online                  |
| `npm run check`                | Type-checks the code and content                                        |
| `npm run verify`               | After a build: checks pages, links, anchors, alt text, meta tags, CV    |
| `npm run verify:external`      | Same, and also requests every external link                             |
| `npm run icons` / `npm run og` | Re-creates the touch icon / the social-sharing image (see "Branding")  |

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
_reference-material/     ← the source files used to write the content (not part of the site)
```

## Updating the content

Short version: open `src/data/portfolio.ts`, change the text, save. The full guide — adding a
project, replacing the CV, showing your phone number, changing the colour — is in
[docs/UPDATING.md](docs/UPDATING.md).

## Deploying

### Option A — GitHub Pages at `https://mehmoodanas.github.io` (replaces the current site)

1. In the `mehmoodanas.github.io` repository, replace all files with the contents of this folder
   (everything except `node_modules/`, `dist/` and `_reference-material/`, which are git-ignored).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` type-checks, builds,
   verifies and publishes the site. The address appears in the workflow run and under
   **Settings → Pages**.

```bash
git init -b main
git remote add origin https://github.com/mehmoodanas/mehmoodanas.github.io.git
git add .
git commit -m "New portfolio"
git push --force origin main   # replaces the old site; the old version stays in git history
```

### Option B — a separate repository (keeps the current site untouched)

Create a new repository such as `portfolio`, push this folder to it, turn on **Pages → GitHub
Actions**, and add two repository variables (**Settings → Secrets and variables → Actions →
Variables**): `SITE_URL = https://mehmoodanas.github.io` and `BASE_PATH = /portfolio`. The site is
then served at `https://mehmoodanas.github.io/portfolio/`.

### Netlify, Vercel or Cloudflare Pages

Import the repository and use: build command `npm run build`, output directory `dist`. Set the
environment variable `SITE_URL` to the address you are given, for example
`https://your-name.netlify.app`, so canonical links and the social-sharing image use the right
domain. If you use your own domain, set `SITE_URL` to that domain.

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

## Accessibility and performance notes

- Semantic landmarks, one `<h1>` per page, a skip link, visible focus outlines, keyboard-operable
  menu (Escape closes it), 44 px minimum touch targets and WCAG AA colour contrast.
- Fonts are bundled with the site (no Google Fonts requests). Images are converted to WebP at
  several sizes with explicit dimensions to avoid layout shift and lazy-loaded below the fold.
- The only JavaScript is `src/scripts/site.ts` (about 2 KB gzipped).

## What still needs your input

See [docs/CONTENT-NOTES.md](docs/CONTENT-NOTES.md) for the list of details that could not be
confirmed from your sources (for example the LinkedIn address, CV dates and a few skills).
