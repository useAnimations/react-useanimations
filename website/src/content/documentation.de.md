# Dokumentation {#documentation}

useAnimations ist eine kostenlose, MIT-lizenzierte Bibliothek mit 300 animierten Icons für React. Jedes Icon bringt eine eingebaute Interaktion mit: Es läuft in Schleife, spielt per Klick ab oder spielt bei Hover ab. Sie nutzen die Icons über das Paket `react-useanimations` oder fügen sie mit der shadcn CLI hinzu.

<div id="quick-start-react"></div>

## Schnellstart {#quick-start}

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

Das Icon übernimmt die Textfarbe und spielt seine eigene Interaktion ab: `github` läuft in Schleife, solange der Mauszeiger darauf liegt. Das Paket hat keine Abhängigkeiten. Ein eingebauter Player (8 kB gzip-komprimiert) zeichnet die Icons als SVG, und jedes Icon ist ein eigenes Modul, sodass Ihr Bundle nur die Icons enthält, die Sie importieren.

## Interaktionen {#interactions}

Jedes Icon kommt mit der Interaktion, für die es gestaltet wurde. Mit dem Prop `interaction` überschreiben Sie sie.

| Interaktion    | Was sie macht                                                                          | Beispiel-Icons                       |
| -------------- | -------------------------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Läuft ununterbrochen.                                                                  | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Wechselt per Klick zwischen zwei Zuständen (vorwärts, dann rückwärts).                 | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Spielt bei jedem Klick von vorn ab.                                                    | `download`, `refresh`, `send`        |
| `hover`        | Spielt beim Betreten mit der Maus vorwärts und beim Verlassen rückwärts.               | `archive`, `settings`, `trash`       |
| `hover-loop`   | Läuft bei Hover in Schleife und spielt beim Verlassen den aktuellen Durchlauf zu Ende. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Spielt beim Betreten mit der Maus einmal von vorn ab.                                  | `arrowRight`, `bluetooth`, `zap`     |

Ist beim Nutzer reduzierte Bewegung eingestellt, bleiben die Icons still: Loops zeigen ihren ersten Frame, Hover- und Replay-Animationen spielen nicht ab, und Toggles springen sofort in ihren neuen Zustand.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Standardwert     | Beschreibung                                                                                                               |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | Icon, importiert aus `react-useanimations/lib/<name>`, oder `{ animationData, interaction }` für eine eigene Animation.    |
| `size`        | `24`             | Breite und Höhe; Zahlen sind Pixel, Strings jede CSS-Länge wie `'1.5em'`.                                                  |
| `strokeColor` | `'currentColor'` | Farbe der Linien. Standardmäßig übernimmt das Icon die Textfarbe.                                                          |
| `fillColor`   | `strokeColor`    | Farbe gefüllter Flächen, z. B. eines gelikten Herzens.                                                                     |
| `interaction` | je nach Icon     | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` oder `'hover-replay'`.                             |
| `active`      | —                | Für `click-toggle`-Icons: `true` zeigt den Endzustand. Kontrolliert: in `onClick` setzen, Klicks allein schalten nicht um. |
| `autoplay`    | je nach Icon     | `true` für `loop`-Icons, außer bei eingestellter reduzierter Bewegung.                                                     |
| `loop`        | je nach Icon     | `true` für `loop`- und `hover-loop`-Icons.                                                                                 |
| `speed`       | `1`              | Wiedergabegeschwindigkeit.                                                                                                 |
| `render`      | —                | Render-Prop für einen eigenen Wrapper, siehe [Das Icon in einen echten Button setzen](#wrap-the-icon-in-a-real-button).    |

Alle anderen Props (`className`, `aria-label`, `onClick`, …) landen auf dem Wrapper-`<span>`. Ihre Event-Handler laufen vor denen der Animation; mit `event.preventDefault()` lassen Sie die Animation aus.

## Icons importieren {#importing-icons}

Importieren Sie jedes Icon aus `react-useanimations/lib/<name>` oder mehrere auf einmal aus `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Produktions-Builds enthalten in beiden Fällen nur die Icons, die Sie verwenden. Dev-Server und Test-Runner machen kein Tree-Shaking, dort lädt `react-useanimations/icons` also alle Icons; ist das relevant, nehmen Sie lieber `lib/<name>`. `delete` und `package` sind reservierte Wörter: Importieren Sie sie als `deleteIcon` und `packageIcon`.

