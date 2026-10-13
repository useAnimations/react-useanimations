# Tài liệu {#documentation}

useAnimations là thư viện miễn phí gồm 300 icon động cho React, phát hành theo giấy phép MIT. Mỗi icon có sẵn một tương tác: lặp liên tục, phát khi click hoặc phát khi hover. Bạn có thể dùng chúng qua package `react-useanimations` hoặc thêm vào dự án bằng shadcn CLI.

<div id="quick-start-react"></div>

## Bắt đầu nhanh {#quick-start}

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

Icon tự lấy theo màu chữ và chạy tương tác riêng của nó: `github` lặp liên tục khi bạn hover. Package không có dependency nào; một player tích hợp sẵn (8 kB sau khi gzip) vẽ icon dưới dạng SVG, và mỗi icon là một module riêng, nên bundle của bạn chỉ chứa những icon bạn import.

## Tương tác {#interactions}

Mỗi icon đi kèm tương tác mà nó được thiết kế cho. Bạn có thể ghi đè bằng prop `interaction`.

| Tương tác      | Hoạt động                                                         | Icon ví dụ                           |
| -------------- | ----------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Phát liên tục.                                                    | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Chuyển giữa hai trạng thái khi click (phát xuôi, rồi phát ngược). | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Phát lại từ đầu sau mỗi lần click.                                | `download`, `refresh`, `send`        |
| `hover`        | Phát xuôi khi chuột đi vào và phát ngược khi chuột rời đi.        | `archive`, `settings`, `trash`       |
| `hover-loop`   | Lặp khi đang hover và chạy nốt chu kỳ hiện tại khi chuột rời đi.  | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Phát một lần từ đầu khi chuột đi vào.                             | `arrowRight`, `bluetooth`, `zap`     |

Khi người dùng bật giảm chuyển động (reduced motion), icon sẽ đứng yên: icon lặp hiển thị khung hình đầu tiên, hiệu ứng hover và phát lại không chạy, còn icon bật/tắt chuyển ngay sang trạng thái mới.

<div id="react"></div>

## Prop {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Mặc định         | Mô tả                                                                                                                       |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | Icon import từ `react-useanimations/lib/<name>`, hoặc `{ animationData, interaction }` cho animation của riêng bạn.         |
| `size`        | `24`             | Chiều rộng và chiều cao; số được tính bằng pixel, chuỗi là bất kỳ độ dài CSS nào, ví dụ `'1.5em'`.                          |
| `strokeColor` | `'currentColor'` | Màu nét vẽ. Mặc định icon lấy theo màu chữ.                                                                                 |
| `fillColor`   | `strokeColor`    | Màu của các phần được tô, ví dụ trái tim khi đã thích.                                                                      |
| `interaction` | tùy icon         | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` hoặc `'hover-replay'`.                              |
| `active`      | —                | Cho icon `click-toggle`: `true` hiển thị trạng thái cuối. Có kiểm soát: đặt giá trị trong `onClick`, click không tự đổi nó. |
| `autoplay`    | tùy icon         | `true` với icon `loop`, trừ khi người dùng bật giảm chuyển động.                                                            |
| `loop`        | tùy icon         | `true` với icon `loop` và `hover-loop`.                                                                                     |
| `speed`       | `1`              | Tốc độ phát.                                                                                                                |
| `render`      | —                | Render prop cho phần tử bọc tùy chỉnh, xem [Bọc icon trong một button thật](#wrap-the-icon-in-a-real-button).               |

Mọi prop khác (`className`, `aria-label`, `onClick`, …) được truyền xuống thẻ `<span>` bọc ngoài. Event handler của bạn chạy trước handler của animation; gọi `event.preventDefault()` để bỏ qua hiệu ứng.

## Import icon {#importing-icons}

Import từng icon từ `react-useanimations/lib/<name>`, hoặc nhiều icon cùng lúc từ `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Dù dùng cách nào, bản build production cũng chỉ chứa những icon bạn dùng. Dev server và test runner không tree-shake, nên ở đó `react-useanimations/icons` sẽ tải toàn bộ icon; nếu điều này quan trọng, hãy ưu tiên `lib/<name>`. `delete` và `package` là từ khóa dành riêng: import chúng dưới tên `deleteIcon` và `packageIcon`.

