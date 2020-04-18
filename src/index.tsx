import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import lottie, {
  AnimationItem,
  AnimationConfigWithData,
  AnimationConfig,
} from 'lottie-web';

import {
  getEffect,
  getAnimationData,
  getEvents,
  LOOP_PLAY,
  AnimationKey,
} from './utils';

const ColoredIcon = styled.div`
  path {
    stroke: ${({ strokeColor }: any) => strokeColor || 'currentColor'};
    fill: ${({ fillColor }: any) => fillColor || 'currentColor'};
  }
`;

type Props = {
  animationKey: AnimationKey;
  options?: Partial<AnimationConfig>;
  size?: number;
  loop?: AnimationConfig['loop'];
  autoplay?: AnimationConfig['autoplay'];
  style?: React.CSSProperties;
};

const UseAnimations: React.FC<Props> = ({
  animationKey,
  size = 24,
  loop,
  autoplay,
  style,
  options,
  ...other
}) => {
  const [animation, setAnimation] = useState<AnimationItem>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animEffect = getEffect(animationKey);

    const defaultOptions: AnimationConfigWithData = {
      container: ref.current as Element,
      renderer: 'svg',
      animationData: getAnimationData(animationKey),
      loop: loop || animEffect === LOOP_PLAY,
      autoplay: autoplay || animEffect === LOOP_PLAY,
      ...options,
    };

    setAnimation(lottie.loadAnimation(defaultOptions));
  }, []);

  const defaultStyles = {
    overflow: 'hidden',
    outline: 'none',
    width: size,
    ...style,
  };

  let animationProps = {
    ref,
    ...other,
    style: defaultStyles,
  };

  if (animation) {
    animationProps = {
      ...animationProps,
      ...getEvents({
        animation,
        animEffect: getEffect(animationKey),
      }),
    };
  }

  return <ColoredIcon {...animationProps} />;
};

export default UseAnimations;
