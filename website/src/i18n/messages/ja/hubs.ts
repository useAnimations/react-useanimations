import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const list = listIn('ja');
const plural = pluralIn('ja');

/** 最大 `max` 件の名前を並べ、残りは「ほか N 個」とまとめる。 */
const titles = (items: string[], max = 12) =>
  items.length > max ? `${list(items.slice(0, max))} ほか ${items.length - max} 個` : list(items);

/** 英数字で終わる語のあとに半角スペースを入れる（「SNS のアイコン」）。 */
const spaced = (text: string) => (/[A-Za-z0-9]$/.test(text) ? `${text} ` : text);

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

/** 提供形式の一覧（静的 SVG の有無を反映）。 */
const formats = (f: CategoryFacts) => {
  const base = ['React コンポーネント', 'shadcn/ui コンポーネント', 'Lottie JSON アニメーション'];
  if (f.withSvg === f.count) return `${list([...base, '静的 SVG'])} として提供され`;
  if (f.withSvg) return `${list(base)} として提供され（うち ${f.withSvg} 個は静的 SVG も用意）`;
  return `${list(base)} として提供され`;
};

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: (n: number) => plural(n, { other: '個のアイコン' }),

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title}（React・Lottie 対応）`,
      `${f.title}（React 対応）`,
      `無料の${f.title}`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.title} ${f.count} 個を無料で公開。${examples} など、ホバー・クリック・ループで動くマイクロアニメーションを React、shadcn/ui、Lottie JSON で。MIT ライセンス。`,
        `${f.title} ${f.count} 個を無料で公開。${examples} など。React、shadcn/ui、Lottie JSON 対応、MIT ライセンス。`,
        `${f.title} ${f.count} 個を無料で公開。${examples} など。React、shadcn/ui、Lottie 対応。`,
        `${f.title} ${f.count} 個を無料で公開。React、shadcn/ui、Lottie JSON 対応、MIT ライセンス。`,
        `${f.title} ${f.count} 個。React、shadcn/ui、Lottie 対応、MIT。`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const breakdown =
        f.groups.length === 1
          ? `${f.count} 個すべてが${f.groups[0].plays}アイコンです。`
          : `${f.count} 個の内訳は、${list(f.groups.map(({ count, plays }) => `${plays}もの ${count} 個`))}です。`;
      return `${breakdown}どのアイコンも ${formats(f)}、MIT ライセンスのもと商用利用も無料です。`;
    },
    faq: (f: CategoryFacts): Faq => {
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `${f.title}にはどんなアイコンがありますか？`,
          answer: `${f.count} 個あります。${titles(f.titles)}です。どれも MIT ライセンスのもと個人・商用プロジェクトで無料で使え、クレジット表記も必要ありません。`,
        },
        {
          question: `${f.title}を React で使うには？`,
          answer: `react-useanimations をインストールし、${ex.importLine} を追加して <UseAnimations animation={${ex.exportName}} size={32} /> をレンダリングします。アイコンは「${ex.interactionLabel}」のインタラクションで動き、テキストの色に合わせて表示されます。shadcn/ui を使う場合は、代わりに ${ex.shadcnCommand} を実行してください。`,
        },
        {
          question: `${f.title}は React なしでも使えますか？`,
          answer: `はい。各アイコンは ${f.site}/icons/<id>.json（例：${f.site}/icons/${ex.id}.json）にある Lottie JSON ファイルで、lottie-web、lottie-ios、lottie-android、Flutter の lottie パッケージで再生できます${f.withSvg ? '。静的 SVG は各アイコンのページ（英語）からダウンロードできます' : ''}。${
            n
              ? `${titles(f.expressions, 6)} は After Effects のエクスプレッションを使っているため、Web では lottie-web のフルビルドが必要です。`
              : 'エクスプレッションを使うアイコンはないので、lottie-web のライトビルドで十分です。'
          }`,
        },
      ];
    },
    badge: (n: number) => `${plural(n, { other: '個のアイコン' })} · MIT ライセンス`,
    allIcons: (name: string) => `${spaced(name)}のアイコン一覧`,
    whereToUse: '使いどころ',
    byInteraction: 'インタラクション別',
    addOne: 'アプリに追加する',
    addOneHtml: (label: string, name: string) =>
      `React では ${code('react-useanimations')} をインストールしてアイコンをインポートするだけで、「${label}」のインタラクションで動きます。このカテゴリのアイコンはどれも使い方が同じなので、${code(name)} を各アイコンのページに載っている名前に置き換えてください。`,
    shadcnHtml: (href: string) =>
      `${link(href, 'shadcn/ui')} なら、CLI ですぐに使えるコンポーネントを追加できます：`,
    noReactHtml: (href: string) =>
      `React を使わない場合も、各アイコンは ${code('/icons/&lt;id&gt;.json')} にある Lottie JSON ファイルとして使えます。Web、iOS、Android、Flutter 向けのプレーヤーは ${link(href, 'Lottie アイコン')}を参照してください。`,
    more: 'ほかのカテゴリ',
    allIconsButton: 'すべてのアイコン',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title}（React・Lottie 対応）`,
      `${f.title}（React 対応）`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => [
      `${f.title} ${f.count} 個を無料で公開。${list(f.titles.slice(0, 3))} など。React、shadcn/ui、Lottie JSON 対応、MIT ライセンス。`,
      `${f.title} ${f.count} 個を無料で公開。React、shadcn/ui、Lottie JSON 対応、MIT ライセンス。`,
      `${f.title} ${f.count} 個。React、shadcn/ui、Lottie 対応、MIT。`,
    ],
    faq: (f: InteractionFacts): Faq => [
      {
        question: `「${f.label}」のインタラクションを使うアイコンは？`,
        answer: `${f.count} 個あります。${titles(f.titles, 15)}です。${f.example}`,
      },
      {
        question: 'ユーザーがモーション軽減を設定している場合はどうなりますか？',
        answer: `${f.reducedMotion}React コンポーネントが prefers-reduced-motion を読み取り、設定が変わればそれに追従するので、そのためのコードを書く必要はありません。`,
      },
      {
        question: 'アイコンのインタラクションを変えるには？',
        answer: `どのアイコンも、デザインされたときのインタラクションで再生されます。interaction="${f.interaction}" を渡せばほかのアイコンにもこの動きを付けられ、別の値（'loop'、'click-toggle'、'click-replay'、'hover'、'hover-loop'、'hover-replay'）を渡せば別の動きに変えられます。再生は autoplay、loop、speed の props で調整できます。${
          f.interaction === 'click-toggle'
            ? '状態を自分で管理したい場合は active={isOn} を渡し、onClick で更新してください。そうすると、クリックだけではアイコンは切り替わらなくなります。'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `「${label}」のアイコン一覧`,
    behaviour: '動作',
    hoverNote:
      'タッチスクリーンでのタップではホバーアニメーションは始まりません。アイコンがフォーカス可能な要素の中にあれば、キーボードフォーカスでも再生されます。',
    handled: 'これらはすべて React コンポーネントが処理するので、アイコンを選ぶだけで済みます。',
    whereToUse: '使いどころ',
    byCategory: 'カテゴリ別',
    useInReact: 'React で使う',
    overrideHtml: `ここに並ぶアイコンは、デフォルトでこのインタラクションで再生されます。ほかのアイコンでも ${code('interaction')} prop を渡せば同じ動きにできます。`,
    normallyUses: (title: string, interaction: string) =>
      `${title} の本来のインタラクションは '${interaction}'`,
    extra: {
      loop: 'ループするアイコンは自動再生され、画面外にスクロールされている間は一時停止します。speed で遅くしたり、loop={false} で 1 回だけ再生したり、autoplay={false} で止めたままにしたりできます：',
      'click-toggle':
        'デフォルトでは、クリックするとアイコンが自動で切り替わります。アプリの状態と同期させたい場合は active を渡してください。active が変わるたびにアイコンがアニメーションし、クリックだけでは切り替わらなくなります。',
      'click-replay':
        'render prop を使ってアイコンを本物のボタンで包めば、フォーカスでき、スクリーンリーダーにも読み上げられます。渡した onClick が先に実行され、event.preventDefault() を呼ぶとアニメーションをスキップできます。',
      hover:
        'render prop を使ってアイコンをリンクやボタンで包むと、要素がキーボードフォーカスを受けたときにもアニメーションが再生され、タッチスクリーンでのタップでは再生されなくなります。',
      'hover-replay':
        'アイコンだけでなく、カードやリンク全体でホバーを受けましょう。render prop を使うとイベントが自分の要素に付き、キーボードフォーカスでもアニメーションが再生されます。',
      'hover-loop':
        'render prop を使えば、キーボードフォーカスも含めてリンク全体でループを開始できます。速さは speed で変えられます：',
    },
    codeText: {
      halfSpeed: '半分の速度',
      playsOnce: '1 回再生して停止',
      staticFrame: '静止した最初のフレーム',
      endState: 'true で終了状態を表示',
      closeMenu: 'メニューを閉じる',
      openMenu: 'メニューを開く',
      download: 'ダウンロード',
      archive: 'アーカイブ',
      weeklyGrowth: '週間の伸び',
    },
    docsHtml: (docs: string, lottie: string) =>
      `すべての props は${link(docs, 'ドキュメント')}にまとめています。React 以外では、アイコンは Lottie JSON ファイルです。lottie-web でインタラクションを再現する方法は ${link(lottie, 'Lottie アイコン')}を参照してください。`,
    other: 'ほかのインタラクション',
    browseByCategory: 'カテゴリから探す',
  },
};
