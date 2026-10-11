import { useState } from 'react';
import UseAnimations, { type Interaction } from 'react-useanimations';

/** `lottie` is the Lottie JSON as a string. */
type Icon = { title: string; color: string; lottie: string; interaction: Interaction };

/** Icons in different colors: each plays when its tile is hovered or clicked. */
export default function ColorRow({ icons }: { icons: Icon[] }) {
  const [data] = useState(() => icons.map((icon) => JSON.parse(icon.lottie) as object));
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {icons.map((icon, i) => (
        <UseAnimations
          key={icon.title}
          animation={{ animationData: data[i], interaction: icon.interaction }}
          size={32}
          render={(eventProps, animationProps) => (
            <span
              {...eventProps}
              title={icon.title}
              className="flex size-16 cursor-pointer items-center justify-center rounded-2xl bg-surface-2 transition hover:scale-105"
              style={{ color: icon.color }}
            >
              <span {...animationProps} />
            </span>
          )}
        />
      ))}
    </div>
  );
}
