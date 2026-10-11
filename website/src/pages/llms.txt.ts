import { icons, INTERACTIONS, SITE } from '../lib/icons';
import { text } from '../lib/http';

export const GET = () =>
  text(`# useAnimations

> Free library of ${icons.length} handcrafted animated icons built with Lottie (24/32 px artboards), each with a built-in interaction. Every icon has a direct, CORS-enabled Lottie JSON URL plus static SVGs, a React import and a shadcn registry item, so it can be used in web, React, iOS and Android projects without any account or build step.

Author: useAnimations
License: MIT — free for personal and commercial use, modification and redistribution, no attribution required.

## For AI agents

- [Icon catalog (JSON)](${SITE}/icons.json): every icon with id, title, category, keywords, interaction type (${Object.keys(INTERACTIONS).join(', ')}), direct Lottie JSON URL, SVG URLs, ZIP URL, react-useanimations import, shadcn command, size, duration and a ready-to-use lottie-web snippet.
- React: \`npm install react-useanimations\`, then \`import checkmark from 'react-useanimations/lib/checkmark'\` and \`<UseAnimations animation={checkmark} size={32} />\`. Several icons: \`import { github, heart } from 'react-useanimations/icons'\`. No dependencies; icons follow currentColor and respect reduced motion.
- shadcn/ui: \`npx shadcn@latest add ${SITE}/r/<id>.json\` adds \`components/animations/<id>.tsx\` exporting \`Animated<PascalCaseId>\` (e.g. \`<AnimatedCheckmark size={24} />\`); registry index: ${SITE}/r/registry.json
- Direct file URLs: \`${SITE}/icons/<id>.json\` (Lottie), \`${SITE}/icons/<id>/<state>.svg\` (static SVG), \`${SITE}/icons/<id>.zip\` (full package), \`${SITE}/icons/<id>\` (icon page).
- Web player: lottie-web light build \`https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_light.min.js\` (icons \`error\` and \`twitter\` need the full build \`lottie.min.js\`).

## Docs

- [Documentation (Markdown)](${SITE}/documentation.md): React props and interactions, shadcn/ui, size and color, direct URLs, HTML/vanilla JS, Vue/Svelte/Angular, iOS, Android, performance, accessibility, license and FAQ. HTML version: ${SITE}/documentation
- [Homepage summary (Markdown)](${SITE}/index.md): every icon by category.
- [Licencing & Terms](${SITE}/licencing-and-terms): full usage rights.

## Optional

- [react-useanimations on GitHub](https://github.com/useAnimations/react-useanimations): the React package and the source of the icon set.
`);
