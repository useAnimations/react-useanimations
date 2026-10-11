// Per-icon search copy (titles, descriptions, intros, FAQs), related icons and shared JSON-LD
// nodes. Everything is derived from catalog data, and the template for an icon is picked by a
// stable hash of its id, so pages differ from each other and stay the same between builds.
import {
  CATEGORIES,
  type Icon,
  icons,
  INTERACTIONS,
  libImport,
  shadcnCommand,
  SITE,
  urls,
} from './icons';
import { GITHUB, NPM } from './site';
import { CATEGORY_META, INTERACTION_META } from './taxonomy';

export const TITLE_SUFFIX = ' — useAnimations';
export const MAX_TITLE = 60;
export const MAX_DESCRIPTION = 155;

/** FNV-1a: a small stable hash, so template choices don't change between builds. */
const hash = (text: string) => {
  let h = 0x811c9dc5;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 0x01000193);
  return h >>> 0;
};
const pick = <T>(icon: Icon, items: T[], salt = '') => items[hash(icon.id + salt) % items.length];

const lowerFirst = (text: string) => text[0].toLowerCase() + text.slice(1);
const seconds = (ms: number) => `${Number((ms / 1000).toFixed(2))} s`;
const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

const categoryNames = new Set(CATEGORIES.map((name) => name.toLowerCase()));
const words = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
const squash = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');
/** 'menu-v2' -> 'menu', 'edit-2' -> 'edit'. */
const baseId = (id: string) => id.replace(/-v\d+$|-\d+$/, '');
const isNoise = (word: string) => word.length < 2 || /^\d+$/.test(word) || /^v\d+$/.test(word);

/**
 * Keywords that add something to the title: no category names, no words of the title itself,
 * no compounds of them ('edit-2', 'loadingv4') and no noise ('2', 'x', single characters).
 */
export const meaningfulKeywords = (icon: Icon): string[] => {
  const titleWords = new Set(words(icon.title));
  const own = new Set([squash(icon.title), squash(icon.id), squash(icon.name)]);
  return icon.keywords.filter((keyword) => {
    const k = keyword.toLowerCase();
    if (categoryNames.has(k) || isNoise(k) || own.has(squash(k))) return false;
    return !words(k).every((word) => titleWords.has(word) || isNoise(word));
  });
};

