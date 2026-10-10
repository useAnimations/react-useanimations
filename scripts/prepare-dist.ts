// Writes dist/package.json and copies README/LICENSE/icons.json so `npm publish ./dist` ships a complete
// package with the same import paths as before: `react-useanimations` and `react-useanimations/lib/<name>`.
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';

type Icon = {
  name: string;
  title: string;
  category: string;
  keywords: string[];
  interaction: string;
  import: string;
  preview?: string;
};

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const icons = JSON.parse(readFileSync('src/icons.json', 'utf8')) as Icon[];

const entry = (base: string) => ({
  import: { types: `${base}.d.mts`, default: `${base}.mjs` },
  require: { types: `${base}.d.ts`, default: `${base}.js` },
});

const dist = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  keywords: pkg.keywords,
  homepage: pkg.homepage,
  bugs: pkg.bugs,
  repository: pkg.repository,
  license: pkg.license,
  sideEffects: false,
  files: ['index.js', 'index.mjs', 'index.d.ts', 'index.d.mts', 'icons.json', 'lib'],
  publishConfig: { access: 'public', registry: 'https://registry.npmjs.org/' },
  main: './index.js',
  module: './index.mjs',
  types: './index.d.ts',
  exports: {
    '.': entry('./index'),
    './lib/*': entry('./lib/*/index'),
    './icons.json': './icons.json',
    './package.json': './package.json',
  },
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
};

// Every icon module has the same type, so its declarations are written here instead of by tsdown.
// The doc comment shows up on hover in editors and tells coding agents what the icon is.
const docs = (icon: Icon) =>
  [
    `**${icon.title}** animated icon (${icon.category}). Default interaction: \`${icon.interaction}\`.`,
    '',
    `Keywords: ${icon.keywords.join(', ')}.`,
    ...(icon.preview ? ['', `![${icon.title}](${icon.preview})`] : []),
    '',
    '@example',
    "import UseAnimations from 'react-useanimations';",
    icon.import,
    '',
    `<UseAnimations animation={${icon.import.split(' ')[1]}} />`,
  ]
    .map((line) => ` *${line && ` ${line}`}`)
    .join('\n');

for (const icon of icons) {
  for (const [file, index] of [
    ['index.d.ts', 'index.js'],
    ['index.d.mts', 'index.mjs'],
  ]) {
    writeFileSync(
      `dist/lib/${icon.name}/${file}`,
      // A fixed local name keeps keys like `delete` (reserved words) valid.
      `import type { Animation } from '../../${index}';\n\n/**\n${docs(icon)}\n */\ndeclare const animation: Animation;\n\nexport default animation;\n`
    );
  }
}

writeFileSync('dist/package.json', `${JSON.stringify(dist, null, 2)}\n`);
copyFileSync('README.md', 'dist/README.md');
copyFileSync('LICENSE', 'dist/LICENSE');
copyFileSync('src/icons.json', 'dist/icons.json');
console.log(`dist/package.json written for ${dist.name}@${dist.version}`);
