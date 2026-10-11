// The icon browser on the home page: search, filters, customization, and live icons.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import IconCard, { type CardIcon, openIcon } from '../components/IconCard';
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
  const filters = browser.querySelector<HTMLElement>('[data-filters]')!;
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

  // After a change made while scrolled down the grid, the results would start above the sticky
  // filters (or above the viewport, once the shorter grid ends); bring their top (the count) back
  // into view just below where the filters stick. While typing, the jump is instant: a smooth
  // scroll restarted on every key never settles.
  const reveal = (smooth: boolean) => {
    const below = parseFloat(getComputedStyle(filters).top) + filters.offsetHeight + 8;
    const top = count.getBoundingClientRect().top;
    if (top >= below) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: scrollY + top - below,
      behavior: smooth && !reducedMotion ? 'smooth' : 'instant',
    });
  };

  search.addEventListener('input', () => {
    update();
    reveal(false);
  });
  interactionSelect.addEventListener('change', () => {
    update();
    reveal(true);
  });
  for (const button of categoryButtons) {
    button.addEventListener('click', () => {
      category = button.dataset.categoryFilter!;
      update();
      reveal(true);
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

  // DETAILS: a click anywhere on a card opens the details dialog, or the icon's page until the
  // dialog is ready. The title stays a link, so modified clicks on it open the page in a new tab.
  grid.addEventListener('click', (event) => {
    const target = event.target as Element;
    const id = target.closest<HTMLElement>('[data-card]')?.dataset.id;
    if (!id) return;
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (target.closest('a[data-details]') && (event.button !== 0 || modified)) return;
    event.preventDefault();
    if (!openIcon(id)) location.assign(`/icons/${id}`);
  });

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