// Groups of terms people use for the same icon; any term finds the others.
const SYNONYM_GROUPS = [
  ['menu', 'hamburger menu', 'burger menu', 'navigation drawer'],
  ['trash', 'bin', 'delete', 'garbage', 'recycle bin'],
  ['visibility', 'eye', 'show password', 'hide password', 'password toggle'],
  ['loading', 'spinner', 'loader', 'progress indicator', 'preloader'],
  ['notification', 'bell', 'alarm', 'reminder'],
  ['heart', 'like', 'favorite', 'love'],
  ['search', 'magnifier', 'magnifying glass', 'find'],
  ['settings', 'cog', 'gear', 'preferences'],
  ['star', 'rating', 'favorite'],
  ['bookmark', 'save for later', 'ribbon'],
  ['checkmark', 'tick', 'done', 'success'],
  ['check', 'tick', 'done'],
  ['plus', 'add', 'create', 'new'],
  ['x', 'close', 'cancel', 'dismiss'],
  ['download', 'save file', 'export'],
  ['upload', 'import', 'attach file'],
  ['refresh', 'reload', 'sync'],
  ['edit', 'pencil', 'write', 'rename'],
  ['copy', 'duplicate', 'clipboard'],
  ['share', 'send to'],
  ['mail', 'email', 'envelope', 'inbox'],
  ['user', 'profile', 'avatar', 'account'],
  ['users', 'team', 'group', 'people'],
  ['home', 'house', 'start page'],
  ['info', 'information', 'about'],
  ['help', 'question mark', 'support'],
  ['alert', 'warning', 'caution', 'attention'],
  ['error', 'failure', 'danger'],
  ['lock', 'padlock', 'secure', 'private'],
  ['key', 'password', 'access'],
  ['link', 'chain', 'url', 'hyperlink'],
  ['microphone', 'mic', 'voice input'],
  ['volume', 'speaker', 'sound', 'audio'],
  ['play-pause', 'play', 'pause', 'media control'],
  ['camera', 'photo', 'snapshot'],
  ['video', 'video call', 'webcam'],
  ['calendar', 'date picker', 'schedule'],
  ['clock', 'time', 'watch'],
  ['shopping-cart', 'cart', 'basket', 'add to cart'],
  ['shopping-bag', 'bag', 'purchase'],
  ['credit-card', 'payment', 'card'],
  ['dollar-sign', 'price', 'money', 'currency'],
  ['tag', 'label', 'price tag'],
  ['truck', 'shipping', 'delivery'],
  ['map-pin', 'location pin', 'marker', 'place'],
  ['globe', 'world', 'language', 'earth'],
  ['scroll-down', 'scroll indicator', 'mouse scroll', 'scroll cue'],
  ['more-horizontal', 'more', 'ellipsis', 'kebab menu', 'meatballs menu'],
  ['more-vertical', 'more', 'ellipsis', 'kebab menu', 'overflow menu'],
  ['maximize', 'fullscreen', 'expand'],
  ['minimize', 'exit fullscreen', 'collapse'],
  ['filter', 'funnel', 'sort'],
  ['sun', 'light mode', 'day'],
  ['moon', 'dark mode', 'night'],
  ['log-in', 'sign in', 'login'],
  ['log-out', 'sign out', 'logout'],
  ['external-link', 'open in new tab', 'outbound link'],
  ['power', 'on/off', 'shutdown'],
  ['thumb-up', 'like', 'upvote', 'approve'],
  ['thumbs-down', 'dislike', 'downvote'],
  ['toggle', 'switch', 'toggle switch'],
  ['check-box', 'checkbox', 'tick box'],
  ['radio-button', 'radio', 'option button'],
  ['send', 'paper plane', 'submit'],
  ['twitter-x', 'x', 'x logo'],
  ['infinity', 'endless', 'infinite loop'],
  ['save', 'floppy disk'],
  ['award', 'badge', 'medal', 'achievement'],
  ['activity', 'pulse', 'heartbeat'],
  ['terminal', 'console', 'command line', 'cli'],
  ['code', 'brackets', 'embed'],
  ['zap', 'lightning', 'flash', 'bolt'],
  ['wifi', 'wireless', 'internet connection'],
];

/** Term -> other terms for the same thing, e.g. SYNONYMS.bin includes 'trash' and 'delete'. */
export const SYNONYMS: Record<string, string[]> = {};
for (const group of SYNONYM_GROUPS) {
  for (const term of group) {
    SYNONYMS[term] = [...new Set([...(SYNONYMS[term] ?? []), ...group])].filter((t) => t !== term);
  }
}

/**
 * Other names people search for, looked up by the icon's id and title; never the title itself.
 * Keywords are not looked up: they also name states ('close' on a menu), not just synonyms.
 */
export const synonyms = (icon: Icon): string[] => {
  const base = baseId(icon.id);
  const terms = new Set([base, icon.id, icon.title.toLowerCase()]);
  const title = icon.title.toLowerCase();
  const titleWords = new Set(words(icon.title));
  const found = new Set<string>();
  for (const term of terms) {
    for (const synonym of SYNONYMS[term] ?? []) {
      if (synonym === title || synonym === base || titleWords.has(synonym)) continue;
      found.add(synonym);
    }
  }
  return [...found];
};

const families = Map.groupBy(icons, (icon) => baseId(icon.id));

/** The other versions of the same icon (menu, menu-v2, menu-v3…), in site order. */
export const variantFamily = (icon: Icon): Icon[] =>
  (families.get(baseId(icon.id)) ?? []).filter((other) => other.id !== icon.id);

