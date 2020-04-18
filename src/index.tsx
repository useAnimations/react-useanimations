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
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const UseAnimations: React.FC<Props> = ({
  animationKey,
  size = 24,
  loop,
  autoplay,
  style,
  options,
  onClick,
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

  const eventProps = animation ? getEvents({
    animation,
    animEffect: getEffect(animationKey),
  }) : undefined;

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

  return <ColoredIcon {...animationProps} />;
};

export default UseAnimations;