## Toggle có kiểm soát {#controlled-toggle}

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
      active={open} // cũng chuyển động khi `open` thay đổi ở nơi khác
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Bọc icon trong một button thật {#wrap-the-icon-in-a-real-button}

Với icon có thể click, hãy đặt một phần tử nhận được focus bao quanh icon bằng prop `render`: `eventProps` gắn vào phần tử của bạn, còn `animationProps` gắn vào một thẻ `<span>` bên trong. Khi đó hiệu ứng hover cũng phát khi button nhận focus bằng bàn phím.

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

## Kích thước & màu sắc {#size--color}

Icon là dạng line icon vẽ trên artboard 24 hoặc 32 px và luôn sắc nét ở mọi kích thước: đặt `size` bằng một số pixel hoặc bất kỳ độ dài CSS nào.

Nét vẽ dùng `currentColor`, nên icon tự lấy màu chữ, trạng thái hover và dark mode mà không cần cấu hình. Bạn có thể đổi màu bằng `strokeColor` và `fillColor`, bằng thuộc tính CSS `color`, hoặc style trực tiếp các path: rule tích hợp sẵn có specificity bằng 0, nên CSS của bạn luôn thắng.

Một số icon có phần khoét rỗng (đường gạch chéo trong `visibility`, `microphone`, `video`, `volume` và `notification`, dấu tích trong `download`, vòng quanh badge của `notification3`). Phần khoét này lấy màu nền trang: trắng trên trang sáng và tối trên trang có `color-scheme: dark`. Trên các nền khác, hãy đặt màu bằng biến CSS `--ua-knockout`, ví dụ `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: màu và độ dày nét
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js và server rendering {#nextjs-and-server-rendering}

Component được đánh dấu `'use client'` và chỉ vẽ animation trên trình duyệt, nên bạn có thể render nó từ server component và các framework SSR (Next.js, Remix, Astro) mà không cần `dynamic(…, { ssr: false })`. Module icon là dữ liệu thuần, nên server component có thể import và truyền chúng xuống dưới dạng prop.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Mọi icon cũng có trong một [shadcn registry](https://ui.shadcn.com/docs/registry). CLI sẽ thêm sẵn một component và cài `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Component được đặt tên theo dạng `Animated` + id của icon ở dạng PascalCase (`check-box` → `AnimatedCheckBox`), nằm trong `components/animations/<id>.tsx` và nhận đúng các prop như `UseAnimations`. Chỉ mục registry là [/r/registry.json](/r/registry.json). Để dùng dạng rút gọn `npx shadcn@latest add @useanimations/checkmark`, hãy thêm registry vào `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Animation của riêng bạn {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Animation của bạn phải là tệp Lottie JSON, cùng định dạng với các icon. Player hỗ trợ những gì icon cần: shape layer, precomposition, null layer và parenting, path, hình chữ nhật, hình elip, stroke, fill, trim path, mask, keyframe có easing, hold và motion path, cùng các expression `loopOut()` và `wiggle()`. Những thứ khác, như gradient, text layer hoặc image layer, effect và matte, sẽ không được vẽ; console sẽ cảnh báo về các layer, shape và expression không được hỗ trợ.

<div id="direct-urls"></div><div id="download"></div>

## Tệp & icons.json {#files--iconsjson}

Mọi icon đều tải về được, từ trang của icon hoặc từ các URL cố định có bật CORS:

| Tệp                          | URL                                                |
| ---------------------------- | -------------------------------------------------- |
| Animation (Lottie JSON)      | `https://useanimations.com/icons/<id>.json`        |
| SVG tĩnh của từng trạng thái | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP gồm JSON và các SVG      | `https://useanimations.com/icons/<id>.zip`         |
| Trang icon                   | `https://useanimations.com/icons/<id>`             |
| Catalog của mọi icon         | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) liệt kê mọi icon kèm id, tiêu đề, danh mục, từ khóa tìm kiếm, tương tác, URL tệp, kích thước và thời lượng, dòng import `react-useanimations` và lệnh shadcn. Package npm cũng có cùng dữ liệu này: `react-useanimations/catalog.json` (metadata), `react-useanimations/icons` (các animation) và `react-useanimations/svg.json` (các SVG tĩnh).

<div id="without-react"></div>

## Dùng không cần React {#use-without-react}

Các icon là Lottie JSON chuẩn, nên mọi Lottie player đều phát được chúng từ `https://useanimations.com/icons/<id>.json` hoặc từ một bản sao trong dự án của bạn. Ngoài React, bạn phải tự viết phần tương tác. Trang [Icon Lottie](/lottie-icons) có thêm player và ví dụ.

