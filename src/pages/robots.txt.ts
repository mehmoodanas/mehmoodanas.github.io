import type { APIRoute } from 'astro';
import { url } from '../utils/url';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('/sitemap-index.xml'), site ?? 'https://mehmoodanas.github.io');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
