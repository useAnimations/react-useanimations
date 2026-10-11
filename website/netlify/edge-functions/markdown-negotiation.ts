// Serves the Markdown version of a page to clients that ask for it (Accept: text/markdown),
// such as AI agents. Everyone else gets the HTML page, which announces the Markdown version in a
// Link header. Both vary by Accept, so caches keep them apart.
type Context = { next: () => Promise<Response> };

/** The Markdown file of a page: / -> /index.md, /icons/menu -> /icons/menu.md. */
const markdownPath = (pathname: string) => (pathname === '/' ? '/index.md' : `${pathname}.md`);

export default async (request: Request, context: Context) => {
  const markdown = markdownPath(new URL(request.url).pathname);
  if (request.headers.get('accept')?.includes('text/markdown')) {
    const response = await fetch(new URL(markdown, request.url));
    if (response.ok) {
      return new Response(await response.text(), {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          Vary: 'Accept',
        },
      });
    }
  }
  const response = await context.next();
  // Only pages that exist have a Markdown version; a 404 stays as it is.
  if (!response.ok) return response;
  const headers = new Headers(response.headers);
  headers.append('Link', `<${markdown}>; rel="alternate"; type="text/markdown"`);
  headers.append('Vary', 'Accept');
  return new Response(response.body, { status: response.status, headers });
};

// Exact pages only, so files such as /icons/menu.json, .zip or .svg never run this function.
export const config = {
  pattern: [
    '^/$',
    '^/(documentation|licencing-and-terms)$',
    '^/icons/[a-z0-9-]+$',
    '^/categories/[a-z0-9-]+$',
  ],
};
