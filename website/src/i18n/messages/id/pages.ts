import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { listIn } from '../../format';

const list = listIn('id');
const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Semua ${count} ikon animasi per kategori`,
      `Semua ${count} ikon animasi`,
    ],
    descriptions: (count: number, categories: number) => [
      `Semua ikon useAnimations dalam satu halaman: ${count} ikon animasi gratis dalam ${categories} kategori, untuk React, shadcn/ui, Lottie JSON, dan SVG. Berlisensi MIT.`,
    ],
    title: 'Semua ikon animasi',
    badge: (count: number) => `${count} ikon · Berlisensi MIT`,
    introHtml: (browser: string) =>
      `Semua ikon dalam koleksi, dikelompokkan per kategori. Buka salah satunya untuk melihat pratinjau langsung, kode React dan shadcn/ui, serta unduhan Lottie JSON, SVG, dan ZIP (halaman ikon tersedia dalam bahasa Inggris). Untuk mencari berdasarkan kata kunci dan mencoba animasinya langsung, pakai ${link(browser, 'penjelajah ikon')}.`,
    categoriesNav: 'Kategori',
    byInteraction: 'Berdasarkan interaksi:',
    categoryLink: (count: number, name: string) => `${count} ikon ${name.toLowerCase()} →`,
  },

  categories: {
    titles: (categories: number) => [
      `Kategori ikon animasi: ${categories} koleksi`,
      'Kategori ikon animasi',
    ],
    descriptions: (icons: number, categories: number) => [
      `Jelajahi ${icons} ikon animasi gratis dalam ${categories} kategori: navigasi, aksi, media, loading, media sosial, dan lainnya. Untuk React, shadcn/ui, dan Lottie.`,
    ],
    title: 'Kategori ikon animasi',
    badge: (icons: number, categories: number) => `${icons} ikon · ${categories} kategori`,
    introHtml: (interactions: string) =>
      `Setiap ikon useAnimations masuk ke satu kategori, mulai dari panah navigasi dan kontrol media hingga loader dan logo media sosial. Buka sebuah kategori untuk melihat semua ikonnya, tempat memakainya, dan kode untuk menambahkannya, atau jelajahi berdasarkan ${link(interactions, 'interaksi')}.`,
    iconCount: (n: number) => `${n} ikon`,
  },

  interactions: {
    titles: ['Interaksi mikro: ikon hover, klik, dan loop', 'Interaksi mikro untuk ikon animasi'],
    descriptions: (icons: number, interactions: number) => [
      `${icons} ikon animasi dalam ${interactions} interaksi mikro: loop, toggle dan putar ulang saat klik, hover, serta putar sekali dan loop saat hover. Mendukung reduced motion.`,
      `${icons} ikon animasi dalam ${interactions} interaksi mikro: loop, klik, dan hover. Mendukung reduced motion.`,
    ],
    title: 'Interaksi ikon animasi',
    badge: (interactions: number, icons: number) => `${interactions} interaksi · ${icons} ikon`,
    introHtml: `Setiap ikon hadir dengan interaksi mikro yang dirancang untuknya: berputar terus, beralih atau diputar ulang saat diklik, atau diputar saat di-hover. Komponen React mengatur semuanya dan menghormati preferensi reduced motion, sedangkan prop <code class="font-mono text-base text-fg">interaction</code> bisa mengganti interaksi ikon mana pun.`,
    iconCount: (n: number) => `${n} ikon`,
    chooseTitle: 'Memilih interaksi',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Keadaan yang berlangsung lama')}, seperti loading atau peringatan yang aktif: ${link(href, 'loop')}.`,
      'click-toggle': (href: string) =>
        `${strong('Kontrol nyala/mati')}, seperti bisukan, menu, atau tampilkan kata sandi: ${link(href, 'toggle saat klik')}, dengan ${code('active')} untuk state yang dikendalikan.`,
      'click-replay': (href: string) =>
        `${strong('Aksi sekali jalan')}, seperti kirim, simpan, atau muat ulang: ${link(href, 'putar ulang saat klik')}.`,
      hover: (href: string) =>
        `${strong('Petunjuk tentang apa yang dibuka sebuah tautan')}: ${link(href, 'hover')}, yang berbalik saat pointer keluar.`,
      'hover-replay': (href: string) =>
        `${strong('Toolbar dan daftar yang sering dilintasi kursor')}: ${link(href, 'putar sekali saat hover')}, yang selesai dengan sendirinya.`,
      'hover-loop': (href: string) =>
        `${strong('Tautan yang mengundang untuk dilihat lebih lama')}, seperti ikon media sosial: ${link(href, 'loop saat hover')}.`,
    },
    motionTitle: 'Reduced motion',
    motionHtml: `Komponen React mengikuti ${code('prefers-reduced-motion')} dan ikut menyesuaikan saat pengaturannya berubah. Ketukan di layar sentuh tidak pernah memulai animasi hover.`,
    reducedMotion: {
      loop: 'ikon tidak berputar otomatis dan tetap diam di frame pertamanya.',
      'click-toggle': 'klik langsung memindahkan ikon ke keadaan lainnya, tanpa animasi peralihan.',
      'click-replay': 'klik tetap sampai ke handler Anda, tetapi animasinya tidak diputar.',
      hover: 'hover tidak memutar animasinya.',
      'hover-replay': 'hover tidak memutar animasinya.',
      'hover-loop': 'ikon tetap diam saat di-hover.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Ikon Lottie gratis: ${count} ikon animasi JSON`,
      'Ikon Lottie gratis',
    ],
    descriptions: (count: number) => [
      `${count} ikon Lottie gratis berupa Lottie JSON, berlisensi MIT. Kode siap salin untuk lottie-web, dotLottie, React, React Native, iOS, Android, dan Flutter.`,
      `${count} ikon Lottie gratis dalam format Lottie JSON, berlisensi MIT. Kode siap salin untuk web, React, iOS, Android, dan Flutter.`,
    ],
    title: 'Ikon Lottie gratis',
    crumb: 'Ikon Lottie',
    datasetName: 'Katalog ikon useAnimations',
    datasetDescription: (count: number) =>
      `Metadata dan URL file dari ${count} ikon animasi Lottie: id, judul, kategori, kata kunci, interaksi, ukuran, dan durasi.`,
    badge: (count: number) => `${count} ikon · Lottie JSON · Berlisensi MIT`,
    intro:
      'Setiap ikon useAnimations adalah animasi Lottie JSON standar, jadi bisa diputar oleh Lottie player mana pun: lottie-web di web, lottie-ios, lottie-android, Flutter, dan React Native. File-nya gratis di bawah lisensi MIT, tanpa perlu mendaftar, dan disajikan dari URL tetap dengan CORS aktif, sehingga bisa Anda muat langsung atau unduh ke dalam proyek.',
    popular: 'Ikon Lottie populer',
    allIcons: (count: number) => `Semua ${count} ikon →`,
    filesTitle: 'File dan URL',
    filesIntroHtml: `Setiap ikon punya halaman di ${code('/icons/&lt;id&gt;')} (dalam bahasa Inggris) dengan pratinjau dan unduhan. File-nya sendiri:`,
    files: {
      json: 'animasi Lottie JSON',
      zip: 'JSON dan SVG statis',
      svg: 'SVG statis untuk setiap keadaan',
      catalog: 'katalog semua ikon',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} memuat daftar semua ikon beserta id, judul, kategori, kata kunci, interaksi, ukuran, durasi, dan URL file-nya, sehingga mudah memilih ikon berdasarkan kata kunci lewat skrip atau membiarkan coding agent memilihkannya. Median ukuran file Lottie adalah ${median} kB.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'Player referensi dari Airbnb. Muat dari CDN, arahkan ke URL ikon, dan pilih renderer SVG agar ikon tetap tajam dan warnanya bisa diubah dengan CSS. Pakai build lengkap (lottie.min.js): build light tidak mendukung expression.',
        cssLabel: 'Mengikuti warna teks (renderer SVG)',
      },
      'web-interactions': {
        title: 'Web: interaksi hover dan klik',
        text: 'lottie-web hanya memutar dan menghentikan animasi; interaksinya Anda atur sendiri. Contoh berikut adalah toggle klik pada ikon menu dengan dukungan reduced motion. Semua interaksi mengikuti pola yang sama, dan komponen React di bawah ini mengerjakan semuanya untuk Anda.',
      },
      dotlottie: {
        title: 'Web: web component dotLottie',
        text: 'Player dari LottieFiles ini me-render ke canvas dengan engine WebAssembly dan bisa memutar Lottie JSON biasa maupun file .lottie. Canvas mempertahankan warna dari file, jadi ikon tetap hitam kecuali Anda mengubah warna di JSON-nya.',
        jsLabel: 'Atau lewat API JavaScript: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Tidak perlu memasang Lottie player: paket ini punya player sendiri berukuran 8 kB, menjalankan interaksi tiap ikon, mengikuti warna teks, dan menghormati preferensi reduced motion. Setiap ikon adalah modul terpisah, jadi hanya ikon yang Anda import yang ikut terkirim.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Bundel JSON-nya dengan require() untuk penggunaan offline, atau muat dari URL-nya.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Tambahkan paket dari https://github.com/airbnb/lottie-spm.git lewat Swift Package Manager, lalu masukkan JSON ke dalam bundle aplikasi atau muat dari URL-nya.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Tambahkan com.airbnb.android:lottie-compose (atau com.airbnb.android:lottie untuk view). Simpan JSON di res/raw untuk penggunaan offline dengan LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'Paket lottie adalah player murni Dart untuk Android, iOS, web, dan desktop.',
      },
    },
    expressionsTitle: 'Ikon dengan expression',
    expressionsHtml: (count: number) =>
      `${count} ikon memakai expression After Effects (${code('loopOut')} atau ${code('wiggle')}). Di web, putar ikon tersebut dengan build lengkap lottie-web, bukan ${code('lottie_light')}. Player native tidak mengevaluasi expression, jadi uji ikon ini di iOS, Android, dan Flutter atau pilih ikon lain; react-useanimations memutarnya sesuai rancangan.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Apakah ikon Lottie ini gratis untuk penggunaan komersial?',
        answer: `Ya. Semua ${f.count} ikon Lottie berlisensi MIT: Anda bebas memakai, mengubah, dan mendistribusikannya ulang di proyek pribadi maupun komersial, tanpa kewajiban atribusi dan tanpa perlu akun untuk mengunduhnya.`,
      },
      {
        question: 'Apa format file Lottie-nya?',
        answer: `Lottie JSON standar (format Bodymovin) yang hanya berisi shape layer: tanpa gambar, font, atau aset eksternal. Setiap ikon digambar di artboard 24 atau 32 px, bisa diskalakan ke ukuran berapa pun, dan berukuran ${f.minSize} kB sampai ${f.maxSize} kB, dengan median ${f.medianSize} kB.`,
      },
      {
        question: 'Apakah saya butuh lottie-web untuk memakai ikon ini di React?',
        answer:
          'Tidak. react-useanimations punya player sendiri berukuran 8 kB tanpa dependensi, jadi Anda cukup memasang satu paket dan meng-import ikon yang dibutuhkan. lottie-web hanya diperlukan di luar React, yaitu di halaman web biasa atau di framework lain.',
      },
      {
        question: 'Ikon mana yang memerlukan build lengkap lottie-web?',
        answer: `${f.expressions.length} ikon memakai expression After Effects (loopOut atau wiggle): ${list(f.expressions)}. Di web, ikon-ikon ini memerlukan build lengkap lottie-web; lottie_light mengabaikan expression. Player native (lottie-ios, lottie-android, paket lottie untuk Flutter) juga tidak mengevaluasi expression, jadi gerakan ikon-ikon ini bisa berbeda di sana.`,
      },
      {
        question: 'Bisakah warna ikon Lottie diubah?',
        answer:
          'Bisa. Di web, renderer SVG lottie-web menulis warna sebagai atribut, jadi aturan CSS pada path-nya bisa mengubah warna ikon. Player native memakai API dynamic property masing-masing: ColorValueProvider di iOS, LottieProperty.COLOR dan STROKE_COLOR di Android, serta ValueDelegate.color di Flutter.',
      },
    ],
    byCategory: 'Ikon Lottie per kategori',
  },

  shadcn: {
    titles: (count: number) => [
      `Ikon animasi untuk shadcn/ui: ${count} komponen`,
      'Ikon animasi untuk shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} ikon animasi untuk shadcn/ui, masing-masing cukup satu perintah CLI shadcn. Interaksi mikro hover, klik, dan loop, berlisensi MIT, tanpa lottie-web.`,
      `${count} ikon animasi untuk shadcn/ui: tambahkan ikon apa pun dengan satu perintah CLI shadcn. Berlisensi MIT, tanpa lottie-web.`,
    ],
    title: 'Ikon animasi untuk shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Ikon animasi shadcn/ui populer',
    badge: (count: number) => `${count} komponen · registry shadcn · Berlisensi MIT`,
    intro:
      'Setiap ikon useAnimations tersedia di registry shadcn. Satu perintah CLI menambahkan komponen React bertipe ke proyek Anda, lengkap dengan interaksi hover, klik, atau loop yang dirancang untuknya, dukungan reduced motion, dan warna yang mengikuti tema Anda. Kodenya masuk ke repositori Anda, sama seperti komponen shadcn/ui lainnya.',
    addTitle: 'Menambahkan ikon',
    addIntro: 'Jalankan CLI shadcn dengan URL registry ikonnya:',
    namingHtml: `Nama komponennya adalah ${code('Animated')} + id ikon dalam PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) dan file-nya ditempatkan di ${code('components/animations/&lt;id&gt;.tsx')}. CLI juga menambahkan wrapper bersama ${code('components/use-animation.tsx')} dan memasang ${code('react-useanimations')}, yang sudah membawa player sendiri: tanpa lottie-web.`,
    namespaceTitle: 'Nama pendek dengan namespace registry',
    namespaceHtml: `Tambahkan registry ke ${code('components.json')} sekali saja, lalu tambahkan ikon berdasarkan namanya, beberapa sekaligus:`,
    registryHtml: (registry: string) =>
      `Indeks registry di ${link(registry, '/r/registry.json')} memuat daftar semua item beserta judul, kategori, dan interaksinya.`,
    usageTitle: 'Memakainya di Button shadcn',
    usageHtml: `Komponen-komponen ini menerima props yang sama dengan ${code('UseAnimations')}. Untuk toggle seperti ikon menu, berikan ${code('active')} dan simpan state-nya di tombol Anda; ikon beranimasi setiap kali nilainya berubah:`,
    colorHtml: (docs: string) =>
      `Ikon mengikuti warna teks, jadi ${code('text-primary')} atau ${code('text-muted-foreground')} langsung mengubah warnanya, dan dark mode tidak butuh pengaturan tambahan. Props dan pola lainnya ada di ${link(docs, 'dokumentasi')}.`,
    codeText: { closeMenu: 'Tutup menu', openMenu: 'Buka menu' },
    popular: 'Ikon populer untuk shadcn/ui',
    allIcons: (count: number) => `Semua ${count} ikon →`,
    popularNote: 'Setiap halaman ikon (dalam bahasa Inggris) menampilkan perintah shadcn-nya.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Apakah ikon animasi shadcn/ui ini gratis?',
        answer: `Ya. Semua ${f.count} ikon beserta kode komponennya berlisensi MIT, untuk proyek pribadi maupun komersial. Registry-nya tidak memerlukan akun atau API key.`,
      },
      {
        question: 'Apa saja yang ditambahkan CLI shadcn ke proyek saya?',
        answer: `Komponen ikon di components/animations/<id>.tsx, wrapper player UseAnimation bersama di components/use-animation.tsx (sekali saja, sebagai dependensi registry), dan react-useanimations@^${f.version} dari npm. lottie-web tidak diperlukan: paketnya punya player sendiri berukuran 8 kB.`,
      },
      {
        question: 'Apakah komponennya bisa dipakai dengan server component Next.js?',
        answer:
          'Bisa. Komponennya ditandai "use client" dan hanya menggambar animasi di browser, jadi Anda bisa me-render-nya dari server component dan halaman tanpa dynamic import atau ssr: false.',
      },
      {
        question: 'Bisakah saya mengubah tampilan dan gerakan ikonnya?',
        answer:
          'Bisa, kodenya milik Anda dan ada di repositori Anda. Komponen-komponen ini menerima props UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop, dan speed. Ikon mengikuti warna teks, jadi class Tailwind seperti text-primary atau text-muted-foreground bisa mengubah warnanya.',
      },
    ],
    byCategory: 'Jelajahi berdasarkan kategori',
  },
};
