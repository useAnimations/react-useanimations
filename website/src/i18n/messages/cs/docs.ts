import { pluralIn } from '../../format';
import type { Messages } from '../en';

const plural = pluralIn('cs');

export const docs: Messages['docs'] = {
  title: 'Dokumentace — useAnimations',
  description: (iconCount: number) =>
    `Jak používat ${plural(iconCount, { one: 'animovanou ikonu', few: 'animované ikony', other: 'animovaných ikon' })} v Reactu a shadcn/ui: interakce, props, barvy, soubory a přístupnost.`,
  badge: 'Dokumentace',
  onThisPage: 'Na této stránce',
  viewAsMarkdown: 'Zobrazit jako Markdown',
  headline: 'Dokumentace useAnimations',
  summary: 'Jak používat animované ikony useAnimations v Reactu a shadcn/ui.',
  crumb: 'Dokumentace',
  faq: [
    {
      question: 'Je useAnimations zdarma i pro komerční projekty?',
      answer: 'Ano. Ikony i React balíček jsou pod licencí MIT a uvádět autora nemusíte.',
    },
    {
      question: 'Jak použít ikony useAnimations v Reactu?',
      answer:
        'Nainstalujte react-useanimations, naimportujte UseAnimations a ikonu (např. react-useanimations/lib/checkmark) a vykreslete <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Jak změnit barvu ikony?',
      answer:
        'Ikony přebírají barvu textu. Změníte ji pomocí strokeColor a fillColor, CSS vlastnosti color nebo stylováním cest (paths).',
    },
    {
      question: 'Funguje to i bez Reactu?',
      answer:
        'Balíček je určený pro React. Každá ikona je ale zároveň standardní Lottie JSON soubor, který přehraje jakýkoli Lottie přehrávač (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), a statické SVG. Viz Použití bez Reactu a useanimations.com/lottie-icons.',
    },
  ],
};
