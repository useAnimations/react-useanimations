import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const list = listIn('id');
const plural = pluralIn('id');
const icons = (n: number) => plural(n, { other: 'ikon' });
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

/** Up to `max` titles, then 'dan N lainnya'. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')}, dan ${items.length - max} lainnya`
    : list(items);

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

/** What the icons come as, with the static SVGs when there are any. */
const formats = (f: CategoryFacts) => {
  const base = 'komponen React, komponen shadcn/ui, dan animasi Lottie JSON';
  if (f.withSvg === f.count) return `${base}, lengkap dengan SVG statis`;
  return f.withSvg ? `${base}; ${f.withSvg} di antaranya juga tersedia sebagai SVG statis` : base;
};

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} untuk React & Lottie`,
      `${f.title} untuk React`,
      `${f.title} gratis`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const name = lower(f.title);
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} ${name} gratis, di antaranya ${examples}. Animasi mikro hover, klik, dan loop untuk React, shadcn/ui, dan Lottie JSON, berlisensi MIT.`,
        `${f.count} ${name} gratis, di antaranya ${examples}. Untuk React, shadcn/ui, dan Lottie JSON, berlisensi MIT.`,
        `${f.count} ${name} gratis, di antaranya ${examples}. Untuk React, shadcn/ui, dan Lottie, MIT.`,
        `${f.count} ${name} gratis untuk React, shadcn/ui, dan Lottie JSON, berlisensi MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays =
        f.groups.length === 1
          ? `Semua ${icons(f.count)} di kategori ini ${f.groups[0].plays}.`
          : `Dari ${icons(f.count)} di kategori ini, ${list(f.groups.map(({ count, plays: phrase }) => `${count} ${phrase}`))}.`;
      return `${plays} Setiap ikon tersedia sebagai ${formats(f)}. Semuanya gratis untuk penggunaan komersial di bawah lisensi MIT.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `${f.title} apa saja yang tersedia?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Semuanya gratis untuk proyek pribadi maupun komersial di bawah lisensi MIT, tanpa kewajiban atribusi.`,
        },
        {
          question: `Bagaimana cara memakai ${name} ini di React?`,
          answer: `Instal react-useanimations, tambahkan ${ex.importLine}, lalu render <UseAnimations animation={${ex.exportName}} size={32} />. Ikon menjalankan interaksi ${ex.interactionLabel.toLowerCase()} bawaannya dan mengikuti warna teks. Jika memakai shadcn/ui, jalankan ${ex.shadcnCommand} sebagai gantinya.`,
        },
        {
          question: `Bisakah ${name} ini dipakai tanpa React?`,
          answer: `Bisa. Setiap ikon adalah file Lottie JSON di ${f.site}/icons/<id>.json (misalnya ${f.site}/icons/${ex.id}.json) yang bisa diputar dengan lottie-web, lottie-ios, lottie-android, atau paket lottie untuk Flutter${f.withSvg ? '; SVG statis tersedia di halaman masing-masing ikon (halaman ikon hanya dalam bahasa Inggris)' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} memakai expression After Effects, jadi di web ${n === 1 ? 'ikon tersebut' : 'ikon-ikon tersebut'} memerlukan build lengkap lottie-web.`
              : 'Tidak ada yang memakai expression, jadi build ringan lottie-web sudah cukup.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · Berlisensi MIT`,
    allIcons: (name: string) => `Semua ikon ${name.toLowerCase()}`,
    whereToUse: 'Tempat memakainya',
    byInteraction: 'Berdasarkan interaksi',
    addOne: 'Tambahkan ke aplikasi Anda',
    addOneHtml: (label: string, name: string) =>
      `Di React, instal ${code('react-useanimations')} lalu import ikonnya; ikon langsung menjalankan interaksi ${label.toLowerCase()} bawaannya. Semua ikon di kategori ini bekerja dengan cara yang sama: ganti ${code(name)} dengan nama yang tertera di halaman ikonnya.`,
    shadcnHtml: (href: string) =>
      `Dengan ${link(href, 'shadcn/ui')}, CLI-nya menambahkan komponen siap pakai:`,
    noReactHtml: (href: string) =>
      `Tidak memakai React? Setiap ikon adalah file Lottie JSON di ${code('/icons/&lt;id&gt;.json')}; lihat ${link(href, 'Ikon Lottie')} untuk player web, iOS, Android, dan Flutter.`,
    more: 'Kategori lainnya',
    allIconsButton: 'Semua ikon',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} untuk React & Lottie`,
      `${f.title} untuk React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => [
      `${f.count} ikon animasi gratis yang ${f.plays}, seperti ${list(f.titles.slice(0, 3))}. Untuk React, shadcn/ui, dan Lottie JSON, berlisensi MIT.`,
      `${f.count} ikon animasi gratis yang ${f.plays}, seperti ${list(f.titles.slice(0, 3))}. Untuk React, shadcn/ui, dan Lottie, MIT.`,
      `${f.count} ikon animasi gratis yang ${f.plays}. Untuk React, shadcn/ui, dan Lottie JSON, berlisensi MIT.`,
    ],
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Ikon mana saja yang memakai interaksi ${lower(f.label)}?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Apa yang terjadi jika pengguna memilih reduced motion?',
        answer: `${f.reducedMotion} Komponen React membaca prefers-reduced-motion dan ikut menyesuaikan saat pengaturannya berubah, jadi Anda tidak perlu menulis kode apa pun untuk itu.`,
      },
      {
        question: 'Bagaimana cara mengganti interaksi sebuah ikon?',
        answer: `Setiap ikon menjalankan interaksi yang memang dirancang untuknya. Berikan interaction="${f.interaction}" agar ikon lain berperilaku seperti ini, atau nilai lain ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') untuk menggantinya. Props autoplay, loop, dan speed mengatur pemutarannya.${
          f.interaction === 'click-toggle'
            ? ' Untuk mengendalikan keadaannya sendiri, berikan active={isOn} dan perbarui nilainya di onClick: klik tidak lagi men-toggle ikon dengan sendirinya.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Semua ikon dengan interaksi ${label.toLowerCase()}`,
    behaviour: 'Cara kerjanya',
    hoverNote:
      ' Ketukan di layar sentuh tidak memulai animasi hover, sedangkan fokus keyboard memulainya jika ikon berada di dalam elemen yang bisa difokus.',
    handled: 'Komponen React menangani semua ini; Anda cukup memilih ikonnya.',
    whereToUse: 'Tempat memakainya',
    byCategory: 'Berdasarkan kategori',
    useInReact: 'Pakai di React',
    overrideHtml: `Ikon yang tercantum di sini menjalankan interaksi ini secara default. Ikon lain pun bisa memakainya: cukup berikan prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} biasanya memakai '${interaction}'`,
    extra: {
      loop: 'Ikon loop berputar otomatis dan berhenti sementara saat digulir keluar dari layar. Perlambat dengan speed, putar sekali saja dengan loop={false}, atau biarkan diam dengan autoplay={false}:',
      'click-toggle':
        'Klik men-toggle ikon dengan sendirinya. Agar tetap sinkron dengan state Anda, berikan active: ikon beranimasi setiap kali active berubah, dan klik tidak lagi men-toggle-nya sendiri.',
      'click-replay':
        'Letakkan ikon di dalam tombol sungguhan dengan render prop, supaya bisa difokus dan dibacakan oleh pembaca layar. onClick Anda dijalankan lebih dulu; panggil event.preventDefault() untuk melewati animasinya.',
      hover:
        'Letakkan ikon di dalam tautan atau tombol dengan render prop: animasi juga diputar saat elemen mendapat fokus keyboard, dan ketukan di layar sentuh tidak memicunya.',
      'hover-replay':
        'Jadikan seluruh kartu atau tautan sebagai area hover, bukan hanya ikonnya: dengan render prop, event dipasang di elemen Anda, dan fokus keyboard juga memutar animasinya.',
      'hover-loop':
        'Pakai render prop agar seluruh tautan memicu loop, termasuk saat mendapat fokus keyboard. Atur temponya dengan speed:',
    },
    codeText: {
      halfSpeed: 'setengah kecepatan',
      playsOnce: 'diputar sekali, lalu berhenti',
      staticFrame: 'frame pertama, diam',
      endState: 'true menampilkan keadaan akhir',
      closeMenu: 'Tutup menu',
      openMenu: 'Buka menu',
      download: 'Unduh',
      archive: 'Arsipkan',
      weeklyGrowth: 'Pertumbuhan mingguan',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Semua props dijelaskan di ${link(docs, 'dokumentasi')}. Di luar React, ikon-ikon ini adalah file Lottie JSON; halaman ${link(lottie, 'Ikon Lottie')} menunjukkan cara membuat ulang interaksinya dengan lottie-web.`,
    other: 'Interaksi lainnya',
    browseByCategory: 'Jelajahi berdasarkan kategori',
  },
};
