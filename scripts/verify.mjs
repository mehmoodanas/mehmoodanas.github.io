// Post-build checks for the portfolio. Run after `npm run build`:
//
//   node scripts/verify.mjs              internal checks (pages, links, anchors, alt text, meta)
//   node scripts/verify.mjs --external   also request every external link
//
// Exits with code 1 if anything fails, so it can gate a deployment.
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, ''); // '' or '/portfolio'
const checkExternal = process.argv.includes('--external');

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

if (!(await exists(dist))) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const files = await walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const rel = (f) => path.relative(dist, f).split(path.sep).join('/');

/* ── 1. Required files ── */
for (const required of [
  'index.html',
  '404.html',
  'favicon.svg',
  'apple-touch-icon.png',
  'og-image.png',
  'robots.txt',
  'sitemap-index.xml',
]) {
  if (!(await exists(path.join(dist, required)))) fail(`Missing build output: ${required}`);
}

/* ── 2. Every download link points at a real file (the CV: .docx or .pdf) ── */
async function checkDownload(href, fromPage) {
  let p = href.split('#')[0].split('?')[0];
  if (base && p.startsWith(base)) p = p.slice(base.length);
  const file = path.join(dist, decodeURIComponent(p));
  if (!(await exists(file))) return fail(`[${fromPage}] download link to a missing file: ${href}`);
  const bytes = await readFile(file);
  if (bytes.length === 0) return fail(`[${fromPage}] download file is empty: ${href}`);
  const lower = p.toLowerCase();
  if (lower.endsWith('.docx')) {
    const isZip = bytes.subarray(0, 2).toString('latin1') === 'PK';
    if (!isZip || !bytes.includes(Buffer.from('word/document.xml'))) fail(`${href} is not a valid .docx file`);
  } else if (lower.endsWith('.pdf')) {
    if (bytes.subarray(0, 5).toString('latin1') !== '%PDF-') fail(`${href} is not a valid .pdf file`);
  }
}

/* ── 3. Per-page checks ── */
const pages = new Map(); // route -> { html, ids }
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(rel(file), { html, ids });
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

let downloadLinks = 0;
for (const [name, { html }] of pages) {
  const label = `[${name}]`;
  const noindex = /<meta name="robots" content="noindex"/.test(html);
  for (const a of html.matchAll(/<a\b[^>]*\sdownload(?:=|\s|>)[^>]*>/g)) {
    const href = attr(a[0], 'href');
    if (href) {
      downloadLinks++;
      await checkDownload(href, name);
    }
  }
  if (!/<html[^>]*\slang="en"/.test(html)) fail(`${label} missing <html lang>`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(`${label} missing or short <title>`);
  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) fail(`${label} missing meta description`);
  if (!noindex && !/<link rel="canonical" href="https?:\/\//.test(html)) fail(`${label} missing absolute canonical URL`);
  if (!/<meta property="og:image" content="https?:\/\//.test(html)) fail(`${label} og:image is not absolute`);
  if (!/<meta name="twitter:card"/.test(html)) fail(`${label} missing twitter:card`);
  if (name !== '404.html') {
    const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
    if (h1s !== 1) fail(`${label} has ${h1s} <h1> elements (expected 1)`);
  }

  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (attr(img[0], 'alt') === undefined) fail(`${label} <img> without alt: ${img[0].slice(0, 90)}`);
    if (!attr(img[0], 'width') || !attr(img[0], 'height')) warn(`${label} <img> without width/height (layout shift)`);
  }

  // Heading order: no jumps of more than one level
  let last = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) {
    const level = Number(m[1]);
    if (last && level > last + 1) warn(`${label} heading level jumps from h${last} to h${level}`);
    last = level;
  }

  // Duplicate ids
  const seen = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    if (seen.has(m[1])) fail(`${label} duplicate id "${m[1]}"`);
    seen.add(m[1]);
  }

  // target="_blank" links must have rel="noopener"
  for (const a of html.matchAll(/<a\b[^>]*>/g)) {
    if (attr(a[0], 'target') === '_blank' && !/noopener/.test(attr(a[0], 'rel') ?? '')) {
      fail(`${label} target=_blank without rel=noopener: ${attr(a[0], 'href')}`);
    }
  }
}