## Kontrollierter Toggle {#controlled-toggle}

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
      active={open} // animiert auch, wenn sich `open` an anderer Stelle ändert
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Das Icon in einen echten Button setzen {#wrap-the-icon-in-a-real-button}

Bei anklickbaren Icons legen Sie mit dem Prop `render` ein fokussierbares Element um das Icon: `eventProps` kommen auf Ihr Element, `animationProps` auf ein `<span>` darin. Hover-Animationen spielen dann auch ab, wenn der Button den Tastaturfokus erhält.

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

## Größe & Farbe {#size--color}

Die Icons sind Linien-Icons auf einer Zeichenfläche von 24 oder 32 px und bleiben in jeder Größe scharf: Setzen Sie `size` auf eine Pixelzahl oder eine beliebige CSS-Länge.

Die Linien folgen `currentColor`, die Icons übernehmen also Textfarbe, Hover-Zustände und Dark Mode von selbst. Ändern lässt sich das mit `strokeColor` und `fillColor`, mit der CSS-Eigenschaft `color` oder über Styles für die Pfade: Die eingebaute Regel hat die Spezifität null, Ihr CSS gewinnt also immer.

Manche Icons schneiden eine Lücke in sich selbst (der Schrägstrich in `visibility`, `microphone`, `video`, `volume` und `notification`, der Haken in `download`, der Ring um das Badge von `notification3`). Die Lücke nimmt den Seitenhintergrund an: weiß auf hellen Seiten und dunkel auf Seiten mit `color-scheme: dark`. Auf anderen Hintergründen setzen Sie sie mit der CSS-Variablen `--ua-knockout`, z. B. `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: Farbe und Linienstärke
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js und Server-Rendering {#nextjs-and-server-rendering}

Die Komponente ist mit `'use client'` markiert und zeichnet die Animation nur im Browser. Sie können sie daher aus Server Components und SSR-Frameworks (Next.js, Remix, Astro) rendern, ohne `dynamic(…, { ssr: false })`. Icon-Module sind reine Daten, Server Components können sie also importieren und als Props weitergeben.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Jedes Icon steht auch in einer [shadcn-Registry](https://ui.shadcn.com/docs/registry). Die CLI fügt eine fertige Komponente hinzu und installiert `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Die Komponente heißt `Animated` + die Icon-ID in PascalCase (`check-box` → `AnimatedCheckBox`), landet in `components/animations/<id>.tsx` und nimmt dieselben Props wie `UseAnimations`. Der Registry-Index liegt unter [/r/registry.json](/r/registry.json). Für die Kurzform `npx shadcn@latest add @useanimations/checkmark` tragen Sie die Registry in `components.json` ein:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Eigene Animation {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Ihre Animation muss eine Lottie-JSON-Datei sein, also im selben Format wie die Icons vorliegen. Der Player unterstützt alles, was die Icons brauchen: Formebenen, Präkompositionen, Null-Ebenen und Parenting, Pfade, Rechtecke, Ellipsen, Konturen, Füllungen, Trim Paths, Masken, Keyframes mit Easing, Hold-Keyframes und Bewegungspfade sowie die Expressions `loopOut()` und `wiggle()`. Alles andere, etwa Verläufe, Text- oder Bildebenen, Effekte und Matten, wird nicht gezeichnet; die Konsole warnt bei nicht unterstützten Ebenen, Formen und Expressions.

<div id="direct-urls"></div><div id="download"></div>

## Dateien & icons.json {#files--iconsjson}

Jedes Icon lässt sich auch herunterladen, von seiner Seite oder über stabile URLs mit aktiviertem CORS:

| Datei                     | URL                                                |
| ------------------------- | -------------------------------------------------- |
| Animation (Lottie JSON)   | `https://useanimations.com/icons/<id>.json`        |
| Statisches SVG je Zustand | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP mit JSON und SVGs     | `https://useanimations.com/icons/<id>.zip`         |
| Icon-Seite (nur Englisch) | `https://useanimations.com/icons/<id>`             |
| Katalog aller Icons       | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) listet jedes Icon mit ID, Titel, Kategorie, Suchbegriffen, Interaktion, Datei-URLs, Größe und Dauer sowie seinem `react-useanimations`-Import und dem shadcn-Befehl auf. Das npm-Paket liefert dieselben Daten mit: `react-useanimations/catalog.json` (Metadaten), `react-useanimations/icons` (die Animationen) und `react-useanimations/svg.json` (die statischen SVGs).

<div id="without-react"></div>

## Ohne React verwenden {#use-without-react}

Die Icons sind Standard-Lottie-JSON, jeder Lottie-Player kann sie also von `https://useanimations.com/icons/<id>.json` oder aus einer Kopie in Ihrem Projekt abspielen. Außerhalb von React verdrahten Sie die Interaktion selbst. Weitere Player und Beispiele finden Sie unter [Lottie-Icons](/lottie-icons).

Einige Icons nutzen After-Effects-Expressions (`loopOut()`, `wiggle()`); in [icons.json](/icons.json) sind sie mit `requiresFullPlayer` gekennzeichnet. Im Web brauchen sie den vollständigen Build von lottie-web, nicht `lottie_light`, und native Player werten keine Expressions aus.

<div id="html"></div><div id="interactions-web"></div>

### HTML und JavaScript {#html-and-javascript}

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
  // Hover: vorwärts beim Betreten, rückwärts beim Verlassen
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

Mit dem SVG-Renderer kann das Icon wie die React-Komponente die Textfarbe übernehmen:

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

Mit [lottie-ios](https://github.com/airbnb/lottie-ios) und dem JSON in Ihrem App-Bundle:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Mit [lottie-android](https://github.com/airbnb/lottie-android) in Jetpack Compose und dem JSON in `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

Mit dem Paket [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Performance & Barrierefreiheit {#performance--accessibility}

- **Klein:** Der Player ist gzip-komprimiert 8 kB groß und hat keine Abhängigkeiten; ein Icon hat 1 bis 15 kB (Median 2 kB).
- **Lazy:** Animationen werden nur im Browser gezeichnet, nachdem die Seite gerendert ist. Automatisch startende Loops pausieren, solange sie aus dem sichtbaren Bereich gescrollt sind, und beim Unmount wird alles aufgeräumt.
- **Standardmäßig dekorativ:** Icons sind für Screenreader verborgen (`aria-hidden`), solange Sie kein `aria-label` übergeben; mit Label werden sie als Bild angesagt. Für Bedienelemente, die nur aus einem Icon bestehen, nutzen Sie einen echten `<button>` mit `aria-label` (siehe [oben](#wrap-the-icon-in-a-real-button)) und geben den Toggle-Zustand mit `aria-pressed` oder `aria-expanded` wieder.
- **Reduzierte Bewegung und Touch:** Die Icons berücksichtigen `prefers-reduced-motion`, und Tippen auf Touchscreens löst keine Hover-Animationen aus.

<div id="agents"></div>

## KI-Coding-Agenten {#ai-coding-agents}

Agenten können Icons per Stichwort oder Interaktion aus [icons.json](/icons.json) oder aus `react-useanimations/catalog.json` im Paket auswählen und die dort angegebene Importzeile oder den shadcn-Befehl verwenden. Auch die Typdefinitionen jedes Icon-Imports enthalten Titel, Keywords, Interaktion und Vorschau. Diese Dokumentation gibt es als Markdown unter [/documentation.md](/documentation.md), und [/llms.txt](/llms.txt) indexiert die Website.

## Upgrade von v2 {#upgrading-from-v2}

Für die meisten Apps bedeutet das Upgrade nur, v3 zu installieren: Die Komponente, die Imports aus `react-useanimations/lib/<name>` und alle 79 Icons aus v2 bleiben gleich. Arbeiten Sie die folgenden Schritte ab, soweit sie Ihren Code betreffen.

### 1. v3 installieren {#1-install-v3}

v3 braucht React 18 oder neuer und hat keine Abhängigkeiten. Entfernen Sie auch lottie-web, sofern nichts anderes in Ihrer App es nutzt.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. `reverse` durch `active` ersetzen {#2-replace-reverse-with-active}

`active` ist vollständig kontrolliert: Das Icon animiert, wenn sich `active` ändert, und ein Klick allein schaltet es nicht um. Aktualisieren Sie den Wert also in `onClick`. `reverse` funktioniert weiterhin wie in v2 (es legt den Startzustand fest, und Klicks schalten das Icon um), ist aber veraltet. Beide wirken nur bei `click-toggle`-Icons: Die vier Pfeilkreise spielen jetzt per Klick erneut ab (siehe [Schritt 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Farben prüfen {#3-check-the-colors}

In v2 waren die Icons schwarz, solange Sie kein `strokeColor` gesetzt hatten. In v3 übernehmen sie die Textfarbe (`currentColor`), und `fillColor` ist standardmäßig gleich `strokeColor`. Icons in farbigem Text oder in Links ändern ihre Farbe also mit; sollen sie schwarz bleiben, setzen Sie die Farbe selbst:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. `wrapperStyle`, `pathCss` und `options` ersetzen {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** ist veraltet: Nutzen Sie `style`.
- **`pathCss`** wurde entfernt: Stylen Sie die Pfade über eine Klasse.
- **`options`** (Einstellungen für lottie-web) wurde zusammen mit lottie-web entfernt. Nutzen Sie die Props `loop`, `autoplay` und `speed`; für andere lottie-web-Optionen gibt es keine Entsprechung.

Werden `pathCss` oder `options` trotzdem übergeben, erscheint einmalig eine Warnung; die Werte werden ignoriert.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Wrapper-Element prüfen {#5-check-the-wrapper-element}

Der Wrapper ist jetzt ein `<span>` mit `inline-block` statt eines `<div>`. Er ist damit innerhalb von Buttons und Links gültig und sitzt auf der Textzeile. Passen Sie CSS an, das den Wrapper als `div` anspricht, und verteilen Sie `animationProps` im Prop `render` auf ein `<span>`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Icons sind jetzt für Screenreader verborgen (`aria-hidden`), solange Sie kein `aria-label` übergeben; ergänzen Sie eines bei Icons, die für sich allein eine Bedeutung tragen.

### 6. Icons mit geänderter Interaktion prüfen {#6-check-the-icons-whose-interaction-changed}

Die Interaktionen entsprechen jetzt denen auf useanimations.com. Soll sich ein Icon wie in v2 verhalten, übergeben Sie seine alte Interaktion:

| Icons                                                                                              | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* In v2 spielten diese Icons beim Betreten mit der Maus einmal ab und sprangen beim Verlassen an den Anfang zurück; `hover-replay` kommt dem am nächsten.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Imports aktualisieren {#7-update-imports}

Importieren Sie Icons nur noch als `react-useanimations/lib/<name>` oder aus `react-useanimations/icons`. Interne Dateipfade aus v2 wie `react-useanimations/lib/github/index` oder `react-useanimations/lib/github/github.json` lassen sich nicht mehr auflösen; das Lottie JSON ist die `animationData` des Icons:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Die Pfade unter `react-useanimations/utils` wurden entfernt. Importieren Sie die Typen aus dem Paket:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` ist jetzt `{ animationData, interaction }`; das Feld `animationKey` aus v2 gibt es nicht mehr. Selbst gebaute Objekte verwenden stattdessen `interaction`.

### Was sonst neu ist {#what-else-is-new}

221 zusätzliche Icons (300 insgesamt), mehrere Icons auf einmal aus `react-useanimations/icons`, Unterstützung für reduzierte Bewegung, Hover per Tastaturfokus, keine hängenbleibenden Hover-Animationen auf Touchscreens, Server-Rendering ohne Workarounds und eine [shadcn-Registry](#shadcnui).

## Lizenz {#license}

Die Icons und der Code stehen unter der [MIT-Lizenz](https://opensource.org/license/mit/): Sie dürfen sie in privaten und kommerziellen Projekten nutzen, verändern und weitergeben. Eine Namensnennung ist nicht erforderlich, freut uns aber:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Alle Bedingungen: [Lizenz & Nutzungsbedingungen](/licencing-and-terms).

## Häufige Fragen {#faq}

<details><summary>Ist useAnimations für kommerzielle Projekte kostenlos?</summary>

Ja. Die Icons und das Paket stehen unter der MIT-Lizenz, eine Namensnennung ist nicht erforderlich.

</details>

<details><summary>Wie ändere ich die Farbe eines Icons?</summary>

Icons übernehmen die Textfarbe. Ändern lässt sie sich mit `strokeColor` und `fillColor`, mit der CSS-Eigenschaft `color` oder über Styles für die Pfade. Siehe [Größe & Farbe](#size--color).

</details>

<details><summary>Funktioniert es auch ohne React?</summary>

Das Paket ist für React gedacht. Jedes Icon gibt es aber auch als Lottie-JSON-Datei, die lottie-web, lottie-ios, lottie-android, Flutter und React Native abspielen können, und als statisches SVG. Siehe [Ohne React verwenden](#use-without-react) und [Lottie-Icons](/lottie-icons).

</details>

<details><summary>Können KI-Coding-Agenten useAnimations nutzen?</summary>

Ja. Verweisen Sie sie auf [icons.json](/icons.json) und [/documentation.md](/documentation.md); das Paket selbst liefert `catalog.json` und dokumentierte Typen für jedes Icon mit.

</details>
