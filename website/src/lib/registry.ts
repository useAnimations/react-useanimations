// The shadcn registry at /r: one item per icon, plus the shared use-animation component. Every item
// builds on react-useanimations, so apps get one player and its updates from npm.
import { type Icon, icons, INTERACTIONS, SITE, VERSION } from './icons';

const AUTHOR = 'useAnimations <https://useanimations.com>';
const DEPENDENCY = `react-useanimations@^${VERSION}`;

const useAnimationSource = `"use client"

import * as React from "react"
import UseAnimations, {
  type Interaction,
  type UseAnimationsProps,
} from "react-useanimations"

// Animated icons from https://useanimations.com (MIT).
// Docs: ${SITE}/documentation#shadcn

export type { Interaction }

export type UseAnimationProps = Omit<UseAnimationsProps, "animation"> & {
  /** Lottie JSON of the icon. */
  animationData: object
  /** How the icon plays: on loop, on click (toggle or replay) or on hover. */
  interaction?: Interaction
  /** @deprecated Not needed: react-useanimations plays every icon. */
  fullPlayer?: boolean
}

export function UseAnimation({
  animationData,
  interaction,
  fullPlayer: _fullPlayer,
  ...props
}: UseAnimationProps) {
  const animation = React.useMemo(
    () => ({ animationData, interaction }),
    [animationData, interaction]
  )
  return <UseAnimations animation={animation} {...props} />
}
`;

const iconSource = (icon: Icon) => `"use client"

import animation from "react-useanimations/lib/${icon.name}"

import { UseAnimation, type UseAnimationProps } from "@/components/use-animation"

// "${icon.title}" from https://useanimations.com (MIT): ${SITE}/icons/${icon.id}
export function ${icon.component}(
  props: Omit<UseAnimationProps, "animationData">
) {
  return (
    <UseAnimation
      animationData={animation.animationData}
      interaction="${icon.interaction}"
      {...props}
    />
  )
}
`;

const slug = (category: string) =>
  category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-');

type File = { path: string; type: string; target: string; content?: string };
export type RegistryItem = {
  $schema?: string;
  name: string;
  type: string;
  title: string;
  description: string;
  author: string;
  dependencies?: string[];
  registryDependencies?: string[];
  categories: string[];
  meta?: Record<string, unknown>;
  files: File[];
};

const ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

export const useAnimationItem: RegistryItem = {
  $schema: ITEM_SCHEMA,
  name: 'use-animation',
  type: 'registry:component',
  title: 'UseAnimation',
  description:
    'Player for useAnimations icons, built on react-useanimations: loop, click and hover interactions, recoloring with currentColor and prefers-reduced-motion support.',
  author: AUTHOR,
  dependencies: [DEPENDENCY],
  categories: ['animation', 'icons'],
  files: [
    {
      path: 'registry/use-animation.tsx',
      type: 'registry:component',
      target: 'components/use-animation.tsx',
      content: useAnimationSource,
    },
  ],
};

export const iconItem = (icon: Icon): RegistryItem => ({
  $schema: ITEM_SCHEMA,
  name: icon.id,
  type: 'registry:component',
  title: `${icon.title} (animated)`,
  description: `Animated ${icon.title.toLowerCase()} icon (${icon.interaction}). Usage: <${icon.component} size={24} />`,
  author: AUTHOR,
  dependencies: [DEPENDENCY],
  registryDependencies: [`${SITE}/r/use-animation.json`],
  categories: ['animated-icons', slug(icon.category)],
  meta: {
    keywords: icon.keywords,
    interaction: icon.interaction,
    interactionDescription: INTERACTIONS[icon.interaction].description,
    lottie: `${SITE}/icons/${icon.id}.json`,
  },
  files: [
    {
      path: `registry/animations/${icon.id}.tsx`,
      type: 'registry:component',
      target: `components/animations/${icon.id}.tsx`,
      content: iconSource(icon),
    },
  ],
});

export const registry = () => ({
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'useanimations',
  homepage: `${SITE}/`,
  items: [useAnimationItem, ...icons.map(iconItem)].map(({ $schema: _schema, files, ...item }) => ({
    ...item,
    files: files.map(({ content: _content, ...file }) => file),
  })),
});
