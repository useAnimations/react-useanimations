// The icon set from ../icons, with everything the site derives from it at build time.
import { Resvg } from '@resvg/resvg-js';
import { parseHTML } from 'linkedom';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Interaction } from 'react-useanimations';
import { createRenderer } from '../../../src/player/render';
import { compactSvg } from './svg';

const read = (file: string) => readFileSync(join(import.meta.env.REPO_DIR, 'icons', file), 'utf8');

/** The react-useanimations version in this repository. */
export const VERSION: string = JSON.parse(
  readFileSync(join(import.meta.env.REPO_DIR, 'package.json'), 'utf8')
).version;

/** The site's own URL, without a trailing slash (SITE_URL, see astro.config.ts). */
export const SITE: string = import.meta.env.SITE.replace(/\/$/, '');

type CatalogEntry = {
  name: string;
  id: string;
  title: string;
  category: string;
  keywords: string[];
  interaction: Interaction;
};

export type Icon = CatalogEntry & {
  /** Export name in react-useanimations/icons; differs from `name` for reserved words. */
  exportName: string;
  /** shadcn component name, e.g. AnimatedMenuV2. */
  component: string;
  /** Static SVG states, e.g. { eye: '<svg…>', 'eye-off': '<svg…>' }. */
  svgs: Record<string, string>;
  /** Lottie JSON as served at /icons/<id>.json. */
  lottie: string;
  width: number;
  height: number;
  fps: number;
  durationMs: number;
  /** lottie-web needs its full build for After Effects expressions. */
  requiresFullPlayer: boolean;
  /** The first frame, drawn by the library's renderer, so the page shows icons before any script. */
  firstFrame: string;
  /**
   * A still for static tiles: the first frame, or for icons whose first frame draws nothing
   * (loaders that start empty, checkmarks that draw in) the fullest of a few later frames.
   */
  preview: string;
};

/** The order of the sections on the site. */
export const CATEGORIES = [
  'Alerts',
  'Notifications',
  'Navigation',
  'Action',
  'Content',
  'Form',
  'Media',
  'Text editing',
  'Communication',
  'Devices',
  'Weather',
  'Maps & location',
  'Commerce',
  'Charts',
  'Development',
  'Design & layout',
  'Shapes & math',
  'Loading',
  'Social media',
  'Other',
];

export const INTERACTIONS: Record<
  Interaction,
  { label: string; verb: string; description: string }
> = {
  loop: {
    label: 'Loop',
    verb: 'Loops',
    description:
      'Plays continuously; stays on the static first frame when reduced motion is preferred.',
  },
  'click-toggle': {
    label: 'Click toggle',
    verb: 'Click',
    description:
      'Toggles between two states on click, or switches immediately when reduced motion is preferred.',
  },
  'click-replay': {
    label: 'Click replay',
    verb: 'Click',
    description: 'Replays once from the start on every click unless reduced motion is preferred.',
  },
  hover: {
    label: 'Hover',
    verb: 'Hover',
    description: 'Plays forward on mouseenter and backward on mouseleave.',
  },
  'hover-replay': {
    label: 'Hover replay',
    verb: 'Hover',
    description:
      'Plays once on mouseenter unless reduced motion is preferred. Leaving does not stop it; entering during playback does not restart it.',
  },
  'hover-loop': {
    label: 'Hover loop',
    verb: 'Hover',
    description:
      'Loops while hovered, finishes the current cycle after mouseleave and stays static when reduced motion is preferred.',
  },
};

const RESERVED = new Set(['delete', 'package']);
const pascal = (id: string) =>
  id
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');

const hasExpressions = (value: unknown): boolean =>
  Array.isArray(value)
    ? value.some(hasExpressions)
    : !!value &&
      typeof value === 'object' &&
      Object.entries(value).some(
        ([key, v]) => (key === 'x' && typeof v === 'string') || hasExpressions(v)
      );

const { document } = parseHTML('<!doctype html><html><body></body></html>');

/** Frames of the animation at `progress` (0–1 each), drawn by the library's renderer. */
const framesAt = (id: string, data: { fr: number; ip: number; op: number }, progress: number[]) => {
  const previous = (globalThis as { document?: unknown }).document;
  (globalThis as { document?: unknown }).document = document;
  try {
    const { svg, render } = createRenderer(data as never, { frameRate: data.fr, warn: () => {} });
    return progress.map((p) => {
      render(data.ip + (data.op - 1 - data.ip) * p);
      // Element ids must stay unique next to the live players on the same page, and the same
      // between builds: the renderer's prefix is random ('__ua<random>_').
      return compactSvg(svg.outerHTML.replace(/__ua[a-z0-9]*_/g, `__uas_${id}_`));
    });
  } finally {
    (globalThis as { document?: unknown }).document = previous;
  }
};

