// Text inside the React islands (components/*.tsx). Astro passes it to them as JSON props, so every
// entry is a plain string; '{name}' placeholders are filled in by the component.
import type { Interaction } from 'react-useanimations';

export const islands = {
  /** The badge on an icon card: how its icon plays. */
  iconCard: {
    hints: {
      loop: 'Loop',
      'click-toggle': 'Click',
      'click-replay': 'Click',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    } satisfies Record<Interaction, string>,
  },
  /** The icon details dialog on the home page. */
  iconDialog: {
    /** Under the live preview: how to play the icon. */
    hints: {
      loop: 'Plays on its own',
      'click-toggle': 'Click to toggle',
      'click-replay': 'Click to replay',
      hover: 'Hover to play, leave to reverse',
      'hover-loop': 'Hover to loop',
      'hover-replay': 'Hover to play',
    } satisfies Record<Interaction, string>,
    /** Accessible name of the live preview; {title} is the icon's (English) title. */
    preview: '{title} preview',
    /** The color swatches: the group, one color ({color} is a hex code), the text color. */
    colors: 'Preview color',
    color: 'Color {color}',
    textColor: 'Text color',
    interaction: 'Interaction',
    duration: 'Duration',
    /** {seconds} is a number such as 0.80. */
    seconds: '{seconds} s',
    import: 'Import',
    close: 'Close',
    /** The code tabs and their group. */
    code: 'Code',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Files' },
    copy: 'Copy',
    download: 'Download',
    iconPage: 'Icon page →',
  },
  /** The interaction demo cards (home page and interaction pages): what to do with the card. */
  interactionDemo: {
    click: 'Click the card',
    loop: 'Plays on its own',
    hover: 'Hover the card',
  },
  /** The navigation on small screens. */
  mobileMenu: {
    menu: 'Menu',
    nav: 'Main',
  },
  themeToggle: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
};
