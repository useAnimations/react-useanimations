// The download package: the Lottie JSON and the static SVGs, named after the icon.
import type { GetStaticPaths } from 'astro';
import { strToU8, zipSync } from 'fflate';
import { type Icon, icons } from '../../lib/icons';

export const getStaticPaths = (() =>
  icons.map((icon) => ({ params: { id: icon.id }, props: { icon } }))) satisfies GetStaticPaths;

// A fixed date keeps the archives identical between builds.
const mtime = new Date('2026-01-01T00:00:00Z');

export const GET = ({ props: { icon } }: { props: { icon: Icon } }) => {
  const files: Record<string, [Uint8Array, { mtime: Date }]> = {
    [`${icon.id}.json`]: [strToU8(icon.lottie), { mtime }],
  };
  for (const [state, svg] of Object.entries(icon.svgs))
    files[`${state}.svg`] = [strToU8(svg), { mtime }];
  return new Response(zipSync(files, { level: 9 }), {
    headers: { 'Content-Type': 'application/zip' },
  });
};
