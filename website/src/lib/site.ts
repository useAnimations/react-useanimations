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

export const NAV = [
  { label: 'Icons', href: '/#icons' },
  { label: 'Categories', href: '/categories' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'shadcn', href: '/shadcn-animated-icons' },
  { label: 'Lottie icons', href: '/lottie-icons' },
  { label: 'License', href: '/licencing-and-terms' },
];

export const FOOTER = [
  {
    title: 'Product',
    links: [
      { label: 'All icons', href: '/icons' },
      { label: 'Categories', href: '/categories' },
      { label: 'Interactions', href: '/interactions' },
      { label: 'Lottie icons', href: '/lottie-icons' },
      { label: 'shadcn/ui icons', href: '/shadcn-animated-icons' },
      { label: 'Documentation', href: '/documentation' },
      { label: 'Licencing & Terms', href: '/licencing-and-terms' },
      { label: '中文', href: '/zh' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'react-useanimations', href: NPM },
      { label: 'GitHub', href: GITHUB },
      { label: 'shadcn registry', href: '/r/registry.json' },
      { label: 'icons.json', href: '/icons.json' },
      { label: 'llms.txt', href: '/llms.txt' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'X (Twitter)', href: 'https://twitter.com/useAnimations/' },
      { label: 'Instagram', href: 'https://www.instagram.com/getuseanimations/' },
      { label: 'Facebook', href: 'https://www.facebook.com/useanimations/' },
    ],
  },
];
