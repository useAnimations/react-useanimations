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

// The card's styles live in global.css (.icon-card): the home page renders 300 of them, and
// utility class lists repeated 300 times weighed more than the icons.
const Frame = ({
  children,
  icon,
  ...props
}: HTMLAttributes<HTMLDivElement> & { icon: CardIcon }) => (
  <div className="icon-card bg-surface" {...props}>
    <span className="icon-card-hint">{HINT[icon.interaction]}</span>
    <div className="icon-card-art">{children}</div>
    {/* The icon page, or the details dialog once it's ready; the whole card opens it (scripts/browser.ts). */}
    <a href={`/icons/${icon.id}`} data-details className="icon-card-title">
      {icon.title}
    </a>
  </div>
);

/**
 * One icon of the browser. Without `animationData` it shows the prerendered still; with it,
 * the live icon, which plays when the card is hovered. A click on the card opens the details.
 */
export default function IconCard({
  icon,
  still,
  animationData,
}: {
  icon: CardIcon;
  still?: string;
  animationData?: object;
}) {
  if (!animationData) {
    return (
      <Frame icon={icon}>
        <span
          aria-hidden="true"
          data-useanimations=""
          className="icon-card-frame"
          dangerouslySetInnerHTML={{ __html: still ?? '' }}
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
