import { useEffect, useRef, useState } from 'react';
// A namespace import: the emitted declarations then work without `esModuleInterop` or
// `allowSyntheticDefaultImports` in your tsconfig.
import type * as React from 'react';

import { hoverEnd, hoverStart, isHover, replay, toggle } from './interactions';
import { loadAnimation, type Player } from './player';
import { injectStyles, usePrefersReducedMotion } from './styles';
import type { Animation, Interaction } from './types';

export type EventProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  onPointerEnter: (event: React.PointerEvent<HTMLElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
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
  /** For `click-toggle` icons: `true` shows the end state (e.g. a checked checkbox). Controlled: set it in `onClick`. */
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
  /** @deprecated Use `style`. */
  wrapperStyle?: React.CSSProperties;
  /** Renders a custom wrapper: spread `eventProps` on the interactive element, `animationProps` on a span inside it. */
  render?: (eventProps: EventProps, animationProps: AnimationProps) => React.ReactElement;
};

export type UseAnimationsProps = OwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, keyof OwnProps>;

export type { Animation, Interaction };
export type { AnimationKey } from './icons';

// v2 props removed in v3: typed only here, so they stay out of UseAnimationsProps, and dropped so
// they don't end up as attributes of the wrapper.
type RemovedProps = { pathCss?: unknown; options?: unknown };
const REMOVED: Record<keyof RemovedProps, string> = {
  pathCss:
    'style the paths with CSS instead, e.g. `className="icon"` and `.icon path { stroke-width: 3px }`',
  options: 'use the `loop`, `autoplay` and `speed` props instead',
};
const warnedRemoved = new Set<string>();
const warnRemoved = (prop: keyof RemovedProps) => {
  if (warnedRemoved.has(prop)) return;
  warnedRemoved.add(prop);
  console.warn(
    `react-useanimations: the \`${prop}\` prop was removed in v3 and is ignored; ${REMOVED[prop]}.`
  );
};

const missingAnimation = (): never => {
  throw new Error(
    "UseAnimations: the `animation` prop is missing. Import an icon and pass it, e.g. `import github from 'react-useanimations/lib/github'` and `<UseAnimations animation={github} />`."
  );
};

const focusVisible = (element: Element) => {
  try {
    return element.matches(':focus-visible');
  } catch {
    return false;
  }
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
    wrapperStyle,
    render,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onFocus,
    onBlur,
    pathCss,
    options,
    ...other
  } = props as UseAnimationsProps & RemovedProps;
  const { animationData, interaction: defaultInteraction } = animation?.animationData
    ? animation
    : missingAnimation();
  const active = activeProp ?? reverse ?? false;

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const player = useRef<Player | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  // Whether a click-toggle animation currently sits at its end state.
  const atEnd = useRef(false);
  // Whether a hover-loop animation should stop when its current cycle completes.
  const stopAfterCycle = useRef(false);
  // Touch devices fire mouseenter on tap; hover animations ignore it.
  const lastPointer = useRef('');
  // Latest values read when the animation (re)loads, without reloading when they change.
  const latest = useRef({ speed, active });

  const interaction = interactionProp ?? defaultInteraction ?? 'click-replay';
  const shouldLoop = loop ?? (interaction === 'loop' || interaction === 'hover-loop');
  const shouldAutoplay = autoplay ?? (interaction === 'loop' && !reducedMotion);

  useEffect(() => {
    latest.current = { speed, active };
  });

  // Says once that a removed v2 prop is ignored, instead of ignoring it silently.
  const hasPathCss = pathCss !== undefined;
  const hasOptions = options !== undefined;
  useEffect(() => {
    if (hasPathCss) warnRemoved('pathCss');
    if (hasOptions) warnRemoved('options');
  }, [hasPathCss, hasOptions]);

  // LOAD THE ANIMATION; the cleanup destroys exactly the instance this effect created
  useEffect(() => {
    if (!container) return undefined;
    injectStyles(container);
    const created = loadAnimation({
      container,
      animationData,
      loop: shouldLoop,
      autoplay: shouldAutoplay,
    });
    created.setSpeed(latest.current.speed);
    const stopCycle = () => {
      if (!stopAfterCycle.current) return;
      stopAfterCycle.current = false;
      created.goToAndStop(0);
    };
    created.addEventListener('loopComplete', stopCycle);
    created.addEventListener('complete', stopCycle);
    // A controlled toggle that starts active shows its end state without animating.
    atEnd.current = interaction === 'click-toggle' && latest.current.active;
    if (atEnd.current) created.goToAndStop(created.totalFrames - 1);
    player.current = created;

    // Autoplaying animations pause while they are scrolled out of view.
    let observer: IntersectionObserver | undefined;
    if (shouldAutoplay && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) created.play();
        else created.pause();
      });
      observer.observe(container);
    }

    return () => {
      observer?.disconnect();
      created.destroy();
      player.current = null;
    };
  }, [container, animationData, interaction, shouldLoop, shouldAutoplay]);

  useEffect(() => {
    player.current?.setSpeed(speed);
  }, [speed]);

  // CONTROLLED TOGGLE STATE (e.g. a checkbox checked from the outside)
  useEffect(() => {
    const current = player.current;
    if (!current || interaction !== 'click-toggle' || active === atEnd.current) return;
    atEnd.current = active;
    toggle(current, active, reducedMotion);
  }, [interaction, active, reducedMotion]);

  const startHover = () => {
    if (!player.current || !isHover(interaction) || reducedMotion) return;
    stopAfterCycle.current = false;
    hoverStart(player.current, interaction);
  };
  const endHover = () => {
    if (!player.current || !isHover(interaction) || reducedMotion) return;
    stopAfterCycle.current = hoverEnd(player.current, interaction);
  };

  const eventProps: EventProps = {
    onClick: (event) => {
      onClick?.(event);
      const current = player.current;
      if (!current || event.defaultPrevented) return;
      // A controlled `active` animates through the effect above once the parent updates it;
      // with the deprecated `reverse`, clicks toggle the icon too, as in v2.
      if (interaction === 'click-toggle' && activeProp === undefined) {
        atEnd.current = !atEnd.current;
        toggle(current, atEnd.current, reducedMotion);
      } else if (interaction === 'click-replay' && !reducedMotion) {
        replay(current);
      }
    },
    onMouseEnter: (event) => {
      onMouseEnter?.(event);
      if (!event.defaultPrevented && lastPointer.current !== 'touch') startHover();
    },
    onMouseLeave: (event) => {
      onMouseLeave?.(event);
      if (!event.defaultPrevented && lastPointer.current !== 'touch') endHover();
    },
    onPointerEnter: (event) => {
      onPointerEnter?.(event);
      lastPointer.current = event.pointerType;
    },
    // Keyboard focus plays hover animations too.
    onFocus: (event) => {
      onFocus?.(event);
      if (!event.defaultPrevented && focusVisible(event.currentTarget)) startHover();
    },
    onBlur: (event) => {
      onBlur?.(event);
      if (!event.defaultPrevented) endHover();
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
  // oxlint-disable-next-line react/refs
  return render ? render(eventProps, animationProps) : <span {...animationProps} {...eventProps} />;
};

export { UseAnimations, UseAnimations as UseAnimation };
export type { UseAnimationsProps as UseAnimationProps };
export default UseAnimations;
