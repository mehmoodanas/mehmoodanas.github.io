// Renders public/apple-touch-icon.png from public/favicon.svg.
// Run with: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
await sharp(svg, { density: 512 })
  .resize(180, 180)
  .png()
  .toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
console.log('apple-touch-icon.png written');
