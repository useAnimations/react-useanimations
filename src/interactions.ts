import type { Player } from './player';
import type { Interaction } from './types';

export const isHover = (interaction: Interaction): boolean =>
  interaction === 'hover' || interaction === 'hover-loop' || interaction === 'hover-replay';

export const toggle = (animation: Player, toEnd: boolean, reducedMotion: boolean): void => {
  if (reducedMotion) {
    animation.goToAndStop(toEnd ? animation.totalFrames - 1 : 0);
    return;
  }
  animation.setDirection(toEnd ? 1 : -1);
  animation.play();
};

export const replay = (animation: Player): void => {
  animation.setDirection(1);
  animation.playSegments([0, animation.totalFrames]);
};

export const hoverStart = (animation: Player, interaction: Interaction): void => {
  if (interaction === 'hover-replay') {
    // Let a running replay finish instead of restarting it on every re-enter.
    if (animation.isPaused) replay(animation);
    return;
  }
  animation.setDirection(1);
  animation.play();
};

// Returns whether a `hover-loop` animation should stop once its current cycle completes.
export const hoverEnd = (animation: Player, interaction: Interaction): boolean => {
  if (interaction === 'hover') {
    animation.setDirection(-1);
    animation.play();
  } else if (interaction === 'hover-loop') {
    if (!animation.isPaused) return true;
    animation.goToAndStop(0);
  }
  return false;
};
