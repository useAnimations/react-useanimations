// The hub pages: /icons, /categories, /interactions, /lottie-icons and /shadcn-animated-icons.
// Sentences with counts or lists are functions that get the facts and build the whole sentence.
// Strings ending in Html may contain <code>, <a> and <strong> tags; links are passed in.
import type { Interaction } from 'react-useanimations';
import type { Faq } from './hubs';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages = {
  /** /icons: every icon on one page, grouped by category. */
  icons: {
    /** <title> candidates, best first; the first that fits is used. */
    titles: (count: number) => [
      `All ${count} animated icons by category`,
      `All ${count} animated icons`,
    ],
    /** Meta description candidates, best first. */
    descriptions: (count: number, categories: number) => [
      `Every useAnimations icon on one page: ${count} free animated icons in ${categories} categories, for React, shadcn/ui, Lottie JSON and SVG. MIT licensed.`,
    ],
    /** Heading. */
    title: 'All animated icons',
    badge: (count: number) => `${count} icons · MIT licensed`,
    /** `browser` is the link to the searchable icon browser on the home page. */
    introHtml: (browser: string) =>
      `Every icon in the set, grouped by category. Open one for a live preview, its React and shadcn/ui code, and the Lottie JSON, SVG and ZIP downloads. To search by keyword and try the animations in place, use the ${link(browser, 'icon browser')}.`,
    /** Accessible name of the row of category links. */
    categoriesNav: 'Categories',
    /** Before the list of interaction links. */
    byInteraction: 'By interaction:',
    /** Link from a category section to its page; `name` is the category name, e.g. 'Navigation'. */
    categoryLink: (count: number, name: string) => `${count} ${name.toLowerCase()} icons →`,
  },

  /** /categories: the list of categories. */
  categories: {
    titles: (categories: number) => [
      `Animated icon categories: ${categories} collections`,
      'Animated icon categories',
    ],
    descriptions: (icons: number, categories: number) => [
      `Browse ${icons} free animated icons in ${categories} categories: navigation, action, media, loading, social media and more. For React, shadcn/ui and Lottie.`,
    ],
    /** Heading and page name. */
    title: 'Animated icon categories',
    badge: (icons: number, categories: number) => `${icons} icons · ${categories} categories`,
    /** `interactions` is the link to /interactions. */
    introHtml: (interactions: string) =>
      `Every useAnimations icon belongs to one category, from navigation arrows and media controls to loaders and social media logos. Open a category for all of its icons, where to use them and the code to add one, or browse by ${link(interactions, 'interaction')} instead.`,
    /** Icon count on each category card. */
    iconCount: (n: number) => `${n} icons`,
  },

  /** /interactions: the list of interactions (loop, click toggle, hover, ...). */
  interactions: {
    titles: [
      'Micro interactions: hover, click and loop icons',
      'Micro interactions for animated icons',
    ],
    descriptions: (icons: number, interactions: number) => [
      `${icons} animated icons in ${interactions} micro interactions: loop, click toggle, click replay, hover, hover replay and hover loop. With reduced-motion support.`,
    ],
    /** Heading and page name. */
    title: 'Animated icon interactions',
    badge: (interactions: number, icons: number) => `${interactions} interactions · ${icons} icons`,
    /** `interaction` is the name of a prop, not translated. */
    introHtml: `Every icon ships with the micro interaction it was designed for: it loops, toggles or replays on click, or plays on hover. The React component wires it up and respects reduced motion, and the <code class="font-mono text-base text-fg">interaction</code> prop switches any icon to another one.`,
    /** Icon count on each interaction card. */
    iconCount: (n: number) => `${n} icons`,
    chooseTitle: 'Choosing an interaction',
    /** When to use each interaction; `href` links to its page. `active` is a prop name. */
    chooseHtml: {
      loop: (href: string) =>
        `${strong('State that lasts')}, such as loading or an active alert: ${link(href, 'loop')}.`,
      'click-toggle': (href: string) =>
        `${strong('An on/off control')}, such as mute, menu or show password: ${link(href, 'click toggle')}, with ${code('active')} for controlled state.`,
      'click-replay': (href: string) =>
        `${strong('A one-shot action')}, such as send, save or refresh: ${link(href, 'click replay')}.`,
      hover: (href: string) =>
        `${strong('A hint of what a link opens')}: ${link(href, 'hover')}, which reverses when the pointer leaves.`,
      'hover-replay': (href: string) =>
        `${strong('Toolbars and lists people sweep across')}: ${link(href, 'hover replay')}, which finishes on its own.`,
      'hover-loop': (href: string) =>
        `${strong('Links that invite a longer look')}, such as social icons: ${link(href, 'hover loop')}.`,
    } as Record<Interaction, (href: string) => string>,
    motionTitle: 'Reduced motion',
    motionHtml: `The React component follows ${code('prefers-reduced-motion')} and updates when the setting changes. Taps on touch screens never start hover animations.`,
    /** What each interaction does with reduced motion preferred; shown after "<interaction>: ". */
    reducedMotion: {
      loop: 'the icon does not autoplay and stays on its static first frame.',
      'click-toggle':
        'a click switches to the other state immediately, without the animation in between.',
      'click-replay': 'clicks still reach your handler but the animation does not play.',
      hover: 'hovering does not play the animation.',
      'hover-replay': 'hovering does not play the animation.',
      'hover-loop': 'the icon stays static while hovered.',
    } as Record<Interaction, string>,
  },

  /** /lottie-icons: the icons as Lottie JSON, with code for each Lottie player. */
  lottie: {
    titles: (count: number) => [
      `Free Lottie icons: ${count} animated JSON icons`,
      'Free Lottie icons',
    ],
    descriptions: (count: number) => [
      `${count} free Lottie icons as plain Lottie JSON, MIT licensed. Copy-paste code for lottie-web, dotLottie, React, React Native, iOS, Android and Flutter.`,
    ],
    /** Heading and page name. */
    title: 'Free Lottie icons',
    /** Breadcrumb. */
    crumb: 'Lottie icons',
    /** Structured data for the icons.json catalog. */
    datasetName: 'useAnimations icon catalog',
    datasetDescription: (count: number) =>
      `Metadata and file URLs of ${count} animated Lottie icons: id, title, category, keywords, interaction, size and duration.`,
    badge: (count: number) => `${count} icons · Lottie JSON · MIT licensed`,
    intro:
      'Every useAnimations icon is a standard Lottie JSON animation, so any Lottie player can play it: lottie-web on the web, lottie-ios, lottie-android, Flutter and React Native. The files are free under the MIT license, with no sign-up, and served from stable URLs with CORS enabled, so you can load them directly or download them into your project.',
    popular: 'Popular Lottie icons',
    allIcons: (count: number) => `All ${count} icons →`,
    filesTitle: 'Files and URLs',
    filesIntroHtml: `Each icon has a page at ${code('/icons/&lt;id&gt;')} with a preview and downloads. The files themselves:`,
    /** Comments after each URL in the list of files. */
    files: {
      json: 'Lottie JSON animation',
      zip: 'the JSON and static SVGs',
      svg: 'static SVG of each state',
      catalog: 'catalog of every icon',
    },
    /** `catalog` links to icons.json; `median` is the median file size in kB. */
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} lists every icon with its id, title, category, keywords, interaction, size, duration and file URLs, which makes it easy to pick icons by keyword in a script or let a coding agent choose one. Lottie files weigh ${median} kB at the median.`,
    /** One section per player; the code examples stay English. */
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'The reference player from Airbnb. Load it from a CDN, point it at an icon URL and choose the SVG renderer, which keeps the icon sharp and lets CSS recolor it. Use the full build (lottie.min.js): the light build skips expressions.',
        /** Label above the CSS example. */
        cssLabel: 'Follow the text color (SVG renderer)',
      },
      'web-interactions': {
        title: 'Web: hover and click interactions',
        text: "lottie-web plays and stops, but the interactions are up to you. This is the menu icon's click toggle with reduced-motion support; every interaction follows the same pattern, and the React component below does all of it for you.",
      },
      dotlottie: {
        title: 'Web: dotLottie web component',
        text: "LottieFiles' player renders with a WebAssembly engine to a canvas and plays plain Lottie JSON as well as .lottie files. A canvas keeps the colors of the file, so the icons stay black unless you recolor the JSON.",
        /** Label above the JavaScript example; the command stays as is. */
        jsLabel: 'Or the JavaScript API: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'No Lottie player to install: the package has its own 8 kB player, plays each icon’s interaction, follows the text color and respects reduced motion. Each icon is a separate module, so you only ship the ones you import.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Bundle the JSON with require() for offline use, or load it from its URL.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Add the package from https://github.com/airbnb/lottie-spm.git with Swift Package Manager, then drop the JSON into your bundle or load it from its URL.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Add com.airbnb.android:lottie-compose (or com.airbnb.android:lottie for views). Put the JSON in res/raw for offline use with LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'The lottie package is a pure Dart player for Android, iOS, web and desktop.',
      },
    },
    expressionsTitle: 'Icons with expressions',
    /** loopOut, wiggle and lottie_light are code names, not translated. */
    expressionsHtml: (count: number) =>
      `${count} icons use After Effects expressions (${code('loopOut')} or ${code('wiggle')}). On the web, play them with lottie-web's full build, not ${code('lottie_light')}. Native players do not evaluate expressions, so test these on iOS, Android and Flutter or pick another icon; react-useanimations plays them as designed.`,
    /** File sizes are in kB; `expressions` are the (English) titles of icons with expressions. */
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Are these Lottie icons free for commercial use?',
        answer: `Yes. All ${f.count} Lottie icons are MIT-licensed: use, modify and redistribute them in personal and commercial projects, with no attribution required and no account to download them.`,
      },
      {
        question: 'What format are the Lottie files?',
        answer: `Standard Lottie JSON (the Bodymovin format) with shape layers only: no images, fonts or external assets. Each icon is drawn on a 24 or 32 px artboard, scales to any size and weighs ${f.minSize} kB to ${f.maxSize} kB, ${f.medianSize} kB median.`,
      },
      {
        question: 'Do I need lottie-web to use the icons in React?',
        answer:
          'No. react-useanimations has its own 8 kB player with no dependencies, so you install one package and import the icons you need. lottie-web is only needed outside React, on plain web pages or in other frameworks.',
      },
      {
        question: 'Which icons need the full lottie-web build?',
        answer: `${f.expressions.length} icons use After Effects expressions (loopOut or wiggle): ${f.expressions.join(', ')}. On the web they need lottie-web's full build; lottie_light ignores expressions. Native players (lottie-ios, lottie-android, Flutter's lottie) do not evaluate expressions either, so these icons may move differently there.`,
      },
      {
        question: 'Can I change the color of a Lottie icon?',
        answer:
          "On the web, lottie-web's SVG renderer writes the colors as attributes, so a CSS rule on the paths recolors the icon. Native players use their dynamic property APIs: ColorValueProvider on iOS, LottieProperty.COLOR and STROKE_COLOR on Android, and ValueDelegate.color in Flutter.",
      },
    ],
    byCategory: 'Lottie icons by category',
  },

  /** /shadcn-animated-icons: the shadcn registry of the icons. */
  shadcn: {
    titles: (count: number) => [
      `Animated icons for shadcn/ui: ${count} components`,
      'Animated icons for shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} animated icons for shadcn/ui: add any icon with one shadcn CLI command. Hover, click and loop micro interactions, MIT licensed, no lottie-web.`,
    ],
    /** Heading and page name. */
    title: 'Animated icons for shadcn/ui',
    /** Breadcrumb. */
    crumb: 'shadcn/ui',
    /** Name of the list of popular icons in structured data. */
    popularList: 'Popular shadcn/ui animated icons',
    badge: (count: number) => `${count} components · shadcn registry · MIT licensed`,
    intro:
      'Every useAnimations icon is in a shadcn registry. One CLI command adds a typed React component to your project, with the hover, click or loop interaction it was designed for, reduced-motion support and colors that follow your theme. The code lands in your repository, like any other shadcn/ui component.',
    addTitle: 'Add an icon',
    addIntro: "Run the shadcn CLI with the icon's registry URL:",
    /** "Animated" is part of the component name, not translated. */
    namingHtml: `The component is named ${code('Animated')} + the icon id in PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) and lands in ${code('components/animations/&lt;id&gt;.tsx')}. The CLI also adds the shared ${code('components/use-animation.tsx')} wrapper and installs ${code('react-useanimations')}, which brings its own player: no lottie-web.`,
    namespaceTitle: 'Short names with a registry namespace',
    namespaceHtml: `Add the registry to ${code('components.json')} once, then add icons by name, several at a time:`,
    /** `registry` links to /r/registry.json. */
    registryHtml: (registry: string) =>
      `The registry index at ${link(registry, '/r/registry.json')} lists every item with its title, category and interaction.`,
    usageTitle: 'Use it in a shadcn Button',
    usageHtml: `The components take the same props as ${code('UseAnimations')}. For a toggle such as the menu icon, pass ${code('active')} and keep the state in your button; the icon animates whenever it changes:`,
    /** `docs` links to the documentation. */
    colorHtml: (docs: string) =>
      `Icons follow the text color, so ${code('text-primary')} or ${code('text-muted-foreground')} recolor them and dark mode needs nothing extra. More props and patterns are in the ${link(docs, 'documentation')}.`,
    /** aria-label values inside the Button example code. */
    codeText: { closeMenu: 'Close menu', openMenu: 'Open menu' },
    popular: 'Popular icons for shadcn/ui',
    allIcons: (count: number) => `All ${count} icons →`,
    popularNote: 'Every icon page shows its shadcn command.',
    /** `version` is the react-useanimations version range, e.g. 3.1.0. */
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Are the shadcn/ui animated icons free?',
        answer: `Yes. All ${f.count} icons and the component code are MIT-licensed, for personal and commercial projects. The registry needs no account or API key.`,
      },
      {
        question: 'What does the shadcn CLI add to my project?',
        answer: `The icon component in components/animations/<id>.tsx, the shared UseAnimation player wrapper in components/use-animation.tsx (once, as a registry dependency) and react-useanimations@^${f.version} from npm. lottie-web is not needed: the package has its own 8 kB player.`,
      },
      {
        question: 'Do the components work with Next.js server components?',
        answer:
          'Yes. The components are marked "use client" and draw the animation only in the browser, so you can render them from server components and pages without dynamic imports or ssr: false.',
      },
      {
        question: 'Can I change how the icons look and move?',
        answer:
          'The code is yours, in your repository. The components take the props of UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop and speed. Icons follow the text color, so Tailwind classes such as text-primary or text-muted-foreground recolor them.',
      },
    ],
    byCategory: 'Browse by category',
  },
};
