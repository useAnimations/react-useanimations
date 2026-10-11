import { useSyncExternalStore } from 'react';

const STYLE_ID = 'useanimations-styles';

// Recolors the icon's ink: dark strokes and black fills. White strokes and fills are knockouts that
// show the background through the icon (the gap next to a slash in eye-off, the check in download's
// box, the ring around notification3's badge): they take `--ua-knockout`, or `Canvas`, which is white
// on light pages and dark with `color-scheme: dark`. Mask paths use hex colors, so they keep theirs.
// `:where()` keeps the specificity at zero, so any CSS of yours (e.g. `.icon path { stroke: red }`)
// wins.
const css =
  ':where([data-useanimations] path[stroke^="rgb"]:not([stroke="rgb(255,255,255)"])){stroke:var(--ua-stroke,currentColor)}' +
  ':where([data-useanimations] path[fill="rgb(0,0,0)"]){fill:var(--ua-fill,var(--ua-stroke,currentColor))}' +
  ':where([data-useanimations] path[stroke="rgb(255,255,255)"]){stroke:var(--ua-knockout,Canvas)}' +
  ':where([data-useanimations] path[fill="rgb(255,255,255)"]){fill:var(--ua-knockout,Canvas)}';

/** Adds the stylesheet once per document, or once per shadow root for icons inside one. */
export const injectStyles = (element: Element): void => {
  const doc = element.ownerDocument;
  const root = element.getRootNode();
  // Duck-typed (11 is DOCUMENT_FRAGMENT_NODE), so shadow roots of other windows count too.
  const shadow = root.nodeType === 11 && 'host' in root ? (root as ShadowRoot) : null;
  if ((shadow ?? doc).getElementById(STYLE_ID)) return;
  const style = doc.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  (shadow ?? doc.head).appendChild(style);
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

export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => hasMatchMedia() && window.matchMedia(QUERY).matches,
    () => false
  );
