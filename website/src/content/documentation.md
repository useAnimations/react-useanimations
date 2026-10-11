# Documentation

useAnimations is a free, MIT-licensed library of 298 animated icons. Every icon is a small Lottie animation with a built-in interaction: it loops, plays on click or plays on hover. Use them in React with `react-useanimations`, add them with the shadcn CLI, or take the Lottie and SVG files to any other platform.

<div id="quick-start-react"></div>

## Quick start

Install the React package. It has no dependencies: a built-in player (8 kB gzipped) draws the icons as SVG.

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

The icon follows the text color and plays its own interaction: `github` loops while you hover it. Each icon is a separate module, so your bundle only includes the icons you import. Not using React? See [Without React](#without-react), [iOS](#ios) and [Android](#android).

## Interactions

Every icon comes with the interaction it was designed for. Override it with the `interaction` prop.

| Interaction    | What it does                                                       | Example icons                        |
| -------------- | ------------------------------------------------------------------ | ------------------------------------ |
| `loop`         | Plays continuously.                                                | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Switches between two states on click (forward, then backward).     | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Replays from the start on every click.                             | `download`, `refresh`, `check`       |
| `hover`        | Plays forward on mouse enter and backward on mouse leave.          | `archive`, `settings`, `trash`       |
| `hover-loop`   | Loops while hovered and finishes the current cycle on mouse leave. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Plays once from the start on mouse enter.                          | `arrowRight`, `bluetooth`, `send`    |

Hover animations also play on keyboard focus and ignore taps on touch screens. Looping icons pause while they are scrolled out of view. When the user prefers reduced motion, icons stay still: loops show their first frame, hover and replay animations don't play, and toggles switch to their new state immediately.

<div id="react"></div>

## React

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

### Props

| Prop          | Default          | Description                                                                                                        |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `animation`   | —                | Icon imported from `react-useanimations/lib/<name>`, or `{ animationData, interaction }` for your own Lottie JSON. |
| `size`        | `24`             | Width and height; numbers are pixels, strings are any CSS length such as `'1.5em'`.                                |
| `strokeColor` | `'currentColor'` | Color of the strokes. By default the icon follows the text color.                                                  |
| `fillColor`   | `strokeColor`    | Color of filled parts, e.g. a liked heart.                                                                         |
| `interaction` | per icon         | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` or `'hover-replay'`.                       |
| `active`      | `false`          | For `click-toggle` icons: `true` shows the end state (e.g. a checked checkbox). Can be controlled.                 |
| `autoplay`    | per icon         | `true` for looping icons, unless reduced motion is preferred.                                                      |
| `loop`        | per icon         | `true` for `loop` and `hover-loop` icons.                                                                          |
| `speed`       | `1`              | Playback speed.                                                                                                    |
| `render`      | —                | Render prop for a custom wrapper, see below.                                                                       |

Any other prop (`className`, `aria-label`, `onClick`, …) goes to the wrapper `<span>`. Your event handlers run before the animation's; call `event.preventDefault()` to skip the animation. The component is also exported as `UseAnimations` and `UseAnimation`.

### Importing icons

Import each icon from `react-useanimations/lib/<name>`, or several at once from `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Production builds include only the icons you use either way. In dev servers and test runners that don't tree-shake, `react-useanimations/icons` loads every icon, so prefer `lib/<name>` there. `delete` and `package` are reserved words: import them as `deleteIcon` and `packageIcon`.

### Controlled toggle

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
      active={open} // also animates when `open` changes elsewhere
      onClick={() => setOpen(!open)}
    />
  );
}
```

### Wrap the icon in a real button

Icons are decorative (`aria-hidden`) unless you pass `aria-label`. For clickable icons, put a focusable element around the icon with the `render` prop: `eventProps` go on your button and `animationProps` on a `<span>` inside it.

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

### Your own Lottie animation

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

The player supports what icon animations use: shape layers, precompositions, null layers and parenting, paths, rectangles, ellipses, strokes, fills, trim paths, masks, keyframes with easing, holds and motion paths, and the `loopOut()` and `wiggle()` expressions. Gradients, text and image layers, effects, mattes and other expressions are not rendered; the console warns about them once per animation.

### Next.js and server rendering

The component is marked `'use client'` and draws the animation only in the browser, so you can render it from server components and SSR frameworks (Next.js, Remix, Astro) without `dynamic(…, { ssr: false })`. Icon modules are plain data, so server components can import them and pass them as props.

<div id="shadcn"></div>

## shadcn/ui

Every icon is also in a [shadcn registry](https://ui.shadcn.com/docs/registry). The CLI adds a ready-made component and the `react-useanimations` package:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

The component is named `Animated` + the icon id in PascalCase (`check-box` → `AnimatedCheckBox`) and lands in `components/animations/<id>.tsx`. It takes the same props as `UseAnimations`. The registry index is [/r/registry.json](/r/registry.json). For the short form `npx shadcn@latest add @useanimations/checkmark`, add the registry to `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

