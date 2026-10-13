import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'ドキュメント — useAnimations',
  description: (iconCount: number) =>
    `${iconCount} 個のアニメーションアイコンを React と shadcn/ui で使う方法。インタラクション、props、色、ファイル、アクセシビリティを解説。`,
  badge: 'ドキュメント',
  onThisPage: 'このページの内容',
  viewAsMarkdown: 'Markdown で表示',
  headline: 'useAnimations ドキュメント',
  summary: 'useAnimations のアニメーションアイコンを React と shadcn/ui で使う方法。',
  crumb: 'ドキュメント',
  faq: [
    {
      question: 'useAnimations は商用プロジェクトでも無料で使えますか？',
      answer:
        'はい。アイコンと React パッケージは MIT ライセンスで、クレジット表記も必要ありません。',
    },
    {
      question: 'useAnimations のアイコンを React で使うには？',
      answer:
        'react-useanimations をインストールし、UseAnimations とアイコン（例：react-useanimations/lib/checkmark）をインポートして、<UseAnimations animation={checkmark} size={32} /> をレンダリングします。',
    },
    {
      question: 'アイコンの色を変えるには？',
      answer:
        'アイコンはテキストの色に追従します。strokeColor と fillColor、CSS の color、またはパスへのスタイル指定で変更できます。',
    },
    {
      question: 'React なしでも使えますか？',
      answer:
        'パッケージは React 向けです。ただし、どのアイコンも標準的な Lottie JSON ファイルなので、Lottie プレーヤー（lottie-web、dotLottie、lottie-react-native、lottie-ios、lottie-android、Flutter）で再生でき、静的 SVG も用意しています。詳しくはドキュメントの「React なしで使う」と useanimations.com/lottie-icons を参照してください。',
    },
  ],
};
