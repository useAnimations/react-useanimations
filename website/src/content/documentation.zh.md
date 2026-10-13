# 文档 {#documentation}

useAnimations 是一个免费的动态图标库，采用 MIT 许可证，为 React 提供 300 个动态图标。每个图标都内置一种交互：循环播放、点击播放或悬停播放。您可以通过 `react-useanimations` 软件包使用它们，也可以用 shadcn CLI 添加到项目中。

<div id="quick-start-react"></div>

## 快速上手 {#quick-start}

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

图标会跟随文字颜色，并播放自己的交互：`github` 在悬停期间循环播放。这个软件包没有任何依赖，由内置播放器（gzip 压缩后 8 kB）把图标绘制成 SVG；每个图标都是独立模块，因此打包结果只包含您导入的图标。

## 交互方式 {#interactions}

每个图标都自带为它设计的交互，可以用 `interaction` 属性覆盖。

| 交互方式       | 效果                                         | 示例图标                             |
| -------------- | -------------------------------------------- | ------------------------------------ |
| `loop`         | 持续播放。                                   | `loading`, `activity`, `alertCircle` |
| `click-toggle` | 点击时在两种状态之间切换（先正向，再反向）。 | `menu`, `checkBox`, `playPause`      |
| `click-replay` | 每次点击都从头播放。                         | `download`, `refresh`, `send`        |
| `hover`        | 指针移入时正向播放，移出时反向播放。         | `archive`, `settings`, `trash`       |
| `hover-loop`   | 悬停期间循环播放，移出后播完当前一轮。       | `github`, `twitter`, `dribbble`      |
| `hover-replay` | 指针移入时从头播放一次。                     | `arrowRight`, `bluetooth`, `zap`     |

当用户偏好减少动态效果时，图标会保持静止：循环图标显示第一帧，悬停和重播动画不会播放，切换类图标会直接切换到新状态。

<div id="react"></div>

