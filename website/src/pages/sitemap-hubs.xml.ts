import { text } from '../lib/http';
import { hubEntries, urlset } from '../lib/sitemap';

export const GET = () => text(urlset(hubEntries()), 'application/xml');
