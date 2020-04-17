import { AnimationItem, AnimationDirection } from 'lottie-web';

import {
  CLICK_PLAY_AND_BACKWARDS,
  HOVER_PLAY_AND_STOP,
  HOVER_PLAY_AND_BACKWARDS,
  CLICK_PLAY,
  CLICK_PLAY_AND_SEGMENTS,
} from './constants';

const getClickAndPlaySegmentsEvents = (animation: AnimationItem) => ({
  onClick: () => animation.playSegments([0, 60], true),
});

const getClickPlayEvents = (animation: AnimationItem) => ({
  onClick: () => {
    animation.stop();
    animation.play();
  },
});

const getHoverPlayAndStop = (animation: AnimationItem) => ({
  onMouseEnter: () => animation.play(),
  onMouseLeave: () => animation.stop(),
});

const getHoverPlayBackwardsEvents = (animation: AnimationItem) => ({
  onMouseEnter: () => {
    animation.setDirection(1);
    animation.play();
  },
  onMouseLeave: () => {
    animation.setDirection(-1);
    animation.play();
  },
});

const getClickAndPlayBackwardsEvents = (animation: AnimationItem) => {
  let directionMenu: AnimationDirection = 1;

  return {
    onClick: () => {
      animation.setDirection(directionMenu);
      animation.play();
      directionMenu = -directionMenu as AnimationDirection;
    },
  };
};

const getEvents = ({ animation, animEffect }: { animation: AnimationItem, animEffect: string }) => {
  if (animEffect === CLICK_PLAY_AND_SEGMENTS) {
    return getClickAndPlaySegmentsEvents(animation);
  }

  if (animEffect === CLICK_PLAY) {
    return getClickPlayEvents(animation);
  }

  if (animEffect === HOVER_PLAY_AND_STOP) {
    return getHoverPlayAndStop(animation);
  }

  if (animEffect === HOVER_PLAY_AND_BACKWARDS) {
    return getHoverPlayBackwardsEvents(animation);
  }

  if (animEffect === CLICK_PLAY_AND_BACKWARDS) {
    return getClickAndPlayBackwardsEvents(animation);
  }

  return getClickPlayEvents(animation);
};

export default getEvents;
