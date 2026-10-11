import { codeToHtml } from 'shiki';

/**
 * Code highlighted for both themes; global.css picks the colors of the current one. The light theme
 * is the high-contrast one: github-light's reds and orange fall below 4.5:1 on the code background.
 */
export const highlight = (code: string, lang: string) =>
  codeToHtml(code, {
    lang,
    themes: { light: 'github-light-high-contrast', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });
