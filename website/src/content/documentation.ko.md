# 문서 {#documentation}

useAnimations는 React용 애니메이션 아이콘 300개를 담은 무료 MIT 라이선스 라이브러리입니다. 모든 아이콘에는 인터랙션이 내장되어 있어서 반복 재생되거나, 클릭하면 재생되거나, 호버하면 재생됩니다. `react-useanimations` 패키지로 쓰거나 shadcn CLI로 추가하세요.

<div id="quick-start-react"></div>

## 빠른 시작 {#quick-start}

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

아이콘은 텍스트 색상을 따라가고 자기 인터랙션대로 재생됩니다. `github`는 호버하는 동안 반복 재생됩니다. 패키지에는 의존성이 없습니다. 내장 플레이어(gzip 기준 8 kB)가 아이콘을 SVG로 그리고, 아이콘마다 별도 모듈이라 번들에는 가져온 아이콘만 포함됩니다.

## 인터랙션 {#interactions}

모든 아이콘에는 디자인할 때 정한 인터랙션이 있습니다. `interaction` prop으로 바꿀 수 있습니다.

| 인터랙션       | 동작                                                                      | 예시 아이콘                          |
| -------------- | ------------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | 계속 재생됩니다.                                                          | `loading`, `activity`, `alertCircle` |
| `click-toggle` | 클릭하면 두 상태 사이를 전환합니다(정방향, 그다음 역방향).                | `menu`, `checkBox`, `playPause`      |
| `click-replay` | 클릭할 때마다 처음부터 다시 재생됩니다.                                   | `download`, `refresh`, `send`        |
| `hover`        | 마우스가 들어오면 정방향으로, 나가면 역방향으로 재생됩니다.               | `archive`, `settings`, `trash`       |
| `hover-loop`   | 호버하는 동안 반복 재생되고, 마우스가 나가면 현재 사이클을 마저 끝냅니다. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | 마우스가 들어오면 처음부터 한 번 재생됩니다.                              | `arrowRight`, `bluetooth`, `zap`     |

