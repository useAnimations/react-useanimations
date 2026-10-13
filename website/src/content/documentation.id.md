# Dokumentasi {#documentation}

useAnimations adalah pustaka 300 ikon animasi untuk React yang gratis dan berlisensi MIT. Setiap ikon sudah punya interaksi bawaan: berputar terus (loop), diputar saat diklik, atau diputar saat di-hover. Pakai lewat paket `react-useanimations` atau tambahkan dengan CLI shadcn.

<div id="quick-start-react"></div>

## Mulai cepat {#quick-start}

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

Ikon mengikuti warna teks dan menjalankan interaksinya sendiri: `github` berputar berulang selama di-hover. Paket ini tanpa dependensi; player bawaan (8 kB setelah gzip) menggambar ikon sebagai SVG, dan setiap ikon adalah modul terpisah, jadi bundle Anda hanya berisi ikon yang Anda import.

## Interaksi {#interactions}

Setiap ikon hadir dengan interaksi yang dirancang untuknya. Ganti dengan prop `interaction`.

| Interaksi      | Yang terjadi                                                               | Contoh ikon                          |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------ |
| `loop`         | Berputar terus-menerus.                                                    | `loading`, `activity`, `alertCircle` |
| `click-toggle` | Beralih antara dua keadaan saat diklik (maju, lalu mundur).                | `menu`, `checkBox`, `playPause`      |
| `click-replay` | Diputar ulang dari awal setiap kali diklik.                                | `download`, `refresh`, `send`        |
| `hover`        | Diputar maju saat kursor masuk dan mundur saat kursor keluar.              | `archive`, `settings`, `trash`       |
| `hover-loop`   | Berputar berulang selama di-hover dan menyelesaikan siklusnya saat keluar. | `github`, `twitter`, `dribbble`      |
| `hover-replay` | Diputar sekali dari awal saat kursor masuk.                                | `arrowRight`, `bluetooth`, `zap`     |

Jika pengguna memilih reduced motion, ikon tetap diam: loop menampilkan frame pertamanya, animasi hover dan replay tidak diputar, dan toggle langsung berpindah ke keadaan barunya.

<div id="react"></div>

## Props {#props}

```jsx
<UseAnimations animation={github} size={56} strokeColor="#4b5cff" style={{ padding: 8 }} />
```

