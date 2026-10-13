import type { Interaction } from 'react-useanimations';
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { formIn, listIn, pluralIn } from '../../format';

const list = listIn('de');
const plural = pluralIn('de');
const form = formIn('de');

const icons = (n: number) => plural(n, { one: 'Icon', other: 'Icons' });

/** Up to `max` titles, then 'und N weitere'. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} und ${items.length - max} weitere`
    : list(items);

/** How a group of icons plays, as the verb phrase after its count: "5 laufen in Endlosschleife". */
const PLAYS: Record<Interaction, { one: string; other: string }> = {
  loop: { one: 'läuft in Endlosschleife', other: 'laufen in Endlosschleife' },
  'click-toggle': {
    one: 'wechselt per Klick zwischen zwei Zuständen',
    other: 'wechseln per Klick zwischen zwei Zuständen',
  },
  'click-replay': {
    one: 'spielt bei jedem Klick erneut ab',
    other: 'spielen bei jedem Klick erneut ab',
  },
  hover: {
    one: 'spielt bei Hover vorwärts und beim Verlassen rückwärts',
    other: 'spielen bei Hover vorwärts und beim Verlassen rückwärts',
  },
  'hover-replay': { one: 'spielt bei Hover einmal ab', other: 'spielen bei Hover einmal ab' },
  'hover-loop': {
    one: 'läuft in Schleife, solange der Mauszeiger darauf liegt',
    other: 'laufen in Schleife, solange der Mauszeiger darauf liegt',
  },
};

/** The same, as the end of a relative clause: "Icons, die in Endlosschleife laufen". */
const PLAYS_RELATIVE: Record<Interaction, string> = {
  loop: 'in Endlosschleife laufen',
  'click-toggle': 'per Klick zwischen zwei Zuständen wechseln',
  'click-replay': 'bei jedem Klick erneut abspielen',
  hover: 'bei Hover vorwärts und beim Verlassen rückwärts spielen',
  'hover-replay': 'bei Hover einmal abspielen',
  'hover-loop': 'in Schleife laufen, solange der Mauszeiger darauf liegt',
};

