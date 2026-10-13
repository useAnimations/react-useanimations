import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Animierte Icons & Mikroanimationen — useAnimations',
  description: (count: number) =>
    `${count} kostenlose Mikroanimationen für UIs: animierte Icons für React, shadcn/ui und Lottie mit eingebautem Hover, Klick und Loop. MIT-Lizenz.`,

  hero: {
    badge: (count: number) => `${count} Icons · keine Abhängigkeiten · MIT`,
    headline: { start: 'Icons, die ', accent: 'lebendig werden.', end: '' },
    h1: 'Kostenlose animierte Icons für React, shadcn/ui und Lottie',
    intro: (count: number) =>
      `${count} handgemachte Mikroanimationen mit eingebauten Mikrointeraktionen für Hover, Klick und Loop. Nutzen Sie sie als React-Komponente, fügen Sie sie mit shadcn hinzu oder laden Sie SVG und Lottie JSON herunter. MIT-lizenziert.`,
    browse: 'Icons ansehen',
    fieldHint: 'Bewegen Sie den Mauszeiger über das Feld.',
  },

  numbers: {
    label: 'Auf einen Blick',
    icons: 'animierte Icons',
    interactions: 'eingebaute Interaktionen',
    size: 'Player, gzip-komprimiert',
    dependencies: 'Abhängigkeiten',
  },

  interactions: {
    eyebrow: 'Interaktionen inklusive',
    title: 'Jedes Icon weiß, wie es sich bewegt.',
    intro:
      'Jedes Icon kommt mit der Interaktion, für die es gestaltet wurde. Einfach einbauen, und es funktioniert – oder mit einem einzigen Prop eine andere wählen. Probieren Sie es aus:',
    demos: {
      loop: 'Läuft ununterbrochen, für Loader und dezente Statusanzeigen.',
      'click-toggle': 'Wechselt zwischen zwei Zuständen: Menü und Schließen, Play und Pause.',
      'click-replay': 'Spielt bei jedem Klick von vorn ab, als Feedback.',
      hover: 'Spielt beim Betreten vorwärts und beim Verlassen rückwärts.',
      'hover-loop': 'Läuft bei Hover in Schleife und beendet beim Verlassen den Durchlauf.',
      'hover-replay': 'Spielt bei jedem Betreten einmal von vorn ab.',
    },
  },

  browser: {
    eyebrow: 'Die Bibliothek',
    title: (count: number) => `${count} kostenlose animierte Icons`,
    intro:
      'Hover oder Klick startet die Animation. Ein Klick auf ein Icon öffnet Code und Downloads – Lottie JSON, SVG und ZIP.',
    search: 'Icons durchsuchen',
    searchPlaceholder: (count: number) =>
      `${count} Icons durchsuchen – z. B. „eye“, „bell“ oder „arrow“`,
    interaction: 'Interaktion',
    allInteractions: 'Alle Interaktionen',
    color: 'Icon-Farbe',
    colors: {
      text: 'Textfarbe',
      indigo: 'Indigo',
      red: 'Rot',
      amber: 'Bernstein',
      teal: 'Petrol',
      violet: 'Violett',
    },
    customColor: 'Eigene Farbe',
    size: 'Größe',
    category: 'Kategorie',
    all: 'Alle',
    count: { one: '{n} Icon', other: '{n} Icons' },
    noMatch: 'Keine passenden Icons.',
    noMatchHintHtml: (href: string) =>
      `Versuchen Sie ein anderes Wort oder ${link(href, 'schlagen Sie ein Icon vor')}.`,
  },

  everywhere: {
    eyebrow: 'Ganz nach Ihrem Workflow',
    title: 'Installieren, importieren, fertig.',
    intro:
      'Eine React-Komponente ohne Abhängigkeiten, eine shadcn-Registry, Dateien zum Herunterladen unter stabilen URLs und ein Katalog, den KI-Agenten lesen können.',
    docs: 'Zur Dokumentation →',
    tablist: 'Plattform',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Dateien', agents: 'Agenten' },
    codeText: {
      afterAdding: 'danach',
      files: 'Jedes Icon als SVG, als Animation (Lottie JSON) und als ZIP mit beidem',
    },
  },

  features: {
    title: 'Klein, barrierefrei und frei gestaltbar.',
    colors: 'Übernimmt Ihre Farben',
    colorsHtml: `Icons nutzen ${code('currentColor')}: Textfarbe, Hover-Zustände und Dark Mode übernehmen sie von selbst. Überschreiben lässt sich das per Prop, Klasse oder ganz normalem CSS.`,
    tiny: 'Bewusst klein',
    tinyText:
      'Ein eingebauter Player, keine Abhängigkeiten. Jedes Icon ist ein eigenes Modul mit 2 kB.',
    accessible: 'Von Haus aus barrierefrei',
    accessibleText:
      'Berücksichtigt reduzierte Bewegung, spielt Hover-Animationen auch bei Tastaturfokus ab und bleibt für Screenreader unsichtbar, solange Sie kein Label vergeben.',
    ssr: 'Bereit für Server-Rendering',
    ssrText:
      'Eine Client-Komponente, die in Next.js, Remix und Astro problemlos rendert. Icons sind reine Daten, die Sie überall importieren können.',
    agents: 'Gemacht für Agenten',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Ein typisierter Katalog mit Keywords für jedes Icon, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} und Dokumentation in Markdown.`,
  },

  browse: {
    title: 'Die passende Mikroanimation finden.',
    byCategory: 'Nach Kategorie stöbern',
    byInteraction: 'Nach Interaktion stöbern',
    formats: 'Alle Icons und Formate',
  },

  hubs: {
    icons: 'Alle animierten Icons',
    categories: 'Icon-Kategorien',
    interactions: 'Icons nach Interaktion',
    lottie: 'Lottie-Icons (JSON)',
    shadcn: 'Animierte Icons für shadcn/ui',
  },

  faqTitle: 'Häufige Fragen',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: 'Was sind Mikroanimationen und animierte Icons?',
      answer:
        'Mikroanimationen sind kurze Bewegungen mit genau einem Zweck, die auf eine Aktion des Nutzers antworten: ein Menü-Icon, das zum Schließen-Button wird, ein Herz, das sich beim Liken eines Beitrags füllt, eine Glocke, die bei einer neuen Benachrichtigung läutet. Animierte Icons sind die häufigste Form davon. Sie lassen eine Oberfläche reaktionsschnell wirken und zeigen Zustandswechsel ohne zusätzlichen Text.',
    },
    {
      question: 'Was ist der Unterschied zwischen den Lottie- und den SVG-Dateien?',
      answer:
        'Die Lottie-JSON-Datei enthält die komplette Animation und läuft in jedem Lottie-Player, auch in dem, der in react-useanimations eingebaut ist. Die SVG-Dateien sind Standbilder des Icons im Ruhezustand, eines pro Zustand (zum Beispiel eye und eye-off), für Stellen, an denen sich nichts bewegen soll: E-Mails, Dokumente, Design-Tools oder ein Fallback ohne JavaScript.',
    },
    {
      question: 'Funktioniert das mit Next.js und Server-Rendering?',
      answer:
        "Ja. Die Komponente ist mit 'use client' markiert und zeichnet die Animation nur im Browser. Sie rendert daher aus Server Components und SSR-Frameworks wie Next.js, Remix und Astro, ganz ohne dynamische Imports. Icon-Module sind reine Daten, die Server Components importieren und als Props weitergeben können.",
      link: { href: f.links.serverRendering, label: 'Next.js und Server-Rendering' },
    },
    {
      question: 'Darf ich die Icons in kommerziellen Projekten verwenden?',
      answer:
        'Ja. Die Icons und das Paket react-useanimations stehen unter der MIT-Lizenz: Sie dürfen sie in privaten und kommerziellen Projekten nutzen, verändern und weitergeben. Eine Namensnennung freut uns, ist aber nicht erforderlich.',
      link: { href: f.links.licence, label: 'Lizenz & Nutzungsbedingungen' },
    },
    {
      question: 'Kann ich die Icons ohne React verwenden?',
      answer:
        'Ja. Jedes Icon ist eine Standard-Lottie-JSON-Datei und läuft daher mit lottie-web in reinem JavaScript, in Vue, Svelte, Angular oder einem CMS sowie in Lottie-Playern für iOS, Android und Flutter. Auf der Seite zu den Lottie-Icons finden Sie die Datei-URLs und fertige lottie-web-Snippets für jede Interaktion.',
      link: { href: f.links.lottie, label: 'Lottie-Icons' },
    },
    {
      question: 'Wie viel bringen die Icons zusätzlich ins Bundle?',
      answer: `Der Player in react-useanimations ${f.version} ist gzip-komprimiert etwa 8 kB groß und hat keine Abhängigkeiten. Jedes Icon ist ein eigenes Modul mit 1 bis 15 kB (Median 2 kB), im Bundle landen also nur die Icons, die Sie importieren.`,
    },
  ],

  cta: {
    title: { start: 'Bringen Sie Ihr Interface ', accent: 'in Bewegung.', end: '' },
    text: 'Kostenlos und MIT-lizenziert, für private und kommerzielle Projekte.',
    start: 'Jetzt loslegen',
  },

  schema: {
    software: (count: number) =>
      `React-Komponente und ${count} animierte Icons (Lottie) mit eingebauten Interaktionen für Hover, Klick und Loop. Keine Abhängigkeiten.`,
    catalogName: 'useAnimations-Icon-Katalog',
    catalog: (count: number) =>
      `Alle ${count} useAnimations-Icons mit ID, Titel, Kategorie, Keywords, Interaktion, URLs für Lottie JSON, SVG und ZIP, React-Import und shadcn-Befehl.`,
  },
};
