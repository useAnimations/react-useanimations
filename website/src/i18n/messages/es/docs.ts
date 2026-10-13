// El marco de la página de documentación. El cuerpo está en src/content/documentation.es.md.
import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Documentación — useAnimations',
  description: (iconCount: number) =>
    `Cómo usar ${iconCount} iconos animados en React y shadcn/ui: interacciones, props, colores, archivos y accesibilidad.`,
  badge: 'Documentación',
  onThisPage: 'En esta página',
  viewAsMarkdown: 'Ver como Markdown',
  headline: 'Documentación de useAnimations',
  summary: 'Cómo usar los iconos animados de useAnimations en React y shadcn/ui.',
  crumb: 'Documentación',
  faq: [
    {
      question: '¿useAnimations es gratis para proyectos comerciales?',
      answer: 'Sí. Los iconos y el paquete de React tienen licencia MIT y no requieren atribución.',
    },
    {
      question: '¿Cómo uso los iconos de useAnimations en React?',
      answer:
        'Instala react-useanimations, importa UseAnimations y un icono (por ejemplo, react-useanimations/lib/checkmark) y renderiza <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: '¿Cómo cambio el color de un icono?',
      answer:
        'Los iconos siguen el color del texto. Puedes cambiarlo con strokeColor y fillColor, con la propiedad color de CSS o aplicando estilos a los trazados.',
    },
    {
      question: '¿Funciona sin React?',
      answer:
        'El paquete es para React. Cada icono es también un archivo Lottie JSON estándar que puede reproducir cualquier reproductor de Lottie (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), además de un SVG estático. Consulta “Uso sin React” y useanimations.com/lottie-icons.',
    },
  ],
};
