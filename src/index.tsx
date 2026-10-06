import React, { useEffect, useRef, useState } from 'react';
import type { AnimationConfigWithData, AnimationItem } from 'lottie-web';

import { fullPlayerIcons } from './icons';
import { getInteraction, hoverEnd, hoverStart, playToggle, replay } from './interactions';
import loadLottie from './lottie';
import type { Animation, Interaction } from './types';

type MouseHandler = (event: React.MouseEvent<HTMLElement>) => void;

export type EventProps = {
  onClick: MouseHandler;
  onMouseEnter: MouseHandler;
  onMouseLeave: MouseHandler;
};

export type AnimationProps = React.HTMLAttributes<HTMLDivElement> & {
  ref: React.Ref<HTMLDivElement>;
  style: React.CSSProperties;
};

type OwnProps = {
  /** Animation imported from `react-useanimations/lib/<name>`. */
  animation: Animation;
  /** Overrides the icon's default interaction, e.g. `'hover'` for an icon that normally plays on click. */
  interaction?: Interaction;
  /** For `click-toggle` icons: `true` shows the end state (e.g. a checked checkbox). Can be controlled. */
  reverse?: boolean;
  strokeColor?: string;
  fillColor?: string;
  /** Extra CSS declarations applied to every path of the icon. */
  pathCss?: string;
  /** Extra lottie-web options, applied when the animation loads. */
  options?: Partial<AnimationConfigWithData<'svg'>>;
  size?: number;
  loop?: boolean | number;
  autoplay?: boolean;
  speed?: number;
  wrapperStyle?: React.CSSProperties;
  /** Renders a custom wrapper: spread `eventProps` on the interactive element, `animationProps` on a div. */
  render?: (eventProps: EventProps, animationProps: AnimationProps) => React.ReactElement;
};

export type UseAnimationsProps = OwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof OwnProps>;

export type { Animation, Interaction };
export type { AnimationKey } from './icons';

let idCounter = 0;

const UseAnimations = (props: UseAnimationsProps): React.ReactElement => {
  const {
    animation: { animationData, animationKey },
    interaction: interactionProp,
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
    render,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...other
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<AnimationItem | null>(null);
  // Unique per component instance; used as the <svg> id that the color CSS targets.
  const [id] = useState(() => `useanimations-${(idCounter += 1)}`);
  // Whether a click-toggle animation currently sits at its end state.
  const atEnd = useRef(false);
  // Latest values read when the animation (re)loads, without reloading when they change.
  const latest = useRef({ options, speed });

  const interaction = interactionProp ?? getInteraction(animationKey);
  const shouldLoop = loop ?? (interaction === 'loop' || interaction === 'hover-loop');
  const shouldAutoplay = autoplay ?? interaction === 'loop';

  useEffect(() => {
    latest.current = { options, speed };
  });

  // LOAD THE ANIMATION; the cleanup destroys exactly the instance this effect created
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let instance: AnimationItem | undefined;

    loadLottie(fullPlayerIcons.has(animationKey)).then((lottie) => {
      if (cancelled) return;
      const { options: custom, speed: initialSpeed } = latest.current;
      instance = lottie.loadAnimation({
        container,
        renderer: 'svg',
        animationData,
        loop: shouldLoop,
        autoplay: shouldAutoplay,
        ...custom,
        // lottie-web supports `id` (set on the <svg>) but its types don't declare it.
        rendererSettings: {
          progressiveLoad: true,
          ...custom?.rendererSettings,
          id,
        } as AnimationConfigWithData<'svg'>['rendererSettings'],
      });
      instance.setSpeed(initialSpeed);
      atEnd.current = false;
      setPlayer(instance);
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      setPlayer(null);
    };
  }, [animationData, animationKey, shouldLoop, shouldAutoplay, id]);

  useEffect(() => {
    player?.setSpeed(speed);
  }, [player, speed]);

  // CONTROLLED TOGGLE STATE (e.g. a checkbox checked from the outside)
  useEffect(() => {
    if (!player || interaction !== 'click-toggle' || reverse === atEnd.current) return;
    atEnd.current = reverse;
    playToggle(player, reverse);
  }, [player, interaction, reverse]);

  // COLORS
  useEffect(() => {
    if (!strokeColor && !fillColor && !pathCss) return undefined;
    const sheet = document.createElement('style');
    sheet.textContent = `#${id} path { ${strokeColor ? `stroke: ${strokeColor};` : ''} ${
      fillColor ? `fill: ${fillColor};` : ''
    } ${pathCss ?? ''} }`;
    document.head.appendChild(sheet);
    return () => sheet.remove();
  }, [id, strokeColor, fillColor, pathCss]);

  const eventProps: EventProps = {
    onClick: (event) => {
      onClick?.(event as React.MouseEvent<HTMLDivElement>);
      if (!player || event.defaultPrevented) return;
      if (interaction === 'click-toggle') {
        atEnd.current = !atEnd.current;
        playToggle(player, atEnd.current);
      } else if (interaction === 'click-replay') {
        replay(player);
      }
    },
    onMouseEnter: (event) => {
      onMouseEnter?.(event as React.MouseEvent<HTMLDivElement>);
      if (!player || event.defaultPrevented) return;
      if (interaction === 'hover' || interaction === 'hover-loop') hoverStart(player, interaction);
    },
    onMouseLeave: (event) => {
      onMouseLeave?.(event as React.MouseEvent<HTMLDivElement>);
      if (!player || event.defaultPrevented) return;
      if (interaction === 'hover' || interaction === 'hover-loop') hoverEnd(player, interaction);
    },
  };

  const animationProps: AnimationProps = {
    ...other,
    ref: containerRef,
    style: {
      overflow: 'hidden',
      outline: 'none',
      width: `${size}px`,
      height: `${size}px`,
      ...wrapperStyle,
      ...style,
    },
  };

  // The render prop only receives the ref to attach it; neither branch reads it during render.
  // eslint-disable-next-line react-hooks/refs
  return render ? render(eventProps, animationProps) : <div {...eventProps} {...animationProps} />;
};

export default UseAnimations;
