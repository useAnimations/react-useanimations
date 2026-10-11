// The icon page as Markdown, for AI agents and anyone who wants the facts without the page.
import type { GetStaticPaths } from 'astro';
import {
  htmlLottieExample,
  type Icon,
  icons,
  INTERACTIONS,
  reactExample,
  shadcnCommand,
  shadcnExample,
  SITE,
  urls,
} from '../../lib/icons';
import { text } from '../../lib/http';
import {
  iconDescription,
  iconFaq,
  iconIntro,
  related,
  variantFamily,
  variantNote,
} from '../../lib/seo';
import { CATEGORY_META, INTERACTION_META } from '../../lib/taxonomy';

export const getStaticPaths = (() =>
  icons.map((icon) => ({ params: { id: icon.id }, props: { icon } }))) satisfies GetStaticPaths;

const code = (lang: string, body: string) => `\`\`\`${lang}\n${body}\n\`\`\``;

export const GET = ({ props: { icon } }: { props: { icon: Icon } }) => {
  const u = urls(icon);
  const category = CATEGORY_META[icon.category];
  const interaction = INTERACTION_META[icon.interaction];
  const family = variantFamily(icon);
  const others = related(icon, 12 + family.length).filter((other) => !family.includes(other));
  const kb = (Buffer.byteLength(icon.lottie) / 1024).toFixed(1);
  const states = Object.keys(icon.svgs);
  const sections = [
    `# ${icon.title} animated icon

> ${iconDescription(icon)}

${iconIntro(icon)}`,
    `## Facts

- Interaction: [${INTERACTIONS[icon.interaction].label}](${SITE}/interactions/${interaction.slug}). ${INTERACTIONS[icon.interaction].description}
- Category: [${icon.category}](${SITE}/categories/${category.slug})
- Duration: ${(icon.durationMs / 1000).toFixed(2)} s at ${Number(icon.fps.toFixed(2))} fps
- Artboard: ${icon.width} × ${icon.height} px
- Lottie size: ${kb} kB${icon.requiresFullPlayer ? ' (uses After Effects expressions: needs the full lottie-web build)' : ''}
- License: MIT, attribution optional ([Licencing & Terms](${SITE}/licencing-and-terms))`,
    `## Files

${[
  `- Lottie JSON: ${u.lottie}`,
  ...states.map((state, i) => `- Static SVG (${state}): ${u.svg[i]}`),
  `- ZIP (Lottie JSON and SVGs): ${u.zip}`,
  `- shadcn registry item: ${u.registry}`,
  `- Web page: ${u.page}`,
].join('\n')}`,
    `## React

${code('bash', 'npm install react-useanimations')}

${code('jsx', reactExample(icon.exportName, icon.name))}`,
    `## shadcn/ui

${code('bash', shadcnCommand(icon))}

${code('tsx', shadcnExample(icon.id, icon.component))}`,
    `## HTML and lottie-web

${code('html', htmlLottieExample(icon))}`,
    family.length
      ? `## Other versions

${family.map((other) => `- [${other.title}](${SITE}/icons/${other.id}): ${variantNote(icon, other)}`).join('\n')}`
      : '',
    `## FAQ

${iconFaq(icon)
  .map(({ question, answer }) => `### ${question}\n\n${answer}`)
  .join('\n\n')}`,
    `## Related icons

${others
  .slice(0, 12)
  .map((other) => `- [${other.title}](${SITE}/icons/${other.id}) (${other.interaction})`)
  .join('\n')}

[All ${icon.category.toLowerCase()} icons](${SITE}/categories/${category.slug}) · [All icons](${SITE}/icons)`,
  ];
  return text(`${sections.filter(Boolean).join('\n\n')}\n`, 'text/markdown');
};
