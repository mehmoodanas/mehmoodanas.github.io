// Renders public/og-image.png (1200x630) from scripts/og/template.html using the
// installed Microsoft Edge or Google Chrome in headless mode.
// Run with: node scripts/generate-og.mjs
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error('Install Edge or Chrome, or edit the candidates list in this script.');

const out = path.join(root, 'public', 'og-image.png');
const html = pathToFileURL(path.join(root, 'scripts', 'og', 'template.html')).href;
const result = spawnSync(
  browser,
  ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
   '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${out}`, html],
  { stdio: 'inherit' },
);
if (result.status !== 0) process.exit(result.status ?? 1);
console.log('og-image.png written');
