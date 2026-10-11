import { Fragment, useEffect, useState } from 'react';
import UseAnimations, { type Interaction } from 'react-useanimations';
import { loadIconData } from '../lib/icon-data';

/** `id` is the icon id; its Lottie JSON loads from /icons/<id>.json once the row is visible. */
type Icon = { id: string; title: string; color: string; interaction: Interaction };

const SIZE = 32;

/** Icons in different colors: each plays when its tile is hovered or clicked. */
export default function ColorRow({ icons }: { icons: Icon[] }) {
  const [data, setData] = useState<object[]>();
  useEffect(() => {
    void Promise.all(icons.map((icon) => loadIconData(icon.id))).then(setData, () => undefined);
  }, [icons]);

  const tile = (icon: Icon, eventProps: object, animationProps: object) => (
    <span
      {...eventProps}
      title={icon.title}
      className="flex size-16 cursor-pointer items-center justify-center rounded-2xl bg-surface-2 transition hover:scale-105"
      style={{ color: icon.color }}
    >
      <span {...animationProps} />
    </span>
  );

  // Until the animations load, empty boxes of the icons' size keep the layout still.
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {icons.map((icon, i) =>
        data ? (
          <UseAnimations
            key={icon.id}
            animation={{ animationData: data[i], interaction: icon.interaction }}
            size={SIZE}
            render={(eventProps, animationProps) => tile(icon, eventProps, animationProps)}
          />
        ) : (
          <Fragment key={icon.id}>
            {tile(icon, {}, { style: { display: 'inline-block', width: SIZE, height: SIZE } })}
          </Fragment>
        )
      )}
    </div>
  );
}
