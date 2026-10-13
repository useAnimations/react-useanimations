import type { Interaction } from 'react-useanimations';
import { formIn, listIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { PLAY_FORMS } from './taxonomy';

const list = listIn('cs');
const plural = pluralIn('cs');
const form = formIn('cs');
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

const ICONS = { one: 'ikona', few: 'ikony', other: 'ikon' };
const icons = (n: number) => plural(n, ICONS);
const animated = (n: number) =>
  plural(n, { one: 'animovaná ikona', few: 'animované ikony', other: 'animovaných ikon' });

/** The verb phrase agreeing with a count: "1 se přehrává", "3 se přehrávají", "5 se přehrává". */
const plays = (n: number, interaction: Interaction) => {
  const { singular, plural: many } = PLAY_FORMS[interaction];
  return form(n, { one: singular, few: many, other: singular });
};

/** Up to `max` titles, then "a N dalších". */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} a ${plural(items.length - max, { one: 'další', few: 'další', other: 'dalších' })}`
    : list(items);

/** The formats every icon comes in, with the static SVGs when the category has them. */
const formats = (f: CategoryFacts) => {
  if (f.withSvg === f.count)
    return 'React komponenta, komponenta pro shadcn/ui, Lottie JSON animace a statické SVG';
  const base = 'React komponenta, komponenta pro shadcn/ui a Lottie JSON animace';
  return f.withSvg ? `${base} (${f.withSvg} z nich i jako statické SVG)` : base;
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} pro React a Lottie`,
      `${f.title} pro React`,
      `${f.title} zdarma`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.title} zdarma: ${icons(f.count)} včetně ${examples}. Mikroanimace na hover, kliknutí i ve smyčce pro React, shadcn/ui a Lottie JSON, licence MIT.`,
        `${f.title}: ${icons(f.count)} zdarma včetně ${examples}. Mikroanimace pro React, shadcn/ui a Lottie JSON, licence MIT.`,
        `${f.title} zdarma: ${icons(f.count)} včetně ${examples}. Pro React, shadcn/ui a Lottie JSON, licence MIT.`,
        `${f.title} zdarma: ${icons(f.count)} včetně ${examples}. Pro React, shadcn/ui a Lottie, MIT.`,
        `${f.title} zdarma: ${icons(f.count)} pro React, shadcn/ui a Lottie JSON, licence MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      let groups: string;
      if (f.groups.length === 1) {
        const { interaction } = f.groups[0];
        groups =
          f.count === 1
            ? `Ikona ${plays(1, interaction)}`
            : form(f.count, {
                few: `Všechny ${f.count} ikony ${PLAY_FORMS[interaction].plural}`,
                other: `Všech ${f.count} ikon ${PLAY_FORMS[interaction].singular}`,
              });
      } else {
        groups = `Kategorie obsahuje ${icons(f.count)}: ${list(
          f.groups.map(({ interaction, count }) => `${count} ${plays(count, interaction)}`)
        )}`;
      }
      return `${groups}. Každá ikona je k dispozici jako ${formats(f)}, zdarma i pro komerční použití pod licencí MIT.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `Které ${name} sada obsahuje?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Všechny můžete zdarma používat v osobních i komerčních projektech pod licencí MIT, bez nutnosti uvádět autora.`,
        },
        {
          question: `Jak použít ${name} v Reactu?`,
          answer: `Nainstalujte react-useanimations, přidejte ${ex.importLine} a vykreslete <UseAnimations animation={${ex.exportName}} size={32} />. Ikona přehraje svou interakci „${lower(ex.interactionLabel)}“ a převezme barvu textu. Se shadcn/ui místo toho spusťte ${ex.shadcnCommand}.`,
        },
        {
          question: `Můžu ${name} použít i bez Reactu?`,
          answer: `Ano. Každá ikona je Lottie JSON soubor na adrese ${f.site}/icons/<id>.json (například ${f.site}/icons/${ex.id}.json), který přehraje lottie-web, lottie-ios, lottie-android nebo balíček lottie pro Flutter${
            f.withSvg
              ? '; statická SVG najdete na stránce každé ikony (stránky ikon jsou v angličtině)'
              : ''
          }. ${
            n
              ? `${titles(f.expressions, 6)} ${n === 1 ? 'používá' : 'používají'} výrazy (expressions) z After Effects, takže na webu ${n === 1 ? 'potřebuje' : 'potřebují'} plný build lottie-web.`
              : 'Žádná z nich nepoužívá výrazy (expressions), takže stačí light build lottie-web.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · licence MIT`,
    allIcons: (name: string) => `Všechny ikony v kategorii ${name}`,
    whereToUse: 'Kde je použít',
    byInteraction: 'Podle interakce',
    addOne: 'Přidejte ikonu do aplikace',
    addOneHtml: (label: string, name: string) =>
      `V Reactu nainstalujte ${code('react-useanimations')} a naimportujte ikonu; svou interakci „${lower(label)}“ přehraje sama. Všechny ikony v této kategorii fungují stejně: ${code(name)} jen nahraďte názvem ze stránky požadované ikony.`,
    shadcnHtml: (href: string) => `Se ${link(href, 'shadcn/ui')} vám CLI přidá hotovou komponentu:`,
    noReactHtml: (href: string) =>
      `Nepoužíváte React? Každá ikona je Lottie JSON soubor na adrese ${code('/icons/&lt;id&gt;.json')}; přehrávače pro web, iOS, Android a Flutter popisuje stránka ${link(href, 'Lottie ikony')}.`,
    more: 'Další kategorie',
    allIconsButton: 'Všechny ikony',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} pro React a Lottie`,
      `${f.title} pro React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const verb = PLAY_FORMS[f.interaction].plural;
      return [
        `${animated(f.count)} zdarma, které ${verb}, například ${list(f.titles.slice(0, 3))}. Pro React, shadcn/ui a Lottie JSON, licence MIT.`,
        `${animated(f.count)} zdarma, které ${verb}. Pro React, shadcn/ui a Lottie JSON, licence MIT.`,
        `${f.title} zdarma: ${icons(f.count)} pro React, shadcn/ui a Lottie JSON, licence MIT.`,
      ];
    },
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Které ikony používají interakci „${lower(f.label)}“?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Co se stane, když uživatel preferuje omezený pohyb?',
        answer: `${f.reducedMotion} React komponenta čte prefers-reduced-motion a reaguje i na změnu nastavení, takže pro to nemusíte psát žádný kód.`,
      },
      {
        question: 'Jak změnit interakci ikony?',
        answer: `Každá ikona přehrává interakci, pro kterou byla navržena. S interaction="${f.interaction}" získá toto chování kterákoli jiná ikona, jinou hodnotou ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') ho změníte. Přehrávání dál upravují props autoplay, loop a speed.${
          f.interaction === 'click-toggle'
            ? ' Pokud chcete stav řídit sami, předejte active={isOn} a měňte ho v onClick: kliknutí pak ikonu sama nepřepínají.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Všechny ikony s interakcí „${lower(label)}“`,
    behaviour: 'Jak se chová',
    hoverNote:
      ' Klepnutí na dotykové obrazovce hover animace nespouští, fokus z klávesnice ano, pokud je ikona uvnitř fokusovatelného prvku.',
    handled: 'O to všechno se postará React komponenta, vy jen vyberete ikonu.',
    whereToUse: 'Kde ji použít',
    byCategory: 'Podle kategorie',
    useInReact: 'Použití v Reactu',
    overrideHtml: `Ikony v tomto seznamu přehrávají tuto interakci ve výchozím nastavení. Použít ji může i kterákoli jiná ikona: stačí jí předat prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) => `${title} jinak používá '${interaction}'`,
    extra: {
      loop: 'Smyčky se spouštějí automaticky a mimo viditelnou část stránky se pozastaví. Zpomalíte je pomocí speed, jen jednou je přehrajete s loop={false} a v klidu je necháte s autoplay={false}:',
      'click-toggle':
        'Kliknutí ikonu přepínají sama. Pokud ji chcete mít v souladu se svým stavem, předejte active: ikona se animuje pokaždé, když se active změní, a kliknutí ji sama o sobě už nepřepínají.',
      'click-replay':
        'Pomocí render prop vložte ikonu do skutečného tlačítka, aby na ni šlo přejít klávesnicí a čtečky obrazovky ji ohlásily. Váš onClick se spustí jako první; voláním event.preventDefault() animaci přeskočíte.',
      hover:
        'Pomocí render prop vložte ikonu do odkazu nebo tlačítka: animace se pak přehraje i při fokusu z klávesnice a klepnutí na dotykové obrazovce ji nespustí.',
      'hover-replay':
        'Nechte na hover reagovat celou kartu nebo odkaz, ne jen ikonu: s render prop jdou události na váš prvek a animaci přehraje i fokus z klávesnice.',
      'hover-loop':
        'Použijte render prop, aby smyčku spouštěl celý odkaz, včetně fokusu z klávesnice. Tempo změníte pomocí speed:',
    },
    codeText: {
      halfSpeed: 'poloviční rychlost',
      playsOnce: 'přehraje se jednou a zastaví',
      staticFrame: 'statický první snímek',
      endState: 'true zobrazí koncový stav',
      closeMenu: 'Zavřít menu',
      openMenu: 'Otevřít menu',
      download: 'Stáhnout',
      archive: 'Archiv',
      weeklyGrowth: 'Týdenní růst',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Všechny props najdete v ${link(docs, 'dokumentaci')}. Mimo React jsou ikony Lottie JSON soubory; jak interakce vytvořit s lottie-web, ukazuje stránka ${link(lottie, 'Lottie ikony')}.`,
    other: 'Další interakce',
    browseByCategory: 'Procházet podle kategorií',
  },
};