<div id="customize"></div>

## Size & color

Icons are drawn on a 24 or 32 px artboard as line icons and stay sharp at any size: set `size` to a number of pixels or any CSS length such as `'1.5em'`.

The strokes follow `currentColor`, so icons pick up the text color, hover states and dark mode on their own. Change them with `strokeColor` and `fillColor`, with CSS `color`, or style the paths: the built-in rule has zero specificity, so your CSS always wins.

```jsx
// Tailwind
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

```css
/* Plain CSS: <UseAnimations animation={heart} className="icon" /> */
.icon path {
  stroke-width: 2.5;
}
.icon.is-active path {
  fill: #e11d48; /* filled states, e.g. heart or star */
}
```

<div id="direct-urls"></div><div id="download"></div>

## Direct URLs & icons.json

Every icon has stable, CORS-enabled URLs, handy for prototypes, scripts and AI coding agents:

| File                                  | URL                                                |
| ------------------------------------- | -------------------------------------------------- |
| Lottie JSON                           | `https://useanimations.com/icons/<id>.json`        |
| Static SVG(s)                         | `https://useanimations.com/icons/<id>/<state>.svg` |
| Download package (Lottie JSON + SVGs) | `https://useanimations.com/icons/<id>.zip`         |
| Icon page                             | `https://useanimations.com/icons/<id>`             |
| Catalog                               | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) lists every icon with its id, title, category, search keywords, interaction, file URLs, size and duration, its `react-useanimations` import and the shadcn command.

```js
const catalog = await fetch('https://useanimations.com/icons.json').then((r) => r.json());
const icon = catalog.icons.find((i) => i.keywords.includes('hamburger'));

icon.react.import; // "import menu from 'react-useanimations/lib/menu';"
icon.interaction; // "click-toggle"
```

The npm package contains the whole set too, so you don't need to load anything from useanimations.com: `react-useanimations/catalog.json` (metadata), `react-useanimations/icons` (the animations) and `react-useanimations/svg.json` (the static SVGs).

<div id="html"></div><div id="interactions-web"></div><div id="interactions"></div><div id="vue"></div>

## Without React

