import {
  CLICK_PLAY_AND_BACKWARDS,
  HOVER_PLAY_AND_STOP,
  HOVER_PLAY_AND_BACKWARDS,
  CLICK_PLAY,
  CLICK_PLAY_AND_SEGMENTS,
} from './constants';

const getEvents = ({ animation, animEffect }) => {
  if (animEffect === CLICK_PLAY_AND_SEGMENTS) {
    return {
      onClick: () => animation.playSegments([0, 60], true),
    };
  }

  if (animEffect === CLICK_PLAY) {
    return {
      onClick: () => {
        animation.stop();
        animation.play();
      },
    };
  }

  if (animEffect === HOVER_PLAY_AND_STOP) {
    return {
      onMouseEnter: () => animation.play(),
      onMouseLeave: () => animation.stop(),
    };
  }

  if (animEffect === HOVER_PLAY_AND_BACKWARDS) {
    return {
      onMouseEnter: () => {
        animation.setDirection(1);
        animation.play();
      },
      onMouseLeave: () => {
        animation.setDirection(-1);
        animation.play();
      },
    };
  }

  if (animEffect === CLICK_PLAY_AND_BACKWARDS) {
    let directionMenu = 1;

    return {
      onClick: () => {
        animation.setDirection(directionMenu);
        animation.play();
        directionMenu = -directionMenu;
      },
    };
  }

  return null;
};

export default getEvents;
