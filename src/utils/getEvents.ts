import type { AnimationEffect } from './constants';

const getClickAndPlaySegmentsEvents = (animation: any) => ({
  onClick: () => animation.playSegments([0, 60], true),
});

const getClickPlayEvents = (animation: any) => ({
  onClick: () => {
    animation.stop();
    animation.play();
  },
});

const getHoverPlayAndStop = (animation: any) => ({
  onMouseEnter: () => animation.play(),
  onMouseLeave: () => animation.stop(),
});

const getHoverPlayBackwardsEvents = (animation: any) => ({
  onMouseEnter: () => {
    animation.setDirection(1);
    animation.play();
  },
  onMouseLeave: () => {
    animation.setDirection(-1);
    animation.play();
  },
});

const getClickAndPlayBackwardsEvents = (animation: any, reverse: boolean) => {
  let directionMenu = 1;

  // EG CHECKBOX WHICH NEED TO BE CHECKED AS INITIAL STATE, LET'S PLAY THE ANIMATION ASAP AUTOMATICALLY
  if (reverse) {
    animation.setDirection(directionMenu);
    animation.play();
    directionMenu *= -1;
  }

  return {
    onClick: () => {
      animation.setDirection(directionMenu);
      animation.play();
      directionMenu *= -1;
    },
  };
};

const getEvents = ({
  animation,
  reverse,
  animEffect,
}: {
  animation: any;
  reverse: boolean;
  animEffect: AnimationEffect;
}) => {
  if (animEffect === 'CLICK_PLAY_AND_SEGMENTS') {
    return getClickAndPlaySegmentsEvents(animation);
  }

  if (animEffect === 'CLICK_PLAY') {
    return getClickPlayEvents(animation);
  }

  if (animEffect === 'HOVER_PLAY_AND_STOP') {
    return getHoverPlayAndStop(animation);
  }

  if (animEffect === 'HOVER_PLAY_AND_BACKWARDS') {
    return getHoverPlayBackwardsEvents(animation);
  }

  if (animEffect === 'CLICK_PLAY_AND_BACKWARDS') {
    return getClickAndPlayBackwardsEvents(animation, reverse);
  }

  return getClickPlayEvents(animation);
};

export default getEvents;
