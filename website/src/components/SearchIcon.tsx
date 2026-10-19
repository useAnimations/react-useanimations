import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import searchToX from '../../../icons/searchToX.json';
import { islands } from '../i18n/messages/en/islands';

const fieldOf = (button: HTMLButtonElement | null) =>
  button?.closest('label')?.querySelector<HTMLInputElement>('[data-search]');

/**
 * The icon of the browser's search field (the input with `data-search` in the same label): a
 * magnifier that turns into a clear button while the field has text.
 */
export default function SearchIcon({
  strings = islands.search,
}: {
  /** The button's text in the page's language: t(locale).islands.search. */
  strings?: typeof islands.search;
}) {
  const [button, setButton] = useState<HTMLButtonElement | null>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const input = fieldOf(button);
    if (!input) return undefined;
    // scripts/browser.ts may have filled the field from ?q= before this island hydrated.
    const sync = () => setFilled(input.value !== '');
    sync();
    input.addEventListener('input', sync);
    return () => input.removeEventListener('input', sync);
  }, [button]);

  // The browser script filters on the field's input event, so clearing goes through it too.
  const clear = () => {
    const input = fieldOf(button);
    if (!input) return;
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  };

  return (
    <UseAnimations
      animation={{ animationData: searchToX, interaction: 'click-toggle' }}
      active={filled}
      size={18}
      onClick={clear}
      render={({ onClick }, animationProps) => (
        <button
          type="button"
          ref={setButton}
          onClick={onClick}
          aria-label={strings.clear}
          // Only the X is a button; the magnifier is a picture.
          aria-hidden={!filled}
          tabIndex={filled ? 0 : -1}
          className={`absolute top-1/2 left-2.5 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-subtle transition-colors hover:text-fg ${filled ? '' : 'pointer-events-none'}`}
        >
          <span {...animationProps} />
        </button>
      )}
    />
  );
}
