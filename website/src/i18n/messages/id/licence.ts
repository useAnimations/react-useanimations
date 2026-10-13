import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Lisensi & Ketentuan — useAnimations',
  description:
    'Ikon useAnimations dan paket react-useanimations berlisensi MIT: gratis untuk proyek pribadi dan komersial, boleh didistribusikan ulang, tanpa atribusi.',
  name: 'Lisensi & Ketentuan',
  heading: 'Bebas dipakai. Berlisensi MIT.',
  introHtml: (mitHref: string) =>
    `Ikon useAnimations dan paket <code>react-useanimations</code> dirilis di bawah <a href="${mitHref}">lisensi MIT</a>.`,
  canDo: 'Yang boleh Anda lakukan',
  canDoItemsHtml: [
    '<strong>Memakai</strong> ikon di situs web, aplikasi, dan produk pribadi maupun komersial.',
    '<strong>Mengubahnya</strong>: warna, ukuran, timing, bahkan gerakannya sendiri.',
    '<strong>Mendistribusikan ulang</strong>, termasuk di dalam paket ikon, template, tema, UI kit, dan registry komponen.',
  ],
  attribution: 'Atribusi',
  attributionText:
    'Tidak wajib, tetapi kami hargai. Sertakan pemberitahuan lisensi jika Anda mendistribusikan ulang file-nya, dan jika ingin mencantumkan kredit:',
  credit: (link: string) => `Ikon animasi oleh ${link}`,
  noWarranty: 'Tanpa jaminan',
  noWarrantyText: 'Ikon dan kode disediakan apa adanya, tanpa jaminan dalam bentuk apa pun.',
  licenseText: 'Teks lisensi',
  bindingNote:
    'Teks lisensi di bawah ini adalah versi asli berbahasa Inggris, yang merupakan versi yang mengikat secara hukum.',
};
