import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Loop',
      'click-toggle': 'Klik',
      'click-replay': 'Klik',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Berputar dengan sendirinya',
      'click-toggle': 'Klik untuk beralih',
      'click-replay': 'Klik untuk memutar ulang',
      hover: 'Hover untuk memutar, keluar untuk membalik',
      'hover-loop': 'Hover untuk memutar berulang',
      'hover-replay': 'Hover untuk memutar',
    },
    preview: 'Pratinjau {title}',
    colors: 'Warna pratinjau',
    color: 'Warna {color}',
    textColor: 'Warna teks',
    interaction: 'Interaksi',
    duration: 'Durasi',
    seconds: '{seconds} dtk',
    import: 'Import',
    close: 'Tutup',
    code: 'Kode',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'File' },
    copy: 'Salin',
    download: 'Unduh',
    iconPage: 'Halaman ikon →',
  },
  interactionDemo: {
    click: 'Klik kartunya',
    loop: 'Berputar dengan sendirinya',
    hover: 'Arahkan kursor ke kartu',
  },
  mobileMenu: {
    menu: 'Menu',
    nav: 'Utama',
  },
  themeToggle: {
    toLight: 'Beralih ke tema terang',
    toDark: 'Beralih ke tema gelap',
  },
};
