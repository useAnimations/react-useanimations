import { CATEGORIES, icons, INTERACTIONS, SITE } from '../lib/icons';
import { text } from '../lib/http';

export const GET = () =>
  text(
    `# useAnimations

> ${icons.length} free animated icons (Lottie) with hover, click and loop interactions built in, for React. MIT licensed.

- React: \`npm install react-useanimations\`, then \`import github from 'react-useanimations/lib/github'\` and \`<UseAnimations animation={github} size={32} />\`.
- shadcn/ui: \`npx shadcn@latest add ${SITE}/r/<id>.json\`.
- Lottie: \`${SITE}/icons/<id>.json\`, static SVGs at \`${SITE}/icons/<id>/<state>.svg\`, ZIP at \`${SITE}/icons/<id>.zip\`.
- Catalog of every icon: [icons.json](${SITE}/icons.json). Documentation: [Markdown](${SITE}/documentation.md), [HTML](${SITE}/documentation).

## Interactions

${Object.entries(INTERACTIONS)
  .map(([key, value]) => `- \`${key}\`: ${value.description}`)
  .join('\n')}

## Icons

${CATEGORIES.map(
  (category) =>
    `### ${category}\n\n${icons
      .filter((icon) => icon.category === category)
      .map(
        (icon) =>
          `- [${icon.title}](${SITE}/icons/${icon.id}) (\`${icon.name}\`, ${icon.interaction})`
      )
      .join('\n')}`
).join('\n\n')}

## License

MIT. Attribution is optional: [Licencing & Terms](${SITE}/licencing-and-terms).
`,
    'text/markdown'
  );
