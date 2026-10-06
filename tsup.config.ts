import { defineConfig, type Options } from 'tsup';

const shared: Options = {
  format: ['cjs', 'esm'],
  outDir: 'dist',
  target: 'es2020',
  splitting: false,
  sourcemap: false,
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.js' }),
};

export default defineConfig([
  {
    ...shared,
    entry: { index: 'src/index.tsx' },
    clean: true,
    dts: true,
    // The component uses hooks and the DOM; mark it as a client component for React Server Components.
    banner: { js: "'use client';" },
  },
  {
    ...shared,
    // Each icon is a standalone module so apps only bundle the icons they import. These stay plain data
    // modules (no 'use client') so server components can import them and pass them as props.
    // Their declarations are identical and written by scripts/prepare-dist.mjs.
    entry: ['src/lib/*/index.ts'],
    outDir: 'dist/lib',
  },
]);
