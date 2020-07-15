import React, { useState, useEffect, useRef } from 'react';
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
  pathCss?: string;
  options?: Partial<AnimationConfig>;
  size?: number;
  loop?: AnimationConfig['loop'];
  autoplay?: AnimationConfig['autoplay'];
  wrapperStyle?: React.CSSProperties;
} & React.HTMLProps<HTMLDivElement>;

const UseAnimations: React.FC<Props> = ({
  animation: { animationData, animationKey },
  reverse = false,
  size = 24,
  strokeColor,
  pathCss,
  loop,
  autoplay,
  wrapperStyle,
  options,
  onClick,
  ...other
}) => {
  const [animation, setAnimation] = useState<AnimationItem>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animEffect: AnimationEffect = getEffect(animationKey);
    const animationId = getRandomId(animationKey);

    if (strokeColor || pathCss) {
      try {
        const css = `#${animationId} path { stroke: ${strokeColor || 'inherit'}; ${pathCss || ''}}`;
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
  }, []);

  const defaultStyles = {
    overflow: 'hidden',
    outline: 'none',
    width: `${size}px`,
    height: `${size}px`,
    ...wrapperStyle,
  };

  const eventProps = animation
    ? getEvents({
        animation,
        reverse,
        animEffect: getEffect(animationKey),
      })
    : undefined;

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

  return <div {...animationProps} />;
};

export default UseAnimations;
