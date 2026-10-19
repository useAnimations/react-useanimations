import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Döngü',
      'click-toggle': 'Tıkla',
      'click-replay': 'Tıkla',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Kendiliğinden oynar',
      'click-toggle': 'Durumu değiştirmek için tıklayın',
      'click-replay': 'Tekrar oynatmak için tıklayın',
      hover: 'Hover’da oynar, imleç ayrılınca geri sarar',
      'hover-loop': 'Hover süresince döngüde oynar',
      'hover-replay': 'Hover’da oynar',
    },
    preview: '{title} önizlemesi',
    colors: 'Önizleme rengi',
    color: 'Renk {color}',
    textColor: 'Metin rengi',
    interaction: 'Etkileşim',
    duration: 'Süre',
    seconds: '{seconds} sn',
    import: 'Import',
    close: 'Kapat',
    code: 'Kod',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Dosyalar' },
    copy: 'Kopyala',
    download: 'İndir',
    iconPage: 'İkon sayfası',
  },
  interactionDemo: {
    click: 'Karta tıklayın',
    loop: 'Kendiliğinden oynar',
    hover: 'İmleci kartın üzerine getirin',
  },
  mobileMenu: {
    menu: 'Menü',
    nav: 'Ana menü',
  },
  search: {
    clear: 'Aramayı temizle',
  },
  themeToggle: {
    toLight: 'Açık temaya geç',
    toDark: 'Koyu temaya geç',
  },
};
