import { formIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import type { HomeFaq } from '../en/home';

const plural = pluralIn('cs');
const form = formIn('cs');

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Mikroanimace a knihovna animovaných ikon — useAnimations',
  description: (count: number) =>
    `${plural(count, { one: 'mikroanimace', few: 'mikroanimace', other: 'mikroanimací' })} pro UI zdarma: knihovna animovaných ikon pro React, shadcn/ui a Lottie s vestavěným hoverem, kliknutím i smyčkou. MIT.`,

  hero: {
    badge: (count: number) =>
      `${plural(count, { one: 'ikona', few: 'ikony', other: 'ikon' })} · žádné závislosti · MIT`,
    headline: { start: 'Ikony, které ', accent: 'ožijí.', end: '' },
    h1: 'Animované ikony zdarma pro React, shadcn/ui a Lottie',
    intro: (count: number) =>
      `${plural(count, {
        one: 'ručně vytvořená mikroanimace',
        few: 'ručně vytvořené mikroanimace',
        other: 'ručně vytvořených mikroanimací',
      })} s vestavěnými mikrointerakcemi na hover, kliknutí i ve smyčce. Použijte je jako React komponentu, přidejte je přes shadcn nebo si stáhněte SVG a Lottie JSON. Licence MIT.`,
    browse: 'Procházet ikony',
    fieldHint: 'Přejeďte ukazatelem přes pole ikon.',
  },

  numbers: {
    label: 'Ve zkratce',
    icons: 'animovaných ikon',
    interactions: 'vestavěných interakcí',
    size: 'přehrávač (gzip)',
    dependencies: 'závislostí',
  },

  interactions: {
    eyebrow: 'Vestavěné interakce',
    title: 'Každá ikona ví, jak se pohybovat.',
    intro:
      'Každá ikona má interakci, pro kterou byla navržena. Stačí ji vložit a funguje — nebo jedním propem zvolte jinou. Vyzkoušejte si je:',
    demos: {
      loop: 'Přehrává se nepřetržitě, pro loadery a průběžný stav.',
      'click-toggle': 'Přepíná mezi dvěma stavy: menu a zavřít, přehrát a pauza.',
      'click-replay': 'Při každém kliknutí se přehraje od začátku jako zpětná vazba.',
      hover: 'Při najetí myší se přehraje dopředu, při odjetí pozpátku.',
      'hover-loop': 'Při hoveru běží ve smyčce a po odjetí myši dokončí cyklus.',
      'hover-replay': 'Při každém najetí myší se jednou přehraje od začátku.',
    },
  },

  browser: {
    eyebrow: 'Knihovna',
    title: (count: number) =>
      plural(count, {
        one: 'animovaná ikona zdarma',
        few: 'animované ikony zdarma',
        other: 'animovaných ikon zdarma',
      }),
    intro:
      'Najetím myší nebo kliknutím ikonu přehrajete. Po otevření najdete její kód a soubory ke stažení — Lottie JSON, SVG a ZIP.',
    search: 'Hledat ikony',
    searchPlaceholder: (count: number) =>
      `Hledejte v ${count} ${form(count, { one: 'ikoně', other: 'ikonách' })} anglicky — třeba „eye“, „bell“ nebo „arrow“`,
    interaction: 'Interakce',
    allInteractions: 'Všechny interakce',
    color: 'Barva ikon',
    colors: {
      text: 'Barva textu',
      indigo: 'Indigová',
      red: 'Červená',
      amber: 'Jantarová',
      teal: 'Modrozelená',
      violet: 'Fialová',
    },
    customColor: 'Vlastní barva',
    size: 'Velikost',
    category: 'Kategorie',
    all: 'Vše',
    count: { one: '{n} ikona', few: '{n} ikony', many: '{n} ikony', other: '{n} ikon' },
    noMatch: 'Žádná ikona neodpovídá.',
    noMatchHintHtml: (href: string) =>
      `Zkuste jiné slovo, nebo ${link(href, 'navrhněte novou ikonu')}.`,
  },

  everywhere: {
    eyebrow: 'Použijte je po svém',
    title: 'Nainstalovat, importovat, hotovo.',
    intro:
      'React komponenta bez závislostí, registr shadcn, soubory ke stažení se stálými URL a katalog, který přečtou i AI agenti.',
    docs: 'Přečíst dokumentaci →',
    tablist: 'Platforma',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Soubory', agents: 'Agenti' },
    codeText: {
      afterAdding: 'potom',
      files: 'Každá ikona jako SVG, jako animace (Lottie JSON) a jako ZIP s obojím',
    },
  },

  features: {
    title: 'Malé, přístupné a stylované po vašem.',
    colors: 'Přebírají vaše barvy',
    colorsHtml: `Ikony používají ${code('currentColor')}: samy převezmou barvu textu, hover stavy i tmavý režim. Změnit ji můžete propem, třídou nebo obyčejným CSS.`,
    tiny: 'Malé už z principu',
    tinyText:
      'Vestavěný přehrávač, žádné závislosti. Každá ikona je samostatný modul o velikosti 2 kB.',
    accessible: 'Přístupné bez dalšího nastavování',
    accessibleText:
      'Respektují omezený pohyb, hover animace přehrají i při fokusu z klávesnice a čtečky obrazovky je ignorují, dokud jim nedáte popisek.',
    ssr: 'Připravené na vykreslování na serveru',
    ssrText:
      'Klientská komponenta, která se bezpečně vykreslí v Next.js, Remixu i Astru. Ikony jsou obyčejná data, která můžete importovat kdekoli.',
    agents: 'Pro AI agenty',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Typovaný katalog s klíčovými slovy ke každé ikoně, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} a dokumentace v Markdownu.`,
  },

  browse: {
    title: 'Najděte tu správnou mikroanimaci.',
    byCategory: 'Procházet podle kategorií',
    byInteraction: 'Procházet podle interakcí',
    formats: 'Všechny ikony a formáty',
  },

  hubs: {
    icons: 'Všechny animované ikony',
    categories: 'Kategorie ikon',
    interactions: 'Ikony podle interakce',
    lottie: 'Lottie ikony (JSON)',
    shadcn: 'Animované ikony pro shadcn/ui',
  },

  faqTitle: 'Otázky',
  faq: (f): HomeFaq => [
    {
      question: 'Co jsou mikroanimace a animované ikony?',
      answer:
        'Mikroanimace jsou krátké pohyby s jediným účelem, které odpovídají na akci uživatele: ikona menu, která se změní v tlačítko pro zavření, srdce, které se vyplní, když dáte příspěvku lajk, nebo zvonek, který zazvoní při nové notifikaci. Animované ikony jsou jejich nejběžnějším druhem. Rozhraní díky nim působí pohotově a změny stavu jsou patrné i bez dalšího textu.',
    },
    {
      question: 'Jaký je rozdíl mezi soubory Lottie a SVG?',
      answer:
        'Soubor Lottie JSON obsahuje celou animaci a přehraje ho jakýkoli Lottie přehrávač, včetně toho, který je vestavěný v react-useanimations. Soubory SVG jsou statické obrázky ikony v klidu, jeden pro každý stav (například eye a eye-off), pro místa, kde se nic hýbat nemá: e-maily, dokumenty, grafické nástroje nebo záloha pro prohlížeče bez JavaScriptu.',
    },
    {
      question: 'Funguje to s Next.js a vykreslováním na serveru?',
      answer:
        "Ano. Komponenta je označená 'use client' a animaci kreslí až v prohlížeči, takže ji vykreslíte ze server komponent i v SSR frameworcích jako Next.js, Remix a Astro bez dynamických importů. Moduly ikon jsou obyčejná data, která server komponenty mohou importovat a předávat jako props.",
      link: { href: f.links.serverRendering, label: 'Next.js a vykreslování na serveru' },
    },
    {
      question: 'Můžu ikony použít v komerčních projektech?',
      answer:
        'Ano. Ikony i balíček react-useanimations jsou pod licencí MIT: můžete je používat, upravovat a dále šířit v osobních i komerčních projektech. Uvedení autora oceníme, ale není povinné.',
      link: { href: f.links.licence, label: 'Licence a podmínky' },
    },
    {
      question: 'Můžu ikony použít bez Reactu?',
      answer:
        'Ano. Každá ikona je standardní Lottie JSON soubor, takže ji přehraje lottie-web v čistém JavaScriptu, ve Vue, Svelte, Angularu nebo v CMS a také Lottie přehrávače pro iOS, Android a Flutter. Na stránce Lottie ikony najdete URL souborů a hotové ukázky pro lottie-web ke každé interakci.',
      link: { href: f.links.lottie, label: 'Lottie ikony' },
    },
    {
      question: 'Kolik ikony přidají do bundlu?',
      answer: `Přehrávač v react-useanimations ${f.version} má po gzipu asi 8 kB a nemá žádné závislosti. Každá ikona je samostatný modul o velikosti 1 až 15 kB (medián 2 kB), takže bundle obsahuje jen ikony, které naimportujete.`,
    },
  ],

  cta: {
    title: { start: 'Vdechněte rozhraní ', accent: 'život.', end: '' },
    text: 'Zdarma a pod licencí MIT, pro osobní i komerční projekty.',
    start: 'Začít',
  },

  schema: {
    software: (count: number) =>
      `React komponenta a ${plural(count, { one: 'animovaná ikona', few: 'animované ikony', other: 'animovaných ikon' })} (Lottie) s vestavěnými interakcemi na hover, kliknutí i ve smyčce. Bez závislostí.`,
    catalogName: 'Katalog ikon useAnimations',
    catalog: (count: number) =>
      `${form(count, { one: 'Jediná', few: 'Všechny', other: 'Všech' })} ${plural(count, { one: 'ikona', few: 'ikony', other: 'ikon' })} useAnimations s id, názvem, kategorií, klíčovými slovy, interakcí, URL souborů Lottie JSON, SVG a ZIP, importem pro React a příkazem pro shadcn.`,
  },
};
