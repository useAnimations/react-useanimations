import { useSyncExternalStore } from 'react';
import UseAnimations from 'react-useanimations';
import moon from '../../../icons/moon.json';
import sun from '../../../icons/sun.json';
import { islands } from '../i18n/messages/en/islands';

const isDark = () => document.documentElement.classList.contains('dark');

// The theme is the `dark` class on <html>, set before the first paint by Layout.astro.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

/** Switches between light and dark; the choice is saved, otherwise the system theme applies. */
export default function ThemeToggle({
  strings = islands.themeToggle,
}: {
  /** The button's text in the page's language: t(locale).islands.themeToggle. */
  strings?: typeof islands.themeToggle;
}) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !isDark();
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <UseAnimations
      key={dark ? 'sun' : 'moon'}
      animation={{ animationData: dark ? sun : moon, interaction: 'hover-replay' }}
      size={20}
      onClick={toggle}
      render={(eventProps, animationProps) => (
        <button
          type="button"
          aria-label={dark ? strings.toLight : strings.toDark}
          className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          {...eventProps}
        >
          <span {...animationProps} />
        </button>
      )}
    />
  );
}
