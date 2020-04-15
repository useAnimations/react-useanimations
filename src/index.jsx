import React from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';
import { getEffect, getAnimationData, getEvents, LOOP_PLAY } from './utils';

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
    const { animationKey, loop, autoplay, options } = this.props;
    const animEffect = getEffect(animationKey);

    const defaultOptions = {
      container: this.element.current,
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

  setAnimation = animation => this.setState({ animation });

  render() {
    const { animationKey, size, style, onClick, ...other } = this.props;
    const { animation } = this.state;

    const defaultStyles = {
      overflow: 'hidden',
      outline: 'none',
      width: size,
      ...style,
    };

    const eventProps = getEvents({
      animation,
      animEffect: getEffect(animationKey),
    });

    const handleClick = (e) => {
      if (eventProps.onClick) eventProps.onClick(e);
      if (onClick) onClick(e);
    };

    const animationProps = {
      ref: this.element,
      ...other,
      style: defaultStyles,
      ...eventProps,
      onClick: handleClick,
    };

    return <ColoredIcon {...animationProps} />;
  }
}

UseAnimations.defaultProps = {
  size: 24,
};
