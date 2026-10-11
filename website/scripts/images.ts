// Renders the brand images in public/ from the running site (npm run build && npx astro preview):
//   og.png (1200×630), apple-touch-icon.png (180×180) and favicon.ico (16, 32 and 48 px).
//
//   node scripts/images.ts [http://127.0.0.1:4321]
import { writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const origin = process.argv[2] ?? 'http://127.0.0.1:4321';
const out = (file: string) => new URL(`../public/${file}`, import.meta.url);
const browser = await chromium.launch();

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`${origin}/og`, { waitUntil: 'networkidle' });
await og.locator('#card').screenshot({ path: out('og.png').pathname });

// The mark on a dark rounded tile, for the home screen; plain for the favicon.
const mark = async (size: number, tile: boolean) => {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const svg = await (await fetch(`${origin}/favicon.svg`)).text();
  await page.setContent(
    `<body style="margin:0;background:${tile ? '#08090c' : 'transparent'};display:grid;place-items:center;width:${size}px;height:${size}px">
      <div style="width:${tile ? size * 0.62 : size}px;height:${tile ? size * 0.62 : size}px">${svg.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
    </body>`
  );
  return page.screenshot({
    omitBackground: !tile,
    clip: { x: 0, y: 0, width: size, height: size },
  });
};

writeFileSync(out('apple-touch-icon.png'), await mark(180, true));

// ICO with embedded PNG images (supported by every current browser).
const images = await Promise.all(
  [16, 32, 48].map((size) => mark(size, false).then((png) => ({ size, png })))
);
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach(({ size, png }, i) => {
  const entry = 6 + i * 16;
  header.writeUInt8(size, entry);
  header.writeUInt8(size, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
writeFileSync(out('favicon.ico'), Buffer.concat([header, ...images.map(({ png }) => png)]));

await browser.close();
console.log('Wrote public/og.png, public/apple-touch-icon.png and public/favicon.ico');
