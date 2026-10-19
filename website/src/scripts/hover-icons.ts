// Icon stills (components/IconStill.astro) come alive on the first hover or keyboard focus of
// their link: the icon's Lottie JSON loads then, so a page of stills costs nothing until used.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { Interaction } from 'react-useanimations';
import HoverIcon from '../components/HoverIcon';
import { loadIconData } from '../lib/icon-data';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const wake = (trigger: HTMLElement) => {
  // Hover animations don't play with reduced motion, so the stills stay.
  if (reducedMotion.matches) return;
  // Icons whose first frame is empty keep their still: at rest they would show nothing.
  const stills = trigger.querySelectorAll<HTMLElement>(
    '[data-hover-icon]:not([data-live], [data-blank-start])'
  );
  for (const still of stills) {
    still.dataset.live = '';
    void loadIconData(still.dataset.hoverIcon!).then((animationData) => {
      const interaction = still.dataset.interaction as Interaction;
      createRoot(still).render(createElement(HoverIcon, { animationData, interaction, trigger }));
    });
  }
};

document.addEventListener('pointerover', (event) => {
  const trigger = (event.target as Element).closest<HTMLElement>('a');
  if (trigger && event.pointerType === 'mouse') wake(trigger);
});
document.addEventListener('focusin', (event) => {
  const trigger = (event.target as Element).closest<HTMLElement>('a');
  if (trigger?.matches(':focus-visible')) wake(trigger);
});