// Words that tie icons together: meaningful keywords plus title words, weighted by rarity (IDF)
// so 'arrow' or 'file' counts for less than 'password'.
const terms = new Map(
  icons.map((icon) => [
    icon.id,
    new Set(
      [...meaningfulKeywords(icon), ...words(icon.title)].filter(
        (t) => !isNoise(t) && !categoryNames.has(t)
      )
    ),
  ])
);
const documentFrequency = new Map<string, number>();
for (const set of terms.values()) {
  for (const term of set) documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
}
const idf = (term: string) => Math.log(icons.length / (documentFrequency.get(term) ?? 1));

/** Up to n related icons: the variant family, then the most shared terms, then the category. */
export const related = (icon: Icon, n = 12): Icon[] => {
  const mine = terms.get(icon.id) ?? new Set<string>();
  const scored = icons
    .filter((other) => other.id !== icon.id)
    .map((other) => {
      let score = 0;
      for (const term of terms.get(other.id) ?? []) if (mine.has(term)) score += idf(term);
      return { other, score };
    })
    .filter(({ score }) => score > 0)
    .toSorted(
      (a, b) =>
        b.score - a.score ||
        Number(b.other.category === icon.category) - Number(a.other.category === icon.category)
    )
    .map(({ other }) => other);
  const sameCategory = icons.filter((other) => other.category === icon.category);
  const result = new Set<Icon>();
  for (const other of [...variantFamily(icon), ...scored, ...sameCategory]) {
    if (result.size >= n) break;
    if (other.id !== icon.id) result.add(other);
  }
  return [...result];
};

// How each interaction plays, as a verb phrase: "The icon <phrase>."
const PLAYS: Record<Icon['interaction'], string> = {
  loop: 'loops continuously',
  'click-toggle': 'toggles between two states on click',
  'click-replay': 'replays on every click',
  hover: 'plays on hover and reverses on mouse leave',
  'hover-replay': 'plays once on hover',
  'hover-loop': 'loops while hovered',
};

/** State names of the static SVGs, e.g. ['eye-off', 'eye']; empty for a single state. */
const states = (icon: Icon) => {
  const names = Object.keys(icon.svgs);
  return names.length > 1 ? names : [];
};

const fit = (candidates: string[], max: number) =>
  candidates.find((candidate) => candidate.length <= max) ?? candidates.at(-1)!;

/**
 * The <title> of an icon page: always '<Title> animated icon', with the brand suffix when it fits
 * in 60 characters.
 */
export const iconTitle = (icon: Icon): string => {
  const t = icon.title;
  const label = INTERACTIONS[icon.interaction].label.toLowerCase();
  const [long, short] = pick(icon, [
    [`${t} animated icon for React & Lottie`, `${t} animated icon for React`],
    [`Free ${t} animated icon: SVG & Lottie`, `Free ${t} animated icon`],
    [`${t} animated icon (${label})`, `${t} animated icon, free`],
    [`${t} animated icon for React & shadcn`, `${t} animated icon, MIT`],
  ]);
  const plain = `${t} animated icon`;
  return fit(
    [long + TITLE_SUFFIX, short + TITLE_SUFFIX, plain + TITLE_SUFFIX, long, short, plain],
    MAX_TITLE
  );
};

/** The meta description of an icon page, at most 155 characters. */
export const iconDescription = (icon: Icon): string => {
  const t = icon.title;
  const plays = PLAYS[icon.interaction];
  const label = INTERACTIONS[icon.interaction].label.toLowerCase();
  const s = states(icon);
  const between = s.length === 2 ? ` between ${s[0]} and ${s[1]}` : '';
  const toggles =
    icon.interaction === 'click-toggle' && between ? `toggles${between} on click` : plays;
  const svg = Object.keys(icon.svgs).length ? ' and SVG' : '';
  const files = Object.keys(icon.svgs).length ? 'Lottie JSON or SVG' : 'Lottie JSON';
  const templates = [
    [
      `Free ${t} animated icon that ${toggles}. MIT-licensed for React, shadcn/ui, Lottie JSON${svg}.`,
      `Free ${t} animated icon that ${plays}. MIT-licensed for React, shadcn/ui and Lottie.`,
    ],
    [
      `${t} animated icon with a ${label} interaction for React and shadcn/ui. Download the ${files}, free under MIT.`,
      `${t} animated icon (${label}) for React and shadcn/ui. Free ${files}, MIT.`,
    ],
    [
      `Add the ${t} micro animation to React with react-useanimations or shadcn. It ${toggles}; free MIT Lottie${svg} files.`,
      `${t} micro animation for React and shadcn. It ${plays}; free MIT Lottie${svg}.`,
    ],
    [
      `MIT-licensed ${t} animated icon: ${toggles}. Use it in React or shadcn/ui, or get the ${files}.`,
      `MIT ${t} animated icon: ${plays}. For React, shadcn/ui and ${files}.`,
    ],
  ];
  return fit(pick(icon, templates), MAX_DESCRIPTION);
};

