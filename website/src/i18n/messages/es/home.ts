// La página de inicio (/), sus preguntas frecuentes y los enlaces a las colecciones.
import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Iconos animados y microanimaciones — useAnimations',
  description: (count: number) =>
    `${count} microanimaciones gratis para UI: una biblioteca de iconos animados para React, shadcn/ui y Lottie con hover, clic y bucle integrados. MIT.`,

  hero: {
    badge: (count: number) => `${count} iconos · cero dependencias · MIT`,
    headline: { start: 'Iconos que ', accent: 'cobran vida.', end: '' },
    h1: 'Iconos animados gratis para React, shadcn/ui y Lottie',
    intro: (count: number) =>
      `${count} microanimaciones hechas a mano, con microinteracciones de hover, clic y bucle integradas. Úsalas como componente de React, añádelas con shadcn o descarga los archivos SVG y Lottie JSON. Con licencia MIT.`,
    browse: 'Explorar iconos',
    fieldHint: 'Mueve el puntero sobre los iconos.',
  },

  numbers: {
    label: 'De un vistazo',
    icons: 'iconos animados',
    interactions: 'interacciones integradas',
    size: 'reproductor, con gzip',
    dependencies: 'dependencias',
  },

  interactions: {
    eyebrow: 'Interacciones integradas',
    title: 'Cada icono sabe cómo moverse.',
    intro:
      'Cada icono viene con la interacción para la que fue diseñado. Colócalo y funciona sin más, o elige otra con una sola prop. Pruébalas:',
    demos: {
      loop: 'Se reproduce sin parar, para loaders y estados de fondo.',
      'click-toggle': 'Alterna entre dos estados: menú y cerrar, reproducir y pausar.',
      'click-replay': 'Se repite desde el principio con cada clic, como confirmación.',
      hover: 'Avanza al entrar el cursor y retrocede al salir.',
      'hover-loop': 'Se repite en bucle durante el hover y termina su ciclo al salir.',
      'hover-replay': 'Se reproduce una vez desde el principio cada vez que entra el cursor.',
    },
  },

  browser: {
    eyebrow: 'La biblioteca',
    title: (count: number) => `${count} iconos animados gratis`,
    intro:
      'Pasa el cursor o haz clic para reproducirlos. Abre un icono para ver su código y sus descargas: Lottie JSON, SVG y ZIP.',
    search: 'Buscar iconos',
    searchPlaceholder: (count: number) =>
      `Busca entre ${count} iconos (en inglés): prueba “eye”, “bell” o “arrow”`,
    interaction: 'Interacción',
    allInteractions: 'Todas las interacciones',
    color: 'Color del icono',
    colors: {
      text: 'Color del texto',
      indigo: 'Índigo',
      red: 'Rojo',
      amber: 'Ámbar',
      teal: 'Verde azulado',
      violet: 'Violeta',
    },
    customColor: 'Color personalizado',
    size: 'Tamaño',
    category: 'Categoría',
    all: 'Todos',
    count: { one: '{n} icono', other: '{n} iconos' },
    noMatch: 'Ningún icono coincide con la búsqueda.',
    noMatchHintHtml: (href: string) =>
      `Prueba con otra palabra o ${link(href, 'sugiere un icono')}.`,
  },

  everywhere: {
    eyebrow: 'Úsalos a tu manera',
    title: 'Instala, importa y listo.',
    intro:
      'Un componente de React sin dependencias, un registro de shadcn, archivos descargables con URL estables y un catálogo que pueden leer los agentes de IA.',
    docs: 'Leer la documentación',
    tablist: 'Plataforma',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Archivos', agents: 'Agentes' },
    codeText: {
      afterAdding: 'después',
      files: 'Cada icono como SVG, como animación (Lottie JSON) y como ZIP con ambos',
    },
  },

  features: {
    title: 'Ligeros, accesibles y a tu estilo.',
    colors: 'Siguen tus colores',
    colorsHtml: `Los iconos usan ${code('currentColor')}: adoptan por sí solos el color del texto, los estados de hover y el modo oscuro. Puedes cambiarlo con una prop, una clase o CSS normal.`,
    tiny: 'Diminutos por diseño',
    tinyText:
      'Un reproductor integrado y cero dependencias. Cada icono es su propio módulo de 2 kB.',
    accessible: 'Accesibles por defecto',
    accessibleText:
      'Respetan el movimiento reducido, reproducen las animaciones de hover con el foco del teclado y los lectores de pantalla los ignoran salvo que les pongas una etiqueta.',
    ssr: 'Listos para el renderizado en servidor',
    ssrText:
      'Un componente de cliente que se renderiza sin problemas en Next.js, Remix y Astro. Los iconos son datos simples que puedes importar en cualquier parte.',
    agents: 'Hechos para agentes',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Un catálogo tipado con palabras clave para cada icono, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} y documentación en Markdown.`,
  },

  browse: {
    title: 'Encuentra la microanimación adecuada.',
    byCategory: 'Explorar por categoría',
    byInteraction: 'Explorar por interacción',
    formats: 'Todos los iconos y formatos',
  },

  hubs: {
    icons: 'Todos los iconos animados',
    categories: 'Categorías de iconos',
    interactions: 'Iconos por interacción',
    lottie: 'Iconos Lottie (JSON)',
    shadcn: 'Iconos animados para shadcn/ui',
  },

  faqTitle: 'Preguntas',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: '¿Qué son las microanimaciones y los iconos animados?',
      answer:
        'Las microanimaciones son movimientos breves con un único propósito que responden a una acción del usuario: un icono de menú que se convierte en un botón de cerrar, un corazón que se rellena cuando das me gusta a una publicación, una campana que suena con una notificación nueva. Los iconos animados son el tipo más habitual. Hacen que una interfaz se sienta ágil y muestran los cambios de estado sin texto adicional.',
    },
    {
      question: '¿Qué diferencia hay entre los archivos Lottie y SVG?',
      answer:
        'El archivo Lottie JSON contiene la animación completa y se reproduce en cualquier reproductor de Lottie, incluido el que trae react-useanimations. Los archivos SVG son imágenes estáticas del icono en reposo, una por estado (por ejemplo, eye y eye-off), para lugares donde nada debe moverse: correos, documentos, herramientas de diseño o una alternativa sin JavaScript.',
    },
    {
      question: '¿Funciona con Next.js y el renderizado en servidor?',
      answer:
        "Sí. El componente está marcado con 'use client' y dibuja la animación solo en el navegador, así que se renderiza desde server components y frameworks con SSR como Next.js, Remix y Astro sin imports dinámicos. Los módulos de los iconos son datos simples que los server components pueden importar y pasar como props.",
      link: { href: f.links.serverRendering, label: 'Next.js y renderizado en servidor' },
    },
    {
      question: '¿Puedo usar los iconos en proyectos comerciales?',
      answer:
        'Sí. Los iconos y el paquete react-useanimations tienen licencia MIT: úsalos, modifícalos y redistribúyelos en trabajos personales y comerciales. La atribución se agradece, pero no es obligatoria.',
      link: { href: f.links.licence, label: 'Licencia y condiciones' },
    },
    {
      question: '¿Puedo usar los iconos sin React?',
      answer:
        'Sí. Cada icono es un archivo Lottie JSON estándar, así que se reproduce con lottie-web en JavaScript puro, Vue, Svelte, Angular o un CMS, y en los reproductores de Lottie para iOS, Android y Flutter. La página de iconos Lottie tiene las URL de los archivos y fragmentos de lottie-web listos para usar con cada interacción.',
      link: { href: f.links.lottie, label: 'Iconos Lottie' },
    },
    {
      question: '¿Cuánto añaden los iconos a mi bundle?',
      answer: `El reproductor de react-useanimations ${f.version} ocupa unos 8 kB con gzip y no tiene dependencias, y cada icono es un módulo independiente de 1 a 15 kB (2 kB de mediana), así que el bundle solo incluye los iconos que importas.`,
    },
  ],

  cta: {
    title: { start: 'Pon tu interfaz ', accent: 'en movimiento.', end: '' },
    text: 'Gratis y con licencia MIT, para trabajos personales y comerciales.',
    start: 'Empezar',
  },

  schema: {
    software: (count: number) =>
      `Componente de React y ${count} iconos animados (Lottie) con interacciones de hover, clic y bucle integradas. Sin dependencias.`,
    catalogName: 'Catálogo de iconos de useAnimations',
    catalog: (count: number) =>
      `Los ${count} iconos de useAnimations con id, título, categoría, palabras clave, interacción, URL de Lottie JSON, SVG y ZIP, import de React y comando de shadcn.`,
  },
};