| Prop          | Default          | Keterangan                                                                                                                   |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `animation`   | —                | Ikon yang di-import dari `react-useanimations/lib/<name>`, atau `{ animationData, interaction }` untuk animasi Anda sendiri. |
| `size`        | `24`             | Lebar dan tinggi; angka berarti piksel, string bisa berupa panjang CSS apa pun seperti `'1.5em'`.                            |
| `strokeColor` | `'currentColor'` | Warna garis (stroke). Secara default ikon mengikuti warna teks.                                                              |
| `fillColor`   | `strokeColor`    | Warna bagian yang terisi, misalnya hati yang disukai.                                                                        |
| `interaction` | per ikon         | `'loop'`, `'click-toggle'`, `'click-replay'`, `'hover'`, `'hover-loop'`, atau `'hover-replay'`.                              |
| `active`      | —                | Untuk ikon `click-toggle`: `true` menampilkan keadaan akhir. Dikendalikan: atur di `onClick`, klik tidak men-toggle-nya.     |
| `autoplay`    | per ikon         | `true` untuk ikon `loop`, kecuali pengguna memilih reduced motion.                                                           |
| `loop`        | per ikon         | `true` untuk ikon `loop` dan `hover-loop`.                                                                                   |
| `speed`       | `1`              | Kecepatan pemutaran.                                                                                                         |
| `render`      | —                | Render prop untuk wrapper kustom, lihat [Bungkus ikon dengan tombol sungguhan](#wrap-the-icon-in-a-real-button).             |

Prop lainnya (`className`, `aria-label`, `onClick`, …) diteruskan ke `<span>` pembungkus. Event handler Anda dijalankan sebelum handler animasi; panggil `event.preventDefault()` untuk melewati animasinya.

## Meng-import ikon {#importing-icons}

Import setiap ikon dari `react-useanimations/lib/<name>`, atau beberapa sekaligus dari `react-useanimations/icons`:

```jsx
import { github, heart, menu } from 'react-useanimations/icons';
```

Dengan cara mana pun, build produksi hanya menyertakan ikon yang Anda pakai. Dev server dan test runner tidak melakukan tree-shaking, jadi di sana `react-useanimations/icons` memuat semua ikon; pakai `lib/<name>` jika hal itu berpengaruh. `delete` dan `package` adalah kata yang dicadangkan: import keduanya sebagai `deleteIcon` dan `packageIcon`.

## Toggle yang dikendalikan {#controlled-toggle}

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
      active={open} // juga beranimasi saat `open` diubah dari tempat lain
      onClick={() => setOpen(!open)}
    />
  );
}
```

## Bungkus ikon dengan tombol sungguhan {#wrap-the-icon-in-a-real-button}

Untuk ikon yang bisa diklik, bungkus ikon dengan elemen yang bisa difokus melalui prop `render`: `eventProps` dipasang di elemen Anda dan `animationProps` di `<span>` di dalamnya. Dengan begitu, animasi hover juga diputar saat tombol mendapat fokus keyboard.

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

## Ukuran & warna {#size--color}

Ikon-ikon ini adalah ikon garis yang digambar di artboard 24 atau 32 px dan tetap tajam di ukuran berapa pun: atur `size` dengan angka dalam piksel atau panjang CSS apa pun.

Garisnya mengikuti `currentColor`, jadi ikon otomatis mengikuti warna teks, keadaan hover, dan dark mode. Ubah dengan `strokeColor` dan `fillColor`, dengan properti CSS `color`, atau beri style langsung pada path-nya: aturan bawaannya punya specificity nol, jadi CSS Anda selalu menang.

Beberapa ikon punya celah yang memotong bentuknya sendiri (garis miring pada `visibility`, `microphone`, `video`, `volume`, dan `notification`, tanda centang pada `download`, cincin di sekitar badge `notification3`). Celah ini mengambil warna latar halaman: putih di halaman terang dan gelap di halaman dengan `color-scheme: dark`. Untuk latar lain, atur dengan variabel CSS `--ua-knockout`, misalnya `body { --ua-knockout: #0f172a; }`.

```jsx
// Tailwind: warna dan ketebalan garis
<UseAnimations animation={github} className="text-indigo-500 [&_path]:stroke-[3]" />
```

## Next.js dan server rendering {#nextjs-and-server-rendering}

Komponen ini ditandai `'use client'` dan hanya menggambar animasi di browser, jadi Anda bisa me-render-nya dari server component dan framework SSR (Next.js, Remix, Astro) tanpa `dynamic(…, { ssr: false })`. Modul ikon hanyalah data biasa, sehingga server component bisa meng-import-nya dan meneruskannya sebagai props.

<div id="shadcn"></div>

## shadcn/ui {#shadcnui}

Setiap ikon juga tersedia di [registry shadcn](https://ui.shadcn.com/docs/registry). CLI-nya menambahkan komponen siap pakai dan memasang `react-useanimations`:

```bash
npx shadcn@latest add https://useanimations.com/r/checkmark.json
```

```tsx
import { AnimatedCheckmark } from '@/components/animations/checkmark';

<AnimatedCheckmark size={24} />;
```

Nama komponennya adalah `Animated` + id ikon dalam PascalCase (`check-box` → `AnimatedCheckBox`), file-nya ditempatkan di `components/animations/<id>.tsx`, dan komponennya menerima props yang sama dengan `UseAnimations`. Indeks registry ada di [/r/registry.json](/r/registry.json). Untuk bentuk singkat `npx shadcn@latest add @useanimations/checkmark`, tambahkan registry ke `components.json`:

```json
{
  "registries": {
    "@useanimations": "https://useanimations.com/r/{name}.json"
  }
}
```

## Animasi Anda sendiri {#your-own-animation}

```jsx
import animationData from './my-animation.json';

<UseAnimations animation={{ animationData, interaction: 'hover' }} />;
```

Animasi Anda harus berupa file Lottie JSON, format yang sama dengan ikon-ikon ini. Player-nya mendukung apa yang dibutuhkan ikon: shape layer, precomposition, null layer dan parenting, path, persegi panjang, elips, stroke, fill, trim path, mask, keyframe dengan easing, hold, dan motion path, serta expression `loopOut()` dan `wiggle()`. Selain itu, misalnya gradien, text layer atau image layer, efek, dan matte, tidak digambar; console akan memberi peringatan tentang layer, shape, dan expression yang tidak didukung.

<div id="direct-urls"></div><div id="download"></div>

## File & icons.json {#files--iconsjson}

Setiap ikon juga bisa diunduh, dari halaman ikonnya (dalam bahasa Inggris) atau dari URL tetap dengan CORS aktif:

| File                            | URL                                                |
| ------------------------------- | -------------------------------------------------- |
| Animasi (Lottie JSON)           | `https://useanimations.com/icons/<id>.json`        |
| SVG statis untuk setiap keadaan | `https://useanimations.com/icons/<id>/<state>.svg` |
| ZIP berisi JSON dan SVG         | `https://useanimations.com/icons/<id>.zip`         |
| Halaman ikon                    | `https://useanimations.com/icons/<id>`             |
| Katalog semua ikon              | `https://useanimations.com/icons.json`             |

[icons.json](/icons.json) memuat daftar semua ikon beserta id, judul, kategori, kata kunci pencarian, interaksi, URL file, ukuran dan durasi, baris import `react-useanimations`, serta perintah shadcn-nya. Paket npm juga menyertakan data yang sama: `react-useanimations/catalog.json` (metadata), `react-useanimations/icons` (animasinya), dan `react-useanimations/svg.json` (SVG statisnya).

<div id="without-react"></div>

## Memakai tanpa React {#use-without-react}

Ikon-ikon ini adalah Lottie JSON standar, jadi Lottie player mana pun bisa memutarnya dari `https://useanimations.com/icons/<id>.json` atau dari salinan di proyek Anda. Di luar React, interaksinya Anda pasang sendiri. Halaman [Ikon Lottie](/lottie-icons) berisi lebih banyak player dan contoh.

Beberapa ikon memakai expression After Effects (`loopOut()`, `wiggle()`); `requiresFullPlayer` menandainya di [icons.json](/icons.json). Di web, ikon-ikon ini memerlukan build lengkap lottie-web, bukan `lottie_light`, dan player native tidak mengevaluasi expression.

<div id="html"></div><div id="interactions-web"></div>

### HTML dan JavaScript {#html-and-javascript}

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
  // hover: maju saat kursor masuk, mundur saat keluar
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

Dengan renderer SVG, ikon bisa mengikuti warna teks seperti komponen React:

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

Dengan [lottie-ios](https://github.com/airbnb/lottie-ios) dan file JSON di dalam bundle aplikasi Anda:

```swift
import Lottie
import SwiftUI

LottieView(animation: .named("loading"))
  .looping()
  .frame(width: 48, height: 48)
```

<div id="android"></div>

### Android {#android}

Dengan [lottie-android](https://github.com/airbnb/lottie-android) di Jetpack Compose dan file JSON di `res/raw`:

```kotlin
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading))
LottieAnimation(composition, iterations = LottieConstants.IterateForever, modifier = Modifier.size(48.dp))
```

### Flutter {#flutter}

Dengan paket [lottie](https://pub.dev/packages/lottie):

```dart
Lottie.asset('assets/loading.json', width: 48, height: 48)
```

<div id="performance"></div><div id="accessibility"></div>

## Performa & aksesibilitas {#performance--accessibility}

- **Kecil:** player-nya berukuran 8 kB setelah gzip tanpa dependensi, dan satu ikon berukuran 1 sampai 15 kB (median 2 kB).
- **Lazy:** animasi hanya digambar di browser, setelah halaman selesai di-render; loop yang berputar otomatis berhenti sementara saat digulir keluar dari layar, dan semuanya dibersihkan saat unmount.
- **Dekoratif secara default:** ikon disembunyikan dari pembaca layar (`aria-hidden`) kecuali Anda memberikan `aria-label`, yang membuatnya dibacakan sebagai gambar. Untuk kontrol yang hanya berisi ikon, pakai `<button>` sungguhan dengan `aria-label` (lihat [di atas](#wrap-the-icon-in-a-real-button)) dan tunjukkan keadaan toggle dengan `aria-pressed` atau `aria-expanded`.
- **Reduced motion dan layar sentuh:** ikon menghormati `prefers-reduced-motion`, dan ketukan di layar sentuh tidak memicu animasi hover.

<div id="agents"></div>

## Coding agent AI {#ai-coding-agents}

Agen bisa memilih ikon berdasarkan kata kunci atau interaksi dari [icons.json](/icons.json), atau dari `react-useanimations/catalog.json` di dalam paket, lalu memakai baris import atau perintah shadcn yang tercantum di sana. Definisi tipe setiap import ikon juga memuat judul, kata kunci, interaksi, dan pratinjaunya. Dokumentasi ini tersedia dalam format Markdown di [/documentation.md](/documentation.md), dan [/llms.txt](/llms.txt) berisi indeks situs.

## Upgrade dari v2 {#upgrading-from-v2}

Bagi kebanyakan aplikasi, upgrade cukup dengan memasang v3: komponennya, import `react-useanimations/lib/<name>`, dan ke-79 ikon v2 tetap sama. Ikuti langkah-langkah di bawah yang relevan dengan kode Anda.

### 1. Pasang v3 {#1-install-v3}

v3 memerlukan React 18 atau yang lebih baru dan tidak punya dependensi. Hapus juga lottie-web, kecuali masih dipakai bagian lain di aplikasi Anda.

```bash
npm install react-useanimations@3
npm uninstall lottie-web
```

### 2. Ganti `reverse` dengan `active` {#2-replace-reverse-with-active}

`active` sepenuhnya dikendalikan: ikon beranimasi saat `active` berubah, dan klik saja tidak men-toggle-nya, jadi perbarui nilainya di `onClick`. `reverse` masih bekerja seperti di v2 (menentukan keadaan awal, dan klik men-toggle ikon), tetapi sudah deprecated. Keduanya hanya berlaku untuk ikon `click-toggle`: keempat ikon lingkaran panah kini diputar ulang saat diklik (lihat [langkah 6](#6-check-the-icons-whose-interaction-changed)).

```diff
- <UseAnimations animation={checkBox} reverse={checked} onClick={toggle} />
+ <UseAnimations animation={checkBox} active={checked} onClick={toggle} />
```

### 3. Periksa warnanya {#3-check-the-colors}

Ikon v2 berwarna hitam kecuali Anda mengatur `strokeColor`. Ikon v3 mengikuti warna teks (`currentColor`), dan `fillColor` secara default sama dengan `strokeColor`. Ikon di dalam teks atau tautan berwarna akan ikut berubah warna; agar tetap hitam, atur warnanya sendiri:

```jsx
<UseAnimations animation={github} strokeColor="#000" />
```

### 4. Pindahkan `wrapperStyle`, `pathCss`, dan `options` {#4-move-wrapperstyle-pathcss-and-options}

- **`wrapperStyle`** sudah deprecated: pakai `style`.
- **`pathCss`** sudah dihapus: beri style pada path-nya dengan class.
- **`options`** (pengaturan lottie-web) dihapus bersama lottie-web. Pakai props `loop`, `autoplay`, dan `speed`; opsi lottie-web lainnya tidak punya padanan.

Jika `pathCss` atau `options` tetap diberikan, akan muncul satu kali peringatan di console; keduanya diabaikan.

```diff
- <UseAnimations animation={github} wrapperStyle={{ margin: 8 }} pathCss="stroke-width: 3px;" options={{ loop: true }} />
+ <UseAnimations animation={github} style={{ margin: 8 }} className="thick" loop />
```

```css
.thick path {
  stroke-width: 3px;
}
```

### 5. Periksa elemen pembungkus {#5-check-the-wrapper-element}

Pembungkusnya kini berupa `<span>` inline-block, bukan `<div>`, sehingga valid di dalam tombol dan tautan dan berada sejajar dengan baris teks. Perbarui CSS yang menargetkan pembungkus sebagai `div`, dan sebarkan `animationProps` ke `<span>` di dalam prop `render`:

```diff
  render={(eventProps, animationProps) => (
    <button type="button" aria-label="Like" {...eventProps}>
-     <div {...animationProps} />
+     <span {...animationProps} />
    </button>
  )}
```

Ikon kini disembunyikan dari pembaca layar (`aria-hidden`) kecuali Anda memberikan `aria-label`; tambahkan label pada ikon yang punya makna sendiri.

### 6. Periksa ikon yang interaksinya berubah {#6-check-the-icons-whose-interaction-changed}

Interaksi kini sama dengan yang ada di useanimations.com. Jika sebuah ikon harus berperilaku seperti di v2, berikan interaksi lamanya:

| Ikon                                                                                               | v2               | v3             |
| -------------------------------------------------------------------------------------------------- | ---------------- | -------------- |
| `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle`, `arrowUpCircle`                          | `click-toggle`   | `click-replay` |
| `calendar`, `folder`, `home`, `instagram`, `userMinus`, `userPlus`, `userX`, `youtube`, `youtube2` | `hover-replay`\* | `hover`        |
| `behance`, `codepen`, `facebook`, `github`, `linkedin`, `pocket`, `twitter`                        | `hover-replay`\* | `hover-loop`   |
| `copy`, `edit`, `mail`                                                                             | `click-replay`   | `hover`        |
| `dribbble`                                                                                         | `hover`          | `hover-loop`   |
| `zoomIn`, `zoomOut`                                                                                | `loop`           | `hover`        |

\* v2 memutar ikon-ikon ini sekali saat kursor masuk dan melompat kembali ke awal saat kursor keluar; `hover-replay` adalah yang paling mendekati.

```jsx
<UseAnimations animation={zoomIn} interaction="loop" />
```

### 7. Perbarui import {#7-update-imports}

Import ikon hanya sebagai `react-useanimations/lib/<name>` atau dari `react-useanimations/icons`. Path file internal v2 seperti `react-useanimations/lib/github/index` atau `react-useanimations/lib/github/github.json` tidak bisa di-resolve lagi; Lottie JSON-nya kini ada di `animationData` milik ikon:

```diff
- import githubJson from 'react-useanimations/lib/github/github.json';
+ import github from 'react-useanimations/lib/github';
+ const githubJson = github.animationData;
```

Path `react-useanimations/utils` sudah dihapus. Import tipenya dari paket utama:

```diff
- import type { Animation, AnimationKey } from 'react-useanimations/utils';
+ import type { Animation, AnimationKey, Interaction, UseAnimationsProps } from 'react-useanimations';
```

`Animation` kini berbentuk `{ animationData, interaction }`; field `animationKey` dari v2 sudah tidak ada, jadi objek yang Anda buat sendiri memakai `interaction` sebagai gantinya.

### Apa lagi yang baru {#what-else-is-new}

221 ikon tambahan (total 300), import beberapa ikon sekaligus dari `react-useanimations/icons`, dukungan reduced motion, hover saat fokus keyboard, tidak ada lagi animasi hover yang macet di layar sentuh, server rendering tanpa trik tambahan, dan [registry shadcn](#shadcnui).

## Lisensi {#license}

Ikon dan kodenya dirilis di bawah [lisensi MIT](https://opensource.org/license/mit/): Anda bebas memakai, mengubah, dan mendistribusikannya ulang untuk proyek pribadi maupun komersial. Atribusi tidak wajib, tetapi kami hargai:

```html
Animated icons by <a href="https://useanimations.com">useAnimations</a>
```

Ketentuan lengkap: [Lisensi & Ketentuan](/licencing-and-terms).

## FAQ {#faq}

<details><summary>Apakah useAnimations gratis untuk proyek komersial?</summary>

Ya. Ikon dan paketnya berlisensi MIT, tanpa kewajiban atribusi.

</details>

<details><summary>Bagaimana cara mengubah warna ikon?</summary>

Ikon mengikuti warna teks. Ubah dengan `strokeColor` dan `fillColor`, properti CSS `color`, atau dengan memberi style pada path-nya. Lihat [Ukuran & warna](#size--color).

</details>

<details><summary>Apakah bisa dipakai tanpa React?</summary>

Paketnya khusus untuk React. Namun setiap ikon juga tersedia sebagai file Lottie JSON yang bisa diputar oleh lottie-web, lottie-ios, lottie-android, Flutter, dan React Native, serta sebagai SVG statis. Lihat [Memakai tanpa React](#use-without-react) dan [Ikon Lottie](/lottie-icons).

</details>

<details><summary>Bisakah coding agent AI memakai useAnimations?</summary>

Bisa. Arahkan agen ke [icons.json](/icons.json) dan [/documentation.md](/documentation.md); paketnya sendiri menyertakan `catalog.json` dan tipe yang terdokumentasi untuk setiap ikon.

</details>
