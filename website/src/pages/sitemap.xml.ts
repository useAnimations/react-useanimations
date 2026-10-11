import { icons, SITE } from '../lib/icons';
import { text } from '../lib/http';

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
