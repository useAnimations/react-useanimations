import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Dokumentation — useAnimations',
  description: (iconCount: number) =>
    `So nutzen Sie ${iconCount} animierte Icons in React und shadcn/ui: Interaktionen, Props, Farben, Dateien und Barrierefreiheit.`,
  badge: 'Dokumentation',
  onThisPage: 'Auf dieser Seite',
  viewAsMarkdown: 'Als Markdown ansehen',
  headline: 'useAnimations-Dokumentation',
  summary: 'So nutzen Sie die animierten Icons von useAnimations in React und shadcn/ui.',
  crumb: 'Dokumentation',
  faq: [
    {
      question: 'Ist useAnimations für kommerzielle Projekte kostenlos?',
      answer:
        'Ja. Die Icons und das React-Paket stehen unter der MIT-Lizenz, eine Namensnennung ist nicht erforderlich.',
    },
    {
      question: 'Wie verwende ich die useAnimations-Icons in React?',
      answer:
        'Installieren Sie react-useanimations, importieren Sie UseAnimations und ein Icon (z. B. react-useanimations/lib/checkmark) und rendern Sie <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Wie ändere ich die Farbe eines Icons?',
      answer:
        'Icons übernehmen die Textfarbe. Ändern lässt sie sich mit strokeColor und fillColor, mit der CSS-Eigenschaft color oder über Styles für die Pfade.',
    },
    {
      question: 'Funktioniert es auch ohne React?',
      answer:
        'Das Paket ist für React gedacht. Jedes Icon gibt es aber auch als Standard-Lottie-JSON, das jeder Lottie-Player abspielen kann (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), und als statisches SVG. Mehr dazu unter „Ohne React verwenden“ und auf useanimations.com/lottie-icons.',
    },
  ],
};
