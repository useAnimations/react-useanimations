# Dokumentace {#documentation}

useAnimations je bezplatná knihovna 300 animovaných ikon pro React pod licencí MIT. Každá ikona má vestavěnou interakci: běží ve smyčce, přehraje se po kliknutí nebo při najetí myší. Používat je můžete přes balíček `react-useanimations`, nebo si je přidat pomocí shadcn CLI.

<div id="quick-start-react"></div>

## Rychlý start {#quick-start}

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

Ikona přebírá barvu textu a přehrává svou vlastní interakci: `github` běží ve smyčce, dokud je na ní kurzor. Balíček nemá žádné závislosti; ikony kreslí jako SVG vestavěný přehrávač (8 kB po gzipu) a každá ikona je samostatný modul, takže bundle obsahuje jen ikony, které naimportujete.

## Interakce {#interactions}

Každá ikona má interakci, pro kterou byla navržena. Změníte ji propem `interaction`.

| Interakce      | Co dělá                                                             | Příklady ikon                        |
| -------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Přehrává se nepřetržitě.                                            | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Kliknutím se přepíná mezi dvěma stavy (dopředu, pak pozpátku).      | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Při každém kliknutí se přehraje od začátku.                         | `download`, `refresh`, `send`        |
| `hover`        | Při najetí myší se přehraje dopředu, při odjetí pozpátku.           | `archive`, `settings`, `trash`       |
| `hover-loop`   | Při hoveru běží ve smyčce a po odjetí myši dokončí aktuální cyklus. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Při najetí myší se jednou přehraje od začátku.                      | `arrowRight`, `bluetooth`, `zap`     |

Když uživatel preferuje omezený pohyb, ikony zůstanou v klidu: smyčky ukážou svůj první snímek, animace při hoveru a po kliknutí se nepřehrají a přepínače přejdou do nového stavu okamžitě.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Výchozí hodnota  | Popis                                                                                                                       |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | Ikona naimportovaná z `react-useanimations/lib/<name>`, nebo `{ animationData, interaction }` pro vlastní animaci.          |
| `size`        | `24`             | Šířka a výška; čísla jsou pixely, řetězce jakákoli CSS délka, například `'1.5em'`.                                          |
| `strokeColor` | `'currentColor'` | Barva tahů. Ve výchozím stavu ikona přebírá barvu textu.                                                                    |
| `fillColor`   | `strokeColor`    | Barva vyplněných částí, např. srdce po lajknutí.                                                                            |
| `interaction` | podle ikony      | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` nebo `'hover-replay'`.                              |
| `active`      | —                | Pro ikony `click-toggle`: `true` zobrazí koncový stav. Řízený režim: nastavujte ho v `onClick`, kliknutí ho sama nepřepnou. |
| `autoplay`    | podle ikony      | `true` pro ikony `loop`, pokud uživatel nepreferuje omezený pohyb.                                                          |
| `loop`        | podle ikony      | `true` pro ikony `loop` a `hover-loop`.                                                                                     |
| `speed`       | `1`              | Rychlost přehrávání.                                                                                                        |
| `render`      | —                | Render prop pro vlastní obal, viz [Ikona ve skutečném tlačítku](#wrap-the-icon-in-a-real-button).                           |

Všechny ostatní props (`className`, `aria-label`, `onClick`, …) dostane obalový `<span>`. Vaše event handlery se spustí před handlery animace; voláním `event.preventDefault()` animaci přeskočíte.

## Import ikon {#importing-icons}

Každou ikonu importujte z `react-useanimations/lib/<name>`, nebo jich naimportujte víc najednou z `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Produkční build v obou případech obsahuje jen ikony, které používáte. Dev servery a test runnery ale tree-shaking nedělají, takže tam `react-useanimations/icons` načte všechny ikony; pokud vám na tom záleží, dejte přednost `lib/<name>`. `delete` a `package` jsou rezervovaná slova: importujte je jako `deleteIcon` a `packageIcon`.

