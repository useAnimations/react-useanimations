import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const list = listIn('de');
const iconCount = (n: number) => pluralIn('de')(n, { one: 'Icon', other: 'Icons' });
const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Alle ${count} animierten Icons nach Kategorie`,
      `Alle ${count} animierten Icons`,
    ],
    descriptions: (count: number, categories: number) => [
      `Alle useAnimations-Icons auf einer Seite: ${count} kostenlose animierte Icons in ${categories} Kategorien, für React, shadcn/ui, Lottie JSON und SVG. MIT-Lizenz.`,
    ],
    title: 'Alle animierten Icons',
    badge: (count: number) => `${count} Icons · MIT-Lizenz`,
    introHtml: (browser: string) =>
      `Alle Icons der Sammlung, nach Kategorie gruppiert. Jedes Icon führt zu einer Seite mit Live-Vorschau, dem Code für React und shadcn/ui sowie den Downloads als Lottie JSON, SVG und ZIP (die Icon-Seiten sind nur auf Englisch verfügbar). Um nach Stichworten zu suchen und die Animationen direkt auszuprobieren, nutzen Sie den ${link(browser, 'Icon-Browser')}.`,
    categoriesNav: 'Kategorien',
    byInteraction: 'Nach Interaktion:',
    categoryLink: (count: number, name: string) => `${name}: ${iconCount(count)} →`,
  },

  categories: {
    titles: (categories: number) => [
      `Kategorien animierter Icons: ${categories} Sammlungen`,
      'Kategorien animierter Icons',
    ],
    descriptions: (icons: number, categories: number) => [
      `${icons} kostenlose animierte Icons in ${categories} Kategorien: Navigation, Aktionen, Medien, Ladeanzeigen, Social Media und mehr. Für React, shadcn/ui und Lottie.`,
    ],
    title: 'Kategorien animierter Icons',
    badge: (icons: number, categories: number) => `${icons} Icons · ${categories} Kategorien`,
    introHtml: (interactions: string) =>
      `Jedes useAnimations-Icon gehört zu genau einer Kategorie, von Navigationspfeilen und Mediensteuerung bis zu Loadern und Social-Media-Logos. Eine Kategorie zeigt alle ihre Icons, typische Einsatzorte und den Code zum Einbauen. Alternativ können Sie nach ${link(interactions, 'Interaktion')} stöbern.`,
    iconCount,
  },

  interactions: {
    titles: [
      'Mikrointeraktionen: Icons für Hover, Klick und Loop',
      'Mikrointeraktionen für animierte Icons',
    ],
    descriptions: (icons: number, interactions: number) => [
      `${icons} animierte Icons mit ${interactions} Mikrointeraktionen: Loop, Klick-Toggle, Klick-Replay, Hover, Hover-Replay und Hover-Loop. Unterstützt reduzierte Bewegung.`,
      `${icons} animierte Icons mit ${interactions} Mikrointeraktionen: Loop, Klick-Toggle, Klick-Replay, Hover, Hover-Replay und Hover-Loop.`,
    ],
    title: 'Interaktionen der animierten Icons',
    badge: (interactions: number, icons: number) =>
      `${interactions} Interaktionen · ${icons} Icons`,
    introHtml: `Jedes Icon kommt mit der Mikrointeraktion, für die es gestaltet wurde: Es läuft in Schleife, schaltet um, spielt per Klick erneut ab oder reagiert auf Hover. Die React-Komponente verdrahtet das, berücksichtigt reduzierte Bewegung, und mit dem Prop <code class="font-mono text-base text-fg">interaction</code> wechselt jedes Icon zu einer anderen Interaktion.`,
    iconCount,
    chooseTitle: 'Die passende Interaktion wählen',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Ein andauernder Zustand')} wie Laden oder eine aktive Warnung: ${link(href, 'Loop')}.`,
      'click-toggle': (href: string) =>
        `${strong('Ein Ein-/Aus-Schalter')} wie Stummschalten, Menü oder Passwort anzeigen: ${link(href, 'Klick-Toggle')}, mit ${code('active')} für kontrollierten State.`,
      'click-replay': (href: string) =>
        `${strong('Eine einmalige Aktion')} wie Senden, Speichern oder Aktualisieren: ${link(href, 'Klick-Replay')}.`,
      hover: (href: string) =>
        `${strong('Ein Hinweis darauf, was ein Link öffnet')}: ${link(href, 'Hover')}, das beim Verlassen rückwärts läuft.`,
      'hover-replay': (href: string) =>
        `${strong('Toolbars und Listen, über die man schnell hinwegfährt')}: ${link(href, 'Hover-Replay')}, das von selbst zu Ende läuft.`,
      'hover-loop': (href: string) =>
        `${strong('Links, die zu einem längeren Blick einladen')}, etwa Social-Icons: ${link(href, 'Hover-Loop')}.`,
    },
    motionTitle: 'Reduzierte Bewegung',
    motionHtml: `Die React-Komponente richtet sich nach ${code('prefers-reduced-motion')} und reagiert, sobald sich die Einstellung ändert. Tippen auf Touchscreens startet nie eine Hover-Animation.`,
    reducedMotion: {
      loop: 'Das Icon startet nicht automatisch und bleibt auf seinem statischen ersten Frame.',
      'click-toggle':
        'Ein Klick wechselt sofort in den anderen Zustand, ohne die Animation dazwischen.',
      'click-replay':
        'Klicks erreichen weiterhin Ihren Handler, die Animation spielt aber nicht ab.',
      hover: 'Hover spielt die Animation nicht ab.',
      'hover-replay': 'Hover spielt die Animation nicht ab.',
      'hover-loop': 'Das Icon bleibt auch bei Hover statisch.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Kostenlose Lottie-Icons: ${count} animierte JSON-Icons`,
      'Kostenlose Lottie-Icons',
    ],
    descriptions: (count: number) => [
      `${count} kostenlose Lottie-Icons als reines Lottie JSON, MIT-Lizenz. Code zum Kopieren für lottie-web, dotLottie, React, React Native, iOS, Android und Flutter.`,
      `${count} kostenlose Lottie-Icons als Lottie JSON, MIT-Lizenz. Code für lottie-web, dotLottie, React, React Native, iOS, Android und Flutter.`,
    ],
    title: 'Kostenlose Lottie-Icons',
    crumb: 'Lottie-Icons',
    datasetName: 'useAnimations-Icon-Katalog',
    datasetDescription: (count: number) =>
      `Metadaten und Datei-URLs von ${count} animierten Lottie-Icons: ID, Titel, Kategorie, Keywords, Interaktion, Größe und Dauer.`,
    badge: (count: number) => `${count} Icons · Lottie JSON · MIT-Lizenz`,
    intro:
      'Jedes useAnimations-Icon ist eine Standard-Lottie-JSON-Animation und läuft damit in jedem Lottie-Player: lottie-web im Web, lottie-ios, lottie-android, Flutter und React Native. Die Dateien sind unter der MIT-Lizenz kostenlos, ohne Registrierung, und liegen unter stabilen URLs mit aktiviertem CORS. Sie können sie also direkt laden oder in Ihr Projekt herunterladen.',
    popular: 'Beliebte Lottie-Icons',
    allIcons: (count: number) => `Alle ${count} Icons →`,
    filesTitle: 'Dateien und URLs',
    filesIntroHtml: `Jedes Icon hat eine Seite unter ${code('/icons/&lt;id&gt;')} mit Vorschau und Downloads (nur auf Englisch). Die Dateien selbst:`,
    files: {
      json: 'Lottie-JSON-Animation',
      zip: 'JSON und statische SVGs',
      svg: 'statisches SVG je Zustand',
      catalog: 'Katalog aller Icons',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} listet jedes Icon mit ID, Titel, Kategorie, Keywords, Interaktion, Größe, Dauer und Datei-URLs auf. So lassen sich Icons per Skript nach Stichwort auswählen, oder ein Coding-Agent sucht eines aus. Die Lottie-Dateien sind im Median ${median} kB groß.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'Der Referenz-Player von Airbnb. Laden Sie ihn von einem CDN, geben Sie ihm eine Icon-URL und wählen Sie den SVG-Renderer: Damit bleibt das Icon gestochen scharf und lässt sich per CSS umfärben. Nutzen Sie den vollständigen Build (lottie.min.js), denn der Light-Build ignoriert Expressions.',
        cssLabel: 'Textfarbe übernehmen (SVG-Renderer)',
      },
      'web-interactions': {
        title: 'Web: Interaktionen für Hover und Klick',
        text: 'lottie-web kann abspielen und stoppen, die Interaktionen bauen Sie aber selbst. Hier ist der Klick-Toggle des Menü-Icons mit Unterstützung für reduzierte Bewegung; alle Interaktionen folgen demselben Muster, und die React-Komponente weiter unten erledigt das alles für Sie.',
      },
      dotlottie: {
        title: 'Web: dotLottie-Webkomponente',
        text: 'Der Player von LottieFiles rendert mit einer WebAssembly-Engine in ein Canvas und spielt neben .lottie-Dateien auch reines Lottie JSON ab. Ein Canvas übernimmt die Farben aus der Datei, die Icons bleiben also schwarz, solange Sie das JSON nicht umfärben.',
        jsLabel: 'Oder die JavaScript-API: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Kein Lottie-Player nötig: Das Paket bringt einen eigenen Player mit 8 kB mit, spielt die Interaktion jedes Icons ab, übernimmt die Textfarbe und berücksichtigt reduzierte Bewegung. Jedes Icon ist ein eigenes Modul, ausgeliefert werden also nur die, die Sie importieren.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Binden Sie das JSON für die Offline-Nutzung mit require() ein oder laden Sie es über seine URL.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Fügen Sie das Paket https://github.com/airbnb/lottie-spm.git mit dem Swift Package Manager hinzu und legen Sie das JSON dann in Ihr Bundle oder laden Sie es über seine URL.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Fügen Sie com.airbnb.android:lottie-compose hinzu (oder com.airbnb.android:lottie für Views). Für die Offline-Nutzung mit LottieCompositionSpec.RawRes legen Sie das JSON in res/raw ab.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'Das Paket lottie ist ein reiner Dart-Player für Android, iOS, Web und Desktop.',
      },
    },
    expressionsTitle: 'Icons mit Expressions',
    expressionsHtml: (count: number) =>
      `${count} Icons nutzen After-Effects-Expressions (${code('loopOut')} oder ${code('wiggle')}). Im Web spielen Sie diese mit dem vollständigen Build von lottie-web ab, nicht mit ${code('lottie_light')}. Native Player werten keine Expressions aus; testen Sie diese Icons daher unter iOS, Android und Flutter oder wählen Sie ein anderes. react-useanimations spielt sie so ab, wie sie gestaltet wurden.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Sind diese Lottie-Icons für die kommerzielle Nutzung kostenlos?',
        answer: `Ja. Alle ${f.count} Lottie-Icons stehen unter der MIT-Lizenz: Sie dürfen sie in privaten und kommerziellen Projekten nutzen, verändern und weitergeben, ohne Namensnennung und ohne Konto für den Download.`,
      },
      {
        question: 'In welchem Format liegen die Lottie-Dateien vor?',
        answer: `Standard-Lottie-JSON (das Bodymovin-Format) ausschließlich mit Formebenen: keine Bilder, Schriften oder externen Assets. Jedes Icon ist auf einer Zeichenfläche von 24 oder 32 px gezeichnet, lässt sich beliebig skalieren und ist ${f.minSize} kB bis ${f.maxSize} kB groß, im Median ${f.medianSize} kB.`,
      },
      {
        question: 'Brauche ich lottie-web, um die Icons in React zu nutzen?',
        answer:
          'Nein. react-useanimations hat einen eigenen Player mit 8 kB ohne Abhängigkeiten: Sie installieren ein Paket und importieren die Icons, die Sie brauchen. lottie-web ist nur außerhalb von React nötig, also auf reinen Webseiten oder in anderen Frameworks.',
      },
      {
        question: 'Welche Icons brauchen den vollständigen Build von lottie-web?',
        answer: `${f.expressions.length} Icons nutzen After-Effects-Expressions (loopOut oder wiggle): ${list(f.expressions)}. Im Web brauchen sie den vollständigen Build von lottie-web, denn lottie_light ignoriert Expressions. Auch native Player (lottie-ios, lottie-android, das Flutter-Paket lottie) werten keine Expressions aus, dort bewegen sich diese Icons also möglicherweise anders.`,
      },
      {
        question: 'Kann ich die Farbe eines Lottie-Icons ändern?',
        answer:
          'Im Web schreibt der SVG-Renderer von lottie-web die Farben als Attribute, eine CSS-Regel für die Pfade färbt das Icon also um. Native Player nutzen ihre APIs für dynamische Eigenschaften: ColorValueProvider unter iOS, LottieProperty.COLOR und STROKE_COLOR unter Android und ValueDelegate.color in Flutter.',
      },
    ],
    byCategory: 'Lottie-Icons nach Kategorie',
  },

  shadcn: {
    titles: (count: number) => [
      `Animierte Icons für shadcn/ui: ${count} Komponenten`,
      'Animierte Icons für shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} animierte Icons für shadcn/ui: jedes Icon mit einem Befehl der shadcn CLI hinzufügen. Hover-, Klick- und Loop-Interaktionen, MIT-Lizenz, ohne lottie-web.`,
      `${count} animierte Icons für shadcn/ui, jedes mit einem Befehl der shadcn CLI hinzugefügt. Hover, Klick und Loop, MIT-Lizenz, ohne lottie-web.`,
    ],
    title: 'Animierte Icons für shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Beliebte animierte Icons für shadcn/ui',
    badge: (count: number) => `${count} Komponenten · shadcn-Registry · MIT-Lizenz`,
    intro:
      'Jedes useAnimations-Icon steht in einer shadcn-Registry. Ein CLI-Befehl fügt Ihrem Projekt eine typisierte React-Komponente hinzu, mit der Hover-, Klick- oder Loop-Interaktion, für die das Icon gestaltet wurde, Unterstützung für reduzierte Bewegung und Farben, die Ihrem Theme folgen. Der Code landet in Ihrem Repository, wie bei jeder anderen shadcn/ui-Komponente.',
    addTitle: 'Ein Icon hinzufügen',
    addIntro: 'Führen Sie die shadcn CLI mit der Registry-URL des Icons aus:',
    namingHtml: `Die Komponente heißt ${code('Animated')} + die Icon-ID in PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) und landet in ${code('components/animations/&lt;id&gt;.tsx')}. Die CLI fügt außerdem den gemeinsamen Wrapper ${code('components/use-animation.tsx')} hinzu und installiert ${code('react-useanimations')}, das einen eigenen Player mitbringt: kein lottie-web nötig.`,
    namespaceTitle: 'Kurze Namen mit einem Registry-Namespace',
    namespaceHtml: `Tragen Sie die Registry einmalig in ${code('components.json')} ein; danach fügen Sie Icons per Namen hinzu, auch mehrere auf einmal:`,
    registryHtml: (registry: string) =>
      `Der Registry-Index unter ${link(registry, '/r/registry.json')} listet jeden Eintrag mit Titel, Kategorie und Interaktion auf.`,
    usageTitle: 'In einem shadcn-Button verwenden',
    usageHtml: `Die Komponenten nehmen dieselben Props wie ${code('UseAnimations')}. Bei einem Toggle wie dem Menü-Icon übergeben Sie ${code('active')} und halten den State in Ihrem Button; das Icon animiert bei jeder Änderung:`,
    colorHtml: (docs: string) =>
      `Icons übernehmen die Textfarbe: ${code('text-primary')} oder ${code('text-muted-foreground')} färben sie um, und Dark Mode braucht nichts Zusätzliches. Weitere Props und Muster finden Sie in der ${link(docs, 'Dokumentation')}.`,
    codeText: { closeMenu: 'Menü schließen', openMenu: 'Menü öffnen' },
    popular: 'Beliebte Icons für shadcn/ui',
    allIcons: (count: number) => `Alle ${count} Icons →`,
    popularNote:
      'Jede Icon-Seite zeigt ihren shadcn-Befehl (die Icon-Seiten sind nur auf Englisch verfügbar).',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Sind die animierten Icons für shadcn/ui kostenlos?',
        answer: `Ja. Alle ${f.count} Icons und der Code der Komponenten stehen unter der MIT-Lizenz, für private und kommerzielle Projekte. Die Registry braucht weder Konto noch API-Key.`,
      },
      {
        question: 'Was fügt die shadcn CLI meinem Projekt hinzu?',
        answer: `Die Icon-Komponente in components/animations/<id>.tsx, den gemeinsamen Player-Wrapper UseAnimation in components/use-animation.tsx (einmalig, als Registry-Abhängigkeit) und react-useanimations@^${f.version} von npm. lottie-web ist nicht nötig: Das Paket hat einen eigenen Player mit 8 kB.`,
      },
      {
        question: 'Funktionieren die Komponenten mit Server Components in Next.js?',
        answer:
          'Ja. Die Komponenten sind mit "use client" markiert und zeichnen die Animation nur im Browser. Sie können sie also aus Server Components und Seiten rendern, ohne dynamische Imports oder ssr: false.',
      },
      {
        question: 'Kann ich Aussehen und Bewegung der Icons ändern?',
        answer:
          'Der Code gehört Ihnen und liegt in Ihrem Repository. Die Komponenten nehmen die Props von UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop und speed. Icons übernehmen die Textfarbe, Tailwind-Klassen wie text-primary oder text-muted-foreground färben sie also um.',
      },
    ],
    byCategory: 'Nach Kategorie stöbern',
  },
};
