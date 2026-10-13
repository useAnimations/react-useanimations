// Per-icon search copy (titles, descriptions, intros, FAQs), related icons and shared JSON-LD
// nodes. Everything is derived from catalog data, and the template for an icon is picked by a
// stable hash of its id, so pages differ from each other and stay the same between builds.
import { CATEGORIES, type Icon, icons, INTERACTIONS, SITE } from './icons';
import { GITHUB, NPM } from './site';
import { BUILT } from '../i18n/locales';
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
// Synonyms count too, so 'heart' (like, favorite) meets 'thumb up' (like) and 'star' (favorite).
const terms = new Map(
  icons.map((icon) => [
    icon.id,
    new Set(
      [...meaningfulKeywords(icon), ...words(icon.title), ...synonyms(icon)].filter(
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

/**
 * Up to n related icons: the variant family, then the most shared terms, then other icons of the
 * category with the same interaction, in an order of their own per icon (not the site order, which
 * would give every icon of a category the same fallback list).
 */
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
  const shuffle = (other: Icon) => hash(icon.id + other.id);
  const sameCategory = icons
    .filter((other) => other.category === icon.category)
    .toSorted(
      (a, b) =>
        Number(b.interaction === icon.interaction) - Number(a.interaction === icon.interaction) ||
        shuffle(a) - shuffle(b)
    );
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

/**
 * Two or three sentences for the top of an icon page, specific to the icon. `aka: false` leaves out
 * the other names, for pages that list them anyway.
 */
export const iconIntro = (icon: Icon, { aka: withAka = true } = {}): string => {
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
  const aka = withAka ? synonyms(icon).slice(0, 4) : [];
  return [first, second, aka.length ? `Also known as ${list(aka)}.` : ''].filter(Boolean).join(' ');
};

export type Faq = { question: string; answer: string }[];

// The interaction a user may want instead, for the "can it play on…" question.
const ALTERNATIVE: Partial<Record<Icon['interaction'], [Icon['interaction'], string]>> = {
  loop: ['hover-loop', 'loop only while hovered'],
  'click-replay': ['hover-replay', 'play on hover'],
  hover: ['click-replay', 'play on click'],
  'hover-replay': ['click-replay', 'play on click'],
  'hover-loop': ['loop', 'loop all the time'],
};

/** How the interaction behaves at its edges: what the page's facts and code don't say. */
const behaviourFaq = (icon: Icon): Faq[number] => {
  const t = icon.title;
  const time = seconds(icon.durationMs);
  const touch = pick(
    icon,
    [
      'Keyboard focus plays it as well; a tap on a touch screen does not.',
      'Taps on touch screens are ignored, but keyboard focus plays it.',
    ],
    'touch'
  );
  switch (icon.interaction) {
    case 'click-toggle': {
      const s = states(icon);
      return {
        question: s.length
          ? `Can my app decide whether ${t} shows ${s[0]} or ${s[1]}?`
          : pick(icon, [
              `How do I keep the ${t} icon in sync with my own state?`,
              `Can ${t} be a controlled toggle?`,
            ]),
        answer: `Make it controlled: pass active and flip it in onClick, e.g. active={on} onClick={() => setOn(!on)}. true plays to the last frame and false back to the first; an icon that mounts with active already true starts there without animating, and with reduced motion it jumps instead of playing.`,
      };
    }
    case 'click-replay':
      return {
        question: pick(icon, [
          `What happens if ${t} is clicked again before it finishes?`,
          `Do fast clicks on ${t} queue up?`,
        ]),
        answer: `No queue: every click restarts the ${time} run from the first frame. With reduced motion preferred, clicks still reach your onClick but the icon stays still.`,
      };
    case 'hover':
      return {
        question: pick(icon, [
          `What does ${t} do when the pointer leaves halfway?`,
          `Does ${t} finish its animation after mouse leave?`,
        ]),
        answer: `It reverses from the frame it reached back to the start, so a quick pass of the pointer gives a short nudge rather than the full ${time}. ${touch}`,
      };
    case 'hover-replay':
      return {
        question: pick(icon, [
          `Does ${t} restart when the pointer comes back mid-animation?`,
          `Why doesn't ${t} restart on every mouse enter?`,
        ]),
        answer: `A run that has started plays its ${time} to the end, so moving in and out quickly doesn't make it stutter; the next enter after that plays it again. ${touch}`,
      };
    case 'hover-loop':
      return {
        question: pick(icon, [
          `Does ${t} stop as soon as the pointer leaves?`,
          `Where does ${t} stop after hover?`,
        ]),
        answer: `It finishes the cycle it is in (at most ${time}) and then rests on its first frame, so it never freezes mid-motion. ${touch}`,
      };
  }
  // loop
  const blank = icon.preview !== icon.firstFrame;
  return {
    question: pick(icon, [`Does the ${t} animation ever stop?`, `Can I pause the ${t} loop?`]),
    answer: `It pauses by itself while scrolled out of view and stays on its first frame when reduced motion is preferred or autoplay={false} is set${
      blank
        ? '. That first frame is empty for this icon, so keep a text label such as "Loading…" next to it'
        : ''
    }. To show it only while something is pending, render it conditionally.`,
  };
};

/** Labels and roles, which differ between buttons, decorations and loaders. */
const accessibilityFaq = (icon: Icon): Faq[number] => {
  const t = icon.title;
  if (icon.interaction.startsWith('click')) {
    const pressed = icon.interaction === 'click-toggle' ? ' aria-pressed={on}' : '';
    return {
      question: pick(icon, [
        `How do I make ${t} an accessible button?`,
        `Should the ${t} icon be a <button>?`,
      ]),
      answer: `Put its events on a real button with the render prop: render={(events, icon) => <button aria-label="${t}"${pressed} {...events}><span {...icon} /></button>}. The animation itself stays aria-hidden${pressed ? ', and aria-pressed tells screen readers which state is on' : ''}.`,
    };
  }
  if (icon.interaction === 'loop' && icon.category === 'Loading') {
    return {
      question: `How do screen readers announce the ${t} loader?`,
      answer: `They don't unless you pass aria-label="Loading…", which gives it role="img". Often better: keep it hidden and set aria-busy="true" on the region that is loading.`,
    };
  }
  return {
    question: pick(icon, [`Will screen readers read the ${t} icon?`, `Is ${t} decorative?`]),
    answer: `By default it is aria-hidden. Pass aria-label="${t}" to announce it as an image, or leave it hidden when the link or button it sits in has its own text.`,
  };
};

/** Two or three questions picked by the icon's interaction, category, states and drawing. */
export const iconFaq = (icon: Icon): Faq => {
  const faq = [behaviourFaq(icon), accessibilityFaq(icon)];
  const twoTone = icon.lottie.includes('"ty":"fl"') && icon.lottie.includes('"ty":"st"');
  const alternative = ALTERNATIVE[icon.interaction];
  if (twoTone) {
    faq.push({
      question: pick(icon, [
        `Can ${icon.title} use two colors?`,
        `Can I color the fill of ${icon.title} separately?`,
      ]),
      answer: `Yes: strokeColor sets the outlines and fillColor the filled parts, e.g. strokeColor="#e5484d" fillColor="#ffd1d1"; both follow the text color by default.`,
    });
  } else if (alternative) {
    const [interaction, phrase] = alternative;
    faq.push({
      question: `Can ${icon.title} ${phrase} instead?`,
      answer: `Yes: pass interaction="${interaction}". It then ${lowerFirst(INTERACTIONS[interaction].description)}`,
    });
  }
  return faq;
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
  inLanguage: BUILT.length > 1 ? BUILT.map((l) => l.hreflang) : 'en',
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
