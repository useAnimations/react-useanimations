// Las páginas de colección: /icons, /categories, /interactions, /lottie-icons y /shadcn-animated-icons.
import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const plural = pluralIn('es');
const list = listIn('es');
const icons = (n: number) => plural(n, { one: 'icono', other: 'iconos' });

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Los ${count} iconos animados por categoría`,
      `Los ${count} iconos animados`,
    ],
    descriptions: (count: number, categories: number) => [
      `Todos los iconos de useAnimations en una página: ${count} iconos animados gratis en ${categories} categorías, para React, shadcn/ui, Lottie JSON y SVG. Licencia MIT.`,
      `${count} iconos animados gratis en ${categories} categorías, para React, shadcn/ui, Lottie JSON y SVG. Con licencia MIT.`,
    ],
    title: 'Todos los iconos animados',
    badge: (count: number) => `${icons(count)} · licencia MIT`,
    introHtml: (browser: string) =>
      `Todos los iconos del set, agrupados por categoría. Abre uno para ver una vista previa en vivo, su código de React y shadcn/ui y las descargas en Lottie JSON, SVG y ZIP (las páginas de cada icono están en inglés). Para buscar por palabra clave y probar las animaciones aquí mismo, usa el ${link(browser, 'explorador de iconos')}.`,
    categoriesNav: 'Categorías',
    byInteraction: 'Por interacción:',
    categoryLink: (count: number, name: string) =>
      name === 'Otros' ? `${icons(count)} más` : `${icons(count)} de ${name.toLowerCase()}`,
  },

  categories: {
    titles: (categories: number) => [
      `Categorías de iconos animados: ${categories} colecciones`,
      'Categorías de iconos animados',
    ],
    descriptions: (n: number, categories: number) => [
      `Explora ${n} iconos animados gratis en ${categories} categorías: navegación, acciones, multimedia, carga, redes sociales y más. Para React, shadcn/ui y Lottie.`,
      `${n} iconos animados gratis en ${categories} categorías: navegación, acciones, multimedia, carga y más. Para React, shadcn/ui y Lottie.`,
    ],
    title: 'Categorías de iconos animados',
    badge: (n: number, categories: number) => `${icons(n)} · ${categories} categorías`,
    introHtml: (interactions: string) =>
      `Cada icono de useAnimations pertenece a una categoría, desde flechas de navegación y controles multimedia hasta loaders y logotipos de redes sociales. Abre una categoría para ver todos sus iconos, dónde usarlos y el código para añadir uno, o explora por ${link(interactions, 'interacción')}.`,
    iconCount: icons,
  },

  interactions: {
    titles: [
      'Microinteracciones: iconos con hover, clic y bucle',
      'Microinteracciones para iconos animados',
    ],
    descriptions: (n: number, interactions: number) => [
      `${n} iconos animados con ${interactions} microinteracciones: bucle, alternar con clic, repetir con clic, hover, repetir con hover y bucle con hover. Con movimiento reducido.`,
      `${n} iconos animados con ${interactions} microinteracciones de hover, clic y bucle, compatibles con movimiento reducido.`,
    ],
    title: 'Interacciones de los iconos animados',
    badge: (interactions: number, n: number) => `${interactions} interacciones · ${icons(n)}`,
    introHtml: `Cada icono viene con la microinteracción para la que fue diseñado: se repite en bucle, alterna o se repite al hacer clic, o se reproduce con hover. El componente de React la conecta y respeta el movimiento reducido, y la prop <code class="font-mono text-base text-fg">interaction</code> cambia cualquier icono a otra.`,
    iconCount: icons,
    chooseTitle: 'Cómo elegir una interacción',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Un estado que dura')}, como una carga o una alerta activa: ${link(href, 'bucle')}.`,
      'click-toggle': (href: string) =>
        `${strong('Un control de activar y desactivar')}, como silenciar, el menú o mostrar la contraseña: ${link(href, 'alternar con clic')}, con ${code('active')} para el estado controlado.`,
      'click-replay': (href: string) =>
        `${strong('Una acción puntual')}, como enviar, guardar o actualizar: ${link(href, 'repetir con clic')}.`,
      hover: (href: string) =>
        `${strong('Una pista de lo que abre un enlace')}: ${link(href, 'hover')}, que retrocede cuando sale el puntero.`,
      'hover-replay': (href: string) =>
        `${strong('Barras de herramientas y listas que se recorren con el cursor')}: ${link(href, 'repetir con hover')}, que termina por sí sola.`,
      'hover-loop': (href: string) =>
        `${strong('Enlaces que invitan a mirar con calma')}, como los iconos sociales: ${link(href, 'bucle con hover')}.`,
    },
    motionTitle: 'Movimiento reducido',
    motionHtml: `El componente de React respeta ${code('prefers-reduced-motion')} y se actualiza cuando cambia el ajuste. Los toques en pantallas táctiles nunca inician las animaciones de hover.`,
    reducedMotion: {
      loop: 'el icono no se reproduce automáticamente y se queda en su primer fotograma estático.',
      'click-toggle': 'un clic cambia al otro estado de inmediato, sin la animación intermedia.',
      'click-replay': 'los clics siguen llegando a tu handler, pero la animación no se reproduce.',
      hover: 'el hover no reproduce la animación.',
      'hover-replay': 'el hover no reproduce la animación.',
      'hover-loop': 'el icono se queda estático durante el hover.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Iconos Lottie gratis: ${count} iconos animados en JSON`,
      'Iconos Lottie gratis',
    ],
    descriptions: (count: number) => [
      `${count} iconos Lottie gratis en Lottie JSON estándar, con licencia MIT. Código listo para copiar en lottie-web, dotLottie, React, React Native, iOS, Android y Flutter.`,
      `${count} iconos Lottie gratis en JSON, con licencia MIT. Código para lottie-web, dotLottie, React, React Native, iOS, Android y Flutter.`,
    ],
    title: 'Iconos Lottie gratis',
    crumb: 'Iconos Lottie',
    datasetName: 'Catálogo de iconos de useAnimations',
    datasetDescription: (count: number) =>
      `Metadatos y URL de los archivos de ${count} iconos animados Lottie: id, título, categoría, palabras clave, interacción, tamaño y duración.`,
    badge: (count: number) => `${icons(count)} · Lottie JSON · licencia MIT`,
    intro:
      'Cada icono de useAnimations es una animación Lottie JSON estándar, así que cualquier reproductor de Lottie puede reproducirla: lottie-web en la web, lottie-ios, lottie-android, Flutter y React Native. Los archivos son gratis con la licencia MIT, sin registro, y se sirven desde URL estables con CORS habilitado, así que puedes cargarlos directamente o descargarlos en tu proyecto.',
    popular: 'Iconos Lottie populares',
    allIcons: (count: number) => `Los ${count} iconos`,
    filesTitle: 'Archivos y URL',
    filesIntroHtml: `Cada icono tiene una página en ${code('/icons/&lt;id&gt;')} (en inglés) con vista previa y descargas. Los archivos en sí:`,
    files: {
      json: 'animación Lottie JSON',
      zip: 'el JSON y los SVG estáticos',
      svg: 'SVG estático de cada estado',
      catalog: 'catálogo de todos los iconos',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} recoge cada icono con su id, título, categoría, palabras clave, interacción, tamaño, duración y URL de archivos, lo que facilita elegir iconos por palabra clave desde un script o dejar que un agente de programación escoja uno. Los archivos Lottie pesan ${median} kB de mediana.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'El reproductor de referencia, creado por Airbnb. Cárgalo desde un CDN, apúntalo a la URL de un icono y elige el renderizador SVG, que mantiene el icono nítido y permite cambiarle el color con CSS. Usa la versión completa (lottie.min.js): la versión ligera ignora las expresiones.',
        cssLabel: 'Seguir el color del texto (renderizador SVG)',
      },
      'web-interactions': {
        title: 'Web: interacciones de hover y clic',
        text: 'lottie-web reproduce y detiene, pero las interacciones corren de tu cuenta. Este es el toggle con clic del icono de menú, con soporte para movimiento reducido; todas las interacciones siguen el mismo patrón, y el componente de React que verás más abajo lo hace todo por ti.',
      },
      dotlottie: {
        title: 'Web: componente web de dotLottie',
        text: 'El reproductor de LottieFiles renderiza en un canvas con un motor WebAssembly y reproduce tanto Lottie JSON normal como archivos .lottie. Un canvas conserva los colores del archivo, así que los iconos se quedan en negro a menos que cambies el color en el JSON.',
        jsLabel: 'O la API de JavaScript: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'No hace falta instalar ningún reproductor de Lottie: el paquete trae su propio reproductor de 8 kB, reproduce la interacción de cada icono, sigue el color del texto y respeta el movimiento reducido. Cada icono es un módulo independiente, así que solo envías los que importas.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Incluye el JSON en el bundle con require() para usarlo sin conexión, o cárgalo desde su URL.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Añade el paquete desde https://github.com/airbnb/lottie-spm.git con Swift Package Manager y, después, incluye el JSON en tu bundle o cárgalo desde su URL.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Añade com.airbnb.android:lottie-compose (o com.airbnb.android:lottie para vistas). Coloca el JSON en res/raw para usarlo sin conexión con LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'El paquete lottie es un reproductor escrito íntegramente en Dart para Android, iOS, web y escritorio.',
      },
    },
    expressionsTitle: 'Iconos con expresiones',
    expressionsHtml: (count: number) =>
      `${icons(count)} usan expresiones de After Effects (${code('loopOut')} o ${code('wiggle')}). En la web, reprodúcelos con la versión completa de lottie-web, no con ${code('lottie_light')}. Los reproductores nativos no evalúan expresiones, así que prueba estos iconos en iOS, Android y Flutter o elige otro; react-useanimations los reproduce tal como se diseñaron.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: '¿Estos iconos Lottie son gratis para uso comercial?',
        answer: `Sí. Los ${f.count} iconos Lottie tienen licencia MIT: úsalos, modifícalos y redistribúyelos en proyectos personales y comerciales, sin atribución obligatoria y sin necesidad de una cuenta para descargarlos.`,
      },
      {
        question: '¿En qué formato están los archivos Lottie?',
        answer: `Lottie JSON estándar (el formato Bodymovin) solo con capas de forma: sin imágenes, fuentes ni recursos externos. Cada icono está dibujado en una mesa de trabajo de 24 o 32 px, se escala a cualquier tamaño y pesa entre ${f.minSize} kB y ${f.maxSize} kB, con una mediana de ${f.medianSize} kB.`,
      },
      {
        question: '¿Necesito lottie-web para usar los iconos en React?',
        answer:
          'No. react-useanimations trae su propio reproductor de 8 kB sin dependencias, así que instalas un solo paquete e importas los iconos que necesitas. lottie-web solo hace falta fuera de React, en páginas web sin framework o en otros frameworks.',
      },
      {
        question: '¿Qué iconos necesitan la versión completa de lottie-web?',
        answer: `${icons(f.expressions.length)} usan expresiones de After Effects (loopOut o wiggle): ${list(f.expressions)}. En la web necesitan la versión completa de lottie-web; lottie_light ignora las expresiones. Los reproductores nativos (lottie-ios, lottie-android y el paquete lottie de Flutter) tampoco evalúan expresiones, así que estos iconos pueden moverse de otra forma en ellos.`,
      },
      {
        question: '¿Puedo cambiar el color de un icono Lottie?',
        answer:
          'En la web, el renderizador SVG de lottie-web escribe los colores como atributos, así que una regla CSS sobre los trazados cambia el color del icono. Los reproductores nativos usan sus API de propiedades dinámicas: ColorValueProvider en iOS, LottieProperty.COLOR y STROKE_COLOR en Android, y ValueDelegate.color en Flutter.',
      },
    ],
    byCategory: 'Iconos Lottie por categoría',
  },

  shadcn: {
    titles: (count: number) => [
      `Iconos animados para shadcn/ui: ${count} componentes`,
      'Iconos animados para shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} iconos animados para shadcn/ui: añade cualquier icono con un solo comando de la CLI de shadcn. Microinteracciones de hover, clic y bucle, MIT, sin lottie-web.`,
      `${count} iconos animados para shadcn/ui: añade cualquier icono con un comando de la CLI de shadcn. Con licencia MIT, sin lottie-web.`,
    ],
    title: 'Iconos animados para shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Iconos animados populares para shadcn/ui',
    badge: (count: number) => `${count} componentes · registro de shadcn · licencia MIT`,
    intro:
      'Todos los iconos de useAnimations están en un registro de shadcn. Un solo comando de la CLI añade a tu proyecto un componente de React tipado, con la interacción de hover, clic o bucle para la que fue diseñado, soporte para movimiento reducido y colores que siguen tu tema. El código queda en tu repositorio, como cualquier otro componente de shadcn/ui.',
    addTitle: 'Añadir un icono',
    addIntro: 'Ejecuta la CLI de shadcn con la URL del icono en el registro:',
    namingHtml: `El componente se llama ${code('Animated')} + el id del icono en PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) y se guarda en ${code('components/animations/&lt;id&gt;.tsx')}. La CLI también añade el wrapper compartido ${code('components/use-animation.tsx')} e instala ${code('react-useanimations')}, que trae su propio reproductor: no necesitas lottie-web.`,
    namespaceTitle: 'Nombres cortos con un namespace de registro',
    namespaceHtml: `Añade el registro a ${code('components.json')} una sola vez y después añade iconos por su nombre, varios a la vez:`,
    registryHtml: (registry: string) =>
      `El índice del registro en ${link(registry, '/r/registry.json')} recoge cada elemento con su título, categoría e interacción.`,
    usageTitle: 'Úsalo en un Button de shadcn',
    usageHtml: `Los componentes aceptan las mismas props que ${code('UseAnimations')}. Para un toggle como el icono de menú, pasa ${code('active')} y guarda el estado en tu botón; el icono se anima cada vez que cambia:`,
    colorHtml: (docs: string) =>
      `Los iconos siguen el color del texto, así que ${code('text-primary')} o ${code('text-muted-foreground')} les cambian el color y el modo oscuro no necesita nada más. Encontrarás más props y patrones en la ${link(docs, 'documentación')}.`,
    codeText: { closeMenu: 'Cerrar menú', openMenu: 'Abrir menú' },
    popular: 'Iconos populares para shadcn/ui',
    allIcons: (count: number) => `Los ${count} iconos`,
    popularNote: 'La página de cada icono (en inglés) muestra su comando de shadcn.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: '¿Los iconos animados para shadcn/ui son gratis?',
        answer: `Sí. Los ${f.count} iconos y el código de los componentes tienen licencia MIT, para proyectos personales y comerciales. El registro no requiere cuenta ni clave de API.`,
      },
      {
        question: '¿Qué añade la CLI de shadcn a mi proyecto?',
        answer: `El componente del icono en components/animations/<id>.tsx, el wrapper compartido del reproductor UseAnimation en components/use-animation.tsx (una sola vez, como dependencia del registro) y react-useanimations@^${f.version} desde npm. No necesitas lottie-web: el paquete trae su propio reproductor de 8 kB.`,
      },
      {
        question: '¿Los componentes funcionan con los server components de Next.js?',
        answer:
          'Sí. Los componentes están marcados con "use client" y dibujan la animación solo en el navegador, así que puedes renderizarlos desde server components y páginas sin imports dinámicos ni ssr: false.',
      },
      {
        question: '¿Puedo cambiar el aspecto y el movimiento de los iconos?',
        answer:
          'El código es tuyo y está en tu repositorio. Los componentes aceptan las props de UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop y speed. Los iconos siguen el color del texto, así que clases de Tailwind como text-primary o text-muted-foreground les cambian el color.',
      },
    ],
    byCategory: 'Explorar por categoría',
  },
};
