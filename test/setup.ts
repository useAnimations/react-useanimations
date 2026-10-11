import { cleanup } from '@testing-library/react';
import { afterEach } from 'vite-plus/test';

// Keeps rendered icons away from the browser's resting mouse position (0, 0), which would hover them.
document.body.style.margin = '100px';

afterEach(cleanup);
