import type { GetStaticPaths } from 'astro';
import { type Locale, TRANSLATED } from '../i18n';
import { text } from '../lib/http';
import { localeEntries, urlset } from '../lib/sitemap';

// One sitemap per translated language, so Search Console reports indexing per language.
export const getStaticPaths = (() =>
  TRANSLATED.map((locale) => ({
    params: { locale: locale.code },
    props: { locale },
  }))) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { locale: Locale } }) =>
  text(urlset(localeEntries(props.locale)), 'application/xml');
