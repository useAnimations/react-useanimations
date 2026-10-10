import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { readCatalog } from './icons.ts';

type Manifest = Record<string, unknown> & { name: string; version: string };

const source = JSON.parse(readFileSync('package.json', 'utf8')) as Manifest;
const pkg = JSON.parse(readFileSync('dist/package.json', 'utf8')) as Manifest;
const icons = readCatalog().map((icon) => icon.name);
const extensions = ['js', 'mjs', 'd.ts', 'd.mts'];
const expected = new Set([
  'package.json',
  'README.md',
  'LICENSE',
  'catalog.json',
  'svg.json',
  ...['index', 'icons'].flatMap((base) => extensions.map((extension) => `${base}.${extension}`)),
  ...icons.flatMap((icon) => extensions.map((extension) => `lib/${icon}.${extension}`)),
]);

if (pkg.name !== source.name || pkg.version !== source.version || pkg.private) {
  throw new Error(
    'The built package must match the source package name and version and be publishable.'
  );
}
if (pkg.scripts || pkg.devDependencies || pkg.author || pkg.contributors || pkg.maintainers) {
  throw new Error('The npm package must contain only public runtime metadata.');
}

mkdirSync('.release', { recursive: true });
const [packed] = JSON.parse(
  execFileSync(
    'npm',
    ['pack', './dist', '--json', '--ignore-scripts', '--pack-destination', '.release'],
    { encoding: 'utf8' }
  )
) as { filename: string; size: number; files: { path: string }[] }[];
const actual = new Set(packed.files.map((file) => file.path));
const missing = [...expected].filter((file) => !actual.has(file));
const unexpected = [...actual].filter((file) => !expected.has(file));
if (missing.length || unexpected.length) {
  throw new Error(`Invalid npm package contents: ${JSON.stringify({ missing, unexpected })}`);
}

console.log(
  `Verified ${packed.filename}: ${icons.length} icons, ${actual.size} files, ${packed.size} bytes.`
);
