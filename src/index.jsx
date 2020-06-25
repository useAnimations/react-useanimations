import React from 'react';
import lottieLight from 'lottie-web/build/player/lottie_light';
import styled from 'styled-components';
import { getEffect, getEvents, LOOP_PLAY } from './utils';

const ColoredIcon = styled.div`
  path {
    stroke: ${({ strokeColor }) => strokeColor || 'currentColor;'};
    fill: ${({ fillColor }) => fillColor || 'currentColor;'};
  }
`;

export default class UseAnimations extends React.Component {
  state = {
    animation: null,
  };

  element = React.createRef();

  componentDidMount() {
    const { animation, animationKey, loop, autoplay, options } = this.props;
    const animEffect = getEffect(animationKey);

    const defaultOptions = {
      container: this.element.current,
      renderer: 'svg',
      animationData: animation,
      loop: loop || animEffect === LOOP_PLAY,
      autoplay: autoplay || animEffect === LOOP_PLAY,
      ...options,
    };

    this.setAnimation(lottieLight.loadAnimation(defaultOptions));
  }

  componentWillUnmount() {
    const { animation } = this.state;

    if (animation) {
      animation.destroy();
    }

    this.setAnimation(null);
  }

  setAnimation = (animation) => this.setState({ animation });

  render() {
    const { animationKey, size, style, ...other } = this.props;
    const { animation } = this.state;

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

UseAnimations.defaultProps = {
  size: 24,
};
