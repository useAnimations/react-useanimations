import { useEffect, useState } from 'react';
import UseAnimations, { type Interaction } from 'react-useanimations';
import { loadIconData } from '../lib/icon-data';

type Props = {
  /** Icon id; its Lottie JSON loads from /icons/<id>.json once the card is visible. */
  id: string;
  interaction: Interaction;
  title: string;
  description: string;
  hint: string;
};

const SIZE = 56;

/** A card that plays its icon's interaction when the card itself is hovered, clicked or focused. */
export default function InteractionDemo({ id, interaction, title, description, hint }: Props) {
  const clickable = interaction.startsWith('click');
  const [animationData, setAnimationData] = useState<object>();
  useEffect(() => {
    void loadIconData(id).then(setAnimationData, () => undefined);
  }, [id]);

  const card = (eventProps: object, animationProps: object) => (
    <button
      type="button"
      className="demo-card group relative flex h-full w-full flex-col items-start rounded-3xl border border-line bg-surface p-6 text-left transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_60px_-30px_var(--glow)]"
      aria-label={`${title}: ${hint}`}
      {...eventProps}
    >
      <span className="flex size-24 items-center justify-center rounded-2xl bg-surface-2 text-fg transition-colors group-hover:text-accent">
        <span {...animationProps} />
      </span>
      <span className="mt-6 font-mono text-xs text-accent">
        interaction=&quot;{interaction}&quot;
      </span>
      <span className="mt-2 text-lg font-semibold tracking-tight text-fg">{title}</span>
      <span className="mt-1.5 text-sm leading-relaxed text-muted">{description}</span>
      <span className="mt-auto pt-5 text-xs font-medium text-subtle">
        {clickable
          ? 'Click the card'
          : interaction === 'loop'
            ? 'Plays on its own'
            : 'Hover the card'}
      </span>
    </button>
  );

  // Until the animation loads, an empty box of the icon's size keeps the layout still.
  if (!animationData) {
    return card(
      {},
      {
        'aria-hidden': true,
        style: { display: 'inline-block', flexShrink: 0, width: SIZE, height: SIZE },
      }
    );
  }
  return <UseAnimations animation={{ animationData, interaction }} size={SIZE} render={card} />;
}