export type SeoIssue = {
  kind: 'duplicate-title' | 'duplicate-description' | 'title-length' | 'description-length';
  ids: string[];
  value: string;
};

/** Duplicate and over-long titles and descriptions; for logging at build time, not throwing. */
export const seoLint = (all: Icon[] = icons): SeoIssue[] => {
  const issues: SeoIssue[] = [];
  const check = (kind: 'title' | 'description', text: (icon: Icon) => string, max: number) => {
    const seen = new Map<string, string[]>();
    for (const icon of all) {
      const value = text(icon);
      seen.set(value, [...(seen.get(value) ?? []), icon.id]);
      if (value.length > max) issues.push({ kind: `${kind}-length`, ids: [icon.id], value });
    }
    for (const [value, ids] of seen) {
      if (ids.length > 1) issues.push({ kind: `duplicate-${kind}`, ids, value });
    }
  };
  check('title', iconTitle, MAX_TITLE);
  check('description', iconDescription, MAX_DESCRIPTION);
  return issues;
};

// Words that say nothing about a use case.
const STOPWORDS = new Set([
  'and',
  'the',
  'for',
  'with',
  'that',
  'into',
  'from',
  'buttons',
  'button',
]);
const stems = (text: string) =>
  words(text).filter((w) => w.length > 2 && !STOPWORDS.has(w) && !isNoise(w));
const sameStem = (a: string, b: string) =>
  a === b || (Math.min(a.length, b.length) >= 4 && (a.startsWith(b) || b.startsWith(a)));

/** The category or interaction use case that mentions the icon most, if any does. */
const bestUseCase = (icon: Icon): string | undefined => {
  const mine = [
    icon.title,
    baseId(icon.id),
    ...meaningfulKeywords(icon),
    ...synonyms(icon),
  ].flatMap(stems);
  const candidates = [
    ...CATEGORY_META[icon.category].useCases,
    ...INTERACTION_META[icon.interaction].useCases,
  ];
  const scored = candidates.map((useCase) => ({
    useCase,
    score: stems(useCase).filter((w) => mine.some((m) => sameStem(w, m))).length,
  }));
  const top = Math.max(...scored.map(({ score }) => score));
  if (top === 0) return undefined;
  return pick(
    icon,
    scored.filter(({ score }) => score === top).map(({ useCase }) => useCase),
    'use'
  );
};

/** Two or three sentences for the top of an icon page, specific to the icon. */
export const iconIntro = (icon: Icon): string => {
  const t = icon.title;
  const plays = PLAYS[icon.interaction];
  const time = seconds(icon.durationMs);
  const found = bestUseCase(icon);
  const useCase = found && lowerFirst(found);
  const peers = related(icon, 2).map((other) => other.title);
  const set = `the ${icon.category.toLowerCase()} set`;
  const first = useCase
    ? pick(icon, [
        `The ${t} animated icon ${plays} in ${time}, a good fit for ${useCase}.`,
        `${t} is a ${time} micro animation that ${plays}; use it for ${useCase}.`,
        `Use the ${t} icon for ${useCase}: it ${plays} and takes ${time}.`,
      ])
    : pick(icon, [
        `The ${t} animated icon ${plays} in ${time} and pairs with ${list(peers)} in ${set}.`,
        `${t} is a ${time} micro animation from ${set} that ${plays}, like ${list(peers)}.`,
      ]);
  const s = states(icon);
  const second = s.length
    ? `Its static SVGs cover the ${list(s)} states, so the resting icon still shows which one is active.`
    : INTERACTION_META[icon.interaction].example;
  const aka = synonyms(icon).slice(0, 4);
  return [first, second, aka.length ? `Also known as ${list(aka)}.` : ''].filter(Boolean).join(' ');
};