## Řízený přepínač {#controlled-toggle}

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
      active={open} // animuje se i tehdy, když se `open` změní jinde
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Ikona ve skutečném tlačítku {#wrap-the-icon-in-a-real-button}

U klikatelných ikon dejte kolem ikony pomocí propu `render` fokusovatelný prvek: `eventProps` patří na váš prvek a `animationProps` na `<span>` uvnitř něj. Animace na hover se pak přehrají i ve chvíli, kdy tlačítko získá fokus z klávesnice.

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

## Velikost a barva {#size--color}

Ikony jsou lineární, nakreslené na plátně 24 nebo 32 px, a zůstanou ostré v jakékoli velikosti: `size` nastavte na počet pixelů nebo na libovolnou CSS délku.

Tahy používají `currentColor`, takže ikony samy převezmou barvu textu, hover stavy i tmavý režim. Barvu změníte pomocí `strokeColor` a `fillColor`, přes CSS `color`, nebo nastylujte přímo cesty (paths): vestavěné pravidlo má nulovou specificitu, takže vaše CSS vždy vyhraje.

Některé ikony mají v sobě vyříznutou mezeru (lomítko u `visibility`, `microphone`, `video`, `volume` a `notification`, fajfka u `download`, kroužek kolem odznaku u `notification3`). Mezera přebírá pozadí stránky: na světlých stránkách je bílá, na stránkách s `color-scheme: dark` tmavá. Pro jiná pozadí ji nastavte CSS proměnnou `--ua-knockout`, např. `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: barva a tloušťka tahu
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js a vykreslování na serveru {#nextjs-and-server-rendering}

Komponenta je označená `'use client'` a animaci kreslí až v prohlížeči, takže ji můžete vykreslit ze server komponent i v SSR frameworcích (Next.js, Remix, Astro) bez `dynamic(…, { ssr: false })`. Moduly ikon jsou obyčejná data, takže je server komponenty mohou importovat a předávat jako props.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Všechny ikony jsou také v [registru shadcn](https://ui.shadcn.com/docs/registry). CLI přidá hotovou komponentu a nainstaluje `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Komponenta se jmenuje `Animated` + id ikony v PascalCase (`check-box` → `AnimatedCheckBox`), uloží se do `components/animations/<id>.tsx` a přijímá stejné props jako `UseAnimations`. Index registru najdete na [/r/registry.json](/r/registry.json). Pokud chcete používat krátký zápis `npx shadcn@latest add @useanimations/checkmark`, přidejte registr do `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Vlastní animace {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Vaše animace musí být Lottie JSON soubor, tedy stejný formát, jaký používají ikony. Přehrávač podporuje to, co ikony potřebují: tvarové vrstvy, prekompozice, null vrstvy a parenting, cesty, obdélníky, elipsy, tahy, výplně, trim paths, masky, klíčové snímky s easingem, hold klíčové snímky a pohybové cesty a výrazy (expressions) `loopOut()` a `wiggle()`. Nic dalšího, například přechody, textové a obrázkové vrstvy, efekty a matte, se nevykreslí; na nepodporované vrstvy, tvary a výrazy upozorní konzole.

<div id="direct-urls"></div><div id="download"></div>

## Soubory a icons.json {#files--iconsjson}

Každou ikonu si můžete také stáhnout, a to z její stránky (v angličtině) nebo ze stálých URL s povoleným CORS:

| Soubor                     | URL                                                |
| -------------------------- | -------------------------------------------------- |
| Animace (Lottie JSON)      | `https://useanimations.com/icons/<id>.json`        |
| Statické SVG každého stavu | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP s JSON a SVG soubory   | `https://useanimations.com/icons/<id>.zip`         |
| Stránka ikony              | `https://useanimations.com/icons/<id>`             |
| Katalog všech ikon         | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) obsahuje všechny ikony s jejich id, názvem, kategorií, klíčovými slovy pro hledání, interakcí, URL souborů, velikostí a délkou, importem z `react-useanimations` a příkazem pro shadcn. Stejná data obsahuje i npm balíček: `react-useanimations/catalog.json` (metadata), `react-useanimations/icons` (animace) a `react-useanimations/svg.json` (statická SVG).

<div id="without-react"></div>

