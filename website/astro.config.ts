import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const allowedHosts = process.env.ASTRO_ALLOWED_HOSTS?.split(',').filter(Boolean) ?? [];

export default defineConfig({
  // The site's own URL: canonical links, sitemap and the file URLs in icons.json and the registry.
  site: process.env.SITE_URL ?? 'https://useanimations.com',
  output: 'static',
  // Pages are written as documentation.html, so hosts serve /documentation without a trailing slash,
  // matching the canonical URLs and the previous site.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react()],
  markdown: {
    // The same themes as lib/highlight.ts.
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
  },
  vite: {
    // @tailwindcss/vite brings its own copy of Vite's types.
    plugins: [tailwindcss() as never],
    // Extra hostnames for the dev and preview servers, e.g. a private network name:
    // ASTRO_ALLOWED_HOSTS=my-machine.example npm run dev -w website
    server: { allowedHosts },
    preview: { allowedHosts },
    // The repository the site is built from: the icon set in icons/ and the package version.
    define: {
      'import.meta.env.REPO_DIR': JSON.stringify(fileURLToPath(new URL('../', import.meta.url))),
    },
    resolve: {
      // The site uses the library from this repository, as apps use the npm package.
      alias: { 'react-useanimations': fileURLToPath(new URL('../src/index.tsx', import.meta.url)) },
    },
  },
});
