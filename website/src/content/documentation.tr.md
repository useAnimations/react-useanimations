# Dokümantasyon {#documentation}

useAnimations, React için 300 animasyonlu ikondan oluşan, ücretsiz ve MIT lisanslı bir kütüphanedir. Her ikon hazır bir etkileşimle gelir: döngüde oynar, tıklandığında oynar ya da hover’da oynar. İkonları `react-useanimations` paketiyle kullanabilir veya shadcn CLI ile projenize ekleyebilirsiniz.

<div id="quick-start-react"></div>

## Hızlı başlangıç {#quick-start}

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

İkon metin rengini izler ve kendi etkileşimini oynatır: `github`, üzerine geldiğiniz sürece döngüde oynar. Paketin hiçbir bağımlılığı yoktur; ikonları dahili bir oynatıcı (gzip ile 8 kB) SVG olarak çizer. Her ikon ayrı bir modül olduğu için bundle’ınıza yalnızca import ettiğiniz ikonlar girer.

## Etkileşimler {#interactions}

Her ikon, kendisi için tasarlanan etkileşimle gelir. Bunu `interaction` prop’uyla değiştirebilirsiniz.

| Etkileşim      | Ne yapar                                                               | Örnek ikonlar                        |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Kesintisiz oynar.                                                      | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Tıklandığında iki durum arasında geçiş yapar (önce ileri, sonra geri). | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Her tıklamada baştan oynar.                                            | `download`, `refresh`, `send`        |
| `hover`        | İmleç gelince ileri, ayrılınca geri oynar.                             | `archive`, `settings`, `trash`       |
| `hover-loop`   | Hover süresince döngüde oynar, imleç ayrılınca mevcut turu tamamlar.   | `github`, `twitter`, `dribbble`      |
| `hover-replay` | İmleç geldiğinde baştan bir kez oynar.                                 | `arrowRight`, `bluetooth`, `zap`     |

Kullanıcı azaltılmış hareketi tercih ettiğinde ikonlar sabit kalır: döngüler ilk karelerini gösterir, hover ve tekrar animasyonları oynamaz, geçiş ikonları ise anında yeni durumlarına geçer.

<div id="react"></div>

