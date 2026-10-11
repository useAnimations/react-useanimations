// Completes dist/ after `vp pack` built the component, so `npm publish ./dist` ships the component and
// the whole icon set (also what useanimations.com is built from):
//   react-useanimations               the component (built by vp pack)
//   react-useanimations/lib/<name>    one module per icon, so apps bundle only what they import
//   react-useanimations/icons         every icon as a named export
//   react-useanimations/catalog.json  metadata of every icon, without the Lottie data
//   react-useanimations/svg.json      static SVGs of every icon's states
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import {
  type CatalogEntry,
  exportName,
  readCatalog,
  readIcon,
  readSvgs,
  staleFiles,
  validate,
} from './icons.ts';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const catalog = readCatalog();
validate(catalog);
const stale = staleFiles(catalog);
if (stale.length) {
  throw new Error(
    `${stale.join(', ')} out of date with icons/catalog.json: run node scripts/icons.ts`
  );
}

const svgs = readSvgs();

const libImport = (icon: CatalogEntry) =>
  `import ${exportName(icon.name)} from 'react-useanimations/lib/${icon.name}';`;

// The first static SVG, as useanimations.com serves it.
const preview = (icon: CatalogEntry) => {
  const state = Object.keys(svgs[icon.name] ?? {})[0];
  return state && `https://useanimations.com/icons/${icon.id}/${state}.svg`;
};

// A compact JavaScript literal: keys without quotes and numbers without leading zeros, like a minifier.
const literal = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(literal).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .map(
        ([key, v]) => `${/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)}:${literal(v)}`
      )
      .join(',')}}`;
  }
  if (typeof value === 'number') return String(value).replace(/^(-?)0\./, '$1.');
  return JSON.stringify(value);
};

// Shown on hover in editors, and read by coding agents, wherever the icon is imported.
const docs = (icon: CatalogEntry, importLine: string) =>
  [
    `**${icon.title}** animated icon (${icon.category}). Default interaction: \`${icon.interaction}\`.`,
    '',
    `Keywords: ${icon.keywords.join(', ')}.`,
    ...(preview(icon) ? ['', `![${icon.title}](${preview(icon)})`] : []),
    '',
    '@example',
    "import UseAnimations from 'react-useanimations';",
    importLine,
    '',
    `<UseAnimations animation={${exportName(icon.name)}} />`,
  ]
    .map((line) => ` *${line && ` ${line}`}`)
    .join('\n');

// ICON MODULES: dist/lib/<name>.{mjs,js,d.mts,d.ts}
mkdirSync('dist/lib', { recursive: true });
for (const icon of catalog) {
  const animation = {
    animationData: JSON.parse(readIcon(icon.name)),
    interaction: icon.interaction,
  };
  const value = literal(animation);
  if (JSON.stringify(runInNewContext(`(${value})`)) !== JSON.stringify(animation)) {
    throw new Error(`${icon.name}: the generated module doesn't match icons/${icon.name}.json`);
  }
  writeFileSync(`dist/lib/${icon.name}.mjs`, `export default ${value};\n`);
  writeFileSync(
    `dist/lib/${icon.name}.js`,
    `"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=${value};\n`
  );
  for (const [file, index] of [
    [`${icon.name}.d.ts`, 'index.js'],
    [`${icon.name}.d.mts`, 'index.mjs'],
  ]) {
    writeFileSync(
      `dist/lib/${file}`,
      // A fixed local name keeps reserved words like `delete` valid.
      `import type { Animation } from '../${index}';\n\n/**\n${docs(icon, libImport(icon))}\n */\ndeclare const animation: Animation;\n\nexport default animation;\n`
    );
  }
}

// EVERY ICON AS A NAMED EXPORT: dist/icons.{mjs,js,d.mts,d.ts}
writeFileSync(
  'dist/icons.mjs',
  catalog
    .map(
      (icon) => `export { default as ${exportName(icon.name)} } from './lib/${icon.name}.mjs';\n`
    )
    .join('')
);
// CommonJS loads an icon only when it is read, so require() stays cheap.
writeFileSync(
  'dist/icons.js',
  `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nObject.defineProperties(exports, {\n${catalog
    .map(
      (icon) =>
        `  ${exportName(icon.name)}: { enumerable: true, get: () => require("./lib/${icon.name}.js").default },`
    )
    .join('\n')}\n});\n`
);
for (const [file, index] of [
  ['icons.d.ts', './index.js'],
  ['icons.d.mts', './index.mjs'],
]) {
  writeFileSync(
    `dist/${file}`,
    `import type { Animation } from '${index}';\n\n${catalog
      .map(
        (icon) =>
          `/**\n${docs(icon, `import { ${exportName(icon.name)} } from 'react-useanimations/icons';`)}\n */\nexport declare const ${exportName(icon.name)}: Animation;\n`
      )
      .join('\n')}`
  );
}

// METADATA: the catalog plus what it takes to use or show each icon.
writeFileSync(
  'dist/catalog.json',
  `${JSON.stringify(
    catalog.map((icon) => ({
      ...icon,
      export: exportName(icon.name),
      import: libImport(icon),
      svg: Object.keys(svgs[icon.name] ?? {}),
      ...(preview(icon) ? { preview: preview(icon) } : {}),
    })),
    null,
    2
  )}\n`
);
copyFileSync('icons/svg.json', 'dist/svg.json');

// PACKAGE: dist/package.json, README and LICENSE.
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
  files: [
    ...['index', 'icons'].flatMap((base) =>
      ['js', 'mjs', 'd.ts', 'd.mts'].map((ext) => `${base}.${ext}`)
    ),
    'catalog.json',
    'svg.json',
    'lib',
  ],
  publishConfig: { access: 'public', registry: 'https://registry.npmjs.org/' },
  main: './index.js',
  module: './index.mjs',
  types: './index.d.ts',
  exports: {
    '.': entry('./index'),
    './icons': entry('./icons'),
    './lib/*': entry('./lib/*'),
    './catalog.json': './catalog.json',
    './svg.json': './svg.json',
    './package.json': './package.json',
  },
  peerDependencies: pkg.peerDependencies,
};

writeFileSync('dist/package.json', `${JSON.stringify(dist, null, 2)}\n`);
copyFileSync('README.md', 'dist/README.md');
copyFileSync('LICENSE', 'dist/LICENSE');
console.log(`dist/ completed for ${dist.name}@${dist.version}: ${catalog.length} icons`);
