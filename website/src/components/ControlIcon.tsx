import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import arrowRight from '../../../icons/arrowRight.json';
import chevronDown from '../../../icons/chevronDown.json';
import copy from '../../../icons/copy.json';
import cpu from '../../../icons/cpu.json';
import droplet from '../../../icons/droplet.json';
import packageIcon from '../../../icons/package.json';
import plusToX from '../../../icons/plusToX.json';
import server from '../../../icons/server.json';
import users from '../../../icons/users.json';

const ICONS = {
  arrowRight,
  chevronDown,
  copy,
  cpu,
  droplet,
  package: packageIcon,
  plusToX,
  server,
  users,
};

/**
 * An icon inside Astro markup, played by the element around it, which isn't React's. So the icon
 * is a toggle driven from that element's events:
 * - `hover`: forward while its closest link, button, label or `[data-icon-trigger]` is hovered or
 *   keyboard-focused, back on leave;
 * - `open`: at its end state while its closest `<details>` is open (e.g. plus to X).
 */
export default function ControlIcon({
  icon,
  on = 'hover',
  size = 16,
  className,
}: {
  icon: keyof typeof ICONS;
  on?: 'hover' | 'open';
  size?: number;
  className?: string;
}) {
  const [span, setSpan] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (on === 'open') {
      const details = span?.closest('details');
      if (!details) return undefined;
      const sync = () => setActive(details.open);
      sync();
      details.addEventListener('toggle', sync);
      return () => details.removeEventListener('toggle', sync);
    }
    const target = span?.closest('a, button, label, [data-icon-trigger]');
    if (!target) return undefined;
    // Touch devices fire pointer events on tap; only a mouse hovers.
    const enter = (event: PointerEvent) => event.pointerType === 'mouse' && setActive(true);
    const leave = (event: PointerEvent) => event.pointerType === 'mouse' && setActive(false);
    const focus = (event: FocusEvent) =>
      (event.target as Element).matches(':focus-visible') && setActive(true);
    const blur = () => setActive(false);
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
  }, [span, on]);

  return (
    <UseAnimations
      animation={{ animationData: ICONS[icon], interaction: 'click-toggle' }}
      active={active}
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
