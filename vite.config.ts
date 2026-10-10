import { defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';

export default defineConfig({
  // vp check: oxfmt, oxlint and type checking (TypeScript 7 through tsgolint).
  fmt: {
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'es5',
    sortPackageJson: false,
    ignorePatterns: ['icons/**', 'package-lock.json'],
  },
  lint: {
    plugins: ['typescript', 'unicorn', 'oxc', 'react'],
    categories: { correctness: 'error', suspicious: 'error' },
    rules: {
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'error',
      'react/refs': 'error',
      'react/set-state-in-effect': 'error',
      'react/set-state-in-render': 'error',
      'react/purity': 'error',
      'react/immutability': 'error',
      // JSX uses the automatic runtime (tsconfig "jsx": "react-jsx").
      'react/react-in-jsx-scope': 'off',
      // The player reads Lottie JSON and the scripts read JSON files: both are typed by assertion.
      'typescript/no-unsafe-type-assertion': 'off',
    },
    ignorePatterns: ['dist'],
    options: { typeAware: true, typeCheck: true },
  },

  // vp test: Chromium, Firefox and WebKit through Playwright, plus server rendering in Node.
  test: {
    projects: [
      {
        test: {
          name: 'browser',
          include: ['test/**/*.test.tsx'],
          exclude: ['test/ssr.test.tsx'],
          setupFiles: ['test/setup.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }],
          },
        },
      },
      {
        test: { name: 'node', include: ['test/ssr.test.tsx'], environment: 'node' },
      },
    ],
  },

  // vp pack: the component. scripts/prepare-dist.ts adds the icon modules and package.json.
  pack: {
    entry: { index: 'src/index.tsx' },
    format: ['cjs', 'esm'],
    target: 'es2020',
    platform: 'neutral',
    // Keep `exports.default` in the CommonJS build, matching its `export default` declaration.
    cjsDefault: false,
    outExtensions: ({ format }) =>
      format === 'es' ? { js: '.mjs', dts: '.d.mts' } : { js: '.js', dts: '.d.ts' },
    // Declarations come from oxc: the exports have explicit types (isolatedDeclarations).
    dts: { generator: 'oxc' },
    // The component uses hooks and the DOM; mark it as a client component for React Server Components.
    banner: { js: "'use client';" },
  },
});
