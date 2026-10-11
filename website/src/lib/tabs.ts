/** Arrow keys move between tabs and wrap around; returns the index of the next tab, or undefined. */
export const tabFromKey = (key: string, index: number, count: number): number | undefined => {
  const step = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0;
  return step ? (index + step + count) % count : undefined;
};
