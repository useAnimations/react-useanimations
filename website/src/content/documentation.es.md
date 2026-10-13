# Documentación {#documentation}

useAnimations es una biblioteca gratuita, con licencia MIT, de 300 iconos animados para React. Cada icono trae una interacción integrada: se repite en bucle, se reproduce al hacer clic o se reproduce con hover. Úsalos con el paquete `react-useanimations` o añádelos con la CLI de shadcn.

<div id="quick-start-react"></div>

## Inicio rápido {#quick-start}

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

El icono sigue el color del texto y reproduce su propia interacción: `github` se repite en bucle mientras tienes el cursor encima. El paquete no tiene dependencias; un reproductor integrado (8 kB con gzip) dibuja los iconos como SVG, y cada icono es un módulo independiente, así que tu bundle solo incluye los iconos que importas.

## Interacciones {#interactions}

Cada icono viene con la interacción para la que fue diseñado. Puedes cambiarla con la prop `interaction`.

| Interacción    | Qué hace                                                                     | Iconos de ejemplo                    |
| -------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Se reproduce sin parar.                                                      | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Alterna entre dos estados al hacer clic (hacia delante y luego hacia atrás). | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Se repite desde el principio con cada clic.                                  | `download`, `refresh`, `send`        |
| `hover`        | Avanza cuando entra el cursor y retrocede cuando sale.                       | `archive`, `settings`, `trash`       |
| `hover-loop`   | Se repite en bucle durante el hover y termina el ciclo en curso al salir.    | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Se reproduce una vez desde el principio cuando entra el cursor.              | `arrowRight`, `bluetooth`, `zap`     |

Cuando el usuario prefiere movimiento reducido, los iconos se quedan quietos: los bucles muestran su primer fotograma, las animaciones de hover y de repetición no se reproducen y los toggles cambian a su nuevo estado de inmediato.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Valor por defecto | Descripción                                                                                                                 |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                 | Icono importado de `react-useanimations/lib/<name>`, o `{ animationData, interaction }` para tu propia animación.           |
| `size`        | `24`              | Ancho y alto; los números son píxeles y las cadenas, cualquier longitud CSS, como `'1.5em'`.                                |
| `strokeColor` | `'currentColor'`  | Color de los trazos. Por defecto, el icono sigue el color del texto.                                                        |
| `fillColor`   | `strokeColor`     | Color de las partes rellenas, por ejemplo, un corazón con me gusta.                                                         |
| `interaction` | según el icono    | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` o `'hover-replay'`.                                 |
| `active`      | —                 | Para iconos `click-toggle`: `true` muestra el estado final. Controlado: actualízalo en `onClick`; los clics no lo alternan. |
| `autoplay`    | según el icono    | `true` para los iconos `loop`, salvo que se prefiera movimiento reducido.                                                   |
| `loop`        | según el icono    | `true` para los iconos `loop` y `hover-loop`.                                                                               |
| `speed`       | `1`               | Velocidad de reproducción.                                                                                                  |
| `render`      | —                 | Render prop para un wrapper personalizado; consulta [Envolver el icono en un botón real](#wrap-the-icon-in-a-real-button).  |

Cualquier otra prop (`className`, `aria-label`, `onClick`, …) va al `<span>` que envuelve el icono. Tus manejadores de eventos se ejecutan antes que los de la animación; llama a `event.preventDefault()` para omitir la animación.

## Importar iconos {#importing-icons}

Importa cada icono desde `react-useanimations/lib/<name>`, o varios a la vez desde `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

En ambos casos, los builds de producción incluyen solo los iconos que usas. Los servidores de desarrollo y los test runners no hacen tree shaking, así que ahí `react-useanimations/icons` carga todos los iconos; si eso te importa, usa `lib/<name>`. `delete` y `package` son palabras reservadas: impórtalos como `deleteIcon` y `packageIcon`.

