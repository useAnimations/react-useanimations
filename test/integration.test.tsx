import React, { StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UseAnimations from '../src';
import { interactions } from '../src/icons';
import error from '../src/lib/error';
import menu2 from '../src/lib/menu2';

// Uses the real lottie-web players.
describe('with lottie-web', () => {
  it('renders exactly one <svg> in StrictMode (#68, #84)', async () => {
    const { container } = render(
      <StrictMode>
        <UseAnimations animation={menu2} strokeColor="red" />
      </StrictMode>
    );
    await waitFor(() => expect(container.querySelectorAll('svg')).toHaveLength(1));
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg.id).toMatch(/^useanimations-\d+$/);
  });

  it('renders icons that need the full player', async () => {
    const { container } = render(<UseAnimations animation={error} />);
    await waitFor(() => expect(container.querySelector('svg path')).not.toBeNull());
  });
});

describe('icon modules', () => {
  it.each(Object.keys(interactions))('lib/%s exports its animation', async (key) => {
    const { default: animation } = await import(`../src/lib/${key}/index.ts`);
    expect(animation.animationKey).toBe(key);
    expect(animation.animationData).toHaveProperty('layers');
  });
});
