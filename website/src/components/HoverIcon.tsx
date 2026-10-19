import { useEffect, useRef, useState } from 'react';
import UseAnimations, { type EventProps, type Interaction } from 'react-useanimations';

// Inside a link a click navigates, so every icon plays on hover, in its closest hover form.
const ON_HOVER: Record<Interaction, Interaction> = {
  hover: 'hover',
  'hover-loop': 'hover-loop',
  'hover-replay': 'hover-replay',
  loop: 'hover-loop',
  'click-replay': 'hover-replay',
  'click-toggle': 'hover',
};

/**
 * An icon that plays while `trigger`, a link in Astro markup (not React's), is hovered or has
 * keyboard focus. It mounts on the first hover (scripts/hover-icons.ts), so it starts right away
 * when that hover is still going on.
 */
export default function HoverIcon({
  animationData,
  interaction,
  trigger,
}: {
  animationData: object;
  interaction: Interaction;
  trigger: HTMLElement;
}) {
  const handlers = useRef<EventProps | null>(null);
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!wrapper) return undefined;
    // The component's own hover and focus handlers, fed from the trigger's native events.
    const call = (name: 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur') =>
      handlers.current?.[name]({ defaultPrevented: false, currentTarget: trigger } as never);
    // Touch devices fire pointer events on tap; only a mouse hovers.
    const enter = (event: PointerEvent) => event.pointerType === 'mouse' && call('onMouseEnter');
    const leave = (event: PointerEvent) => event.pointerType === 'mouse' && call('onMouseLeave');
    const focus = () => call('onFocus');
    const blur = () => call('onBlur');
    const events = [
      ['pointerenter', enter],
      ['pointerleave', leave],
      ['focusin', focus],
      ['focusout', blur],
    ] as [string, EventListener][];
    for (const [type, listener] of events) trigger.addEventListener(type, listener);
    if (trigger.matches(':hover')) call('onMouseEnter');
    else if (trigger.matches(':focus-visible')) call('onFocus');
    return () => {
      for (const [type, listener] of events) trigger.removeEventListener(type, listener);
    };
  }, [wrapper, trigger]);

  return (
    <UseAnimations
      animation={{ animationData, interaction: ON_HOVER[interaction] }}
      size="100%"
      render={(eventProps, animationProps) => {
        handlers.current = eventProps;
        return (
          <span ref={setWrapper} className="contents">
            <span {...animationProps} />
          </span>
        );
      }}
    />
  );
}
