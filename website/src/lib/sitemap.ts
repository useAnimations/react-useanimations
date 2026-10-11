// The sitemaps: an index (sitemap.xml) of three sitemaps for the pages, the collection hubs and the
// icon pages. Dates come from Git (lib/git.ts) and are left out when unknown, never the build time.
import { lastModifiedOf } from './git';
import { icons, SITE, urls } from './icons';
import { CATEGORY_META, INTERACTION_META } from './taxonomy';

export type Entry = {
  path: string;
  /** Repository paths whose last commit dates the page; a trailing '/' covers a directory. */
  sources: string[];
  /** hreflang -> path, for pages with translations. */
  alternates?: Record<string, string>;
  images?: string[];
};

const PAGES = 'website/src/pages';
const CATALOG = 'icons/catalog.json';
const TAXONOMY = 'website/src/lib/taxonomy.ts';

/** Source files of a static page at `path`, whichever of the usual file names it uses. */
const pageFiles = (path: string) => [
  `${PAGES}${path}.astro`,
  `${PAGES}${path}/index.astro`,
  `${PAGES}${path}.md.ts`,
];

const LANGUAGES = { en: '/', 'zh-Hans': '/zh', 'x-default': '/' };

export const pageEntries = (): Entry[] => [
  {
    path: '/',
    sources: [`${PAGES}/index.astro`, 'website/src/lib/home.ts', CATALOG],
    alternates: LANGUAGES,
  },
  { path: '/zh', sources: [`${PAGES}/zh.astro`, CATALOG], alternates: LANGUAGES },
  {
    path: '/documentation',
    sources: [`${PAGES}/documentation.astro`, 'website/src/content/documentation.md'],
  },
  { path: '/licencing-and-terms', sources: [`${PAGES}/licencing-and-terms.astro`, 'LICENSE'] },
];

/** Collection pages; categories that aren't indexable (e.g. Other) stay out. */
export const hubEntries = (): Entry[] => [
  ...['/icons', '/categories', '/interactions', '/lottie-icons', '/shadcn-animated-icons'].map(
    (path) => ({ path, sources: [...pageFiles(path), CATALOG] })
  ),
  ...Object.values(CATEGORY_META)
    .filter((meta) => meta.indexable)
    .map((meta) => ({
      path: `/categories/${meta.slug}`,
      sources: [`${PAGES}/categories/`, TAXONOMY, CATALOG],
    })),
  ...Object.values(INTERACTION_META).map((meta) => ({
    path: `/interactions/${meta.slug}`,
    sources: [`${PAGES}/interactions/`, TAXONOMY, CATALOG],
  })),
];

/** Icon pages, with their static SVGs and social card as images. */
export const iconEntries = (): Entry[] =>
  icons.map((icon) => ({
    path: `/icons/${icon.id}`,
    sources: [`icons/${icon.name}.json`, `${PAGES}/icons/[id].astro`],
    images: [...urls(icon).svg, `${SITE}/og/icons/${icon.id}.png`],
  }));

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const lastmod = (date: string | undefined) => (date ? `<lastmod>${date}</lastmod>` : '');

export const urlset = (entries: Entry[]) => {
  const tags = entries.map((entry) => {
    const parts = [
      `<loc>${escape(SITE + entry.path)}</loc>`,
      lastmod(lastModifiedOf(entry.sources)),
      ...Object.entries(entry.alternates ?? {}).map(
        ([lang, path]) =>
          `<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(SITE + path)}"/>`
      ),
      ...(entry.images ?? []).map(
        (image) => `<image:image><image:loc>${escape(image)}</image:loc></image:image>`
      ),
    ];
    return `  <url>${parts.join('')}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${tags.join('\n')}
</urlset>
`;
};

/** The sitemap index; each sitemap is dated by its most recently changed page. */
export const sitemapIndex = (sitemaps: { path: string; entries: Entry[] }[]) => {
  const tags = sitemaps.map(({ path, entries }) => {
    const date = lastModifiedOf(entries.flatMap((entry) => entry.sources));
    return `  <sitemap><loc>${SITE}${path}</loc>${lastmod(date)}</sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tags.join('\n')}
</sitemapindex>
`;
};
