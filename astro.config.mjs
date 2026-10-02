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

// Git Bash on Windows silently rewrites "/portfolio" into "D:/Git/portfolio" when it is given on
// the command line. Refuse to build with a value like that instead of publishing broken links.
if (!/^\/([\w.~-]+\/?)*$/.test(base)) {
  throw new Error(
    `BASE_PATH must look like "/" or "/portfolio" (got "${base}"). ` +
      'In Git Bash on Windows use PowerShell, or prefix the command with MSYS_NO_PATHCONV=1.',
  );
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
