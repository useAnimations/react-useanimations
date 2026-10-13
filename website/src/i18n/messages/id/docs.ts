import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Dokumentasi — useAnimations',
  description: (iconCount: number) =>
    `Cara memakai ${iconCount} ikon animasi di React dan shadcn/ui: interaksi, props, warna, file, dan aksesibilitas.`,
  badge: 'Dokumentasi',
  onThisPage: 'Di halaman ini',
  viewAsMarkdown: 'Lihat sebagai Markdown',
  headline: 'Dokumentasi useAnimations',
  summary: 'Cara memakai ikon animasi useAnimations di React dan shadcn/ui.',
  crumb: 'Dokumentasi',
  faq: [
    {
      question: 'Apakah useAnimations gratis untuk proyek komersial?',
      answer: 'Ya. Ikon dan paket React-nya berlisensi MIT, tanpa kewajiban atribusi.',
    },
    {
      question: 'Bagaimana cara memakai ikon useAnimations di React?',
      answer:
        'Instal react-useanimations, import UseAnimations dan sebuah ikon (misalnya react-useanimations/lib/checkmark), lalu render <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Bagaimana cara mengubah warna ikon?',
      answer:
        'Ikon mengikuti warna teks. Ubah dengan strokeColor dan fillColor, properti CSS color, atau dengan memberi style pada path-nya.',
    },
    {
      question: 'Apakah bisa dipakai tanpa React?',
      answer:
        'Paketnya khusus untuk React. Namun setiap ikon juga tersedia sebagai file Lottie JSON standar yang bisa diputar oleh Lottie player mana pun (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), serta sebagai SVG statis. Lihat bagian Memakai tanpa React dan useanimations.com/lottie-icons.',
    },
  ],
};
