# Documentation {#documentation}

useAnimations est une bibliothèque gratuite, sous licence MIT, de 300 icônes animées pour React. Chaque icône a une interaction intégrée : elle boucle, se joue au clic ou se joue au survol. Utilisez-les avec le package `react-useanimations` ou ajoutez-les avec la CLI shadcn.

<div id="quick-start-react"></div>

## Démarrage rapide {#quick-start}

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

L’icône suit la couleur du texte et joue sa propre interaction : `github` boucle tant que vous la survolez. Le package n’a aucune dépendance ; un lecteur intégré (8 kB gzippé) dessine les icônes en SVG, et chaque icône est un module distinct : votre bundle ne contient que les icônes que vous importez.

## Interactions {#interactions}

Chaque icône est livrée avec l’interaction pour laquelle elle a été conçue. Vous pouvez la remplacer avec la prop `interaction`.

| Interaction    | Ce qu’elle fait                                                         | Exemples d’icônes                    |
| -------------- | ----------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Se joue en continu.                                                     | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Bascule entre deux états au clic (vers l’avant, puis en arrière).       | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Rejoue l’animation depuis le début à chaque clic.                       | `download`, `refresh`, `send`        |
| `hover`        | Se joue vers l’avant à l’entrée de la souris et en arrière à sa sortie. | `archive`, `settings`, `trash`       |
| `hover-loop`   | Boucle pendant le survol et termine le cycle en cours à la sortie.      | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Se joue une fois depuis le début à l’entrée de la souris.               | `arrowRight`, `bluetooth`, `zap`     |

