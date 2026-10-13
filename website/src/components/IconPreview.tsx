import { useState } from 'react';
import UseAnimations, { type Interaction } from 'react-useanimations';
import { islands } from '../i18n/messages/en/islands';

const COLORS = ['', '#4b5cff', '#e5484d', '#f59e0b', '#12a594', '#a24bff'];
// Icon pages are English-only; the dialog's strings say how to play the icon.
const { hints, colors, color: colorLabel, textColor } = islands.iconDialog;

/** `lottie` is the Lottie JSON as a string. */
type Props = { lottie: string; interaction: Interaction; title: string };

/** The large live preview on an icon page, with a color picker. */
export default function IconPreview({ lottie, interaction, title }: Props) {
  const [color, setColor] = useState('');
  const [animationData] = useState(() => JSON.parse(lottie) as object);
  return (
    <div>
      <div
        className="relative flex aspect-square items-center justify-center rounded-[2rem] border border-line bg-surface-2 bg-grid"
        style={{ color: color || 'var(--fg)' }}
      >
        <UseAnimations
          animation={{ animationData, interaction }}
          size={160}
          aria-label={`${title} animation`}
          render={(eventProps, animationProps) => (
            <div
              className="flex size-full cursor-pointer items-center justify-center"
              {...eventProps}
            >
              <span {...animationProps} />
            </div>
          )}
        />
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-surface px-3 py-1 text-xs whitespace-nowrap text-muted shadow-sm">
          {hints[interaction]}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2" role="group" aria-label={colors}>
        {COLORS.map((value) => (
          <button
            key={value || 'default'}
            type="button"
            aria-label={value ? colorLabel.replace('{color}', value) : textColor}
            aria-pressed={color === value}
            onClick={() => setColor(value)}
            className="size-7 rounded-full border border-line-strong ring-offset-2 ring-offset-bg aria-pressed:ring-2 aria-pressed:ring-accent"
            style={{ background: value || 'var(--fg)' }}
          />
        ))}
      </div>
    </div>
  );
}
