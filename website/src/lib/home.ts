// Data shared by the home page and its Markdown version (index.md): the FAQ and the hub links.
// Their text lives in i18n/messages/<lang>/home.ts; the exports in capitals are English.
import { EN, type Locale, t } from '../i18n';
import type { FaqLinks } from '../i18n/messages/en/home';
import { icons, VERSION } from './icons';
import { CATEGORY_META, iconsByCategory, iconsByInteraction, INTERACTION_META } from './taxonomy';

const en = t(EN).home;

export const HOME_TITLE = en.title;
export const HOME_DESCRIPTION = en.description(icons.length);

/** Indexable categories with their page path and icon count, in site order. */
export const categoryLinks = () =>
  Object.values(CATEGORY_META)
    .filter((meta) => meta.indexable)
    .map((meta) => ({
      ...meta,
      href: `/categories/${meta.slug}`,
      count: iconsByCategory(meta.name).length,
    }));

/** Every interaction with its page path and icon count. */
export const interactionLinks = () =>
  Object.values(INTERACTION_META).map((meta) => ({
    ...meta,
    href: `/interactions/${meta.slug}`,
    count: iconsByInteraction(meta.interaction).length,
  }));

/** The collection pages, for "browse" link blocks; English paths, labels in the given language. */
export const hubLinks = (locale: Locale = EN) => {
  const labels = t(locale).home.hubs;
  return [
    { label: labels.icons, href: '/icons' },
    { label: labels.categories, href: '/categories' },
    { label: labels.interactions, href: '/interactions' },
    { label: labels.lottie, href: '/lottie-icons' },
    { label: labels.shadcn, href: '/shadcn-animated-icons' },
  ];
};
export const HUBS = hubLinks();

/** Pages the FAQ answers link to (English paths). */
export const FAQ_LINKS: FaqLinks = {
  serverRendering: '/documentation#nextjs-and-server-rendering',
  licence: '/licencing-and-terms',
  lottie: '/lottie-icons',
};

/** Questions and answers in a language; `link` points to the page that answers in depth. */
export const homeFaq = (locale: Locale = EN, links: FaqLinks = FAQ_LINKS) =>
  t(locale).home.faq({ version: VERSION, links });
export const HOME_FAQ = homeFaq();
