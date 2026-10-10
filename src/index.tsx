import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import type { AnimationConfigWithData, AnimationItem } from 'lottie-web';

import { hoverEnd, hoverStart, isHover, replay, toggle } from './interactions';
import loadLottie from './lottie';
import { injectStyles, usePrefersReducedMotion } from './styles';
import type { Animation, Interaction } from './types';

type MouseHandler = (event: React.MouseEvent<HTMLElement>) => void;

export type EventProps = {
  onClick: MouseHandler;
  onMouseEnter: MouseHandler;
  onMouseLeave: MouseHandler;
};

export type AnimationProps = React.HTMLAttributes<HTMLElement> & {
  'data-useanimations': '';
  ref: (element: HTMLElement | null) => void;
  style: React.CSSProperties;
};

type OwnProps = {
  /** Icon imported from `react-useanimations/lib/<name>`, or `{ animationData, interaction }` for your own Lottie JSON. */
  animation: Animation;
  /** Overrides the icon's default interaction, e.g. `'hover'` for an icon that normally plays on click. */
  interaction?: Interaction;
  /** For `click-toggle` icons: `true` shows the end state (e.g. a checked checkbox). Can be controlled. */
  active?: boolean;
  /** @deprecated Use `active`. */
  reverse?: boolean;
  /** Width and height; numbers are pixels. Default `24`. */
  size?: number | string;
  /** Color of the icon's strokes. Default `'currentColor'`, so the icon follows the text color. */
  strokeColor?: string;
  /** Color of the icon's filled parts (e.g. a liked heart). Defaults to `strokeColor`. */
  fillColor?: string;
  /** Playback speed; `1` is normal speed. */
  speed?: number;
  /** Defaults to `true` for `loop` and `hover-loop` icons. */
  loop?: boolean | number;
  /** Defaults to `true` for `loop` icons, unless reduced motion is preferred. */
  autoplay?: boolean;
  /** Extra lottie-web options, applied when the animation loads. */
  options?: Partial<AnimationConfigWithData<'svg'>>;
  /** @deprecated Use `style`. */
  wrapperStyle?: React.CSSProperties;
  /** Renders a custom wrapper: spread `eventProps` on the interactive element, `animationProps` on a span inside it. */
  render?: (eventProps: EventProps, animationProps: AnimationProps) => React.ReactElement;
};

export type UseAnimationsProps = OwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, keyof OwnProps>;

export type { Animation, Interaction };
export type { AnimationKey } from './icons';

const missingAnimation = (): never => {
  throw new Error(
    "UseAnimations: the `animation` prop is missing. Import an icon and pass it, e.g. `import github from 'react-useanimations/lib/github'` and `<UseAnimations animation={github} />`."
  );
};

