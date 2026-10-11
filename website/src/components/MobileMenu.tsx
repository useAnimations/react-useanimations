import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import menu from '../../../icons/menu.json';

type Props = { items: { label: string; href: string }[] };

/** The navigation on small screens, opened by the animated menu icon. */
export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <div className="md:hidden">
      <UseAnimations
        animation={{ animationData: menu, interaction: 'click-toggle' }}
        active={open}
        size={22}
        onClick={() => setOpen(!open)}
        render={(eventProps, animationProps) => (
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-9 items-center justify-center rounded-full text-fg hover:bg-surface-2"
            {...eventProps}
          >
            <span {...animationProps} />
          </button>
        )}
      />
      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-bg px-5 pt-2 pb-5 shadow-xl"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-base text-fg hover:bg-surface-2"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