## Toggle controlado {#controlled-toggle}

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
      active={open} // también se anima cuando `open` cambia en otro lugar
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Envolver el icono en un botón real {#wrap-the-icon-in-a-real-button}

Para los iconos en los que se hace clic, rodea el icono con un elemento que pueda recibir el foco usando la prop `render`: `eventProps` va en tu elemento y `animationProps`, en un `<span>` dentro de él. Así, las animaciones de hover también se reproducen cuando el botón recibe el foco del teclado.

```jsx
import heart from 'react-useanimations/lib/heart';

<UseAnimations
  animation={heart}
  size={32}
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Añadir a favoritos" {...eventProps}>
      <span {...animationProps} />
    </button>
  )}
/>;
```

<div id="customize"></div>

## Tamaño y color {#size--color}

Los iconos son iconos de línea dibujados en una mesa de trabajo de 24 o 32 px y se mantienen nítidos a cualquier tamaño: asigna a `size` un número de píxeles o cualquier longitud CSS.

Los trazos siguen `currentColor`, así que los iconos adoptan por sí solos el color del texto, los estados de hover y el modo oscuro. Cámbialos con `strokeColor` y `fillColor`, con la propiedad `color` de CSS o aplicando estilos a los trazados: la regla integrada tiene especificidad cero, así que tu CSS siempre gana.

Algunos iconos recortan un hueco en su propio dibujo (la barra de `visibility`, `microphone`, `video`, `volume` y `notification`, la marca de `download`, el anillo alrededor del indicador de `notification3`). El hueco toma el fondo de la página: blanco en páginas claras y oscuro en páginas con `color-scheme: dark`. Sobre otros fondos, defínelo con la variable CSS `--ua-knockout`, por ejemplo, `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: color y grosor del trazo
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js y renderizado en servidor {#nextjs-and-server-rendering}

El componente está marcado con `'use client'` y dibuja la animación solo en el navegador, así que puedes renderizarlo desde server components y frameworks con SSR (Next.js, Remix, Astro) sin `dynamic(…, { ssr: false })`. Los módulos de los iconos son datos simples, así que los server components pueden importarlos y pasarlos como props.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Cada icono está también en un [registro de shadcn](https://ui.shadcn.com/docs/registry). La CLI añade un componente listo para usar e instala `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

El componente se llama `Animated` + el id del icono en PascalCase (`check-box` → `AnimatedCheckBox`), se guarda en `components/animations/<id>.tsx` y acepta las mismas props que `UseAnimations`. El índice del registro es [/r/registry.json](/r/registry.json). Para usar la forma corta `npx shadcn@latest add @useanimations/checkmark`, añade el registro a `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Tu propia animación {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Tu animación debe ser un archivo Lottie JSON, el mismo formato que usan los iconos. El reproductor admite lo que necesitan los iconos: capas de forma, precomposiciones, capas nulas y emparentamiento, trazados, rectángulos, elipses, trazos, rellenos, recorte de trazados, máscaras, fotogramas clave con easing, holds y trayectorias de movimiento, y las expresiones `loopOut()` y `wiggle()`. Todo lo demás, como degradados, capas de texto o de imagen, efectos y mates, no se dibuja; la consola avisa de las capas, formas y expresiones no compatibles.

<div id="direct-urls"></div><div id="download"></div>

## Archivos e icons.json {#files--iconsjson}

Cada icono también se puede descargar, desde su página o desde URL estables con CORS habilitado:

| Archivo                      | URL                                                |
| ---------------------------- | -------------------------------------------------- |
| Animación (Lottie JSON)      | `https://useanimations.com/icons/<id>.json`        |
| SVG estático de cada estado  | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP con el JSON y los SVG    | `https://useanimations.com/icons/<id>.zip`         |
| Página del icono (en inglés) | `https://useanimations.com/icons/<id>`             |
| Catálogo de todos los iconos | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) recoge cada icono con su id, título, categoría, palabras clave de búsqueda, interacción, URL de los archivos, tamaño y duración, su import de `react-useanimations` y el comando de shadcn. El paquete de npm incluye los mismos datos: `react-useanimations/catalog.json` (metadatos), `react-useanimations/icons` (las animaciones) y `react-useanimations/svg.json` (los SVG estáticos).

