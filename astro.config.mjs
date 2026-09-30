// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH can be overridden at build time (the GitHub Actions
// workflow does this). Defaults are for a GitHub user site:
//   https://mehmoodanas.github.io/
// Hosting in a sub-folder (for example https://mehmoodanas.github.io/portfolio/)?
//   SITE_URL=https://mehmoodanas.github.io BASE_PATH=/portfolio npm run build
const site = process.env.SITE_URL ?? 'https://mehmoodanas.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
