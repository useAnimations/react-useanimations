// Writes dist/package.json and copies README/LICENSE so `npm publish ./dist` ships a complete package
// with the same import paths as before: `react-useanimations` and `react-useanimations/lib/<name>`.
import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

const entry = (base) => ({
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
  author: pkg.author,
  sideEffects: false,
  main: './index.js',
  module: './index.mjs',
  types: './index.d.ts',
  exports: {
    '.': entry('./index'),
    './lib/*': entry('./lib/*/index'),
    './package.json': './package.json',
  },
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
};

// Every icon module has the same type, so its declarations are written here instead of by tsup.
for (const key of readdirSync('dist/lib')) {
  for (const [file, index] of [
    ['index.d.ts', 'index.js'],
    ['index.d.mts', 'index.mjs'],
  ]) {
    writeFileSync(
      `dist/lib/${key}/${file}`,
      `import type { Animation } from '../../${index}';\n\ndeclare const ${key}: Animation;\n\nexport default ${key};\n`
    );
  }
}

writeFileSync('dist/package.json', `${JSON.stringify(dist, null, 2)}\n`);
copyFileSync('README.md', 'dist/README.md');
copyFileSync('LICENSE', 'dist/LICENSE');
console.log(`dist/package.json written for ${dist.name}@${dist.version}`);