## 属性 {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| 属性          | 默认值           | 说明                                                                                                    |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | 从 `react-useanimations/lib/<name>` 导入的图标；使用自己的动画时传入 `{ animationData, interaction }`。 |
| `size`        | `24`             | 宽度和高度；数字表示像素，字符串可以是任意 CSS 长度，例如 `'1.5em'`。                                   |
| `strokeColor` | `'currentColor'` | 线条颜色。默认跟随文字颜色。                                                                            |
| `fillColor`   | `strokeColor`    | 填充部分的颜色，例如点赞后的爱心。                                                                      |
| `interaction` | 因图标而异       | `'loop'`、`'click-toggle'`、`'click-replay'`、`'hover'`、`'hover-loop'` 或 `'hover-replay'`。           |
| `active`      | —                | 用于 `click-toggle` 图标：`true` 显示结束状态。受控模式：在 `onClick` 中设置它，点击本身不会切换图标。  |
| `autoplay`    | 因图标而异       | `loop` 图标默认为 `true`，除非用户偏好减少动态效果。                                                    |
| `loop`        | 因图标而异       | `loop` 和 `hover-loop` 图标默认为 `true`。                                                              |
| `speed`       | `1`              | 播放速度。                                                                                              |
| `render`      | —                | 用于自定义外层元素的 render 属性，参见[把图标放进真正的按钮](#wrap-the-icon-in-a-real-button)。         |

其他属性（`className`、`aria-label`、`onClick` 等）都会传给外层的 `<span>`。您的事件处理函数会先于动画执行；调用 `event.preventDefault()` 即可跳过动画。

## 导入图标 {#importing-icons}

可以从 `react-useanimations/lib/<name>` 逐个导入图标，也可以从 `react-useanimations/icons` 一次导入多个：

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

无论哪种方式，生产构建都只包含您用到的图标。开发服务器和测试运行器不做 tree-shaking，所以在这些环境中 `react-useanimations/icons` 会加载全部图标；如果这一点对您很重要，请优先使用 `lib/<name>`。`delete` 和 `package` 是保留字，请分别以 `deleteIcon` 和 `packageIcon` 导入。

## 受控切换 {#controlled-toggle}

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
      active={open} // `open` 在别处改变时同样会播放动画
      onClick={() => setOpen(!open)}
    />
  );
}
```

## 把图标放进真正的按钮 {#wrap-the-icon-in-a-real-button}

对于可点击的图标，请用 `render` 属性在图标外面包一层可聚焦的元素：`eventProps` 放在您的元素上，`animationProps` 放在其内部的 `<span>` 上。这样按钮获得键盘焦点时，悬停动画也会播放。

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

## 尺寸与颜色 {#size--color}

这些图标都是线性图标，绘制在 24 或 32 px 的画板上，任何尺寸下都保持清晰：把 `size` 设为像素数或任意 CSS 长度即可。

线条使用 `currentColor`，因此图标会自动继承文字颜色、悬停状态和深色模式。可以通过 `strokeColor` 和 `fillColor`、CSS `color` 修改颜色，也可以直接给路径设置样式：内置规则的优先级（specificity）为零，所以您的 CSS 总能生效。

有些图标在自身上留出了镂空（`visibility`、`microphone`、`video`、`volume` 和 `notification` 中的斜线，`download` 中的对勾，`notification3` 徽标周围的圆环）。镂空部分取页面背景色：浅色页面上为白色，设置了 `color-scheme: dark` 的页面上为深色。在其他背景上，请用 CSS 变量 `--ua-knockout` 指定，例如 `body { --ua-knockout: #0f172a; }`。

```jsx
// Tailwind：颜色和线条粗细
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js 与服务端渲染 {#nextjs-and-server-rendering}

组件标记为 `'use client'`，只在浏览器中绘制动画，因此可以在服务端组件和 SSR 框架（Next.js、Remix、Astro）中直接渲染，无需 `dynamic(…, { ssr: false })`。图标模块是普通数据，服务端组件可以直接导入并作为属性传递。

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

每个图标也都收录在 [shadcn 注册表](https://ui.shadcn.com/docs/registry)中。CLI 会添加一个现成的组件，并安装 `react-useanimations`：

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

组件名为 `Animated` 加上 PascalCase 形式的图标 id（`check-box` → `AnimatedCheckBox`），文件位于 `components/animations/<id>.tsx`，接受与 `UseAnimations` 相同的属性。注册表索引位于 [/r/registry.json](/r/registry.json)。如果想使用 `npx shadcn@latest add @useanimations/checkmark` 这种简短写法，请把注册表添加到 `components.json`：

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## 使用自己的动画 {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

您的动画必须是 Lottie JSON 文件，也就是这些图标所用的格式。播放器支持图标所需的功能：形状图层、预合成、空对象图层与父子关系、路径、矩形、椭圆、描边、填充、修剪路径、蒙版、带缓动的关键帧、定格关键帧和运动路径，以及 `loopOut()` 和 `wiggle()` 表达式。其他内容（例如渐变、文本或图片图层、效果和遮罩）不会被绘制；对于不支持的图层、形状和表达式，控制台会给出警告。

<div id="direct-urls"></div><div id="download"></div>

## 文件与 icons.json {#files--iconsjson}

每个图标都可以下载，既可以在图标页面下载，也可以通过固定且支持 CORS 的网址获取：

| 文件                    | 网址                                               |
| ----------------------- | -------------------------------------------------- |
| 动画（Lottie JSON）     | `https://useanimations.com/icons/<id>.json`        |
| 每个状态的静态 SVG      | `https://useanimations.com/icons/<id>/<state>.svg` |
| 包含 JSON 和 SVG 的 ZIP | `https://useanimations.com/icons/<id>.zip`         |
| 图标页面                | `https://useanimations.com/icons/<id>`             |
| 全部图标的目录          | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) 列出了每个图标的 id、标题、类别、搜索关键词、交互方式、文件网址、尺寸和时长，以及对应的 `react-useanimations` 导入语句和 shadcn 命令。npm 软件包中也附带相同的数据：`react-useanimations/catalog.json`（元数据）、`react-useanimations/icons`（动画）和 `react-useanimations/svg.json`（静态 SVG）。

