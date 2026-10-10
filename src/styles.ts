import { useSyncExternalStore } from 'react';

const STYLE_ID = 'useanimations-styles';

// Recolors the icon's ink: dark strokes and black fills. White strokes are knockouts behind slashes
// (e.g. eye-off), and mask paths use hex colors, so both keep their colors. `:where()` keeps the
// specificity at zero, so any CSS of yours (e.g. `.icon path { stroke: red }`) wins.
const css =
  ':where([data-useanimations] path[stroke^="rgb"]:not([stroke="rgb(255,255,255)"])){stroke:var(--ua-stroke,currentColor)}' +
  ':where([data-useanimations] path[fill="rgb(0,0,0)"]){fill:var(--ua-fill,var(--ua-stroke,currentColor))}';

export const injectStyles = (doc: Document) => {
  if (doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  doc.head.appendChild(style);
};

const QUERY = '(prefers-reduced-motion: reduce)';
const hasMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const subscribe = (onChange: () => void) => {
  if (!hasMatchMedia()) return () => {};
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

export const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribe,
    () => hasMatchMedia() && window.matchMedia(QUERY).matches,
    () => false
  );
