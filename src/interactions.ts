import type { AnimationItem } from 'lottie-web';
import { interactions } from './icons';
import type { Animation, Interaction } from './types';

export const getInteraction = (key: Animation['animationKey']): Interaction =>
  // Unknown keys (e.g. custom animations) fall back to replaying on click.
  (interactions as Record<string, Interaction>)[key] ?? 'click-replay';

export const playToggle = (animation: AnimationItem, toEnd: boolean) => {
  animation.setDirection(toEnd ? 1 : -1);
  animation.play();
};

export const replay = (animation: AnimationItem) => {
  animation.setDirection(1);
  animation.playSegments([0, animation.totalFrames], true);
};

export const hoverStart = (animation: AnimationItem, interaction: Interaction) => {
  if (interaction === 'hover') animation.setDirection(1);
  animation.play();
};

export const hoverEnd = (animation: AnimationItem, interaction: Interaction) => {
  if (interaction === 'hover') {
    animation.setDirection(-1);
    animation.play();
  } else {
    animation.stop();
  }
};
