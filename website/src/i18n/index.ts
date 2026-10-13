// Messages of a language: t(locale).hubs.category.title, etc. Only built languages are loaded.
import { BUILT, type Locale, localeOf } from './locales';
import type { Messages } from './messages/en';

export type { Messages };
export * from './locales';

const LOADERS = import.meta.glob<Messages>('./messages/*/index.ts', { import: 'messages' });

const MESSAGES = new Map<string, Messages>(
  await Promise.all(
    BUILT.map(async (l): Promise<[string, Messages]> => {
      const load = LOADERS[`./messages/${l.code}/index.ts`];
      if (!load) throw new Error(`i18n: no messages for "${l.code}"`);
      return [l.code, await load()];
    })
  )
);

export const t = (locale: Locale | string): Messages => {
  const code = typeof locale === 'string' ? locale : locale.code;
  const messages = MESSAGES.get(localeOf(code).code);
  if (!messages) throw new Error(`i18n: "${code}" is not built`);
  return messages;
};
