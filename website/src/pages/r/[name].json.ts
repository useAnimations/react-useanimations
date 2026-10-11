import type { GetStaticPaths } from 'astro';
import { icons } from '../../lib/icons';
import { json } from '../../lib/http';
import { iconItem, type RegistryItem, useAnimationItem } from '../../lib/registry';

export const getStaticPaths = (() => [
  { params: { name: 'use-animation' }, props: { item: useAnimationItem } },
  ...icons.map((icon) => ({ params: { name: icon.id }, props: { item: iconItem(icon) } })),
]) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { item: RegistryItem } }) => json(props.item);
