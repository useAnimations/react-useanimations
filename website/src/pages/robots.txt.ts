import { SITE } from '../lib/icons';
import { text } from '../lib/http';

// Search and AI crawlers are welcome, named so their access is explicit. The Content Signals
// preference (contentsignals.org) is a comment: Lighthouse flags it as an unknown directive.
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

export const GET = () =>
  text(`# Content-Signal: ai-train=yes, search=yes, ai-input=yes
User-agent: *
Allow: /

${AI_CRAWLERS.map((agent) => `User-agent: ${agent}`).join('\n')}
Allow: /

User-agent: Bytespider
Disallow: /

Sitemap: ${SITE}/sitemap.xml
`);
