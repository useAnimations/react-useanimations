import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MarkdownHeading } from 'astro';
import { type Locale, localize } from '../i18n';
import { SITE } from './icons';
import { withSite } from './site';

/** The documentation as Markdown, without the HTML anchors that keep old links working. */
export const documentationMarkdown = () =>
  withSite(
    readFileSync(join(import.meta.env.REPO_DIR, 'website/src/content/documentation.md'), 'utf8')
      .replace(/^(<div id="[^"]+"><\/div>)+\n\n/gm, '')
      .replace(/^# Documentation/, '# useAnimations documentation'),
    SITE
  );

type MarkdownModule = {
  compiledContent: () => Promise<string>;
  getHeadings: () => MarkdownHeading[];
};

const DOCUMENTATION = import.meta.glob<MarkdownModule>('../content/documentation*.md', {
  eager: true,
});

/**
 * The documentation body in a language: content/documentation.<code>.md, or the English one until
 * that translation exists. Translated headings keep their English ids with `## Heading {#english-id}`
 * (headingAttributes in astro.config.ts), so links to /documentation#props work in every language.
 */
export const documentationIn = async (l: Locale) => {
  const file = l.prefix ? `documentation.${l.code}.md` : 'documentation.md';
  let source = DOCUMENTATION[`../content/${file}`];
  const fallback = !source;
  if (!source) {
    console.warn(
      `i18n: src/content/${file} is missing; /${l.code}/documentation shows the English body.`
    );
    source = DOCUMENTATION['../content/documentation.md'];
  }
  // The file and registry URLs point at this site (SITE_URL).
  const html = withSite(await source.compiledContent(), SITE);
  return {
    file: `website/src/content/${fallback ? 'documentation.md' : file}`,
    html: l.prefix ? localizeLinks(html, l) : html,
    headings: source.getHeadings(),
    /** The English body stands in for a missing translation. */
    fallback,
  };
};

// Site paths that have a translated version; icon pages, files and anything else stay English.
const TRANSLATED_PATH =
  /^\/(?:|documentation|licencing-and-terms|icons|lottie-icons|shadcn-animated-icons|(?:categories|interactions)(?:\/[a-z0-9-]+)?)$/;

/** Points the links of a translated body at the pages in its language: /categories -> /de/categories. */
export const localizeLinks = (html: string, l: Locale) =>
  html.replace(/href="(\/[^"#?]*)([^"]*)"/g, (link, path: string, rest: string) =>
    TRANSLATED_PATH.test(path) ? `href="${localize(path + rest, l)}"` : link
  );
