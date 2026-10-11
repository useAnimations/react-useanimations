// Shared pieces of the hub pages (/icons, /categories, /interactions, /lottie-icons,
// /shadcn-animated-icons): titles and descriptions within the search limits, and JSON-LD nodes.
import type { Interaction } from 'react-useanimations';
import { type Icon, iconById, icons, INTERACTIONS, libImport, shadcnCommand, SITE } from './icons';
import { type Faq, MAX_DESCRIPTION, MAX_TITLE, TITLE_SUFFIX, WEBSITE_ID } from './seo';
import {
  CATEGORY_META,
  type CategoryMeta,
  INTERACTION_META,
  iconsByCategory,
  iconsByInteraction,
} from './taxonomy';

/** The first candidate that fits in max characters, else the last one. */
export const fit = (candidates: string[], max: number) =>
  candidates.find((candidate) => candidate.length <= max) ?? candidates.at(-1)!;

/** A <title>: each stem with the brand suffix if it fits, then without. */
export const hubTitle = (...stems: string[]) =>
  fit([...stems.map((stem) => stem + TITLE_SUFFIX), ...stems], MAX_TITLE);

export const hubDescription = (...candidates: string[]) => fit(candidates, MAX_DESCRIPTION);

export const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const categoryPath = (meta: CategoryMeta) => `/categories/${meta.slug}`;
export const interactionPath = (interaction: Interaction) => `/interactions/${interaction}`;

/** Categories in site order, with their icons. */
export const categories = () =>
  Object.values(CATEGORY_META).map((meta) => ({ meta, icons: iconsByCategory(meta.name) }));

/** Interactions in the order of INTERACTIONS, with their icons. */
export const interactions = () =>
  (Object.keys(INTERACTIONS) as Interaction[]).map((interaction) => ({
    interaction,
    icons: iconsByInteraction(interaction),
  }));

/** Icons by catalog id, in the given order; throws on a typo so a renamed icon fails the build. */
export const pickIcons = (ids: string[]): Icon[] =>
  ids.map((id) => {
    const icon = iconById.get(id);
    if (!icon) throw new Error(`hubs: no icon "${id}"`);
    return icon;
  });

/** Icons that use After Effects expressions: lottie-web's full build, not the light one. */
export const expressionIcons = () => icons.filter((icon) => icon.requiresFullPlayer);

export type Crumb = { name: string; path: string };

export const breadcrumbNode = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE}${crumb.path}`,
  })),
});

export const itemListNode = (items: Icon[], name: string) => ({
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((icon, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE}/icons/${icon.id}`,
    name: icon.title,
  })),
});

