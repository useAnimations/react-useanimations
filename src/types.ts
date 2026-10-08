import type { AnimationKey } from './icons';

/**
 * How an icon reacts to the user, matching the `interaction` field of the useAnimations catalog.
 * - `loop`: plays continuously.
 * - `click-toggle`: toggles between two states on click (forward, then backward).
 * - `click-replay`: replays from the start on every click.
 * - `hover`: plays forward on mouse enter and backward on mouse leave.
 * - `hover-loop`: loops while hovered and stops on mouse leave.
 */
export type Interaction = 'loop' | 'click-toggle' | 'click-replay' | 'hover' | 'hover-loop';

export type Animation = {
  animationData: unknown;
  animationKey: AnimationKey;
};
