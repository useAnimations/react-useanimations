# Documentação {#documentation}

O useAnimations é uma biblioteca gratuita, com licença MIT, de 300 ícones animados para React. Cada ícone já vem com uma interação: fica em loop, toca no clique ou toca no hover. Use os ícones com o pacote `react-useanimations` ou adicione-os com a CLI do shadcn.

<div id="quick-start-react"></div>

## Primeiros passos {#quick-start}

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

O ícone segue a cor do texto e executa a própria interação: o `github` fica em loop enquanto o mouse está sobre ele. O pacote não tem dependências; um player embutido (8 kB com gzip) desenha os ícones em SVG, e cada ícone é um módulo separado, então o seu bundle inclui só os ícones que você importa.

## Interações {#interactions}

Cada ícone vem com a interação para a qual foi desenhado. Para trocá-la, use a prop `interaction`.

| Interação      | O que faz                                                                  | Ícones de exemplo                    |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Toca continuamente.                                                        | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Alterna entre dois estados no clique (para a frente, depois ao contrário). | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Toca de novo desde o início a cada clique.                                 | `download`, `refresh`, `send`        |
| `hover`        | Toca para a frente quando o mouse entra e ao contrário quando sai.         | `archive`, `settings`, `trash`       |
| `hover-loop`   | Fica em loop durante o hover e termina o ciclo atual quando o mouse sai.   | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Toca uma vez, desde o início, quando o mouse entra.                        | `arrowRight`, `bluetooth`, `zap`     |

