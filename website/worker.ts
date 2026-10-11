// The Cloudflare Worker in front of useanimations.com's static files (website/dist). It runs only
// for the paths in run_worker_first (wrangler.jsonc); every other request is served straight from
// the assets, with public/_headers and public/_redirects applied.
type Env = { ASSETS: { fetch: (request: Request | URL) => Promise<Response> } };

// One 301 to the canonical URL for the variants static hosting would otherwise serve as copies:
// a trailing slash (/zh/, /icons/menu/), the .html file (/icons/menu.html) and old or misspelled
// paths (/docs, /licensing).
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

// Pages with a Markdown version; files such as /icons/menu.json, .zip or .svg have none.
const MARKDOWN_PAGES =
  /^\/(|documentation|licencing-and-terms|icons\/[a-z0-9-]+|categories\/[a-z0-9-]+)$/;

/** The Markdown file of a page: / -> /index.md, /icons/menu -> /icons/menu.md. */
const markdownPath = (pathname: string) => (pathname === '/' ? '/index.md' : `${pathname}.md`);

/**
 * Serves the Markdown version of a page to clients that ask for it (Accept: text/markdown), such
 * as AI agents. Everyone else gets the HTML page, which announces the Markdown version in a Link
 * header. Both vary by Accept, so caches keep them apart.
 */
const negotiate = async (request: Request, env: Env, url: URL) => {
  const markdown = markdownPath(url.pathname);
  if (request.headers.get('accept')?.includes('text/markdown')) {
    const response = await env.ASSETS.fetch(new URL(markdown, url));
    if (response.ok) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          Vary: 'Accept',
        },
      });
    }
  }
  const response = await env.ASSETS.fetch(request);
  // Only pages that exist have a Markdown version; a 404 stays as it is.
  if (!response.ok) return response;
  const headers = new Headers(response.headers);
  headers.append('Link', `<${markdown}>; rel="alternate"; type="text/markdown"`);
  headers.append('Vary', 'Accept');
  return new Response(response.body, { status: response.status, headers });
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = canonicalPath(url.pathname);
    if (path !== url.pathname && url.pathname !== '/404.html') {
      return new Response(null, {
        status: 301,
        headers: { Location: `${path}${url.search}`, 'Cache-Control': 'public, max-age=3600' },
      });
    }
    if (MARKDOWN_PAGES.test(url.pathname)) return negotiate(request, env, url);
    return env.ASSETS.fetch(request);
  },
};
