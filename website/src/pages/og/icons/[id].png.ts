// The social card of each icon page, 1200 × 630, drawn at build time (lib/og-image.ts).
import type { GetStaticPaths } from 'astro';
import { type Icon, icons } from '../../../lib/icons';
import { ogPng } from '../../../lib/og-image';

export const getStaticPaths = (() =>
  icons.map((icon) => ({ params: { id: icon.id }, props: { icon } }))) satisfies GetStaticPaths;

export const GET = ({ props: { icon } }: { props: { icon: Icon } }) =>
  new Response(ogPng(icon), { headers: { 'Content-Type': 'image/png' } });
