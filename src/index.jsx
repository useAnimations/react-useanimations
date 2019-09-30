import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { getEffect, getAnimationData, getEvents, LOOP_PLAY } from './utils';

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

  useEffect(() => {
    const animEffect = getEffect(animationKey);

    const defaultOptions = {
      container: element.current,
      renderer: 'svg',
      animationData: getAnimationData(animationKey),
      loop: loop || animEffect === LOOP_PLAY,
      autoplay: autoplay || animEffect === LOOP_PLAY,
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
      {...getEvents({ animation, animEffect: getEffect(animationKey) })}
      {...other}
    />
  );
};
