/**
 * How an icon reacts to the user, matching the `interaction` field of the useAnimations catalog.
 * When reduced motion is preferred, icons stay still or jump straight to their new state.
 * - `loop`: plays continuously.
 * - `click-toggle`: toggles between two states on click (forward, then backward).
 * - `click-replay`: replays from the start on every click.
 * - `hover`: plays forward on mouse enter and backward on mouse leave.
 * - `hover-loop`: loops while hovered and finishes the current cycle on mouse leave.
 * - `hover-replay`: plays once from the start on mouse enter.
 */
export type Interaction =
  | 'loop'
  | 'click-toggle'
  | 'click-replay'
  | 'hover'
  | 'hover-loop'
  | 'hover-replay';

/** An icon imported from `react-useanimations/lib/<name>`, or your own Lottie animation. */
export type Animation = {
  /** Lottie JSON of the animation. */
  animationData: object;
  /** How the animation plays unless the `interaction` prop overrides it. Defaults to `'click-replay'`. */
  interaction?: Interaction;
};
