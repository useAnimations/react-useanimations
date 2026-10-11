// One 301 to the canonical URL for the variants static hosting would otherwise serve as copies:
// a trailing slash (/zh/, /icons/menu/), the .html file (/icons/menu.html) and old or misspelled
// paths (/docs, /licensing). A rule in _redirects can't do this: Netlify matches its rules with and
// without the trailing slash alike, so /documentation/ -> /documentation would loop.
type Context = { next: () => Promise<Response> };

const ALIASES: Record<string, string> = {
  '/docs': '/documentation',
  '/license': '/licencing-and-terms',
  '/licence': '/licencing-and-terms',
  '/licensing': '/licencing-and-terms',
  '/licensing-and-terms': '/licencing-and-terms',
};

/** The canonical path of a pathname, e.g. /icons/menu.html/ -> /icons/menu. */
const canonicalPath = (pathname: string) => {
  let path = pathname.replace(/\/+$/, '') || '/';
  if (path.endsWith('.html') && path !== '/404.html') path = path.slice(0, -'.html'.length);
  path = path.replace(/\/index$/, '') || '/';
  return ALIASES[path] ?? path;
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = canonicalPath(url.pathname);
  if (path === url.pathname) return context.next();
  return new Response(null, {
    status: 301,
    headers: { Location: `${path}${url.search}`, 'Cache-Control': 'public, max-age=3600' },
  });
};

// Paths with a trailing slash, .html pages and the aliases; files (.json, .zip, .svg, .md, .png,
// .txt, .xml) never match, and /404.html is served as it is.
export const config = {
  pattern: ['^/.+/$', '^/.+\\.html$', '^/(docs|license|licence|licensing|licensing-and-terms)$'],
  excludedPattern: ['^/404\\.html$', '^/\\.netlify/'],
};
