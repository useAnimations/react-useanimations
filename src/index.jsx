import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import getAnimationData from './getAnimationData';

export const CLICK_PLAY_AND_BACKWARDS = 'CLICK_PLAY_AND_BACKWARDS';
export const CLICK_PLAY = 'CLICK_PLAY';
export const HOVER_PLAY_AND_STOP = 'HOVER_PLAY_AND_STOP';
export const CLICK_PLAY_AND_SEGMENTS = 'CLICK_PLAY_AND_SEGMENTS';

export default ({ options, animationKey, ariaLabel, effect, ...other }) => {
    let animation;
    const element = useRef(null);

    useEffect(() => {
        let defaultOptions = {
            container: element.current,
            renderer: 'svg',
            animationData: getAnimationData(animationKey),
            ...options,
        };

        animation = lottie.loadAnimation(defaultOptions);

        return () => {
            animation.destroy();
            animation = null;
        };
    }, []);

    const playSegments = () => animation.playSegments([0, 60], true);

    const handleClickPlay = () => {
        animation.stop();
        animation.play();
    };

    let actions;

    if (effect === CLICK_PLAY_AND_SEGMENTS) {
        actions = {
            onClick: playSegments,
        };
    }

    if (effect === CLICK_PLAY) {
        actions = {
            onClick: handleClickPlay,
        };
    }

    if (effect === HOVER_PLAY_AND_STOP) {
        actions = {
            onMouseEnter: () => animation.play,
            onMouseLeave: () => animation.stop,
        };
    }

    var directionMenu = 1;

    if (effect === CLICK_PLAY_AND_BACKWARDS) {
        actions = {
            onClick: () => {
                animation.setDirection(directionMenu);
                animation.play();
                directionMenu = -directionMenu;
            },
        };
    }

    return (
        <div
            ref={element}
            aria-label={ariaLabel}
            tabIndex="0"
            {...actions}
            {...other}
        />
    );
};
