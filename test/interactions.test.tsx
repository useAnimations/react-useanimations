// Micro-interactions with the real player and real input: Playwright moves the mouse and clicks.
import { render } from '@testing-library/react';
import { userEvent } from 'vite-plus/test/browser';
import { afterEach, describe, expect, it } from 'vite-plus/test';

import UseAnimations from '../src';
import { catalog, icon } from './icons';

// What is drawn: the SVG without hidden layers (they keep the attributes of their last frame).
const frame = (element: Element) => {
  const svg = element.querySelector('svg')?.cloneNode(true) as SVGSVGElement | undefined;
  svg?.querySelectorAll('[display="none"]').forEach((hidden) => hidden.remove());
  return svg?.innerHTML ?? '';
};

const nextFrames = () =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

const changes = async (element: Element, from: string, timeout = 2000) => {
  const start = performance.now();
  while (performance.now() - start < timeout) {
    await nextFrames();
    if (frame(element) !== from) return true;
  }
  return false;
};

const settles = async (element: Element, timeout = 4000) => {
  const start = performance.now();
  let last = frame(element);
  while (performance.now() - start < timeout) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const current = frame(element);
    if (current === last) return current;
    last = current;
  }
  throw new Error('the animation did not stop');
};

const mount = async (name: string) => {
  const { container } = render(<UseAnimations animation={icon(name)} size={48} />);
  const element = container.querySelector('[data-useanimations]') as HTMLElement;
  await expect.poll(() => element.querySelector('svg path')).not.toBeNull();
  return element;
};

// The element under the mouse: moved away after each test, so the next icon doesn't mount under it.
let pointed: HTMLElement | undefined;
const hover = (element: HTMLElement) => userEvent.hover((pointed = element));
const click = (element: HTMLElement) => userEvent.click((pointed = element));

afterEach(async () => {
  if (pointed) await userEvent.unhover(pointed);
  pointed = undefined;
});

describe('every icon plays its micro-interaction', () => {
  it.each(catalog)('$name ($interaction)', async ({ name, interaction }) => {
    const element = await mount(name);
    const still = frame(element);
    if (interaction === 'loop') {
      expect(await changes(element, still)).toBe(true);
      return;
    }
    // Nothing plays before the user interacts.
    await nextFrames();
    expect(frame(element)).toBe(still);
    await (interaction.startsWith('hover') ? hover(element) : click(element));
    expect(await changes(element, still)).toBe(true);
  });
});

describe('micro-interactions return to their start', () => {
  it('hover plays forward on enter and back on leave', async () => {
    const element = await mount('archive');
    const still = frame(element);
    await hover(element);
    expect(await settles(element)).not.toBe(still);
    await userEvent.unhover(element);
    expect(await settles(element)).toBe(still);
  });

  it('hover-loop finishes its cycle after the mouse leaves', async () => {
    const element = await mount('github');
    const still = frame(element);
    await hover(element);
    expect(await changes(element, still)).toBe(true);
    await userEvent.unhover(element);
    expect(await settles(element)).toBe(still);
  });

  it('click-toggle switches to its end state and back', async () => {
    const element = await mount('checkBox');
    const still = frame(element);
    await click(element);
    const checked = await settles(element);
    expect(checked).not.toBe(still);
    await click(element);
    expect(await settles(element)).toBe(still);
  });

  it('click-replay plays again on every click', async () => {
    const element = await mount('download');
    const still = frame(element);
    await click(element);
    expect(await changes(element, still)).toBe(true);
    const end = await settles(element);
    await click(element);
    expect(await changes(element, end)).toBe(true);
  });
});
