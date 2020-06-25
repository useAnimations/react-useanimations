import React from 'react';
import lottieLight from 'lottie-web/build/player/lottie_light';
import { getEffect, getEvents, LOOP_PLAY } from './utils';

export default class UseAnimations extends React.Component {
  state = {
    animation: null,
  };

  element = React.createRef();

  componentDidMount() {
    const { animation, animationKey, loop, autoplay, fillColor, strokeColor, options } = this.props;
    const animEffect = getEffect(animationKey);
    const animationId = this.getRandomId(animationKey);

    if (fillColor || strokeColor) {
      const css = `#${animationId} path { fill: ${fillColor || 'inherit'}; stroke: ${
        strokeColor || 'inherit'
      }; }`;
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }

    const defaultOptions = {
      container: this.element.current,
      renderer: 'svg',
      animationData: animation,
      loop: loop || animEffect === LOOP_PLAY,
      autoplay: autoplay || animEffect === LOOP_PLAY,
      rendererSettings: {
        id: animationId,
      },
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

  getRandomId = (key) => `${key}_${Math.floor(Math.random() * 8 + 5)}`;

  render() {
    const { animationKey, size, wrapperStyle, ...other } = this.props;
    const { animation } = this.state;

    const defaultStyles = {
      overflow: 'hidden',
      outline: 'none',
      width: size,
      ...wrapperStyle,
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

    return <div {...animationProps} />;
  }
}

UseAnimations.defaultProps = {
  size: 24,
};
