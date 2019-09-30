import React from 'react';
import lottie from 'lottie-web';
import { getEffect, getAnimationData, getEvents, LOOP_PLAY } from './utils';

export default class InputStory extends React.Component {
  element = React.createRef();

  componentDidMount() {
    console.log(111)
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

    animation.destroy();
    this.setAnimation(null);
  }

  setAnimation = animation => this.setState({ animation });

  render() {
    const { animationKey, ariaLabel, className } = this.props;
    const { animation } = this.state;

    const defaultStyles = {
      overflow: 'hidden',
      outline: 'none',
    };

    return (
      <div
        ref={this.element.current}
        aria-label={ariaLabel}
        style={defaultStyles}
        {...getEvents({
          animation,
          animEffect: getEffect(animationKey),
        })}
        {...className}
      />
    );
  }
}