const UseAnimations = (props: UseAnimationsProps): React.ReactElement => {
  const {
    animation,
    interaction: interactionProp,
    active: activeProp,
    reverse,
    size = 24,
    speed = 1,
    strokeColor,
    fillColor,
    loop,
    autoplay,
    options,
    wrapperStyle,
    render,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...other
  } = props;
  const {
    animationData,
    interaction: defaultInteraction,
    fullPlayer = false,
  } = animation?.animationData ? animation : missingAnimation();
  const active = activeProp ?? reverse ?? false;

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [player, setPlayer] = useState<AnimationItem | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  // Whether a click-toggle animation currently sits at its end state.
  const atEnd = useRef(false);
  // Whether a hover-loop animation should stop when its current cycle completes.
  const stopAfterCycle = useRef(false);
  // Latest values read when the animation (re)loads, without reloading when they change.
  const latest = useRef({ options, speed, active });

  const interaction = interactionProp ?? defaultInteraction ?? 'click-replay';
  const shouldLoop = loop ?? (interaction === 'loop' || interaction === 'hover-loop');
  const shouldAutoplay = autoplay ?? (interaction === 'loop' && !reducedMotion);

  useEffect(() => {
    latest.current = { options, speed, active };
  });

  // LOAD THE ANIMATION; the cleanup destroys exactly the instance this effect created
  useEffect(() => {
    if (!container) return undefined;
    injectStyles(container.ownerDocument);

    let cancelled = false;
    let instance: AnimationItem | undefined;

    loadLottie(fullPlayer).then((lottie) => {
      if (cancelled) return;
      const { options: custom, speed: initialSpeed } = latest.current;
      const created = lottie.loadAnimation({
        container,
        renderer: 'svg',
        animationData,
        loop: shouldLoop,
        autoplay: shouldAutoplay,
        ...custom,
        rendererSettings: { progressiveLoad: true, ...custom?.rendererSettings },
      });
      instance = created;
      created.setSpeed(initialSpeed);
      const stopCycle = () => {
        if (!stopAfterCycle.current) return;
        stopAfterCycle.current = false;
        created.goToAndStop(0, true);
      };
      created.addEventListener('loopComplete', stopCycle);
      created.addEventListener('complete', stopCycle);
      const ready = () => {
        if (cancelled) return;
        // A controlled toggle that starts active shows its end state without animating.
        atEnd.current = interaction === 'click-toggle' && latest.current.active;
        if (atEnd.current) created.goToAndStop(created.totalFrames - 1, true);
        setPlayer(created);
      };
      if (created.isLoaded) ready();
      else created.addEventListener('DOMLoaded', ready);
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      setPlayer(null);
    };
  }, [container, animationData, fullPlayer, interaction, shouldLoop, shouldAutoplay]);

  useEffect(() => {
    player?.setSpeed(speed);
  }, [player, speed]);

  // CONTROLLED TOGGLE STATE (e.g. a checkbox checked from the outside)
  useEffect(() => {
    if (!player || interaction !== 'click-toggle' || active === atEnd.current) return;
    atEnd.current = active;
    toggle(player, active, reducedMotion);
  }, [player, interaction, active, reducedMotion]);

  const eventProps: EventProps = {
    onClick: (event) => {
      onClick?.(event as React.MouseEvent<HTMLSpanElement>);
      if (!player || event.defaultPrevented) return;
      if (interaction === 'click-toggle') {
        atEnd.current = !atEnd.current;
        toggle(player, atEnd.current, reducedMotion);
      } else if (interaction === 'click-replay' && !reducedMotion) {
        replay(player);
      }
    },
    onMouseEnter: (event) => {
      onMouseEnter?.(event as React.MouseEvent<HTMLSpanElement>);
      if (!player || event.defaultPrevented || !isHover(interaction) || reducedMotion) return;
      stopAfterCycle.current = false;
      hoverStart(player, interaction);
    },
    onMouseLeave: (event) => {
      onMouseLeave?.(event as React.MouseEvent<HTMLSpanElement>);
      if (!player || event.defaultPrevented || !isHover(interaction) || reducedMotion) return;
      stopAfterCycle.current = hoverEnd(player, interaction);
    },
  };

  // Decorative unless labelled; a labelled icon is announced as an image.
  const labelled = Boolean(other['aria-label'] || other['aria-labelledby']);
  const animationProps: AnimationProps = {
    'aria-hidden': labelled ? undefined : true,
    role: labelled ? 'img' : undefined,
    ...other,
    'data-useanimations': '',
    ref: setContainer,
    style: {
      display: 'inline-block',
      flexShrink: 0,
      overflow: 'hidden',
      width: size,
      height: size,
      ...({ '--ua-stroke': strokeColor, '--ua-fill': fillColor } as React.CSSProperties),
      ...wrapperStyle,
      ...style,
    },
  };

  // The handlers read refs only when events fire, never during render.
  // eslint-disable-next-line react-hooks/refs
  return render ? render(eventProps, animationProps) : <span {...animationProps} {...eventProps} />;
};

export { UseAnimations, UseAnimations as UseAnimation };
export type { UseAnimationsProps as UseAnimationProps };
export default UseAnimations;
