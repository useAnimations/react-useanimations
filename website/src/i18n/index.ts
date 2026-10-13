// Messages of a language: t(locale).hubs.category.title, etc.
import { type Locale, localeOf } from './locales';
import type { Messages } from './messages/en';

export type { Messages };
export * from './locales';

const MESSAGES = import.meta.glob<Messages>('./messages/*/index.ts', {
  eager: true,
  import: 'messages',
});

export const t = (locale: Locale | string): Messages => {
  const code = typeof locale === 'string' ? locale : locale.code;
  const messages = MESSAGES[`./messages/${localeOf(code).code}/index.ts`];
  if (!messages) throw new Error(`i18n: no messages for "${code}"`);
  return messages;
};
