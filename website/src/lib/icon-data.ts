// Lottie JSON of an icon, fetched once per page from /icons/<id>.json.
const cache = new Map<string, Promise<object>>();

export const loadIconData = (id: string): Promise<object> => {
  let data = cache.get(id);
  if (!data) {
    data = fetch(`/icons/${id}.json`).then((response) => {
      if (!response.ok) throw new Error(`/icons/${id}.json: HTTP ${response.status}`);
      return response.json();
    });
    cache.set(id, data);
  }
  return data;
};
