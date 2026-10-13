// Shared pieces of the hub pages (/icons, /categories, /interactions, /lottie-icons,
// /shadcn-animated-icons): titles and descriptions within the search limits, and JSON-LD nodes.
import type { Interaction } from 'react-useanimations';
import { type Icon, iconById, icons, INTERACTIONS, libImport, shadcnCommand, SITE } from './icons';
import { EN, type Locale, t } from '../i18n';
import type { CategoryFacts, ExampleIcon, InteractionFacts } from '../i18n/messages/en/hubs';
import { type Faq, MAX_DESCRIPTION, MAX_TITLE, TITLE_SUFFIX, WEBSITE_ID } from './seo';
import {
  CATEGORY_META,
  type CategoryMeta,
  iconsByCategory,
  iconsByInteraction,
  REDUCED_MOTION,
} from './taxonomy';

export { REDUCED_MOTION };

/** The first candidate that fits in max characters, else the last one. */
export const fit = (candidates: string[], max: number) =>
  candidates.find((candidate) => candidate.length <= max) ?? candidates.at(-1)!;

/** A <title>: each stem with the brand suffix if it fits, then without. */
export const hubTitle = (...stems: string[]) =>
  fit([...stems.map((stem) => stem + TITLE_SUFFIX), ...stems], MAX_TITLE);

export const hubDescription = (...candidates: string[]) => fit(candidates, MAX_DESCRIPTION);

/** hubTitle in a language: its own brand suffix and length limit. */
export const localTitle = (l: Locale, stems: string[]) =>
  fit([...stems.map((stem) => stem + t(l).hubs.titleSuffix), ...stems], l.maxTitle);

/** hubDescription in a language. */
export const localDescription = (l: Locale, candidates: string[]) =>
  fit(candidates, l.maxDescription);

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
  items: Icon[],
  l: Locale = EN
) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE}${path}`,
  url: `${SITE}${path}`,
  name,
  description,
  inLanguage: l.hreflang,
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: itemListNode(items, name),
});

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

/** Icons grouped by interaction, in the order of INTERACTIONS. */
const groupByInteraction = (items: Icon[]) =>
  (Object.keys(INTERACTIONS) as Interaction[])
    .map((interaction) => ({
      interaction,
      icons: items.filter((icon) => icon.interaction === interaction),
    }))
    .filter((group) => group.icons.length > 0);

const exampleIcon = (icon: Icon, l: Locale): ExampleIcon => ({
  id: icon.id,
  title: icon.title,
  exportName: icon.exportName,
  importLine: libImport(icon).replace(/;$/, ''),
  shadcnCommand: shadcnCommand(icon),
  interactionLabel: t(l).taxonomy.interactions[icon.interaction].label,
});

/** The facts a language needs to describe a category. */
export const categoryFacts = (meta: CategoryMeta, l: Locale = EN): CategoryFacts => {
  const items = iconsByCategory(meta.name);
  const m = t(l).taxonomy;
  return {
    name: m.categories[meta.name].name,
    title: m.categories[meta.name].title,
    count: items.length,
    titles: items.map((icon) => icon.title),
    groups: groupByInteraction(items).map(({ interaction, icons: group }) => ({
      interaction,
      count: group.length,
      plays: m.interactions[interaction].plays,
    })),
    withSvg: items.filter((icon) => Object.keys(icon.svgs).length > 0).length,
    expressions: items.filter((icon) => icon.requiresFullPlayer).map((icon) => icon.title),
    example: exampleIcon(iconById.get(CATEGORY_EXAMPLE[meta.name]) ?? items[0], l),
    site: SITE,
  };
};

/** Title, description, summary, interaction breakdown and example icon of a category page. */
export const categoryText = (meta: CategoryMeta, l: Locale = EN) => {
  const items = iconsByCategory(meta.name);
  const facts = categoryFacts(meta, l);
  const m = t(l).hubs.category;
  return {
    title: localTitle(l, m.titles(facts)),
    description: localDescription(l, m.descriptions(facts)),
    summary: m.summary(facts),
    byInteraction: groupByInteraction(items),
    example: iconById.get(CATEGORY_EXAMPLE[meta.name]) ?? items[0],
  };
};

export const categoryFaq = (meta: CategoryMeta, l: Locale = EN): Faq =>
  t(l).hubs.category.faq(categoryFacts(meta, l));

/** The facts a language needs to describe an interaction. */
export const interactionFacts = (interaction: Interaction, l: Locale = EN): InteractionFacts => {
  const m = t(l).taxonomy.interactions[interaction];
  const items = iconsByInteraction(interaction);
  return {
    interaction,
    label: m.label,
    title: m.title,
    plays: m.plays,
    example: m.example,
    reducedMotion: m.reducedMotion,
    count: items.length,
    titles: items.map((icon) => icon.title),
  };
};

/** Title, description and summary of an interaction page. */
export const interactionText = (interaction: Interaction, l: Locale = EN) => {
  const items = iconsByInteraction(interaction);
  const facts = interactionFacts(interaction, l);
  const m = t(l).hubs.interaction;
  return {
    title: localTitle(l, m.titles(facts)),
    description: localDescription(l, m.descriptions(facts)),
    example: iconById.get(INTERACTION_EXAMPLE[interaction]) ?? items[0],
    byCategory: categories()
      .map(({ meta: category, icons: group }) => ({
        meta: category,
        icons: group.filter((icon) => icon.interaction === interaction),
      }))
      .filter((group) => group.icons.length > 0),
  };
};

export const interactionFaq = (interaction: Interaction, l: Locale = EN): Faq =>
  t(l).hubs.interaction.faq(interactionFacts(interaction, l));
