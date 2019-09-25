import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import getAnimationData from './getAnimationData';
const CLICK_PLAY_AND_BACKWARDS = 'CLICK_PLAY_AND_BACKWARDS';
const HOVER_PLAY_AND_STOP = 'HOVER_PLAY_AND_STOP';
const HOVER_PLAY_AND_BACKWARDS = 'HOVER_PLAY_AND_BACKWARDS';
const CLICK_PLAY = 'CLICK_PLAY';
const LOOP_PLAY = 'LOOP_PLAY';
const CLICK_PLAY_AND_SEGMENTS = 'CLICK_PLAY_AND_SEGMENTS';

const getEvents = ({ animation, effect }) => {
  if (effect === CLICK_PLAY_AND_SEGMENTS) {
    return {
      onClick: () => {
        animation.stop()
        animation.play()
      },
    };
  }

  if (effect === CLICK_PLAY) {
    return {
      onClick: () => {
        animation.stop();
        animation.play();
      },
    };
  }

  if (effect === HOVER_PLAY_AND_STOP) {
    return {
      onMouseEnter: () => animation.play(),
      onMouseLeave: () => animation.stop(),
    };
  }


  if (effect === HOVER_PLAY_AND_BACKWARDS) {
    let directionMenu = 1;


    return {
      onMouseEnter: () => {
        animation.setDirection(1);
        animation.play();


      },
      onMouseLeave: () => {

        animation.setDirection(-1);
        animation.play();

        console.log('onMouseLeave')

      },
    };
  }

  if (effect === CLICK_PLAY_AND_BACKWARDS) {
    let directionMenu = 1;

    return {
      onClick: () => {
        animation.setDirection(directionMenu);
        animation.play();
        directionMenu = -directionMenu;
      },
    };
  }
};

export default ({
  options,
  animationKey,
  ariaLabel,
  effect,
  loop,
  autoplay,
  ...other
}) => {
  const element = useRef(null);
  const [animation, setAnimation] = useState(null);
  const [events, setEvents] = useState();

  useEffect(() => {
    let defaultOptions = {
      container: element.current,
      renderer: 'svg',
      animationData: getAnimationData(animationKey),
      loop: loop || effect === LOOP_PLAY,
      autoplay: autoplay || effect === LOOP_PLAY,
      ...options,
    };

    setAnimation(lottie.loadAnimation(defaultOptions));

    return () => {
      animation.destroy();
      setAnimation(null);
    };
  }, []);

  const defaultStyles = {
    overflow: 'hidden',
    outline: 'none',
  };

  return (
    <div
      ref={element}
      aria-label={ariaLabel}
      style={defaultStyles}
      tabIndex="0"
      {...getEvents({ animation, effect })}
      {...other}
    />
  );
};
