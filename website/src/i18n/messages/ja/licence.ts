import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'ライセンスと利用規約 — useAnimations',
  description:
    'useAnimations のアイコンと react-useanimations は MIT ライセンス。個人・商用利用も再配布も無料、クレジット表記は不要。',
  name: 'ライセンスと利用規約',
  heading: '自由に使える MIT ライセンス。',
  introHtml: (mitHref: string) =>
    `useAnimations のアイコンと <code>react-useanimations</code> パッケージは、<a href="${mitHref}">MIT ライセンス</a>で公開しています。`,
  canDo: 'できること',
  canDoItemsHtml: [
    '個人・商用のウェブサイト、アプリ、製品でアイコンを<strong>使用</strong>できます。',
    '色、サイズ、タイミング、動きそのものを<strong>改変</strong>できます。',
    'アイコンパック、テンプレート、テーマ、UI キット、コンポーネントレジストリに含めるなど、<strong>再配布</strong>もできます。',
  ],
  attribution: 'クレジット表記',
  attributionText:
    '必須ではありませんが、表記していただけるとうれしいです。ファイルそのものを再配布する場合はライセンス表示を残してください。クレジットを入れる場合は次のように記載できます：',
  credit: (link: string) => `アニメーションアイコン提供：${link}`,
  noWarranty: '無保証',
  noWarrantyText: 'アイコンとコードは現状のまま提供され、いかなる保証もありません。',
  licenseText: 'ライセンス本文',
  bindingNote: '以下のライセンス本文は英語の原文で、こちらが法的拘束力を持ちます。',
};