/* ── 4. Links ── */
const externalLinks = new Map(); // url -> pages
const internalChecked = new Set();

function routeToFile(route) {
  const clean = route.replace(/\/$/, '');
  if (clean === '') return 'index.html';
  if (path.extname(clean)) return clean.replace(/^\//, '');
  return `${clean.replace(/^\//, '')}/index.html`;
}

for (const [name, { html }] of pages) {
  for (const tag of html.matchAll(/<(?:a|link)\b[^>]*>/g)) {
    const href = attr(tag[0], 'href');
    if (!href || href.startsWith('data:')) continue;
    // Canonical/sitemap URLs point at the deployed site, which does not exist yet at build time.
    if (/\srel="(canonical|sitemap)"/.test(tag[0])) continue;

    if (/^https?:\/\//.test(href)) {
      if (!externalLinks.has(href)) externalLinks.set(href, new Set());
      externalLinks.get(href).add(name);
      continue;
    }
    if (/^(mailto:|tel:|javascript:)/.test(href)) {
      if (href.startsWith('javascript:')) fail(`[${name}] javascript: link`);
      continue;
    }

    // internal link
    let [pathname, fragment] = href.split('#');
    let target;
    if (pathname === '') {
      target = name; // same-page anchor
    } else {
      if (base && pathname.startsWith(base)) pathname = pathname.slice(base.length) || '/';
      if (!pathname.startsWith('/')) {
        pathname = `/${path.posix.join(path.posix.dirname('/' + name), pathname)}`;
      }
      target = routeToFile(pathname);
    }
    const key = `${name} -> ${href}`;
    if (internalChecked.has(key)) continue;
    internalChecked.add(key);

    const targetPage = pages.get(target);
    if (!(await exists(path.join(dist, target)))) {
      fail(`[${name}] broken internal link: ${href}`);
    } else if (fragment && targetPage && !targetPage.ids.has(fragment)) {
      fail(`[${name}] anchor #${fragment} not found on ${target}`);
    }
  }

  for (const tag of html.matchAll(/<(?:img|source|script)\b[^>]*>/g)) {
    for (const name2 of ['src', 'srcset']) {
      const value = attr(tag[0], name2);
      if (!value) continue;
      for (const part of value.split(',')) {
        const u = part.trim().split(/\s+/)[0];
        if (!u || /^(https?:|data:)/.test(u)) continue;
        const p = base && u.startsWith(base) ? u.slice(base.length) : u;
        if (!(await exists(path.join(dist, p.split('?')[0])))) fail(`[${name}] missing asset: ${u}`);
      }
    }
  }
}

/* ── 5. External links (optional) ── */
const unverifiable = [/linkedin\.com/];
if (checkExternal) {
  console.log(`Checking ${externalLinks.size} external links…`);
  for (const [link, where] of externalLinks) {
    try {
      const res = await fetch(link, {
        redirect: 'follow',
        headers: { 'user-agent': 'portfolio-link-check/1.0' },
        signal: AbortSignal.timeout(20000),
      });
      const ok = res.status >= 200 && res.status < 400;
      const skip = unverifiable.some((re) => re.test(link));
      if (ok) console.log(`  ${res.status}  ${link}`);
      else if (skip) warn(`Could not verify (site blocks automated requests, HTTP ${res.status}): ${link}`);
      else fail(`External link returned HTTP ${res.status}: ${link} (used on ${[...where].join(', ')})`);
    } catch (error) {
      const skip = unverifiable.some((re) => re.test(link));
      (skip ? warn : fail)(`External link failed: ${link} (${error.cause?.code ?? error.message})`);
    }
  }
} else {
  warn(`External links not requested (${externalLinks.size} found). Run with --external to check them.`);
}

/* ── Report ── */
if (downloadLinks === 0) fail('No download link (CV) found on any page');
console.log(
  `\nChecked ${htmlFiles.length} pages, ${internalChecked.size} internal links, ${downloadLinks} download links.`,
);
for (const w of warnings) console.log(`  warning: ${w}`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\n✓ All checks passed.');
