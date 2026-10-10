import { defineConfig, type UserConfig } from 'tsdown';

const shared: UserConfig = {
  format: ['cjs', 'esm'],
  target: 'es2020',
  platform: 'neutral',
  // `prebuild` empties dist/ once; both builds below write into it.
  clean: false,
  // Keep `exports.default` in the CommonJS builds, matching their `export default` declarations.
  cjsDefault: false,
  outExtensions: ({ format }) =>
    format === 'es' ? { js: '.mjs', dts: '.d.mts' } : { js: '.js', dts: '.d.ts' },
};

export default defineConfig([
  {
    ...shared,
    entry: { index: 'src/index.tsx' },
    outDir: 'dist',
    // Declarations come from oxc: the exports have explicit types (isolatedDeclarations).
    dts: { generator: 'oxc' },
    // The component uses hooks and the DOM; mark it as a client component for React Server Components.
    banner: { js: "'use client';" },
  },
  {
    ...shared,
    // Each icon is a standalone module so apps only bundle the icons they import. These stay plain data
    // modules (no 'use client') so server components can import them and pass them as props.
    // Their declarations are written by scripts/prepare-dist.ts.
    entry: ['src/lib/*/index.ts'],
    logLevel: 'warn',
    outDir: 'dist/lib',
    dts: false,
    minify: true,
  },
]);
