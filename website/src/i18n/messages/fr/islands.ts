import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Boucle',
      'click-toggle': 'Clic',
      'click-replay': 'Clic',
      hover: 'Survol',
      'hover-loop': 'Survol',
      'hover-replay': 'Survol',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Se joue toute seule',
      'click-toggle': 'Cliquez pour basculer',
      'click-replay': 'Cliquez pour rejouer',
      hover: 'Survolez pour lancer, sortez pour revenir',
      'hover-loop': 'Survolez pour boucler',
      'hover-replay': 'Survolez pour lancer',
    },
    preview: 'Aperçu de {title}',
    colors: 'Couleur de l’aperçu',
    color: 'Couleur {color}',
    textColor: 'Couleur du texte',
    interaction: 'Interaction',
    duration: 'Durée',
    seconds: '{seconds} s',
    import: 'Import',
    close: 'Fermer',
    code: 'Code',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Fichiers' },
    copy: 'Copier',
    download: 'Télécharger',
    iconPage: 'Page de l’icône →',
  },
  interactionDemo: {
    click: 'Cliquez sur la carte',
    loop: 'Se joue toute seule',
    hover: 'Survolez la carte',
  },
  mobileMenu: {
    menu: 'Menu',
    nav: 'Navigation principale',
  },
  search: {
    clear: 'Effacer la recherche',
  },
  themeToggle: {
    toLight: 'Passer au thème clair',
    toDark: 'Passer au thème sombre',
  },
};
