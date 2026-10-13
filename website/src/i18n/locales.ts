// The languages of the site. English lives at the root; every other language has a path prefix
// and translates the home page, the documentation, the licence page and the collection hubs. Icon
// pages stay English. A language is built only when it's live, so an unfinished translation never
// reaches a sitemap, an hreflang link or Google; I18N_PREVIEW previews them (see BUILT).

export type LocaleCode =
  | 'en'
  | 'zh'
  | 'es'
  | 'pt-br'
  | 'de'
  | 'fr'
  | 'ja'
  | 'ko'
  | 'cs'
  | 'vi'
  | 'id'
  | 'tr'
  | 'ru';

export type Locale = {
  code: LocaleCode;
  /** hreflang and <html lang>, e.g. 'pt-BR'. */
  hreflang: string;
  /** Path prefix, '' for English. */
  prefix: string;
  /** The language's own name, for the language switcher. */
  name: string;
  /** og:locale, e.g. 'pt_BR'. */
  ogLocale: string;
  /** Search result limits: CJK characters are wider, so fewer of them fit. */
  maxTitle: number;
  maxDescription: number;
  /** Rollout wave (see the GSC monitor); live languages are built and indexed. */
  wave: number;
  live: boolean;
};

const locale = (
  code: LocaleCode,
  hreflang: string,
  name: string,
  ogLocale: string,
  wave: number,
  live: boolean,
  cjk = false
): Locale => ({
  code,
  hreflang,
  prefix: code === 'en' ? '' : `/${code}`,
  name,
  ogLocale,
  maxTitle: cjk ? 32 : 60,
  maxDescription: cjk ? 80 : 155,
  wave,
  live,
});

export const LOCALES: Locale[] = [
  locale('en', 'en', 'English', 'en_US', 0, true),
  locale('zh', 'zh-Hans', '简体中文', 'zh_CN', 0, true, true),
  locale('es', 'es', 'Español', 'es_ES', 1, false),
  locale('pt-br', 'pt-BR', 'Português (Brasil)', 'pt_BR', 1, false),
  locale('de', 'de', 'Deutsch', 'de_DE', 1, false),
  locale('fr', 'fr', 'Français', 'fr_FR', 1, false),
  locale('ja', 'ja', '日本語', 'ja_JP', 2, false, true),
  locale('ko', 'ko', '한국어', 'ko_KR', 2, false, true),
  locale('cs', 'cs', 'Čeština', 'cs_CZ', 2, false),
  locale('vi', 'vi', 'Tiếng Việt', 'vi_VN', 3, false),
  locale('id', 'id', 'Bahasa Indonesia', 'id_ID', 3, false),
  locale('tr', 'tr', 'Türkçe', 'tr_TR', 3, false),
  locale('ru', 'ru', 'Русский', 'ru_RU', 3, false),
];

// I18N_PREVIEW=1 builds every language, I18N_PREVIEW=de,cs the live ones plus those.
const preview = (process.env.I18N_PREVIEW ?? '').split(',').filter(Boolean);

/** Languages that are built: the live ones plus any previewed. */
export const BUILT = LOCALES.filter(
  (l) => l.live || preview.includes('1') || preview.includes(l.code)
);
/** Built languages other than English: the [locale] routes. */
export const TRANSLATED = BUILT.filter((l) => l.code !== 'en');

export const EN = LOCALES[0];

export const localeOf = (code: string): Locale => {
  const found = LOCALES.find((l) => l.code === code);
  if (!found) throw new Error(`i18n: no locale "${code}"`);
  return found;
};

/** A site path in a language: ('/categories', de) -> '/de/categories', ('/', de) -> '/de', ('/#icons', de) -> '/de#icons'. */
export const localize = (path: string, l: Locale): string => {
  if (!l.prefix || !path.startsWith('/')) return path;
  if (path === '/') return l.prefix;
  if (path.startsWith('/#')) return l.prefix + path.slice(1);
  return l.prefix + path;
};

/** The English path of a localized one: '/de/categories' -> '/categories', '/de' -> '/'. */
export const unlocalize = (path: string): { locale: Locale; path: string } => {
  for (const l of LOCALES) {
    if (!l.prefix) continue;
    if (path === l.prefix) return { locale: l, path: '/' };
    if (path.startsWith(`${l.prefix}/`)) return { locale: l, path: path.slice(l.prefix.length) };
  }
  return { locale: EN, path };
};

/**
 * hreflang -> path for a translated page in every built language, plus x-default (English).
 * Pages that exist only in English have no alternates.
 */
export const alternatesOf = (path: string): Record<string, string> =>
  Object.fromEntries([...BUILT.map((l) => [l.hreflang, localize(path, l)]), ['x-default', path]]);
