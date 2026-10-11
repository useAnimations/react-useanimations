import { codeToHtml } from 'shiki';

/** Code highlighted for both themes; global.css picks the colors of the current one. */
export const highlight = (code: string, lang: string) =>
  codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });
