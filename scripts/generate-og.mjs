// Renders public/og-image.png (1200x630) from scripts/og/template.html using the
// installed Microsoft Edge or Google Chrome in headless mode.
// Run with: npm run og
import { spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
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
const profile = mkdtempSync(path.join(tmpdir(), 'og-profile-'));
const startedAt = Date.now();

const result = spawnSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=4000',
    `--user-data-dir=${profile}`,
    `--screenshot=${out}`,
    html,
  ],
  { stdio: 'inherit' },
);
if (result.status !== 0) process.exit(result.status ?? 1);

// The browser can return before the screenshot file has been flushed to disk: wait for it.
const deadline = Date.now() + 20000;
const written = () => existsSync(out) && statSync(out).mtimeMs >= startedAt - 1000 && statSync(out).size > 10000;
while (Date.now() < deadline && !written()) await sleep(250);
if (!written()) {
  console.error('og-image.png was not written. Is another Edge/Chrome window blocking headless mode?');
  process.exit(1);
}
console.log('og-image.png written');
