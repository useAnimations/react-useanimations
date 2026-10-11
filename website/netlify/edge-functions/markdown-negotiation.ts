// Serves the Markdown version of a page to clients that ask for it (Accept: text/markdown),
// such as AI agents. Everyone else gets the HTML page.
type Context = { next: () => Promise<Response> };

const MARKDOWN: Record<string, string> = {
  '/': '/index.md',
  '/documentation': '/documentation.md',
  '/documentation/': '/documentation.md',
};

export default async (request: Request, context: Context) => {
  const markdown = MARKDOWN[new URL(request.url).pathname];
  if (!markdown || !request.headers.get('accept')?.includes('text/markdown')) return context.next();
  const response = await fetch(new URL(markdown, request.url));
  if (!response.ok) return context.next();
  return new Response(await response.text(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      Vary: 'Accept',
    },
  });
};

export const config = { path: ['/', '/documentation', '/documentation/'] };
