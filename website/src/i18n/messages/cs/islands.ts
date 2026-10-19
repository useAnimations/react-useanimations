import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Smyčka',
      'click-toggle': 'Klik',
      'click-replay': 'Klik',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Přehrává se sama',
      'click-toggle': 'Kliknutím přepnete',
      'click-replay': 'Kliknutím přehrajete znovu',
      hover: 'Najetím myší přehrajete, odjetím vrátíte zpět',
      'hover-loop': 'Najetím myší spustíte smyčku',
      'hover-replay': 'Najetím myší přehrajete',
    },
    preview: 'Náhled ikony {title}',
    colors: 'Barva náhledu',
    color: 'Barva {color}',
    textColor: 'Barva textu',
    interaction: 'Interakce',
    duration: 'Délka',
    seconds: '{seconds} s',
    import: 'Import',
    close: 'Zavřít',
    code: 'Kód',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Soubory' },
    copy: 'Kopírovat',
    download: 'Stáhnout',
    iconPage: 'Stránka ikony (anglicky)',
  },
  interactionDemo: {
    click: 'Klikněte na kartu',
    loop: 'Přehrává se sama',
    hover: 'Najeďte myší na kartu',
  },
  mobileMenu: {
    menu: 'Menu',
    nav: 'Hlavní navigace',
  },
  search: {
    clear: 'Vymazat hledání',
  },
  themeToggle: {
    toLight: 'Přepnout na světlý motiv',
    toDark: 'Přepnout na tmavý motiv',
  },
};
