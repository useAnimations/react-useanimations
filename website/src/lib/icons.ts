// The icon set from ../icons, with everything the site derives from it at build time.
import { parseHTML } from 'linkedom';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Interaction } from 'react-useanimations';
import { createRenderer } from '../../../src/player/render';

const read = (file: string) => readFileSync(join(import.meta.env.REPO_DIR, 'icons', file), 'utf8');

/** The react-useanimations version in this repository. */
export const VERSION: string = JSON.parse(
  readFileSync(join(import.meta.env.REPO_DIR, 'package.json'), 'utf8')
).version;

export const SITE = 'https://useanimations.com';

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

const firstFrame = (id: string, data: { fr: number; ip: number }) => {
  const previous = (globalThis as { document?: unknown }).document;
  (globalThis as { document?: unknown }).document = document;
  try {
    const { svg, render } = createRenderer(data as never, { frameRate: data.fr, warn: () => {} });
    render(data.ip);
    // Element ids must stay unique next to the live players on the same page.
    return svg.outerHTML.replaceAll('__ua_', `__uas_${id}_`);
  } finally {
    (globalThis as { document?: unknown }).document = previous;
  }
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
        firstFrame: firstFrame(entry.id, data),
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

/** Keywords plus everything else a search should match. */
export const searchText = (icon: Icon) =>
  [icon.title, icon.name, icon.id, icon.category, ...icon.keywords].join(' ').toLowerCase();

// The same lottie-web code, formatted to read: `el` is the element the icon renders into.
const READABLE: Record<Interaction, string> = {
  loop: `const animation = lottie.loadAnimation({
  container: el, renderer: 'svg', loop: true, autoplay: true, path: '{lottie}',
});`,
  'click-toggle': `const animation = lottie.loadAnimation({
  container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}',
});
let direction = 1;
el.addEventListener('click', () => {
  animation.setDirection(direction);
  animation.play();
  direction = -direction;
});`,
  'click-replay': `const animation = lottie.loadAnimation({
  container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}',
});
el.addEventListener('click', () => animation.playSegments([0, animation.totalFrames], true));`,
  hover: `const animation = lottie.loadAnimation({
  container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}',
});
el.addEventListener('mouseenter', () => { animation.setDirection(1); animation.play(); });
el.addEventListener('mouseleave', () => { animation.setDirection(-1); animation.play(); });`,
  'hover-replay': `const animation = lottie.loadAnimation({
  container: el, renderer: 'svg', loop: false, autoplay: false, path: '{lottie}',
});
el.addEventListener('mouseenter', () => {
  if (animation.isPaused) animation.playSegments([0, animation.totalFrames], true);
});`,
  'hover-loop': `const animation = lottie.loadAnimation({
  container: el, renderer: 'svg', loop: true, autoplay: false, path: '{lottie}',
});
el.addEventListener('mouseenter', () => animation.play());
el.addEventListener('mouseleave', () => animation.goToAndStop(0, true));`,
};

/** A complete HTML page fragment that plays the icon with lottie-web. */
export const htmlExample = (
  interaction: Interaction,
  lottie: string,
  fullPlayer: boolean
) => `<div id="icon" style="width: 32px; height: 32px"></div>
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/${fullPlayer ? 'lottie' : 'lottie_light'}.min.js"></script>
<script>
const el = document.getElementById('icon');
${READABLE[interaction].replace('{lottie}', lottie)}
</script>`;

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