Quando o usuário prefere movimento reduzido, os ícones ficam parados: os loops mostram o primeiro frame, as animações de hover e de replay não tocam, e os toggles passam para o novo estado na hora.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Padrão           | Descrição                                                                                                                                 |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | Ícone importado de `react-useanimations/lib/<name>`, ou `{ animationData, interaction }` para uma animação sua.                           |
| `size`        | `24`             | Largura e altura; números são pixels, strings são qualquer medida CSS, como `'1.5em'`.                                                    |
| `strokeColor` | `'currentColor'` | Cor dos traços. Por padrão, o ícone segue a cor do texto.                                                                                 |
| `fillColor`   | `strokeColor`    | Cor das partes preenchidas, por exemplo um coração curtido.                                                                               |
| `interaction` | depende do ícone | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` ou `'hover-replay'`.                                              |
| `active`      | —                | Para ícones `click-toggle`: `true` mostra o estado final. É controlada: defina no `onClick`, porque o clique não alterna o ícone sozinho. |
| `autoplay`    | depende do ícone | `true` para ícones `loop`, a menos que o usuário prefira movimento reduzido.                                                              |
| `loop`        | depende do ícone | `true` para ícones `loop` e `hover-loop`.                                                                                                 |
| `speed`       | `1`              | Velocidade de reprodução.                                                                                                                 |
| `render`      | —                | Render prop para um wrapper próprio; veja [Coloque o ícone num botão de verdade](#wrap-the-icon-in-a-real-button).                        |

Qualquer outra prop (`className`, `aria-label`, `onClick`, …) vai para o `<span>` que envolve o ícone. Os seus event handlers rodam antes dos da animação; chame `event.preventDefault()` para pular a animação.

## Como importar os ícones {#importing-icons}

Importe cada ícone de `react-useanimations/lib/<name>`, ou vários de uma vez de `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Nos dois casos, os builds de produção incluem só os ícones que você usa. Servidores de desenvolvimento e test runners não fazem tree-shaking, então neles `react-useanimations/icons` carrega todos os ícones; se isso fizer diferença, prefira `lib/<name>`. `delete` e `package` são palavras reservadas: importe-os como `deleteIcon` e `packageIcon`.

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
      active={open} // também anima quando `open` muda em outro lugar
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Coloque o ícone num botão de verdade {#wrap-the-icon-in-a-real-button}

Para ícones clicáveis, envolva o ícone num elemento focável usando a prop `render`: os `eventProps` vão no seu elemento e os `animationProps` num `<span>` dentro dele. Assim, as animações de hover também tocam quando o botão recebe foco pelo teclado.

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

## Tamanho e cor {#size--color}

Os ícones são ícones de linha desenhados numa prancheta de 24 ou 32 px e continuam nítidos em qualquer tamanho: defina `size` com um número de pixels ou qualquer medida CSS.

Os traços seguem `currentColor`, então os ícones assumem sozinhos a cor do texto, os estados de hover e o modo escuro. Mude as cores com `strokeColor` e `fillColor`, com a propriedade CSS `color` ou estilizando os paths: a regra embutida tem especificidade zero, então o seu CSS sempre prevalece.

Alguns ícones têm um recorte vazado (a barra em `visibility`, `microphone`, `video`, `volume` e `notification`, o check em `download`, o anel em volta do badge de `notification3`). Esse vão assume a cor de fundo da página: branco em páginas claras e escuro em páginas com `color-scheme: dark`. Em outros fundos, defina a cor com a variável CSS `--ua-knockout`, por exemplo `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: cor e espessura do traço
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js e renderização no servidor {#nextjs-and-server-rendering}

O componente é marcado com `'use client'` e desenha a animação só no navegador, então você pode renderizá-lo a partir de server components e de frameworks com SSR (Next.js, Remix, Astro) sem `dynamic(…, { ssr: false })`. Os módulos dos ícones são dados simples, então os server components podem importá-los e passá-los como props.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Todos os ícones também estão num [registry do shadcn](https://ui.shadcn.com/docs/registry). A CLI adiciona um componente pronto e instala o `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

O componente se chama `Animated` + o id do ícone em PascalCase (`check-box` → `AnimatedCheckBox`), vai para `components/animations/<id>.tsx` e recebe as mesmas props que o `UseAnimations`. O índice do registry fica em [/r/registry.json](/r/registry.json). Para usar a forma curta `npx shadcn@latest add @useanimations/checkmark`, adicione o registry ao `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Sua própria animação {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

A sua animação precisa ser um arquivo Lottie JSON, o mesmo formato dos ícones. O player suporta o que os ícones precisam: shape layers, precomposições, null layers e parenting, paths, retângulos, elipses, traços, preenchimentos, trim paths, máscaras, keyframes com easing, holds e motion paths, e as expressões `loopOut()` e `wiggle()`. O resto, como gradientes, camadas de texto ou de imagem, efeitos e mattes, não é desenhado; o console avisa sobre camadas, formas e expressões não suportadas.

<div id="direct-urls"></div><div id="download"></div>

## Arquivos e icons.json {#files--iconsjson}

Todos os ícones também podem ser baixados, na página de cada um (em inglês) ou em URLs estáveis com CORS habilitado:

| Arquivo                     | URL                                                |
| --------------------------- | -------------------------------------------------- |
| Animação (Lottie JSON)      | `https://useanimations.com/icons/<id>.json`        |
| SVG estático de cada estado | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP com o JSON e os SVGs    | `https://useanimations.com/icons/<id>.zip`         |
| Página do ícone             | `https://useanimations.com/icons/<id>`             |
| Catálogo de todos os ícones | `https://useanimations.com/icons.json`             |

O [icons.json](/icons.json) lista cada ícone com id, título, categoria, palavras-chave de busca, interação, URLs dos arquivos, tamanho e duração, o import do `react-useanimations` e o comando do shadcn. O pacote npm traz os mesmos dados: `react-useanimations/catalog.json` (metadados), `react-useanimations/icons` (as animações) e `react-useanimations/svg.json` (os SVGs estáticos).

<div id="without-react"></div>

## Uso sem React {#use-without-react}

Os ícones são Lottie JSON padrão, então qualquer player Lottie consegue tocá-los a partir de `https://useanimations.com/icons/<id>.json` ou de uma cópia no seu projeto. Fora do React, a interação fica por sua conta. A página [Ícones Lottie](/lottie-icons) tem mais players e exemplos.

Alguns ícones usam expressões do After Effects (`loopOut()`, `wiggle()`); o campo `requiresFullPlayer` os identifica no [icons.json](/icons.json). Na web, eles precisam do build completo do lottie-web, não do `lottie_light`, e os players nativos não avaliam expressões.

<div id="html"></div><div id="interactions-web"></div>

### HTML e JavaScript {#html-and-javascript}

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
  // hover: para a frente ao entrar, ao contrário ao sair
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

Com o renderer SVG, o ícone pode seguir a cor do texto, como no componente React:

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

Com o [lottie-ios](https://github.com/airbnb/lottie-ios) e o JSON no bundle do app:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Com o [lottie-android](https://github.com/airbnb/lottie-android) no Jetpack Compose e o JSON em `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

Com o pacote [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Desempenho e acessibilidade {#performance--accessibility}

- **Leve:** o player tem 8 kB com gzip e nenhuma dependência, e um ícone tem de 1 a 15 kB (mediana de 2 kB).
- **Sob demanda:** as animações só são desenhadas no navegador, depois que a página renderiza; loops com autoplay pausam enquanto estão fora da área visível, e tudo é liberado no unmount.
- **Decorativos por padrão:** os ícones ficam ocultos para leitores de tela (`aria-hidden`), a menos que você passe `aria-label`, o que faz o ícone ser anunciado como imagem. Para controles que têm só um ícone, use um `<button>` de verdade com `aria-label` (veja [acima](#wrap-the-icon-in-a-real-button)) e indique o estado do toggle com `aria-pressed` ou `aria-expanded`.
- **Movimento reduzido e toque:** os ícones respeitam `prefers-reduced-motion`, e toques em telas sensíveis ao toque não disparam animações de hover.

<div id="agents"></div>

## Agentes de código com IA {#ai-coding-agents}

Os agentes podem escolher ícones por palavra-chave ou por interação no [icons.json](/icons.json), ou no `react-useanimations/catalog.json` dentro do pacote, e usar a linha de import ou o comando do shadcn que ele informa. As definições de tipo de cada import de ícone também trazem título, palavras-chave, interação e prévia. Esta documentação está disponível em Markdown em [/documentation.md](/documentation.md), e o [/llms.txt](/llms.txt) indexa o site.

## Atualizando da v2 {#upgrading-from-v2}

Para a maioria dos apps, atualizar significa instalar a v3: o componente, os imports `react-useanimations/lib/<name>` e todos os 79 ícones da v2 continuam iguais. Siga os passos abaixo que se aplicam ao seu código.

### 1. Instale a v3 {#1-install-v3}

A v3 exige React 18 ou mais recente e não tem dependências. Remova também o lottie-web, a menos que outra parte do seu app o use.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. Troque `reverse` por `active` {#2-replace-reverse-with-active}

`active` é totalmente controlada: o ícone anima quando `active` muda, e um clique sozinho não o alterna, então atualize o valor no `onClick`. `reverse` continua funcionando como na v2 (define o estado inicial, e os cliques alternam o ícone), mas está obsoleta. As duas valem só para ícones `click-toggle`: os quatro círculos com seta agora tocam de novo a cada clique (veja o [passo 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Confira as cores {#3-check-the-colors}

Na v2, os ícones eram pretos, a menos que você definisse `strokeColor`. Na v3, os ícones seguem a cor do texto (`currentColor`), e `fillColor` usa `strokeColor` como padrão. Ícones dentro de texto colorido ou de links mudam de cor junto; para mantê-los pretos, defina a cor você mesmo:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Substitua `wrapperStyle`, `pathCss` e `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** está obsoleta: use `style`.
- **`pathCss`** foi removida: estilize os paths com uma classe.
- **`options`** (configurações do lottie-web) foi removida junto com o lottie-web. Use as props `loop`, `autoplay` e `speed`; as outras opções do lottie-web não têm equivalente.

Se você passar `pathCss` ou `options` mesmo assim, um aviso aparece uma vez no console, e elas são ignoradas.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Confira o elemento wrapper {#5-check-the-wrapper-element}

O wrapper agora é um `<span>` inline-block em vez de uma `<div>`, então ele é válido dentro de botões e links e fica alinhado à linha do texto. Atualize o CSS que mira o wrapper como `div` e aplique os `animationProps` num `<span>` na prop `render`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Agora os ícones ficam ocultos para leitores de tela (`aria-hidden`), a menos que você passe `aria-label`; adicione um aos ícones que transmitem significado sozinhos.

### 6. Confira os ícones cuja interação mudou {#6-check-the-icons-whose-interaction-changed}

As interações agora são as mesmas de useanimations.com. Se um ícone deve se comportar como na v2, passe a interação antiga:

| Ícones                                                                                             | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* Na v2, esses ícones tocavam uma vez quando o mouse entrava e pulavam de volta para o início quando ele saía; `hover-replay` é o mais próximo disso.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Atualize os imports {#7-update-imports}

Importe os ícones só como `react-useanimations/lib/<name>` ou de `react-useanimations/icons`. Os caminhos internos de arquivos da v2, como `react-useanimations/lib/github/index` ou `react-useanimations/lib/github/github.json`, não são mais resolvidos; o Lottie JSON é o `animationData` do ícone:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Os caminhos `react-useanimations/utils` foram removidos. Importe os tipos do próprio pacote:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` agora é `{ animationData, interaction }`; o campo `animationKey` da v2 deixou de existir, então objetos que você montou por conta própria passam a usar `interaction`.

### O que mais há de novo {#what-else-is-new}

221 ícones a mais (300 no total), vários ícones de uma vez a partir de `react-useanimations/icons`, suporte a movimento reduzido, hover no foco pelo teclado, nada de animações de hover travadas em telas sensíveis ao toque, renderização no servidor sem workarounds e um [registry do shadcn](#shadcnui).

## Licença {#license}

Os ícones e o código são distribuídos sob a [licença MIT](https://opensource.org/license/mit/): você pode usar, modificar e redistribuir em trabalhos pessoais e comerciais. A atribuição não é obrigatória, mas é bem-vinda:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Termos completos: [Licença e termos](/licencing-and-terms).

## Perguntas frequentes {#faq}

<details><summary>O useAnimations é gratuito para projetos comerciais?</summary>

Sim. Os ícones e o pacote têm licença MIT, sem exigência de atribuição.

</details>

<details><summary>Como mudo a cor de um ícone?</summary>

Os ícones seguem a cor do texto. Mude com `strokeColor` e `fillColor`, com a propriedade CSS `color` ou estilizando os paths. Veja [Tamanho e cor](#size--color).

</details>

<details><summary>Funciona sem React?</summary>

O pacote é para React. Cada ícone também é um arquivo Lottie JSON que lottie-web, lottie-ios, lottie-android, Flutter e React Native conseguem tocar, além de um SVG estático. Veja [Uso sem React](#use-without-react) e [Ícones Lottie](/lottie-icons).

</details>

<details><summary>Agentes de código com IA conseguem usar o useAnimations?</summary>

Sim. Indique a eles o [icons.json](/icons.json) e o [/documentation.md](/documentation.md); o próprio pacote traz o `catalog.json` e tipos documentados para cada ícone.

</details>
