import { icons, SITE } from '../lib/icons';
import { text } from '../lib/http';
import { seoLint } from '../lib/seo';

// Duplicate or over-long icon titles and descriptions, logged once per build.
const issues = seoLint();
console.warn(
  issues.length
    ? `seoLint: ${issues.length} issue(s)\n${issues.map((i) => `  ${i.kind} [${i.ids.join(', ')}] (${i.value.length}) ${i.value}`).join('\n')}`
    : 'seoLint: no duplicate or over-long icon titles and descriptions'
);

const pages = [
  '/',
  '/documentation',
  '/licencing-and-terms',
  '/zh',
  ...icons.map((icon) => `/icons/${icon.id}`),
];

export const GET = () =>
  text(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join('\n')}
</urlset>
`,
    'application/xml'
  );
