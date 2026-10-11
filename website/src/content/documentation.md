# Documentation

useAnimations is a free, MIT-licensed library of 298 animated icons for React. Every icon comes with a built-in interaction: it loops, plays on click or plays on hover. Use them with the `react-useanimations` package or add them with the shadcn CLI.

<div id="quick-start-react"></div>

## Quick start

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

The icon follows the text color and plays its own interaction: `github` loops while you hover it. The package has no dependencies; a built-in player (8 kB gzipped) draws the icons as SVG, and each icon is a separate module, so your bundle only includes the icons you import.

## Interactions

Every icon comes with the interaction it was designed for. Override it with the `interaction` prop.

| Interaction    | What it does                                                       | Example icons                        |
| -------------- | ------------------------------------------------------------------ | ------------------------------------ |
| `loop`         | Plays continuously.                                                | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Switches between two states on click (forward, then backward).     | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Replays from the start on every click.                             | `download`, `refresh`, `send`        |
| `hover`        | Plays forward on mouse enter and backward on mouse leave.          | `archive`, `settings`, `trash`       |
| `hover-loop`   | Loops while hovered and finishes the current cycle on mouse leave. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Plays once from the start on mouse enter.                          | `arrowRight`, `bluetooth`, `zap`     |

When the user prefers reduced motion, icons stay still: loops show their first frame, hover and replay animations don't play, and toggles switch to their new state immediately.

<div id="react"></div>

## Props

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Default          | Description                                                                                                      |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | Icon imported from `react-useanimations/lib/<name>`, or `{ animationData, interaction }` for your own animation. |
| `size`        | `24`             | Width and height; numbers are pixels, strings are any CSS length such as `'1.5em'`.                              |
| `strokeColor` | `'currentColor'` | Color of the strokes. By default the icon follows the text color.                                                |
| `fillColor`   | `strokeColor`    | Color of filled parts, e.g. a liked heart.                                                                       |
| `interaction` | per icon         | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` or `'hover-replay'`.                     |
| `active`      | `false`          | For `click-toggle` icons: `true` shows the end state (e.g. a checked checkbox). Can be controlled.               |
| `autoplay`    | per icon         | `true` for `loop` icons, unless reduced motion is preferred.                                                     |
| `loop`        | per icon         | `true` for `loop` and `hover-loop` icons.                                                                        |
| `speed`       | `1`              | Playback speed.                                                                                                  |
| `render`      | —                | Render prop for a custom wrapper, see [Wrap the icon in a real button](#wrap-the-icon-in-a-real-button).         |

Any other prop (`className`, `aria-label`, `onClick`, …) goes to the wrapper `<span>`. Your event handlers run before the animation's; call `event.preventDefault()` to skip the animation.

## Importing icons

Import each icon from `react-useanimations/lib/<name>`, or several at once from `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Production builds include only the icons you use either way. Dev servers and test runners don't tree-shake, so there `react-useanimations/icons` loads every icon; prefer `lib/<name>` if that matters. `delete` and `package` are reserved words: import them as `deleteIcon` and `packageIcon`.

## Controlled toggle

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

## Wrap the icon in a real button

For clickable icons, put a focusable element around the icon with the `render` prop: `eventProps` go on your element and `animationProps` on a `<span>` inside it. Hover animations then also play when the button gets keyboard focus.

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

## Size & color

Icons are line icons drawn on a 24 or 32 px artboard and stay sharp at any size: set `size` to a number of pixels or any CSS length.

The strokes follow `currentColor`, so icons pick up the text color, hover states and dark mode on their own. Change them with `strokeColor` and `fillColor`, with CSS `color`, or style the paths: the built-in rule has zero specificity, so your CSS always wins.

```jsx
// Tailwind: color and stroke width
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js and server rendering

The component is marked `'use client'` and draws the animation only in the browser, so you can render it from server components and SSR frameworks (Next.js, Remix, Astro) without `dynamic(…, { ssr: false })`. Icon modules are plain data, so server components can import them and pass them as props.

<div id="shadcn"></div>

## shadcn/ui

Every icon is also in a [shadcn registry](https://ui.shadcn.com/docs/registry). The CLI adds a ready-made component and installs `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

