# ドキュメント {#documentation}

useAnimations は、React 向けの 300 個のアニメーションアイコンをまとめた、無料で MIT ライセンスのライブラリです。どのアイコンにもインタラクションが組み込まれていて、ループする、クリックで再生する、ホバーで再生する、のいずれかの動きをします。`react-useanimations` パッケージで使うことも、shadcn CLI で追加することもできます。

<div id="quick-start-react"></div>

## クイックスタート {#quick-start}

```bash
npm install react-useanimations
```

```jsx
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';

export default function Header() {
  return <UseAnimations animation={github} size={32} />;
}
```

アイコンはテキストの色に追従し、それぞれ決まったインタラクションで再生されます。`github` はホバーしている間ループします。パッケージに依存関係はなく、内蔵のプレーヤー（gzip 圧縮後 8 kB）がアイコンを SVG として描画します。アイコンはそれぞれ独立したモジュールなので、バンドルに含まれるのはインポートしたアイコンだけです。

## インタラクション {#interactions}

どのアイコンにも、デザイン時に想定したインタラクションが付いています。`interaction` prop で上書きできます。

| インタラクション | 動作                                                           | アイコンの例                         |
| ---------------- | -------------------------------------------------------------- | ------------------------------------ |
| `loop`           | 再生し続けます。                                               | `loading`、`activity`、`alertCircle` |
| `click-toggle`   | クリックで 2 つの状態を切り替えます（順方向、次に逆方向）。    | `menu`、`checkBox`、`playPause`      |
| `click-replay`   | クリックのたびに最初から再生します。                           | `download`、`refresh`、`send`        |
| `hover`          | ポインターが乗ると順方向に、離れると逆方向に再生します。       | `archive`、`settings`、`trash`       |
| `hover-loop`     | ホバー中はループし、離れると今のサイクルを最後まで再生します。 | `github`、`twitter`、`dribbble`      |
| `hover-replay`   | ポインターが乗ると最初から 1 回再生します。                    | `arrowRight`、`bluetooth`、`zap`     |

