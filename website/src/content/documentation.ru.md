# Документация {#documentation}

useAnimations — бесплатная библиотека из 300 анимированных иконок для React под лицензией MIT. У каждой иконки есть встроенное взаимодействие: она крутится в цикле, проигрывается по клику или при наведении. Подключайте их через пакет `react-useanimations` или добавляйте с помощью shadcn CLI.

<div id="quick-start-react"></div>

## Быстрый старт {#quick-start}

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

Иконка берёт цвет текста и проигрывает своё взаимодействие: `github` крутится в цикле, пока на неё наведён курсор. У пакета нет зависимостей: иконки рисует в SVG встроенный плеер (8 КБ в gzip), а каждая иконка — отдельный модуль, поэтому в бандл попадают только те иконки, которые вы импортировали.

## Взаимодействия {#interactions}

Каждая иконка поставляется со взаимодействием, для которого её нарисовали. Переопределить его можно пропом `interaction`.

| Взаимодействие | Что делает                                                                     | Примеры иконок                       |
| -------------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| `loop`         | Проигрывается непрерывно.                                                      | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Переключается между двумя состояниями по клику (вперёд, затем назад).          | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Проигрывается с начала при каждом клике.                                       | `download`, `refresh`, `send`        |
| `hover`        | Проигрывается вперёд, когда курсор наводится, и назад, когда уходит.           | `archive`, `settings`, `trash`       |
| `hover-loop`   | Крутится в цикле при наведении и доигрывает текущий цикл, когда курсор уходит. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Проигрывается один раз с начала, когда курсор наводится.                       | `arrowRight`, `bluetooth`, `zap`     |

Если пользователь включил уменьшение движения, иконки не двигаются: зацикленные показывают первый кадр, анимации при наведении и повторы не проигрываются, а переключатели сразу переходят в новое состояние.

<div id="react"></div>

## Пропсы {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Проп          | По умолчанию         | Описание                                                                                                                                      |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                    | Иконка, импортированная из `react-useanimations/lib/<name>`, или `{ animationData, interaction }` для собственной анимации.                   |
| `size`        | `24`                 | Ширина и высота: число — это пиксели, строка — любая CSS-длина, например `'1.5em'`.                                                           |
| `strokeColor` | `'currentColor'`     | Цвет обводки. По умолчанию иконка берёт цвет текста.                                                                                          |
| `fillColor`   | `strokeColor`        | Цвет заливки, например у сердечка после лайка.                                                                                                |
| `interaction` | у каждой иконки свой | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` или `'hover-replay'`.                                                 |
| `active`      | —                    | Для иконок `click-toggle`: `true` показывает конечное состояние. Контролируемый проп: меняйте его в `onClick`, сами клики его не переключают. |
| `autoplay`    | у каждой иконки свой | `true` для иконок `loop`, если не включено уменьшение движения.                                                                               |
| `loop`        | у каждой иконки свой | `true` для иконок `loop` и `hover-loop`.                                                                                                      |
| `speed`       | `1`                  | Скорость воспроизведения.                                                                                                                     |
| `render`      | —                    | Render-проп для своей обёртки, см. [Оберните иконку в настоящую кнопку](#wrap-the-icon-in-a-real-button).                                     |

Все остальные пропсы (`className`, `aria-label`, `onClick`, …) передаются обёртке `<span>`. Ваши обработчики событий выполняются раньше обработчиков анимации; вызовите `event.preventDefault()`, чтобы пропустить анимацию.

## Импорт иконок {#importing-icons}

Импортируйте каждую иконку из `react-useanimations/lib/<name>` или сразу несколько из `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

В продакшен-сборку в обоих случаях попадают только используемые иконки. Дев-серверы и тест-раннеры не делают tree-shaking, поэтому там `react-useanimations/icons` загружает все иконки; если это важно, импортируйте из `lib/<name>`. `delete` и `package` — зарезервированные слова, поэтому импортируйте их как `deleteIcon` и `packageIcon`.

