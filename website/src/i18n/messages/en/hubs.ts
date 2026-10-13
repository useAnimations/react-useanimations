// The category and interaction pages (/categories/<slug>, /interactions/<slug>): generated
// sentences and page text. Message files get facts (counts, icon titles, examples) and build their
// own sentences, so each language can use its own grammar. Strings ending in Html may contain
// <code> and <a> tags.
import type { Interaction } from 'react-useanimations';

export type Faq = { question: string; answer: string }[];

/** An icon as hub sentences mention it. */
export type ExampleIcon = {
  id: string;
  title: string;
  exportName: string;
  /** 'react-useanimations/lib/<name>' import line without the semicolon. */
  importLine: string;
  shadcnCommand: string;
  /** Label of its interaction in this language, e.g. 'Click toggle'. */
  interactionLabel: string;
};

export type CategoryFacts = {
  /** Category name in this language, e.g. 'Maps & location'. */
  name: string;
  /** Page heading in this language, e.g. 'Animated loading icons'. */
  title: string;
  count: number;
  /** Titles of every icon, in site order (English, they are names). */
  titles: string[];
  /** How many icons per interaction, with the interaction's plural verb phrase in this language. */
  groups: { interaction: Interaction; count: number; plays: string }[];
  /** How many icons have static SVGs. */
  withSvg: number;
  /** Titles of icons that need lottie-web's full build (After Effects expressions). */
  expressions: string[];
  example: ExampleIcon;
  site: string;
};

export type InteractionFacts = {
  interaction: Interaction;
  label: string;
  title: string;
  plays: string;
  /** One sentence of typical uses. */
  example: string;
  reducedMotion: string;
  count: number;
  titles: string[];
};

const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

