// The icon browser on the home page: search, filters, customization, and live icons.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import IconCard, { type CardIcon } from '../components/IconCard';
import { loadIconData } from '../lib/icon-data';

const browser = document.querySelector<HTMLElement>('[data-browser]');
if (browser) {
  const search = browser.querySelector<HTMLInputElement>('[data-search]')!;
  const interactionSelect = browser.querySelector<HTMLSelectElement>('[data-interaction-filter]')!;
  const categoryButtons = [
    ...browser.querySelectorAll<HTMLButtonElement>('[data-category-filter]'),
  ];
  const sections = [...browser.querySelectorAll<HTMLElement>('[data-section]')];
  const cards = [...browser.querySelectorAll<HTMLElement>('[data-card]')];
  const count = browser.querySelector<HTMLElement>('[data-count]')!;
  const empty = browser.querySelector<HTMLElement>('[data-empty]')!;
  const grid = browser.querySelector<HTMLElement>('[data-grid]')!;
  const sizeInput = browser.querySelector<HTMLInputElement>('[data-size]')!;
  const swatches = [...browser.querySelectorAll<HTMLButtonElement>('[data-color]')];
  const colorInput = browser.querySelector<HTMLInputElement>('[data-color-input]')!;

  const params = new URLSearchParams(location.search);
  let category = params.get('category') ?? '';
  search.value = params.get('q') ?? '';
  interactionSelect.value = params.get('interaction') ?? '';

  const update = () => {
    const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const interaction = interactionSelect.value;
    let shown = 0;
    for (const card of cards) {
      const match =
        (!category || card.dataset.category === category) &&
        (!interaction || card.dataset.interaction === interaction) &&
        words.every((word) => card.dataset.keywords!.includes(word));
      card.hidden = !match;
      if (match) shown += 1;
    }
    for (const section of sections) {
      section.hidden = !section.querySelector('[data-card]:not([hidden])');
    }
    for (const button of categoryButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === category));
    }
    count.textContent = `${shown} ${shown === 1 ? 'icon' : 'icons'}`;
    empty.hidden = shown > 0;
    const next = new URLSearchParams(location.search);
    for (const [key, value] of [
      ['q', search.value.trim()],
      ['category', category],
      ['interaction', interaction],
    ]) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const query = next.toString();
    history.replaceState(
      history.state,
      '',
      `${location.pathname}${query ? `?${query}` : ''}${location.hash}`
    );
  };

  search.addEventListener('input', update);
  interactionSelect.addEventListener('change', update);
  for (const button of categoryButtons) {
    button.addEventListener('click', () => {
      category = button.dataset.categoryFilter!;
      update();
    });
  }
  // "/" focuses the search, like on most sites with one.
  document.addEventListener('keydown', (event) => {
    if (
      event.key !== '/' ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    )
      return;
    event.preventDefault();
    search.focus();
  });

  // CUSTOMIZATION: CSS variables on the grid, so every icon follows without re-rendering.
  const setColor = (color: string) => {
    grid.style.setProperty('--icon-color', color || 'var(--fg)');
    for (const swatch of swatches)
      swatch.setAttribute('aria-pressed', String(swatch.dataset.color === color));
  };
  for (const swatch of swatches)
    swatch.addEventListener('click', () => setColor(swatch.dataset.color!));
  colorInput.addEventListener('input', () => setColor(colorInput.value));
  sizeInput.addEventListener('input', () =>
    grid.style.setProperty('--icon-size', `${sizeInput.value}px`)
  );

  // LIVE ICONS: each card swaps its prerendered frame for the component once it's near the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const card = entry.target as HTMLElement;
        observer.unobserve(card);
        const icon: CardIcon = {
          id: card.dataset.id!,
          title: card.dataset.title!,
          interaction: card.dataset.interaction as CardIcon['interaction'],
        };
        void loadIconData(icon.id).then((data) => {
          createRoot(card).render(createElement(IconCard, { icon, animationData: data }));
        });
      }
    },
    { rootMargin: '300px 0px' }
  );
  cards.forEach((card) => observer.observe(card));

  update();
}
