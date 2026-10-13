import type { Interaction } from 'react-useanimations';
import type { Messages } from '../en';
import type { CategoryText } from '../en/taxonomy';

/**
 * The complement after "icônes" for each category, keyed by its French name:
 * 'Chargement' -> 'de chargement', for "Toutes les icônes de chargement".
 */
export const CATEGORY_OF: Record<string, string> = {};

const category = (name: string, of: string, text: Omit<CategoryText, 'name'>): CategoryText => {
  CATEGORY_OF[name] = of;
  return { name, ...text };
};

/** How a single icon plays: the singular of `plays`, "1 icône <playsOne>". */
export const PLAYS_ONE: Record<Interaction, string> = {
  loop: 'boucle en continu',
  'click-toggle': 'bascule entre deux états au clic',
  'click-replay': 'se rejoue à chaque clic',
  hover: 'se joue au survol et revient en arrière quand le pointeur s’en va',
  'hover-replay': 'se joue une fois au survol',
  'hover-loop': 'boucle pendant le survol',
};

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: category('Alertes', 'd’alerte', {
      title: 'Icônes animées d’alerte',
      intro:
        'Triangles d’avertissement, cercles d’alerte et panneaux stop qui pulsent juste assez pour attirer l’œil, sans clignoter. Placez-les à côté d’un champ de formulaire en erreur, en tête d’une bannière d’erreur ou dans une colonne de statut : là où une icône fixe passe facilement inaperçue.',
      useCases: [
        'Erreurs de validation sous les champs de formulaire',
        'Bannières d’erreur et d’avertissement en haut de page',
        'Lignes en échec dans un tableau de déploiements ou de tâches',
        'Boîtes de dialogue de confirmation avant une action destructive',
        'Pages de statut pendant un incident',
      ],
    }),
    Notifications: category('Notifications', 'de notification', {
      title: 'Icônes animées de cloche de notification',
      intro:
        'Des cloches qui sonnent à chaque nouvelle activité ou qui basculent entre cloche et cloche barrée. Un léger balancement attire le regard vers le nombre de non-lus, et les versions à bascule servent aussi de bouton pour couper les notifications d’un canal ou d’un fil.',
      useCases: [
        'Bouton du centre de notifications dans l’en-tête d’une app',
        'Badge de non-lus qui sonne à l’arrivée d’un nouveau message',
        'Activation et désactivation des notifications d’un canal ou d’un fil',
        'Réglages des notifications e-mail et push',
        'Boutons d’abonnement aux rappels et aux alertes',
      ],
    }),
    Navigation: category('Navigation', 'de navigation', {
      title: 'Icônes animées de navigation et de flèches',
      intro:
        'Des menus hamburger qui se transforment en bouton de fermeture, des flèches, des chevrons et des flèches d’angle qui se décalent dans leur direction au survol. On voit tout de suite où mène le contrôle : ouvrir le tiroir, revenir en arrière, déplier la ligne, quitter le site.',
      useCases: [
        'Menu hamburger qui devient un bouton de fermeture sur mobile',
        'Boutons précédent et suivant des carrousels et de la pagination',
        'Chevrons des accordéons et des menus déroulants',
        'Retour en haut de page et invitations à faire défiler',
        'Liens de connexion et de déconnexion',
        'Marqueurs de liens externes et boutons de barre latérale',
      ],
    }),
    Action: category('Actions', 'd’action', {
      title: 'Icônes animées d’action',
      intro:
        'Les verbes d’une interface : enregistrer, supprimer, télécharger, actualiser, aimer, ajouter aux favoris, rechercher et régler. Chaque icône confirme le clic ou le survol auquel elle correspond : le cœur se remplit quand on aime une publication, le couvercle de la corbeille se soulève avant la suppression.',
      useCases: [
        'Boutons j’aime, favori et signet sur les cartes',
        'Boutons de téléchargement, d’envoi de fichier et d’enregistrement qui confirment l’action',
        'Bouton afficher/masquer le mot de passe dans un formulaire de connexion',
        'Boutons d’actualisation et de synchronisation dans les tableaux de bord',
        'Boutons de suppression dans les tableaux et les listes de fichiers',
        'Champ de recherche qui se transforme en bouton d’effacement',
      ],
    }),
    Content: category('Contenu', 'de contenu', {
      title: 'Icônes animées de fichiers, dossiers et utilisateurs',
      intro:
        'Fichiers, dossiers, livres, e-mails, pièces jointes et personnes. Ces icônes désignent les objets que l’utilisateur manipule, et leurs variantes ajout, retrait et validation rendent la gestion des listes et des équipes plus réactive.',
      useCases: [
        'Gestionnaires de fichiers et listes de documents',
        'Boutons de pièce jointe et de copie dans le presse-papiers',
        'Boîte de réception et archives d’un client de messagerie',
        'Listes de membres d’une équipe avec ajout et retrait d’utilisateurs',
        'Menus de partage pour les documents et les liens',
      ],
    }),
    Form: category('Formulaires', 'de formulaire', {
      title: 'Icônes animées de contrôles de formulaire',
      intro:
        'Une case à cocher, un bouton radio et un interrupteur qui s’animent entre l’état coché et l’état décoché. Utilisez-les là où un champ standard paraît plat, comme les checklists d’onboarding ou les écrans de réglages, tout en gardant l’état lisible d’un coup d’œil.',
      useCases: [
        'Interrupteurs de réglages pour les fonctionnalités et les préférences',
        'Checklists d’onboarding et listes de tâches',
        'Choix uniques dans les sondages et les sélecteurs d’offre',
        'Cases d’acceptation des conditions et de consentement',
      ],
    }),
    Media: category('Médias', 'multimédia', {
      title: 'Icônes animées de lecteur multimédia',
      intro:
        'Lecture et pause, volume, micro, caméra, piste suivante et lecture aléatoire pour les lecteurs audio et vidéo. Les icônes à bascule passent d’un état à l’autre, de lecture à pause ou de micro à micro coupé, si bien que le bouton montre toujours ce que fera le prochain clic.',
      useCases: [
        'Boutons lecture et pause des lecteurs audio et vidéo',
        'Activation et coupure du micro en visioconférence',
        'Activation et désactivation de la caméra dans les apps de réunion',
        'Contrôles de playlist : piste suivante, répétition et lecture aléatoire',
        'Boutons Cast et AirPlay',
        'Contrôles des apps de podcast et de musique',
      ],
    }),
    'Text editing': category('Édition de texte', 'd’édition de texte', {
      title: 'Icônes animées d’édition de texte',
      intro:
        'Gras, italique, souligné, alignement et listes pour les barres d’outils de texte enrichi. Une courte animation au clic confirme que la mise en forme a été appliquée, ce qui aide dans les éditeurs où le changement sur le texte lui-même est discret.',
      useCases: [
        'Barres d’outils d’éditeur de texte enrichi',
        'Zones de saisie de commentaires et de messages',
        'Éditeurs d’articles de CMS et de blog',
        'Apps Markdown et de prise de notes',
        'Contrôles d’alignement du texte dans les outils de design',
      ],
    }),
    Communication: category('Communication', 'de communication', {
      title: 'Icônes animées de communication',
      intro:
        'Téléphones, bulles de discussion, boutons d’envoi, messagerie vocale et RSS. Les icônes d’appel couvrent les états entrant, sortant, manqué et transféré dont un journal d’appels a besoin, et l’icône d’envoi donne au message un petit élan au clic.',
      useCases: [
        'Bouton d’envoi des formulaires de chat et de commentaire',
        'Journaux d’appels avec appels entrants, sortants et manqués',
        'Boutons de contact et de support',
        'Boutons de lancement de widget de chat',
        'Champs de mention et d’adresse e-mail',
      ],
    }),
    Devices: category('Appareils', 'd’appareils', {
      title: 'Icônes animées d’appareils',
      intro:
        'Téléphones, tablettes, écrans, montres et imprimantes, avec les indicateurs de connexion qui les accompagnent : wifi, Bluetooth et batterie. Elles conviennent aux sélecteurs d’appareil, aux commutateurs d’aperçu responsive et aux statuts de connectivité.',
      useCases: [
        'Commutateurs d’aperçu responsive mobile, tablette et ordinateur',
        'Statut de connexion wifi et Bluetooth',
        'Indicateurs de batterie et de charge',
        'Listes des appareils dans les paramètres de sécurité du compte',
        'Boutons d’impression sur les factures et les rapports',
      ],
    }),
    Weather: category('Météo', 'météo', {
      title: 'Icônes météo animées',
      intro:
        'Soleil, lune, nuages, pluie, neige, éclairs et vent pour les prévisions et tout ce qui suit le moment de la journée. Le soleil et la lune font aussi un interrupteur naturel entre mode clair et mode sombre.',
      useCases: [
        'Widgets météo et cartes de prévisions',
        'Bascule entre thème clair et thème sombre',
        'Heures de lever et de coucher du soleil dans les apps de voyage',
        'Températures sur les tableaux de bord de maison connectée',
        'Indicateurs d’énergie et d’alimentation',
      ],
    }),
    'Maps & location': category('Cartes et localisation', 'de carte et de localisation', {
      title: 'Icônes animées de carte et de localisation',
      intro:
        'Repères de carte, flèches de navigation, globes, cibles et ancres. Un repère qui tombe au survol fait ressortir un localisateur de magasins ou une adresse de livraison, et le globe sert de sélecteur de langue ou de région.',
      useCases: [
        'Localisateurs de magasins et champs d’adresse',
        'Boutons de position actuelle et d’itinéraire',
        'Sélecteurs de langue et de région',
        'Suivi de livraison et de commande',
        'Apps de voyage et de réservation',
      ],
    }),
    Commerce: category('E-commerce', 'e-commerce', {
      title: 'Icônes e-commerce animées',
      intro:
        'Paniers, sacs, étiquettes de prix, cadeaux, cartes bancaires et camions de livraison pour les boutiques en ligne. Une animation d’ajout au panier confirme le clic sans toast, et les icônes de camion et de colis donnent un peu de vie au suivi de commande.',
      useCases: [
        'Boutons d’ajout au panier sur les fiches produit',
        'Boutons panier et sac dans l’en-tête d’une boutique',
        'Paiement et choix du moyen de paiement',
        'Badges de remise, de code promo et de soldes',
        'Étapes de livraison et de suivi de commande',
        'Cartes cadeaux et options d’emballage cadeau',
      ],
    }),
    Charts: category('Graphiques', 'de graphique', {
      title: 'Icônes animées de graphiques',
      intro:
        'Histogrammes, graphique circulaire et flèches de tendance pour l’analytique et le reporting. Les icônes de tendance à la hausse et à la baisse montrent d’un coup d’œil si un indicateur a progressé ou reculé, idéal pour les cartes de KPI et les historiques de chiffres.',
      useCases: [
        'Cartes de KPI avec indicateurs en hausse ou en baisse',
        'Entrées de navigation vers l’analytique et les rapports',
        'États vides des tableaux de bord',
        'Synthèses financières et de portefeuille',
      ],
    }),
    Development: category('Développement', 'de développement', {
      title: 'Icônes animées de développement',
      intro:
        'Chevrons de code, terminal, branches, commits, merges et pull requests Git, ainsi que serveurs et bases de données. Pensées pour les outils de développement, les sites de documentation et les pages de statut, où le vocabulaire de Git et de l’infrastructure fait partie de l’interface.',
      useCases: [
        'Statut des pull requests, merges et branches dans les outils de développement',
        'Boutons d’extrait de code et d’intégration dans la documentation',
        'Sections terminal et CLI des pages d’accueil',
        'Santé des serveurs et des bases de données sur les pages de statut',
        'Raccourcis clavier avec la touche Commande',
      ],
    }),
    'Design & layout': category('Design et mise en page', 'de design et de mise en page', {
      title: 'Icônes animées de design et de mise en page',
      intro:
        'Grilles, colonnes, calques, recadrage, outil plume et curseurs pour les éditeurs et les builders. Elles trouvent leur place dans les barres d’outils où l’on organise du contenu, où l’on passe d’une vue grille à une vue tableau ou où l’on choisit un outil de dessin.',
      useCases: [
        'Sélecteurs d’affichage grille, liste et tableau',
        'Panneaux de calques des outils de design et de présentation',
        'Outils de recadrage et de découpe des éditeurs d’images',
        'Page builders et sélecteurs de mise en page',
        'Poignées de glisser-déposer',
      ],
    }),
    'Shapes & math': category('Formes et maths', 'de formes et de maths', {
      title: 'Icônes animées de formes et de maths',
      intro:
        'Cercles, carrés, triangles, hexagones, un octogone et des signes de division. Utilisez-les comme outils de forme dans les apps de dessin, comme opérateurs de calculatrice ou comme repères neutres dans les schémas et les étapes d’onboarding.',
      useCases: [
        'Outils de forme des tableaux blancs et des apps de dessin',
        'Opérateurs de calculatrice et d’éditeur de formules',
        'Puces et repères d’étape dans les schémas',
        'Interfaces de quiz et de jeu',
      ],
    }),
    Loading: category('Chargement', 'de chargement', {
      title: 'Icônes animées de chargement',
      intro:
        'Spinners et loaders qui tournent en boucle tant qu’une opération est en cours. Placez-en un dans un bouton d’envoi pendant une requête, à la place d’un contenu qui charge encore ou sur un écran de démarrage plein écran ; ils restent immobiles quand l’utilisateur a activé la réduction des animations.',
      useCases: [
        'Boutons d’envoi en attente d’une requête',
        'Placeholders pendant le chargement d’une liste ou d’un graphique',
        'Indicateurs de scroll infini et de chargement de la suite',
        'Écrans de démarrage plein écran et transitions de route',
        'Progression d’envoi et de traitement de fichiers',
      ],
    }),
    'Social media': category('Réseaux sociaux', 'de réseaux sociaux', {
      title: 'Icônes animées de réseaux sociaux',
      intro:
        'Logos des réseaux sociaux et des outils sur lesquels développeurs et designers partagent leur travail : X, Instagram, YouTube, Discord, Telegram, Figma et d’autres. Ils s’animent au survol, ce qui rend les liens du footer et des profils visiblement cliquables.',
      useCases: [
        'Liens sociaux dans le footer du site',
        'Boutons de partage sur les articles de blog',
        'Liens vers les profils des auteurs et de l’équipe',
        'Boutons d’invitation aux serveurs de discussion d’une communauté',
        'Connexion avec un compte social ou développeur',
      ],
    }),
    Other: category('Autres', 'diverses', {
      title: 'Autres icônes animées',
      intro:
        'Des icônes qui n’appartiennent à aucun groupe plus large : des émojis pour recueillir un avis, une tasse de café, une horloge, une ligne de pouls et une invitation à faire défiler. L’icône de défilement est un indice classique en bas d’une section hero pour signaler qu’il y a de la suite.',
      useCases: [
        'Invitations à faire défiler en bas d’une section hero',
        'Visages content, neutre et triste dans les widgets d’avis',
        'Indicateurs d’activité et de disponibilité',
        'Horaires d’ouverture et sélecteurs d’heure',
        'Liens « Buy me a coffee » et de soutien',
      ],
    }),
  },
  interactions: {
    loop: {
      label: 'Boucle',
      title: 'Icônes animées en boucle',
      intro:
        'Ces icônes jouent en continu tant qu’elles sont à l’écran : elles conviennent aux états qui durent, comme un chargement en cours, un avertissement actif ou un terminal en attente. Quand l’utilisateur a activé la réduction des animations, elles s’arrêtent sur leur première image et restent lisibles comme une icône normale.',
      useCases: [
        'Spinners de chargement et indicateurs de progression',
        'États d’avertissement et d’erreur actifs',
        'Indicateurs de direct et d’enregistrement',
        'Invitations à faire défiler dans les sections hero',
        'Signaux d’attention pour les nouvelles notifications',
      ],
      example:
        'Les icônes en boucle servent surtout aux spinners de chargement, aux alertes actives, à une cloche qui sonne ou à une invitation à faire défiler.',
      description:
        'Joue en continu ; reste sur la première image, fixe, quand la réduction des animations est activée.',
      reducedMotion:
        'Si la réduction des animations est activée, l’icône ne démarre pas seule et reste sur sa première image, fixe.',
      plays: 'bouclent en continu',
    },
    'click-toggle': {
      label: 'Bascule au clic',
      title: 'Icônes animées à bascule au clic',
      intro:
        'Chaque clic anime l’icône d’un état à l’autre, et elle y reste : ces icônes sont la moitié visuelle d’un contrôle on/off. L’icône montre toujours l’état actuel ; associez-la à aria-pressed ou à un attribut checked et le bouton se passe d’explication.',
      useCases: [
        'Boutons pour couper et rétablir le son',
        'Champs de mot de passe avec affichage et masquage',
        'Boutons menu hamburger et fermeture',
        'Contrôles lecture et pause',
        'Bascules j’aime, étoile et signet',
        'Cases à cocher, boutons radio et interrupteurs',
      ],
      example:
        'Les icônes à bascule au clic pilotent typiquement les boutons son/muet, afficher/masquer le mot de passe, menu/fermer, lecture/pause et j’aime.',
      description:
        'Bascule entre deux états au clic, ou change d’état immédiatement quand la réduction des animations est activée.',
      reducedMotion:
        'Si la réduction des animations est activée, un clic passe immédiatement à l’autre état, sans l’animation intermédiaire.',
      plays: 'basculent entre deux états au clic',
    },
    'click-replay': {
      label: 'Relecture au clic',
      title: 'Icônes animées au clic',
      intro:
        'Ces icônes rejouent leur animation depuis le début à chaque clic : une petite confirmation que l’action a bien eu lieu. Elles conviennent aux actions ponctuelles qui ne laissent pas d’état derrière elles : envoyer, enregistrer, actualiser, télécharger, imprimer ou supprimer.',
      useCases: [
        'Boutons d’envoi des formulaires de chat et de commentaire',
        'Boutons d’enregistrement, de téléchargement et d’envoi de fichier',
        'Boutons d’actualisation et de rotation',
        'Boutons d’ajout au panier',
        'Boutons de mise en forme du texte dans les éditeurs',
      ],
      example:
        'Les icônes au clic confirment typiquement les boutons envoyer, enregistrer, actualiser, télécharger, ajouter au panier et de mise en forme.',
      description:
        'Rejoue une fois l’animation depuis le début à chaque clic, sauf si la réduction des animations est activée.',
      reducedMotion:
        'Si la réduction des animations est activée, les clics atteignent toujours votre gestionnaire, mais l’animation ne se joue pas.',
      plays: 'se rejouent à chaque clic',
    },
    hover: {
      label: 'Survol',
      title: 'Icônes animées au survol',
      intro:
        'Ces icônes se jouent vers l’avant quand le pointeur entre et en sens inverse quand il sort : le mouvement suit le curseur et ne s’arrête jamais à mi-course. Elles conviennent aux éléments de navigation et aux boutons qui annoncent ce qu’ils ouvrent : le couvercle de la corbeille se soulève, la roue crantée des réglages tourne, le dossier s’ouvre.',
      useCases: [
        'Éléments de barre latérale et de menu de navigation',
        'Boutons de suppression qui soulèvent le couvercle avant le clic',
        'Liens vers les réglages et le profil',
        'Contrôles de zoom avant et arrière',
        'Liens sociaux dans le footer',
      ],
      example:
        'Les icônes au survol signalent typiquement les éléments de navigation, les boutons de suppression, les réglages, les contrôles de zoom et les liens sociaux.',
      description: 'Se joue vers l’avant sur mouseenter et en sens inverse sur mouseleave.',
      reducedMotion:
        'Si la réduction des animations est activée, le survol ne déclenche pas l’animation.',
      plays: 'se jouent au survol et reviennent en arrière quand le pointeur s’en va',
    },
    'hover-replay': {
      label: 'Lecture au survol',
      title: 'Icônes animées à lecture au survol',
      intro:
        'Ces icônes se jouent une fois quand le pointeur entre et vont au bout d’elles-mêmes, ce qui évite qu’un passage rapide sur une barre d’outils ne produise un mouvement saccadé. C’est le cas de la majorité du jeu d’icônes : flèches, fichiers, appareils, météo et logos de marques qui s’animent au survol.',
      useCases: [
        'Listes de fonctionnalités et grilles tarifaires',
        'Liens fléchés et boutons d’appel à l’action',
        'Boutons de barre d’outils dans les éditeurs et les tableaux de bord',
        'Cartes dans la grille d’une landing page',
        'Liens du footer et de contact',
      ],
      example:
        'Les icônes à lecture au survol animent typiquement les liens fléchés, les listes de fonctionnalités, les boutons de barre d’outils et les cartes de landing page.',
      description:
        'Se joue une fois sur mouseenter, sauf si la réduction des animations est activée. Sortir ne l’arrête pas ; entrer pendant la lecture ne la relance pas.',
      reducedMotion:
        'Si la réduction des animations est activée, le survol ne déclenche pas l’animation.',
      plays: 'se jouent une fois au survol',
    },
    'hover-loop': {
      label: 'Boucle au survol',
      title: 'Icônes animées en boucle au survol',
      intro:
        'Ces icônes bouclent tant que le pointeur reste dessus et terminent le cycle en cours après sa sortie : elles ne s’arrêtent jamais en plein mouvement. Elles conviennent aux liens qui invitent à s’attarder, surtout les icônes de réseaux sociaux et de communautés.',
      useCases: [
        'Liens vers les réseaux sociaux dans l’en-tête et le footer',
        'Boutons d’invitation à une communauté ou à un chat',
        'Liens vers un portfolio ou un profil',
        'Sélecteurs de langue et de région',
      ],
      example:
        'Les icônes en boucle au survol signalent typiquement les liens sociaux, les invitations à une communauté, les liens de portfolio et les sélecteurs de langue.',
      description:
        'Boucle pendant le survol, termine le cycle en cours après mouseleave et reste fixe quand la réduction des animations est activée.',
      reducedMotion:
        'Si la réduction des animations est activée, l’icône reste fixe pendant le survol.',
      plays: 'bouclent pendant le survol',
    },
  },
};
