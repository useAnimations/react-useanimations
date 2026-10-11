import type { GetStaticPaths } from 'astro';
import { text } from '../../lib/http';
import { categories, categoryFaq, categoryPath, categoryText } from '../../lib/hubs';
import { type Icon, INTERACTIONS, reactExample, shadcnCommand, SITE } from '../../lib/icons';
import { type CategoryMeta, INTERACTION_META } from '../../lib/taxonomy';

export const getStaticPaths = (() =>
  categories().map(({ meta, icons }) => ({
    params: { slug: meta.slug },
    props: { meta, icons },
  }))) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { meta: CategoryMeta; icons: Icon[] } }) => {
  const { meta } = props;
  const copy = categoryText(meta);
  const others = categories().filter((other) => other.meta.name !== meta.name);
  return text(
    `# ${meta.title}

> ${copy.description}

${meta.intro}

${copy.summary}

## Icons

${props.icons
  .map(
    (icon) => `- [${icon.title}](${SITE}/icons/${icon.id}) (\`${icon.name}\`, ${icon.interaction})`
  )
  .join('\n')}

## Where to use them

${meta.useCases.map((useCase) => `- ${useCase}`).join('\n')}

## By interaction

${copy.byInteraction
  .map(
    ({ interaction, icons }) =>
      `- [${INTERACTION_META[interaction].title}](${SITE}/interactions/${interaction}) (${icons.length}): ${INTERACTIONS[interaction].description}`
  )
  .join('\n')}

## Code

\`\`\`jsx
${reactExample(copy.example.exportName, copy.example.name)}
\`\`\`

\`\`\`bash
${shadcnCommand(copy.example)}
\`\`\`

Every icon is also a Lottie JSON file at \`${SITE}/icons/<id>.json\`: [Lottie icons](${SITE}/lottie-icons).

## FAQ

${categoryFaq(meta)
  .map(({ question, answer }) => `### ${question}\n\n${answer}`)
  .join('\n\n')}

## More categories

${others.map((other) => `- [${other.meta.title}](${SITE}${categoryPath(other.meta)}) (${other.icons.length})`).join('\n')}

HTML version: ${SITE}${categoryPath(meta)}
`,
    'text/markdown'
  );
};
