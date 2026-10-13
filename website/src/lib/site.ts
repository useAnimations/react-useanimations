import { type Locale, localize, t } from '../i18n';

export const GITHUB = 'https://github.com/useAnimations/react-useanimations';
export const NPM = 'https://www.npmjs.com/package/react-useanimations';

/** The site's URL unless SITE_URL sets another one. */
export const DEFAULT_SITE = 'https://useanimations.com';

/**
 * The documentation writes its file and registry URLs for useanimations.com; a build for another
 * SITE_URL points them at itself. Only URLs with a path change: a bare https://useanimations.com
 * (e.g. the attribution link) stays the brand's homepage.
 */
export const withSite = (text: string, site: string) =>
  text.replaceAll(`${DEFAULT_SITE}/`, `${site.replace(/\/$/, '')}/`);

/** The main navigation in a language. */
export const nav = (l: Locale) => {
  const m = t(l).common.nav;
  return [
    { label: m.icons, href: localize('/#icons', l) },
    { label: m.categories, href: localize('/categories', l) },
    { label: m.documentation, href: localize('/documentation', l) },
    { label: m.shadcn, href: localize('/shadcn-animated-icons', l) },
    { label: m.lottie, href: localize('/lottie-icons', l) },
    { label: m.license, href: localize('/licencing-and-terms', l) },
  ];
};

/** The footer's link columns in a language. */
export const footer = (l: Locale) => {
  const m = t(l).common.footer;
  return [
    {
      title: m.product,
      links: [
        { label: m.allIcons, href: localize('/icons', l) },
        { label: m.categories, href: localize('/categories', l) },
        { label: m.interactions, href: localize('/interactions', l) },
        { label: m.lottieIcons, href: localize('/lottie-icons', l) },
        { label: m.shadcnIcons, href: localize('/shadcn-animated-icons', l) },
        { label: m.documentation, href: localize('/documentation', l) },
        { label: m.licencing, href: localize('/licencing-and-terms', l) },
      ],
    },
    {
      title: m.developers,
      links: [
        { label: 'react-useanimations', href: NPM },
        { label: 'GitHub', href: GITHUB },
        { label: m.shadcnRegistry, href: '/r/registry.json' },
        { label: 'icons.json', href: '/icons.json' },
        { label: 'llms.txt', href: '/llms.txt' },
      ],
    },
    {
      title: m.follow,
      links: [
        { label: 'X (Twitter)', href: 'https://twitter.com/useAnimations/' },
        { label: 'Instagram', href: 'https://www.instagram.com/getuseanimations/' },
        { label: 'Facebook', href: 'https://www.facebook.com/useanimations/' },
      ],
    },
  ];
};
