import type { Messages } from '../en';
import { pluralIn } from '../../format';

const animated = (n: number) =>
  pluralIn('ru')(n, {
    one: 'анимированную иконку',
    few: 'анимированные иконки',
    many: 'анимированных иконок',
    other: 'анимированной иконки',
  });

export const docs: Messages['docs'] = {
  title: 'Документация — useAnimations',
  description: (iconCount: number) =>
    `Как использовать ${animated(iconCount)} в React и shadcn/ui: взаимодействия, пропсы, цвета, файлы и доступность.`,
  badge: 'Документация',
  onThisPage: 'На этой странице',
  viewAsMarkdown: 'Открыть в Markdown',
  headline: 'Документация useAnimations',
  summary: 'Как использовать анимированные иконки useAnimations в React и shadcn/ui.',
  crumb: 'Документация',
  faq: [
    {
      question: 'Можно ли бесплатно использовать useAnimations в коммерческих проектах?',
      answer:
        'Да. Иконки и React-пакет распространяются по лицензии MIT, указывать авторство не нужно.',
    },
    {
      question: 'Как использовать иконки useAnimations в React?',
      answer:
        'Установите react-useanimations, импортируйте UseAnimations и иконку (например, react-useanimations/lib/checkmark), затем отрендерите <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Как изменить цвет иконки?',
      answer:
        'Иконки берут цвет текста. Его можно поменять через strokeColor и fillColor, CSS-свойство color или стили для path.',
    },
    {
      question: 'Работает ли это без React?',
      answer:
        'Сам пакет сделан для React. Но каждая иконка есть и в виде стандартного файла Lottie JSON, который воспроизводит любой Lottie-плеер (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), и в виде статичного SVG. Подробнее — в разделе «Использование без React» и на useanimations.com/lottie-icons.',
    },
  ],
};
