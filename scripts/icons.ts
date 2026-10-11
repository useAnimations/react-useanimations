// The icon set, the source of truth for the npm package and for useanimations.com:
//   icons/<name>.json   Lottie animation
//   icons/svg.json      static SVGs of each icon's states, e.g. { "visibility": { "eye": "<svg…>", … } }
//   icons/catalog.json  metadata
//
//   node scripts/icons.ts   # validates the set, normalizes new Lottie files, updates derived files
//
// To add an icon: put its Lottie file in icons/ and run the command above. A Lottie file that is not
// in catalog.json yet gets a starter entry (category Other, interaction hover-replay); refine its title,
// category, keywords and interaction there, and add its SVGs to svg.json if it has static states.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export type CatalogEntry = {
  /** Import name: `react-useanimations/lib/<name>`. */
  name: string;
  /** URL slug on useanimations.com. */
  id: string;
  title: string;
  category: string;
  keywords: string[];
  interaction: string;
};

export const root: string = join(import.meta.dirname, '..');
const iconsDir = join(root, 'icons');
const catalogPath = join(iconsDir, 'catalog.json');
const svgPath = join(iconsDir, 'svg.json');

const INTERACTIONS = new Set([
  'loop',
  'click-toggle',
  'click-replay',
  'hover',
  'hover-loop',
  'hover-replay',
]);

// Reserved words can't be variable names, so these icons are exported as `deleteIcon` and
// `packageIcon` from `react-useanimations/icons`.
const RESERVED = new Set(['delete', 'package']);
export const exportName = (name: string): string => (RESERVED.has(name) ? `${name}Icon` : name);

export const readCatalog = (): CatalogEntry[] => JSON.parse(readFileSync(catalogPath, 'utf8'));

export const readSvgs = (): Record<string, Record<string, string>> =>
  JSON.parse(readFileSync(svgPath, 'utf8'));

export const readIcon = (name: string): string =>
  readFileSync(join(iconsDir, `${name}.json`), 'utf8');

const SVG = /^(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>][\s\S]*<\/svg>$/;

/** Throws when the catalog, the Lottie files and the SVGs disagree. */
export const validate = (catalog: CatalogEntry[]): void => {
  const problems: string[] = [];
  const names = new Set<string>();
  const ids = new Set<string>();
  const files = new Set(readdirSync(iconsDir));
  for (const icon of catalog) {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(icon.name)) problems.push(`${icon.name}: invalid name`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(icon.id)) problems.push(`${icon.name}: invalid id`);
    if (names.has(icon.name)) problems.push(`${icon.name}: duplicate name`);
    if (ids.has(icon.id)) problems.push(`${icon.name}: duplicate id ${icon.id}`);
    if (!INTERACTIONS.has(icon.interaction)) {
      problems.push(`${icon.name}: unknown interaction ${icon.interaction}`);
    }
    if (!icon.title || !icon.category || !icon.keywords?.length) {
      problems.push(`${icon.name}: needs a title, a category and keywords`);
    }
    if (!files.has(`${icon.name}.json`)) problems.push(`${icon.name}: no icons/${icon.name}.json`);
    names.add(icon.name);
    ids.add(icon.id);
  }
  for (const file of files) {
    if (file === 'catalog.json' || file === 'svg.json') continue;
    if (!names.has(file.replace(/\.json$/, '')))
      problems.push(`icons/${file}: not in catalog.json`);
  }
  for (const [name, states] of Object.entries(readSvgs())) {
    if (!names.has(name)) problems.push(`svg.json: ${name} is not in catalog.json`);
    for (const [state, svg] of Object.entries(states)) {
      if (!/^[a-z0-9-]+$/.test(state)) problems.push(`svg.json: ${name}/${state}: invalid name`);
      if (!SVG.test(svg)) problems.push(`svg.json: ${name}/${state} is not an SVG`);
    }
  }
  if (problems.length) throw new Error(`Invalid icon set:\n  ${problems.join('\n  ')}`);
};

// LOTTIE FILES: minified, without metadata that no player needs: names, match names, property
// indexes for expressions (the supported ones don't use them) and `hd: false`. The root name stays.
const METADATA = new Set(['nm', 'mn', 'ix', 'cix', 'np']);
const strip = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(strip);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, v]) => !METADATA.has(key) && !(key === 'hd' && v === false))
      .map(([key, v]) => [key, strip(v)])
  );
};
const normalize = (text: string) => {
  const { nm, ...data } = JSON.parse(text);
  return JSON.stringify({ nm, ...(strip(data) as object) });
};

// FILES DERIVED FROM THE SET: the AnimationKey type and the README icon list.
const derived = (catalog: CatalogEntry[]) => {
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const list = catalog.map(({ name }) => `\`${name}\``).join(', ');
  return {
    'src/icons.ts': `// Generated from icons/catalog.json by scripts/icons.ts. Do not edit by hand.

/** Name of an icon in \`react-useanimations/lib/<name>\`. */
export type AnimationKey =
${catalog.map(({ name }) => `  | '${name}'`).join('\n')};
`,
    'README.md': readme.replace(
      /(<!-- icons:start -->)[\s\S]*?(<!-- icons:end -->)/,
      `$1\n\n${list}\n$2`
    ),
  };
};

/** Starter catalog entries for the Lottie files in icons/ that the catalog does not list yet. */
export const scaffold = (catalog: CatalogEntry[]): CatalogEntry[] => {
  const known = new Set(catalog.map(({ name }) => name));
  return readdirSync(iconsDir)
    .filter((file) => file.endsWith('.json') && !['catalog.json', 'svg.json'].includes(file))
    .map((file) => file.replace(/\.json$/, ''))
    .filter((name) => !known.has(name))
    .map((name) => {
      const words = name
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .split(' ');
      const title = words.join(' ');
      return {
        name,
        id: words.join('-'),
        title: title[0].toUpperCase() + title.slice(1),
        category: 'Other',
        keywords: [...new Set([...words, 'other'])].toSorted(),
        interaction: 'hover-replay',
      };
    });
};

/** Files that need `node scripts/icons.ts`. */
export const staleFiles = (catalog: CatalogEntry[]): string[] => [
  ...catalog
    .filter((icon) => normalize(readIcon(icon.name)) !== readIcon(icon.name))
    .map((icon) => `icons/${icon.name}.json`),
  ...Object.entries(derived(catalog))
    .filter(([file, content]) => readFileSync(join(root, file), 'utf8') !== content)
    .map(([file]) => file),
];

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const added = scaffold(readCatalog());
  for (const icon of added) {
    console.log(
      `  added ${icon.name} to icons/catalog.json (category ${icon.category}); refine it`
    );
  }
  const catalog = [...readCatalog(), ...added].toSorted((a, b) => a.name.localeCompare(b.name));
  validate(catalog);
  writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
  for (const icon of catalog) {
    const path = join(iconsDir, `${icon.name}.json`);
    const text = readFileSync(path, 'utf8');
    if (normalize(text) !== text) {
      writeFileSync(path, normalize(text));
      console.log(`  normalized icons/${icon.name}.json`);
    }
  }
  for (const [file, content] of Object.entries(derived(catalog))) {
    writeFileSync(join(root, file), content);
  }
  console.log(`${catalog.length} icons are valid; src/icons.ts and README.md are up to date.`);
}
