// Categories and interactions as shown to readers. The English copy lives in lib/taxonomy.ts and
// lib/icons.ts (icon pages and Markdown use it too); other languages translate this shape.
import type { Interaction } from 'react-useanimations';
import { INTERACTIONS } from '../../../lib/icons';
import {
  CATEGORY_COPY,
  INTERACTION_COPY,
  PLAY,
  REDUCED_MOTION,
} from '../../../lib/taxonomy';

export type CategoryText = {
  /** Display name, e.g. 'Maps & location'. */
  name: string;
  /** Page heading, e.g. 'Animated loading icons'. */
  title: string;
  intro: string;
  useCases: string[];
};

export type InteractionText = {
  /** Short name, e.g. 'Click toggle'. */
  label: string;
  /** Page heading, e.g. 'Click-to-toggle animated icons'. */
  title: string;
  intro: string;
  useCases: string[];
  /** One sentence of typical uses. */
  example: string;
  /** What the interaction does, one or two sentences. */
  description: string;
  /** What it does when the user prefers reduced motion, one sentence. */
  reducedMotion: string;
  /** How a group of icons plays, as a plural verb phrase: "<n> icons <plays>". */
  plays: string;
};

export const taxonomy = {
  categories: Object.fromEntries(
    Object.entries(CATEGORY_COPY).map(([name, copy]) => [
      name,
      { name, title: copy.title, intro: copy.intro, useCases: copy.useCases },
    ])
  ) as Record<string, CategoryText>,
  interactions: Object.fromEntries(
    (Object.keys(INTERACTIONS) as Interaction[]).map((interaction) => [
      interaction,
      {
        label: INTERACTIONS[interaction].label,
        title: INTERACTION_COPY[interaction].title,
        intro: INTERACTION_COPY[interaction].intro,
        useCases: INTERACTION_COPY[interaction].useCases,
        example: INTERACTION_COPY[interaction].example,
        description: INTERACTIONS[interaction].description,
        reducedMotion: REDUCED_MOTION[interaction],
        plays: PLAY[interaction],
      },
    ])
  ) as Record<Interaction, InteractionText>,
};
