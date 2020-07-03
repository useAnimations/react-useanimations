import React, { useState, useEffect, useRef } from 'react';
import lottieLight from 'lottie-web/build/player/lottie_light';
import type { AnimationItem, AnimationConfigWithData, AnimationConfig } from 'lottie-web';

import { getEffect, getEvents } from './utils';
import type { Animation, AnimationEffect } from './utils';

type Props = {
  animation: Animation;
  fillColor?: string;
  strokeColor?: string;
  options?: Partial<AnimationConfig>;
  size?: number;
  loop?: AnimationConfig['loop'];
  autoplay?: AnimationConfig['autoplay'];
  wrapperStyle?: React.CSSProperties;
} & React.HTMLProps<HTMLDivElement>;

const UseAnimations: React.FC<Props> = ({
  animation: { animationData, animationKey },
  size = 24,
  fillColor,
  strokeColor,
  loop,
  autoplay,
  wrapperStyle,
  options,
  onClick,
  ...other
}) => {
  const [animation, setAnimation] = useState<AnimationItem>();
  const ref = useRef<HTMLDivElement>(null);
  const getRandomId = (key: Animation['animationKey']) =>
    `${key}_i${Math.floor(Math.random() * 100 + 1)}`;

  useEffect(() => {
    const animEffect: AnimationEffect = getEffect(animationKey);
    const animationId = getRandomId(animationKey);

    if (fillColor || strokeColor) {
      const css = `#${animationId} path { fill: ${fillColor || 'inherit'}; stroke: ${
        strokeColor || 'inherit'
      }; }`;
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }

    const defaultOptions: AnimationConfigWithData = {
      container: ref.current as Element,
      renderer: 'svg',
      animationData,
      loop: loop || animEffect === 'LOOP_PLAY',
      autoplay: autoplay || animEffect === 'LOOP_PLAY',
      rendererSettings: {
        // LOADS DOM ELEMENTS WHEN NEEDED. MIGHT SPEED UP INITIALIZATION FOR LARGE NUMBER OF ELEMENTS.
        progressiveLoad: true,
        // lottie-web missing id type
        // @ts-ignore-next-line
        id: animationId,
      },
      ...options,
    };

    setAnimation(lottieLight.loadAnimation(defaultOptions));

    return () => {
      animation?.destroy();
      setAnimation(undefined);
    };
  }, []);

  const defaultStyles = {
    overflow: 'hidden',
    outline: 'none',
    width: size,
    ...wrapperStyle,
  };

  const eventProps = animation
    ? getEvents({
        animation,
        animEffect: getEffect(animationKey),
      })
    : undefined;

  const animationProps = {
    ref,
    ...other,
    style: defaultStyles,
    ...eventProps,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) onClick(e);
      if (eventProps && 'onClick' in eventProps) eventProps.onClick();
    },
  };

  return <div {...animationProps} />;
};

export default UseAnimations;
