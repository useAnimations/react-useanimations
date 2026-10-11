import { SITE } from '../lib/icons';
import { text } from '../lib/http';

export const GET = () =>
  text(`User-agent: *
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: Bytespider
Disallow: /

Sitemap: ${SITE}/sitemap.xml
`);
