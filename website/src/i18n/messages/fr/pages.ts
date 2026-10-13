import { formIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import { CATEGORY_OF } from './taxonomy';

const plural = pluralIn('fr');
const iconCount = (n: number) => plural(n, { one: 'icône', other: 'icônes' });
const uses = (n: number) => formIn('fr')(n, { one: 'utilise', other: 'utilisent' });

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Les ${count} icônes animées, par catégorie`,
      `Les ${count} icônes animées`,
    ],
    descriptions: (count: number, categories: number) => [
      `Toutes les icônes useAnimations sur une page : ${count} icônes animées gratuites dans ${categories} catégories, pour React, shadcn/ui, Lottie JSON et SVG. Licence MIT.`,
      `${count} icônes animées gratuites dans ${categories} catégories, pour React, shadcn/ui, Lottie JSON et SVG. Licence MIT.`,
    ],
    title: 'Toutes les icônes animées',
    badge: (count: number) => `${iconCount(count)} · licence MIT`,
    introHtml: (browser: string) =>
      `Toutes les icônes du jeu, regroupées par catégorie. Ouvrez-en une pour voir un aperçu animé, son code React et shadcn/ui, et télécharger les fichiers Lottie JSON, SVG et ZIP. Pour chercher par mot-clé et tester les animations sur place, utilisez l’${link(browser, 'explorateur d’icônes')}.`,
    categoriesNav: 'Catégories',
    byInteraction: 'Par interaction :',
    categoryLink: (count: number, name: string) =>
      `${iconCount(count)} ${CATEGORY_OF[name] ?? `« ${name} »`} →`,
  },

  categories: {
    titles: (categories: number) => [
      `Catégories d’icônes animées : ${categories} collections`,
      'Catégories d’icônes animées',
    ],
    descriptions: (icons: number, categories: number) => [
      `${icons} icônes animées gratuites réparties en ${categories} catégories : navigation, actions, médias, chargement, réseaux sociaux, etc. Pour React, shadcn/ui et Lottie.`,
      `${icons} icônes animées gratuites en ${categories} catégories, pour React, shadcn/ui et Lottie.`,
    ],
    title: 'Catégories d’icônes animées',
    badge: (icons: number, categories: number) => `${icons} icônes · ${categories} catégories`,
    introHtml: (interactions: string) =>
      `Chaque icône useAnimations appartient à une catégorie, des flèches de navigation aux logos de réseaux sociaux en passant par les contrôles multimédias et les indicateurs de chargement. Ouvrez une catégorie pour voir toutes ses icônes, où les utiliser et le code pour en ajouter une, ou parcourez plutôt les icônes par ${link(interactions, 'interaction')}.`,
    iconCount,
  },

  interactions: {
    titles: [
      'Micro-interactions : icônes au survol, au clic, en boucle',
      'Micro-interactions pour icônes animées',
    ],
    descriptions: (icons: number, interactions: number) => [
      `${icons} icônes animées réparties en ${interactions} micro-interactions : boucle, bascule au clic, relecture au clic, survol, lecture au survol et boucle au survol. Avec gestion de la réduction des animations.`,
      `${icons} icônes animées en ${interactions} micro-interactions : boucle, clic et survol, avec gestion de la réduction des animations.`,
    ],
    title: 'Interactions des icônes animées',
    badge: (interactions: number, icons: number) =>
      `${interactions} interactions · ${icons} icônes`,
    introHtml: `Chaque icône est livrée avec la micro-interaction pour laquelle elle a été conçue : elle boucle, bascule ou se rejoue au clic, ou se joue au survol. Le composant React s’occupe du branchement et respecte la réduction des animations, et la prop <code class="font-mono text-base text-fg">interaction</code> permet de passer n’importe quelle icône à une autre interaction.`,
    iconCount,
    chooseTitle: 'Choisir une interaction',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Un état qui dure')}, comme un chargement ou une alerte active : ${link(href, 'boucle')}.`,
      'click-toggle': (href: string) =>
        `${strong('Un contrôle on/off')}, comme couper le son, le menu ou afficher le mot de passe : ${link(href, 'bascule au clic')}, avec ${code('active')} pour un état contrôlé.`,
      'click-replay': (href: string) =>
        `${strong('Une action ponctuelle')}, comme envoyer, enregistrer ou actualiser : ${link(href, 'relecture au clic')}.`,
      hover: (href: string) =>
        `${strong('Un aperçu de ce qu’ouvre un lien')} : ${link(href, 'survol')}, qui revient en arrière quand le pointeur s’en va.`,
      'hover-replay': (href: string) =>
        `${strong('Les barres d’outils et les listes que l’on balaie du pointeur')} : ${link(href, 'lecture au survol')}, qui va au bout de l’animation d’elle-même.`,
      'hover-loop': (href: string) =>
        `${strong('Les liens qui invitent à s’attarder')}, comme les icônes de réseaux sociaux : ${link(href, 'boucle au survol')}.`,
    },
    motionTitle: 'Réduction des animations',
    motionHtml: `Le composant React suit ${code('prefers-reduced-motion')} et se met à jour quand le réglage change. Sur écran tactile, un tap ne déclenche jamais les animations au survol.`,
    reducedMotion: {
      loop: 'l’icône ne démarre pas seule et reste sur sa première image, fixe.',
      'click-toggle': 'un clic passe immédiatement à l’autre état, sans l’animation intermédiaire.',
      'click-replay':
        'les clics atteignent toujours votre gestionnaire, mais l’animation ne se joue pas.',
      hover: 'le survol ne déclenche pas l’animation.',
      'hover-replay': 'le survol ne déclenche pas l’animation.',
      'hover-loop': 'l’icône reste fixe pendant le survol.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Icônes Lottie gratuites : ${count} icônes animées en JSON`,
      'Icônes Lottie gratuites',
    ],
    descriptions: (count: number) => [
      `${count} icônes Lottie gratuites en Lottie JSON standard, sous licence MIT. Code prêt à copier pour lottie-web, dotLottie, React, React Native, iOS, Android et Flutter.`,
      `${count} icônes Lottie gratuites en JSON, sous licence MIT. Code pour lottie-web, dotLottie, React, React Native, iOS, Android et Flutter.`,
    ],
    title: 'Icônes Lottie gratuites',
    crumb: 'Icônes Lottie',
    datasetName: 'Catalogue d’icônes useAnimations',
    datasetDescription: (count: number) =>
      `Métadonnées et URL des fichiers de ${count} icônes Lottie animées : id, titre, catégorie, mots-clés, interaction, taille et durée.`,
    badge: (count: number) => `${count} icônes · Lottie JSON · licence MIT`,
    intro:
      'Chaque icône useAnimations est une animation Lottie JSON standard : n’importe quel lecteur Lottie peut la jouer, que ce soit lottie-web sur le web, lottie-ios, lottie-android, Flutter ou React Native. Les fichiers sont gratuits sous licence MIT, sans inscription, et servis depuis des URL stables avec CORS activé : vous pouvez les charger directement ou les télécharger dans votre projet.',
    popular: 'Icônes Lottie populaires',
    allIcons: (count: number) => `Les ${count} icônes →`,
    filesTitle: 'Fichiers et URL',
    filesIntroHtml: `Chaque icône a sa page (en anglais) à l’adresse ${code('/icons/&lt;id&gt;')}, avec un aperçu et les téléchargements. Les fichiers eux-mêmes :`,
    files: {
      json: 'animation Lottie JSON',
      zip: 'le JSON et les SVG statiques',
      svg: 'SVG statique de chaque état',
      catalog: 'catalogue de toutes les icônes',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} liste chaque icône avec son id, son titre, sa catégorie, ses mots-clés, son interaction, sa taille, sa durée et les URL de ses fichiers : de quoi choisir facilement des icônes par mot-clé dans un script ou laisser un agent de code en sélectionner une. Les fichiers Lottie pèsent ${median} kB en médiane.`,
    players: {
      web: {
        title: 'Web : lottie-web',
        text: 'Le lecteur de référence, développé par Airbnb. Chargez-le depuis un CDN, indiquez-lui l’URL d’une icône et choisissez le moteur de rendu SVG, qui garde l’icône nette et permet de la recolorer en CSS. Utilisez la version complète (lottie.min.js) : la version light ignore les expressions.',
        cssLabel: 'Suivre la couleur du texte (rendu SVG)',
      },
      'web-interactions': {
        title: 'Web : interactions au survol et au clic',
        text: 'lottie-web sait lancer et arrêter une animation, mais les interactions sont à votre charge. Voici la bascule au clic de l’icône de menu, avec prise en charge de la réduction des animations ; toutes les interactions suivent le même schéma, et le composant React ci-dessous fait tout cela pour vous.',
      },
      dotlottie: {
        title: 'Web : composant web dotLottie',
        text: 'Le lecteur de LottieFiles fait le rendu dans un canvas avec un moteur WebAssembly et lit aussi bien le Lottie JSON standard que les fichiers .lottie. Un canvas conserve les couleurs du fichier : les icônes restent noires, sauf si vous recolorez le JSON.',
        jsLabel: 'Ou l’API JavaScript : npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React : react-useanimations',
        text: 'Aucun lecteur Lottie à installer : le package embarque son propre lecteur de 8 kB, joue l’interaction de chaque icône, suit la couleur du texte et respecte la réduction des animations. Chaque icône est un module distinct : vous ne livrez que celles que vous importez.',
      },
      'react-native': {
        title: 'React Native : lottie-react-native',
        text: 'Intégrez le JSON au bundle avec require() pour un usage hors ligne, ou chargez-le depuis son URL.',
      },
      ios: {
        title: 'iOS : lottie-ios (SwiftUI)',
        text: 'Ajoutez le package https://github.com/airbnb/lottie-spm.git avec Swift Package Manager, puis placez le JSON dans votre bundle ou chargez-le depuis son URL.',
      },
      android: {
        title: 'Android : lottie-android (Jetpack Compose)',
        text: 'Ajoutez com.airbnb.android:lottie-compose (ou com.airbnb.android:lottie pour les vues). Placez le JSON dans res/raw pour un usage hors ligne avec LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter : lottie',
        text: 'Le package lottie est un lecteur en pur Dart pour Android, iOS, le web et le desktop.',
      },
    },
    expressionsTitle: 'Icônes avec expressions',
    expressionsHtml: (count: number) =>
      `${iconCount(count)} ${uses(count)} des expressions After Effects (${code('loopOut')} ou ${code('wiggle')}). Sur le web, lisez-les avec la version complète de lottie-web, pas avec ${code('lottie_light')}. Les lecteurs natifs n’évaluent pas les expressions : testez ces icônes sur iOS, Android et Flutter ou choisissez-en une autre ; react-useanimations les joue telles qu’elles ont été conçues.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }) => [
      {
        question: 'Ces icônes Lottie sont-elles gratuites pour un usage commercial ?',
        answer: `Oui. Les ${f.count} icônes Lottie sont sous licence MIT : utilisez-les, modifiez-les et redistribuez-les dans vos projets personnels et commerciaux, sans attribution obligatoire et sans compte pour les télécharger.`,
      },
      {
        question: 'Quel est le format des fichiers Lottie ?',
        answer: `Du Lottie JSON standard (le format Bodymovin), uniquement avec des calques de forme : ni images, ni polices, ni ressources externes. Chaque icône est dessinée sur un plan de travail de 24 ou 32 px, s’adapte à toutes les tailles et pèse de ${f.minSize} kB à ${f.maxSize} kB, ${f.medianSize} kB en médiane.`,
      },
      {
        question: 'Faut-il lottie-web pour utiliser les icônes dans React ?',
        answer:
          'Non. react-useanimations embarque son propre lecteur de 8 kB, sans dépendance : vous installez un seul package et importez les icônes dont vous avez besoin. lottie-web ne sert qu’en dehors de React, sur des pages web classiques ou avec d’autres frameworks.',
      },
      {
        question: 'Quelles icônes nécessitent la version complète de lottie-web ?',
        answer: `${iconCount(f.expressions.length)} ${uses(f.expressions.length)} des expressions After Effects (loopOut ou wiggle) : ${f.expressions.join(', ')}. Sur le web, il leur faut la version complète de lottie-web ; lottie_light ignore les expressions. Les lecteurs natifs (lottie-ios, lottie-android, le package lottie de Flutter) ne les évaluent pas non plus : ces icônes peuvent donc s’y animer différemment.`,
      },
      {
        question: 'Puis-je changer la couleur d’une icône Lottie ?',
        answer:
          'Sur le web, le moteur de rendu SVG de lottie-web écrit les couleurs sous forme d’attributs : une règle CSS sur les tracés suffit à recolorer l’icône. Les lecteurs natifs passent par leurs API de propriétés dynamiques : ColorValueProvider sur iOS, LottieProperty.COLOR et STROKE_COLOR sur Android, ValueDelegate.color dans Flutter.',
      },
    ],
    byCategory: 'Icônes Lottie par catégorie',
  },

  shadcn: {
    titles: (count: number) => [
      `Icônes animées pour shadcn/ui : ${count} composants`,
      'Icônes animées pour shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} icônes animées pour shadcn/ui : ajoutez n’importe quelle icône avec une seule commande de la CLI shadcn. Micro-interactions au survol, au clic, en boucle. MIT.`,
      `${count} icônes animées pour shadcn/ui, à ajouter avec une seule commande de la CLI shadcn. Sous licence MIT, sans lottie-web.`,
    ],
    title: 'Icônes animées pour shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Icônes animées shadcn/ui populaires',
    badge: (count: number) => `${count} composants · registre shadcn · licence MIT`,
    intro:
      'Toutes les icônes useAnimations sont disponibles dans un registre shadcn. Une seule commande de la CLI ajoute à votre projet un composant React typé, avec l’interaction au survol, au clic ou en boucle pour laquelle l’icône a été conçue, la prise en charge de la réduction des animations et des couleurs qui suivent votre thème. Le code atterrit dans votre dépôt, comme n’importe quel autre composant shadcn/ui.',
    addTitle: 'Ajouter une icône',
    addIntro: 'Lancez la CLI shadcn avec l’URL de l’icône dans le registre :',
    namingHtml: `Le composant s’appelle ${code('Animated')} + l’id de l’icône en PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) et se place dans ${code('components/animations/&lt;id&gt;.tsx')}. La CLI ajoute aussi le wrapper partagé ${code('components/use-animation.tsx')} et installe ${code('react-useanimations')}, qui embarque son propre lecteur : pas besoin de lottie-web.`,
    namespaceTitle: 'Des noms courts avec un namespace de registre',
    namespaceHtml: `Ajoutez une fois le registre à ${code('components.json')}, puis ajoutez les icônes par leur nom, plusieurs à la fois :`,
    registryHtml: (registry: string) =>
      `L’index du registre, ${link(registry, '/r/registry.json')}, liste chaque élément avec son titre, sa catégorie et son interaction.`,
    usageTitle: 'Dans un Button shadcn',
    usageHtml: `Les composants acceptent les mêmes props que ${code('UseAnimations')}. Pour une bascule comme l’icône de menu, passez ${code('active')} et gardez l’état dans votre bouton ; l’icône s’anime chaque fois qu’il change :`,
    colorHtml: (docs: string) =>
      `Les icônes suivent la couleur du texte : ${code('text-primary')} ou ${code('text-muted-foreground')} suffisent à les recolorer, et le mode sombre ne demande rien de plus. D’autres props et exemples sont dans la ${link(docs, 'documentation')}.`,
    codeText: { closeMenu: 'Fermer le menu', openMenu: 'Ouvrir le menu' },
    popular: 'Icônes populaires pour shadcn/ui',
    allIcons: (count: number) => `Les ${count} icônes →`,
    popularNote: 'La page de chaque icône indique sa commande shadcn.',
    faq: (f: { count: number; version: string }) => [
      {
        question: 'Les icônes animées shadcn/ui sont-elles gratuites ?',
        answer: `Oui. Les ${f.count} icônes et le code des composants sont sous licence MIT, pour vos projets personnels et commerciaux. Le registre ne demande ni compte ni clé d’API.`,
      },
      {
        question: 'Qu’est-ce que la CLI shadcn ajoute à mon projet ?',
        answer: `Le composant de l’icône dans components/animations/<id>.tsx, le wrapper partagé du lecteur UseAnimation dans components/use-animation.tsx (une seule fois, en tant que dépendance du registre) et react-useanimations@^${f.version} depuis npm. lottie-web n’est pas nécessaire : le package embarque son propre lecteur de 8 kB.`,
      },
      {
        question: 'Les composants fonctionnent-ils avec les server components de Next.js ?',
        answer:
          'Oui. Les composants sont marqués "use client" et ne dessinent l’animation que dans le navigateur : vous pouvez les afficher depuis des server components et des pages sans import dynamique ni ssr: false.',
      },
      {
        question: 'Puis-je modifier l’apparence et le mouvement des icônes ?',
        answer:
          'Le code vous appartient, il est dans votre dépôt. Les composants acceptent les props de UseAnimations : size, strokeColor, fillColor, interaction, active, autoplay, loop et speed. Les icônes suivent la couleur du texte : des classes Tailwind comme text-primary ou text-muted-foreground suffisent à les recolorer.',
      },
    ],
    byCategory: 'Parcourir par catégorie',
  },
};
