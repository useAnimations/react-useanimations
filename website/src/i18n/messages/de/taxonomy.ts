import type { Messages } from '../en';

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Warnungen',
      title: 'Animierte Warn-Icons',
      intro:
        'Warndreiecke, Alarmkreise und Stoppschilder, die gerade so stark pulsieren, dass man sie bemerkt, ohne dass etwas blinkt. Sie gehören neben ein fehlerhaftes Formularfeld, an den Anfang eines Fehlerbanners oder in eine Statusspalte, also überall dorthin, wo man über ein statisches Icon leicht hinwegscrollt.',
      useCases: [
        'Validierungsfehler direkt unter Formularfeldern',
        'Fehler- und Warnbanner oben auf der Seite',
        'Fehlgeschlagene Zeilen in einer Deploy- oder Job-Statustabelle',
        'Bestätigungsdialoge für destruktive Aktionen',
        'Statusseiten während einer Störung',
      ],
    },
    Notifications: {
      name: 'Benachrichtigungen',
      title: 'Animierte Benachrichtigungsglocken',
      intro:
        'Glocken-Icons, die bei neuen Aktivitäten läuten oder zwischen Glocke und durchgestrichener Glocke wechseln. Ein kurzes Schwingen lenkt den Blick auf die Zahl ungelesener Nachrichten, und die umschaltbaren Varianten dienen zugleich als Stummschalter für einen Kanal oder Thread.',
      useCases: [
        'Button für die Benachrichtigungszentrale im App-Header',
        'Ungelesen-Badge, das bei einer neuen Nachricht läutet',
        'Stummschalten und Wiedereinschalten eines Kanals oder Threads',
        'Einstellungen für E-Mail- und Push-Benachrichtigungen',
        'Buttons zum Abonnieren von Erinnerungen und Alerts',
      ],
    },
    Navigation: {
      name: 'Navigation',
      title: 'Animierte Navigations- und Pfeil-Icons',
      intro:
        'Hamburger-Menüs, die sich in einen Schließen-Button verwandeln, dazu Pfeile, Chevrons und Eckpfeile, die bei Hover ein Stück in ihre Richtung rücken. So ist sofort klar, wohin ein Bedienelement führt: Drawer öffnen, zurückgehen, Zeile aufklappen, die Website verlassen.',
      useCases: [
        'Hamburger-Menü, das mobil zum Schließen-Button wird',
        'Zurück- und Weiter-Buttons in Karussells und Paginierung',
        'Chevrons in Akkordeons und Dropdowns',
        'Hinweise „Nach oben“ und „Nach unten scrollen“',
        'Links zum Anmelden und Abmelden',
        'Markierungen für externe Links und Sidebar-Toggles',
      ],
    },
    Action: {
      name: 'Aktionen',
      title: 'Animierte Aktions-Icons',
      intro:
        'Die Verben einer Oberfläche: speichern, löschen, herunterladen, aktualisieren, liken, merken, suchen und Einstellungen. Jedes Icon bestätigt den Klick oder Hover, zu dem es gehört: Das Herz füllt sich, wenn man einen Beitrag likt, und der Deckel des Papierkorbs hebt sich, bevor man etwas löscht.',
      useCases: [
        'Like-, Favoriten- und Merken-Buttons auf Karten',
        'Download-, Upload- und Speichern-Buttons, die die Aktion bestätigen',
        'Passwort anzeigen und verbergen im Login-Formular',
        'Aktualisieren- und Sync-Buttons in Dashboards',
        'Löschen-Buttons in Tabellen und Dateilisten',
        'Suchfeld, das zum Leeren-Button wird',
      ],
    },
    Content: {
      name: 'Inhalte',
      title: 'Animierte Datei-, Ordner- und Nutzer-Icons',
      intro:
        'Dateien, Ordner, Bücher, Mail, Anhänge und Personen. Sie kennzeichnen die Dinge, mit denen Nutzer arbeiten, und dank der Varianten zum Hinzufügen, Entfernen und Abhaken reagieren Listen und Teamverwaltung spürbar auf jede Aktion.',
      useCases: [
        'Dateimanager und Dokumentlisten',
        'Buttons für Anhänge und „In die Zwischenablage kopieren“',
        'Posteingang und Archiv in Mail-Clients',
        'Teamlisten mit Aktionen zum Hinzufügen und Entfernen von Nutzern',
        'Teilen-Menüs für Dokumente und Links',
      ],
    },
    Form: {
      name: 'Formulare',
      title: 'Animierte Icons für Formularelemente',
      intro:
        'Eine Checkbox, ein Radiobutton und ein Toggle-Switch, die zwischen aktiviertem und deaktiviertem Zustand animieren. Sie passen überall dort, wo ein normales Eingabeelement flach wirkt, etwa in Onboarding-Checklisten und Einstellungsseiten, und der Zustand bleibt auf einen Blick erkennbar.',
      useCases: [
        'Schalter für Funktionen und Einstellungen',
        'Onboarding- und To-do-Checklisten',
        'Einfachauswahl in Umfragen und bei der Tarifwahl',
        'Checkboxen für AGB und Einwilligungen',
      ],
    },
    Media: {
      name: 'Medien',
      title: 'Animierte Mediaplayer-Icons',
      intro:
        'Play und Pause, Lautstärke, Mikrofon, Kamera, Überspringen und Zufallswiedergabe für Audio- und Videoplayer. Die umschaltbaren Icons wechseln zwischen ihren beiden Zuständen, von Play zu Pause oder vom Mikrofon zum stummgeschalteten Mikrofon, sodass der Button immer zeigt, was ein Klick bewirkt.',
      useCases: [
        'Play- und Pause-Buttons in Audio- und Videoplayern',
        'Stummschalten in Videocalls',
        'Kamera ein und aus in Meeting-Apps',
        'Playlist-Steuerung für Überspringen, Wiederholen und Zufallswiedergabe',
        'Buttons für Casting und AirPlay',
        'Steuerelemente in Podcast- und Musik-Apps',
      ],
    },
    'Text editing': {
      name: 'Textbearbeitung',
      title: 'Animierte Icons für die Textbearbeitung',
      intro:
        'Fett, kursiv, unterstrichen, Ausrichtung und Listen für Rich-Text-Toolbars. Eine kurze Klick-Animation bestätigt, dass die Formatierung angewendet wurde. Das hilft in Editoren, in denen die Änderung am Text selbst kaum auffällt.',
      useCases: [
        'Toolbars in Rich-Text-Editoren',
        'Eingabefelder für Kommentare und Nachrichten',
        'CMS- und Blog-Editoren',
        'Markdown- und Notiz-Apps',
        'Textausrichtung in Design-Tools',
      ],
    },
    Communication: {
      name: 'Kommunikation',
      title: 'Animierte Kommunikations-Icons',
      intro:
        'Telefone, Sprechblasen, Senden-Buttons, Voicemail und RSS. Die Telefon-Icons decken alle Zustände ab, die eine Anrufliste braucht: eingehend, ausgehend, verpasst und weitergeleitet. Das Senden-Icon gibt einer Nachricht beim Klick einen kleinen Schwung mit auf den Weg.',
      useCases: [
        'Senden-Button in Chat- und Kommentarformularen',
        'Anruflisten mit eingehenden, ausgehenden und verpassten Anrufen',
        'Kontakt- und Support-Buttons',
        'Buttons zum Öffnen eines Chat-Widgets',
        'Felder für Erwähnungen und E-Mail-Adressen',
      ],
    },
    Devices: {
      name: 'Geräte',
      title: 'Animierte Geräte-Icons',
      intro:
        'Smartphones, Tablets, Monitore, Smartwatches und Drucker, dazu die passenden Verbindungsanzeigen: WLAN, Bluetooth und Akku. Sie eignen sich für Geräteauswahl, Umschalter für die responsive Vorschau und den Verbindungsstatus.',
      useCases: [
        'Umschalter für die responsive Vorschau auf Smartphone, Tablet und Desktop',
        'WLAN- und Bluetooth-Verbindungsstatus',
        'Akku- und Ladeanzeigen',
        'Gerätelisten in den Sicherheitseinstellungen eines Kontos',
        'Drucken-Buttons bei Rechnungen und Berichten',
      ],
    },
    Weather: {
      name: 'Wetter',
      title: 'Animierte Wetter-Icons',
      intro:
        'Sonne, Mond, Wolken, Regen, Schnee, Blitz und Wind für Wettervorhersagen und alles, was sich nach der Tageszeit richtet. Sonne und Mond ergeben außerdem einen naheliegenden Umschalter zwischen Light und Dark Mode.',
      useCases: [
        'Wetter-Widgets und Vorhersagekarten',
        'Umschalter zwischen hellem und dunklem Design',
        'Sonnenauf- und -untergang in Reise-Apps',
        'Temperaturanzeigen in Smart-Home-Dashboards',
        'Anzeigen für Energie- und Stromstatus',
      ],
    },
    'Maps & location': {
      name: 'Karten & Standort',
      title: 'Animierte Karten- und Standort-Icons',
      intro:
        'Kartenpins, Navigationspfeile, Globen, Zielscheiben und Anker. Ein Pin, der bei Hover herunterfällt, hebt eine Filialsuche oder eine Lieferadresse hervor, und der Globus taugt als Umschalter für Sprache oder Region.',
      useCases: [
        'Filialsuche und Adressfelder',
        'Buttons für aktuellen Standort und Routenplanung',
        'Auswahl von Sprache und Region',
        'Liefer- und Sendungsverfolgung',
        'Reise- und Buchungs-Apps',
      ],
    },
    Commerce: {
      name: 'E-Commerce',
      title: 'Animierte E-Commerce-Icons',
      intro:
        'Warenkörbe, Einkaufstaschen, Preisschilder, Geschenke, Kreditkarten und Lieferwagen für Onlineshops. Eine In-den-Warenkorb-Animation bestätigt den Klick ohne Toast, und Lieferwagen und Paket bringen etwas Leben in den Bestellstatus.',
      useCases: [
        'In-den-Warenkorb-Buttons auf Produktkarten',
        'Warenkorb- und Taschen-Buttons im Shop-Header',
        'Checkout und Auswahl der Zahlungsart',
        'Rabatt-, Gutschein- und Sale-Badges',
        'Schritte für Versand und Sendungsverfolgung',
        'Geschenkkarten und Optionen für Geschenkverpackung',
      ],
    },
    Charts: {
      name: 'Diagramme',
      title: 'Animierte Diagramm-Icons',
      intro:
        'Balkendiagramme, ein Tortendiagramm und Trendpfeile für Analytics und Reporting. Die Icons für steigenden und fallenden Trend zeigen auf einen Blick, ob eine Kennzahl gestiegen oder gesunken ist, und passen damit zu KPI-Karten und Zahlenübersichten im Zeitverlauf.',
      useCases: [
        'KPI-Karten mit steigenden oder fallenden Kennzahlen',
        'Navigationspunkte für Analytics und Berichte',
        'Leere Zustände in Dashboards',
        'Finanz- und Portfolioübersichten',
      ],
    },
    Development: {
      name: 'Entwicklung',
      title: 'Animierte Entwickler-Icons',
      intro:
        'Code-Klammern, ein Terminal, Git-Branches, Commits, Merges und Pull Requests, dazu Server und Datenbanken. Gemacht für Developer-Tools, Dokumentationsseiten und Statusseiten, deren Oberfläche ohnehin von Git- und Infrastruktur-Begriffen geprägt ist.',
      useCases: [
        'Status von Pull Requests, Merges und Branches in Developer-Tools',
        'Buttons für Code-Snippets und Embeds in Dokumentationen',
        'Terminal- und CLI-Abschnitte auf Landingpages',
        'Server- und Datenbank-Health auf Statusseiten',
        'Hinweise auf Tastenkürzel mit der Command-Taste',
      ],
    },
    'Design & layout': {
      name: 'Design & Layout',
      title: 'Animierte Design- und Layout-Icons',
      intro:
        'Raster, Spalten, Ebenen, Zuschneiden, Zeichenstift und Mauszeiger für Editoren und Baukästen. Sie passen in Toolbars, in denen Nutzer Inhalte anordnen, zwischen Raster- und Tabellenansicht wechseln oder ein Zeichenwerkzeug wählen.',
      useCases: [
        'Umschalter zwischen Raster-, Listen- und Tabellenansicht',
        'Ebenen-Panels in Design- und Präsentations-Tools',
        'Zuschneide- und Ausschneidewerkzeuge in Bildeditoren',
        'Page-Builder und Layoutauswahl',
        'Griffe zum Verschieben per Drag-and-drop',
      ],
    },
    'Shapes & math': {
      name: 'Formen & Mathematik',
      title: 'Animierte Formen- und Mathe-Icons',
      intro:
        'Kreise, Quadrate, Dreiecke, Sechsecke, ein Achteck und Divisionszeichen. Sie dienen als Formwerkzeuge in Zeichen-Apps, als Rechenoperatoren in einem Taschenrechner oder als neutrale Markierungen in Diagrammen und Onboarding-Schritten.',
      useCases: [
        'Formwerkzeuge in Whiteboard- und Zeichen-Apps',
        'Operatoren in Taschenrechnern und Formeleditoren',
        'Aufzählungs- und Schrittmarkierungen in Diagrammen',
        'Quiz- und Spieloberflächen',
      ],
    },
    Loading: {
      name: 'Ladeanzeigen',
      title: 'Animierte Lade-Icons',
      intro:
        'Spinner und Loader, die in Schleife laufen, solange etwas in Arbeit ist. Setzen Sie einen in den Absenden-Button, während ein Request läuft, an die Stelle von Inhalten, die noch laden, oder auf einen Vollbild-Splashscreen. Bevorzugt der Nutzer reduzierte Bewegung, bleiben sie still stehen.',
      useCases: [
        'Absenden-Buttons, die auf einen Request warten',
        'Platzhalter, während eine Liste oder ein Diagramm lädt',
        'Anzeigen für Infinite Scroll und „Mehr laden“',
        'Vollbild-Splashscreens und Routenwechsel',
        'Fortschritt beim Datei-Upload und bei der Verarbeitung',
      ],
    },
    'Social media': {
      name: 'Social Media',
      title: 'Animierte Social-Media-Icons',
      intro:
        'Marken-Icons für soziale Netzwerke und für die Tools, über die Entwickler und Designer ihre Arbeit teilen: X, Instagram, YouTube, Discord, Telegram, Figma und weitere. Sie animieren bei Hover, wodurch Links im Footer und im Profil sichtbar anklickbar wirken.',
      useCases: [
        'Social-Links im Footer einer Website',
        'Teilen-Buttons unter Blogartikeln',
        'Profillinks von Autoren und Teams',
        'Einladungs-Buttons für Community-Chatserver',
        'Anmeldung mit einem Social- oder Entwicklerkonto',
      ],
    },
    Other: {
      name: 'Sonstige',
      title: 'Weitere animierte Icons',
      intro:
        'Icons, die zu keiner größeren Gruppe gehören: Emoji-Gesichter für Feedback, eine Kaffeetasse, eine Uhr, eine Pulslinie und ein Scroll-Hinweis. Das Scroll-Icon ist ein verbreiteter Hinweis im Hero-Bereich, dass weiter unten noch mehr kommt.',
      useCases: [
        'Scroll-Hinweise am unteren Rand eines Hero-Bereichs',
        'Fröhliche, neutrale und traurige Gesichter in Feedback-Widgets',
        'Aktivitäts- und Uptime-Anzeigen',
        'Öffnungszeiten und Zeitauswahl',
        'Links zu „Buy me a coffee“ und anderen Unterstützungsangeboten',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Loop',
      title: 'Animierte Icons in Endlosschleife',
      intro:
        'Diese Icons laufen ununterbrochen, solange sie zu sehen sind, und passen damit zu Zuständen, die andauern: Etwas lädt, eine Warnung ist aktiv, ein Terminal wartet. Ist reduzierte Bewegung eingestellt, bleiben sie auf ihrem ersten Frame stehen und funktionieren weiter als ganz normales Icon.',
      useCases: [
        'Lade-Spinner und Fortschrittsanzeigen',
        'Aktive Warn- und Fehlerzustände',
        'Live- und Aufnahmeanzeigen',
        'Scroll-Hinweise im Hero-Bereich',
        'Aufmerksamkeitsmarker für neue Benachrichtigungen',
      ],
      example:
        'Typische Loop-Icons sind Lade-Spinner, aktive Warnungen, eine läutende Glocke oder ein Scroll-Hinweis.',
      description:
        'Läuft ununterbrochen; bleibt bei reduzierter Bewegung auf dem statischen ersten Frame stehen.',
      reducedMotion:
        'Ist reduzierte Bewegung eingestellt, startet das Icon nicht automatisch und bleibt auf seinem statischen ersten Frame.',
      plays: 'laufen in Endlosschleife',
    },
    'click-toggle': {
      label: 'Klick-Toggle',
      title: 'Animierte Icons zum Umschalten per Klick',
      intro:
        'Jeder Klick animiert zwischen zwei Zuständen, und das Icon bleibt im neuen Zustand. Damit ist es die sichtbare Hälfte eines Ein-/Aus-Schalters. Da das Icon immer den aktuellen Zustand zeigt, erklärt sich der Button von selbst, sobald er zusätzlich aria-pressed oder ein checked-Attribut bekommt.',
      useCases: [
        'Buttons zum Stumm- und Lautschalten',
        'Passwortfelder mit Anzeigen und Verbergen',
        'Hamburger-Menü und Schließen-Button',
        'Play und Pause',
        'Toggles für Like, Stern und Lesezeichen',
        'Checkboxen, Radiobuttons und Schalter',
      ],
      example:
        'Typische Einsätze für Icons mit Klick-Toggle sind Buttons für Stumm/Laut, Passwort anzeigen/verbergen, Menü/Schließen, Play/Pause und Like.',
      description:
        'Wechselt per Klick zwischen zwei Zuständen; bei reduzierter Bewegung springt es sofort um.',
      reducedMotion:
        'Ist reduzierte Bewegung eingestellt, wechselt ein Klick sofort in den anderen Zustand, ohne die Animation dazwischen.',
      plays: 'wechseln per Klick zwischen zwei Zuständen',
    },
    'click-replay': {
      label: 'Klick-Replay',
      title: 'Animierte Icons mit Klick-Animation',
      intro:
        'Diese Icons spielen bei jedem Klick einmal von vorn ab, als kleine Bestätigung, dass die Aktion angekommen ist. Sie passen zu einmaligen Aktionen, die keinen Zustand hinterlassen: senden, speichern, aktualisieren, herunterladen, drucken oder löschen.',
      useCases: [
        'Senden-Buttons in Chat- und Kommentarformularen',
        'Buttons zum Speichern, Herunterladen und Hochladen',
        'Buttons zum Aktualisieren und Drehen',
        'In-den-Warenkorb-Buttons',
        'Formatierungs-Buttons in Editoren',
      ],
      example:
        'Icons mit Klick-Animation bestätigen typischerweise Buttons zum Senden, Speichern, Aktualisieren, Herunterladen, Formatieren und für den Warenkorb.',
      description: 'Spielt bei jedem Klick einmal von vorn ab, außer bei reduzierter Bewegung.',
      reducedMotion:
        'Ist reduzierte Bewegung eingestellt, erreichen Klicks weiterhin Ihren Handler, die Animation spielt aber nicht ab.',
      plays: 'spielen bei jedem Klick erneut ab',
    },
    hover: {
      label: 'Hover',
      title: 'Animierte Hover-Icons',
      intro:
        'Diese Icons spielen vorwärts, wenn der Mauszeiger sie erreicht, und rückwärts, wenn er sie verlässt. Die Bewegung folgt also dem Cursor und bleibt nie auf halber Strecke hängen. Sie passen zu Navigationspunkten und Buttons, die andeuten, was sie öffnen: Der Papierkorbdeckel hebt sich, das Zahnrad dreht sich, der Ordner geht auf.',
      useCases: [
        'Einträge in Sidebar und Navigationsmenü',
        'Löschen-Buttons, die schon vor dem Klick den Deckel heben',
        'Links zu Einstellungen und Profil',
        'Steuerelemente zum Vergrößern und Verkleinern',
        'Social-Links im Footer',
      ],
      example:
        'Hover-Icons kennzeichnen typischerweise Navigationspunkte, Löschen-Buttons, Einstellungen, Zoom-Steuerelemente und Social-Links.',
      description: 'Spielt bei mouseenter vorwärts und bei mouseleave rückwärts.',
      reducedMotion: 'Ist reduzierte Bewegung eingestellt, spielt Hover die Animation nicht ab.',
      plays: 'spielen bei Hover vorwärts und beim Verlassen rückwärts',
    },
    'hover-replay': {
      label: 'Hover-Replay',
      title: 'Animierte Icons mit Hover-Replay',
      intro:
        'Diese Icons spielen einmal ab, wenn der Mauszeiger sie erreicht, und laufen dann von selbst zu Ende. So wird aus dem schnellen Überfahren einer Toolbar kein nervöses Gezappel. Die meisten Icons der Sammlung funktionieren so: Pfeile, Dateien, Geräte, Wetter- und Marken-Icons, die bei Hover lebendig werden.',
      useCases: [
        'Feature-Listen und Preistabellen',
        'Pfeil-Links und Call-to-Action-Buttons',
        'Toolbar-Buttons in Editoren und Dashboards',
        'Karten im Raster einer Landingpage',
        'Links im Footer und zum Kontakt',
      ],
      example:
        'Icons mit Hover-Replay beleben typischerweise Pfeil-Links, Feature-Listen, Toolbar-Buttons und Karten auf Landingpages.',
      description:
        'Spielt bei mouseenter einmal ab, außer bei reduzierter Bewegung. Verlassen stoppt die Animation nicht, und erneutes Betreten während der Wiedergabe startet sie nicht neu.',
      reducedMotion: 'Ist reduzierte Bewegung eingestellt, spielt Hover die Animation nicht ab.',
      plays: 'spielen bei Hover einmal ab',
    },
    'hover-loop': {
      label: 'Hover-Loop',
      title: 'Animierte Icons mit Hover-Loop',
      intro:
        'Diese Icons laufen in Schleife, solange der Mauszeiger auf ihnen liegt, und spielen den aktuellen Durchlauf zu Ende, wenn er sie verlässt. Sie bleiben also nie mitten in der Bewegung stehen. Sie eignen sich für Links, die zu einem längeren Blick einladen, vor allem Social- und Community-Icons.',
      useCases: [
        'Social-Media-Links in Header und Footer',
        'Einladungs-Buttons für Community und Chat',
        'Links zu Portfolio und Profil',
        'Auswahl von Sprache und Region',
      ],
      example:
        'Icons mit Hover-Loop kennzeichnen typischerweise Social-Links, Community-Einladungen, Portfolio-Links und die Sprachauswahl.',
      description:
        'Läuft in Schleife, solange der Mauszeiger darauf liegt, spielt nach mouseleave den aktuellen Durchlauf zu Ende und bleibt bei reduzierter Bewegung statisch.',
      reducedMotion:
        'Ist reduzierte Bewegung eingestellt, bleibt das Icon auch bei Hover statisch.',
      plays: 'laufen in Schleife, solange der Mauszeiger darauf liegt',
    },
  },
};
