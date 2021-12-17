import React, { useState, useEffect, useRef, ReactElement } from 'react';
// UNFORTUNATELY WHEN LIGHT VERSION IS USED, SOME ANIMATIONS ARE NOT WORKING AS EXPECTED
// import lottie from 'lottie-web/build/player/lottie_light';
import lottie from 'lottie-web';
import type { AnimationItem, AnimationConfigWithData, AnimationConfig } from 'lottie-web';

import { getEffect, getEvents } from './utils';
import type { Animation, AnimationEffect } from './utils';

const getRandomId = (key: Animation['animationKey']) =>
  `${key}_i${Math.floor(Math.random() * 10000 + 1)}`;

type Props = {
  animation: Animation;
  reverse?: boolean;
  strokeColor?: string;
  fillColor?: string;
  pathCss?: string;
  options?: Partial<AnimationConfig>;
  size?: number;
  loop?: AnimationConfig['loop'];
  autoplay?: AnimationConfig['autoplay'];
  speed?: number;
  wrapperStyle?: React.CSSProperties;
  render?: (eventProps: any, animationProps: any) => ReactElement;
} & React.HTMLProps<HTMLDivElement>;

const UseAnimations: React.FC<Props> = ({
  animation: { animationData, animationKey },
  reverse = false,
  size = 24,
  speed = 1,
  strokeColor,
  fillColor,
  pathCss,
  loop,
  autoplay,
  wrapperStyle,
  options,
  onClick,
  render,
  ...other
}) => {
  const [animation, setAnimation] = useState<AnimationItem>();
  const [animationId] = useState<string>(getRandomId(animationKey));
  const [events, setEvents] = useState<any>({});
  const ref = useRef<HTMLDivElement>(null);

  const defaultStyles = {
    overflow: 'hidden',
    outline: 'none',
    width: `${size}px`,
    height: `${size}px`,
    ...wrapperStyle,
  };

  // INVOKE THE LOTTIE ANIMATION
  useEffect(() => {
    const animEffect: AnimationEffect = getEffect(animationKey);

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

    setAnimation(lottie.loadAnimation(defaultOptions));

    return () => {
      animation?.destroy();
      setAnimation(undefined);
    };
  }, []);

  // HANDLE STYLING FOR ANIMATION
  useEffect(() => {
    if (strokeColor || fillColor || pathCss) {
      try {
        const css = `#${animationId} path { ${strokeColor ? `stroke: ${strokeColor};` : ''}  ${
          fillColor ? `fill: ${fillColor};` : ''
        } ${pathCss || ''}}`;
        let sheetEl: any = document.getElementById('useAnimationsSheet');

        // STYLESHEET HASN'T BEEN CREATED YET
        if (!sheetEl) {
          sheetEl = document.createElement('style');
          sheetEl.setAttribute('id', 'useAnimationsSheet');
          sheetEl.appendChild(document.createTextNode(''));
          document.head.appendChild(sheetEl);
        }

        const sheet = sheetEl ? sheetEl.sheet || sheetEl.styleSheet : null;
        sheet.insertRule(css);
      } catch (err) {
        // eslint-disable-next-line
        console.warn(
          `There's been a problem with deleting a CSSRule, please report that issue in https://github.com/useAnimations/react-useanimations`,
          err
        );
      }
    }

    return () => {
      // DELETE CSS RULE
      try {
        const sheetEl: any = document.getElementById('useAnimationsSheet');
        const sheet = sheetEl ? sheetEl.sheet || sheetEl.styleSheet : null;

        if (sheet) {
          const animationRuleIndex = Array.from(sheet.cssRules).findIndex(
            (rule: any) => rule.selectorText === `#${animationId} path`
          );

          if (animationRuleIndex !== -1) {
            sheet.deleteRule(animationRuleIndex);
          }
        }
      } catch (err) {
        // eslint-disable-next-line
        console.warn(
          `There's been a problem with deleting a CSSRule, please report that issue in https://github.com/useAnimations/react-useanimations`,
          err
        );
      }
    };
  }, [strokeColor, fillColor, pathCss]);

  // SET NAVIGATION EVENTS
  useEffect(() => {
    // eslint-disable-next-line
    const events = animation
      ? getEvents({
          animation,
          reverse,
          animEffect: getEffect(animationKey),
        })
      : undefined;

    if (events) setEvents(events);
  }, [animation, reverse]);

  // SET ANIMATION SPEED
  useEffect(() => {
    if (animation) {
      animation.setSpeed(speed);
    }
  }, [animation, speed]);

  const eventProps = {
    ...events,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) onClick(e);
      if (events && 'onClick' in events) events.onClick();
    },
  };

  const animationProps = {
    ref,
    ...other,
    style: defaultStyles,
  };

  return render ? render(eventProps, animationProps) : <div {...eventProps} {...animationProps} />;
};

export default UseAnimations;
