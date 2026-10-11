// Copy shared by the home page and its Markdown version (index.md): the FAQ and the hub links.
import { icons, VERSION } from './icons';
import type { Faq } from './seo';
import { CATEGORY_META, iconsByCategory, iconsByInteraction, INTERACTION_META } from './taxonomy';

export const HOME_TITLE = 'Micro Animations & Animated Icon Library — useAnimations';
export const HOME_DESCRIPTION = `${icons.length} free micro animations for UI: an animated icon library for React, shadcn/ui and Lottie with hover, click and loop built in. MIT.`;

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

/** The collection pages, for "browse" link blocks. */
export const HUBS = [
  { label: 'All animated icons', href: '/icons' },
  { label: 'Icon categories', href: '/categories' },
  { label: 'Icons by interaction', href: '/interactions' },
  { label: 'Lottie icons (JSON)', href: '/lottie-icons' },
  { label: 'shadcn/ui animated icons', href: '/shadcn-animated-icons' },
];

/** Questions and answers; `link` points to the page that answers in depth. */
export const HOME_FAQ: (Faq[number] & { link?: { href: string; label: string } })[] = [
  {
    question: 'What are micro animations and animated icons?',
    answer:
      'Micro animations are short, single-purpose motions that answer a user action: a menu icon that turns into a close button, a heart that fills when you like a post, a bell that rings for a new notification. Animated icons are the most common kind. They make an interface feel responsive and show state changes without extra text.',
  },
  {
    question: 'What is the difference between the Lottie and SVG files?',
    answer:
      'The Lottie JSON file holds the whole animation and plays in any Lottie player, including the one built into react-useanimations. The SVG files are still images of the icon at rest, one per state (for example eye and eye-off), for places where nothing should move: emails, documents, design tools or a no-JavaScript fallback.',
  },
  {
    question: 'Does it work with Next.js and server rendering?',
    answer:
      "Yes. The component is marked 'use client' and draws the animation only in the browser, so it renders from server components and SSR frameworks such as Next.js, Remix and Astro without dynamic imports. Icon modules are plain data that server components can import and pass as props.",
    link: {
      href: '/documentation#nextjs-and-server-rendering',
      label: 'Next.js and server rendering',
    },
  },
  {
    question: 'Can I use the icons in commercial projects?',
    answer:
      'Yes. The icons and the react-useanimations package are MIT licensed: use, modify and redistribute them in personal and commercial work. Attribution is appreciated but not required.',
    link: { href: '/licencing-and-terms', label: 'Licencing & Terms' },
  },
  {
    question: 'Can I use the icons without React?',
    answer:
      'Yes. Every icon is a standard Lottie JSON file, so it plays with lottie-web in plain JavaScript, Vue, Svelte, Angular or a CMS, and in Lottie players for iOS, Android and Flutter. The Lottie icons page has the file URLs and ready-made lottie-web snippets for each interaction.',
    link: { href: '/lottie-icons', label: 'Lottie icons' },
  },
  {
    question: 'How much do the icons add to my bundle?',
    answer: `The player in react-useanimations ${VERSION} is about 8 kB gzipped with no dependencies, and each icon is its own module of 1 to 15 kB (2 kB median), so a bundle only includes the icons you import.`,
  },
];
