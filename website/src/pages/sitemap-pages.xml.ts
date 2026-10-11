import { text } from '../lib/http';
import { pageEntries, urlset } from '../lib/sitemap';

export const GET = () => text(urlset(pageEntries()), 'application/xml');
