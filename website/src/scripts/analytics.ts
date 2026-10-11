// Umami events for every call to action. <el data-track="download" data-track-format="svg"> sends
// "download" with { format: 'svg' } when it (or anything inside it) is clicked; other links send
// "link" with their label and href. Not data-umami-event: Umami turns tracked links into a
// redirect, which breaks `download` links and the links that open the icon dialog.
export const track = (name: string, data: Record<string, string>) => {
  for (const tracker of new Set([window.umamiCloud, window.umami])) tracker?.track(name, data);
};

const dataOf = (element: HTMLElement) => {
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(element.dataset))
    if (key.startsWith('track') && key.length > 5 && value !== undefined)
      data[key[5].toLowerCase() + key.slice(6)] = value;
  return data;
};

document.addEventListener(
  'click',
  (event) => {
    const target = event.target as Element;
    const tracked = target.closest<HTMLElement>('[data-track]');
    if (tracked) {
      track(tracked.dataset.track!, dataOf(tracked));
      return;
    }
    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    const label = (link.getAttribute('aria-label') ?? link.textContent ?? '').replace(/\s+/g, ' ');
    track('link', { label: label.trim().slice(0, 60), href: link.getAttribute('href')! });
  },
  true
);
