import { categoryLinks, HOME_FAQ, HUBS, interactionLinks } from '../lib/home';
import { CATEGORIES, icons, INTERACTIONS, SITE } from '../lib/icons';
import { text } from '../lib/http';
import { CATEGORY_META } from '../lib/taxonomy';

const heading = (category: string) => {
  const meta = CATEGORY_META[category];
  return meta.indexable ? `### [${category}](${SITE}/categories/${meta.slug})` : `### ${category}`;
};

export const GET = () =>
  text(
    `# useAnimations: free animated icons for React, shadcn/ui and Lottie

> ${icons.length} free micro animations (Lottie) with hover, click and loop interactions built in, for React, shadcn/ui and any Lottie player. MIT licensed.

- React: \`npm install react-useanimations\`, then \`import github from 'react-useanimations/lib/github'\` and \`<UseAnimations animation={github} size={32} />\`.
- shadcn/ui: \`npx shadcn@latest add ${SITE}/r/<id>.json\`.
- Lottie: \`${SITE}/icons/<id>.json\`, static SVGs at \`${SITE}/icons/<id>/<state>.svg\`, ZIP at \`${SITE}/icons/<id>.zip\`.
- Catalog of every icon: [icons.json](${SITE}/icons.json). Documentation: [Markdown](${SITE}/documentation.md), [HTML](${SITE}/documentation). Everything in one file: [llms-full.txt](${SITE}/llms-full.txt).

## Browse

${HUBS.map((hub) => `- [${hub.label}](${SITE}${hub.href})`).join('\n')}
- Categories: ${categoryLinks()
      .map((link) => `[${link.name}](${SITE}${link.href})`)
      .join(', ')}
- Interactions: ${interactionLinks()
      .map((link) => `[${INTERACTIONS[link.interaction].label}](${SITE}${link.href})`)
      .join(', ')}

## Interactions

${Object.entries(INTERACTIONS)
  .map(([key, value]) => `- \`${key}\`: ${value.description}`)
  .join('\n')}

## Icons

Each icon links to its page; the Markdown version of a page is at the same URL plus \`.md\`.

${CATEGORIES.map(
  (category) =>
    `${heading(category)}\n\n${icons
      .filter((icon) => icon.category === category)
      .map(
        (icon) =>
          `- [${icon.title}](${SITE}/icons/${icon.id}) ([Markdown](${SITE}/icons/${icon.id}.md); \`${icon.name}\`, ${icon.interaction})`
      )
      .join('\n')}`
).join('\n\n')}

## FAQ

${HOME_FAQ.map((item) => `### ${item.question}\n\n${item.answer}${item.link ? ` See [${item.link.label}](${SITE}${item.link.href}).` : ''}`).join('\n\n')}

## License

MIT. Attribution is optional: [Licencing & Terms](${SITE}/licencing-and-terms).
`,
    'text/markdown'
  );
