import { text } from '../lib/http';
import { seoLint } from '../lib/seo';
import { hubEntries, iconEntries, pageEntries, sitemapIndex } from '../lib/sitemap';

// Duplicate or over-long icon titles and descriptions, logged once per build.
const issues = seoLint();
console.warn(
  issues.length
    ? `seoLint: ${issues.length} issue(s)\n${issues.map((i) => `  ${i.kind} [${i.ids.join(', ')}] (${i.value.length}) ${i.value}`).join('\n')}`
    : 'seoLint: no duplicate or over-long icon titles and descriptions'
);

export const GET = () =>
  text(
    sitemapIndex([
      { path: '/sitemap-pages.xml', entries: pageEntries() },
      { path: '/sitemap-hubs.xml', entries: hubEntries() },
      { path: '/sitemap-icons.xml', entries: iconEntries() },
    ]),
    'application/xml'
  );