Một số icon dùng expression của After Effects (`loopOut()`, `wiggle()`); `requiresFullPlayer` trong [icons.json](/icons.json) đánh dấu những icon này. Trên web, chúng cần bản đầy đủ của lottie-web chứ không phải `lottie_light`, và các player native không xử lý expression.

<div id="html"></div><div id="interactions-web"></div>

### HTML và JavaScript {#html-and-javascript}

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
  // hover: phát xuôi khi chuột vào, phát ngược khi chuột rời đi
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

Với renderer SVG, icon có thể theo màu chữ giống như React component:

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

Dùng [lottie-ios](https://github.com/airbnb/lottie-ios), với tệp JSON nằm trong app bundle:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Dùng [lottie-android](https://github.com/airbnb/lottie-android) trong Jetpack Compose, với tệp JSON nằm trong `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

Dùng package [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Hiệu năng & khả năng truy cập {#performance--accessibility}

- **Nhỏ gọn:** player chỉ 8 kB sau khi gzip, không có dependency, và mỗi icon nặng từ 1 đến 15 kB (trung vị 2 kB).
- **Tải lười:** animation chỉ được vẽ trên trình duyệt, sau khi trang đã render; các icon lặp tự phát sẽ tạm dừng khi bị cuộn ra khỏi màn hình, và mọi thứ được dọn dẹp khi unmount.
- **Mặc định chỉ để trang trí:** icon bị ẩn khỏi trình đọc màn hình (`aria-hidden`) trừ khi bạn truyền `aria-label`, khi đó icon được đọc như một hình ảnh. Với các nút chỉ có icon, hãy dùng một `<button>` thật kèm `aria-label` (xem [phần trên](#wrap-the-icon-in-a-real-button)) và thể hiện trạng thái bật/tắt bằng `aria-pressed` hoặc `aria-expanded`.
- **Giảm chuyển động và màn hình cảm ứng:** icon tôn trọng `prefers-reduced-motion`, và chạm trên màn hình cảm ứng không kích hoạt hiệu ứng hover.

<div id="agents"></div>

## AI coding agent {#ai-coding-agents}

Agent có thể chọn icon theo từ khóa hoặc tương tác từ [icons.json](/icons.json), hoặc từ `react-useanimations/catalog.json` trong package, rồi dùng dòng import hoặc lệnh shadcn được liệt kê ở đó. Định nghĩa kiểu của mỗi import icon cũng chứa tiêu đề, từ khóa, tương tác và bản xem trước của icon. Tài liệu này có bản Markdown tại [/documentation.md](/documentation.md), và [/llms.txt](/llms.txt) là chỉ mục của toàn bộ trang web.

## Nâng cấp từ v2 {#upgrading-from-v2}

Với phần lớn ứng dụng, nâng cấp chỉ đơn giản là cài v3: component, các import `react-useanimations/lib/<name>` và toàn bộ 79 icon của v2 vẫn giữ nguyên. Hãy làm theo những bước dưới đây áp dụng cho code của bạn.

### 1. Cài v3 {#1-install-v3}

v3 cần React 18 trở lên và không có dependency. Hãy gỡ cả lottie-web, trừ khi ứng dụng của bạn còn dùng nó ở chỗ khác.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. Thay `reverse` bằng `active` {#2-replace-reverse-with-active}

`active` là hoàn toàn có kiểm soát (controlled): icon chuyển động khi `active` thay đổi, còn chỉ click thôi thì không làm icon đổi trạng thái, vì vậy hãy cập nhật nó trong `onClick`. `reverse` vẫn hoạt động như ở v2 (đặt trạng thái ban đầu và click sẽ bật/tắt icon) nhưng đã bị deprecated. Cả hai chỉ áp dụng cho icon `click-toggle`: bốn icon mũi tên trong vòng tròn giờ phát lại khi click (xem [bước 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Kiểm tra màu sắc {#3-check-the-colors}

Icon v2 có màu đen trừ khi bạn đặt `strokeColor`. Icon v3 lấy theo màu chữ (`currentColor`), và `fillColor` mặc định bằng `strokeColor`. Icon nằm trong chữ hoặc liên kết có màu sẽ đổi màu theo; để giữ màu đen, hãy tự đặt màu:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Thay thế `wrapperStyle`, `pathCss` và `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** đã bị deprecated: hãy dùng `style`.
- **`pathCss`** đã bị gỡ bỏ: hãy style các path bằng một class.
- **`options`** (thiết lập của lottie-web) đã bị gỡ bỏ cùng với lottie-web. Hãy dùng các prop `loop`, `autoplay` và `speed`; các tùy chọn khác của lottie-web không có phương án thay thế.

Nếu vẫn truyền `pathCss` hoặc `options`, một cảnh báo sẽ được ghi ra một lần; chúng đều bị bỏ qua.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Kiểm tra phần tử bọc ngoài {#5-check-the-wrapper-element}

Phần tử bọc ngoài giờ là một `<span>` inline-block thay vì `<div>`, nên hợp lệ khi nằm trong button và link, và nằm cùng dòng với chữ. Hãy cập nhật CSS đang nhắm tới phần tử bọc như một `div`, và trong prop `render`, hãy spread `animationProps` lên một `<span>`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Icon giờ bị ẩn khỏi trình đọc màn hình (`aria-hidden`) trừ khi bạn truyền `aria-label`; hãy thêm nhãn cho những icon tự mang ý nghĩa.

### 6. Kiểm tra các icon đã đổi tương tác {#6-check-the-icons-whose-interaction-changed}

Tương tác giờ khớp với useanimations.com. Nếu muốn một icon hoạt động như ở v2, hãy truyền tương tác cũ của nó:

| Icon                                                                                               | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* Ở v2, các icon này phát một lần khi chuột đi vào và nhảy về khung hình đầu khi chuột rời đi; `hover-replay` là tương tác gần nhất.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Cập nhật import {#7-update-imports}

Chỉ import icon theo dạng `react-useanimations/lib/<name>` hoặc từ `react-useanimations/icons`. Các đường dẫn tệp nội bộ của v2 như `react-useanimations/lib/github/index` hay `react-useanimations/lib/github/github.json` không còn resolve được nữa; Lottie JSON giờ là `animationData` của icon:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Các đường dẫn `react-useanimations/utils` đã bị gỡ bỏ. Hãy import các kiểu từ chính package:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` giờ có dạng `{ animationData, interaction }`; trường `animationKey` của v2 không còn nữa, nên các object bạn tự tạo cần dùng `interaction` thay thế.

### Có gì mới nữa {#what-else-is-new}

Thêm 221 icon (tổng cộng 300), import nhiều icon cùng lúc từ `react-useanimations/icons`, hỗ trợ giảm chuyển động, hover khi focus bằng bàn phím, không còn hiệu ứng hover bị kẹt trên màn hình cảm ứng, server rendering không cần mẹo xử lý, và một [shadcn registry](#shadcnui).

## Giấy phép {#license}

Bộ icon và mã nguồn được phát hành theo [giấy phép MIT](https://opensource.org/license/mit/): bạn được dùng, chỉnh sửa và phân phối lại trong dự án cá nhân lẫn thương mại. Không bắt buộc ghi nguồn, nhưng chúng tôi rất trân trọng nếu bạn làm vậy:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Điều khoản đầy đủ: [Giấy phép & Điều khoản](/licencing-and-terms).

## Câu hỏi thường gặp {#faq}

<details><summary>useAnimations có miễn phí cho dự án thương mại không?</summary>

Có. Bộ icon và package đều dùng giấy phép MIT, không bắt buộc ghi nguồn.

</details>

<details><summary>Đổi màu icon bằng cách nào?</summary>

Icon tự lấy theo màu chữ. Bạn có thể đổi màu bằng `strokeColor` và `fillColor`, bằng CSS `color`, hoặc style trực tiếp các path. Xem [Kích thước & màu sắc](#size--color).

</details>

<details><summary>Có dùng được khi không có React không?</summary>

Package này dành cho React. Tuy vậy, mỗi icon còn là một tệp Lottie JSON mà lottie-web, lottie-ios, lottie-android, Flutter và React Native đều phát được, kèm một SVG tĩnh. Xem [Dùng không cần React](#use-without-react) và [Icon Lottie](/lottie-icons).

</details>

<details><summary>AI coding agent có dùng được useAnimations không?</summary>

Được. Hãy trỏ agent tới [icons.json](/icons.json) và [/documentation.md](/documentation.md); bản thân package cũng có sẵn `catalog.json` và kiểu dữ liệu có tài liệu cho mọi icon.

</details>