ユーザーがモーション軽減を設定している場合、アイコンは動きません。ループは最初のフレームを表示し、ホバーやリプレイのアニメーションは再生されず、トグルはすぐに新しい状態に切り替わります。

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | デフォルト       | 説明                                                                                                                                  |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | `react-useanimations/lib/<name>` からインポートしたアイコン。独自のアニメーションなら `{ animationData, interaction }`。              |
| `size`        | `24`             | 幅と高さ。数値はピクセル、文字列は `'1.5em'` などの任意の CSS の長さです。                                                            |
| `strokeColor` | `'currentColor'` | 線の色。デフォルトではテキストの色に追従します。                                                                                      |
| `fillColor`   | `strokeColor`    | 塗りつぶし部分の色（いいね済みのハートなど）。                                                                                        |
| `interaction` | アイコンごと     | `'loop'`、`'click-toggle'`、`'click-replay'`、`'hover'`、`'hover-loop'`、`'hover-replay'` のいずれか。                                |
| `active`      | —                | `click-toggle` のアイコン用。`true` で終了状態を表示します。制御型なので `onClick` で更新してください。クリックでは切り替わりません。 |
| `autoplay`    | アイコンごと     | `loop` のアイコンでは `true`（モーション軽減が有効な場合を除く）。                                                                    |
| `loop`        | アイコンごと     | `loop` と `hover-loop` のアイコンでは `true`。                                                                                        |
| `speed`       | `1`              | 再生速度。                                                                                                                            |
| `render`      | —                | 独自のラッパーを使うための render prop。[アイコンを本物のボタンで包む](#wrap-the-icon-in-a-real-button)を参照してください。           |

それ以外の prop（`className`、`aria-label`、`onClick` など）はラッパーの `<span>` に渡されます。イベントハンドラーはアニメーションの処理より先に実行され、`event.preventDefault()` を呼ぶとアニメーションをスキップできます。

## アイコンのインポート {#importing-icons}

アイコンは 1 つずつ `react-useanimations/lib/<name>` からインポートするか、`react-useanimations/icons` から複数まとめてインポートします：

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

どちらの方法でも、本番ビルドには使ったアイコンだけが含まれます。ただし開発サーバーやテストランナーはツリーシェイキングを行わないため、`react-useanimations/icons` を使うと全アイコンが読み込まれます。それが気になる場合は `lib/<name>` を使ってください。`delete` と `package` は予約語なので、`deleteIcon` と `packageIcon` としてインポートします。

## 制御型のトグル {#controlled-toggle}

```jsx
import { useState } from 'react';
import UseAnimations from 'react-useanimations';
import menu from 'react-useanimations/lib/menu';

export function MenuButton() {
  const [open, setOpen] = useState(false);
  return (
    <UseAnimations
      animation={menu}
      size={40}
      active={open} // `open` がほかの場所で変わったときもアニメーションする
      onClick={() => setOpen(!open)}
    />
  );
}
```

## アイコンを本物のボタンで包む {#wrap-the-icon-in-a-real-button}

クリックできるアイコンは、`render` prop を使ってフォーカス可能な要素で包みましょう。`eventProps` は自分の要素に、`animationProps` はその中の `<span>` に渡します。こうすると、ボタンがキーボードフォーカスを受けたときにもホバーアニメーションが再生されます。

```jsx
import heart from 'react-useanimations/lib/heart';

<UseAnimations
  animation={heart}
  size={32}
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Add to favorites" {...eventProps}>
      <span {...animationProps} />
    </button>
  )}
/>;
```

<div id="customize"></div>

## サイズと色 {#size--color}

アイコンは 24 px または 32 px のアートボードに描かれたラインアイコンで、どのサイズでもくっきり表示されます。`size` にはピクセル数か任意の CSS の長さを指定します。

線は `currentColor` に追従するので、アイコンはテキストの色、ホバー時の色、ダークモードに自動で合わせます。色は `strokeColor` と `fillColor`、CSS の `color`、またはパスへのスタイル指定で変更できます。組み込みのルールは詳細度がゼロなので、自分で書いた CSS が必ず優先されます。

一部のアイコンは、自身の形に切り欠きを入れています（`visibility`、`microphone`、`video`、`volume`、`notification` の斜線、`download` のチェック、`notification3` のバッジを囲むリング）。この切り欠きはページの背景色になり、明るいページでは白、`color-scheme: dark` のページでは暗い色になります。それ以外の背景では、`--ua-knockout` CSS 変数で指定してください（例：`body { --ua-knockout: #0f172a; }`）。

```jsx
// Tailwind：色と線の太さ
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js とサーバーサイドレンダリング {#nextjs-and-server-rendering}

コンポーネントには `'use client'` が付いていて、アニメーションはブラウザーでのみ描画されます。そのため、サーバーコンポーネントや SSR フレームワーク（Next.js、Remix、Astro）から、`dynamic(…, { ssr: false })` なしでレンダリングできます。アイコンのモジュールはただのデータなので、サーバーコンポーネントでインポートして props として渡せます。

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

どのアイコンも [shadcn レジストリ](https://ui.shadcn.com/docs/registry)に登録されています。CLI がすぐに使えるコンポーネントを追加し、`react-useanimations` をインストールします：

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

コンポーネント名は `Animated` + PascalCase にしたアイコン ID（`check-box` → `AnimatedCheckBox`）で、`components/animations/<id>.tsx` に追加され、`UseAnimations` と同じ props を受け取ります。レジストリのインデックスは [/r/registry.json](/r/registry.json) です。`npx shadcn@latest add @useanimations/checkmark` のように短く書くには、`components.json` にレジストリを追加します：

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## 独自のアニメーション {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

独自のアニメーションは、アイコンと同じ Lottie JSON 形式である必要があります。プレーヤーが対応しているのはアイコンに必要な機能です。シェイプレイヤー、プリコンポジション、ヌルレイヤーと親子関係、パス、長方形、楕円、線、塗り、パスのトリミング、マスク、イージング付きのキーフレーム、停止キーフレーム、モーションパス、そして `loopOut()` と `wiggle()` のエクスプレッションです。グラデーション、テキストレイヤーや画像レイヤー、エフェクト、マットなどそれ以外のものは描画されず、未対応のレイヤー、シェイプ、エクスプレッションについてはコンソールに警告が出ます。

<div id="direct-urls"></div><div id="download"></div>

## ファイルと icons.json {#files--iconsjson}

どのアイコンも、各アイコンのページから、または CORS を有効にした固定の URL からダウンロードできます：

| ファイル                      | URL                                                |
| ----------------------------- | -------------------------------------------------- |
| アニメーション（Lottie JSON） | `https://useanimations.com/icons/<id>.json`        |
| 各状態の静的 SVG              | `https://useanimations.com/icons/<id>/<state>.svg` |
| JSON と SVG をまとめた ZIP    | `https://useanimations.com/icons/<id>.zip`         |
| アイコンのページ（英語）      | `https://useanimations.com/icons/<id>`             |
| 全アイコンのカタログ          | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) には、すべてのアイコンの ID、タイトル、カテゴリ、検索キーワード、インタラクション、ファイル URL、サイズ、再生時間、`react-useanimations` のインポート文、shadcn のコマンドが載っています。npm パッケージにも同じデータが入っています。`react-useanimations/catalog.json`（メタデータ）、`react-useanimations/icons`（アニメーション）、`react-useanimations/svg.json`（静的 SVG）です。

