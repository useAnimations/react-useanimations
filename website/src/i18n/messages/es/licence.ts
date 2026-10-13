// La página de licencia (/licencing-and-terms). El texto de LICENSE se muestra en inglés.
import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Licencia y condiciones — useAnimations',
  description:
    'Los iconos de useAnimations y el paquete react-useanimations tienen licencia MIT: uso personal y comercial y redistribución gratis, sin atribución.',
  name: 'Licencia y condiciones',
  heading: 'De uso libre. Con licencia MIT.',
  introHtml: (mitHref: string) =>
    `Los iconos de useAnimations y el paquete <code>react-useanimations</code> se publican bajo la <a href="${mitHref}">licencia MIT</a>.`,
  canDo: 'Qué puedes hacer',
  canDoItemsHtml: [
    '<strong>Usar</strong> los iconos en sitios web, aplicaciones y productos personales y comerciales.',
    '<strong>Modificarlos</strong>: cambiar colores, tamaños, tiempos o el propio movimiento.',
    '<strong>Redistribuirlos</strong>, también dentro de packs de iconos, plantillas, temas, kits de UI y registros de componentes.',
  ],
  attribution: 'Atribución',
  attributionText:
    'No es obligatoria, pero se agradece. Conserva el aviso de licencia cuando redistribuyas los propios archivos y, si quieres mencionarnos:',
  credit: (link: string) => `Iconos animados de ${link}`,
  noWarranty: 'Sin garantía',
  noWarrantyText: 'Los iconos y el código se ofrecen tal cual, sin garantía de ningún tipo.',
  licenseText: 'Texto de la licencia',
  bindingNote:
    'El texto de la licencia que aparece a continuación es la versión original en inglés, que es la jurídicamente vinculante.',
};
