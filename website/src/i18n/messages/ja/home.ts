import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'アニメーションアイコンライブラリ — useAnimations',
  description: (count: number) =>
    `${count} 個の無料マイクロアニメーション。ホバー・クリック・ループ内蔵のアニメーションアイコン集で、React、shadcn/ui、Lottie に対応。MIT。`,

  hero: {
    badge: (count: number) => `${count} 個のアイコン · 依存関係ゼロ · MIT`,
    headline: { start: '', accent: '動き出す', end: 'アイコン。' },
    h1: 'React、shadcn/ui、Lottie で使える無料のアニメーションアイコン',
    intro: (count: number) =>
      `ホバー、クリック、ループのマイクロインタラクションを内蔵した、手作りのマイクロアニメーション ${count} 個。React コンポーネントとして使うことも、shadcn で追加することも、SVG や Lottie JSON をダウンロードすることもできます。MIT ライセンス。`,
    browse: 'アイコンを探す',
    fieldHint: 'フィールドの上でポインターを動かしてみてください。',
  },

  numbers: {
    label: '概要',
    icons: 'アニメーションアイコン',
    interactions: '内蔵インタラクション',
    size: 'プレーヤー（gzip 圧縮後）',
    dependencies: '依存関係',
  },

  interactions: {
    eyebrow: 'インタラクション内蔵',
    title: 'どのアイコンも、自分の動き方を知っている。',
    intro:
      'どのアイコンにも、デザインしたときに想定したインタラクションが付いています。置くだけでそのまま動き、prop ひとつで別の動きに変えることもできます。試してみてください：',
    demos: {
      loop: 'ローダーや常時表示のステータス向けに、再生し続けます。',
      'click-toggle': 'メニューと閉じる、再生と一時停止のように 2 つの状態を切り替えます。',
      'click-replay': 'クリックのたびに最初から再生し、操作へのフィードバックになります。',
      hover: 'ポインターが乗ると順方向に、離れると逆方向に再生します。',
      'hover-loop': 'ホバー中はループし、離れるとそのサイクルを最後まで再生します。',
      'hover-replay': 'ポインターが乗るたびに最初から 1 回再生します。',
    },
  },

  browser: {
    eyebrow: 'ライブラリ',
    title: (count: number) => `${count} 個の無料アニメーションアイコン`,
    intro:
      'ホバーやクリックで再生できます。アイコンを開くと、コードとダウンロード（Lottie JSON、SVG、ZIP）が表示されます。',
    search: 'アイコンを検索',
    searchPlaceholder: (count: number) =>
      `${count} 個のアイコンを英語で検索（例：eye、bell、arrow）`,
    interaction: 'インタラクション',
    allInteractions: 'すべてのインタラクション',
    color: 'アイコンの色',
    colors: {
      text: 'テキストの色',
      indigo: 'インディゴ',
      red: 'レッド',
      amber: 'アンバー',
      teal: 'ティール',
      violet: 'バイオレット',
    },
    customColor: 'カスタムカラー',
    size: 'サイズ',
    category: 'カテゴリ',
    all: 'すべて',
    count: { other: '{n} 個のアイコン' },
    noMatch: '一致するアイコンはありません。',
    noMatchHintHtml: (href: string) =>
      `別のキーワードで試すか、${link(href, 'アイコンをリクエスト')}してください。`,
  },

  everywhere: {
    eyebrow: '好きな方法で使う',
    title: 'インストールして、インポートするだけ。',
    intro:
      '依存関係のない React コンポーネント、shadcn レジストリ、URL が固定されたダウンロード用ファイル、そして AI エージェントが読めるカタログを用意しています。',
    docs: 'ドキュメントを読む',
    tablist: 'プラットフォーム',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'ファイル', agents: 'エージェント' },
    codeText: {
      afterAdding: '使い方',
      files: 'すべてのアイコンを SVG、アニメーション（Lottie JSON）、その両方をまとめた ZIP で提供',
    },
  },

  features: {
    title: '軽くて、アクセシブルで、スタイルは自由。',
    colors: 'テキストの色に追従',
    colorsHtml: `アイコンは ${code('currentColor')} を使うので、テキストの色、ホバー時の色、ダークモードに自動で合わせます。prop、クラス、素の CSS で上書きすることもできます。`,
    tiny: '小ささにこだわった設計',
    tinyText:
      'プレーヤーを内蔵し、依存関係はゼロ。アイコンはそれぞれ 2 kB の独立したモジュールです。',
    accessible: '最初からアクセシブル',
    accessibleText:
      'モーション軽減の設定を尊重し、キーボードフォーカスでもホバーアニメーションを再生します。ラベルを付けない限り、スクリーンリーダーには読み上げられません。',
    ssr: 'サーバーサイドレンダリング対応',
    ssrText:
      'Next.js、Remix、Astro でも安全にレンダリングできるクライアントコンポーネントです。アイコンはただのデータなので、どこからでもインポートできます。',
    agents: 'AI エージェント向け',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `全アイコンのキーワードを含む型付きカタログ ${link(iconsJson, 'icons.json')}、${link(llmsTxt, 'llms.txt')}、Markdown 版のドキュメントを用意しています。`,
  },

  browse: {
    title: 'ぴったりのマイクロアニメーションを見つける。',
    byCategory: 'カテゴリから探す',
    byInteraction: 'インタラクションから探す',
    formats: 'すべてのアイコンと形式',
  },

  hubs: {
    icons: 'すべてのアニメーションアイコン',
    categories: 'アイコンのカテゴリ',
    interactions: 'インタラクション別のアイコン',
    lottie: 'Lottie アイコン（JSON）',
    shadcn: 'shadcn/ui 用アニメーションアイコン',
  },

  faqTitle: 'よくある質問',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: 'マイクロアニメーションやアニメーションアイコンとは何ですか？',
      answer:
        'マイクロアニメーションは、ユーザーの操作に応える短く目的の明確な動きです。メニューアイコンが閉じるボタンに変わる、投稿にいいねするとハートが塗りつぶされる、新しい通知でベルが鳴る、といったものです。アニメーションアイコンはその代表的な例で、インターフェースの反応をよくし、余計なテキストなしで状態の変化を伝えられます。',
    },
    {
      question: 'Lottie ファイルと SVG ファイルの違いは何ですか？',
      answer:
        'Lottie JSON ファイルにはアニメーション全体が入っていて、react-useanimations に内蔵のプレーヤーを含め、どの Lottie プレーヤーでも再生できます。SVG ファイルは静止状態のアイコンの画像で、状態ごとに 1 つずつ（たとえば eye と eye-off）あります。メール、ドキュメント、デザインツール、JavaScript が使えない環境のフォールバックなど、動かしたくない場所で使います。',
    },
    {
      question: 'Next.js やサーバーサイドレンダリングでも使えますか？',
      answer:
        "はい。コンポーネントには 'use client' が付いていて、アニメーションはブラウザーでのみ描画されます。そのため、サーバーコンポーネントや Next.js、Remix、Astro などの SSR フレームワークから、動的インポートなしでレンダリングできます。アイコンのモジュールはただのデータなので、サーバーコンポーネントでインポートして props として渡せます。",
      link: { href: f.links.serverRendering, label: 'Next.js とサーバーサイドレンダリング' },
    },
    {
      question: '商用プロジェクトでも使えますか？',
      answer:
        'はい。アイコンと react-useanimations パッケージは MIT ライセンスです。個人・商用を問わず、使用、改変、再配布ができます。クレジット表記は歓迎しますが、必須ではありません。',
      link: { href: f.links.licence, label: 'ライセンスと利用規約' },
    },
    {
      question: 'React なしでもアイコンを使えますか？',
      answer:
        'はい。どのアイコンも標準的な Lottie JSON ファイルなので、素の JavaScript、Vue、Svelte、Angular、CMS では lottie-web で、iOS、Android、Flutter ではそれぞれの Lottie プレーヤーで再生できます。Lottie アイコンのページに、ファイルの URL とインタラクションごとの lottie-web のコード例をまとめています。',
      link: { href: f.links.lottie, label: 'Lottie アイコン' },
    },
    {
      question: 'バンドルサイズはどのくらい増えますか？',
      answer: `react-useanimations ${f.version} のプレーヤーは gzip 圧縮後で約 8 kB、依存関係はありません。アイコンはそれぞれ 1〜15 kB（中央値 2 kB）の独立したモジュールなので、バンドルに含まれるのはインポートしたアイコンだけです。`,
    },
  ],

  cta: {
    title: { start: 'インターフェースに', accent: '鼓動', end: 'を。' },
    text: '無料で MIT ライセンス。個人でも商用でも使えます。',
    start: 'はじめる',
  },

  schema: {
    software: (count: number) =>
      `React コンポーネントと ${count} 個のアニメーションアイコン（Lottie）。ホバー、クリック、ループのインタラクションを内蔵し、依存関係はありません。`,
    catalogName: 'useAnimations アイコンカタログ',
    catalog: (count: number) =>
      `useAnimations の全 ${count} 個のアイコンについて、ID、タイトル、カテゴリ、キーワード、インタラクション、Lottie JSON・SVG・ZIP の URL、React のインポート文、shadcn コマンドをまとめたカタログです。`,
  },
};
