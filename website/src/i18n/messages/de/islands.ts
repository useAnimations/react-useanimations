import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Loop',
      'click-toggle': 'Klick',
      'click-replay': 'Klick',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Läuft von selbst',
      'click-toggle': 'Zum Umschalten klicken',
      'click-replay': 'Zum Wiederholen klicken',
      hover: 'Hover spielt ab, Verlassen spielt rückwärts',
      'hover-loop': 'Hover startet den Loop',
      'hover-replay': 'Hover spielt ab',
    },
    preview: 'Vorschau: {title}',
    colors: 'Vorschaufarbe',
    color: 'Farbe {color}',
    textColor: 'Textfarbe',
    interaction: 'Interaktion',
    duration: 'Dauer',
    seconds: '{seconds} s',
    import: 'Import',
    close: 'Schließen',
    code: 'Code',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Dateien' },
    copy: 'Kopieren',
    download: 'Herunterladen',
    iconPage: 'Zur Icon-Seite',
  },
  interactionDemo: {
    click: 'Auf die Karte klicken',
    loop: 'Läuft von selbst',
    hover: 'Mauszeiger auf die Karte',
  },
  mobileMenu: {
    menu: 'Menü',
    nav: 'Hauptnavigation',
  },
  search: {
    clear: 'Suche löschen',
  },
  themeToggle: {
    toLight: 'Zum hellen Design wechseln',
    toDark: 'Zum dunklen Design wechseln',
  },
};