<div id="without-react"></div>

## React なしで使う {#use-without-react}

アイコンは標準的な Lottie JSON なので、どの Lottie プレーヤーでも `https://useanimations.com/icons/<id>.json` から、またはプロジェクトにコピーしたファイルから再生できます。React 以外では、インタラクションは自分で組む必要があります。ほかのプレーヤーや例は [Lottie アイコン](/lottie-icons)にまとめています。

一部のアイコンは After Effects のエクスプレッション（`loopOut()`、`wiggle()`）を使っていて、[icons.json](/icons.json) では `requiresFullPlayer` で示されています。Web では `lottie_light` ではなく lottie-web のフルビルドが必要で、ネイティブのプレーヤーはエクスプレッションを評価しません。

<div id="html"></div><div id="interactions-web"></div>

### HTML と JavaScript {#html-and-javascript}

```html
<div id="icon" style="width: 48px; height: 48px"></div>

<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie.min.js"></script>
<script>
  const el = document.getElementById('icon');
  const animation = lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://useanimations.com/icons/archive.json',
  });
  // ホバー：乗ると順方向、離れると逆方向
  el.addEventListener('mouseenter', () => {
    animation.setDirection(1);
    animation.play();
  });
  el.addEventListener('mouseleave', () => {
    animation.setDirection(-1);
    animation.play();
  });
</script>
```

SVG レンダラーを使えば、React コンポーネントと同じようにアイコンをテキストの色に追従させられます：

```css
#icon path[stroke^='rgb']:not([stroke='rgb(255,255,255)']) {
  stroke: currentColor;
}
#icon path[fill='rgb(0,0,0)'] {
  fill: currentColor;
}
```

<div id="vue"></div>

### Vue {#vue}

```vue
<script setup>
import lottie from 'lottie-web';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let animation;
onMounted(() => {
  animation = lottie.loadAnimation({
    container: el.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://useanimations.com/icons/loading.json',
  });
});
onBeforeUnmount(() => animation?.destroy());
</script>

<template>
  <div ref="el" style="width: 48px; height: 48px" />
</template>
```

### React Native {#react-native}

```jsx
import LottieView from 'lottie-react-native';

<LottieView source={require('./loading.json')} autoPlay loop style={{ width: 48, height: 48 }} />;
```

<div id="ios"></div>

### iOS {#ios}

