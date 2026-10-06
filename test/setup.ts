import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom has no canvas; lottie-web only needs a stub to initialise.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => ({
    fillRect() {},
    measureText: () => ({ width: 0 }),
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}

afterEach(cleanup);
