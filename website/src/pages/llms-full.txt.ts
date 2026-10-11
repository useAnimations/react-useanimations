// Everything an AI agent needs in one file: the documentation, then a compact entry per icon.
import { CATEGORIES, icons, libImport, shadcnCommand, SITE, urls } from '../lib/icons';
import { text } from '../lib/http';
import { documentationMarkdown } from '../lib/markdown';
import { synonyms } from '../lib/seo';

const entry = (icon: (typeof icons)[number]) => {
  const u = urls(icon);
  const states = Object.keys(icon.svgs);
  const aka = synonyms(icon);
  return [
    `### ${icon.title} (\`${icon.id}\`)`,
    '',
    `- Category: ${icon.category}; interaction: \`${icon.interaction}\`${states.length ? `; states: ${states.join(', ')}` : ''}`,
    aka.length ? `- Also known as: ${aka.join(', ')}` : '',
    `- React: \`${libImport(icon)}\``,
    `- shadcn: \`${shadcnCommand(icon)}\``,
    `- Lottie JSON: ${u.lottie}`,
    `- Page: ${u.page} (Markdown: ${u.page}.md)`,
  ]
    .filter(Boolean)
    .join('\n');
};

export const GET = () =>
  text(
    `${documentationMarkdown()}

# Icons

All ${icons.length} icons by category. Static SVGs: \`${SITE}/icons/<id>/<state>.svg\` (one per state listed); ZIP of everything: \`${SITE}/icons/<id>.zip\`. Full metadata: ${SITE}/icons.json

${CATEGORIES.map(
  (category) =>
    `## ${category}\n\n${icons
      .filter((icon) => icon.category === category)
      .map(entry)
      .join('\n\n')}`
).join('\n\n')}
`,
    'text/markdown'
  );
