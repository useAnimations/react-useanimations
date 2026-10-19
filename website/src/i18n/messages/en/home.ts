// The home page (/), its FAQ and the hub links it shares with index.md. Counts, the package
// version and link targets come in as arguments, so each language builds whole sentences with
// its own grammar. Strings ending in Html may contain <code> and <a> tags; keep the tags as they
// are and translate only the text between them. Brand and tech terms (useAnimations,
// react-useanimations, React, Lottie, shadcn/ui, SVG, JSON, ZIP, MIT, Next.js) stay as they are.
import type { Interaction } from 'react-useanimations';

/** A FAQ answer's "read more" link: the page path is filled in by the site, only `label` is text. */
export type FaqLink = { href: string; label: string };
export type HomeFaq = { question: string; answer: string; link?: FaqLink }[];

/** Pages the FAQ links to (already in the reader's language); not translated. */
export type FaqLinks = { serverRendering: string; licence: string; lottie: string };

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home = {
  /** <title> of the home page; keep it under the language's title limit (60 characters, 32 for CJK). */
  title: 'Micro Animations & Animated Icon Library — useAnimations',
  /** Meta description, also the page summary in search results; under 155 characters (80 for CJK). */
  description: (count: number) =>
    `${count} free micro animations for UI: an animated icon library for React, shadcn/ui and Lottie with hover, click and loop built in. MIT.`,

  hero: {
    /** Pill above the headline, linking to the v2 → v3 upgrade notes. */
    badge: (count: number) => `${count} icons · zero dependencies · MIT`,
    /**
     * The big headline, in three parts: `accent` is drawn with a colour gradient. Use `start`
     * and `end` to put it where your language needs it; either may be empty.
     */
    headline: { start: 'Icons that ', accent: 'come alive.', end: '' },
    /** The page's H1 under the headline: what the site is, with the words people search for. */
    h1: 'Free animated icons for React, shadcn/ui and Lottie',
    intro: (count: number) =>
      `${count} hand-crafted micro animations with hover, click and loop micro-interactions built in. Use them as a React component, add them with shadcn, or download SVG and Lottie JSON. MIT licensed.`,
    /** Button that scrolls to the icon browser. */
    browse: 'Browse icons',
    /** Caption under the interactive field of icons in the hero. */
    fieldHint: 'Move your pointer across the field.',
  },

  /** Row of four figures under the hero. */
  numbers: {
    /** Accessible name of the row (screen readers only). */
    label: 'At a glance',
    icons: 'animated icons',
    interactions: 'built-in interactions',
    /** Next to "8 kB": the size of the player. */
    size: 'player, gzipped',
    dependencies: 'dependencies',
  },

  /** Section with six live demo cards, one per interaction. */
  interactions: {
    eyebrow: 'Interactions built in',
    title: 'Every icon knows how to move.',
    intro:
      'Each icon ships with the interaction it was designed for. Drop it in and it just works — or pick another one with a single prop. Try them:',
    /** The hint under each demo card's title; the card's title is the interaction's label. */
    demos: {
      loop: 'Plays continuously, for loaders and ambient status.',
      'click-toggle': 'Switches between two states: menu and close, play and pause.',
      'click-replay': 'Replays from the start on every click, as feedback.',
      hover: 'Plays forward on enter and back on leave.',
      'hover-loop': 'Loops while hovered and finishes its cycle on leave.',
      'hover-replay': 'Plays once from the start on every enter.',
    } as Record<Interaction, string>,
  },

  /** The searchable icon library with its filter bar. */
  browser: {
    eyebrow: 'The library',
    title: (count: number) => `${count} free animated icons`,
    intro:
      'Hover or click to play. Open an icon for its code and downloads — Lottie JSON, SVG and ZIP.',
    /** Label of the search field (screen readers only). */
    search: 'Search icons',
    /** Placeholder of the search field. Icon keywords are English, so keep the example words English. */
    searchPlaceholder: (count: number) => `Search ${count} icons — try “eye”, “bell” or “arrow”`,
    /** Label of the interaction dropdown (screen readers only). */
    interaction: 'Interaction',
    allInteractions: 'All interactions',
    /** Label of the colour swatches (screen readers only). */
    color: 'Icon color',
    /** Names of the colour swatches (screen readers only). `text` resets to the text colour. */
    colors: {
      text: 'Text color',
      indigo: 'Indigo',
      red: 'Red',
      amber: 'Amber',
      teal: 'Teal',
      violet: 'Violet',
    },
    customColor: 'Custom color',
    /** Label of the icon size slider. */
    size: 'Size',
    /** Label of the category buttons (screen readers only). */
    category: 'Category',
    /** First category button: no category filter. */
    all: 'All',
    /**
     * How many icons the filters show, e.g. "12 icons". One string per plural form of your language
     * (Intl.PluralRules: zero, one, two, few, many, other); `other` is required. `{n}` is the number.
     * The browser picks the form, so these are templates rather than functions.
     */
    count: { one: '{n} icon', other: '{n} icons' } as Partial<
      Record<Intl.LDMLPluralRule, string>
    > & {
      other: string;
    },
    noMatch: 'No icons match.',
    /** Under "No icons match."; `href` opens a new issue on GitHub. */
    noMatchHintHtml: (href: string) => `Try another word, or ${link(href, 'suggest an icon')}.`,
  },

  /** Section with code tabs: React, shadcn, files and agents. */
  everywhere: {
    eyebrow: 'Use them your way',
    title: 'Install, import, done.',
    intro:
      'A React component with no dependencies, a shadcn registry, downloadable files with stable URLs, and a catalog that AI agents can read.',
    docs: 'Read the documentation',
    /** Accessible name of the tab list (screen readers only). */
    tablist: 'Platform',
    /** Tab names; React and shadcn are names and stay as they are. */
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Files', agents: 'Agents' },
    /** Comments inside the code examples (the code itself stays English). */
    codeText: {
      /** shadcn tab: what to write after adding the component. */
      afterAdding: 'then',
      /** Files tab: the line above the file URLs. */
      files: 'Every icon as an SVG, as its animation (Lottie JSON) and as a ZIP of both',
    },
  },

  /** Feature cards. */
  features: {
    title: 'Small, accessible and yours to style.',
    colors: 'Follows your colors',
    colorsHtml: `Icons use ${code('currentColor')}: they pick up text color, hover states and dark mode on their own. Override with a prop, a class or plain CSS.`,
    tiny: 'Tiny by design',
    /** Under the large "8 kB". */
    tinyText: 'A built-in player, zero dependencies. Each icon is its own 2 kB module.',
    accessible: 'Accessible by default',
    accessibleText:
      'Respects reduced motion, plays hover animations on keyboard focus and stays out of screen readers unless you label it.',
    ssr: 'Server-rendering ready',
    ssrText:
      'A client component that renders safely in Next.js, Remix and Astro. Icons are plain data you can import anywhere.',
    agents: 'Made for agents',
    /** Links to the machine-readable catalog and llms.txt (English files). */
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `A typed catalog with keywords for every icon, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} and Markdown docs.`,
  },

  /** Link lists to the category, interaction and collection pages. */
  browse: {
    title: 'Find the right micro animation.',
    byCategory: 'Browse by category',
    byInteraction: 'Browse by interaction',
    formats: 'All icons and formats',
  },

  /** Labels of the links to the collection pages (also in the Markdown home page, English only). */
  hubs: {
    icons: 'All animated icons',
    categories: 'Icon categories',
    interactions: 'Icons by interaction',
    lottie: 'Lottie icons (JSON)',
    shadcn: 'shadcn/ui animated icons',
  },

  /** FAQ heading. */
  faqTitle: 'Questions',
  /**
   * Questions and answers, also in the page's structured data. `links` are the pages that
   * answer in depth; keep each `link` with its question and translate only its `label`.
   */
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
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
      link: { href: f.links.serverRendering, label: 'Next.js and server rendering' },
    },
    {
      question: 'Can I use the icons in commercial projects?',
      answer:
        'Yes. The icons and the react-useanimations package are MIT licensed: use, modify and redistribute them in personal and commercial work. Attribution is appreciated but not required.',
      link: { href: f.links.licence, label: 'Licencing & Terms' },
    },
    {
      question: 'Can I use the icons without React?',
      answer:
        'Yes. Every icon is a standard Lottie JSON file, so it plays with lottie-web in plain JavaScript, Vue, Svelte, Angular or a CMS, and in Lottie players for iOS, Android and Flutter. The Lottie icons page has the file URLs and ready-made lottie-web snippets for each interaction.',
      link: { href: f.links.lottie, label: 'Lottie icons' },
    },
    {
      question: 'How much do the icons add to my bundle?',
      answer: `The player in react-useanimations ${f.version} is about 8 kB gzipped with no dependencies, and each icon is its own module of 1 to 15 kB (2 kB median), so a bundle only includes the icons you import.`,
    },
  ],

  /** Closing call to action. */
  cta: {
    /** Headline in three parts like hero.headline: `accent` is drawn with a colour gradient. */
    title: { start: 'Give your interface a ', accent: 'pulse.', end: '' },
    text: 'Free and MIT licensed, for personal and commercial work.',
    start: 'Get started',
  },

  /** Structured data (schema.org) of the home page, read by search engines. */
  schema: {
    software: (count: number) =>
      `React component and ${count} animated icons (Lottie) with hover, click and loop interactions built in. No dependencies.`,
    catalogName: 'useAnimations icon catalog',
    catalog: (count: number) =>
      `Every one of the ${count} useAnimations icons with id, title, category, keywords, interaction, Lottie JSON, SVG and ZIP URLs, React import and shadcn command.`,
  },
};