/** Static SVG note after the list of formats. */
const svgNote = (f: CategoryFacts) => {
  if (f.withSvg === f.count) return ', außerdem als statisches SVG';
  return f.withSvg ? `, ${f.withSvg} davon zusätzlich als statisches SVG` : '';
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} für React & Lottie`,
      `${f.title} für React`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.title}: ${f.count} kostenlose Icons mit Hover-, Klick- und Loop-Animation, darunter ${examples}. Für React, shadcn/ui und Lottie JSON, MIT-Lizenz.`,
        `${f.title}: ${f.count} kostenlose Icons, darunter ${examples}. Für React, shadcn/ui und Lottie JSON, MIT-Lizenz.`,
        `${f.title}: ${f.count} kostenlose Icons, darunter ${examples}. Für React, shadcn/ui und Lottie, MIT.`,
        `${f.title}: ${f.count} kostenlose Icons für React, shadcn/ui und Lottie JSON, MIT-Lizenz.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const first =
        f.groups.length === 1
          ? f.count === 1
            ? `Das Icon ${PLAYS[f.groups[0].interaction].one}.`
            : `Alle ${f.count} Icons ${PLAYS[f.groups[0].interaction].other}.`
          : `Die ${f.count} Icons verteilen sich so: ${list(
              f.groups.map(
                ({ interaction, count }) => `${count} ${form(count, PLAYS[interaction])}`
              )
            )}.`;
      return `${first} Jedes Icon gibt es als React-Komponente, als shadcn/ui-Komponente und als Lottie-JSON-Animation${svgNote(f)}, kostenlos auch für kommerzielle Projekte unter der MIT-Lizenz.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `Welche Icons enthält die Kategorie „${f.name}“?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Alle sind unter der MIT-Lizenz kostenlos für private und kommerzielle Projekte nutzbar, ohne Namensnennung.`,
        },
        {
          question: `Wie verwende ich die Icons der Kategorie „${f.name}“ in React?`,
          answer: `Installieren Sie react-useanimations, fügen Sie ${ex.importLine} hinzu und rendern Sie <UseAnimations animation={${ex.exportName}} size={32} />. Das Icon spielt seine Interaktion „${ex.interactionLabel}“ ab und übernimmt die Textfarbe. Mit shadcn/ui führen Sie stattdessen ${ex.shadcnCommand} aus.`,
        },
        {
          question: `Kann ich die Icons der Kategorie „${f.name}“ ohne React verwenden?`,
          answer: `Ja. Jedes Icon ist eine Lottie-JSON-Datei unter ${f.site}/icons/<id>.json (zum Beispiel ${f.site}/icons/${ex.id}.json), abspielbar mit lottie-web, lottie-ios, lottie-android oder dem Flutter-Paket lottie${svgNote(f) ? '; statische SVGs finden Sie auf der jeweiligen Icon-Seite (die Icon-Seiten sind nur auf Englisch verfügbar)' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} ${form(n, { one: 'nutzt', other: 'nutzen' })} After-Effects-Expressions und ${form(n, { one: 'braucht', other: 'brauchen' })} im Web deshalb den vollständigen Build von lottie-web.`
              : 'Keines davon nutzt Expressions, der Light-Build von lottie-web reicht also aus.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · MIT-Lizenz`,
    allIcons: (name: string) => `Alle Icons der Kategorie „${name}“`,
    whereToUse: 'Einsatzmöglichkeiten',
    byInteraction: 'Nach Interaktion',
    addOne: 'In die eigene App einbauen',
    addOneHtml: (label: string, name: string) =>
      `Mit React installieren Sie ${code('react-useanimations')} und importieren das Icon; seine Interaktion „${label}“ spielt es von selbst ab. Alle Icons dieser Kategorie funktionieren gleich: Ersetzen Sie ${code(name)} durch den Namen, der auf der jeweiligen Icon-Seite steht.`,
    shadcnHtml: (href: string) =>
      `Mit ${link(href, 'shadcn/ui')} fügt die CLI eine fertige Komponente hinzu:`,
    noReactHtml: (href: string) =>
      `Kein React im Einsatz? Jedes Icon ist eine Lottie-JSON-Datei unter ${code('/icons/&lt;id&gt;.json')}; Player für Web, iOS, Android und Flutter finden Sie unter ${link(href, 'Lottie-Icons')}.`,
    more: 'Weitere Kategorien',
    allIconsButton: 'Alle Icons',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} für React & Lottie`,
      `${f.title} für React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const plays = PLAYS_RELATIVE[f.interaction];
      return [
        `${f.count} kostenlose animierte Icons, die ${plays}, etwa ${list(f.titles.slice(0, 3))}. Für React, shadcn/ui und Lottie JSON, MIT-Lizenz.`,
        `${f.count} kostenlose animierte Icons, die ${plays}, etwa ${list(f.titles.slice(0, 3))}. Für React, shadcn/ui und Lottie, MIT.`,
        `${f.count} kostenlose animierte Icons, die ${plays}. Für React, shadcn/ui und Lottie JSON, MIT-Lizenz.`,
        `${f.count} kostenlose animierte Icons, die ${plays}. Für React, shadcn/ui und Lottie.`,
      ];
    },
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Welche Icons nutzen die Interaktion „${f.label}“?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Was passiert, wenn reduzierte Bewegung eingestellt ist?',
        answer: `${f.reducedMotion} Die React-Komponente liest prefers-reduced-motion aus und reagiert, sobald sich die Einstellung ändert. Sie brauchen dafür keinen eigenen Code.`,
      },
      {
        question: 'Wie ändere ich die Interaktion eines Icons?',
        answer: `Jedes Icon spielt die Interaktion ab, für die es gestaltet wurde. Mit interaction="${f.interaction}" bekommt jedes andere Icon dieses Verhalten, mit einem anderen Wert ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') ein anderes. Die Props autoplay, loop und speed steuern die Wiedergabe.${
          f.interaction === 'click-toggle'
            ? ' Um den Zustand selbst zu steuern, übergeben Sie active={isOn} und aktualisieren den Wert in onClick: Klicks schalten das Icon dann nicht mehr von selbst um.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Alle Icons mit ${label}`,
    behaviour: 'So verhält es sich',
    hoverNote:
      ' Tippen auf Touchscreens startet keine Hover-Animation; der Tastaturfokus dagegen schon, wenn das Icon in einem fokussierbaren Element steckt.',
    handled: 'All das übernimmt die React-Komponente, Sie wählen nur das Icon aus.',
    whereToUse: 'Einsatzmöglichkeiten',
    byCategory: 'Nach Kategorie',
    useInReact: 'In React verwenden',
    overrideHtml: `Die hier aufgeführten Icons spielen diese Interaktion standardmäßig ab. Jedes andere Icon kann sie ebenfalls nutzen: Übergeben Sie dazu das Prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} nutzt normalerweise '${interaction}'`,
    extra: {
      loop: 'Loops starten automatisch und pausieren, solange sie aus dem sichtbaren Bereich gescrollt sind. Mit speed verlangsamen Sie die Animation, mit loop={false} läuft sie nur einmal, und mit autoplay={false} bleibt sie stehen:',
      'click-toggle':
        'Klicks schalten das Icon von selbst um. Um es mit Ihrem State synchron zu halten, übergeben Sie active: Das Icon animiert bei jeder Änderung von active, und Klicks allein schalten es nicht mehr um.',
      'click-replay':
        'Setzen Sie das Icon mit dem render-Prop in einen echten Button, damit es fokussierbar ist und von Screenreadern angesagt wird. Ihr onClick läuft zuerst; mit event.preventDefault() lassen Sie die Animation aus.',
      hover:
        'Setzen Sie das Icon mit dem render-Prop in einen Link oder Button: Dann spielt die Animation auch, wenn das Element den Tastaturfokus erhält, und Tippen auf Touchscreens löst sie nicht aus.',
      'hover-replay':
        'Lassen Sie die ganze Karte oder den ganzen Link auf Hover reagieren, nicht nur das Icon: Mit dem render-Prop landen die Events auf Ihrem Element, und auch der Tastaturfokus spielt die Animation ab.',
      'hover-loop':
        'Nutzen Sie das render-Prop, damit der ganze Link den Loop auslöst, auch per Tastaturfokus. Das Tempo ändern Sie mit speed:',
    },
    codeText: {
      halfSpeed: 'halbe Geschwindigkeit',
      playsOnce: 'spielt einmal, dann Stopp',
      staticFrame: 'statischer erster Frame',
      endState: 'true zeigt den Endzustand',
      closeMenu: 'Menü schließen',
      openMenu: 'Menü öffnen',
      download: 'Herunterladen',
      archive: 'Archiv',
      weeklyGrowth: 'Wöchentliches Wachstum',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Alle Props stehen in der ${link(docs, 'Dokumentation')}. Außerhalb von React sind die Icons Lottie-JSON-Dateien; unter ${link(lottie, 'Lottie-Icons')} sehen Sie, wie Sie die Interaktionen mit lottie-web nachbauen.`,
    other: 'Weitere Interaktionen',
    browseByCategory: 'Nach Kategorie stöbern',
  },
};
