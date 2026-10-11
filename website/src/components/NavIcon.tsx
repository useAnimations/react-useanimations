import UseAnimations from 'react-useanimations';
import github from '../../../icons/github.json';

/** The GitHub link in the header: its icon loops while the link is hovered or focused. */
export default function NavIcon({ href, label }: { href: string; label: string }) {
  return (
    <UseAnimations
      animation={{ animationData: github, interaction: 'hover-loop' }}
      size={20}
      render={(eventProps, animationProps) => (
        <a
          href={href}
          aria-label={label}
          className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          {...eventProps}
        >
          <span {...animationProps} />
        </a>
      )}
    />
  );
}
