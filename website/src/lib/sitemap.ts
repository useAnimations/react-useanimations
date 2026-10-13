// The sitemaps: an index (sitemap.xml) of sitemaps for the pages, the collection hubs, the icon
// pages and one per translated language. Translated pages list every language version as
// xhtml:link alternates. Dates come from Git (lib/git.ts) and are left out when unknown, never the
// build time.
import { alternatesOf, type Locale, localize } from '../i18n';
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

const VIEWS = 'website/src/views';
const MESSAGES = 'website/src/i18n/messages';

/** The English pages; all of them are translated. */
export const pageEntries = (): Entry[] =>
  [
    {
      path: '/',
      sources: [
        `${PAGES}/index.astro`,
        `${VIEWS}/HomePage.astro`,
        'website/src/lib/home.ts',
        `${MESSAGES}/en/`,
        CATALOG,
      ],
    },
    {
      path: '/documentation',
      sources: [
        `${PAGES}/documentation.astro`,
        `${VIEWS}/DocumentationPage.astro`,
        'website/src/content/documentation.md',
      ],
    },
    {
      path: '/licencing-and-terms',
      sources: [`${PAGES}/licencing-and-terms.astro`, `${VIEWS}/LicencePage.astro`, 'LICENSE'],
    },
  ].map((entry) => ({ ...entry, alternates: alternatesOf(entry.path) }));

/** Collection pages, all translated; categories that aren't indexable (e.g. Other) stay out. */
export const hubEntries = (): Entry[] =>
  [
    ...['/icons', '/categories', '/interactions', '/lottie-icons', '/shadcn-animated-icons'].map(
      (path) => ({ path, sources: [...pageFiles(path), `${VIEWS}/`, CATALOG] })
    ),
    ...Object.values(CATEGORY_META)
      .filter((meta) => meta.indexable)
      .map((meta) => ({
        path: `/categories/${meta.slug}`,
        sources: [`${PAGES}/categories/`, `${VIEWS}/CategoryPage.astro`, TAXONOMY, CATALOG],
      })),
    ...Object.values(INTERACTION_META).map((meta) => ({
      path: `/interactions/${meta.slug}`,
      sources: [`${PAGES}/interactions/`, `${VIEWS}/InteractionPage.astro`, TAXONOMY, CATALOG],
    })),
  ].map((entry) => ({ ...entry, alternates: alternatesOf(entry.path) }));

/**
 * The pages and hubs in a translated language, dated by the English sources (layout and data) and
 * the language's own messages and documentation.
 */
export const localeEntries = (l: Locale): Entry[] =>
  [...pageEntries(), ...hubEntries()].map((entry) => ({
    ...entry,
    path: localize(entry.path, l),
    sources: [
      ...entry.sources,
      `${MESSAGES}/${l.code}/`,
      ...(entry.path === '/documentation'
        ? [`website/src/content/documentation.${l.code}.md`]
        : []),
    ],
  }));

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
