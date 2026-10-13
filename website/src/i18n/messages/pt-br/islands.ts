import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Loop',
      'click-toggle': 'Clique',
      'click-replay': 'Clique',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Toca sozinho',
      'click-toggle': 'Clique para alternar',
      'click-replay': 'Clique para tocar de novo',
      hover: 'Passe o mouse para tocar e tire para voltar',
      'hover-loop': 'Passe o mouse para tocar em loop',
      'hover-replay': 'Passe o mouse para tocar',
    },
    preview: 'Prévia de {title}',
    colors: 'Cor da prévia',
    color: 'Cor {color}',
    textColor: 'Cor do texto',
    interaction: 'Interação',
    duration: 'Duração',
    seconds: '{seconds} s',
    import: 'Import',
    close: 'Fechar',
    code: 'Código',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Arquivos' },
    copy: 'Copiar',
    download: 'Baixar',
    iconPage: 'Página do ícone →',
  },
  interactionDemo: {
    click: 'Clique no card',
    loop: 'Toca sozinho',
    hover: 'Passe o mouse no card',
  },
  mobileMenu: {
    menu: 'Menu',
    nav: 'Principal',
  },
  themeToggle: {
    toLight: 'Mudar para o tema claro',
    toDark: 'Mudar para o tema escuro',
  },
};
