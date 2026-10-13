import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Documentation — useAnimations',
  description: (iconCount: number) =>
    `Utiliser ${iconCount} icônes animées dans React et shadcn/ui : interactions, props, couleurs, fichiers et accessibilité.`,
  badge: 'Documentation',
  onThisPage: 'Sur cette page',
  viewAsMarkdown: 'Voir en Markdown',
  headline: 'Documentation de useAnimations',
  summary: 'Comment utiliser les icônes animées useAnimations dans React et shadcn/ui.',
  crumb: 'Documentation',
  faq: [
    {
      question: 'useAnimations est-il gratuit pour les projets commerciaux ?',
      answer:
        'Oui. Les icônes et le package React sont sous licence MIT, sans attribution obligatoire.',
    },
    {
      question: 'Comment utiliser les icônes useAnimations dans React ?',
      answer:
        'Installez react-useanimations, importez UseAnimations et une icône (par exemple react-useanimations/lib/checkmark), puis affichez <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Comment changer la couleur d’une icône ?',
      answer:
        'Les icônes suivent la couleur du texte. Changez-la avec strokeColor et fillColor, avec la propriété CSS color ou en stylant les tracés.',
    },
    {
      question: 'Est-ce que ça fonctionne sans React ?',
      answer:
        'Le package est destiné à React. Chaque icône existe aussi en fichier Lottie JSON standard, lisible par n’importe quel lecteur Lottie (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), et en SVG statique. Voir la section Utiliser sans React et useanimations.com/lottie-icons.',
    },
  ],
};