/** A CollectionPage whose main entity is the list of its icons. */
export const collectionPageNode = (
  path: string,
  name: string,
  description: string,
  items: Icon[]
) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE}${path}`,
  url: `${SITE}${path}`,
  name,
  description,
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: itemListNode(items, name),
});

// How a group of icons plays, as a plural verb phrase: "<n> icons <phrase>".
const PLAY: Record<Interaction, string> = {
  loop: 'loop continuously',
  'click-toggle': 'toggle between two states on click',
  'click-replay': 'replay on every click',
  hover: 'play on hover and reverse on mouse leave',
  'hover-replay': 'play once on hover',
  'hover-loop': 'loop while hovered',
};

/** What each interaction does when the user prefers reduced motion (src/index.tsx). */
export const REDUCED_MOTION: Record<Interaction, string> = {
  loop: 'With reduced motion preferred, the icon does not autoplay and stays on its static first frame.',
  'click-toggle':
    'With reduced motion preferred, a click switches to the other state immediately, without the animation in between.',
  'click-replay':
    'With reduced motion preferred, clicks still reach your handler but the animation does not play.',
  hover: 'With reduced motion preferred, hovering does not play the animation.',
  'hover-replay': 'With reduced motion preferred, hovering does not play the animation.',
  'hover-loop': 'With reduced motion preferred, the icon stays static while hovered.',
};

// The icon each collection uses in its code example: a well-known member of the group.
const CATEGORY_EXAMPLE: Record<string, string> = {
  Alerts: 'alert-triangle',
  Notifications: 'notification',
  Navigation: 'menu',
  Action: 'heart',
  Content: 'copy',
  Form: 'check-box',
  Media: 'play-pause',
  'Text editing': 'bold',
  Communication: 'send',
  Devices: 'wifi',
  Weather: 'sun',
  'Maps & location': 'map-pin',
  Commerce: 'shopping-cart',
  Charts: 'trending-up',
  Development: 'git-branch',
  'Design & layout': 'layers',
  'Shapes & math': 'hexagon',
  Loading: 'loading',
  'Social media': 'github',
  Other: 'scroll-down',
};

export const INTERACTION_EXAMPLE: Record<Interaction, string> = {
  loop: 'infinity',
  'click-toggle': 'menu',
  'click-replay': 'download',
  hover: 'archive',
  'hover-loop': 'github',
  'hover-replay': 'trending-up',
};

const titles = (items: Icon[], max = 12) =>
  items.length > max
    ? `${items
        .slice(0, max)
        .map((icon) => icon.title)
        .join(', ')} and ${items.length - max} more`
    : list(items.map((icon) => icon.title));

/** ', with static SVGs' when every icon has them, else how many do. */
const svgNote = (items: Icon[]) => {
  const withSvg = items.filter((icon) => Object.keys(icon.svgs).length > 0).length;
  if (withSvg === items.length) return ' with static SVGs';
  return withSvg ? `, and ${withSvg} of them also as static SVGs` : '';
};

const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

/** Icons grouped by interaction, in the order of INTERACTIONS. */
const groupByInteraction = (items: Icon[]) =>
  (Object.keys(INTERACTIONS) as Interaction[])
    .map((interaction) => ({
      interaction,
      icons: items.filter((icon) => icon.interaction === interaction),
    }))
    .filter((group) => group.icons.length > 0);

/** Title, description, summary, interaction breakdown and example icon of a category page. */
export const categoryText = (meta: CategoryMeta) => {
  const items = iconsByCategory(meta.name);
  const n = items.length;
  const name = lower(meta.title);
  const byInteraction = groupByInteraction(items);
  const examples = list(items.slice(0, 3).map((icon) => icon.title));
  const plays = list(
    byInteraction.map(
      ({ interaction, icons: group }) =>
        `${group.length} ${group.length === 1 ? PLAY[interaction].replace(/^(\w+)/, '$1s') : PLAY[interaction]}`
    )
  );
  return {
    title: hubTitle(
      `${meta.title} for React & Lottie`,
      `${meta.title} for React`,
      `Free ${name}`,
      meta.title
    ),
    description: hubDescription(
      `${n} free ${name}, including ${examples}. Hover, click and loop micro animations for React, shadcn/ui and Lottie JSON, MIT licensed.`,
      `${n} free ${name}, including ${examples}. For React, shadcn/ui and Lottie JSON, MIT licensed.`,
      `${n} free ${name}, including ${examples}. For React, shadcn/ui and Lottie, MIT.`,
      `${n} free ${name} for React, shadcn/ui and Lottie JSON, MIT licensed.`
    ),
    summary: `${byInteraction.length === 1 ? `All ${n} icons ${PLAY[byInteraction[0].interaction]}` : `Of the ${n} icons, ${plays}`}. Each one comes as a React component, a shadcn/ui component and a Lottie JSON animation${svgNote(items)}, free for commercial use under the MIT license.`,
    byInteraction,
    example: iconById.get(CATEGORY_EXAMPLE[meta.name]) ?? items[0],
  };
};

export const categoryFaq = (meta: CategoryMeta): Faq => {
  const items = iconsByCategory(meta.name);
  const { example } = categoryText(meta);
  const name = lower(meta.title);
  const label = INTERACTIONS[example.interaction].label.toLowerCase();
  const expressions = items.filter((icon) => icon.requiresFullPlayer);
  return [
    {
      question: `Which ${name} are included?`,
      answer: `${plural(items.length, 'icon')}: ${titles(items)}. All of them are free for personal and commercial projects under the MIT license, with no attribution required.`,
    },
    {
      question: `How do I use these ${name} in React?`,
      answer: `Install react-useanimations, add ${libImport(example).replace(/;$/, '')} and render <UseAnimations animation={${example.exportName}} size={32} />. The icon plays its ${label} interaction and follows the text color. With shadcn/ui, run ${shadcnCommand(example)} instead.`,
    },
    {
      question: `Can I use these ${name} without React?`,
      answer: `Yes. Each icon is a Lottie JSON file at ${SITE}/icons/<id>.json (for example ${SITE}/icons/${example.id}.json), playable with lottie-web, lottie-ios, lottie-android or Flutter's lottie package${svgNote(items) ? '; static SVGs are on each icon page' : ''}. ${
        expressions.length
          ? `${titles(expressions, 6)} ${expressions.length === 1 ? 'uses' : 'use'} After Effects expressions, so on the web ${expressions.length === 1 ? 'it needs' : 'they need'} lottie-web's full build.`
          : "None of them use expressions, so lottie-web's light build is enough."
      }`,
    },
  ];
};

/** Title, description and summary of an interaction page. */
export const interactionText = (interaction: Interaction) => {
  const meta = INTERACTION_META[interaction];
  const items = iconsByInteraction(interaction);
  const n = items.length;
  const name = lower(meta.title);
  const examples = list(items.slice(0, 3).map((icon) => icon.title));
  return {
    title: hubTitle(`${meta.title} for React & Lottie`, `${meta.title} for React`, meta.title),
    description: hubDescription(
      `${n} free ${name} that ${PLAY[interaction]}, such as ${examples}. For React, shadcn/ui and Lottie JSON, MIT licensed.`,
      `${n} free ${name} that ${PLAY[interaction]}. For React, shadcn/ui and Lottie JSON, MIT licensed.`
    ),
    example: iconById.get(INTERACTION_EXAMPLE[interaction]) ?? items[0],
    byCategory: categories()
      .map(({ meta: category, icons: group }) => ({
        meta: category,
        icons: group.filter((icon) => icon.interaction === interaction),
      }))
      .filter((group) => group.icons.length > 0),
  };
};

export const interactionFaq = (interaction: Interaction): Faq => {
  const meta = INTERACTION_META[interaction];
  const items = iconsByInteraction(interaction);
  const label = INTERACTIONS[interaction].label;
  const toggle =
    interaction === 'click-toggle'
      ? ' To control the state yourself, pass active={isOn} and update it in onClick: clicks then no longer toggle the icon on their own.'
      : '';
  return [
    {
      question: `Which icons use the ${lower(label)} interaction?`,
      answer: `${plural(items.length, 'icon')}: ${titles(items, 15)}. ${meta.example}`,
    },
    {
      question: `What happens when the user prefers reduced motion?`,
      answer: `${REDUCED_MOTION[interaction]} The React component reads prefers-reduced-motion and updates when the setting changes, so you don't need any code for it.`,
    },
    {
      question: `How do I change an icon's interaction?`,
      answer: `Every icon plays the interaction it was designed for. Pass interaction="${interaction}" to give any other icon this behaviour, or another value ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') to change it. The autoplay, loop and speed props adjust playback.${toggle}`,
    },
  ];
};
