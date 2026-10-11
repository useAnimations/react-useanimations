import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** The documentation as Markdown, without the HTML anchors that keep old links working. */
export const documentationMarkdown = () =>
  readFileSync(join(import.meta.env.REPO_DIR, 'website/src/content/documentation.md'), 'utf8')
    .replace(/^(<div id="[^"]+"><\/div>)+\n\n/gm, '')
    .replace(/^# Documentation/, '# useAnimations documentation');