/** How many pixels a drawing paints at 48 px (trimmed or transparent frames paint none). */
const painted = (svg: string) => {
  const markup = svg
    .replace(/^(<svg[^>]*?)\s*\/>$/, '$1></svg>')
    .replace(/^<svg(?![^>]*xmlns=)/, '<svg xmlns="http://www.w3.org/2000/svg"');
  const { pixels } = new Resvg(markup, {
    fitTo: { mode: 'width', value: 48 },
    font: { loadSystemFonts: false },
  }).render();
  let count = 0;
  for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) count += 1;
  return count;
};

const LATER = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

const stills = (id: string, data: { fr: number; ip: number; op: number }) => {
  const [first] = framesAt(id, data, [0]);
  if (painted(first) > 20) return { firstFrame: first, preview: first };
  const later = framesAt(id, data, LATER).map((svg) => ({ svg, count: painted(svg) }));
  const fullest = later.reduce((best, frame) => (frame.count > best.count ? frame : best));
  return { firstFrame: first, preview: fullest.count > 20 ? fullest.svg : first };
};

const load = (): Icon[] => {
  const catalog: CatalogEntry[] = JSON.parse(read('catalog.json'));
  const svgs: Record<string, Record<string, string>> = JSON.parse(read('svg.json'));
  const order = (icon: CatalogEntry) => CATEGORIES.indexOf(icon.category);
  return catalog
    .toSorted((a, b) => order(a) - order(b) || a.title.localeCompare(b.title))
    .map((entry) => {
      const lottie = read(`${entry.name}.json`);
      const data = JSON.parse(lottie);
      return {
        ...entry,
        exportName: RESERVED.has(entry.name) ? `${entry.name}Icon` : entry.name,
        component: `Animated${pascal(entry.id)}`,
        svgs: svgs[entry.name] ?? {},
        lottie,
        width: data.w,
        height: data.h,
        fps: data.fr,
        durationMs: Math.round(((data.op - data.ip) / data.fr) * 1000),
        requiresFullPlayer: hasExpressions(data.layers),
        ...stills(entry.id, data),
      };
    });
};

export const icons: Icon[] = load();

export const iconById = new Map(icons.map((icon) => [icon.id, icon]));

export const libImport = (icon: Icon) =>
  `import ${icon.exportName} from 'react-useanimations/lib/${icon.name}';`;

export const urls = (icon: Icon) => ({
  page: `${SITE}/icons/${icon.id}`,
  lottie: `${SITE}/icons/${icon.id}.json`,
  zip: `${SITE}/icons/${icon.id}.zip`,
  svg: Object.keys(icon.svgs).map((state) => `${SITE}/icons/${icon.id}/${state}.svg`),
  registry: `${SITE}/r/${icon.id}.json`,
  markdown: `${SITE}/icons/${icon.id}.md`,
  og: `${SITE}/og/icons/${icon.id}.png`,
});

export const shadcnCommand = (icon: Icon) => `npx shadcn@latest add ${urls(icon).registry}`;

// Ready-to-use lottie-web code for each interaction; `el` is the container element.
const SNIPPETS: Record<Interaction, string> = {
  loop: "const a = lottie.loadAnimation({ container: el, renderer: 'svg', loop: true, autoplay: false, path: '{lottie}' });\nconst motion = matchMedia('(prefers-reduced-motion: reduce)');\na.addEventListener('DOMLoaded', () => { a.goToAndStop(0, true); if (!motion.matches) a.play(); });\nmotion.addEventListener('change', (event) => { if (event.matches) a.goToAndStop(0, true); else a.play(); });",
  'click-toggle':
    "const a = lottie.loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}' });\nconst motion = matchMedia('(prefers-reduced-motion: reduce)');\nlet isOn = true; // Frame 0 is on; the final frame is off.\nel.addEventListener('click', () => { isOn = !isOn; if (motion.matches) a.goToAndStop(isOn ? 0 : a.totalFrames - 1, true); else { a.setDirection(isOn ? -1 : 1); a.play(); } });",
  'click-replay':
    "const a = lottie.loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}' });\nconst motion = matchMedia('(prefers-reduced-motion: reduce)');\nel.addEventListener('click', () => { if (!motion.matches) a.playSegments([0, a.totalFrames], true); });",
  hover:
    "const a = lottie.loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}' });\nel.addEventListener('mouseenter', () => { a.setDirection(1); a.play(); });\nel.addEventListener('mouseleave', () => { a.setDirection(-1); a.play(); });",
  'hover-replay':
    "const a = lottie.loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}' });\nconst motion = matchMedia('(prefers-reduced-motion: reduce)');\nel.addEventListener('mouseenter', () => { if (!motion.matches && a.isPaused) a.playSegments([0, a.totalFrames], true); });",
  'hover-loop':
    "const a = lottie.loadAnimation({ container: el, renderer: 'svg', loop: true, autoplay: false, path: '{lottie}' });\nconst motion = matchMedia('(prefers-reduced-motion: reduce)');\nlet stopAfterCycle = false;\na.addEventListener('loopComplete', () => { if (stopAfterCycle) { stopAfterCycle = false; a.goToAndStop(0, true); } });\nel.addEventListener('mouseenter', () => { stopAfterCycle = false; if (!motion.matches) a.play(); });\nel.addEventListener('mouseleave', () => { stopAfterCycle = !motion.matches && !a.isPaused; if (!stopAfterCycle) a.goToAndStop(0, true); });",
};

