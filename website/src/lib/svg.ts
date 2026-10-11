// Smaller markup for the static first frames the renderer draws at build time. The renderer writes
// every attribute a live animation may change later (opacity="1", identity transforms, wrapper
// groups, a clip path the size of the artboard); a still frame needs none of them. The result
// draws the same pixels with a fraction of the bytes and DOM nodes, which matters on pages that
// show hundreds of icons.
import { DOMParser } from 'linkedom';

const DEFAULTS: Record<string, string[]> = {
  opacity: ['1'],
  'fill-opacity': ['1'],
  'stroke-opacity': ['1'],
  display: ['inline'],
  transform: ['matrix(1,0,0,1,0,0)'],
  preserveAspectRatio: ['xMidYMid meet'],
};

/** Rounds the decimals of numbers in text: round('16.743000000000002', 3) -> '16.743'. */
const round = (text: string, digits: number) =>
  text.replace(/-?\d*\.\d+(?:e-?\d+)?/gi, (n) => String(Number(Number(n).toFixed(digits))));

const insideClipPath = (el: Element) => !!el.parentElement?.closest('clipPath');

export const compactSvg = (markup: string): string => {
  // Parsed as XML: an HTML parser would lowercase clipPath and viewBox.
  const svg = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
  if (svg?.tagName !== 'svg') return markup;

  for (const el of [svg, ...svg.querySelectorAll('*')]) {
    for (const [name, values] of Object.entries(DEFAULTS)) {
      if (values.includes(el.getAttribute(name) ?? '')) el.removeAttribute(name);
    }
    const d = el.getAttribute('d');
    // Path data to 3 decimals, as drawn; transforms keep their precision (scales multiply errors).
    if (d !== null) el.setAttribute('d', round(d.trim(), 3));
    const transform = el.getAttribute('transform');
    if (transform !== null) el.setAttribute('transform', round(transform, 6));
  }

  // Hidden on the first frame and never shown in a still image. Opacity is ignored in clip paths.
  for (const el of svg.querySelectorAll('[display="none"], [opacity="0"]')) {
    if (el.getAttribute('display') === 'none' || !insideClipPath(el)) el.remove();
  }
  // Empty paths (shapes trimmed to nothing on this frame) draw nothing anywhere.
  for (const el of svg.querySelectorAll('path[d="M0 0"]')) el.remove();

  // Stroke settings that every stroked shape shares are inherited from the <svg> instead.
  const stroked = [...svg.querySelectorAll('[stroke]')];
  for (const name of ['stroke-width', 'stroke-linejoin', 'stroke-linecap']) {
    const values = new Set(stroked.map((el) => el.getAttribute(name)));
    const [value] = values;
    if (values.size !== 1 || !value) continue;
    for (const el of stroked) el.removeAttribute(name);
    svg.setAttribute(name, value);
  }

  // A clip path that is exactly the artboard clips nothing: the <svg> already clips to it.
  const [, , width, height] = (svg.getAttribute('viewBox') ?? '').split(/\s+/);
  for (const clip of svg.querySelectorAll('clipPath')) {
    const shapes = [...clip.children];
    const rect = shapes[0];
    const artboard =
      shapes.length === 1 &&
      rect.tagName === 'rect' &&
      Number(rect.getAttribute('x') ?? 0) === 0 &&
      Number(rect.getAttribute('y') ?? 0) === 0 &&
      rect.getAttribute('width') === width &&
      rect.getAttribute('height') === height &&
      !rect.getAttribute('transform');
    // Only for the outermost groups: nested ones may sit under a transform.
    const users = [...svg.querySelectorAll(`[clip-path="url(#${clip.id})"]`)];
    if (!artboard || users.some((user) => user.parentElement?.closest('[transform]'))) continue;
    for (const user of users) user.removeAttribute('clip-path');
    clip.remove();
  }
  for (const defs of svg.querySelectorAll('defs')) if (!defs.children.length) defs.remove();

  // Groups without attributes are only wrappers; a group with nothing but a transform and one
  // child that has none passes the transform down. Innermost first, so chains collapse.
  for (const g of [...svg.querySelectorAll('g')].toReversed()) {
    const names = g.getAttributeNames();
    const only = g.children.length === 1 ? g.children[0] : undefined;
    if (
      names.length === 1 &&
      names[0] === 'transform' &&
      only &&
      !only.hasAttribute('transform') &&
      !only.hasAttribute('clip-path') &&
      !only.hasAttribute('mask')
    ) {
      only.setAttribute('transform', g.getAttribute('transform') ?? '');
      g.removeAttribute('transform');
    }
    if (!g.getAttributeNames().length) g.replaceWith(...g.childNodes);
    else if (!g.children.length) g.remove();
  }

  return svg.outerHTML.replace(/>\s+</g, '><').replace(/ \/>/g, '/>');
};
