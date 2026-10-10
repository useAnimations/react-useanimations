import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
});
