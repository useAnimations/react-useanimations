import React, { StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vite-plus/test';

import UseAnimations from '../src';
import { catalog, icon } from './icons';

const error = icon('error');
const menu2 = icon('menu2');
const twitter = icon('twitter');

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

describe('icon set', () => {
  it.each(catalog)('$name renders', async ({ name }) => {
    const { container } = render(<UseAnimations animation={icon(name)} />);
    await waitFor(() => expect(container.querySelector('svg path')).not.toBeNull());
  });
});
