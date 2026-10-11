import type { HTMLAttributes } from 'react';
import UseAnimations, { type Interaction } from 'react-useanimations';

export type CardIcon = { id: string; title: string; interaction: Interaction };

const HINT: Record<Interaction, string> = {
  loop: 'Loop',
  'click-toggle': 'Click',
  'click-replay': 'Click',
  hover: 'Hover',
  'hover-loop': 'Hover',
  'hover-replay': 'Hover',
};

const SIZE = 'var(--icon-size, 40px)';

/** Asks the icon dialog to show an icon; false while the dialog isn't ready (it cancels the event). */
export const openIcon = (id: string) =>
  !window.dispatchEvent(new CustomEvent('ua:open-icon', { detail: id, cancelable: true }));

const Frame = ({
  children,
  icon,
  ...props
}: HTMLAttributes<HTMLDivElement> & { icon: CardIcon }) => (
  <div
    className="icon-card group relative flex aspect-[1/1.08] cursor-pointer flex-col rounded-2xl border border-line bg-surface transition duration-200 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_var(--glow)]"
    {...props}
  >
    <span className="pointer-events-none absolute top-2.5 right-2.5 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-subtle opacity-0 transition-opacity group-hover:opacity-100">
      {HINT[icon.interaction]}
    </span>
    <div className="flex flex-1 items-center justify-center text-[var(--icon-color,var(--fg))]">
      {children}
    </div>
    {/* The icon page, or the details dialog once it's ready; the whole card opens it (scripts/browser.ts). */}
    <a
      href={`/icons/${icon.id}`}
      data-details
      className="truncate rounded-b-2xl px-3 pb-3 text-center text-[13px] text-muted transition-colors group-hover:text-fg"
    >
      {icon.title}
    </a>
  </div>
);

/**
 * One icon of the browser. Without `animationData` it shows the prerendered first frame; with it,
 * the live icon, which plays when the card is hovered. A click on the card opens the details.
 */
export default function IconCard({
  icon,
  firstFrame,
  animationData,
}: {
  icon: CardIcon;
  firstFrame?: string;
  animationData?: object;
}) {
  if (!animationData) {
    return (
      <Frame icon={icon}>
        <span
          aria-hidden="true"
          data-useanimations=""
          style={{
            display: 'inline-block',
            flexShrink: 0,
            overflow: 'hidden',
            width: SIZE,
            height: SIZE,
          }}
          dangerouslySetInnerHTML={{ __html: firstFrame ?? '' }}
        />
      </Frame>
    );
  }
  return (
    <UseAnimations
      animation={{ animationData, interaction: icon.interaction }}
      size={SIZE}
      // Clicks open the details, so click icons don't play on the card; hover icons still do.
      render={({ onClick: _onClick, ...eventProps }, animationProps) => (
        <Frame icon={icon} {...eventProps}>
          <span {...animationProps} />
        </Frame>
      )}
    />
  );
}
