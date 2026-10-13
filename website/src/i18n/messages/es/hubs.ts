// Páginas de categoría e interacción: frases generadas con gramática española.
import type { Interaction } from 'react-useanimations';
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { formIn, listIn, pluralIn } from '../../format';

const list = listIn('es');
const plural = pluralIn('es');
const form = formIn('es');
const icons = (n: number) => plural(n, { one: 'icono', other: 'iconos' });
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

/** Hasta `max` títulos y después «y N más». */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} y ${items.length - max} más`
    : list(items);

/** Cómo se reproduce un solo icono (las frases de `plays` están en plural). */
const PLAYS_ONE: Record<Interaction, string> = {
  loop: 'se reproduce sin parar',
  'click-toggle': 'alterna entre dos estados al hacer clic',
  'click-replay': 'se repite con cada clic',
  hover: 'se reproduce con hover y retrocede al salir el cursor',
  'hover-replay': 'se reproduce una vez con hover',
  'hover-loop': 'se repite en bucle mientras el cursor está encima',
};

/** Los formatos de cada icono, con los SVG estáticos si los hay. */
const formats = (f: CategoryFacts) => {
  if (f.withSvg === f.count)
    return 'como componente de React, componente de shadcn/ui, animación Lottie JSON y SVG estático';
  const base = 'como componente de React, componente de shadcn/ui y animación Lottie JSON';
  if (!f.withSvg) return base;
  return `${base} (${f.withSvg} de ellos también como SVG estático)`;
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

/** «Todos los iconos de …»; la categoría «Otros» se nombra aparte. */
const allOf = (name: string) =>
  name === 'Otros' ? 'Todos los demás iconos' : `Todos los iconos de ${name.toLowerCase()}`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} para React y Lottie`,
      `${f.title} para React`,
      `${f.title} gratis`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const name = lower(f.title);
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} ${name} gratis, como ${examples}. Microanimaciones con hover, clic y bucle para React, shadcn/ui y Lottie JSON, con licencia MIT.`,
        `${f.count} ${name} gratis, como ${examples}. Para React, shadcn/ui y Lottie JSON, con licencia MIT.`,
        `${f.count} ${name} gratis, como ${examples}. Para React, shadcn/ui y Lottie, MIT.`,
        `${f.count} ${name} gratis para React, shadcn/ui y Lottie JSON, con licencia MIT.`,
        `${f.count} ${name} gratis para React, shadcn/ui y Lottie, MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const first =
        f.groups.length === 1
          ? f.count === 1
            ? `El icono ${PLAYS_ONE[f.groups[0].interaction]}`
            : `Los ${f.count} iconos ${f.groups[0].plays}`
          : `De los ${f.count} iconos, ${list(
              f.groups.map(({ interaction, count, plays }) =>
                count === 1 ? `1 ${PLAYS_ONE[interaction]}` : `${count} ${plays}`
              )
            )}`;
      return `${first}. Cada uno se ofrece ${formats(f)}, gratis para uso comercial con la licencia MIT.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `¿Qué ${name} se incluyen?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Todos son gratis para proyectos personales y comerciales con la licencia MIT, sin necesidad de atribución.`,
        },
        {
          question: `¿Cómo uso estos ${name} en React?`,
          answer: `Instala react-useanimations, añade ${ex.importLine} y renderiza <UseAnimations animation={${ex.exportName}} size={32} />. El icono reproduce su interacción “${ex.interactionLabel}” y sigue el color del texto. Con shadcn/ui, ejecuta en su lugar ${ex.shadcnCommand}.`,
        },
        {
          question: `¿Puedo usar estos ${name} sin React?`,
          answer: `Sí. Cada icono es un archivo Lottie JSON en ${f.site}/icons/<id>.json (por ejemplo, ${f.site}/icons/${ex.id}.json) que se reproduce con lottie-web, lottie-ios, lottie-android o el paquete lottie de Flutter${f.withSvg ? '; los SVG estáticos están en la página de cada icono (en inglés)' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} ${form(n, { one: 'usa', other: 'usan' })} expresiones de After Effects, así que en la web ${form(n, { one: 'necesita', other: 'necesitan' })} la versión completa de lottie-web.`
              : 'Ninguno usa expresiones, así que basta con la versión ligera de lottie-web.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · licencia MIT`,
    allIcons: allOf,
    whereToUse: 'Dónde usarlos',
    byInteraction: 'Por interacción',
    addOne: 'Añade uno a tu app',
    addOneHtml: (label: string, name: string) =>
      `Con React, instala ${code('react-useanimations')} e importa el icono; reproducirá por sí solo su interacción “${label}”. Todos los iconos de esta categoría funcionan igual: cambia ${code(name)} por el nombre que aparece en la página de cada uno.`,
    shadcnHtml: (href: string) =>
      `Con ${link(href, 'shadcn/ui')}, la CLI añade un componente listo para usar:`,
    noReactHtml: (href: string) =>
      `¿No usas React? Cada icono es un archivo Lottie JSON en ${code('/icons/&lt;id&gt;.json')}; en ${link(href, 'Iconos Lottie')} encontrarás reproductores para web, iOS, Android y Flutter.`,
    more: 'Más categorías',
    allIconsButton: 'Todos los iconos',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} para React y Lottie`,
      `${f.title} para React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const name = lower(f.title);
      return [
        `${f.count} ${name} gratis que ${f.plays}, como ${list(f.titles.slice(0, 3))}. Para React, shadcn/ui y Lottie JSON, con licencia MIT.`,
        `${f.count} ${name} gratis que ${f.plays}. Para React, shadcn/ui y Lottie JSON, con licencia MIT.`,
        `${f.count} ${name} gratis para React, shadcn/ui y Lottie JSON, con licencia MIT.`,
      ];
    },
    faq: (f: InteractionFacts): Faq => [
      {
        question: `¿Qué iconos usan la interacción “${f.label}”?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: '¿Qué pasa cuando el usuario prefiere movimiento reducido?',
        answer: `${f.reducedMotion} El componente de React lee prefers-reduced-motion y se actualiza cuando cambia el ajuste, así que no necesitas escribir código para ello.`,
      },
      {
        question: '¿Cómo cambio la interacción de un icono?',
        answer: `Cada icono reproduce la interacción para la que fue diseñado. Pasa interaction="${f.interaction}" para dar este comportamiento a cualquier otro icono, u otro valor ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') para cambiarlo. Las props autoplay, loop y speed ajustan la reproducción.${
          f.interaction === 'click-toggle'
            ? ' Para controlar el estado tú mismo, pasa active={isOn} y actualízalo en onClick: así los clics dejan de alternar el icono por sí solos.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Todos los iconos con la interacción “${label}”`,
    behaviour: 'Cómo se comporta',
    hoverNote:
      ' En pantallas táctiles, un toque no inicia las animaciones de hover; el foco del teclado sí, cuando el icono está dentro de un elemento enfocable.',
    handled: 'El componente de React se encarga de todo esto; tú solo eliges el icono.',
    whereToUse: 'Dónde usarlos',
    byCategory: 'Por categoría',
    useInReact: 'Úsalo en React',
    overrideHtml: `Los iconos de esta lista usan esta interacción por defecto, pero cualquier otro icono también puede usarla: pasa la prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} usa normalmente '${interaction}'`,
    extra: {
      loop: 'Los bucles se reproducen automáticamente y se pausan cuando quedan fuera de la vista. Ralentiza uno con speed, reprodúcelo una sola vez con loop={false} o déjalo quieto con autoplay={false}:',
      'click-toggle':
        'Los clics alternan el icono por sí solos. Para mantenerlo sincronizado con tu estado, pasa active: el icono se anima cada vez que active cambia y los clics ya no lo alternan por su cuenta.',
      'click-replay':
        'Coloca el icono dentro de un botón real con la render prop, para que pueda recibir el foco y los lectores de pantalla lo anuncien. Tu onClick se ejecuta primero; llama a event.preventDefault() para omitir la animación.',
      hover:
        'Coloca el icono dentro de un enlace o un botón con la render prop: así la animación también se reproduce cuando el elemento recibe el foco del teclado, y los toques en pantallas táctiles no la activan.',
      'hover-replay':
        'Aplica el hover a toda la tarjeta o el enlace, no solo al icono: con la render prop los eventos van a tu elemento, y el foco del teclado también reproduce la animación.',
      'hover-loop':
        'Usa la render prop para que todo el enlace active el bucle, también con el foco del teclado. Cambia el ritmo con speed:',
    },
    codeText: {
      halfSpeed: 'a mitad de velocidad',
      playsOnce: 'se reproduce una vez y se detiene',
      staticFrame: 'primer fotograma estático',
      endState: 'true muestra el estado final',
      closeMenu: 'Cerrar menú',
      openMenu: 'Abrir menú',
      download: 'Descargar',
      archive: 'Archivo',
      weeklyGrowth: 'Crecimiento semanal',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Todas las props están en la ${link(docs, 'documentación')}. Fuera de React, los iconos son archivos Lottie JSON; en ${link(lottie, 'Iconos Lottie')} verás cómo recrear las interacciones con lottie-web.`,
    other: 'Otras interacciones',
    browseByCategory: 'Explorar por categoría',
  },
};
