import { formIn, listIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import type { CategoryFacts, InteractionFacts } from '../en/hubs';
import { CATEGORY_OF, PLAYS_ONE } from './taxonomy';

const list = listIn('fr');
const plural = pluralIn('fr');
const form = formIn('fr');
const icons = (n: number) => plural(n, { one: 'icône', other: 'icônes' });
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

/** Up to `max` titles, then 'et N autres'. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} et ${items.length - max} autres`
    : list(items);

/** How the icons also come as static SVGs, after "en animation Lottie JSON". */
const svgNote = (f: CategoryFacts) => {
  if (f.withSvg === f.count) return ', ainsi qu’en SVG statique';
  return f.withSvg
    ? `, et ${f.withSvg} ${form(f.withSvg, { one: 'd’entre elles existe', other: 'd’entre elles existent' })} aussi en SVG statique`
    : '';
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} pour React et Lottie`,
      `${f.title} pour React`,
      `${f.title} gratuites`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const name = lower(f.title);
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} ${name} gratuites, dont ${examples}. Micro-animations au survol, au clic et en boucle pour React, shadcn/ui et Lottie JSON, sous licence MIT.`,
        `${f.count} ${name} gratuites, dont ${examples}. Pour React, shadcn/ui et Lottie JSON, sous licence MIT.`,
        `${f.count} ${name} gratuites, dont ${examples}. Pour React, shadcn/ui et Lottie, MIT.`,
        `${f.count} ${name} gratuites pour React, shadcn/ui et Lottie JSON, sous licence MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const groups = f.groups.map(
        ({ interaction, count, plays }) =>
          `${count} ${form(count, { one: PLAYS_ONE[interaction], other: plays })}`
      );
      const plays =
        f.groups.length === 1
          ? form(f.count, {
              one: `L’unique icône ${PLAYS_ONE[f.groups[0].interaction]}`,
              other: `Les ${f.count} icônes ${f.groups[0].plays}`,
            })
          : `Sur les ${f.count} icônes, ${list(groups)}`;
      return `${plays}. Chacune est disponible en composant React, en composant shadcn/ui et en animation Lottie JSON${svgNote(f)}, gratuitement pour un usage commercial sous licence MIT.`;
    },
    faq: (f: CategoryFacts) => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `Quelles ${name} sont incluses ?`,
          answer: `${icons(f.count)} : ${titles(f.titles)}. Toutes sont gratuites pour les projets personnels et commerciaux sous licence MIT, sans attribution obligatoire.`,
        },
        {
          question: `Comment utiliser ces ${name} dans React ?`,
          answer: `Installez react-useanimations, ajoutez ${ex.importLine} et affichez <UseAnimations animation={${ex.exportName}} size={32} />. L’icône joue son interaction « ${lower(ex.interactionLabel)} » et suit la couleur du texte. Avec shadcn/ui, lancez plutôt ${ex.shadcnCommand}.`,
        },
        {
          question: `Puis-je utiliser ces ${name} sans React ?`,
          answer: `Oui. Chaque icône est un fichier Lottie JSON disponible à l’adresse ${f.site}/icons/<id>.json (par exemple ${f.site}/icons/${ex.id}.json), lisible avec lottie-web, lottie-ios, lottie-android ou le package lottie de Flutter${svgNote(f) ? ' ; les SVG statiques se trouvent sur la page de chaque icône (en anglais)' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} ${form(n, {
                  one: 'utilise des expressions After Effects : sur le web, il lui faut donc la version complète de lottie-web.',
                  other:
                    'utilisent des expressions After Effects : sur le web, il leur faut donc la version complète de lottie-web.',
                })}`
              : 'Aucune n’utilise d’expressions : la version light de lottie-web suffit.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · licence MIT`,
    allIcons: (name: string) => `Toutes les icônes ${CATEGORY_OF[name] ?? `« ${name} »`}`,
    whereToUse: 'Où les utiliser',
    byInteraction: 'Par interaction',
    addOne: 'En ajouter une à votre app',
    addOneHtml: (label: string, name: string) =>
      `Avec React, installez ${code('react-useanimations')} et importez l’icône : elle joue d’elle-même son interaction « ${lower(label)} ». Toutes les icônes de cette catégorie fonctionnent de la même façon : remplacez ${code(name)} par le nom indiqué sur leur page.`,
    shadcnHtml: (href: string) =>
      `Avec ${link(href, 'shadcn/ui')}, la CLI ajoute un composant prêt à l’emploi :`,
    noReactHtml: (href: string) =>
      `Vous n’utilisez pas React ? Chaque icône est un fichier Lottie JSON à l’adresse ${code('/icons/&lt;id&gt;.json')} ; la page ${link(href, 'Icônes Lottie')} présente les lecteurs pour le web, iOS, Android et Flutter.`,
    more: 'Autres catégories',
    allIconsButton: 'Toutes les icônes',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} pour React et Lottie`,
      `${f.title} pour React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const name = lower(f.title);
      return [
        `${f.count} ${name} gratuites qui ${f.plays}, comme ${list(f.titles.slice(0, 3))}. Pour React, shadcn/ui et Lottie JSON, sous licence MIT.`,
        `${f.count} ${name} gratuites qui ${f.plays}. Pour React, shadcn/ui et Lottie JSON, sous licence MIT.`,
        `${f.count} ${name} gratuites pour React, shadcn/ui et Lottie JSON, sous licence MIT.`,
      ];
    },
    faq: (f: InteractionFacts) => [
      {
        question: `Quelles icônes utilisent l’interaction « ${lower(f.label)} » ?`,
        answer: `${icons(f.count)} : ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Que se passe-t-il quand l’utilisateur a activé la réduction des animations ?',
        answer: `${f.reducedMotion} Le composant React lit prefers-reduced-motion et se met à jour quand le réglage change : vous n’avez aucun code à écrire pour cela.`,
      },
      {
        question: 'Comment changer l’interaction d’une icône ?',
        answer: `Chaque icône joue l’interaction pour laquelle elle a été conçue. Passez interaction="${f.interaction}" pour donner ce comportement à n’importe quelle autre icône, ou une autre valeur ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') pour en changer. Les props autoplay, loop et speed règlent la lecture.${
          f.interaction === 'click-toggle'
            ? ' Pour piloter l’état vous-même, passez active={isOn} et mettez-le à jour dans onClick : les clics ne font alors plus basculer l’icône d’eux-mêmes.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Toutes les icônes « ${lower(label)} »`,
    behaviour: 'Comportement',
    hoverNote:
      ' Sur écran tactile, un tap ne déclenche pas les animations au survol ; le focus clavier, lui, les déclenche quand l’icône se trouve dans un élément focusable.',
    handled: 'Le composant React gère tout cela : vous n’avez qu’à choisir l’icône.',
    whereToUse: 'Où l’utiliser',
    byCategory: 'Par catégorie',
    useInReact: 'Utilisation dans React',
    overrideHtml: `Les icônes listées ici jouent cette interaction par défaut. Toute autre icône peut aussi l’utiliser : passez-lui la prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} utilise normalement '${interaction}'`,
    extra: {
      loop: 'Les boucles démarrent seules et se mettent en pause quand elles sortent de l’écran. Ralentissez-en une avec speed, jouez-la une seule fois avec loop={false} ou gardez-la immobile avec autoplay={false} :',
      'click-toggle':
        'Les clics font basculer l’icône d’eux-mêmes. Pour la synchroniser avec votre état, passez active : l’icône s’anime chaque fois que active change, et les clics ne la font plus basculer seuls.',
      'click-replay':
        'Placez l’icône dans un vrai bouton grâce à la render prop, pour qu’elle puisse recevoir le focus et être annoncée. Votre onClick s’exécute en premier ; appelez event.preventDefault() pour sauter l’animation.',
      hover:
        'Placez l’icône dans un lien ou un bouton grâce à la render prop : l’animation se joue alors aussi quand l’élément reçoit le focus clavier, et un tap sur écran tactile ne la déclenche pas.',
      'hover-replay':
        'Déclenchez l’animation au survol de toute la carte ou de tout le lien, pas seulement de l’icône : avec la render prop, les événements sont posés sur votre élément, et le focus clavier lance aussi l’animation.',
      'hover-loop':
        'Utilisez la render prop pour que tout le lien déclenche la boucle, focus clavier compris. Changez le rythme avec speed :',
    },
    codeText: {
      halfSpeed: 'demi-vitesse',
      playsOnce: 'se joue une fois, puis s’arrête',
      staticFrame: 'première image, fixe',
      endState: 'true affiche l’état final',
      closeMenu: 'Fermer le menu',
      openMenu: 'Ouvrir le menu',
      download: 'Télécharger',
      archive: 'Archives',
      weeklyGrowth: 'Croissance hebdomadaire',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Toutes les props sont décrites dans la ${link(docs, 'documentation')}. En dehors de React, les icônes sont des fichiers Lottie JSON ; la page ${link(lottie, 'Icônes Lottie')} montre comment recréer les interactions avec lottie-web.`,
    other: 'Autres interactions',
    browseByCategory: 'Parcourir par catégorie',
  },
};
