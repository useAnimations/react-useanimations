// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it } from 'vitest';

import UseAnimations from '../src';
import heart from '../src/lib/heart';

it('renders on the server without touching the DOM (#86)', () => {
  expect(typeof document).toBe('undefined');
  const html = renderToString(<UseAnimations animation={heart} size={32} strokeColor="red" />);
  expect(html).toBe('<div style="overflow:hidden;outline:none;width:32px;height:32px"></div>');
});