export type Faq = { question: string; answer: string }[];

/** Four questions and answers built from the icon's real data. */
export const iconFaq = (icon: Icon): Faq => {
  const interaction = INTERACTIONS[icon.interaction];
  const u = urls(icon);
  const kb = (Buffer.byteLength(icon.lottie) / 1024).toFixed(1);
  const svgs = u.svg.length
    ? ` and ${u.svg.length === 1 ? 'a static SVG' : `${u.svg.length} static SVGs (${list(Object.keys(icon.svgs))})`}`
    : '';
  return [
    {
      question: `What triggers the ${icon.title} animation?`,
      answer: `${interaction.label}: ${lowerFirst(interaction.description)} One cycle takes ${seconds(icon.durationMs)} at ${Number(icon.fps.toFixed(2))} fps.`,
    },
    {
      question: `Which files and sizes does the ${icon.title} icon come in?`,
      answer: `A Lottie JSON animation (${kb} kB, ${icon.width} × ${icon.height} px artboard)${svgs}, also bundled as a ZIP at ${u.zip}. It scales to any size; 24 or 32 px suits most interfaces.`,
    },
    {
      question: `How do I use the ${icon.title} icon in React?`,
      answer: `Install react-useanimations, add ${libImport(icon).replace(/;$/, '')} and render <UseAnimations animation={${icon.exportName}} size={32} />. The icon follows the text color and respects prefers-reduced-motion.`,
    },
    {
      question: `Can I add it with shadcn, and do I need lottie-web?`,
      answer: `Run ${shadcnCommand(icon)} to add the ${icon.component} component. React needs no extra player; outside React, ${icon.requiresFullPlayer ? "this icon needs lottie-web's full build because it uses expressions" : "lottie-web's light build is enough"}.`,
    },
  ];
};

/** One sentence on how `other` differs from `icon`: interaction, duration and states. */
export const variantNote = (icon: Icon, other: Icon): string => {
  const differences: string[] = [];
  if (other.interaction !== icon.interaction) differences.push(PLAYS[other.interaction]);
  if (Math.abs(other.durationMs - icon.durationMs) >= 50) {
    const faster = other.durationMs < icon.durationMs;
    differences.push(
      `is ${faster ? 'shorter' : 'longer'} at ${seconds(other.durationMs)} instead of ${seconds(icon.durationMs)}`
    );
  }
  // State names only matter for multi-state icons; a single SVG is named after the icon.
  const mine = states(icon);
  const theirs = states(other);
  if (theirs.join(',') !== mine.join(',')) {
    differences.push(
      theirs.length ? `has the ${list(theirs)} states` : 'has a single static state'
    );
  }
  return differences.length
    ? `${other.title} ${list(differences)}.`
    : `${other.title} has the same ${INTERACTIONS[other.interaction].label.toLowerCase()} interaction and timing with a different drawing.`;
};

// JSON-LD nodes shared across pages, linked by @id.
export const ORGANIZATION_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

const SOCIAL = [
  'https://x.com/useAnimations',
  'https://www.instagram.com/getuseanimations/',
  'https://www.facebook.com/useanimations/',
];

export const organizationNode = () => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'useAnimations',
  url: `${SITE}/`,
  logo: `${SITE}/logo.svg`,
  description: `Free, MIT-licensed animated icons for React, shadcn/ui, Lottie and SVG: ${icons.length} micro interactions that play on hover, click or loop.`,
  sameAs: [...SOCIAL, GITHUB, NPM],
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'useAnimations',
  url: `${SITE}/`,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
});

export const faqNode = (faq: Faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});
