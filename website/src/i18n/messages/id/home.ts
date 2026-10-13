import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Animasi Mikro & Pustaka Ikon Animasi — useAnimations',
  description: (count: number) =>
    `${count} animasi mikro gratis untuk UI: pustaka ikon animasi untuk React, shadcn/ui, dan Lottie dengan hover, klik, dan loop bawaan. MIT.`,

  hero: {
    badge: (count: number) => `${count} ikon · tanpa dependensi · MIT`,
    headline: { start: 'Ikon yang ', accent: 'terasa hidup.', end: '' },
    h1: 'Ikon animasi gratis untuk React, shadcn/ui, dan Lottie',
    intro: (count: number) =>
      `${count} animasi mikro buatan tangan dengan interaksi mikro hover, klik, dan loop yang sudah terpasang. Pakai sebagai komponen React, tambahkan lewat shadcn, atau unduh SVG dan Lottie JSON-nya. Berlisensi MIT.`,
    browse: 'Jelajahi ikon',
    fieldHint: 'Gerakkan pointer Anda di atas bidang ikon.',
  },

  numbers: {
    label: 'Sekilas',
    icons: 'ikon animasi',
    interactions: 'interaksi bawaan',
    size: 'player, setelah gzip',
    dependencies: 'dependensi',
  },

  interactions: {
    eyebrow: 'Interaksi bawaan',
    title: 'Setiap ikon tahu cara bergerak.',
    intro:
      'Setiap ikon hadir dengan interaksi yang dirancang untuknya. Pasang saja dan langsung berfungsi, atau pilih interaksi lain dengan satu prop. Coba sendiri:',
    demos: {
      loop: 'Berputar terus, untuk loader dan status yang sedang berlangsung.',
      'click-toggle': 'Beralih antara dua keadaan: menu dan tutup, play dan pause.',
      'click-replay': 'Diputar ulang dari awal setiap kali diklik, sebagai umpan balik.',
      hover: 'Diputar maju saat kursor masuk dan mundur saat kursor keluar.',
      'hover-loop':
        'Berputar berulang selama di-hover dan menyelesaikan siklusnya saat kursor keluar.',
      'hover-replay': 'Diputar sekali dari awal setiap kali kursor masuk.',
    },
  },

  browser: {
    eyebrow: 'Pustaka ikon',
    title: (count: number) => `${count} ikon animasi gratis`,
    intro:
      'Hover atau klik untuk memutar. Buka sebuah ikon untuk melihat kode dan unduhannya: Lottie JSON, SVG, dan ZIP.',
    search: 'Cari ikon',
    searchPlaceholder: (count: number) =>
      `Cari di antara ${count} ikon, coba “eye”, “bell”, atau “arrow”`,
    interaction: 'Interaksi',
    allInteractions: 'Semua interaksi',
    color: 'Warna ikon',
    colors: {
      text: 'Warna teks',
      indigo: 'Indigo',
      red: 'Merah',
      amber: 'Kuning amber',
      teal: 'Hijau toska',
      violet: 'Ungu',
    },
    customColor: 'Warna kustom',
    size: 'Ukuran',
    category: 'Kategori',
    all: 'Semua',
    count: { other: '{n} ikon' },
    noMatch: 'Tidak ada ikon yang cocok.',
    noMatchHintHtml: (href: string) => `Coba kata lain, atau ${link(href, 'usulkan ikon baru')}.`,
  },

  everywhere: {
    eyebrow: 'Pakai sesuai kebutuhan',
    title: 'Instal, import, selesai.',
    intro:
      'Komponen React tanpa dependensi, registry shadcn, file yang bisa diunduh dengan URL tetap, dan katalog yang bisa dibaca agen AI.',
    docs: 'Baca dokumentasi →',
    tablist: 'Platform',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'File', agents: 'Agen AI' },
    codeText: {
      afterAdding: 'lalu',
      files:
        'Setiap ikon sebagai SVG, sebagai animasi (Lottie JSON), dan sebagai ZIP berisi keduanya',
    },
  },

  features: {
    title: 'Kecil, aksesibel, dan bebas Anda atur tampilannya.',
    colors: 'Mengikuti warna Anda',
    colorsHtml: `Ikon memakai ${code('currentColor')}: warna teks, keadaan hover, dan dark mode langsung terbawa dengan sendirinya. Timpa dengan prop, class, atau CSS biasa.`,
    tiny: 'Kecil sejak awal',
    tinyText:
      'Player bawaan, tanpa dependensi. Setiap ikon adalah modul tersendiri berukuran 2 kB.',
    accessible: 'Aksesibel secara default',
    accessibleText:
      'Menghormati preferensi reduced motion, memutar animasi hover saat mendapat fokus keyboard, dan tidak dibacakan pembaca layar kecuali Anda memberinya label.',
    ssr: 'Siap untuk server rendering',
    ssrText:
      'Client component yang aman di-render di Next.js, Remix, dan Astro. Ikon hanyalah data biasa yang bisa Anda import di mana saja.',
    agents: 'Dibuat untuk agen AI',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Katalog bertipe dengan kata kunci untuk setiap ikon, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')}, dan dokumentasi Markdown.`,
  },

  browse: {
    title: 'Temukan animasi mikro yang tepat.',
    byCategory: 'Jelajahi berdasarkan kategori',
    byInteraction: 'Jelajahi berdasarkan interaksi',
    formats: 'Semua ikon dan format',
  },

  hubs: {
    icons: 'Semua ikon animasi',
    categories: 'Kategori ikon',
    interactions: 'Ikon berdasarkan interaksi',
    lottie: 'Ikon Lottie (JSON)',
    shadcn: 'Ikon animasi shadcn/ui',
  },

  faqTitle: 'Pertanyaan',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: 'Apa itu animasi mikro dan ikon animasi?',
      answer:
        'Animasi mikro adalah gerakan singkat dengan satu tujuan yang merespons aksi pengguna: ikon menu yang berubah menjadi tombol tutup, hati yang terisi saat Anda menyukai postingan, lonceng yang berdering saat ada notifikasi baru. Ikon animasi adalah jenis yang paling umum. Animasi ini membuat antarmuka terasa responsif dan menunjukkan perubahan keadaan tanpa perlu teks tambahan.',
    },
    {
      question: 'Apa bedanya file Lottie dan SVG?',
      answer:
        'File Lottie JSON berisi seluruh animasi dan bisa diputar di Lottie player mana pun, termasuk player bawaan react-useanimations. File SVG adalah gambar diam ikon dalam posisi istirahat, satu per keadaan (misalnya eye dan eye-off), untuk tempat yang tidak boleh ada gerakan: email, dokumen, aplikasi desain, atau fallback tanpa JavaScript.',
    },
    {
      question: 'Apakah bisa dipakai dengan Next.js dan server rendering?',
      answer:
        "Bisa. Komponennya ditandai 'use client' dan hanya menggambar animasi di browser, sehingga bisa di-render dari server component dan framework SSR seperti Next.js, Remix, dan Astro tanpa dynamic import. Modul ikon hanyalah data biasa yang bisa di-import oleh server component dan diteruskan sebagai props.",
      link: { href: f.links.serverRendering, label: 'Next.js dan server rendering' },
    },
    {
      question: 'Bolehkah ikon ini dipakai di proyek komersial?',
      answer:
        'Boleh. Ikon dan paket react-useanimations berlisensi MIT: Anda bebas memakai, mengubah, dan mendistribusikannya ulang untuk proyek pribadi maupun komersial. Atribusi kami hargai, tetapi tidak wajib.',
      link: { href: f.links.licence, label: 'Lisensi & Ketentuan' },
    },
    {
      question: 'Bisakah ikon ini dipakai tanpa React?',
      answer:
        'Bisa. Setiap ikon adalah file Lottie JSON standar, jadi bisa diputar dengan lottie-web di JavaScript biasa, Vue, Svelte, Angular, atau CMS, serta di Lottie player untuk iOS, Android, dan Flutter. Halaman Ikon Lottie berisi URL file dan snippet lottie-web siap pakai untuk setiap interaksi.',
      link: { href: f.links.lottie, label: 'Ikon Lottie' },
    },
    {
      question: 'Seberapa besar ikon ini menambah ukuran bundle saya?',
      answer: `Player di react-useanimations ${f.version} berukuran sekitar 8 kB setelah gzip tanpa dependensi, dan setiap ikon adalah modul tersendiri berukuran 1 sampai 15 kB (median 2 kB), sehingga bundle hanya berisi ikon yang Anda import.`,
    },
  ],

  cta: {
    title: { start: 'Beri antarmuka Anda ', accent: 'sentuhan gerak.', end: '' },
    text: 'Gratis dan berlisensi MIT, untuk proyek pribadi maupun komersial.',
    start: 'Mulai sekarang',
  },

  schema: {
    software: (count: number) =>
      `Komponen React dan ${count} ikon animasi (Lottie) dengan interaksi hover, klik, dan loop bawaan. Tanpa dependensi.`,
    catalogName: 'Katalog ikon useAnimations',
    catalog: (count: number) =>
      `Seluruh ${count} ikon useAnimations beserta id, judul, kategori, kata kunci, interaksi, URL Lottie JSON, SVG, dan ZIP, import React, serta perintah shadcn.`,
  },
};
