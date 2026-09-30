/**
 * Builds an internal URL that respects the `base` option in astro.config.mjs,
 * so the site keeps working if it is hosted in a sub-folder (for example
 * https://username.github.io/portfolio/).
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Absolute URL for canonical links and social-sharing images. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(url(path), site ?? 'https://mehmoodanas.github.io').toString();
}
