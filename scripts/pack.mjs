import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync } from 'node:fs';

const source = JSON.parse(readFileSync('package.json', 'utf8'));
const pkg = JSON.parse(readFileSync('dist/package.json', 'utf8'));
const icons = readdirSync('src/lib', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const extensions = ['js', 'mjs', 'd.ts', 'd.mts'];
const expected = new Set([
  'package.json',
  'README.md',
  'LICENSE',
  ...extensions.map((extension) => `index.${extension}`),
  ...icons.flatMap((icon) => extensions.map((extension) => `lib/${icon}/index.${extension}`)),
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
);
const actual = new Set(packed.files.map((file) => file.path));
const missing = [...expected].filter((file) => !actual.has(file));
const unexpected = [...actual].filter((file) => !expected.has(file));
if (missing.length || unexpected.length) {
  throw new Error(`Invalid npm package contents: ${JSON.stringify({ missing, unexpected })}`);
}

console.log(
  `Verified ${packed.filename}: ${icons.length} icons, ${actual.size} files, ${packed.size} bytes.`
);
