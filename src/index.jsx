import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import getAnimationData from './getAnimationData';

export const CLICK_PLAY_AND_BACKWARDS = 'CLICK_PLAY_AND_BACKWARDS';
export const CLICK_PLAY = 'CLICK_PLAY';
export const HOVER_PLAY_AND_STOP = 'HOVER_PLAY_AND_STOP';
export const CLICK_PLAY_AND_SEGMENTS = 'CLICK_PLAY_AND_SEGMENTS';

const getEvents = ({ setEvents, animation, effect }) => {
    if (effect === CLICK_PLAY_AND_SEGMENTS) {
        return setEvents({
            onClick:  () => animation.playSegments([0, 60], true),
        })
    }

    if (effect === CLICK_PLAY) {
        return setEvents({
            onClick: () => {
                animation.stop();
                animation.play();
            }
        })
    }

    if (effect === HOVER_PLAY_AND_STOP) {
        return setEvents({
            onMouseEnter: () => animation.play(),
            onMouseLeave: () => animation.stop(),
        })
    }

    if (effect === CLICK_PLAY_AND_BACKWARDS) {
        let directionMenu = 1;

        return setEvents({
            onClick: () => {
                animation.setDirection(directionMenu);
                animation.play();
                directionMenu = -directionMenu;
            }
        })
    }
}

export default ({ options, animationKey, ariaLabel, effect, loop, autoplay, ...other }) => {
    const element = useRef(null);
    const [animation, setAnimation] = useState(null);
    const [events, setEvents] = useState();

    useEffect(() => {
        let defaultOptions = {
            container: element.current,
            renderer: 'svg',
            animationData: getAnimationData(animationKey),
            loop,
            autoplay,
            ...options,
        };

        setAnimation(lottie.loadAnimation(defaultOptions));
        
        return () => {
            animation.destroy();
            setAnimation(null);
        };
    }, []);
    
    getEvents({ setEvents, animation, effect })


    const defaultStyles = {
        overflow: 'hidden',
        outline: 'none',
    }

    return (
        <div
            ref={element}
            aria-label={ariaLabel}
            style={defaultStyles}
            tabIndex="0"
            {...events}
            {...other}
        />
    );
};