## Použití bez Reactu {#use-without-react}

Ikony jsou standardní Lottie JSON, takže je přehraje jakýkoli Lottie přehrávač, ať už z `https://useanimations.com/icons/<id>.json`, nebo z kopie ve vašem projektu. Mimo React si interakci musíte zapojit sami. Další přehrávače a příklady najdete na stránce [Lottie ikony](/lottie-icons).

Některé ikony používají výrazy (expressions) z After Effects (`loopOut()`, `wiggle()`); v [icons.json](/icons.json) je označuje `requiresFullPlayer`. Na webu potřebují plný build lottie-web, ne `lottie_light`, a nativní přehrávače výrazy nevyhodnocují.

<div id="html"></div><div id="interactions-web"></div>

### HTML a JavaScript {#html-and-javascript}

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
  // hover: dopředu při najetí, pozpátku při odjetí
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

Se SVG rendererem může ikona přebírat barvu textu stejně jako React komponenta:

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

S knihovnou [lottie-ios](https://github.com/airbnb/lottie-ios) a JSON souborem v bundlu aplikace:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

S knihovnou [lottie-android](https://github.com/airbnb/lottie-android) v Jetpack Compose a JSON souborem v `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

S balíčkem [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Výkon a přístupnost {#performance--accessibility}

- **Malá velikost:** přehrávač má po gzipu 8 kB a žádné závislosti, ikona má 1 až 15 kB (medián 2 kB).
- **Líné vykreslování:** animace se kreslí až v prohlížeči, po vykreslení stránky; automaticky spuštěné smyčky se pozastaví, když je odscrollujete mimo obrazovku, a při unmountu se vše uklidí.
- **Ve výchozím stavu dekorativní:** ikony jsou před čtečkami obrazovky skryté (`aria-hidden`), dokud nepředáte `aria-label`, se kterým je čtečka ohlásí jako obrázek. U ovládacích prvků, které obsahují jen ikonu, použijte skutečný `<button>` s `aria-label` (viz [výše](#wrap-the-icon-in-a-real-button)) a stav přepínače vyjádřete pomocí `aria-pressed` nebo `aria-expanded`.
- **Omezený pohyb a dotyk:** ikony respektují `prefers-reduced-motion` a klepnutí na dotykové obrazovce hover animace nespouštějí.

<div id="agents"></div>

## AI agenti pro programování {#ai-coding-agents}

Agenti mohou vybírat ikony podle klíčového slova nebo interakce z [icons.json](/icons.json), případně z `react-useanimations/catalog.json` uvnitř balíčku, a použít import nebo příkaz pro shadcn, který tam najdou. Typové definice každého importu ikony navíc obsahují její název, klíčová slova, interakci a náhled. Tato dokumentace je k dispozici také jako Markdown na [/documentation.md](/documentation.md) (v angličtině) a [/llms.txt](/llms.txt) obsahuje rejstřík celého webu.

## Přechod z v2 {#upgrading-from-v2}

Pro většinu aplikací znamená upgrade jen instalaci v3: komponenta, importy `react-useanimations/lib/<name>` i všech 79 ikon z v2 zůstávají stejné. Projděte kroky níže, které se týkají vašeho kódu.

### 1. Instalace v3 {#1-install-v3}

v3 vyžaduje React 18 nebo novější a nemá žádné závislosti. Odinstalujte i lottie-web, pokud ho ve vaší aplikaci nepoužívá nic jiného.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. `reverse` nahraďte `active` {#2-replace-reverse-with-active}

`active` je plně řízený: ikona se animuje, když se `active` změní, a samotné kliknutí ji nepřepne, takže hodnotu měňte v `onClick`. `reverse` funguje dál stejně jako ve v2 (nastaví počáteční stav a kliknutí ikonu přepínají), je ale zastaralý. Oba platí jen pro ikony `click-toggle`: čtyři šipky v kruhu se teď po kliknutí přehrají znovu (viz [krok 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Zkontrolujte barvy {#3-check-the-colors}

Ikony ve v2 byly černé, pokud jste nenastavili `strokeColor`. Ikony ve v3 přebírají barvu textu (`currentColor`) a `fillColor` má výchozí hodnotu `strokeColor`. Ikony uvnitř barevného textu nebo odkazů tak změní barvu spolu s nimi; pokud mají zůstat černé, nastavte barvu sami:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Nahraďte `wrapperStyle`, `pathCss` a `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** je zastaralý: použijte `style`.
- **`pathCss`** byl odstraněn: cesty nastylujte pomocí třídy.
- **`options`** (nastavení lottie-web) zmizel spolu s lottie-web. Použijte props `loop`, `autoplay` a `speed`; ostatní volby lottie-web nemají náhradu.

Pokud `pathCss` nebo `options` přesto předáte, jednou se zaloguje varování a budou ignorovány.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Zkontrolujte obalový prvek {#5-check-the-wrapper-element}

Obal je teď inline-block `<span>` místo `<div>`, takže je validní uvnitř tlačítek a odkazů a sedí na řádku textu. Upravte CSS, které cílí na obal jako na `div`, a v propu `render` rozbalte `animationProps` na `<span>`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Ikony jsou teď před čtečkami obrazovky skryté (`aria-hidden`), dokud nepředáte `aria-label`; přidejte ho ikonám, které samy o sobě nesou význam.

### 6. Zkontrolujte ikony se změněnou interakcí {#6-check-the-icons-whose-interaction-changed}

Interakce teď odpovídají webu useanimations.com. Pokud se má ikona chovat jako ve v2, předejte jí její původní interakci:

| Ikony                                                                                              | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* Ve v2 se tyto ikony při najetí myší jednou přehrály a při odjetí skočily zpět na začátek; nejblíže tomu je `hover-replay`.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Aktualizujte importy {#7-update-imports}

Ikony importujte jen jako `react-useanimations/lib/<name>` nebo z `react-useanimations/icons`. Interní cesty k souborům z v2, jako `react-useanimations/lib/github/index` nebo `react-useanimations/lib/github/github.json`, už nefungují; Lottie JSON najdete v `animationData` ikony:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Cesty `react-useanimations/utils` byly odstraněny. Typy importujte přímo z balíčku:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` je teď `{ animationData, interaction }`; pole `animationKey` z v2 zmizelo, takže objekty, které si sestavujete sami, používají místo něj `interaction`.

### Co je ještě nového {#what-else-is-new}

O 221 ikon víc (celkem 300), import více ikon najednou z `react-useanimations/icons`, podpora omezeného pohybu, hover při fokusu z klávesnice, žádné zaseknuté hover animace na dotykových obrazovkách, vykreslování na serveru bez obezliček a [registr shadcn](#shadcnui).

## Licence {#license}

Ikony i kód jsou vydané pod [licencí MIT](https://opensource.org/license/mit/): můžete je používat, upravovat a dále šířit v osobních i komerčních projektech. Uvedení autora není povinné, ale potěší nás:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Úplné podmínky: [Licence a podmínky](/licencing-and-terms).

## Časté dotazy {#faq}

<details><summary>Je useAnimations zdarma i pro komerční projekty?</summary>

Ano. Ikony i balíček jsou pod licencí MIT a uvádět autora nemusíte.

</details>

<details><summary>Jak změnit barvu ikony?</summary>

Ikony přebírají barvu textu. Změníte ji pomocí `strokeColor` a `fillColor`, CSS vlastnosti `color` nebo stylováním cest (paths). Viz [Velikost a barva](#size--color).

</details>

<details><summary>Funguje to i bez Reactu?</summary>

Balíček je určený pro React. Každá ikona je ale zároveň Lottie JSON soubor, který přehraje lottie-web, lottie-ios, lottie-android, Flutter i React Native, a statické SVG. Viz [Použití bez Reactu](#use-without-react) a [Lottie ikony](/lottie-icons).

</details>

<details><summary>Mohou useAnimations používat AI agenti pro programování?</summary>

Ano. Odkažte je na [icons.json](/icons.json) a [/documentation.md](/documentation.md); samotný balíček obsahuje `catalog.json` a zdokumentované typy pro každou ikonu.

</details>