<div id="without-react"></div>

## Uso sin React {#use-without-react}

Los iconos son Lottie JSON estándar, así que cualquier reproductor de Lottie puede reproducirlos desde `https://useanimations.com/icons/<id>.json` o desde una copia en tu proyecto. Fuera de React, la interacción la conectas tú. En [Iconos Lottie](/lottie-icons) encontrarás más reproductores y ejemplos.

Algunos iconos usan expresiones de After Effects (`loopOut()`, `wiggle()`); `requiresFullPlayer` los marca en [icons.json](/icons.json). En la web necesitan la versión completa de lottie-web, no `lottie_light`, y los reproductores nativos no evalúan expresiones.

<div id="html"></div><div id="interactions-web"></div>

### HTML y JavaScript {#html-and-javascript}

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
  // hover: hacia delante al entrar, hacia atrás al salir
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

Con el renderizador SVG, el icono puede seguir el color del texto igual que el componente de React:

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

Con [lottie-ios](https://github.com/airbnb/lottie-ios) y el JSON en el bundle de tu app:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Con [lottie-android](https://github.com/airbnb/lottie-android) en Jetpack Compose y el JSON en `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

Con el paquete [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Rendimiento y accesibilidad {#performance--accessibility}

- **Ligero:** el reproductor ocupa 8 kB con gzip y no tiene dependencias, y un icono ocupa de 1 a 15 kB (2 kB de mediana).
- **Diferido:** las animaciones se dibujan solo en el navegador, después de que se renderiza la página; los bucles con reproducción automática se pausan mientras quedan fuera de la vista, y todo se limpia al desmontar el componente.
- **Decorativos por defecto:** los iconos se ocultan a los lectores de pantalla (`aria-hidden`) salvo que pases `aria-label`, que hace que se anuncien como imagen. En controles que solo tienen un icono, usa un `<button>` real con `aria-label` (consulta [más arriba](#wrap-the-icon-in-a-real-button)) y refleja el estado del toggle con `aria-pressed` o `aria-expanded`.
- **Movimiento reducido y pantallas táctiles:** los iconos respetan `prefers-reduced-motion`, y los toques en pantallas táctiles no activan las animaciones de hover.

<div id="agents"></div>

## Agentes de programación con IA {#ai-coding-agents}

Los agentes pueden elegir iconos por palabra clave o por interacción a partir de [icons.json](/icons.json), o de `react-useanimations/catalog.json` dentro del paquete, y usar la línea de import o el comando de shadcn que aparece ahí. Las definiciones de tipos de cada import de icono también incluyen su título, palabras clave, interacción y vista previa. Esta documentación está disponible en Markdown en [/documentation.md](/documentation.md), y [/llms.txt](/llms.txt) indexa el sitio.

## Actualizar desde la v2 {#upgrading-from-v2}

En la mayoría de las apps, actualizar consiste en instalar la v3: el componente, los imports `react-useanimations/lib/<name>` y los 79 iconos de la v2 siguen igual. Sigue los pasos de abajo que apliquen a tu código.

### 1. Instala la v3 {#1-install-v3}

La v3 necesita React 18 o posterior y no tiene dependencias. Desinstala también lottie-web, salvo que otra parte de tu app lo use.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. Sustituye `reverse` por `active` {#2-replace-reverse-with-active}

`active` es totalmente controlado: el icono se anima cuando `active` cambia, y un clic por sí solo no lo alterna, así que actualízalo en `onClick`. `reverse` sigue funcionando como en la v2 (define el estado inicial y los clics alternan el icono), pero está obsoleto. Ambos se aplican solo a los iconos `click-toggle`: los cuatro círculos con flecha ahora se repiten al hacer clic (consulta el [paso 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Revisa los colores {#3-check-the-colors}

Los iconos de la v2 eran negros salvo que definieras `strokeColor`. Los de la v3 siguen el color del texto (`currentColor`), y `fillColor` toma por defecto el valor de `strokeColor`. Los iconos dentro de texto o enlaces de color cambian de color con ellos; para mantenerlos en negro, define tú el color:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Migra `wrapperStyle`, `pathCss` y `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** está obsoleto: usa `style`.
- **`pathCss`** se eliminó: aplica estilos a los trazados con una clase.
- **`options`** (los ajustes de lottie-web) se eliminó junto con lottie-web. Usa las props `loop`, `autoplay` y `speed`; el resto de opciones de lottie-web no tienen equivalente.

Si aun así pasas `pathCss` u `options`, se muestra un aviso una sola vez y se ignoran.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Revisa el elemento contenedor {#5-check-the-wrapper-element}

El contenedor ahora es un `<span>` inline-block en lugar de un `<div>`, así que es válido dentro de botones y enlaces y se coloca en la línea de texto. Actualiza el CSS que apunte al contenedor como `div`, y en la prop `render` aplica `animationProps` a un `<span>`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Los iconos ahora se ocultan a los lectores de pantalla (`aria-hidden`) salvo que pases `aria-label`; añádelo a los iconos que transmiten significado por sí solos.

### 6. Revisa los iconos cuya interacción cambió {#6-check-the-icons-whose-interaction-changed}

Las interacciones ahora coinciden con las de useanimations.com. Si quieres que un icono se comporte como en la v2, pásale su interacción anterior:

| Iconos                                                                                             | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* La v2 los reproducía una vez al entrar el cursor y volvía de golpe al principio al salir; `hover-replay` es lo más parecido.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Actualiza los imports {#7-update-imports}

Importa los iconos solo como `react-useanimations/lib/<name>` o desde `react-useanimations/icons`. Las rutas internas de la v2, como `react-useanimations/lib/github/index` o `react-useanimations/lib/github/github.json`, ya no se resuelven; el Lottie JSON es el `animationData` del icono:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Las rutas `react-useanimations/utils` se eliminaron. Importa los tipos desde el paquete:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` ahora es `{ animationData, interaction }`; el campo `animationKey` de la v2 ya no existe, así que los objetos que construyas tú deben usar `interaction` en su lugar.

### Otras novedades {#what-else-is-new}

221 iconos más (300 en total), varios iconos a la vez desde `react-useanimations/icons`, soporte para movimiento reducido, hover con el foco del teclado, animaciones de hover que ya no se quedan atascadas en pantallas táctiles, renderizado en servidor sin trucos y un [registro de shadcn](#shadcnui).

## Licencia {#license}

Los iconos y el código se publican bajo la [licencia MIT](https://opensource.org/license/mit/): úsalos, modifícalos y redistribúyelos en trabajos personales y comerciales. La atribución no es obligatoria, pero se agradece:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Condiciones completas: [Licencia y condiciones](/licencing-and-terms).

## Preguntas frecuentes {#faq}

<details><summary>¿useAnimations es gratis para proyectos comerciales?</summary>

Sí. Los iconos y el paquete tienen licencia MIT y no requieren atribución.

</details>

<details><summary>¿Cómo cambio el color de un icono?</summary>

Los iconos siguen el color del texto. Puedes cambiarlo con `strokeColor` y `fillColor`, con la propiedad `color` de CSS o aplicando estilos a los trazados. Consulta [Tamaño y color](#size--color).

</details>

<details><summary>¿Funciona sin React?</summary>

El paquete es para React. Cada icono es también un archivo Lottie JSON que pueden reproducir lottie-web, lottie-ios, lottie-android, Flutter y React Native, además de un SVG estático. Consulta [Uso sin React](#use-without-react) e [Iconos Lottie](/lottie-icons).

</details>

<details><summary>¿Pueden los agentes de programación con IA usar useAnimations?</summary>

Sí. Indícales [icons.json](/icons.json) y [/documentation.md](/documentation.md); el propio paquete incluye `catalog.json` y tipos documentados para cada icono.

</details>
