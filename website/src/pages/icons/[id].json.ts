import type { GetStaticPaths } from 'astro';
import { type Icon, icons } from '../../lib/icons';
import { text } from '../../lib/http';

export const getStaticPaths = (() =>
  icons.map((icon) => ({ params: { id: icon.id }, props: { icon } }))) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { icon: Icon } }) =>
  text(props.icon.lottie, 'application/json');