/** Up to `max` titles, then 'and N more'. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} and ${items.length - max} more`
    : list(items);

/** ' with static SVGs' when every icon has them, else how many do. */
const svgNote = (f: CategoryFacts) => {
  if (f.withSvg === f.count) return ' with static SVGs';
  return f.withSvg ? `, and ${f.withSvg} of them also as static SVGs` : '';
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs = {
  /** Brand suffix of <title>s; titles try it first and drop it when too long. */
  titleSuffix: ' — useAnimations',
  iconCount: (n: number) => plural(n, 'icon'),

  category: {
    /** <title> candidates, best first; the first that fits is used. */
    titles: (f: CategoryFacts) => [
      `${f.title} for React & Lottie`,
      `${f.title} for React`,
      `Free ${lower(f.title)}`,
      f.title,
    ],
    /** Meta description candidates, best first. */
    descriptions: (f: CategoryFacts) => {
      const name = lower(f.title);
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} free ${name}, including ${examples}. Hover, click and loop micro animations for React, shadcn/ui and Lottie JSON, MIT licensed.`,
        `${f.count} free ${name}, including ${examples}. For React, shadcn/ui and Lottie JSON, MIT licensed.`,
        `${f.count} free ${name}, including ${examples}. For React, shadcn/ui and Lottie, MIT.`,
        `${f.count} free ${name} for React, shadcn/ui and Lottie JSON, MIT licensed.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays = list(
        f.groups.map(
          ({ count, plays: phrase }) =>
            `${count} ${count === 1 ? phrase.replace(/^(\w+)/, '$1s') : phrase}`
        )
      );
      return `${f.groups.length === 1 ? `All ${f.count} icons ${f.groups[0].plays}` : `Of the ${f.count} icons, ${plays}`}. Each one comes as a React component, a shadcn/ui component and a Lottie JSON animation${svgNote(f)}, free for commercial use under the MIT license.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `Which ${name} are included?`,
          answer: `${plural(f.count, 'icon')}: ${titles(f.titles)}. All of them are free for personal and commercial projects under the MIT license, with no attribution required.`,
        },
        {
          question: `How do I use these ${name} in React?`,
          answer: `Install react-useanimations, add ${ex.importLine} and render <UseAnimations animation={${ex.exportName}} size={32} />. The icon plays its ${ex.interactionLabel.toLowerCase()} interaction and follows the text color. With shadcn/ui, run ${ex.shadcnCommand} instead.`,
        },
        {
          question: `Can I use these ${name} without React?`,
          answer: `Yes. Each icon is a Lottie JSON file at ${f.site}/icons/<id>.json (for example ${f.site}/icons/${ex.id}.json), playable with lottie-web, lottie-ios, lottie-android or Flutter's lottie package${svgNote(f) ? '; static SVGs are on each icon page' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} ${n === 1 ? 'uses' : 'use'} After Effects expressions, so on the web ${n === 1 ? 'it needs' : 'they need'} lottie-web's full build.`
              : "None of them use expressions, so lottie-web's light build is enough."
          }`,
        },
      ];
    },
    badge: (n: number) => `${plural(n, 'icon')} · MIT licensed`,
    allIcons: (name: string) => `All ${name.toLowerCase()} icons`,
    whereToUse: 'Where to use them',
    byInteraction: 'By interaction',
    addOne: 'Add one to your app',
    addOneHtml: (label: string, name: string) =>
      `With React, install ${code('react-useanimations')} and import the icon; it plays its ${label.toLowerCase()} interaction on its own. Every icon in this category works the same way: swap ${code(name)} for the name on its page.`,
    shadcnHtml: (href: string) =>
      `With ${link(href, 'shadcn/ui')}, the CLI adds a ready-made component:`,
    noReactHtml: (href: string) =>
      `Not using React? Each icon is a Lottie JSON file at ${code('/icons/&lt;id&gt;.json')}; see ${link(href, 'Lottie icons')} for web, iOS, Android and Flutter players.`,
    more: 'More categories',
    allIconsButton: 'All icons',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} for React & Lottie`,
      `${f.title} for React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const name = lower(f.title);
      return [
        `${f.count} free ${name} that ${f.plays}, such as ${list(f.titles.slice(0, 3))}. For React, shadcn/ui and Lottie JSON, MIT licensed.`,
        `${f.count} free ${name} that ${f.plays}. For React, shadcn/ui and Lottie JSON, MIT licensed.`,
      ];
    },
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Which icons use the ${lower(f.label)} interaction?`,
        answer: `${plural(f.count, 'icon')}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: `What happens when the user prefers reduced motion?`,
        answer: `${f.reducedMotion} The React component reads prefers-reduced-motion and updates when the setting changes, so you don't need any code for it.`,
      },
      {
        question: `How do I change an icon's interaction?`,
        answer: `Every icon plays the interaction it was designed for. Pass interaction="${f.interaction}" to give any other icon this behaviour, or another value ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') to change it. The autoplay, loop and speed props adjust playback.${
          f.interaction === 'click-toggle'
            ? ' To control the state yourself, pass active={isOn} and update it in onClick: clicks then no longer toggle the icon on their own.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `All ${label.toLowerCase()} icons`,
    behaviour: 'How it behaves',
    hoverNote:
      ' Taps on touch screens do not start hover animations, and keyboard focus does when the icon is inside a focusable element.',
    handled: 'The React component handles all of this; you only pick the icon.',
    whereToUse: 'Where to use it',
    byCategory: 'By category',
    useInReact: 'Use it in React',
    overrideHtml: `Icons listed here play this interaction by default. Any other icon can use it too: pass the ${code('interaction')} prop.`,
    /** Code comment in the override example. */
    normallyUses: (title: string, interaction: string) => `${title} normally uses '${interaction}'`,
    /** Text before the second code example, per interaction. */
    extra: {
      loop: 'Loops autoplay and pause while scrolled out of view. Slow one down with speed, play it once with loop={false}, or keep it still with autoplay={false}:',
      'click-toggle':
        'Clicks toggle the icon on their own. To keep it in sync with your state, pass active: the icon animates whenever active changes, and clicks no longer toggle it by themselves.',
      'click-replay':
        'Put the icon in a real button with the render prop, so it can be focused and announced. Your onClick runs first; call event.preventDefault() to skip the animation.',
      hover:
        'Put the icon in a link or button with the render prop: the animation then also plays when the element gets keyboard focus, and taps on touch screens do not trigger it.',
      'hover-replay':
        'Hover the whole card or link, not just the icon: with the render prop the events go on your element, and keyboard focus plays the animation too.',
      'hover-loop':
        'Use the render prop so the whole link triggers the loop, including keyboard focus. Change the pace with speed:',
    } as Record<Interaction, string>,
    /** Code comments and labels inside the examples. */
    codeText: {
      halfSpeed: 'half speed',
      playsOnce: 'plays once, then stops',
      staticFrame: 'static first frame',
      endState: 'true shows the end state',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      download: 'Download',
      archive: 'Archive',
      weeklyGrowth: 'Weekly growth',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Every prop is in the ${link(docs, 'documentation')}. Outside React, the icons are Lottie JSON files; ${link(lottie, 'Lottie icons')} shows how to recreate the interactions with lottie-web.`,
    other: 'Other interactions',
    browseByCategory: 'Browse by category',
  },
};