## Контролируемый переключатель {#controlled-toggle}

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
      active={open} // анимируется и тогда, когда `open` меняется в другом месте
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Оберните иконку в настоящую кнопку {#wrap-the-icon-in-a-real-button}

Для кликабельных иконок оберните иконку фокусируемым элементом через проп `render`: `eventProps` передаются вашему элементу, а `animationProps` — элементу `<span>` внутри него. Тогда анимации при наведении проигрываются и когда кнопка получает фокус с клавиатуры.

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

## Размер и цвет {#size--color}

Иконки — линейные, нарисованы на артборде 24 или 32 px и остаются чёткими при любом размере: задайте `size` числом пикселей или любой CSS-длиной.

Обводка использует `currentColor`, поэтому иконки сами подхватывают цвет текста, hover-состояния и тёмную тему. Меняйте цвет через `strokeColor` и `fillColor`, через CSS-свойство `color` или стилизуйте path напрямую: у встроенного правила нулевая специфичность, так что ваш CSS всегда побеждает.

У некоторых иконок есть вырез (косая черта в `visibility`, `microphone`, `video`, `volume` и `notification`, галочка в `download`, кольцо вокруг бейджа `notification3`). Вырез заливается цветом фона страницы: белым на светлых страницах и тёмным на страницах с `color-scheme: dark`. На другом фоне задайте его CSS-переменной `--ua-knockout`, например `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: цвет и толщина обводки
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js и серверный рендеринг {#nextjs-and-server-rendering}

Компонент помечен `'use client'` и рисует анимацию только в браузере, поэтому его можно рендерить из серверных компонентов и SSR-фреймворков (Next.js, Remix, Astro) без `dynamic(…, { ssr: false })`. Модули иконок — обычные данные, так что серверные компоненты могут их импортировать и передавать как пропсы.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Каждая иконка есть и в [реестре shadcn](https://ui.shadcn.com/docs/registry). CLI добавляет готовый компонент и устанавливает `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Компонент называется `Animated` + id иконки в PascalCase (`check-box` → `AnimatedCheckBox`), попадает в `components/animations/<id>.tsx` и принимает те же пропсы, что и `UseAnimations`. Индекс реестра — [/r/registry.json](/r/registry.json). Чтобы пользоваться короткой формой `npx shadcn@latest add @useanimations/checkmark`, добавьте реестр в `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Собственная анимация {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Анимация должна быть файлом Lottie JSON — в этом формате сделаны и сами иконки. Плеер поддерживает то, что нужно иконкам: слои фигур, прекомпозиции, null-слои и родительские связи, пути, прямоугольники, эллипсы, обводки, заливки, trim paths, маски, ключевые кадры с easing, удержание и траектории движения, а также выражения `loopOut()` и `wiggle()`. Всё остальное — градиенты, текстовые слои и слои с изображениями, эффекты и матты — не отрисовывается; о неподдерживаемых слоях, фигурах и выражениях плеер предупреждает в консоли.

<div id="direct-urls"></div><div id="download"></div>

## Файлы и icons.json {#files--iconsjson}

Каждую иконку можно скачать — со страницы иконки или по постоянным URL с включённым CORS:

| Файл                            | URL                                                |
| ------------------------------- | -------------------------------------------------- |
| Анимация (Lottie JSON)          | `https://useanimations.com/icons/<id>.json`        |
| Статичный SVG каждого состояния | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP с JSON и SVG                | `https://useanimations.com/icons/<id>.zip`         |
| Страница иконки                 | `https://useanimations.com/icons/<id>`             |
| Каталог всех иконок             | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) содержит все иконки с id, названием, категорией, ключевыми словами для поиска, взаимодействием, URL файлов, размером и длительностью, строкой импорта из `react-useanimations` и командой shadcn. В npm-пакете есть те же данные: `react-useanimations/catalog.json` (метаданные), `react-useanimations/icons` (анимации) и `react-useanimations/svg.json` (статичные SVG).

