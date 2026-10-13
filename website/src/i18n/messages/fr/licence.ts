import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Licence et conditions — useAnimations',
  description:
    'Les icônes useAnimations et le package react-useanimations sont sous licence MIT : usage personnel et commercial, redistribution libre, sans attribution.',
  name: 'Licence et conditions',
  heading: 'Libre d’utilisation. Sous licence MIT.',
  introHtml: (mitHref: string) =>
    `Les icônes useAnimations et le package <code>react-useanimations</code> sont publiés sous <a href="${mitHref}">licence MIT</a>.`,
  canDo: 'Ce que vous pouvez faire',
  canDoItemsHtml: [
    '<strong>Utiliser</strong> les icônes dans des sites, des apps et des produits, personnels comme commerciaux.',
    '<strong>Les modifier</strong> : changer les couleurs, les tailles, le timing ou le mouvement lui-même.',
    '<strong>Les redistribuer</strong>, y compris au sein de packs d’icônes, de templates, de thèmes, de kits UI et de registres de composants.',
  ],
  attribution: 'Attribution',
  attributionText:
    'Elle n’est pas obligatoire, mais elle fait plaisir. Conservez la notice de licence si vous redistribuez les fichiers eux-mêmes, et si vous souhaitez nous citer :',
  credit: (link: string) => `Icônes animées par ${link}`,
  noWarranty: 'Absence de garantie',
  noWarrantyText: 'Les icônes et le code sont fournis tels quels, sans garantie d’aucune sorte.',
  licenseText: 'Texte de la licence',
  bindingNote:
    'Le texte de licence ci-dessous est la version originale en anglais, seule juridiquement contraignante.',
};