<div id="without-react"></div>

## 不使用 React {#use-without-react}

这些图标都是标准的 Lottie JSON，任何 Lottie 播放器都能从 `https://useanimations.com/icons/<id>.json` 或项目中的副本播放它们。在 React 之外，交互需要您自己实现。更多播放器和示例请参阅 [Lottie 图标](/lottie-icons)。

有些图标用到了 After Effects 表达式（`loopOut()`、`wiggle()`），[icons.json](/icons.json) 中用 `requiresFullPlayer` 标出了它们。在网页上，它们需要 lottie-web 的完整版，而不是 `lottie_light`；原生播放器则不会执行表达式。

<div id="html"></div><div id="interactions-web"></div>

### HTML 与 JavaScript {#html-and-javascript}

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
  // hover：移入时正向播放，移出时反向播放
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

使用 SVG 渲染器时，图标也可以像 React 组件那样跟随文字颜色：

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

使用 [lottie-ios](https://github.com/airbnb/lottie-ios)，并把 JSON 放进应用包：

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

在 Jetpack Compose 中使用 [lottie-android](https://github.com/airbnb/lottie-android)，并把 JSON 放在 `res/raw` 中：

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

使用 [lottie](https://pub.dev/packages/lottie) 包：

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## 性能与无障碍 {#performance--accessibility}

- **小巧**：播放器 gzip 压缩后为 8 kB，没有任何依赖；单个图标为 1 到 15 kB（中位数 2 kB）。
- **延迟绘制**：动画只在浏览器中、页面渲染完成后才绘制；自动播放的循环动画在滚出视口时会暂停，组件卸载时会清理所有资源。
- **默认仅作装饰**：图标对屏幕阅读器隐藏（`aria-hidden`），除非您传入 `aria-label`，此时它会被当作图片读出。对于只有图标的控件，请使用带 `aria-label` 的真正 `<button>`（见[上文](#wrap-the-icon-in-a-real-button)），并用 `aria-pressed` 或 `aria-expanded` 反映切换状态。
- **减少动态效果与触屏**：图标遵循 `prefers-reduced-motion`，在触摸屏上轻触不会触发悬停动画。

<div id="agents"></div>

## AI 编程智能体 {#ai-coding-agents}

智能体可以从 [icons.json](/icons.json) 或软件包内的 `react-useanimations/catalog.json` 中按关键词或交互方式挑选图标，并使用其中列出的导入语句或 shadcn 命令。每个图标导入的类型定义里也带有它的标题、关键词、交互方式和预览。本文档提供 Markdown 版本，位于 [/documentation.md](/documentation.md)；[/llms.txt](/llms.txt) 则是整个站点的索引。

## 从 v2 升级 {#upgrading-from-v2}

对大多数应用来说，升级就是安装 v3：组件本身、`react-useanimations/lib/<name>` 形式的导入以及 v2 的全部 79 个图标都保持不变。请按下面的步骤逐一检查适用于您代码的部分。

### 1. 安装 v3 {#1-install-v3}

v3 需要 React 18 或更高版本，并且没有任何依赖。如果应用中没有其他地方用到 lottie-web，也请一并移除。

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. 用 `active` 替换 `reverse` {#2-replace-reverse-with-active}

`active` 是完全受控的：`active` 变化时图标播放动画，单独点击不会切换图标，因此请在 `onClick` 中更新它。`reverse` 仍然和 v2 中一样可用（它设置初始状态，点击会切换图标），但已被弃用。两者都只对 `click-toggle` 图标生效：四个圆形箭头图标现在改为点击重播（见[第 6 步](#6-check-the-icons-whose-interaction-changed)）。

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. 检查颜色 {#3-check-the-colors}

在 v2 中，除非设置了 `strokeColor`，图标都是黑色的。v3 的图标跟随文字颜色（`currentColor`），并且 `fillColor` 默认等于 `strokeColor`。位于彩色文字或链接中的图标会随之变色；如果想保持黑色，请自己设置颜色：

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. 迁移 `wrapperStyle`、`pathCss` 和 `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** 已弃用：请改用 `style`。
- **`pathCss`** 已移除：请通过类名给路径设置样式。
- **`options`**（lottie-web 的设置）已随 lottie-web 一起移除。请使用 `loop`、`autoplay` 和 `speed` 属性；lottie-web 的其他选项没有对应的替代。

如果仍然传入 `pathCss` 或 `options`，会输出一次警告，然后被忽略。

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. 检查外层元素 {#5-check-the-wrapper-element}

外层元素现在是 inline-block 的 `<span>`，而不是 `<div>`，因此可以合法地放在按钮和链接中，并与文字处于同一行。请更新把外层元素当作 `div` 来选择的 CSS，并在 `render` 属性中把 `animationProps` 展开到 `<span>` 上：

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

图标现在默认对屏幕阅读器隐藏（`aria-hidden`），除非您传入 `aria-label`；对于本身就承载含义的图标，请为它加上标签。

### 6. 检查交互方式有变化的图标 {#6-check-the-icons-whose-interaction-changed}

交互方式现在与 useanimations.com 保持一致。如果希望某个图标保持 v2 中的行为，请传入它原来的交互方式：

| 图标                                                                                               | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* v2 中这些图标在指针移入时播放一次，移出时跳回起点；`hover-replay` 是最接近的效果。

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. 更新导入 {#7-update-imports}

只能以 `react-useanimations/lib/<name>` 的形式或从 `react-useanimations/icons` 导入图标。v2 的内部文件路径，例如 `react-useanimations/lib/github/index` 或 `react-useanimations/lib/github/github.json`，已无法解析；Lottie JSON 现在是图标的 `animationData`：

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

`react-useanimations/utils` 路径已被移除。请直接从软件包导入类型：

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` 现在是 `{ animationData, interaction }`；v2 的 `animationKey` 字段已不存在，因此您自己构造的对象请改用 `interaction`。

### 其他新特性 {#what-else-is-new}

新增 221 个图标（共 300 个）、可从 `react-useanimations/icons` 一次导入多个图标、支持减少动态效果、键盘聚焦时播放悬停动画、触摸屏上不再出现卡住的悬停动画、无需变通方案即可服务端渲染，以及 [shadcn 注册表](#shadcnui)。

## 许可证 {#license}

图标和代码均以 [MIT 许可证](https://opensource.org/license/mit/)发布：可以在个人和商业作品中使用、修改和再分发。署名不是必需的，但我们很欢迎：

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

完整条款：[许可与条款](/licencing-and-terms)。

## 常见问题 {#faq}

<details><summary>useAnimations 可以免费用于商业项目吗？</summary>

可以。图标和软件包都采用 MIT 许可证，无需署名。

</details>

<details><summary>如何修改图标的颜色？</summary>

图标默认跟随文字颜色。可以通过 `strokeColor` 和 `fillColor`、CSS `color`，或者直接给路径设置样式来修改。参见[尺寸与颜色](#size--color)。

</details>

<details><summary>不使用 React 也能用吗？</summary>

这个软件包是为 React 设计的。不过每个图标同时也是 Lottie JSON 文件，lottie-web、lottie-ios、lottie-android、Flutter 和 React Native 都能播放，另外还提供静态 SVG。参见[不使用 React](#use-without-react) 和 [Lottie 图标](/lottie-icons)。

</details>

<details><summary>AI 编程智能体可以使用 useAnimations 吗？</summary>

可以。让它们读取 [icons.json](/icons.json) 和 [/documentation.md](/documentation.md) 即可；软件包本身也附带 `catalog.json`，并为每个图标提供了带文档注释的类型定义。

</details>