<div id="without-react"></div>

## Использование без React {#use-without-react}

Иконки — это стандартный Lottie JSON, поэтому их воспроизводит любой Lottie-плеер — по адресу `https://useanimations.com/icons/<id>.json` или из копии в вашем проекте. Вне React взаимодействие придётся подключать самостоятельно. Другие плееры и примеры — на странице [Lottie-иконки](/lottie-icons).

Некоторые иконки используют выражения After Effects (`loopOut()`, `wiggle()`); в [icons.json](/icons.json) они отмечены полем `requiresFullPlayer`. В браузере для них нужна полная сборка lottie-web, а не `lottie_light`, а нативные плееры выражения не вычисляют.

<div id="html"></div><div id="interactions-web"></div>

### HTML и JavaScript {#html-and-javascript}

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
  // hover: вперёд при наведении, назад, когда курсор уходит
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

С SVG-рендерером иконка может брать цвет текста, как React-компонент:

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

С [lottie-ios](https://github.com/airbnb/lottie-ios), JSON лежит в бандле приложения:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

С [lottie-android](https://github.com/airbnb/lottie-android) в Jetpack Compose, JSON лежит в `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

С пакетом [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Производительность и доступность {#performance--accessibility}

- **Небольшой размер:** плеер весит 8 КБ в gzip и не имеет зависимостей, а иконка — от 1 до 15 КБ (медиана — 2 КБ).
- **Ленивая отрисовка:** анимации рисуются только в браузере, после рендера страницы; автоматически запущенные циклы встают на паузу, пока они за пределами экрана, а при размонтировании всё очищается.
- **По умолчанию декоративные:** иконки скрыты от скринридеров (`aria-hidden`), пока вы не передадите `aria-label` — тогда они озвучиваются как изображение. Для элементов управления из одной иконки используйте настоящий `<button>` с `aria-label` (см. [выше](#wrap-the-icon-in-a-real-button)) и передавайте состояние переключателя через `aria-pressed` или `aria-expanded`.
- **Уменьшение движения и сенсорные экраны:** иконки учитывают `prefers-reduced-motion`, а касания сенсорного экрана не запускают анимации при наведении.

<div id="agents"></div>

## ИИ-агенты для написания кода {#ai-coding-agents}

Агенты могут подбирать иконки по ключевому слову или взаимодействию в [icons.json](/icons.json) или в `react-useanimations/catalog.json` внутри пакета и использовать указанную там строку импорта или команду shadcn. В определениях типов каждого импорта иконки тоже есть её название, ключевые слова, взаимодействие и превью. Эта документация доступна в Markdown по адресу [/documentation.md](/documentation.md), а [/llms.txt](/llms.txt) содержит индекс сайта.

## Переход с v2 {#upgrading-from-v2}

Для большинства приложений переход сводится к установке v3: компонент, импорты `react-useanimations/lib/<name>` и все 79 иконок из v2 остались прежними. Пройдите те шаги ниже, которые касаются вашего кода.

### 1. Установите v3 {#1-install-v3}

v3 требует React 18 или новее и не имеет зависимостей. Удалите и lottie-web, если он больше нигде в приложении не используется.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. Замените `reverse` на `active` {#2-replace-reverse-with-active}

`active` — полностью контролируемый проп: иконка анимируется, когда `active` меняется, а сам по себе клик её не переключает, поэтому обновляйте значение в `onClick`. `reverse` по-прежнему работает как в v2 (задаёт начальное состояние, а клики переключают иконку), но считается устаревшим. Оба пропа действуют только на иконки `click-toggle`: четыре стрелки в кругах теперь повторяются по клику (см. [шаг 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Проверьте цвета {#3-check-the-colors}

В v2 иконки были чёрными, если не задать `strokeColor`. В v3 иконки берут цвет текста (`currentColor`), а `fillColor` по умолчанию равен `strokeColor`. Иконки внутри цветного текста или ссылок меняют цвет вместе с ним; чтобы оставить их чёрными, задайте цвет сами:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Перенесите `wrapperStyle`, `pathCss` и `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** устарел: используйте `style`.
- **`pathCss`** удалён: стилизуйте path через класс.
- **`options`** (настройки lottie-web) удалён вместе с lottie-web. Используйте пропсы `loop`, `autoplay` и `speed`; у остальных настроек lottie-web аналогов нет.

Если всё же передать `pathCss` или `options`, в консоль один раз выводится предупреждение, а сами значения игнорируются.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Проверьте элемент-обёртку {#5-check-the-wrapper-element}

Обёртка теперь — inline-block `<span>` вместо `<div>`, поэтому её можно класть внутрь кнопок и ссылок, и она стоит на строке текста. Обновите CSS, который обращается к обёртке как к `div`, и в пропе `render` передавайте `animationProps` элементу `<span>`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Иконки теперь скрыты от скринридеров (`aria-hidden`), пока вы не передадите `aria-label`; добавьте его иконкам, которые несут смысл сами по себе.

### 6. Проверьте иконки, у которых изменилось взаимодействие {#6-check-the-icons-whose-interaction-changed}

Теперь взаимодействия совпадают с useanimations.com. Если иконка должна вести себя как в v2, передайте её прежнее взаимодействие:

| Иконки                                                                                             | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* В v2 эти иконки проигрывались один раз при наведении и перескакивали в начало, когда курсор уходил; ближе всего к этому `hover-replay`.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Обновите импорты {#7-update-imports}

Импортируйте иконки только как `react-useanimations/lib/<name>` или из `react-useanimations/icons`. Внутренние пути файлов из v2, например `react-useanimations/lib/github/index` или `react-useanimations/lib/github/github.json`, больше не резолвятся; Lottie JSON доступен как `animationData` иконки:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Пути `react-useanimations/utils` удалены. Импортируйте типы из самого пакета:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` теперь имеет вид `{ animationData, interaction }`; поля `animationKey` из v2 больше нет, поэтому в объектах, которые вы собираете сами, используйте `interaction`.

### Что ещё нового {#what-else-is-new}

221 новая иконка (всего 300), импорт сразу нескольких иконок из `react-useanimations/icons`, поддержка уменьшения движения, hover-анимация при фокусе с клавиатуры, никаких зависших hover-анимаций на сенсорных экранах, серверный рендеринг без обходных путей и [реестр shadcn](#shadcnui).

## Лицензия {#license}

Иконки и код распространяются по [лицензии MIT](https://opensource.org/license/mit/): их можно использовать, изменять и распространять в личных и коммерческих проектах. Указывать авторство не обязательно, но мы будем благодарны:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Полные условия: [Лицензия и условия](/licencing-and-terms).

## Частые вопросы {#faq}

<details><summary>Можно ли бесплатно использовать useAnimations в коммерческих проектах?</summary>

Да. Иконки и пакет распространяются по лицензии MIT, указывать авторство не нужно.

</details>

<details><summary>Как изменить цвет иконки?</summary>

Иконки берут цвет текста. Его можно поменять через `strokeColor` и `fillColor`, CSS-свойство `color` или стили для path. См. [Размер и цвет](#size--color).

</details>

<details><summary>Работает ли это без React?</summary>

Сам пакет сделан для React. Но каждая иконка есть и в виде файла Lottie JSON, который воспроизводят lottie-web, lottie-ios, lottie-android, Flutter и React Native, и в виде статичного SVG. См. [Использование без React](#use-without-react) и [Lottie-иконки](/lottie-icons).

</details>

<details><summary>Могут ли ИИ-агенты для написания кода использовать useAnimations?</summary>

Да. Дайте им ссылки на [icons.json](/icons.json) и [/documentation.md](/documentation.md); в самом пакете есть `catalog.json` и задокументированные типы для каждой иконки.

</details>
