// Renders public/apple-touch-icon.png from public/favicon.svg.
// Run with: npm run icons
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
const out = fileURLToPath(new URL('../public/apple-touch-icon.png', import.meta.url));
await sharp(svg, { density: 512 }).resize(180, 180).png().toFile(out);
console.log('apple-touch-icon.png written');