The icons are standard [Lottie](https://airbnb.design/lottie/) files, so any Lottie player plays them: on the web, in React Native, iOS and Android. `react-useanimations` doesn't use one; it has its own built-in player.

- Take the files from the [direct URLs](#direct-urls--iconsjson), the ZIP downloads or the npm package.
- Each icon's `interaction` in [icons.json](/icons.json) tells you how it is meant to play: `loop`, on click (`click-toggle` plays forward and then backward, `click-replay` from the start every time) or on hover (`hover` plays forward on enter and backward on leave, `hover-loop` loops while hovered, `hover-replay` plays once).
- Respect reduced motion: when `prefers-reduced-motion` is set, show the first frame instead of playing.
- Static SVGs of every state are there for places that can't animate.

## iOS

Add [lottie-ios](https://github.com/airbnb/lottie-ios) with Swift Package Manager (`https://github.com/airbnb/lottie-spm.git`) and drag the downloaded `checkmark.json` into your Xcode project.

```swift
import Lottie
import SwiftUI

struct SavedBadge: View {
  var body: some View {
    LottieView(animation: .named("checkmark"))
      .playing()
      .frame(width: 32, height: 32)
  }
}
```

To recolor, use a `ColorValueProvider` with the keypath `**.Color`.

## Android

Add [lottie-android](https://github.com/airbnb/lottie-android) and copy the JSON into `res/raw/` (resource names must be lowercase, e.g. `checkmark.json`).

```kotlin
dependencies {
    implementation("com.airbnb.android:lottie-compose:6.7.1")
}

@Composable
fun SavedBadge() {
    val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.checkmark))
    LottieAnimation(composition = composition, iterations = 1, modifier = Modifier.size(32.dp))
}
```

To recolor, use `addValueCallback(KeyPath("**"), LottieProperty.STROKE_COLOR)`.

## Performance

- **Small:** the built-in player is 8 kB gzipped with no dependencies, and each icon is a separate module of 1 to 20 kB (2.5 kB median), so your bundle only includes the icons you import.
- **Lazy:** the animation is drawn only in the browser, after the page renders, and looping icons pause while they are scrolled out of view.
- **Clean:** animations are destroyed when the component unmounts.
- **Keep loops for loaders.** One-shot animations make better UI feedback.

## Accessibility

- **Decorative by default:** icons are hidden from screen readers (`aria-hidden`) unless you pass `aria-label`, which announces them as an image.
- **Icon-only controls:** wrap the icon in a real `<button>` with the [`render` prop](#wrap-the-icon-in-a-real-button), give it an `aria-label`, and reflect toggle state with `aria-pressed` or `aria-expanded`. Hover animations then also play on keyboard focus.
- **Reduced motion:** with `prefers-reduced-motion`, icons stay still: loops show their first frame, hover and replay animations don't play, and toggles switch immediately.
- **Touch:** taps don't trigger hover animations, so nothing stays stuck mid-animation.

<div id="agents"></div>

## AI coding agents

Agents can pick icons by keyword or interaction from [icons.json](/icons.json) (or `react-useanimations/catalog.json` inside the package) and use the import line or shadcn command it lists. Editors and agents also see each icon's title, keywords, interaction and preview in the type definitions of its import. This documentation is available as Markdown at [/documentation.md](/documentation.md), and [/llms.txt](/llms.txt) indexes the site.

## Upgrading from v2

- 298 icons instead of 87, matching the full set on useanimations.com.
- No dependencies: a built-in player replaces lottie-web, so you can remove it if nothing else uses it.
- Icons follow the text color by default and respect `prefers-reduced-motion`.
- `reverse` is now `active` and fully controlled; `reverse` still works but is deprecated.
- The wrapper is an inline-block `<span>` (it was a `<div>`), hidden from screen readers unless you pass `aria-label`.
- `pathCss` and `options` were removed: style the paths with CSS instead. `wrapperStyle` is deprecated; use `style`.
- Requires React 18 or newer.

<div id="license"></div>

## License

The icons and the code are released under the [MIT license](https://opensource.org/license/mit/). Use, modify and redistribute them in personal and commercial work, including inside icon packs, templates, UI kits and component registries. Attribution is not required but appreciated:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Full terms: [Licencing & Terms](/licencing-and-terms).

## FAQ

<details><summary>Is useAnimations free for commercial projects?</summary>

Yes. The icons and the React package are MIT-licensed: use, modify and redistribute them in personal and commercial websites and apps, with no attribution required.

</details>

<details><summary>What's in a download?</summary>

A ZIP with the Lottie JSON (`<id>.json`) and the static SVG of each of the icon's states. The JSON plays in any Lottie player, on the web, iOS, Android and React Native.

</details>

<details><summary>How do I change the color of an icon?</summary>

Icons follow the text color; change it with `strokeColor` and `fillColor`, CSS `color`, or by styling the paths. On iOS and Android, use Lottie dynamic properties. See [Size & color](#size--color).

</details>

<details><summary>How large are the files?</summary>

Icon animations are 1 to 20 kB (2.5 kB median), and the built-in player adds 8 kB gzipped. There are no other dependencies.

</details>

<details><summary>Do I need After Effects?</summary>

No. The JSON files play in any Lottie player. You only need After Effects with the Bodymovin plugin, or another Lottie editor, to change the motion itself.

</details>

<details><summary>Can AI coding agents use useAnimations?</summary>

Yes. Point them at [icons.json](/icons.json) and [/documentation.md](/documentation.md); the package itself ships `catalog.json` and documented types for every icon.

</details>
