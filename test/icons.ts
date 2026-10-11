/// <reference types="vite-plus/client" />
import type { Animation, Interaction } from '../src';

// The same icons as `react-useanimations/lib/<name>`, read from the icon set in icons/.
const files = import.meta.glob<object>('../icons/*.json', { eager: true, import: 'default' });

export const catalog = files['../icons/catalog.json'] as {
  name: string;
  interaction: Interaction;
}[];

export const icon = (name: string): Animation => {
  const entry = catalog.find((item) => item.name === name);
  if (!entry) throw new Error(`Unknown icon ${name}`);
  return { animationData: files[`../icons/${name}.json`], interaction: entry.interaction };
};
