import {
  CLICK_PLAY_AND_BACKWARDS,
  HOVER_PLAY_AND_STOP,
  HOVER_PLAY_AND_BACKWARDS,
  CLICK_PLAY,
  CLICK_PLAY_AND_SEGMENTS,
} from './constants';

const getClickAndPlaySegmentsEvents = animation => ({
  onClick: () => animation.playSegments([0, 60], true),
});

const getClickPlayEvents = animation => ({
  onClick: () => {
    animation.stop();
    animation.play();
  },
});

const getHoverPlayAndStop = animation => ({
  onMouseEnter: () => animation.play(),
  onMouseLeave: () => animation.stop(),
});

const getHoverPlayBackwardsEvents = animation => ({
  onMouseEnter: () => {
    animation.setDirection(1);
    animation.play();
  },
  onMouseLeave: () => {
    animation.setDirection(-1);
    animation.play();
  },
});

const getClickAndPlayBackwardsEvents = animation => {
  let directionMenu = 1;

  return {
    onClick: () => {
      animation.setDirection(directionMenu);
      animation.play();
      directionMenu = -directionMenu;
    },
  };
};

const getEvents = ({ animation, animEffect }) => {
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
