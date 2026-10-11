// Per-icon social cards (/og/icons/<id>.png): an SVG composed at build time and drawn by resvg,
// in the look of the site-wide og.png (dark background, faint grid, accent glow, Geist).
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { type Icon, INTERACTIONS, SITE } from './icons';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const BG = '#08090c';
const FG = '#eef0f6';
const MUTED = '#9aa0b2';
const SUBTLE = '#6b7183';
const SURFACE = '#101218';
const ACCENT = '#7b8bff';
const ACCENT_2 = '#c084fc';

/** Table lengths in a font file are padded to 4 bytes. */
const padded = (n: number) => (n + 3) & ~3;

/** WOFF 1.0 -> the TrueType/OpenType file it wraps: resvg reads only TTF/OTF. */
const woffToSfnt = (woff: Buffer): Buffer => {
  const flavor = woff.readUInt32BE(4);
  const count = woff.readUInt16BE(12);
  const tables = Array.from({ length: count }, (_, i) => {
    const at = 44 + i * 20;
    const offset = woff.readUInt32BE(at + 4);
    const compressed = woff.readUInt32BE(at + 8);
    const length = woff.readUInt32BE(at + 12);
    const raw = woff.subarray(offset, offset + compressed);
    return {
      tag: woff.readUInt32BE(at),
      checksum: woff.readUInt32BE(at + 16),
      data: compressed < length ? inflateSync(raw) : raw,
    };
  });
  const header = 12 + count * 16;
  const out = Buffer.alloc(header + tables.reduce((sum, t) => sum + padded(t.data.length), 0));
  const log2 = Math.floor(Math.log2(count));
  out.writeUInt32BE(flavor, 0);
  out.writeUInt16BE(count, 4);
  out.writeUInt16BE(2 ** log2 * 16, 6);
  out.writeUInt16BE(log2, 8);
  out.writeUInt16BE(count * 16 - 2 ** log2 * 16, 10);
  let offset = header;
  tables.forEach((table, i) => {
    const at = 12 + i * 16;
    out.writeUInt32BE(table.tag, at);
    out.writeUInt32BE(table.checksum, at + 4);
    out.writeUInt32BE(offset, at + 8);
    out.writeUInt32BE(table.data.length, at + 12);
    table.data.copy(out, offset);
    offset += padded(table.data.length);
  });
  return out;
};

// Fontsource names the weights as families: 'Geist' (400) and 'Geist SemiBold' (600).
const REGULAR = 'Geist';
const SEMIBOLD = 'Geist SemiBold';

let fonts: string[] | undefined;
/** Geist as TTF files in the temp directory: resvg's Node binding loads fonts only from files. */
const fontFiles = () => {
  if (!fonts) {
    // The package's exports cover only its CSS, so find the font files next to its LICENSE.
    const require = createRequire(join(import.meta.env.REPO_DIR, 'website/package.json'));
    const source = join(dirname(require.resolve('@fontsource/geist/LICENSE')), 'files');
    const dir = join(tmpdir(), 'useanimations-og-fonts');
    mkdirSync(dir, { recursive: true });
    fonts = [400, 600].map((weight) => {
      const file = join(dir, `geist-${weight}.ttf`);
      writeFileSync(
        file,
        woffToSfnt(readFileSync(join(source, `geist-latin-${weight}-normal.woff`)))
      );
      return file;
    });
  }
  return fonts;
};

const escape = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const LOGO_MARK =
  '<path fill="url(#accent)" fill-opacity=".55" d="M11.29 33.89c.28 0 1.3.18 1.3-1.1V14.96a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v7.97c0 6.05 5.05 10.96 11.29 10.96"/><path fill="url(#accent)" d="M32.61.01c.43 0 2.02-.27 2.02 1.71V31a3 3 0 0 1-3 3H18.11a3 3 0 0 1-3-3V17c0-9.38 7.84-16.99 17.5-16.99"/>';

const recolor = (svg: string) =>
  svg
    .replace(/(stroke|fill)="rgb\(255,\s*255,\s*255\)"/g, `$1="${SURFACE}"`)
    .replace(/(stroke|fill)="rgb\([^)]*\)"/g, `$1="${ACCENT}"`)
    .replaceAll('currentColor', ACCENT);

/** The drawing as a nested <svg> at (x, y), size × size; undefined without a viewBox. */
const place = (svg: string, x: number, y: number, size: number) => {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1];
  if (!viewBox) return undefined;
  // compactSvg serializes a frame that draws nothing as a self-closing <svg/>.
  return svg
    .replace(/^(<svg[^>]*?)\s*\/>$/, '$1></svg>')
    .replace(
      /^<svg[^>]*>/,
      `<svg xmlns="http://www.w3.org/2000/svg" x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" fill="none">`
    );
};

/** True when the drawing paints at least a few pixels (trimmed or transparent frames don't). */
const paints = (svg: string) => {
  const pixels = new Resvg(svg, {
    fitTo: { mode: 'width', value: 48 },
    font: { loadSystemFonts: false },
  }).render().pixels;
  let painted = 0;
  for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0 && ++painted > 20) return true;
  return false;
};

