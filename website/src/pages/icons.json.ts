// The icon catalog for scripts and AI agents. Kept compatible with the original useanimations.com
// format; every icon now has a react-useanimations import.
import {
  icons,
  INTERACTIONS,
  lottieSnippet,
  SITE,
  shadcnCommand,
  urls,
  libImport,
} from '../lib/icons';
import { lastModifiedOf } from '../lib/git';
import { json } from '../lib/http';

export const GET = () =>
  json({
    name: 'useAnimations',
    description:
      'Free library of animated icons (24/32 px artboards) for React, with a built-in interaction each. Every icon also has direct SVG and Lottie JSON URLs.',
    homepage: `${SITE}/`,
    documentation: `${SITE}/documentation.md`,
    // The last commit to the icon set; omitted without Git history.
    updated: lastModifiedOf(['icons/'])?.slice(0, 10),
    license: {
      name: 'MIT',
      url: 'https://opensource.org/license/mit/',
      terms: `${SITE}/licencing-and-terms`,
      attribution: `Optional, not required. Appreciated example: Animated icons by <a href="${SITE}">useAnimations</a>`,
      restrictions: 'None beyond standard MIT terms (provided as-is, without warranty).',
    },
    player: {
      web: {
        npm: 'lottie-web',
        cdn: 'https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_light.min.js',
        cdnFull: 'https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie.min.js',
        note: "Use the light build unless requiresFullPlayer is true. Use renderer 'svg'; the icons are stroke-based, so CSS `svg path { stroke: ... }` recolors them.",
      },
      react: {
        npm: 'react-useanimations',
        usage:
          "import UseAnimations from 'react-useanimations'; import github from 'react-useanimations/lib/github'; <UseAnimations animation={github} size={32} />",
        note: 'Built-in player (no lottie-web), follows currentColor, respects prefers-reduced-motion. Several icons: import { github, heart } from react-useanimations/icons.',
      },
      shadcn: {
        registry: `${SITE}/r/registry.json`,
        usage: `npx shadcn@latest add ${SITE}/r/<id>.json, then <AnimatedCheckmark size={24} />`,
      },
      ios: 'https://github.com/airbnb/lottie-ios',
      android: 'https://github.com/airbnb/lottie-android',
    },
    interactions: Object.fromEntries(
      Object.entries(INTERACTIONS).map(([key, value]) => [key, value.description])
    ),
    fields: {
      lottie:
        'Lottie JSON URL, CORS-enabled. Use it as `path` in lottie.loadAnimation or download it into the project.',
      svg: "Static SVG(s) of the icon's states (e.g. bell and bell-off).",
      zip: 'The same package a human gets from the Download button: <id>.json and the SVGs.',
      shadcn:
        'shadcn CLI command that adds a ready-made React component (components/animations/<id>.tsx, export Animated<PascalCaseId>).',
      react:
        'react-useanimations import of the icon (`import`) and its name in react-useanimations/icons (`export`).',
      page: 'The icon page on useanimations.com.',
      snippet:
        "Ready-to-use lottie-web code for the icon's intended interaction, for players outside React; `el` is the container element.",
    },
    count: icons.length,
    icons: icons.map((icon) => {
      const u = urls(icon);
      return {
        id: icon.id,
        title: icon.title,
        category: icon.category,
        keywords: icon.keywords,
        interaction: icon.interaction,
        lottie: u.lottie,
        svg: u.svg,
        zip: u.zip,
        shadcn: shadcnCommand(icon),
        react: { package: 'react-useanimations', import: libImport(icon), export: icon.exportName },
        page: u.page,
        width: icon.width,
        height: icon.height,
        fps: icon.fps,
        durationMs: icon.durationMs,
        bytes: Buffer.byteLength(icon.lottie),
        requiresFullPlayer: icon.requiresFullPlayer,
        snippet: lottieSnippet(icon),
      };
    }),
  });