[lottie-ios](https://github.com/airbnb/lottie-ios) を使い、JSON をアプリのバンドルに入れた場合：

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Jetpack Compose で [lottie-android](https://github.com/airbnb/lottie-android) を使い、JSON を `res/raw` に置いた場合：

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

[lottie](https://pub.dev/packages/lottie) パッケージを使う場合：

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## パフォーマンスとアクセシビリティ {#performance--accessibility}

- **軽量：** プレーヤーは gzip 圧縮後 8 kB で依存関係はなく、アイコン 1 個は 1〜15 kB（中央値 2 kB）です。
- **遅延描画：** アニメーションはページのレンダリング後、ブラウザーでのみ描画されます。自動再生のループは画面外にスクロールされている間は一時停止し、アンマウント時にはすべてクリーンアップされます。
- **デフォルトは装飾扱い：** `aria-label` を渡さない限り、アイコンはスクリーンリーダーから隠されます（`aria-hidden`）。`aria-label` を渡すと画像として読み上げられます。アイコンだけのコントロールには、`aria-label` を付けた本物の `<button>` を使い（[前述](#wrap-the-icon-in-a-real-button)を参照）、トグルの状態は `aria-pressed` や `aria-expanded` で伝えてください。
- **モーション軽減とタッチ操作：** アイコンは `prefers-reduced-motion` を尊重し、タッチスクリーンでのタップではホバーアニメーションは始まりません。

<div id="agents"></div>

## AI コーディングエージェント {#ai-coding-agents}

エージェントは [icons.json](/icons.json) またはパッケージ内の `react-useanimations/catalog.json` から、キーワードやインタラクションでアイコンを選び、そこに載っているインポート文や shadcn のコマンドを使えます。各アイコンのインポートの型定義にも、タイトル、キーワード、インタラクション、プレビューが含まれています。このドキュメントは Markdown 版を [/documentation.md](/documentation.md) で公開していて、[/llms.txt](/llms.txt) がサイト全体の索引になっています。

## v2 からのアップグレード {#upgrading-from-v2}

ほとんどのアプリでは、v3 をインストールするだけでアップグレードは完了します。コンポーネント、`react-useanimations/lib/<name>` のインポート、v2 の 79 個のアイコンはすべてそのままです。以下の手順のうち、自分のコードに当てはまるものを進めてください。

### 1. v3 をインストールする {#1-install-v3}

v3 は React 18 以降が必要で、依存関係はありません。アプリのほかの部分で使っていなければ、lottie-web も削除してください。

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. `reverse` を `active` に置き換える {#2-replace-reverse-with-active}

`active` は完全な制御型です。`active` が変わるとアイコンがアニメーションし、クリックだけでは切り替わらないので、`onClick` で更新してください。`reverse` は v2 と同じように動きます（開始時の状態を決め、クリックでアイコンが切り替わる）が、非推奨です。どちらも `click-toggle` のアイコンにだけ効きます。4 つの円形矢印アイコンは、クリックで再生する動きに変わりました（[手順 6](#6-check-the-icons-whose-interaction-changed) を参照）。

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. 色を確認する {#3-check-the-colors}

v2 のアイコンは、`strokeColor` を指定しない限り黒でした。v3 のアイコンはテキストの色（`currentColor`）に追従し、`fillColor` のデフォルトは `strokeColor` です。色付きのテキストやリンクの中にあるアイコンはその色に変わります。黒のままにしたい場合は、自分で色を指定してください：

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. `wrapperStyle`、`pathCss`、`options` を移行する {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** は非推奨です。`style` を使ってください。
- **`pathCss`** は削除されました。クラスを使ってパスにスタイルを当ててください。
- **`options`**（lottie-web の設定）は lottie-web とともに削除されました。`loop`、`autoplay`、`speed` の props を使ってください。それ以外の lottie-web のオプションに相当するものはありません。

それでも `pathCss` や `options` を渡すと、警告が 1 回だけ出力され、値は無視されます。

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. ラッパー要素を確認する {#5-check-the-wrapper-element}

ラッパーは `<div>` から inline-block の `<span>` に変わりました。これにより、ボタンやリンクの中に置いても有効な HTML になり、テキストの行内に収まります。ラッパーを `div` として指定している CSS を更新し、`render` prop では `animationProps` を `<span>` に展開してください：

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

また、`aria-label` を渡さない限り、アイコンはスクリーンリーダーから隠される（`aria-hidden`）ようになりました。単体で意味を持つアイコンには `aria-label` を付けてください。

### 6. インタラクションが変わったアイコンを確認する {#6-check-the-icons-whose-interaction-changed}

インタラクションは useanimations.com の表示と一致するようになりました。v2 と同じ動きにしたいアイコンには、以前のインタラクションを渡してください：

| アイコン                                                                                           | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`、`arrowLeftCircle`、`arrowRightCircle`、`arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`、`folder`、`home`、`instagram`、`userMinus`、`userPlus`、`userX`、`youtube`、`youtube2` | `hover-replay`\* | `hover`        |
| `behance`、`codepen`、`facebook`、`github`、`linkedin`、`pocket`、`twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`、`edit`、`mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`、`zoomOut`                                                                                | `loop`           | `hover`        |

\* v2 ではポインターが乗ると 1 回再生し、離れると最初に戻っていました。いちばん近いのは `hover-replay` です。

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. インポートを更新する {#7-update-imports}

アイコンのインポートは `react-useanimations/lib/<name>` か `react-useanimations/icons` からに限られます。`react-useanimations/lib/github/index` や `react-useanimations/lib/github/github.json` のような v2 の内部ファイルパスは解決できなくなりました。Lottie JSON はアイコンの `animationData` で取得できます：

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

`react-useanimations/utils` のパスは削除されました。型はパッケージからインポートしてください：

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` は `{ animationData, interaction }` になりました。v2 の `animationKey` フィールドはなくなったので、自分で組み立てたオブジェクトでは代わりに `interaction` を使ってください。

### そのほかの新機能 {#what-else-is-new}

221 個のアイコンの追加（合計 300 個）、`react-useanimations/icons` からの複数アイコンの一括インポート、モーション軽減への対応、キーボードフォーカスでのホバー再生、タッチスクリーンでホバーアニメーションが止まったままにならない動作、回避策なしのサーバーサイドレンダリング、そして [shadcn レジストリ](#shadcnui)。

## ライセンス {#license}

アイコンとコードは [MIT ライセンス](https://opensource.org/license/mit/)で公開しています。個人・商用を問わず、使用、改変、再配布ができます。クレジット表記は必須ではありませんが、入れていただけるとうれしいです：

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

詳しい条件は[ライセンスと利用規約](/licencing-and-terms)を参照してください。

## よくある質問 {#faq}

<details><summary>useAnimations は商用プロジェクトでも無料で使えますか？</summary>

はい。アイコンとパッケージは MIT ライセンスで、クレジット表記も必要ありません。

</details>

<details><summary>アイコンの色を変えるには？</summary>

アイコンはテキストの色に追従します。`strokeColor` と `fillColor`、CSS の `color`、またはパスへのスタイル指定で変更できます。詳しくは[サイズと色](#size--color)を参照してください。

</details>

<details><summary>React なしでも使えますか？</summary>

パッケージは React 向けです。ただし、どのアイコンも Lottie JSON ファイルとして lottie-web、lottie-ios、lottie-android、Flutter、React Native で再生でき、静的 SVG も用意しています。[React なしで使う](#use-without-react)と [Lottie アイコン](/lottie-icons)を参照してください。

</details>

<details><summary>AI コーディングエージェントで useAnimations を使えますか？</summary>

はい。[icons.json](/icons.json) と [/documentation.md](/documentation.md) をエージェントに渡してください。パッケージ自体にも `catalog.json` と、全アイコンのドキュメント付きの型が含まれています。

</details>