The component is named `Animated` + the icon id in PascalCase (`check-box` → `AnimatedCheckBox`), lands in `components/animations/<id>.tsx` and takes the same props as `UseAnimations`. The registry index is [/r/registry.json](/r/registry.json). For the short form `npx shadcn@latest add @useanimations/checkmark`, add the registry to `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Your own animation

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Your animation must be a Lottie JSON file, the format the icons use. The player supports what the icons need: shape layers, precompositions, null layers and parenting, paths, rectangles, ellipses, strokes, fills, trim paths, masks, keyframes with easing, holds and motion paths, and the `loopOut()` and `wiggle()` expressions. Anything else, such as gradients, text or image layers, effects and mattes, is not drawn; the console warns about unsupported layers, shapes and expressions.

<div id="direct-urls"></div><div id="download"></div><div id="html"></div><div id="interactions-web"></div><div id="interactions"></div><div id="vue"></div><div id="without-react"></div><div id="ios"></div><div id="android"></div>

## Files & icons.json

Every icon can also be downloaded, from its page or from stable, CORS-enabled URLs:

| File                       | URL                                                |
| -------------------------- | -------------------------------------------------- |
| Animation (Lottie JSON)    | `https://useanimations.com/icons/<id>.json`        |
| Static SVG of each state   | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP with the JSON and SVGs | `https://useanimations.com/icons/<id>.zip`         |
| Icon page                  | `https://useanimations.com/icons/<id>`             |
| Catalog of every icon      | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) lists every icon with its id, title, category, search keywords, interaction, file URLs, size and duration, its `react-useanimations` import and the shadcn command. The npm package ships the same data: `react-useanimations/catalog.json` (metadata), `react-useanimations/icons` (the animations) and `react-useanimations/svg.json` (the static SVGs).

## Performance & accessibility

- **Small:** the player is 8 kB gzipped with no dependencies, and an icon is 1 to 15 kB (2 kB median).
- **Lazy:** animations are drawn only in the browser, after the page renders; autoplaying loops pause while they are scrolled out of view, and everything is cleaned up on unmount.
- **Decorative by default:** icons are hidden from screen readers (`aria-hidden`) unless you pass `aria-label`, which announces them as an image. For icon-only controls, use a real `<button>` with an `aria-label` (see [above](#wrap-the-icon-in-a-real-button)) and reflect toggle state with `aria-pressed` or `aria-expanded`.
- **Reduced motion and touch:** icons respect `prefers-reduced-motion`, and taps on touch screens don't trigger hover animations.

<div id="agents"></div>

## AI coding agents

Agents can pick icons by keyword or interaction from [icons.json](/icons.json), or `react-useanimations/catalog.json` inside the package, and use the import line or shadcn command it lists. The type definitions of every icon import also carry its title, keywords, interaction and preview. This documentation is available as Markdown at [/documentation.md](/documentation.md), and [/llms.txt](/llms.txt) indexes the site.

## Upgrading from v2

- 298 icons instead of 87.
- No dependencies: a built-in player replaces lottie-web, so you can remove lottie-web if nothing else uses it.
- Icons follow the text color by default and respect `prefers-reduced-motion`.
- `reverse` is now `active` and fully controlled; `reverse` still works but is deprecated.
- The wrapper is an inline-block `<span>` (it was a `<div>`), hidden from screen readers unless you pass `aria-label`.
- `pathCss` was removed: style the paths with CSS. `options` was removed with lottie-web. `wrapperStyle` is deprecated; use `style`.
- Requires React 18 or newer.

<div id="license"></div>

## License

The icons and the code are released under the [MIT license](https://opensource.org/license/mit/): use, modify and redistribute them in personal and commercial work. Attribution is not required but appreciated:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Full terms: [Licencing & Terms](/licencing-and-terms).

## FAQ

<details><summary>Is useAnimations free for commercial projects?</summary>

Yes. The icons and the package are MIT-licensed, with no attribution required.

</details>

<details><summary>How do I change the color of an icon?</summary>

Icons follow the text color. Change it with `strokeColor` and `fillColor`, CSS `color`, or by styling the paths. See [Size & color](#size--color).

</details>

<details><summary>Does it work without React?</summary>

The package is for React. You can still download every icon as an SVG, or as the animation's Lottie JSON for a Lottie player of your choice. See [Files & icons.json](#files--iconsjson).

</details>

<details><summary>Can AI coding agents use useAnimations?</summary>

Yes. Point them at [icons.json](/icons.json) and [/documentation.md](/documentation.md); the package itself ships `catalog.json` and documented types for every icon.

</details>
