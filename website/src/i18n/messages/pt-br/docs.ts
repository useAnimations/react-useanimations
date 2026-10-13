import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Documentação — useAnimations',
  description: (iconCount: number) =>
    `Como usar ${iconCount} ícones animados no React e no shadcn/ui: interações, props, cores, arquivos e acessibilidade.`,
  badge: 'Documentação',
  onThisPage: 'Nesta página',
  viewAsMarkdown: 'Ver em Markdown',
  headline: 'Documentação do useAnimations',
  summary: 'Como usar os ícones animados do useAnimations no React e no shadcn/ui.',
  crumb: 'Documentação',
  faq: [
    {
      question: 'O useAnimations é gratuito para projetos comerciais?',
      answer: 'Sim. Os ícones e o pacote React têm licença MIT, sem exigência de atribuição.',
    },
    {
      question: 'Como uso os ícones do useAnimations no React?',
      answer:
        'Instale o react-useanimations, importe UseAnimations e um ícone (por exemplo, react-useanimations/lib/checkmark) e renderize <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Como mudo a cor de um ícone?',
      answer:
        'Os ícones seguem a cor do texto. Mude com strokeColor e fillColor, com a propriedade color do CSS ou estilizando os paths.',
    },
    {
      question: 'Funciona sem React?',
      answer:
        'O pacote é para React. Cada ícone também é um arquivo Lottie JSON padrão que qualquer player Lottie consegue tocar (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), além de um SVG estático. Veja a seção Uso sem React e useanimations.com/lottie-icons.',
    },
  ],
};
