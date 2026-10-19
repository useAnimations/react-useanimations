import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import arrowRight from '../../../icons/arrowRight.json';
import chevronDown from '../../../icons/chevronDown.json';

const ICONS = { arrowRight, chevronDown };

/**
 * An icon inside Astro markup that plays while its closest link, button or label is hovered or
 * keyboard-focused. The element isn't React's, so the icon is a toggle driven from its events:
 * forward on enter, back on leave.
 */
export default function HoverIcon({
  icon,
  size = 16,
  className,
}: {
  icon: keyof typeof ICONS;
  size?: number;
  className?: string;
}) {
  const [span, setSpan] = useState<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const target = span?.closest('a, button, label');
    if (!target) return undefined;
    // Touch devices fire pointer events on tap; only a mouse hovers.
    const enter = (event: PointerEvent) => event.pointerType === 'mouse' && setHovered(true);
    const leave = (event: PointerEvent) => event.pointerType === 'mouse' && setHovered(false);
    const focus = (event: FocusEvent) =>
      (event.target as Element).matches(':focus-visible') && setHovered(true);
    const blur = () => setHovered(false);
    const events = [
      ['pointerenter', enter],
      ['pointerleave', leave],
      ['focusin', focus],
      ['focusout', blur],
    ] as [string, EventListener][];
    for (const [type, listener] of events) target.addEventListener(type, listener);
    return () => {
      for (const [type, listener] of events) target.removeEventListener(type, listener);
    };
  }, [span]);

  return (
    <UseAnimations
      animation={{ animationData: ICONS[icon], interaction: 'click-toggle' }}
      active={hovered}
      size={size}
      className={className}
      render={(_eventProps, animationProps) => (
        <span ref={setSpan} className="contents">
          <span {...animationProps} />
        </span>
      )}
    />
  );
}