## Prop’lar {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Varsayılan       | Açıklama                                                                                                                            |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | `react-useanimations/lib/<name>` adresinden import edilen ikon ya da kendi animasyonunuz için `{ animationData, interaction }`.     |
| `size`        | `24`             | Genişlik ve yükseklik; sayılar piksel, string’ler ise `'1.5em'` gibi herhangi bir CSS uzunluğudur.                                  |
| `strokeColor` | `'currentColor'` | Çizgilerin rengi. Varsayılan olarak ikon metin rengini izler.                                                                       |
| `fillColor`   | `strokeColor`    | Dolgulu kısımların rengi, ör. beğenilmiş bir kalp.                                                                                  |
| `interaction` | ikona göre       | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'` ya da `'hover-replay'`.                                     |
| `active`      | —                | `click-toggle` ikonları için: `true` bitiş durumunu gösterir. Kontrollüdür: `onClick` içinde ayarlayın, tıklamalar onu değiştirmez. |
| `autoplay`    | ikona göre       | `loop` ikonlarında `true`; azaltılmış hareket tercih edildiğinde değil.                                                             |
| `loop`        | ikona göre       | `loop` ve `hover-loop` ikonlarında `true`.                                                                                          |
| `speed`       | `1`              | Oynatma hızı.                                                                                                                       |
| `render`      | —                | Özel bir wrapper için render prop’u, bkz. [İkonu gerçek bir düğmeye sarın](#wrap-the-icon-in-a-real-button).                        |

Diğer tüm prop’lar (`className`, `aria-label`, `onClick`, …) wrapper `<span>` öğesine gider. Sizin event handler’larınız animasyonunkilerden önce çalışır; animasyonu atlamak için `event.preventDefault()` çağırın.

## İkonları import etme {#importing-icons}

Her ikonu `react-useanimations/lib/<name>` adresinden ya da birkaçını birden `react-useanimations/icons` üzerinden import edin:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Her iki yöntemde de production build’ler yalnızca kullandığınız ikonları içerir. Dev sunucuları ve test runner’lar tree-shaking yapmaz; bu ortamlarda `react-useanimations/icons` tüm ikonları yükler. Bu sizin için önemliyse `lib/<name>` tercih edin. `delete` ve `package` ayrılmış kelimelerdir: bunları `deleteIcon` ve `packageIcon` olarak import edin.

## Kontrollü geçiş {#controlled-toggle}

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
      active={open} // `open` başka bir yerde değiştiğinde de animasyon oynar
      onClick={() => setOpen(!open)}
    />
  );
}
```

## İkonu gerçek bir düğmeye sarın {#wrap-the-icon-in-a-real-button}

Tıklanabilir ikonlarda `render` prop’uyla ikonun etrafına odaklanabilir bir öğe koyun: `eventProps` sizin öğenize, `animationProps` ise onun içindeki bir `<span>` öğesine gider. Böylece hover animasyonları, düğme klavye odağı aldığında da oynar.

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

## Boyut ve renk {#size--color}

İkonlar 24 ya da 32 px’lik bir artboard üzerinde çizilmiş çizgi ikonlardır ve her boyutta keskin kalır: `size` değerini piksel cinsinden bir sayıya ya da herhangi bir CSS uzunluğuna ayarlayın.

Çizgiler `currentColor` değerini izler; bu yüzden ikonlar metin rengini, hover durumlarını ve karanlık modu kendiliğinden alır. Renkleri `strokeColor` ve `fillColor` ile, CSS `color` ile ya da path’lere stil vererek değiştirin: dahili kuralın specificity değeri sıfırdır, yani her zaman sizin CSS’iniz kazanır.

Bazı ikonlar kendi içlerinde bir boşluk keser (`visibility`, `microphone`, `video`, `volume` ve `notification` ikonlarındaki eğik çizgi, `download` ikonundaki onay işareti, `notification3` ikonunun rozetinin etrafındaki halka). Bu boşluk sayfa arka planının rengini alır: açık sayfalarda beyaz, `color-scheme: dark` olan sayfalarda koyu. Başka arka planlarda bunu `--ua-knockout` CSS değişkeniyle ayarlayın, ör. `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: renk ve çizgi kalınlığı
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js ve sunucu tarafı render {#nextjs-and-server-rendering}

Bileşen `'use client'` olarak işaretlidir ve animasyonu yalnızca tarayıcıda çizer; bu yüzden onu server component’lerden ve SSR framework’lerinden (Next.js, Remix, Astro) `dynamic(…, { ssr: false })` kullanmadan render edebilirsiniz. İkon modülleri düz veridir; server component’ler onları import edip prop olarak geçebilir.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Her ikon aynı zamanda bir [shadcn registry](https://ui.shadcn.com/docs/registry) içinde yer alır. CLI hazır bir bileşen ekler ve `react-useanimations` paketini kurar:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Bileşenin adı `Animated` + PascalCase yazılmış ikon id’sidir (`check-box` → `AnimatedCheckBox`). Bileşen `components/animations/<id>.tsx` dosyasına eklenir ve `UseAnimations` ile aynı prop’ları alır. Registry dizini [/r/registry.json](/r/registry.json) adresindedir. Kısa yazım olan `npx shadcn@latest add @useanimations/checkmark` için registry’yi `components.json` dosyasına ekleyin:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Kendi animasyonunuz {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Animasyonunuz, ikonların da kullandığı format olan bir Lottie JSON dosyası olmalıdır. Oynatıcı, ikonların ihtiyaç duyduğu her şeyi destekler: shape layer’lar, precomposition’lar, null layer’lar ve parenting, path’ler, dikdörtgenler, elipsler, stroke’lar, fill’ler, trim path’ler, maskeler, easing’li keyframe’ler, hold’lar ve motion path’ler, ayrıca `loopOut()` ve `wiggle()` ifadeleri. Gradyanlar, metin ya da görsel katmanları, efektler ve matte’ler gibi diğer her şey çizilmez; konsol, desteklenmeyen layer, shape ve ifadeler için uyarı verir.

<div id="direct-urls"></div><div id="download"></div>

## Dosyalar ve icons.json {#files--iconsjson}

Her ikon ayrıca kendi sayfasından ya da CORS açık, kalıcı URL’lerden indirilebilir:

| Dosya                       | URL                                                |
| --------------------------- | -------------------------------------------------- |
| Animasyon (Lottie JSON)     | `https://useanimations.com/icons/<id>.json`        |
| Her durumun statik SVG’si   | `https://useanimations.com/icons/<id>/<state>.svg` |
| JSON ve SVG’leri içeren ZIP | `https://useanimations.com/icons/<id>.zip`         |
| İkon sayfası (İngilizce)    | `https://useanimations.com/icons/<id>`             |
| Tüm ikonların kataloğu      | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) her ikonu id, başlık, kategori, arama anahtar kelimeleri, etkileşim, dosya URL’leri, boyut ve süre bilgileriyle, `react-useanimations` import’u ve shadcn komutuyla birlikte listeler. npm paketi de aynı verileri içerir: `react-useanimations/catalog.json` (meta veriler), `react-useanimations/icons` (animasyonlar) ve `react-useanimations/svg.json` (statik SVG’ler).

<div id="without-react"></div>

## React olmadan kullanım {#use-without-react}

İkonlar standart Lottie JSON olduğu için her Lottie oynatıcısı onları `https://useanimations.com/icons/<id>.json` adresinden ya da projenizdeki bir kopyadan oynatabilir. React dışında etkileşimi kendiniz bağlarsınız. Daha fazla oynatıcı ve örnek için [Lottie ikonları](/lottie-icons) sayfasına bakın.

Bazı ikonlar After Effects ifadeleri (`loopOut()`, `wiggle()`) kullanır; [icons.json](/icons.json) içinde `requiresFullPlayer` bu ikonları işaretler. Web’de bu ikonlar `lottie_light` ile değil, lottie-web’in tam sürümüyle oynatılmalıdır; native oynatıcılar ise ifadeleri işlemez.

<div id="html"></div><div id="interactions-web"></div>

### HTML ve JavaScript {#html-and-javascript}

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
  // hover: imleç gelince ileri, ayrılınca geri
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

SVG renderer ile ikon, React bileşeninde olduğu gibi metin rengini izleyebilir:

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

[lottie-ios](https://github.com/airbnb/lottie-ios) ile, JSON uygulamanızın bundle’ındayken:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Jetpack Compose’da [lottie-android](https://github.com/airbnb/lottie-android) ile, JSON `res/raw` klasöründeyken:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

[lottie](https://pub.dev/packages/lottie) paketiyle:

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Performans ve erişilebilirlik {#performance--accessibility}

- **Küçük:** oynatıcı gzip ile 8 kB’tır ve bağımlılığı yoktur; bir ikon 1 ile 15 kB arasındadır (medyan 2 kB).
- **Lazy:** animasyonlar yalnızca tarayıcıda, sayfa render edildikten sonra çizilir; otomatik oynayan döngüler ekranın dışına kaydırıldığında duraklar ve unmount sırasında her şey temizlenir.
- **Varsayılan olarak dekoratif:** `aria-label` geçmediğiniz sürece ikonlar ekran okuyuculardan gizlenir (`aria-hidden`); `aria-label` geçerseniz görsel olarak duyurulur. Yalnızca ikondan oluşan kontrollerde `aria-label` içeren gerçek bir `<button>` kullanın ([yukarıya](#wrap-the-icon-in-a-real-button) bakın) ve geçiş durumunu `aria-pressed` ya da `aria-expanded` ile yansıtın.
- **Azaltılmış hareket ve dokunmatik ekranlar:** ikonlar `prefers-reduced-motion` tercihine uyar; dokunmatik ekranlardaki dokunuşlar hover animasyonlarını tetiklemez.

<div id="agents"></div>

## Yapay zekâ kodlama ajanları {#ai-coding-agents}

Ajanlar [icons.json](/icons.json) dosyasından ya da paketin içindeki `react-useanimations/catalog.json` dosyasından anahtar kelimeye veya etkileşime göre ikon seçebilir ve orada listelenen import satırını ya da shadcn komutunu kullanabilir. Her ikon import’unun tip tanımları da ikonun başlığını, anahtar kelimelerini, etkileşimini ve önizlemesini taşır. Bu dokümantasyon [/documentation.md](/documentation.md) adresinde Markdown olarak da mevcuttur; [/llms.txt](/llms.txt) ise sitenin dizinini sunar.

## v2’den yükseltme {#upgrading-from-v2}

Çoğu uygulama için yükseltme, v3’ü kurmaktan ibarettir: bileşen, `react-useanimations/lib/<name>` import’ları ve v2’deki 79 ikonun tamamı aynı kalır. Aşağıdaki adımlardan kodunuzu ilgilendirenleri uygulayın.

### 1. v3’ü kurun {#1-install-v3}

v3, React 18 ya da daha yenisini gerektirir ve hiçbir bağımlılığı yoktur. Uygulamanızda başka bir yer kullanmıyorsa lottie-web’i de kaldırın.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. `reverse` yerine `active` kullanın {#2-replace-reverse-with-active}

`active` tamamen kontrollüdür: `active` değiştiğinde ikon animasyon oynatır, tek başına bir tıklama ise onu değiştirmez; bu yüzden değeri `onClick` içinde güncelleyin. `reverse` hâlâ v2’deki gibi çalışır (başlangıç durumunu belirler ve tıklamalar ikonu değiştirir), ancak kullanımdan kaldırılmıştır (deprecated). İkisi de yalnızca `click-toggle` ikonları için geçerlidir: daire içindeki dört ok ikonu artık tıklandığında baştan oynar (bkz. [6. adım](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Renkleri kontrol edin {#3-check-the-colors}

v2 ikonları, `strokeColor` ayarlamadığınız sürece siyahtı. v3 ikonları metin rengini (`currentColor`) izler ve `fillColor` varsayılan olarak `strokeColor` değerini alır. Renkli metin ya da bağlantıların içindeki ikonların rengi de onlarla birlikte değişir; siyah kalmalarını istiyorsanız rengi kendiniz ayarlayın:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. `wrapperStyle`, `pathCss` ve `options` yerine yenilerini kullanın {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** kullanımdan kaldırıldı: `style` kullanın.
- **`pathCss`** kaldırıldı: path’lere bir class ile stil verin.
- **`options`** (lottie-web ayarları) lottie-web ile birlikte kaldırıldı. `loop`, `autoplay` ve `speed` prop’larını kullanın; lottie-web’in diğer seçeneklerinin bir karşılığı yok.

`pathCss` ya da `options` yine de geçilirse bir kez uyarı loglanır ve bunlar yok sayılır.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Wrapper öğesini kontrol edin {#5-check-the-wrapper-element}

Wrapper artık bir `<div>` değil, inline-block bir `<span>`; böylece düğmelerin ve bağlantıların içinde geçerli HTML olur ve metin satırında durur. Wrapper’ı `div` olarak hedefleyen CSS’i güncelleyin ve `render` prop’unda `animationProps` değerini bir `<span>` öğesine verin:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

İkonlar artık `aria-label` geçmediğiniz sürece ekran okuyuculardan gizlenir (`aria-hidden`); tek başına anlam taşıyan ikonlara bir etiket ekleyin.

### 6. Etkileşimi değişen ikonları kontrol edin {#6-check-the-icons-whose-interaction-changed}

Etkileşimler artık useanimations.com ile aynı. Bir ikonun v2’deki gibi davranmasını istiyorsanız eski etkileşimini geçin:

| İkonlar                                                                                            | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* v2 bu ikonları imleç gelince bir kez oynatıyor, imleç ayrılınca başa atlatıyordu; en yakın karşılık `hover-replay`.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Import’ları güncelleyin {#7-update-imports}

İkonları yalnızca `react-useanimations/lib/<name>` olarak ya da `react-useanimations/icons` üzerinden import edin. v2’nin `react-useanimations/lib/github/index` ya da `react-useanimations/lib/github/github.json` gibi dahili dosya yolları artık çözümlenmez; Lottie JSON, ikonun `animationData` alanıdır:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

`react-useanimations/utils` yolları kaldırıldı. Tipleri paketin kendisinden import edin:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` artık `{ animationData, interaction }` şeklindedir; v2’deki `animationKey` alanı kaldırıldı, bu yüzden kendi oluşturduğunuz nesnelerde bunun yerine `interaction` kullanın.

### Başka neler yeni {#what-else-is-new}

221 yeni ikon (toplam 300), `react-useanimations/icons` üzerinden birden fazla ikonu tek seferde import etme, azaltılmış hareket desteği, klavye odağında hover, dokunmatik ekranlarda takılı kalmayan hover animasyonları, geçici çözüm gerektirmeyen sunucu tarafı render ve bir [shadcn registry](#shadcnui).

## Lisans {#license}

İkonlar ve kod [MIT lisansı](https://opensource.org/license/mit/) ile yayımlanır: kişisel ve ticari işlerde kullanabilir, değiştirebilir ve yeniden dağıtabilirsiniz. Atıf zorunlu değildir ama memnuniyetle karşılanır:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Tüm koşullar: [Lisans ve koşullar](/licencing-and-terms).

## Sık sorulan sorular {#faq}

<details><summary>useAnimations ticari projelerde ücretsiz mi?</summary>

Evet. İkonlar ve paket MIT lisanslıdır; atıf gerekmez.

</details>

<details><summary>Bir ikonun rengini nasıl değiştiririm?</summary>

İkonlar metin rengini izler. Rengi `strokeColor` ve `fillColor` ile, CSS `color` ile ya da path’lere stil vererek değiştirebilirsiniz. Bkz. [Boyut ve renk](#size--color).

</details>

<details><summary>React olmadan da çalışır mı?</summary>

Paket React içindir. Ancak her ikon aynı zamanda lottie-web, lottie-ios, lottie-android, Flutter ve React Native’in oynatabildiği bir Lottie JSON dosyası ve statik bir SVG’dir. Bkz. [React olmadan kullanım](#use-without-react) ve [Lottie ikonları](/lottie-icons).

</details>

<details><summary>Yapay zekâ kodlama ajanları useAnimations’ı kullanabilir mi?</summary>

Evet. Onları [icons.json](/icons.json) ve [/documentation.md](/documentation.md) adreslerine yönlendirin; paketin kendisi de `catalog.json` dosyasını ve her ikon için belgelenmiş tipleri içerir.

</details>
