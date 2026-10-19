import { formIn, listIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import type { Faq } from '../en/hubs';

const plural = pluralIn('cs');
const form = formIn('cs');
const list = listIn('cs');

const ICONS = { one: 'ikona', few: 'ikony', other: 'ikon' };
const icons = (n: number) => plural(n, ICONS);
const animatedIcons = (n: number) =>
  plural(n, { one: 'animovaná ikona', few: 'animované ikony', other: 'animovaných ikon' });
const categoriesOf = (n: number) =>
  plural(n, { one: 'kategorie', few: 'kategorie', other: 'kategorií' });
const interactionsOf = (n: number) =>
  plural(n, { one: 'interakce', few: 'interakce', other: 'interakcí' });

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `${form(count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${animatedIcons(count)} podle kategorií`,
      `${form(count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${animatedIcons(count)}`,
      'Všechny animované ikony',
    ],
    descriptions: (count: number, categories: number) => [
      `Všechny ikony useAnimations na jedné stránce: ${animatedIcons(count)} zdarma v ${categories} ${form(categories, { one: 'kategorii', other: 'kategoriích' })} pro React, shadcn/ui, Lottie JSON a SVG. Licence MIT.`,
    ],
    title: 'Všechny animované ikony',
    badge: (count: number) => `${icons(count)} · licence MIT`,
    introHtml: (browser: string) =>
      `Všechny ikony sady rozdělené podle kategorií. Po otevření ikony uvidíte živý náhled, kód pro React a shadcn/ui a soubory Lottie JSON, SVG a ZIP ke stažení (stránky ikon jsou v angličtině). Pokud chcete hledat podle klíčových slov a vyzkoušet animace přímo na místě, použijte ${link(browser, 'prohlížeč ikon')}.`,
    categoriesNav: 'Kategorie',
    byInteraction: 'Podle interakce:',
    categoryLink: (count: number, name: string) => `${icons(count)} v kategorii ${name}`,
  },

  categories: {
    titles: (categories: number) => [
      `Kategorie animovaných ikon: ${categoriesOf(categories)}`,
      'Kategorie animovaných ikon',
    ],
    descriptions: (iconCount: number, categories: number) => [
      `Procházejte ${animatedIcons(iconCount)} zdarma v ${categories} ${form(categories, { one: 'kategorii', other: 'kategoriích' })}: navigace, akce, média, načítání, sociální sítě a další. Pro React, shadcn/ui a Lottie.`,
    ],
    title: 'Kategorie animovaných ikon',
    badge: (iconCount: number, categories: number) =>
      `${icons(iconCount)} · ${categoriesOf(categories)}`,
    introHtml: (interactions: string) =>
      `Každá ikona useAnimations patří do jedné kategorie, od navigačních šipek a ovládání médií po loadery a loga sociálních sítí. V kategorii najdete všechny její ikony, tipy, kde je použít, a kód pro přidání ikony do projektu. Ikony můžete procházet i podle ${link(interactions, 'interakce')}.`,
    iconCount: icons,
  },

  interactions: {
    titles: [
      'Mikrointerakce: ikony na hover, kliknutí a ve smyčce',
      'Mikrointerakce animovaných ikon',
    ],
    descriptions: (iconCount: number, interactions: number) => [
      `${animatedIcons(iconCount)} v ${interactions} ${form(interactions, { one: 'mikrointerakci', other: 'mikrointerakcích' })}: smyčka, přepínání a přehrání kliknutím, hover, přehrání a smyčka při hoveru. S podporou omezeného pohybu.`,
    ],
    title: 'Interakce animovaných ikon',
    badge: (interactions: number, iconCount: number) =>
      `${interactionsOf(interactions)} · ${icons(iconCount)}`,
    introHtml: `Každá ikona má mikrointerakci, pro kterou byla navržena: běží ve smyčce, kliknutím se přepne nebo přehraje znovu, případně se přehraje při najetí myší. React komponenta interakci sama zapojí a respektuje omezený pohyb, a prop <code class="font-mono text-base text-fg">interaction</code> kterékoli ikoně nastaví jinou.`,
    iconCount: icons,
    chooseTitle: 'Jak vybrat interakci',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Stav, který trvá')}, třeba načítání nebo aktivní upozornění: ${link(href, 'smyčka')}.`,
      'click-toggle': (href: string) =>
        `${strong('Ovládání zapnuto/vypnuto')}, třeba ztlumení, menu nebo zobrazení hesla: ${link(href, 'přepínání kliknutím')}, pro řízený stav s ${code('active')}.`,
      'click-replay': (href: string) =>
        `${strong('Jednorázová akce')}, třeba odeslání, uložení nebo obnovení: ${link(href, 'přehrání kliknutím')}.`,
      hover: (href: string) =>
        `${strong('Náznak toho, co odkaz otevře')}: ${link(href, 'hover')}, který se po odjetí kurzoru přehraje zpět.`,
      'hover-replay': (href: string) =>
        `${strong('Panely nástrojů a seznamy, přes které se rychle přejíždí')}: ${link(href, 'přehrání při hoveru')}, které doběhne samo.`,
      'hover-loop': (href: string) =>
        `${strong('Odkazy, které zvou k delšímu pohledu')}, třeba ikony sociálních sítí: ${link(href, 'smyčka při hoveru')}.`,
    },
    motionTitle: 'Omezený pohyb',
    motionHtml: `React komponenta se řídí nastavením ${code('prefers-reduced-motion')} a reaguje i na jeho změnu. Klepnutí na dotykové obrazovce hover animace nikdy nespustí.`,
    reducedMotion: {
      loop: 'ikona se automaticky nespustí a zůstane na statickém prvním snímku.',
      'click-toggle': 'kliknutí přepne do druhého stavu okamžitě, bez animace mezi nimi.',
      'click-replay': 'kliknutí se k vašemu handleru dostanou dál, ale animace se nepřehraje.',
      hover: 'najetí myší animaci nespustí.',
      'hover-replay': 'najetí myší animaci nespustí.',
      'hover-loop': 'ikona při hoveru zůstane statická.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Lottie ikony zdarma: ${plural(count, { one: 'animovaná JSON ikona', few: 'animované JSON ikony', other: 'animovaných JSON ikon' })}`,
      'Lottie ikony zdarma',
    ],
    descriptions: (count: number) => [
      `${plural(count, { one: 'Lottie ikona', few: 'Lottie ikony', other: 'Lottie ikon' })} zdarma jako čistý Lottie JSON pod licencí MIT. Kód ke zkopírování pro lottie-web, dotLottie, React, React Native, iOS, Android a Flutter.`,
    ],
    title: 'Lottie ikony zdarma',
    crumb: 'Lottie ikony',
    datasetName: 'Katalog ikon useAnimations',
    datasetDescription: (count: number) =>
      `Metadata a URL souborů ${form(count, { one: 'animované Lottie ikony', other: 'animovaných Lottie ikon' })} (${count}): id, název, kategorie, klíčová slova, interakce, velikost a délka.`,
    badge: (count: number) => `${icons(count)} · Lottie JSON · licence MIT`,
    intro:
      'Každá ikona useAnimations je standardní Lottie JSON animace, takže ji přehraje jakýkoli Lottie přehrávač: lottie-web na webu, lottie-ios, lottie-android, Flutter i React Native. Soubory jsou zdarma pod licencí MIT, bez registrace, a jsou dostupné na stálých URL s povoleným CORS, takže je můžete načítat přímo nebo si je stáhnout do projektu.',
    popular: 'Oblíbené Lottie ikony',
    allIcons: (count: number) =>
      `${form(count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${icons(count)}`,
    filesTitle: 'Soubory a URL',
    filesIntroHtml: `Každá ikona má na adrese ${code('/icons/&lt;id&gt;')} stránku s náhledem a soubory ke stažení (v angličtině). Samotné soubory:`,
    files: {
      json: 'Lottie JSON animace',
      zip: 'JSON a statická SVG',
      svg: 'statické SVG každého stavu',
      catalog: 'katalog všech ikon',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} obsahuje všechny ikony s jejich id, názvem, kategorií, klíčovými slovy, interakcí, velikostí, délkou a URL souborů. Ikony tak snadno vyberete podle klíčového slova ve skriptu nebo výběr necháte na AI agentovi. Medián velikosti Lottie souboru je ${median} kB.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'Referenční přehrávač od Airbnb. Načtěte ho z CDN, nasměrujte ho na URL ikony a zvolte SVG renderer, se kterým ikona zůstane ostrá a jde přebarvit přes CSS. Použijte plný build (lottie.min.js): light build výrazy (expressions) nepodporuje.',
        cssLabel: 'Přebírání barvy textu (SVG renderer)',
      },
      'web-interactions': {
        title: 'Web: interakce na hover a kliknutí',
        text: 'lottie-web umí přehrávat a zastavovat, interakce si ale musíte napsat sami. Tohle je přepínání kliknutím u ikony menu s podporou omezeného pohybu; všechny interakce fungují podle stejného vzoru a React komponenta níže to všechno udělá za vás.',
      },
      dotlottie: {
        title: 'Web: webová komponenta dotLottie',
        text: 'Přehrávač od LottieFiles vykresluje pomocí enginu ve WebAssembly do canvasu a kromě souborů .lottie přehraje i obyčejný Lottie JSON. Canvas zachová barvy ze souboru, takže ikony zůstanou černé, dokud JSON nepřebarvíte.',
        jsLabel: 'Nebo JavaScript API: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Žádný Lottie přehrávač instalovat nemusíte: balíček má vlastní přehrávač o velikosti 8 kB, přehrává interakci každé ikony, přebírá barvu textu a respektuje omezený pohyb. Každá ikona je samostatný modul, takže do aplikace dostanete jen ty, které naimportujete.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Pro offline použití zabalte JSON do aplikace přes require(), nebo ho načtěte z jeho URL.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Přidejte balíček z https://github.com/airbnb/lottie-spm.git přes Swift Package Manager a pak vložte JSON do bundlu aplikace, nebo ho načtěte z jeho URL.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Přidejte com.airbnb.android:lottie-compose (nebo com.airbnb.android:lottie pro views). Pro offline použití dejte JSON do res/raw a načtěte ho přes LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'Balíček lottie je přehrávač napsaný čistě v Dartu pro Android, iOS, web i desktop.',
      },
    },
    expressionsTitle: 'Ikony s výrazy (expressions)',
    expressionsHtml: (count: number) =>
      `${icons(count)} ${form(count, { one: 'používá', few: 'používají', other: 'používá' })} výrazy (expressions) z After Effects (${code('loopOut')} nebo ${code('wiggle')}). Na webu je přehrávejte plným buildem lottie-web, ne ${code('lottie_light')}. Nativní přehrávače výrazy nevyhodnocují, takže tyto ikony na iOS, Androidu a ve Flutteru otestujte, nebo zvolte jinou; react-useanimations je přehraje tak, jak byly navržené.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Jsou tyto Lottie ikony zdarma i pro komerční použití?',
        answer: `Ano. ${form(f.count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${plural(f.count, { one: 'Lottie ikona je', few: 'Lottie ikony jsou', other: 'Lottie ikon je' })} pod licencí MIT: můžete je používat, upravovat a dále šířit v osobních i komerčních projektech, bez uvedení autora a bez účtu ke stažení.`,
      },
      {
        question: 'V jakém formátu jsou Lottie soubory?',
        answer: `Standardní Lottie JSON (formát Bodymovin) jen s tvarovými vrstvami: žádné obrázky, fonty ani externí soubory. Každá ikona je nakreslená na plátně 24 nebo 32 px, škáluje se na libovolnou velikost a má ${f.minSize} až ${f.maxSize} kB, medián ${f.medianSize} kB.`,
      },
      {
        question: 'Je pro použití ikon v Reactu potřeba lottie-web?',
        answer:
          'Ne. react-useanimations má vlastní přehrávač o velikosti 8 kB bez závislostí, takže nainstalujete jeden balíček a naimportujete ikony, které potřebujete. lottie-web potřebujete jen mimo React, na obyčejných webových stránkách nebo v jiných frameworcích.',
      },
      {
        question: 'Které ikony potřebují plný build lottie-web?',
        answer: `${icons(f.expressions.length)} ${form(f.expressions.length, { one: 'používá', few: 'používají', other: 'používá' })} výrazy (expressions) z After Effects (loopOut nebo wiggle): ${list(f.expressions)}. Na webu potřebují plný build lottie-web; lottie_light výrazy ignoruje. Nativní přehrávače (lottie-ios, lottie-android, lottie pro Flutter) výrazy také nevyhodnocují, takže se tam tyto ikony mohou pohybovat jinak.`,
      },
      {
        question: 'Můžu změnit barvu Lottie ikony?',
        answer:
          'Na webu zapisuje SVG renderer lottie-web barvy jako atributy, takže ikonu přebarvíte CSS pravidlem pro cesty (paths). Nativní přehrávače mají vlastní API pro dynamické vlastnosti: ColorValueProvider na iOS, LottieProperty.COLOR a STROKE_COLOR na Androidu a ValueDelegate.color ve Flutteru.',
      },
    ],
    byCategory: 'Lottie ikony podle kategorií',
  },

  shadcn: {
    titles: (count: number) => [
      `Animované ikony pro shadcn/ui: ${plural(count, { one: 'komponenta', few: 'komponenty', other: 'komponent' })}`,
      'Animované ikony pro shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${animatedIcons(count)} pro shadcn/ui: každou přidáte jedním příkazem shadcn CLI. Mikrointerakce na hover, kliknutí i ve smyčce, licence MIT, bez lottie-web.`,
    ],
    title: 'Animované ikony pro shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Oblíbené animované ikony pro shadcn/ui',
    badge: (count: number) =>
      `${plural(count, { one: 'komponenta', few: 'komponenty', other: 'komponent' })} · registr shadcn · licence MIT`,
    intro:
      'Všechny ikony useAnimations jsou v registru shadcn. Jeden příkaz CLI vám do projektu přidá typovanou React komponentu s interakcí na hover, kliknutí nebo ve smyčce, pro kterou byla ikona navržena, s podporou omezeného pohybu a barvami, které přebírají váš motiv. Kód skončí ve vašem repozitáři jako u každé jiné komponenty shadcn/ui.',
    addTitle: 'Přidání ikony',
    addIntro: 'Spusťte shadcn CLI s URL ikony v registru:',
    namingHtml: `Komponenta se jmenuje ${code('Animated')} + id ikony v PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) a uloží se do ${code('components/animations/&lt;id&gt;.tsx')}. CLI přidá také sdílený obal ${code('components/use-animation.tsx')} a nainstaluje ${code('react-useanimations')}, který má vlastní přehrávač: lottie-web nepotřebujete.`,
    namespaceTitle: 'Krátké názvy díky jmennému prostoru registru',
    namespaceHtml: `Jednou přidejte registr do ${code('components.json')} a pak přidávejte ikony podle názvu, klidně několik najednou:`,
    registryHtml: (registry: string) =>
      `Index registru na ${link(registry, '/r/registry.json')} obsahuje všechny položky s názvem, kategorií a interakcí.`,
    usageTitle: 'Použití v shadcn Button',
    usageHtml: `Komponenty přijímají stejné props jako ${code('UseAnimations')}. U přepínací ikony, jako je menu, předejte ${code('active')} a stav držte v tlačítku; ikona se animuje pokaždé, když se změní:`,
    colorHtml: (docs: string) =>
      `Ikony přebírají barvu textu, takže je přebarví ${code('text-primary')} nebo ${code('text-muted-foreground')} a tmavý režim nevyžaduje nic navíc. Další props a postupy najdete v ${link(docs, 'dokumentaci')}.`,
    codeText: { closeMenu: 'Zavřít menu', openMenu: 'Otevřít menu' },
    popular: 'Oblíbené ikony pro shadcn/ui',
    allIcons: (count: number) =>
      `${form(count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${icons(count)}`,
    popularNote:
      'Na stránce každé ikony najdete její příkaz pro shadcn (stránky ikon jsou v angličtině).',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Jsou animované ikony pro shadcn/ui zdarma?',
        answer: `Ano. ${form(f.count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${icons(f.count)} i kód komponent jsou pod licencí MIT, pro osobní i komerční projekty. Registr nevyžaduje účet ani API klíč.`,
      },
      {
        question: 'Co shadcn CLI přidá do mého projektu?',
        answer: `Komponentu ikony v components/animations/<id>.tsx, sdílený obal přehrávače UseAnimation v components/use-animation.tsx (jednou, jako závislost z registru) a react-useanimations@^${f.version} z npm. lottie-web není potřeba: balíček má vlastní přehrávač o velikosti 8 kB.`,
      },
      {
        question: 'Fungují komponenty se server komponentami v Next.js?',
        answer:
          'Ano. Komponenty jsou označené "use client" a animaci kreslí až v prohlížeči, takže je můžete vykreslit ze server komponent a stránek bez dynamických importů nebo ssr: false.',
      },
      {
        question: 'Můžu změnit vzhled a pohyb ikon?',
        answer:
          'Kód je váš, ve vašem repozitáři. Komponenty přijímají props komponenty UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop a speed. Ikony přebírají barvu textu, takže je přebarví třídy Tailwindu jako text-primary nebo text-muted-foreground.',
      },
    ],
    byCategory: 'Procházet podle kategorií',
  },
};