/**
 * The icon in the accent color: its still (lib/icons.ts), as on the page before any script, then a
 * static SVG, then the logo mark.
 */
const drawing = (icon: Icon, x: number, y: number, size: number) => {
  for (const candidate of [icon.preview, ...Object.values(icon.svgs)]) {
    const svg = recolor(candidate);
    const preview = place(svg, 0, 0, 48);
    if (preview && paints(preview)) return place(svg, x, y, size)!;
  }
  return `<svg x="${x + size * 0.2}" y="${y + size * 0.2}" width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 35 34">${LOGO_MARK}</svg>`;
};

/** Splits a title into at most two lines and picks a font size that fits `width`. */
const fitTitle = (title: string, width: number) => {
  // Geist SemiBold at -0.04 em tracking averages under 0.48 em per character in title case.
  const fits = (text: string, size: number) => text.length * size * 0.48 <= width;
  for (const size of [96, 88, 80, 72]) if (fits(title, size)) return { lines: [title], size };
  // Two lines: the split whose longer line is shortest, at the largest size that fits it.
  const words = title.split(' ');
  const splits = words
    .slice(1)
    .map((_, i) => [words.slice(0, i + 1).join(' '), words.slice(i + 1).join(' ')]);
  const lines = splits.reduce<string[]>(
    (best, split) =>
      Math.max(...split.map((l) => l.length)) < Math.max(...best.map((l) => l.length))
        ? split
        : best,
    [title]
  );
  const longest = lines.reduce((a, b) => (a.length >= b.length ? a : b));
  return { lines, size: [88, 80, 72, 64].find((size) => fits(longest, size)) ?? 56 };
};

export const ogSvg = (icon: Icon): string => {
  const formats = ['React', 'Lottie', ...(Object.keys(icon.svgs).length ? ['SVG'] : [])];
  const tagline = ['Animated icon', INTERACTIONS[icon.interaction].label, ...formats].join(' · ');
  const { lines, size } = fitTitle(icon.title, 600);
  const lineHeight = size * 1.02;
  // The first baseline: 330 for one line, a little under half a line higher for two.
  const baseline = 330 - (lines.length - 1) * (lineHeight / 2 - 8);
  const tile = { x: 720, y: 115, size: 400 };
  const host = SITE.replace(/^https?:\/\//, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
<defs>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0" stop-color="${ACCENT}"/><stop offset="1" stop-color="${ACCENT_2}"/></linearGradient>
  <radialGradient id="glow" cx="0.72" cy="0.1" r="0.7"><stop offset="0" stop-color="${ACCENT}" stop-opacity="0.22"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/></radialGradient>
  <radialGradient id="tileGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${ACCENT_2}" stop-opacity="0.16"/><stop offset="1" stop-color="${ACCENT_2}" stop-opacity="0"/></radialGradient>
  <radialGradient id="fade" cx="0" cy="0.5" r="0.8"><stop offset="0.1" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity="0.07"/></pattern>
  <mask id="gridMask"><rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#fade)"/></mask>
</defs>
<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${BG}"/>
<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glow)"/>
<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#grid)" mask="url(#gridMask)" opacity="0.5"/>
<svg x="80" y="96" width="56" height="54" viewBox="0 0 35 34">${LOGO_MARK}</svg>
<text x="152" y="134" font-family="${SEMIBOLD}" font-size="30" letter-spacing="-0.6" fill="${FG}">useAnimations</text>
<text font-family="${SEMIBOLD}" font-size="${size}" letter-spacing="${(-size * 0.04).toFixed(1)}" fill="${FG}">${lines
    .map(
      (line, i) =>
        `<tspan x="76" y="${(baseline + i * lineHeight).toFixed(1)}">${escape(line)}</tspan>`
    )
    .join('')}</text>
<text x="80" y="${(baseline + (lines.length - 1) * lineHeight + 64).toFixed(1)}" font-family="${REGULAR}" font-size="26" fill="${MUTED}">${escape(tagline)}</text>
<text x="80" y="540" font-family="${REGULAR}" font-size="22" fill="${SUBTLE}">${escape(`${host}/icons/${icon.id}`)}</text>
<rect x="${tile.x - 80}" y="${tile.y - 80}" width="${tile.size + 160}" height="${tile.size + 160}" fill="url(#tileGlow)"/>
<rect x="${tile.x}" y="${tile.y}" width="${tile.size}" height="${tile.size}" rx="64" fill="${SURFACE}" stroke="#fff" stroke-opacity="0.13" stroke-width="2"/>
${drawing(icon, tile.x + 80, tile.y + 80, tile.size - 160)}
</svg>`;
};

export const ogPng = (icon: Icon): Uint8Array<ArrayBuffer> =>
  new Uint8Array(
    new Resvg(ogSvg(icon), {
      font: { fontFiles: fontFiles(), loadSystemFonts: false, defaultFontFamily: REGULAR },
    })
      .render()
      .asPng()
  );