export const lottieSnippet = (icon: Icon) =>
  SNIPPETS[icon.interaction].replace('{lottie}', urls(icon).lottie);

/** The lottie-web version the HTML example loads from a CDN. */
export const LOTTIE_WEB_VERSION = '5.13.0';

/** A complete HTML page fragment: a container, lottie-web from a CDN and the interaction code. */
export const htmlLottieExample = (icon: Icon) => {
  // The light build has no expression support; icons with expressions need the full player.
  const build = icon.requiresFullPlayer ? 'lottie.min.js' : 'lottie_light.min.js';
  return `<div id="${icon.id}-icon" style="width: 48px; height: 48px"></div>

<script src="https://cdn.jsdelivr.net/npm/lottie-web@${LOTTIE_WEB_VERSION}/build/player/${build}"></script>
<script>
  const el = document.getElementById('${icon.id}-icon');
  ${lottieSnippet(icon).replaceAll('\n', '\n  ')}
</script>`;
};

/** Minimal native examples that load the Lottie JSON from its URL. */
export const mobileExamples = (icon: Icon) => {
  const url = urls(icon).lottie;
  const loop = icon.interaction === 'loop';
  return [
    {
      name: 'React Native',
      lang: 'tsx',
      code: `import LottieView from 'lottie-react-native';

<LottieView source={{ uri: '${url}' }} autoPlay${loop ? ' loop' : ' loop={false}'} style={{ width: 48, height: 48 }} />`,
    },
    {
      name: 'iOS (SwiftUI)',
      lang: 'swift',
      code: `import Lottie

LottieView {
  await LottieAnimation.loadedFrom(url: URL(string: "${url}")!)
}
.playing(loopMode: ${loop ? '.loop' : '.playOnce'})
.frame(width: 48, height: 48)`,
    },
    {
      name: 'Android (Compose)',
      lang: 'kotlin',
      code: `val composition by rememberLottieComposition(LottieCompositionSpec.Url("${url}"))
LottieAnimation(composition, iterations = ${loop ? 'LottieConstants.IterateForever' : '1'}, modifier = Modifier.size(48.dp))`,
    },
    {
      name: 'Flutter',
      lang: 'dart',
      code: `import 'package:lottie/lottie.dart';

Lottie.network('${url}', width: 48, height: 48, repeat: ${loop})`,
    },
  ];
};

/** <img> tags for the static SVGs. */
export const svgImgExample = (icon: Icon) =>
  Object.keys(icon.svgs)
    .map(
      (state) =>
        `<img src="${SITE}/icons/${icon.id}/${state}.svg" alt="${icon.title}" width="24" height="24" />`
    )
    .join('\n');

/** Keywords plus everything else a search should match. */
export const searchText = (icon: Icon) =>
  [icon.title, icon.name, icon.id, icon.category, ...icon.keywords].join(' ').toLowerCase();

/** The files of an icon, as listed on the site. */
export const filesExample = (id: string) => `${SITE}/icons/${id}.json  # Lottie JSON
${SITE}/icons/${id}.zip   # Lottie JSON + static SVGs`;

export const reactExample = (
  exportName: string,
  name: string
) => `import UseAnimations from 'react-useanimations';
import ${exportName} from 'react-useanimations/lib/${name}';

<UseAnimations animation={${exportName}} size={32} />`;

export const shadcnExample = (
  id: string,
  component: string
) => `import { ${component} } from '@/components/animations/${id}';

<${component} size={24} />`;