Quand l’utilisateur a activé la réduction des animations, les icônes restent immobiles : les boucles affichent leur première image, les animations au survol et de relecture ne se jouent pas, et les bascules passent immédiatement à leur nouvel état.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Valeur par défaut | Description                                                                                                                                   |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                 | Icône importée depuis `react-useanimations/lib/<name>`, ou `{ animationData, interaction }` pour votre propre animation.                      |
| `size`        | `24`              | Largeur et hauteur ; un nombre est exprimé en pixels, une chaîne peut être n’importe quelle longueur CSS, comme `'1.5em'`.                    |
| `strokeColor` | `'currentColor'`  | Couleur des traits. Par défaut, l’icône suit la couleur du texte.                                                                             |
| `fillColor`   | `strokeColor`     | Couleur des parties pleines, par exemple un cœur « aimé ».                                                                                    |
| `interaction` | selon l’icône     | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` ou `'hover-replay'`.                                                  |
| `active`      | —                 | Pour les icônes `click-toggle` : `true` affiche l’état final. Contrôlée : mettez-la à jour dans `onClick`, les clics ne la font pas basculer. |
| `autoplay`    | selon l’icône     | `true` pour les icônes `loop`, sauf si la réduction des animations est activée.                                                               |
| `loop`        | selon l’icône     | `true` pour les icônes `loop` et `hover-loop`.                                                                                                |
| `speed`       | `1`               | Vitesse de lecture.                                                                                                                           |
| `render`      | —                 | Render prop pour un wrapper personnalisé, voir [Placer l’icône dans un vrai bouton](#wrap-the-icon-in-a-real-button).                         |

Toute autre prop (`className`, `aria-label`, `onClick`, …) est transmise au `<span>` qui enveloppe l’icône. Vos gestionnaires d’événements s’exécutent avant ceux de l’animation ; appelez `event.preventDefault()` pour sauter l’animation.

## Importer les icônes {#importing-icons}

Importez chaque icône depuis `react-useanimations/lib/<name>`, ou plusieurs à la fois depuis `react-useanimations/icons` :

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Dans les deux cas, les builds de production n’incluent que les icônes utilisées. Les serveurs de développement et les lanceurs de tests ne font pas de tree-shaking : `react-useanimations/icons` y charge donc toutes les icônes ; préférez `lib/<name>` si cela compte pour vous. `delete` et `package` sont des mots réservés : importez-les sous les noms `deleteIcon` et `packageIcon`.

## Bascule contrôlée {#controlled-toggle}

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
      active={open} // s’anime aussi quand `open` change ailleurs
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Placer l’icône dans un vrai bouton {#wrap-the-icon-in-a-real-button}

Pour les icônes cliquables, entourez l’icône d’un élément focusable grâce à la prop `render` : `eventProps` va sur votre élément et `animationProps` sur un `<span>` à l’intérieur. Les animations au survol se jouent alors aussi quand le bouton reçoit le focus clavier.

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

## Taille et couleur {#size--color}

Les icônes sont des icônes au trait, dessinées sur un plan de travail de 24 ou 32 px, et restent nettes à toutes les tailles : donnez à `size` un nombre de pixels ou n’importe quelle longueur CSS.

Les traits suivent `currentColor` : les icônes reprennent d’elles-mêmes la couleur du texte, les états de survol et le mode sombre. Changez-les avec `strokeColor` et `fillColor`, avec la propriété CSS `color`, ou stylez directement les tracés : la règle intégrée a une spécificité nulle, donc votre CSS l’emporte toujours.

Certaines icônes sont évidées par endroits (la barre oblique de `visibility`, `microphone`, `video`, `volume` et `notification`, la coche de `download`, l’anneau autour du badge de `notification3`). Cet évidement prend la couleur de fond de la page : blanc sur les pages claires, sombre sur les pages en `color-scheme: dark`. Sur d’autres fonds, définissez-la avec la variable CSS `--ua-knockout`, par exemple `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind : couleur et épaisseur du trait
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js et rendu côté serveur {#nextjs-and-server-rendering}

Le composant est marqué `'use client'` et ne dessine l’animation que dans le navigateur : vous pouvez donc l’afficher depuis des server components et des frameworks SSR (Next.js, Remix, Astro) sans `dynamic(…, { ssr: false })`. Les modules d’icônes sont de simples données : les server components peuvent les importer et les transmettre en props.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Chaque icône est aussi disponible dans un [registre shadcn](https://ui.shadcn.com/docs/registry). La CLI ajoute un composant prêt à l’emploi et installe `react-useanimations` :

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Le composant s’appelle `Animated` + l’id de l’icône en PascalCase (`check-box` → `AnimatedCheckBox`), se place dans `components/animations/<id>.tsx` et accepte les mêmes props que `UseAnimations`. L’index du registre se trouve à l’adresse [/r/registry.json](/r/registry.json). Pour utiliser la forme courte `npx shadcn@latest add @useanimations/checkmark`, ajoutez le registre à `components.json` :

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Votre propre animation {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Votre animation doit être un fichier Lottie JSON, le format utilisé par les icônes. Le lecteur prend en charge ce dont les icônes ont besoin : calques de forme, précompositions, calques nuls et parentage, tracés, rectangles, ellipses, contours, remplissages, raccourcissement de tracés (trim paths), masques, images clés avec easing, maintiens et trajectoires de mouvement, ainsi que les expressions `loopOut()` et `wiggle()`. Le reste (dégradés, calques de texte ou d’image, effets, caches) n’est pas dessiné ; la console signale les calques, formes et expressions non pris en charge.

<div id="direct-urls"></div><div id="download"></div>

## Fichiers et icons.json {#files--iconsjson}

Chaque icône peut aussi être téléchargée, depuis sa page ou depuis des URL stables avec CORS activé :

| Fichier                        | URL                                                |
| ------------------------------ | -------------------------------------------------- |
| Animation (Lottie JSON)        | `https://useanimations.com/icons/<id>.json`        |
| SVG statique de chaque état    | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP avec le JSON et les SVG    | `https://useanimations.com/icons/<id>.zip`         |
| Page de l’icône                | `https://useanimations.com/icons/<id>`             |
| Catalogue de toutes les icônes | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) liste chaque icône avec son id, son titre, sa catégorie, ses mots-clés de recherche, son interaction, les URL de ses fichiers, sa taille et sa durée, son import `react-useanimations` et la commande shadcn. Le package npm contient les mêmes données : `react-useanimations/catalog.json` (métadonnées), `react-useanimations/icons` (les animations) et `react-useanimations/svg.json` (les SVG statiques).

<div id="without-react"></div>

## Utiliser sans React {#use-without-react}

Les icônes sont du Lottie JSON standard : n’importe quel lecteur Lottie peut les jouer depuis `https://useanimations.com/icons/<id>.json` ou depuis une copie dans votre projet. En dehors de React, c’est à vous de câbler l’interaction. La page [Icônes Lottie](/lottie-icons) présente d’autres lecteurs et exemples.

Certaines icônes utilisent des expressions After Effects (`loopOut()`, `wiggle()`) ; `requiresFullPlayer` les signale dans [icons.json](/icons.json). Sur le web, elles ont besoin de la version complète de lottie-web, pas de `lottie_light`, et les lecteurs natifs n’évaluent pas les expressions.

<div id="html"></div><div id="interactions-web"></div>

### HTML et JavaScript {#html-and-javascript}

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
  // survol : vers l’avant à l’entrée, en arrière à la sortie
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

Avec le moteur de rendu SVG, l’icône peut suivre la couleur du texte, comme avec le composant React :

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

Avec [lottie-ios](https://github.com/airbnb/lottie-ios) et le JSON dans le bundle de votre app :

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Avec [lottie-android](https://github.com/airbnb/lottie-android) dans Jetpack Compose et le JSON dans `res/raw` :

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

Avec le package [lottie](https://pub.dev/packages/lottie) :

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Performances et accessibilité {#performance--accessibility}

- **Léger :** le lecteur pèse 8 kB gzippé, sans dépendance, et une icône de 1 à 15 kB (2 kB en médiane).
- **Différé :** les animations ne sont dessinées que dans le navigateur, après le rendu de la page ; les boucles en lecture automatique se mettent en pause quand elles sortent de l’écran, et tout est nettoyé au démontage.
- **Décoratives par défaut :** les icônes sont masquées aux lecteurs d’écran (`aria-hidden`), sauf si vous passez `aria-label`, qui les annonce comme une image. Pour les contrôles composés uniquement d’une icône, utilisez un vrai `<button>` avec un `aria-label` (voir [plus haut](#wrap-the-icon-in-a-real-button)) et reflétez l’état de la bascule avec `aria-pressed` ou `aria-expanded`.
- **Réduction des animations et écrans tactiles :** les icônes respectent `prefers-reduced-motion`, et un tap sur écran tactile ne déclenche pas les animations au survol.

<div id="agents"></div>

## Agents de code IA {#ai-coding-agents}

Les agents peuvent choisir des icônes par mot-clé ou par interaction dans [icons.json](/icons.json), ou dans `react-useanimations/catalog.json` à l’intérieur du package, puis utiliser la ligne d’import ou la commande shadcn indiquée. Les définitions de types de chaque import d’icône contiennent aussi son titre, ses mots-clés, son interaction et un aperçu. Cette documentation est disponible en Markdown (en anglais) à l’adresse [/documentation.md](/documentation.md), et [/llms.txt](/llms.txt) indexe le site.

## Migrer depuis la v2 {#upgrading-from-v2}

Pour la plupart des apps, migrer revient à installer la v3 : le composant, les imports `react-useanimations/lib/<name>` et les 79 icônes de la v2 restent identiques. Suivez les étapes ci-dessous qui concernent votre code.

### 1. Installer la v3 {#1-install-v3}

La v3 nécessite React 18 ou plus récent et n’a aucune dépendance. Désinstallez aussi lottie-web, sauf si une autre partie de votre app l’utilise.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. Remplacer `reverse` par `active` {#2-replace-reverse-with-active}

`active` est entièrement contrôlée : l’icône s’anime quand `active` change, et un clic seul ne la fait pas basculer ; mettez-la donc à jour dans `onClick`. `reverse` fonctionne toujours comme en v2 (elle définit l’état de départ et les clics font basculer l’icône), mais elle est dépréciée. Les deux ne s’appliquent qu’aux icônes `click-toggle` : les quatre flèches dans un cercle se rejouent désormais au clic (voir l’[étape 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Vérifier les couleurs {#3-check-the-colors}

Les icônes de la v2 étaient noires, sauf si vous définissiez `strokeColor`. Celles de la v3 suivent la couleur du texte (`currentColor`), et `fillColor` vaut par défaut `strokeColor`. Les icônes placées dans un texte ou un lien coloré changent de couleur avec lui ; pour les garder noires, définissez la couleur vous-même :

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Remplacer `wrapperStyle`, `pathCss` et `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** est dépréciée : utilisez `style`.
- **`pathCss`** a été supprimée : stylez les tracés avec une classe.
- **`options`** (les réglages de lottie-web) a été supprimée avec lottie-web. Utilisez les props `loop`, `autoplay` et `speed` ; les autres options de lottie-web n’ont pas d’équivalent.

Si vous passez quand même `pathCss` ou `options`, un avertissement s’affiche une fois ; elles sont ignorées.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Vérifier l’élément wrapper {#5-check-the-wrapper-element}

Le wrapper est désormais un `<span>` en inline-block et non plus une `<div>` : il est donc valide dans les boutons et les liens et s’aligne sur la ligne de texte. Mettez à jour le CSS qui cible le wrapper en tant que `div`, et dans la prop `render`, appliquez `animationProps` à un `<span>` :

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Les icônes sont désormais masquées aux lecteurs d’écran (`aria-hidden`), sauf si vous passez `aria-label` ; ajoutez-en un aux icônes qui ont un sens par elles-mêmes.

### 6. Vérifier les icônes dont l’interaction a changé {#6-check-the-icons-whose-interaction-changed}

Les interactions correspondent désormais à celles de useanimations.com. Si une icône doit se comporter comme en v2, passez-lui son ancienne interaction :

| Icônes                                                                                             | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* La v2 les jouait une fois à l’entrée de la souris et revenait brusquement au début à la sortie ; `hover-replay` est l’interaction la plus proche.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Mettre à jour les imports {#7-update-imports}

Importez les icônes uniquement sous la forme `react-useanimations/lib/<name>` ou depuis `react-useanimations/icons`. Les chemins de fichiers internes de la v2, comme `react-useanimations/lib/github/index` ou `react-useanimations/lib/github/github.json`, ne sont plus résolus ; le Lottie JSON correspond à l’`animationData` de l’icône :

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Les chemins `react-useanimations/utils` ont été supprimés. Importez les types depuis le package :

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` vaut désormais `{ animationData, interaction }` ; le champ `animationKey` de la v2 a disparu : les objets que vous construisez vous-même utilisent `interaction` à la place.

### Les autres nouveautés {#what-else-is-new}

221 icônes supplémentaires (300 au total), plusieurs icônes importables d’un coup depuis `react-useanimations/icons`, la prise en charge de la réduction des animations, le survol au focus clavier, plus d’animations au survol bloquées sur écran tactile, le rendu côté serveur sans contournement, et un [registre shadcn](#shadcnui).

## Licence {#license}

Les icônes et le code sont publiés sous [licence MIT](https://opensource.org/license/mit/) : utilisez-les, modifiez-les et redistribuez-les dans vos projets personnels et commerciaux. L’attribution n’est pas obligatoire, mais elle est appréciée :

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Conditions complètes : [Licence et conditions](/licencing-and-terms).

## Questions fréquentes {#faq}

<details><summary>useAnimations est-il gratuit pour les projets commerciaux ?</summary>

Oui. Les icônes et le package sont sous licence MIT, sans attribution obligatoire.

</details>

<details><summary>Comment changer la couleur d’une icône ?</summary>

Les icônes suivent la couleur du texte. Changez-la avec `strokeColor` et `fillColor`, avec la propriété CSS `color` ou en stylant les tracés. Voir [Taille et couleur](#size--color).

</details>

<details><summary>Est-ce que ça fonctionne sans React ?</summary>

Le package est destiné à React. Chaque icône existe aussi en fichier Lottie JSON, lisible par lottie-web, lottie-ios, lottie-android, Flutter et React Native, et en SVG statique. Voir [Utiliser sans React](#use-without-react) et [Icônes Lottie](/lottie-icons).

</details>

<details><summary>Les agents de code IA peuvent-ils utiliser useAnimations ?</summary>

Oui. Indiquez-leur [icons.json](/icons.json) et [/documentation.md](/documentation.md) ; le package lui-même fournit `catalog.json` et des types documentés pour chaque icône.

</details>
