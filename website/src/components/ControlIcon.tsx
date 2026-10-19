import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import alertTriangle from '../../../icons/alertTriangle.json';
import arrowLeft from '../../../icons/arrowLeft.json';
import arrowRight from '../../../icons/arrowRight.json';
import checkmark from '../../../icons/checkmark.json';
import chevronDown from '../../../icons/chevronDown.json';
import chevronRight from '../../../icons/chevronRight.json';
import copy from '../../../icons/copy.json';
import cpu from '../../../icons/cpu.json';
import download from '../../../icons/download.json';
import droplet from '../../../icons/droplet.json';
import externalLink from '../../../icons/externalLink.json';
import grid from '../../../icons/grid.json';
import home from '../../../icons/home.json';
import packageIcon from '../../../icons/package.json';
import plusToX from '../../../icons/plusToX.json';
import server from '../../../icons/server.json';
import users from '../../../icons/users.json';

const ICONS = {
  alertTriangle,
  arrowLeft,
  arrowRight,
  checkmark,
  chevronDown,
  chevronRight,
  copy,
  cpu,
  download,
  droplet,
  externalLink,
  grid,
  home,
  package: packageIcon,
  plusToX,
  server,
  users,
};

type IconName = keyof typeof ICONS;

/** Whether the element around `wrapper` hovers, has keyboard focus, or (`open`) is an open `<details>`. */
function useTrigger(wrapper: HTMLElement | null, on: 'hover' | 'open') {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (on === 'open') {
      const details = wrapper?.closest('details');
      if (!details) return undefined;
      const sync = () => setActive(details.open);
      sync();
      details.addEventListener('toggle', sync);
      return () => details.removeEventListener('toggle', sync);
    }
    const target = wrapper?.closest('a, button, label, [data-icon-trigger]');
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
  }, [wrapper, on]);
  return active;
}

/** Whether the icon in `wrapper` is on screen; not while a closed dialog or a hidden banner holds it. */
function useOnScreen(wrapper: HTMLElement | null) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const icon = wrapper?.firstElementChild;
    if (!icon) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(icon);
    return () => observer.disconnect();
  }, [wrapper]);
  return visible;
}

/** Whether the copy button around `wrapper` reports a copy (scripts/copy.ts sets `data-copied`). */
function useCopied(wrapper: HTMLElement | null, enabled: boolean) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const button = enabled && wrapper?.closest('[data-copy], [data-copy-from]');
    if (!button) return undefined;
    const observer = new MutationObserver(() => setCopied(button.hasAttribute('data-copied')));
    observer.observe(button, { attributeFilter: ['data-copied'] });
    return () => observer.disconnect();
  }, [wrapper, enabled]);
  return copied;
}

type Look = { size: number; className?: string };

/** The icon as a toggle: forward to its end state while `active`, back when not. */
const Toggle = ({ icon, active, size, className }: Look & { icon: IconName; active: boolean }) => (
  <UseAnimations
    animation={{ animationData: ICONS[icon], interaction: 'click-toggle' }}
    active={active}
    size={size}
    className={className}
    render={(_eventProps, animationProps) => <span {...animationProps} />}
  />
);

/** Plays in as soon as it's on screen. */
function Arriving({ icon, ...look }: Look & { icon: IconName }) {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);
  const visible = useOnScreen(wrapper);
  return (
    <span ref={setWrapper} className="contents">
      <Toggle icon={icon} active={visible} {...look} />
    </span>
  );
}

/**
 * An icon inside Astro markup, played by the element around it, which isn't React's. So the icon
 * is a toggle driven from that element's events:
 * - `hover`: forward while its closest link, button, label or `[data-icon-trigger]` is hovered or
 *   keyboard-focused, back on leave;
 * - `open`: at its end state while its closest `<details>` is open (e.g. plus to X);
 * - `screen`: at its end state while it's on screen, so it plays in on load or when the dialog or
 *   banner around it opens.
 *
 * With `copied`, a copy button around it shows that icon, played in, while it reports a copy.
 */
export default function ControlIcon({
  icon,
  on = 'hover',
  copied,
  size = 16,
  className,
}: {
  icon: IconName;
  on?: 'hover' | 'open' | 'screen';
  copied?: IconName;
  size?: number;
  className?: string;
}) {
  const look = { size, className };
  return on === 'screen' ? (
    <Arriving icon={icon} {...look} />
  ) : (
    <Triggered icon={icon} on={on} copied={copied} {...look} />
  );
}

function Triggered({
  icon,
  on,
  copied,
  ...look
}: Look & { icon: IconName; on: 'hover' | 'open'; copied?: IconName }) {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);
  const active = useTrigger(wrapper, on);
  const showCopied = useCopied(wrapper, copied !== undefined);
  return (
    <span ref={setWrapper} className="contents">
      {copied && showCopied ? (
        <Arriving icon={copied} {...look} />
      ) : (
        <Toggle icon={icon} active={active} {...look} />
      )}
    </span>
  );
}
