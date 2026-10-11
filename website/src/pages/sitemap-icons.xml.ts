import { text } from '../lib/http';
import { iconEntries, urlset } from '../lib/sitemap';

export const GET = () => text(urlset(iconEntries()), 'application/xml');
