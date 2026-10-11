export const json = (data: unknown, pretty = true) =>
  new Response(pretty ? `${JSON.stringify(data, null, 2)}\n` : JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

export const text = (body: string, type = 'text/plain') =>
  new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
