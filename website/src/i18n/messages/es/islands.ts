// Texto de las islas de React (components/*.tsx); '{name}' lo rellena el componente.
import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Bucle',
      'click-toggle': 'Clic',
      'click-replay': 'Clic',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Se reproduce solo',
      'click-toggle': 'Haz clic para alternar',
      'click-replay': 'Haz clic para repetir',
      hover: 'Pasa el cursor para reproducir; al salir, se invierte',
      'hover-loop': 'Pasa el cursor para repetir en bucle',
      'hover-replay': 'Pasa el cursor para reproducir',
    },
    preview: 'Vista previa de {title}',
    colors: 'Color de la vista previa',
    color: 'Color {color}',
    textColor: 'Color del texto',
    interaction: 'Interacción',
    duration: 'Duración',
    seconds: '{seconds} s',
    import: 'Importar',
    close: 'Cerrar',
    code: 'Código',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Archivos' },
    copy: 'Copiar',
    download: 'Descargar',
    iconPage: 'Página del icono',
  },
  interactionDemo: {
    click: 'Haz clic en la tarjeta',
    loop: 'Se reproduce solo',
    hover: 'Pasa el cursor sobre la tarjeta',
  },
  mobileMenu: {
    menu: 'Menú',
    nav: 'Principal',
  },
  search: {
    clear: 'Borrar la búsqueda',
  },
  themeToggle: {
    toLight: 'Cambiar al tema claro',
    toDark: 'Cambiar al tema oscuro',
  },
};