사용자가 동작 줄이기를 설정했다면 아이콘은 움직이지 않습니다. 루프 아이콘은 첫 프레임을 보여 주고, 호버·재생 애니메이션은 재생되지 않으며, 토글은 곧바로 새 상태로 전환됩니다.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | 기본값           | 설명                                                                                                                     |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `animation`   | —                | `react-useanimations/lib/<name>`에서 가져온 아이콘, 또는 직접 만든 애니메이션이라면 `{ animationData, interaction }`.    |
| `size`        | `24`             | 너비와 높이. 숫자는 픽셀, 문자열은 `'1.5em'` 같은 모든 CSS 길이 단위.                                                    |
| `strokeColor` | `'currentColor'` | 선 색상. 기본적으로 아이콘은 텍스트 색상을 따라갑니다.                                                                   |
| `fillColor`   | `strokeColor`    | 채워진 부분의 색상(예: 좋아요를 누른 하트).                                                                              |
| `interaction` | 아이콘별         | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'`, `'hover-replay'` 중 하나.                       |
| `active`      | —                | `click-toggle` 아이콘용: `true`면 끝 상태를 표시. 제어 방식이므로 `onClick`에서 값을 바꾸며, 클릭만으로는 전환되지 않음. |
| `autoplay`    | 아이콘별         | `loop` 아이콘은 `true`. 단, 동작 줄이기가 설정되어 있으면 제외.                                                          |
| `loop`        | 아이콘별         | `loop`와 `hover-loop` 아이콘은 `true`.                                                                                   |
| `speed`       | `1`              | 재생 속도.                                                                                                               |
| `render`      | —                | 래퍼를 직접 만들기 위한 render prop. [아이콘을 실제 버튼으로 감싸기](#wrap-the-icon-in-a-real-button) 참고.              |

그 밖의 prop(`className`, `aria-label`, `onClick` 등)은 래퍼 `<span>`에 전달됩니다. 직접 작성한 이벤트 핸들러는 애니메이션보다 먼저 실행되며, `event.preventDefault()`를 호출하면 애니메이션을 건너뜁니다.

## 아이콘 가져오기 {#importing-icons}

아이콘은 하나씩 `react-useanimations/lib/<name>`에서 가져오거나, 여러 개를 한꺼번에 `react-useanimations/icons`에서 가져오세요.

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

어느 쪽이든 프로덕션 빌드에는 실제로 쓰는 아이콘만 포함됩니다. 다만 개발 서버와 테스트 러너는 트리 셰이킹을 하지 않으므로 `react-useanimations/icons`가 모든 아이콘을 불러옵니다. 이것이 문제가 된다면 `lib/<name>`을 쓰세요. `delete`와 `package`는 예약어이므로 `deleteIcon`, `packageIcon`으로 가져옵니다.

## 제어 토글 {#controlled-toggle}

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
      active={open} // 다른 곳에서 `open`이 바뀔 때도 애니메이션됨
      onClick={() => setOpen(!open)}
    />
  );
}
```

## 아이콘을 실제 버튼으로 감싸기 {#wrap-the-icon-in-a-real-button}

클릭할 수 있는 아이콘이라면 `render` prop으로 포커스 가능한 요소를 아이콘 바깥에 두세요. `eventProps`는 직접 만든 요소에, `animationProps`는 그 안의 `<span>`에 전달합니다. 그러면 버튼이 키보드 포커스를 받을 때도 호버 애니메이션이 재생됩니다.

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

## 크기와 색상 {#size--color}

아이콘은 24 px 또는 32 px 아트보드에 그린 라인 아이콘이며, 어떤 크기에서도 선명합니다. `size`에 픽셀 숫자나 CSS 길이를 지정하세요.

선은 `currentColor`를 따르므로 아이콘이 텍스트 색상, 호버 상태, 다크 모드를 알아서 따라갑니다. `strokeColor`와 `fillColor`, CSS `color`로 바꾸거나 path에 직접 스타일을 지정하세요. 내장 규칙의 명시도가 0이라 작성한 CSS가 항상 우선합니다.

일부 아이콘은 자기 자신에 틈을 냅니다(`visibility`, `microphone`, `video`, `volume`, `notification`의 사선, `download`의 체크 표시, `notification3` 배지 주위의 고리). 이 틈은 페이지 배경색을 따릅니다. 밝은 페이지에서는 흰색, `color-scheme: dark`인 페이지에서는 어두운 색입니다. 다른 배경에서는 `--ua-knockout` CSS 변수로 지정하세요. 예: `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: 색상과 선 두께
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js와 서버 렌더링 {#nextjs-and-server-rendering}

컴포넌트에는 `'use client'`가 지정되어 있고 애니메이션은 브라우저에서만 그리므로, `dynamic(…, { ssr: false })` 없이 서버 컴포넌트와 SSR 프레임워크(Next.js, Remix, Astro)에서 렌더링할 수 있습니다. 아이콘 모듈은 순수 데이터라서 서버 컴포넌트에서 가져와 props로 넘길 수 있습니다.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

모든 아이콘은 [shadcn 레지스트리](https://ui.shadcn.com/docs/registry)에도 있습니다. CLI가 바로 쓸 수 있는 컴포넌트를 추가하고 `react-useanimations`를 설치합니다.

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

컴포넌트 이름은 `Animated` + PascalCase로 쓴 아이콘 id(`check-box` → `AnimatedCheckBox`)이고, `components/animations/<id>.tsx`에 생성되며 `UseAnimations`와 같은 props를 받습니다. 레지스트리 인덱스는 [/r/registry.json](/r/registry.json)입니다. `npx shadcn@latest add @useanimations/checkmark`처럼 짧게 쓰려면 `components.json`에 레지스트리를 추가하세요.

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## 직접 만든 애니메이션 {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

애니메이션은 아이콘과 같은 포맷인 Lottie JSON 파일이어야 합니다. 플레이어는 아이콘에 필요한 기능을 지원합니다. 셰이프 레이어, 프리컴포지션, 널 레이어와 부모 지정, 패스, 사각형, 타원, 선, 채우기, 트림 패스, 마스크, 이징·홀드·모션 패스가 있는 키프레임, 그리고 `loopOut()`, `wiggle()` 익스프레션입니다. 그라디언트, 텍스트·이미지 레이어, 이펙트, 매트 등 그 밖의 요소는 그려지지 않으며, 지원하지 않는 레이어, 셰이프, 익스프레션은 콘솔에 경고가 표시됩니다.

<div id="direct-urls"></div><div id="download"></div>

## 파일과 icons.json {#files--iconsjson}

모든 아이콘은 각 아이콘 페이지나 CORS가 허용된 고정 URL에서 내려받을 수도 있습니다.

| 파일                    | URL                                                |
| ----------------------- | -------------------------------------------------- |
| 애니메이션(Lottie JSON) | `https://useanimations.com/icons/<id>.json`        |
| 상태별 정적 SVG         | `https://useanimations.com/icons/<id>/<state>.svg` |
| JSON과 SVG를 묶은 ZIP   | `https://useanimations.com/icons/<id>.zip`         |
| 아이콘 페이지           | `https://useanimations.com/icons/<id>`             |
| 전체 아이콘 카탈로그    | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json)에는 모든 아이콘의 id, 제목, 카테고리, 검색 키워드, 인터랙션, 파일 URL, 크기, 재생 시간, `react-useanimations` import 문, shadcn 명령이 들어 있습니다. npm 패키지에도 같은 데이터가 포함되어 있습니다. `react-useanimations/catalog.json`(메타데이터), `react-useanimations/icons`(애니메이션), `react-useanimations/svg.json`(정적 SVG)입니다.

<div id="without-react"></div>

## React 없이 사용하기 {#use-without-react}

아이콘은 표준 Lottie JSON이므로 어떤 Lottie 플레이어로도 `https://useanimations.com/icons/<id>.json`이나 프로젝트에 복사한 파일을 재생할 수 있습니다. React 밖에서는 인터랙션을 직접 연결해야 합니다. 더 많은 플레이어와 예제는 [Lottie 아이콘](/lottie-icons)에 있습니다.

일부 아이콘은 After Effects 익스프레션(`loopOut()`, `wiggle()`)을 쓰며, [icons.json](/icons.json)의 `requiresFullPlayer`로 표시되어 있습니다. 웹에서는 `lottie_light`가 아닌 lottie-web의 full 빌드가 필요하고, 네이티브 플레이어는 익스프레션을 평가하지 않습니다.

<div id="html"></div><div id="interactions-web"></div>

### HTML과 JavaScript {#html-and-javascript}

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
  // hover: 들어오면 정방향, 나가면 역방향
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

SVG 렌더러를 쓰면 React 컴포넌트처럼 아이콘이 텍스트 색상을 따라가게 할 수 있습니다.

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

[lottie-ios](https://github.com/airbnb/lottie-ios)를 쓰고 JSON을 앱 번들에 넣은 경우:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Jetpack Compose에서 [lottie-android](https://github.com/airbnb/lottie-android)를 쓰고 JSON을 `res/raw`에 넣은 경우:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

[lottie](https://pub.dev/packages/lottie) 패키지를 쓰는 경우:

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## 성능과 접근성 {#performance--accessibility}

- **작은 크기:** 플레이어는 의존성 없이 gzip 기준 8 kB이고, 아이콘 하나는 1~15 kB(중앙값 2 kB)입니다.
- **지연 처리:** 애니메이션은 페이지가 렌더링된 뒤 브라우저에서만 그립니다. 자동 재생되는 루프는 스크롤해서 화면 밖으로 나가면 일시정지하고, 언마운트하면 모두 정리됩니다.
- **기본은 장식용:** `aria-label`을 전달하지 않으면 아이콘은 스크린 리더에서 숨겨집니다(`aria-hidden`). `aria-label`을 전달하면 이미지로 읽힙니다. 아이콘만 있는 컨트롤이라면 `aria-label`이 있는 실제 `<button>`을 쓰고([위 내용](#wrap-the-icon-in-a-real-button) 참고), 토글 상태는 `aria-pressed`나 `aria-expanded`로 반영하세요.
- **동작 줄이기와 터치:** 아이콘은 `prefers-reduced-motion`을 존중하며, 터치스크린에서 탭해도 호버 애니메이션이 재생되지 않습니다.

<div id="agents"></div>

## AI 코딩 에이전트 {#ai-coding-agents}

에이전트는 [icons.json](/icons.json)이나 패키지 안의 `react-useanimations/catalog.json`에서 키워드나 인터랙션으로 아이콘을 고르고, 거기 나와 있는 import 문이나 shadcn 명령을 그대로 쓸 수 있습니다. 각 아이콘 import의 타입 정의에도 제목, 키워드, 인터랙션, 미리보기가 들어 있습니다. 이 문서는 [/documentation.md](/documentation.md)에서 마크다운으로 볼 수 있고, [/llms.txt](/llms.txt)가 사이트 전체의 색인입니다.

## v2에서 업그레이드하기 {#upgrading-from-v2}

대부분의 앱은 v3를 설치하는 것만으로 업그레이드가 끝납니다. 컴포넌트, `react-useanimations/lib/<name>` import, v2 아이콘 79개 모두 그대로입니다. 아래 단계 중 내 코드에 해당하는 것만 진행하세요.

### 1. v3 설치하기 {#1-install-v3}

v3는 React 18 이상이 필요하고 의존성이 없습니다. 앱의 다른 곳에서 lottie-web을 쓰지 않는다면 함께 제거하세요.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. `reverse`를 `active`로 바꾸기 {#2-replace-reverse-with-active}

`active`는 완전한 제어 방식입니다. `active`가 바뀌면 아이콘이 애니메이션되고, 클릭만으로는 전환되지 않으므로 `onClick`에서 값을 갱신하세요. `reverse`는 v2처럼 여전히 동작하지만(시작 상태를 정하고, 클릭하면 아이콘이 전환됨) 지원 중단(deprecated)되었습니다. 둘 다 `click-toggle` 아이콘에만 적용됩니다. 원형 화살표 아이콘 네 개는 이제 클릭하면 다시 재생됩니다([6단계](#6-check-the-icons-whose-interaction-changed) 참고).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. 색상 확인하기 {#3-check-the-colors}

v2 아이콘은 `strokeColor`를 지정하지 않으면 검은색이었습니다. v3 아이콘은 텍스트 색상(`currentColor`)을 따라가며, `fillColor`의 기본값은 `strokeColor`입니다. 색이 있는 텍스트나 링크 안의 아이콘은 그 색을 따라 바뀝니다. 검은색으로 유지하려면 색상을 직접 지정하세요.

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. `wrapperStyle`, `pathCss`, `options` 옮기기 {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`**은 지원 중단되었습니다. `style`을 쓰세요.
- **`pathCss`**는 제거되었습니다. 클래스로 path에 스타일을 지정하세요.
- **`options`**(lottie-web 설정)는 lottie-web과 함께 제거되었습니다. `loop`, `autoplay`, `speed` props를 쓰세요. 그 밖의 lottie-web 옵션에는 대응하는 기능이 없습니다.

그래도 `pathCss`나 `options`를 전달하면 경고가 한 번 출력되고, 값은 무시됩니다.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. 래퍼 요소 확인하기 {#5-check-the-wrapper-element}

래퍼가 이제 `<div>` 대신 inline-block `<span>`이므로 버튼과 링크 안에 넣어도 유효하고 텍스트 줄 위에 놓입니다. 래퍼를 `div`로 가정한 CSS를 수정하고, `render` prop에서는 `animationProps`를 `<span>`에 펼쳐 전달하세요.

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

이제 `aria-label`을 전달하지 않으면 아이콘이 스크린 리더에서 숨겨집니다(`aria-hidden`). 아이콘 자체가 의미를 전달한다면 레이블을 추가하세요.

### 6. 인터랙션이 바뀐 아이콘 확인하기 {#6-check-the-icons-whose-interaction-changed}

이제 인터랙션이 useanimations.com과 일치합니다. 아이콘이 v2처럼 동작해야 한다면 이전 인터랙션을 전달하세요.

| 아이콘                                                                                             | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* v2에서는 마우스가 들어오면 한 번 재생되고, 나가면 처음 상태로 바로 돌아갔습니다. 가장 가까운 것은 `hover-replay`입니다.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. import 경로 업데이트하기 {#7-update-imports}

아이콘은 `react-useanimations/lib/<name>`이나 `react-useanimations/icons`에서만 가져오세요. `react-useanimations/lib/github/index`나 `react-useanimations/lib/github/github.json` 같은 v2의 내부 파일 경로는 더 이상 resolve되지 않습니다. Lottie JSON은 아이콘의 `animationData`입니다.

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

`react-useanimations/utils` 경로는 제거되었습니다. 타입은 패키지에서 가져오세요.

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation`은 이제 `{ animationData, interaction }`입니다. v2의 `animationKey` 필드는 없어졌으므로, 직접 만든 객체에서는 대신 `interaction`을 쓰세요.

### 그 밖의 새로운 점 {#what-else-is-new}

아이콘 221개 추가(총 300개), `react-useanimations/icons`에서 여러 아이콘 한꺼번에 가져오기, 동작 줄이기 지원, 키보드 포커스 시 호버 재생, 터치스크린에서 호버 애니메이션이 멈춰 있는 문제 해결, 별도 우회 없는 서버 렌더링, 그리고 [shadcn 레지스트리](#shadcnui)가 추가되었습니다.

## 라이선스 {#license}

아이콘과 코드는 [MIT 라이선스](https://opensource.org/license/mit/)로 공개되어 있습니다. 개인·상업용 작업에서 사용, 수정, 재배포할 수 있습니다. 출처 표기는 필수가 아니지만, 해 주시면 감사하겠습니다.

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

전체 조건: [라이선스 및 이용 약관](/licencing-and-terms).

## 자주 묻는 질문 {#faq}

<details><summary>useAnimations를 상업용 프로젝트에 무료로 쓸 수 있나요?</summary>

네. 아이콘과 패키지는 MIT 라이선스이며, 출처 표기도 필요 없습니다.

</details>

<details><summary>아이콘 색상은 어떻게 바꾸나요?</summary>

아이콘은 텍스트 색상을 따라갑니다. `strokeColor`와 `fillColor`, CSS `color`, 또는 path에 직접 스타일을 지정해 바꿀 수 있습니다. [크기와 색상](#size--color)을 참고하세요.

</details>

<details><summary>React 없이도 쓸 수 있나요?</summary>

패키지는 React용입니다. 하지만 모든 아이콘은 lottie-web, lottie-ios, lottie-android, Flutter, React Native로 재생할 수 있는 Lottie JSON 파일이기도 하고, 정적 SVG로도 제공됩니다. [React 없이 사용하기](#use-without-react)와 [Lottie 아이콘](/lottie-icons)을 참고하세요.

</details>

<details><summary>AI 코딩 에이전트도 useAnimations를 쓸 수 있나요?</summary>

네. 에이전트에게 [icons.json](/icons.json)과 [/documentation.md](/documentation.md)를 알려 주세요. 패키지 자체에도 `catalog.json`과 모든 아이콘의 문서화된 타입이 들어 있습니다.

</details>
