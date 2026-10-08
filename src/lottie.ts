import type { LottiePlayer } from 'lottie-web';

let light: Promise<LottiePlayer> | undefined;
let full: Promise<LottiePlayer> | undefined;

const unwrap = (mod: { default?: LottiePlayer }) => (mod.default ?? mod) as LottiePlayer;

// lottie-web is browser-only, so it is loaded lazily from an effect: the component stays safe to
// render on the server and the player stays out of the initial bundle. Most icons render with the
// light player (~45% smaller); the few that need expressions get the full one.
const loadLottie = (needsFullPlayer: boolean): Promise<LottiePlayer> => {
  if (needsFullPlayer) {
    full ??= import('lottie-web').then(unwrap);
    return full;
  }
  light ??= import('lottie-web/build/player/lottie_light').then(unwrap);
  return light;
};

export default loadLottie;
