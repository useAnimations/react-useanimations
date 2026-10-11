import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../lib/icons';
import { text } from '../lib/http';

const license = readFileSync(join(import.meta.env.REPO_DIR, 'LICENSE'), 'utf8').trim();

export const GET = () =>
  text(
    `# Licencing & Terms: free to use, MIT licensed

The useAnimations icons and the \`react-useanimations\` package are released under the [MIT license](https://opensource.org/license/mit/).

## What you can do

- **Use** the icons in personal and commercial websites, apps and products.
- **Modify** them: change colors, sizes, timing or the motion itself.
- **Redistribute** them, including inside icon packs, templates, themes, UI kits and component registries.

## Attribution

Not required, but appreciated. Keep the license notice when you redistribute the files themselves, and if you'd like to credit us:

\`\`\`html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
\`\`\`

## No warranty

The icons and the code are provided as-is, without warranty of any kind.

## License text

\`\`\`
${license}
\`\`\`

HTML version: ${SITE}/licencing-and-terms
`,
    'text/markdown'
  );
