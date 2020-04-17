import React from 'react';
import lottie, { AnimationItem, AnimationConfigWithData, AnimationConfig } from 'lottie-web';
import styled from '@emotion/styled';
import { getEffect, getAnimationData, getEvents, LOOP_PLAY, AnimationKey } from './utils';

const ColoredIcon = styled.div`
  path {
    stroke: ${({ strokeColor }: any) => strokeColor || 'currentColor'};
    fill: ${({ fillColor }: any) => fillColor || 'currentColor'};
  }
`;

type Props = {
  animationKey: AnimationKey,
  options?: Partial<AnimationConfig>,
  size?: number;
  loop?: AnimationConfig['loop'];
  autoplay?: AnimationConfig['autoplay'];
  style?: React.CSSProperties;
};

type State = {
  animation: AnimationItem | null,
};

export default class UseAnimations extends React.Component<Props, State> {
  state: State = {
    animation: null,
  };

  element = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const { animationKey, loop, autoplay, options } = this.props;
    const animEffect = getEffect(animationKey);

    const defaultOptions: AnimationConfigWithData = {
      container: this.element.current as Element,
      renderer: 'svg',
      animationData: getAnimationData(animationKey),
      loop: loop || animEffect === LOOP_PLAY,
      autoplay: autoplay || animEffect === LOOP_PLAY,
      ...options,
    };

    this.setAnimation(lottie.loadAnimation(defaultOptions));
  }

  componentWillUnmount() {
    const { animation } = this.state;

    if (animation) {
      animation.destroy();
    }

    this.setAnimation(null);
  }

  setAnimation = (animation: AnimationItem | null) => this.setState({ animation });

  render() {
    const { animationKey, size = 24, style, ...other } = this.props;
    const { animation } = this.state;

    if (!animation) {
      throw new Error('animation state not set');
    }

    const defaultStyles = {
      overflow: 'hidden',
      outline: 'none',
      width: size,
      ...style,
    };

    const animationProps = {
      ref: this.element,
      ...other,
      style: defaultStyles,
      ...getEvents({
        animation,
        animEffect: getEffect(animationKey),
      }),
    };

    return <ColoredIcon {...animationProps} />;
  }
}
