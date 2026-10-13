// The documentation page's frame. The body itself is src/content/documentation[.<code>].md.
export const docs = {
  title: 'Documentation — useAnimations',
  description: (iconCount: number) =>
    `How to use ${iconCount} animated icons in React and shadcn/ui: interactions, props, colors, files and accessibility.`,
  /** Small label above the body's heading. */
  badge: 'Documentation',
  onThisPage: 'On this page',
  viewAsMarkdown: 'View as Markdown',
  /** JSON-LD: the article and the breadcrumb trail. */
  headline: 'useAnimations documentation',
  summary: 'How to use the useAnimations animated icons in React and shadcn/ui.',
  crumb: 'Documentation',
  /** Structured-data FAQ (not shown on the page; the body has its own FAQ section). */
  faq: [
    {
      question: 'Is useAnimations free for commercial projects?',
      answer:
        'Yes. The icons and the React package are MIT-licensed, with no attribution required.',
    },
    {
      question: 'How do I use useAnimations icons in React?',
      answer:
        'Install react-useanimations, import UseAnimations and an icon (e.g. react-useanimations/lib/checkmark), then render <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'How do I change the color of an icon?',
      answer:
        'Icons follow the text color. Change it with strokeColor and fillColor, CSS color, or by styling the paths.',
    },
    {
      question: 'Does it work without React?',
      answer:
        'The package is for React. Every icon is also a standard Lottie JSON file that any Lottie player can play (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), and a static SVG. See Use without React and useanimations.com/lottie-icons.',
    },
  ],
};
