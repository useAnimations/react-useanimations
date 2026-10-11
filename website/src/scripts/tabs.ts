// Tabs: [data-tabs] holding role="tab" buttons and role="tabpanel" panels, with arrow-key support.
import { tabFromKey } from '../lib/tabs';

for (const group of document.querySelectorAll<HTMLElement>('[data-tabs]')) {
  const tabs = [...group.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement) => {
    for (const other of tabs) {
      const selected = other === tab;
      other.setAttribute('aria-selected', String(selected));
      other.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(other.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !selected;
    }
  };
  tabs.forEach((tab, i) => {
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      const next = tabFromKey(event.key, i, tabs.length);
      if (next === undefined) return;
      select(tabs[next]);
      tabs[next].focus();
    });
  });
}
