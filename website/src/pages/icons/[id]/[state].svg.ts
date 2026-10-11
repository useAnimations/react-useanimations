import type { GetStaticPaths } from 'astro';
import { icons } from '../../../lib/icons';
import { text } from '../../../lib/http';

export const getStaticPaths = (() =>
  icons.flatMap((icon) =>
    Object.entries(icon.svgs).map(([state, svg]) => ({
      params: { id: icon.id, state },
      props: { svg },
    }))
  )) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { svg: string } }) => text(props.svg, 'image/svg+xml');
