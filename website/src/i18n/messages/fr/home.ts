import type { Messages } from '../en';
import type { FaqLinks } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Micro-animations et icônes animées — useAnimations',
  description: (count: number) =>
    `${count} micro-animations gratuites pour vos interfaces : une bibliothèque d’icônes animées pour React, shadcn/ui et Lottie, survol, clic et boucle inclus. MIT.`,

  hero: {
    badge: (count: number) => `${count} icônes · zéro dépendance · MIT`,
    headline: { start: 'Des icônes qui ', accent: 'prennent vie.', end: '' },
    h1: 'Icônes animées gratuites pour React, shadcn/ui et Lottie',
    intro: (count: number) =>
      `${count} micro-animations faites main, avec des micro-interactions au survol, au clic et en boucle déjà intégrées. Utilisez-les comme composant React, ajoutez-les avec shadcn ou téléchargez-les en SVG et en Lottie JSON. Sous licence MIT.`,
    browse: 'Parcourir les icônes',
    fieldHint: 'Passez le pointeur sur le champ d’icônes.',
  },

  numbers: {
    label: 'En bref',
    icons: 'icônes animées',
    interactions: 'interactions intégrées',
    size: 'pour le lecteur, gzippé',
    dependencies: 'dépendance',
  },

  interactions: {
    eyebrow: 'Interactions intégrées',
    title: 'Chaque icône sait comment bouger.',
    intro:
      'Chaque icône est livrée avec l’interaction pour laquelle elle a été conçue. Il suffit de l’ajouter pour qu’elle fonctionne, ou d’en choisir une autre avec une seule prop. Essayez :',
    demos: {
      loop: 'Se joue en continu, pour les chargements et les statuts d’ambiance.',
      'click-toggle': 'Bascule entre deux états : menu et fermer, lecture et pause.',
      'click-replay': 'Rejoue l’animation depuis le début à chaque clic, en guise de retour.',
      hover: 'Se joue vers l’avant à l’entrée du pointeur et en arrière à sa sortie.',
      'hover-loop': 'Boucle pendant le survol et termine son cycle à la sortie.',
      'hover-replay': 'Se joue une fois depuis le début à chaque entrée du pointeur.',
    },
  },

  browser: {
    eyebrow: 'La bibliothèque',
    title: (count: number) => `${count} icônes animées gratuites`,
    intro:
      'Survolez ou cliquez pour lancer l’animation. Ouvrez une icône pour obtenir son code et ses fichiers : Lottie JSON, SVG et ZIP.',
    search: 'Rechercher des icônes',
    searchPlaceholder: (count: number) =>
      `Rechercher parmi ${count} icônes (en anglais) : « eye », « bell », « arrow »`,
    interaction: 'Interaction',
    allInteractions: 'Toutes les interactions',
    color: 'Couleur des icônes',
    colors: {
      text: 'Couleur du texte',
      indigo: 'Indigo',
      red: 'Rouge',
      amber: 'Ambre',
      teal: 'Bleu sarcelle',
      violet: 'Violet',
    },
    customColor: 'Couleur personnalisée',
    size: 'Taille',
    category: 'Catégorie',
    all: 'Toutes',
    count: { one: '{n} icône', other: '{n} icônes' },
    noMatch: 'Aucune icône ne correspond.',
    noMatchHintHtml: (href: string) =>
      `Essayez un autre mot ou ${link(href, 'proposez une icône')}.`,
  },

  everywhere: {
    eyebrow: 'Utilisez-les à votre façon',
    title: 'Installer, importer, c’est tout.',
    intro:
      'Un composant React sans dépendance, un registre shadcn, des fichiers téléchargeables aux URL stables et un catalogue lisible par les agents IA.',
    docs: 'Lire la documentation',
    tablist: 'Plateforme',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Fichiers', agents: 'Agents' },
    codeText: {
      afterAdding: 'puis',
      files: 'Chaque icône en SVG, en animation (Lottie JSON) et en ZIP réunissant les deux',
    },
  },

  features: {
    title: 'Légères, accessibles et faciles à styler.',
    colors: 'Suit vos couleurs',
    colorsHtml: `Les icônes utilisent ${code('currentColor')} : elles reprennent d’elles-mêmes la couleur du texte, les états de survol et le mode sombre. Pour en changer, passez par une prop, une classe ou du CSS classique.`,
    tiny: 'Légère par conception',
    tinyText: 'Un lecteur intégré, zéro dépendance. Chaque icône est un module à part de 2 kB.',
    accessible: 'Accessible par défaut',
    accessibleText:
      'Respecte la réduction des animations, joue les animations de survol au focus clavier et reste invisible pour les lecteurs d’écran, sauf si vous lui donnez un libellé.',
    ssr: 'Prête pour le rendu serveur',
    ssrText:
      'Un composant client qui s’affiche sans risque dans Next.js, Remix et Astro. Les icônes sont de simples données, importables n’importe où.',
    agents: 'Pensée pour les agents',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Un catalogue typé avec des mots-clés pour chaque icône, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} et une documentation en Markdown.`,
  },

  browse: {
    title: 'Trouvez la bonne micro-animation.',
    byCategory: 'Parcourir par catégorie',
    byInteraction: 'Parcourir par interaction',
    formats: 'Toutes les icônes et tous les formats',
  },

  hubs: {
    icons: 'Toutes les icônes animées',
    categories: 'Catégories d’icônes',
    interactions: 'Icônes par interaction',
    lottie: 'Icônes Lottie (JSON)',
    shadcn: 'Icônes animées shadcn/ui',
  },

  faqTitle: 'Questions fréquentes',
  faq: (f: { version: string; links: FaqLinks }) => [
    {
      question: 'Que sont les micro-animations et les icônes animées ?',
      answer:
        'Les micro-animations sont des mouvements courts, au rôle unique, qui répondent à une action de l’utilisateur : une icône de menu qui se transforme en bouton de fermeture, un cœur qui se remplit quand on aime une publication, une cloche qui sonne à l’arrivée d’une notification. Les icônes animées en sont la forme la plus courante. Elles rendent une interface plus réactive et signalent les changements d’état sans texte supplémentaire.',
    },
    {
      question: 'Quelle différence entre les fichiers Lottie et SVG ?',
      answer:
        'Le fichier Lottie JSON contient toute l’animation et se lit dans n’importe quel lecteur Lottie, y compris celui intégré à react-useanimations. Les fichiers SVG sont des images fixes de l’icône au repos, une par état (par exemple eye et eye-off), pour les endroits où rien ne doit bouger : e-mails, documents, outils de design ou solution de repli sans JavaScript.',
    },
    {
      question: 'Est-ce compatible avec Next.js et le rendu côté serveur ?',
      answer:
        "Oui. Le composant est marqué 'use client' et ne dessine l’animation que dans le navigateur : il s’affiche donc depuis les server components et les frameworks SSR comme Next.js, Remix et Astro, sans import dynamique. Les modules d’icônes sont de simples données que les server components peuvent importer et transmettre en props.",
      link: { href: f.links.serverRendering, label: 'Next.js et rendu côté serveur' },
    },
    {
      question: 'Puis-je utiliser les icônes dans des projets commerciaux ?',
      answer:
        'Oui. Les icônes et le package react-useanimations sont sous licence MIT : utilisez-les, modifiez-les et redistribuez-les dans vos projets personnels et commerciaux. L’attribution est appréciée, mais pas obligatoire.',
      link: { href: f.links.licence, label: 'Licence et conditions' },
    },
    {
      question: 'Puis-je utiliser les icônes sans React ?',
      answer:
        'Oui. Chaque icône est un fichier Lottie JSON standard : elle se lit avec lottie-web en JavaScript pur, dans Vue, Svelte, Angular ou un CMS, ainsi qu’avec les lecteurs Lottie pour iOS, Android et Flutter. La page Icônes Lottie donne les URL des fichiers et des extraits lottie-web prêts à l’emploi pour chaque interaction.',
      link: { href: f.links.lottie, label: 'Icônes Lottie' },
    },
    {
      question: 'Quel poids les icônes ajoutent-elles à mon bundle ?',
      answer: `Le lecteur de react-useanimations ${f.version} pèse environ 8 kB gzippé, sans dépendance, et chaque icône est un module à part de 1 à 15 kB (2 kB en médiane) : votre bundle ne contient que les icônes que vous importez.`,
    },
  ],

  cta: {
    title: { start: 'Donnez du ', accent: 'rythme', end: ' à votre interface.' },
    text: 'Gratuit et sous licence MIT, pour vos projets personnels et commerciaux.',
    start: 'Commencer',
  },

  schema: {
    software: (count: number) =>
      `Composant React et ${count} icônes animées (Lottie) avec interactions au survol, au clic et en boucle intégrées. Sans dépendance.`,
    catalogName: 'Catalogue d’icônes useAnimations',
    catalog: (count: number) =>
      `Les ${count} icônes useAnimations, chacune avec son id, son titre, sa catégorie, ses mots-clés, son interaction, les URL Lottie JSON, SVG et ZIP, l’import React et la commande shadcn.`,
  },
};
