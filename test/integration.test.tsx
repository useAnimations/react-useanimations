import React, { StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UseAnimations from '../src';
import icons from '../src/icons.json';
import error from '../src/lib/error';
import menu2 from '../src/lib/menu2';
import twitter from '../src/lib/twitter';

// Uses the real player.
describe('with the player', () => {
  it('renders exactly one <svg> in StrictMode (#68, #84)', async () => {
    const { container } = render(
      <StrictMode>
        <UseAnimations animation={menu2} strokeColor="red" />
      </StrictMode>
    );
    await waitFor(() => expect(container.querySelectorAll('svg')).toHaveLength(1));
  });

  it('renders icons that use expressions', async () => {
    const { container } = render(
      <>
        <UseAnimations animation={error} />
        <UseAnimations animation={twitter} />
      </>
    );
    await waitFor(() => expect(container.querySelectorAll('svg path')).not.toHaveLength(0));
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });
});

describe('icon modules', () => {
  it.each(icons as { name: string; interaction: string }[])(
    'lib/$name exports its animation',
    async ({ name, interaction }) => {
      const { default: animation } = await import(`../src/lib/${name}/index.ts`);
      expect(animation.interaction).toBe(interaction);
      expect(animation.animationData).toHaveProperty('layers');
    }
  );
});
