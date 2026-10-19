import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { listIn } from '../../format';

const list = listIn('ja');
const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `カテゴリ別アニメーションアイコン全 ${count} 個`,
      `アニメーションアイコン全 ${count} 個`,
    ],
    descriptions: (count: number, categories: number) => [
      `useAnimations の全アイコンを 1 ページに。無料のアニメーションアイコン ${count} 個を ${categories} カテゴリ別に掲載。React、shadcn/ui、Lottie JSON、SVG 対応、MIT ライセンス。`,
      `無料のアニメーションアイコン ${count} 個を ${categories} カテゴリ別に一覧。React、shadcn/ui、Lottie JSON、SVG 対応、MIT ライセンス。`,
    ],
    title: 'すべてのアニメーションアイコン',
    badge: (count: number) => `${count} 個のアイコン · MIT ライセンス`,
    introHtml: (browser: string) =>
      `セットのすべてのアイコンをカテゴリ別に並べています。アイコンを開くと、ライブプレビュー、React と shadcn/ui のコード、Lottie JSON・SVG・ZIP のダウンロードが表示されます。キーワードで検索したり、その場でアニメーションを試したりするには${link(browser, 'アイコンブラウザー')}を使ってください。`,
    categoriesNav: 'カテゴリ',
    byInteraction: 'インタラクション別：',
    categoryLink: (count: number, name: string) =>
      `${/[A-Za-z0-9]$/.test(name) ? `${name} ` : name}のアイコン ${count} 個`,
  },

  categories: {
    titles: (categories: number) => [
      `アニメーションアイコンのカテゴリ（全 ${categories} 種）`,
      'アニメーションアイコンのカテゴリ',
    ],
    descriptions: (icons: number, categories: number) => [
      `無料のアニメーションアイコン ${icons} 個を ${categories} のカテゴリから探せます。ナビゲーション、アクション、メディア、ローディング、SNS など。React、shadcn/ui、Lottie 対応。`,
      `無料のアニメーションアイコン ${icons} 個を ${categories} のカテゴリから探せます。React、shadcn/ui、Lottie 対応。`,
    ],
    title: 'アニメーションアイコンのカテゴリ',
    badge: (icons: number, categories: number) => `${icons} 個のアイコン · ${categories} カテゴリ`,
    introHtml: (interactions: string) =>
      `useAnimations のアイコンは、ナビゲーションの矢印やメディア操作からローダー、SNS のロゴまで、どれも 1 つのカテゴリに属しています。カテゴリを開くと、そのアイコンの一覧、使いどころ、追加するためのコードが表示されます。${link(interactions, 'インタラクション')}から探すこともできます。`,
    iconCount: (n: number) => `${n} 個のアイコン`,
  },

  interactions: {
    titles: [
      'マイクロインタラクション：ホバー・クリック・ループで動くアイコン',
      'アイコンのマイクロインタラクション',
    ],
    descriptions: (icons: number, interactions: number) => [
      `${icons} 個のアニメーションアイコンと ${interactions} 種類のマイクロインタラクション：ループ、クリックでトグル、クリックで再生、ホバー、ホバーで再生、ホバーでループ。モーション軽減にも対応。`,
      `${icons} 個のアニメーションアイコンを ${interactions} 種類のマイクロインタラクション別に。ループ、クリック、ホバーで動き、モーション軽減にも対応。`,
    ],
    title: 'アニメーションアイコンのインタラクション',
    badge: (interactions: number, icons: number) =>
      `${interactions} 種類のインタラクション · ${icons} 個のアイコン`,
    introHtml: `どのアイコンにも、デザイン時に想定したマイクロインタラクションが付いています。ループする、クリックで切り替わる、クリックでもう一度再生する、ホバーで再生する、のいずれかです。React コンポーネントがその仕組みを組み込み、モーション軽減の設定も尊重します。<code class="font-mono text-base text-fg">interaction</code> prop を使えば、どのアイコンも別のインタラクションに切り替えられます。`,
    iconCount: (n: number) => `${n} 個のアイコン`,
    chooseTitle: 'インタラクションの選び方',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('続いている状態')}（読み込み中や継続中のアラートなど）：${link(href, 'ループ')}。`,
      'click-toggle': (href: string) =>
        `${strong('オン・オフの操作')}（ミュート、メニュー、パスワード表示など）：${link(href, 'クリックでトグル')}。状態を自分で管理するなら ${code('active')} を使います。`,
      'click-replay': (href: string) =>
        `${strong('一度きりの操作')}（送信、保存、更新など）：${link(href, 'クリックで再生')}。`,
      hover: (href: string) =>
        `${strong('リンク先を予告するヒント')}：${link(href, 'ホバー')}。ポインターが離れると逆再生します。`,
      'hover-replay': (href: string) =>
        `${strong('ポインターがさっと横切るツールバーやリスト')}：${link(href, 'ホバーで再生')}。最後まで自動で再生しきります。`,
      'hover-loop': (href: string) =>
        `${strong('じっくり見てほしいリンク')}（SNS アイコンなど）：${link(href, 'ホバーでループ')}。`,
    },
    motionTitle: 'モーション軽減',
    motionHtml: `React コンポーネントは ${code('prefers-reduced-motion')} に従い、設定が変わるとそれに追従します。タッチスクリーンでのタップでホバーアニメーションが始まることはありません。`,
    reducedMotion: {
      loop: 'アイコンは自動再生されず、静止した最初のフレームのままです。',
      'click-toggle':
        'クリックすると、その間のアニメーションなしで、すぐにもう一方の状態に切り替わります。',
      'click-replay': 'クリックはハンドラーに届きますが、アニメーションは再生されません。',
      hover: 'ホバーしてもアニメーションは再生されません。',
      'hover-replay': 'ホバーしてもアニメーションは再生されません。',
      'hover-loop': 'ホバー中もアイコンは静止したままです。',
    },
  },

  lottie: {
    titles: (count: number) => [
      `無料の Lottie アイコン：アニメーション JSON ${count} 個`,
      '無料の Lottie アイコン',
    ],
    descriptions: (count: number) => [
      `無料の Lottie アイコン ${count} 個を標準の Lottie JSON で提供、MIT ライセンス。lottie-web、dotLottie、React、React Native、iOS、Android、Flutter 用のコード付き。`,
      `無料の Lottie アイコン ${count} 個（MIT ライセンス）。lottie-web、React、iOS、Android、Flutter 用のコード付き。`,
    ],
    title: '無料の Lottie アイコン',
    crumb: 'Lottie アイコン',
    datasetName: 'useAnimations アイコンカタログ',
    datasetDescription: (count: number) =>
      `${count} 個の Lottie アニメーションアイコンのメタデータとファイル URL：ID、タイトル、カテゴリ、キーワード、インタラクション、サイズ、再生時間。`,
    badge: (count: number) => `${count} 個のアイコン · Lottie JSON · MIT ライセンス`,
    intro:
      'useAnimations のアイコンはすべて標準的な Lottie JSON アニメーションなので、Web の lottie-web をはじめ、lottie-ios、lottie-android、Flutter、React Native など、どの Lottie プレーヤーでも再生できます。ファイルは MIT ライセンスで無料、登録も不要です。CORS を有効にした固定の URL から配信しているので、直接読み込むことも、プロジェクトにダウンロードして使うこともできます。',
    popular: '人気の Lottie アイコン',
    allIcons: (count: number) => `全 ${count} 個のアイコン`,
    filesTitle: 'ファイルと URL',
    filesIntroHtml: `各アイコンには、プレビューとダウンロードを載せた ${code('/icons/&lt;id&gt;')} のページがあります。ファイル本体は次のとおりです：`,
    files: {
      json: 'Lottie JSON アニメーション',
      zip: 'JSON と静的 SVG',
      svg: '各状態の静的 SVG',
      catalog: '全アイコンのカタログ',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} には、すべてのアイコンの ID、タイトル、カテゴリ、キーワード、インタラクション、サイズ、再生時間、ファイル URL が載っています。スクリプトでキーワードからアイコンを選んだり、コーディングエージェントに選ばせたりするのに便利です。Lottie ファイルのサイズは中央値で ${median} kB です。`,
    players: {
      web: {
        title: 'Web：lottie-web',
        text: 'Airbnb が開発したリファレンスとなるプレーヤーです。CDN から読み込み、アイコンの URL を指定して SVG レンダラーを選びます。SVG レンダラーならアイコンがくっきり表示され、CSS で色も変えられます。ライトビルドはエクスプレッションを処理しないので、フルビルド（lottie.min.js）を使ってください。',
        cssLabel: 'テキストの色に追従させる（SVG レンダラー）',
      },
      'web-interactions': {
        title: 'Web：ホバーとクリックのインタラクション',
        text: 'lottie-web は再生と停止はできますが、インタラクションは自分で組む必要があります。以下はメニューアイコンのクリックトグルに、モーション軽減への対応を加えた例です。どのインタラクションも同じパターンで書けます。下で紹介する React コンポーネントなら、これをすべて任せられます。',
      },
      dotlottie: {
        title: 'Web：dotLottie Web コンポーネント',
        text: 'LottieFiles のプレーヤーで、WebAssembly エンジンで canvas に描画し、.lottie ファイルだけでなく通常の Lottie JSON も再生できます。canvas ではファイルの色がそのまま使われるため、JSON の色を書き換えない限りアイコンは黒のままです。',
        jsLabel: 'または JavaScript API：npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React：react-useanimations',
        text: 'Lottie プレーヤーのインストールは不要です。パッケージには 8 kB の独自プレーヤーが入っていて、アイコンごとのインタラクションを再生し、テキストの色に追従し、モーション軽減の設定も尊重します。アイコンは個別のモジュールなので、インポートしたものだけがバンドルに含まれます。',
      },
      'react-native': {
        title: 'React Native：lottie-react-native',
        text: 'オフラインで使うなら require() で JSON をバンドルし、そうでなければ URL から読み込みます。',
      },
      ios: {
        title: 'iOS：lottie-ios（SwiftUI）',
        text: 'Swift Package Manager で https://github.com/airbnb/lottie-spm.git からパッケージを追加し、JSON をバンドルに入れるか、URL から読み込みます。',
      },
      android: {
        title: 'Android：lottie-android（Jetpack Compose）',
        text: 'com.airbnb.android:lottie-compose（View を使う場合は com.airbnb.android:lottie）を追加します。オフラインで使うなら JSON を res/raw に置き、LottieCompositionSpec.RawRes で読み込みます。',
      },
      flutter: {
        title: 'Flutter：lottie',
        text: 'lottie パッケージは、Android、iOS、Web、デスクトップで動く Pure Dart のプレーヤーです。',
      },
    },
    expressionsTitle: 'エクスプレッションを使うアイコン',
    expressionsHtml: (count: number) =>
      `${count} 個のアイコンが After Effects のエクスプレッション（${code('loopOut')} または ${code('wiggle')}）を使っています。Web では ${code('lottie_light')} ではなく lottie-web のフルビルドで再生してください。ネイティブのプレーヤーはエクスプレッションを評価しないので、iOS、Android、Flutter では動きを確認するか、別のアイコンを選んでください。react-useanimations ならデザインどおりに再生されます。`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'これらの Lottie アイコンは商用利用も無料ですか？',
        answer: `はい。全 ${f.count} 個の Lottie アイコンは MIT ライセンスです。個人・商用プロジェクトで使用、改変、再配布でき、クレジット表記も、ダウンロードのためのアカウントも必要ありません。`,
      },
      {
        question: 'Lottie ファイルの形式は何ですか？',
        answer: `シェイプレイヤーだけで構成された標準的な Lottie JSON（Bodymovin 形式）で、画像、フォント、外部アセットは含みません。各アイコンは 24 px または 32 px のアートボードで描かれ、どのサイズにも拡大縮小できます。ファイルサイズは ${f.minSize}〜${f.maxSize} kB（中央値 ${f.medianSize} kB）です。`,
      },
      {
        question: 'React でアイコンを使うのに lottie-web は必要ですか？',
        answer:
          'いいえ。react-useanimations には依存関係のない 8 kB の独自プレーヤーが入っているので、パッケージを 1 つインストールして、必要なアイコンをインポートするだけです。lottie-web が必要なのは、素の Web ページやほかのフレームワークなど、React 以外で使う場合だけです。',
      },
      {
        question: 'lottie-web のフルビルドが必要なアイコンは？',
        answer: `${f.expressions.length} 個のアイコンが After Effects のエクスプレッション（loopOut または wiggle）を使っています：${list(f.expressions)}。Web では lottie-web のフルビルドが必要で、lottie_light はエクスプレッションを無視します。ネイティブのプレーヤー（lottie-ios、lottie-android、Flutter の lottie）もエクスプレッションを評価しないため、これらのアイコンは動きが異なる場合があります。`,
      },
      {
        question: 'Lottie アイコンの色は変えられますか？',
        answer:
          'Web では、lottie-web の SVG レンダラーが色を属性として書き出すので、パスに CSS ルールを当てれば色を変えられます。ネイティブのプレーヤーでは動的プロパティの API を使います。iOS では ColorValueProvider、Android では LottieProperty.COLOR と STROKE_COLOR、Flutter では ValueDelegate.color です。',
      },
    ],
    byCategory: 'カテゴリ別の Lottie アイコン',
  },

  shadcn: {
    titles: (count: number) => [
      `shadcn/ui 用アニメーションアイコン ${count} 個`,
      'shadcn/ui 用アニメーションアイコン',
    ],
    descriptions: (count: number) => [
      `shadcn/ui 用のアニメーションアイコン ${count} 個。shadcn CLI のコマンド 1 つで追加でき、ホバー・クリック・ループのマイクロインタラクション付き。MIT ライセンス、lottie-web 不要。`,
      `shadcn/ui 用アニメーションアイコン ${count} 個。shadcn CLI のコマンド 1 つで追加でき、lottie-web は不要。MIT ライセンス。`,
    ],
    title: 'shadcn/ui 用アニメーションアイコン',
    crumb: 'shadcn/ui',
    popularList: '人気の shadcn/ui 用アニメーションアイコン',
    badge: (count: number) => `${count} 個のコンポーネント · shadcn レジストリ · MIT ライセンス`,
    intro:
      'useAnimations のアイコンはすべて shadcn レジストリに登録されています。CLI のコマンド 1 つで、型付きの React コンポーネントがプロジェクトに追加されます。デザイン時に想定したホバー、クリック、ループのインタラクションも、モーション軽減への対応も、テーマに追従する色もそのままです。コードはほかの shadcn/ui コンポーネントと同じく、あなたのリポジトリに置かれます。',
    addTitle: 'アイコンを追加する',
    addIntro: 'アイコンのレジストリ URL を指定して shadcn CLI を実行します：',
    namingHtml: `コンポーネント名は ${code('Animated')} + PascalCase にしたアイコン ID（${code('check-box')} → ${code('AnimatedCheckBox')}）で、${code('components/animations/&lt;id&gt;.tsx')} に追加されます。CLI は共通のラッパー ${code('components/use-animation.tsx')} も追加し、${code('react-useanimations')} をインストールします。このパッケージは独自のプレーヤーを持っているので、lottie-web は不要です。`,
    namespaceTitle: 'レジストリの名前空間で短く書く',
    namespaceHtml: `${code('components.json')} に一度レジストリを追加すれば、あとはアイコンを名前で、複数まとめて追加できます：`,
    registryHtml: (registry: string) =>
      `レジストリのインデックス ${link(registry, '/r/registry.json')} には、すべてのアイテムがタイトル、カテゴリ、インタラクションとともに載っています。`,
    usageTitle: 'shadcn の Button で使う',
    usageHtml: `コンポーネントは ${code('UseAnimations')} と同じ props を受け取ります。メニューアイコンのような切り替え型なら、${code('active')} を渡して状態はボタン側で持ちます。状態が変わるたびにアイコンがアニメーションします：`,
    colorHtml: (docs: string) =>
      `アイコンはテキストの色に追従するので、${code('text-primary')} や ${code('text-muted-foreground')} で色が変わり、ダークモードにも追加の対応は要りません。そのほかの props や使い方は${link(docs, 'ドキュメント')}を参照してください。`,
    codeText: { closeMenu: 'メニューを閉じる', openMenu: 'メニューを開く' },
    popular: '人気の shadcn/ui 用アイコン',
    allIcons: (count: number) => `全 ${count} 個のアイコン`,
    popularNote: 'shadcn のコマンドは各アイコンのページに載っています。',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'shadcn/ui 用のアニメーションアイコンは無料ですか？',
        answer: `はい。全 ${f.count} 個のアイコンとコンポーネントのコードは MIT ライセンスで、個人・商用プロジェクトで使えます。レジストリの利用にアカウントや API キーは必要ありません。`,
      },
      {
        question: 'shadcn CLI はプロジェクトに何を追加しますか？',
        answer: `components/animations/<id>.tsx のアイコンコンポーネント、components/use-animation.tsx の共通プレーヤーラッパー UseAnimation（レジストリの依存関係として初回のみ）、そして npm の react-useanimations@^${f.version} です。パッケージに 8 kB の独自プレーヤーが入っているので、lottie-web は不要です。`,
      },
      {
        question: 'コンポーネントは Next.js のサーバーコンポーネントで使えますか？',
        answer:
          'はい。コンポーネントには "use client" が付いていて、アニメーションはブラウザーでのみ描画されます。そのため、動的インポートや ssr: false なしで、サーバーコンポーネントやページからレンダリングできます。',
      },
      {
        question: 'アイコンの見た目や動きは変えられますか？',
        answer:
          'コードはあなたのリポジトリにあるので、自由に変更できます。コンポーネントは UseAnimations の props（size、strokeColor、fillColor、interaction、active、autoplay、loop、speed）を受け取ります。アイコンはテキストの色に追従するので、text-primary や text-muted-foreground などの Tailwind クラスで色を変えられます。',
      },
    ],
    byCategory: 'カテゴリから探す',
  },
};
