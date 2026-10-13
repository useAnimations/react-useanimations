import type { Interaction } from 'react-useanimations';
import type { Messages } from '../en';

/**
 * How icons play, as a verb phrase after a count: the singular form goes with 1 and 5+ icons
 * ("5 ikon se přehrává"), the plural with 2–4 icons and after "které" ("3 ikony se přehrávají").
 */
export const PLAY_FORMS: Record<Interaction, { singular: string; plural: string }> = {
  loop: { singular: 'se přehrává ve smyčce', plural: 'se přehrávají ve smyčce' },
  'click-toggle': {
    singular: 'se kliknutím přepíná mezi dvěma stavy',
    plural: 'se kliknutím přepínají mezi dvěma stavy',
  },
  'click-replay': {
    singular: 'se přehraje při každém kliknutí',
    plural: 'se přehrají při každém kliknutí',
  },
  hover: {
    singular: 'se při najetí myší přehraje a při odjetí přehraje pozpátku',
    plural: 'se při najetí myší přehrají a při odjetí přehrají pozpátku',
  },
  'hover-replay': {
    singular: 'se při najetí myší jednou přehraje',
    plural: 'se při najetí myší jednou přehrají',
  },
  'hover-loop': {
    singular: 'se při najetí myší přehrává ve smyčce',
    plural: 'se při najetí myší přehrávají ve smyčce',
  },
};

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Upozornění',
      title: 'Animované ikony upozornění',
      intro:
        'Výstražné trojúhelníky, kroužky s vykřičníkem a značky stop, které pulzují tak akorát, aby si jich uživatel všiml, ale neblikají. Patří k chybnému poli formuláře, na začátek chybového banneru nebo do sloupce se stavem, kde se statická ikona snadno přehlédne.',
      useCases: [
        'Chyby validace pod poli formuláře',
        'Chybové a varovné bannery v horní části stránky',
        'Neúspěšné řádky v tabulce stavu deploye nebo úloh',
        'Potvrzovací dialogy u nevratných akcí',
        'Stavové stránky během výpadku',
      ],
    },
    Notifications: {
      name: 'Notifikace',
      title: 'Animované ikony zvonků a notifikací',
      intro:
        'Zvonky, které zazvoní při nové aktivitě nebo se přepínají mezi zvonkem a přeškrtnutým zvonkem. Krátké zhoupnutí zvonku přitáhne pozornost k počtu nepřečtených zpráv a přepínací varianty zároveň poslouží jako ztlumení kanálu nebo vlákna.',
      useCases: [
        'Tlačítko centra notifikací v hlavičce aplikace',
        'Odznak nepřečtených zpráv, který zazvoní, když přijde nová zpráva',
        'Ztlumení a zrušení ztlumení kanálu nebo vlákna',
        'Nastavení e-mailových a push notifikací',
        'Tlačítka pro odběr připomínek a upozornění',
      ],
    },
    Navigation: {
      name: 'Navigace',
      title: 'Animované navigační ikony a šipky',
      intro:
        'Hamburger menu, které se promění v tlačítko pro zavření, a šipky, chevrony i rohové šipky, které se při najetí myší posunou svým směrem. Je z nich hned jasné, kam ovládací prvek vede: otevřít panel, vrátit se zpět, rozbalit řádek, odejít z webu.',
      useCases: [
        'Hamburger menu, které se na mobilu změní v tlačítko pro zavření',
        'Tlačítka předchozí a další v karuselech a stránkování',
        'Chevrony v akordeonech a rozbalovacích nabídkách',
        'Odkazy zpět nahoru a výzvy k posunu dolů',
        'Odkazy pro přihlášení a odhlášení',
        'Označení externích odkazů a přepínače postranního panelu',
      ],
    },
    Action: {
      name: 'Akce',
      title: 'Animované ikony akcí',
      intro:
        'Slovesa rozhraní: uložit, smazat, stáhnout, obnovit, lajknout, přidat do záložek, hledat a nastavení. Každá ikona potvrdí kliknutí nebo hover, ke kterému patří: srdce se po lajknutí příspěvku vyplní a koši se před smazáním nadzvedne víko.',
      useCases: [
        'Tlačítka To se mi líbí, oblíbené a záložky na kartách',
        'Tlačítka stáhnout, nahrát a uložit, která akci potvrdí',
        'Zobrazení a skrytí hesla v přihlašovacím formuláři',
        'Tlačítka obnovit a synchronizovat v dashboardech',
        'Tlačítka smazat v tabulkách a seznamech souborů',
        'Vyhledávací pole, které se změní v tlačítko pro vymazání',
      ],
    },
    Content: {
      name: 'Obsah',
      title: 'Animované ikony souborů, složek a uživatelů',
      intro:
        'Soubory, složky, knihy, pošta, přílohy a lidé. Označují věci, se kterými uživatel pracuje, a díky variantám pro přidání, odebrání a zaškrtnutí působí správa seznamů a týmů živě.',
      useCases: [
        'Správci souborů a seznamy dokumentů',
        'Tlačítka pro přílohy a kopírování do schránky',
        'Doručená pošta a archiv v e-mailových klientech',
        'Seznamy členů týmu s akcemi pro přidání a odebrání uživatele',
        'Nabídky sdílení dokumentů a odkazů',
      ],
    },
    Form: {
      name: 'Formuláře',
      title: 'Animované ikony formulářových prvků',
      intro:
        'Zaškrtávací políčko, přepínač (radio button) a vypínač, které animují přechod mezi zaškrtnutým a nezaškrtnutým stavem. Hodí se tam, kde obyčejný input působí ploše, třeba v onboardingových checklistech a v nastavení, a stav je přitom pořád čitelný na první pohled.',
      useCases: [
        'Vypínače funkcí a předvoleb v nastavení',
        'Onboardingové checklisty a seznamy úkolů',
        'Výběr jedné možnosti v dotaznících a při volbě tarifu',
        'Zaškrtávací políčka pro souhlas s podmínkami',
      ],
    },
    Media: {
      name: 'Média',
      title: 'Animované ikony přehrávače médií',
      intro:
        'Přehrát a pozastavit, hlasitost, mikrofon, kamera, přeskočení a náhodné pořadí pro audio a video přehrávače. Přepínací ikony střídají své dva stavy, přehrát a pauza nebo mikrofon a ztlumení, takže tlačítko vždy ukazuje, co kliknutí udělá.',
      useCases: [
        'Tlačítka přehrát a pozastavit v audio a video přehrávačích',
        'Ztlumení a zrušení ztlumení ve videohovorech',
        'Zapnutí a vypnutí kamery v aplikacích pro schůzky',
        'Ovládání playlistu: přeskočit, opakovat a náhodně',
        'Tlačítka pro casting a AirPlay',
        'Ovládání v podcastových a hudebních aplikacích',
      ],
    },
    'Text editing': {
      name: 'Úpravy textu',
      title: 'Animované ikony pro úpravy textu',
      intro:
        'Tučné písmo, kurzíva, podtržení, zarovnání a seznamy pro panely nástrojů editorů formátovaného textu. Krátká animace po kliknutí potvrdí, že se formátování použilo, což pomáhá v editorech, kde je změna samotného textu nenápadná.',
      useCases: [
        'Panely nástrojů editorů formátovaného textu',
        'Pole pro psaní komentářů a zpráv',
        'Editory v CMS a blogovacích systémech',
        'Aplikace pro Markdown a poznámky',
        'Ovládání zarovnání textu v grafických nástrojích',
      ],
    },
    Communication: {
      name: 'Komunikace',
      title: 'Animované ikony komunikace',
      intro:
        'Telefony, chatovací bubliny, tlačítka pro odeslání, hlasová schránka a RSS. Ikony hovorů pokrývají příchozí, odchozí, zmeškané a přesměrované hovory, které výpis hovorů potřebuje, a ikona odeslání zprávu po kliknutí krátce „vypustí“.',
      useCases: [
        'Tlačítko odeslat v chatu a formulářích komentářů',
        'Výpisy příchozích, odchozích a zmeškaných hovorů',
        'Tlačítka pro kontakt a podporu',
        'Spouštěče chatovacích widgetů',
        'Zmínky a pole pro e-mailovou adresu',
      ],
    },
    Devices: {
      name: 'Zařízení',
      title: 'Animované ikony zařízení',
      intro:
        'Telefony, tablety, monitory, hodinky a tiskárny a k nim indikátory připojení: wifi, Bluetooth a baterie. Hodí se do výběru zařízení, přepínačů náhledu responzivního zobrazení a stavu připojení.',
      useCases: [
        'Přepínače náhledu pro mobil, tablet a desktop',
        'Stav připojení wifi a Bluetooth',
        'Indikátory baterie a nabíjení',
        'Seznamy zařízení v nastavení zabezpečení účtu',
        'Tlačítka pro tisk faktur a reportů',
      ],
    },
    Weather: {
      name: 'Počasí',
      title: 'Animované ikony počasí',
      intro:
        'Slunce, měsíc, mraky, déšť, sníh, blesky a vítr pro předpovědi a všechno, co se řídí denní dobou. Slunce a měsíc navíc přirozeně poslouží jako přepínač světlého a tmavého režimu.',
      useCases: [
        'Widgety a karty s předpovědí počasí',
        'Přepínače světlého a tmavého motivu',
        'Časy východu a západu slunce v cestovních aplikacích',
        'Teploty na dashboardech chytré domácnosti',
        'Indikátory energie a napájení',
      ],
    },
    'Maps & location': {
      name: 'Mapy a poloha',
      title: 'Animované ikony map a polohy',
      intro:
        'Špendlíky na mapě, navigační šipky, glóby, terče a kotvy. Špendlík, který při najetí myší dopadne na místo, zvýrazní vyhledávač poboček nebo doručovací adresu a glóbus funguje jako přepínač jazyka nebo regionu.',
      useCases: [
        'Vyhledávače poboček a pole pro adresu',
        'Tlačítka aktuální polohy a navigace',
        'Výběr jazyka a regionu',
        'Doručení a sledování objednávek',
        'Cestovní a rezervační aplikace',
      ],
    },
    Commerce: {
      name: 'E-commerce',
      title: 'Animované ikony pro e-shopy',
      intro:
        'Nákupní košíky, tašky, cenovky, dárky, platební karty a dodávky pro e-shopy. Animace přidání do košíku potvrdí kliknutí i bez toast notifikace a ikony dodávky a balíku dodají stavu objednávky trochu života.',
      useCases: [
        'Tlačítka Přidat do košíku na kartách produktů',
        'Tlačítka košíku a tašky v hlavičce e-shopu',
        'Pokladna a výběr platební metody',
        'Štítky slev, kupónů a výprodejů',
        'Kroky doručení a sledování objednávky',
        'Dárkové karty a možnosti dárkového balení',
      ],
    },
    Charts: {
      name: 'Grafy',
      title: 'Animované ikony grafů',
      intro:
        'Sloupcové grafy, koláčový graf a trendové šipky pro analytiku a reporty. Ikony rostoucího a klesajícího trendu ukážou na první pohled, jestli metrika stoupla, nebo klesla, což se hodí do KPI karet a přehledů změn v číslech.',
      useCases: [
        'KPI karty s rostoucími nebo klesajícími metrikami',
        'Položky navigace pro analytiku a reporty',
        'Prázdné stavy dashboardů',
        'Přehledy financí a portfolia',
      ],
    },
    Development: {
      name: 'Vývoj',
      title: 'Animované ikony pro vývojáře',
      intro:
        'Závorky kódu, terminál, větve v Gitu, commity, merge a pull requesty a k tomu servery a databáze. Vytvořené pro vývojářské nástroje, dokumentace a stavové stránky, kde jsou pojmy z Gitu a infrastruktury součástí rozhraní.',
      useCases: [
        'Stav pull requestů, merge a větví ve vývojářských nástrojích',
        'Tlačítka pro úryvky kódu a embed v dokumentaci',
        'Sekce o terminálu a CLI na landing pages',
        'Stav serverů a databází na stavových stránkách',
        'Nápovědy klávesových zkratek s klávesou Command',
      ],
    },
    'Design & layout': {
      name: 'Design a layout',
      title: 'Animované ikony designu a layoutu',
      intro:
        'Mřížky, sloupce, vrstvy, oříznutí, pero a kurzor pro editory a page buildery. Patří do panelů nástrojů, kde uživatel skládá obsah, přepíná mezi zobrazením mřížky a tabulky nebo vybírá kreslicí nástroj.',
      useCases: [
        'Přepínače zobrazení mřížky, seznamu a tabulky',
        'Panely vrstev v grafických a prezentačních nástrojích',
        'Nástroje oříznutí a výřezu v editorech obrázků',
        'Page buildery a výběr rozvržení',
        'Úchyty pro přesouvání tažením',
      ],
    },
    'Shapes & math': {
      name: 'Tvary a matematika',
      title: 'Animované ikony tvarů a matematických znaků',
      intro:
        'Kruhy, čtverce, trojúhelníky, šestiúhelníky, osmiúhelník a znaky dělení. Použijte je jako nástroje tvarů v kreslicích aplikacích, jako operátory kalkulačky nebo jako neutrální značky v diagramech a krocích onboardingu.',
      useCases: [
        'Nástroje tvarů v aplikacích pro whiteboard a kreslení',
        'Operátory v kalkulačkách a editorech vzorců',
        'Odrážky a značky kroků v diagramech',
        'Rozhraní kvízů a her',
      ],
    },
    Loading: {
      name: 'Načítání',
      title: 'Animované ikony načítání',
      intro:
        'Spinnery a loadery, které běží ve smyčce, dokud něco probíhá. Dejte je do odesílacího tlačítka, dokud čekáte na odpověď požadavku, místo obsahu, který se ještě načítá, nebo na celoobrazovkovou úvodní obrazovku. Když uživatel preferuje omezený pohyb, zůstanou v klidu.',
      useCases: [
        'Odesílací tlačítka čekající na odpověď požadavku',
        'Zástupný obsah, dokud se načítá seznam nebo graf',
        'Indikátory nekonečného scrollování a načtení dalších položek',
        'Celoobrazovkové úvodní obrazovky a přechody mezi stránkami',
        'Průběh nahrávání a zpracování souborů',
      ],
    },
    'Social media': {
      name: 'Sociální sítě',
      title: 'Animované ikony sociálních sítí',
      intro:
        'Ikony značek sociálních sítí a nástrojů, na kterých vývojáři a designéři sdílejí svou práci: X, Instagram, YouTube, Discord, Telegram, Figma a další. Při najetí myší se animují, takže odkazy v patičce a v profilech působí jasně klikatelně.',
      useCases: [
        'Odkazy na sociální sítě v patičce webu',
        'Tlačítka pro sdílení u článků na blogu',
        'Odkazy na profily autorů a členů týmu',
        'Pozvánky do komunit na chatovacích serverech',
        'Přihlášení přes sociální síť nebo vývojářský účet',
      ],
    },
    Other: {
      name: 'Ostatní',
      title: 'Další animované ikony',
      intro:
        'Ikony, které nepatří do žádné větší skupiny: smajlíci pro zpětnou vazbu, šálek kávy, hodiny, křivka pulzu a výzva k posunu dolů. Ikona posunu dolů je v úvodní sekci webu (hero) běžnou nápovědou, že pod ní je další obsah.',
      useCases: [
        'Výzvy k posunu dolů ve spodní části úvodní sekce',
        'Veselé, neutrální a smutné obličeje ve widgetech zpětné vazby',
        'Indikátory aktivity a dostupnosti',
        'Otevírací doba a výběr času',
        'Odkazy Buy Me a Coffee a na podporu projektu',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Smyčka',
      title: 'Animované ikony ve smyčce',
      intro:
        'Tyto ikony se přehrávají nepřetržitě, dokud jsou na obrazovce, takže se hodí pro stavy, které trvají: něco se načítá, platí varování, terminál čeká. Když uživatel preferuje omezený pohyb, zastaví se na prvním snímku a fungují jako běžná statická ikona.',
      useCases: [
        'Spinnery načítání a indikátory průběhu',
        'Aktivní varování a chybové stavy',
        'Indikátory živého vysílání a nahrávání',
        'Výzvy k posunu dolů v úvodních sekcích',
        'Upoutání pozornosti na nové notifikace',
      ],
      example:
        'Ikony ve smyčce obvykle slouží jako spinnery načítání, aktivní upozornění, zvonící zvonek nebo nápověda k posunu dolů.',
      description:
        'Přehrává se nepřetržitě; když uživatel preferuje omezený pohyb, zůstane na statickém prvním snímku.',
      reducedMotion:
        'Když uživatel preferuje omezený pohyb, ikona se automaticky nespustí a zůstane na statickém prvním snímku.',
      plays: PLAY_FORMS.loop.plural,
    },
    'click-toggle': {
      label: 'Přepínání kliknutím',
      title: 'Animované ikony přepínané kliknutím',
      intro:
        'Každé kliknutí ikonu animuje do druhého stavu, ve kterém zůstane, takže tvoří vizuální polovinu ovládacího prvku zapnuto/vypnuto. Ikona vždy ukazuje aktuální stav: doplňte k ní aria-pressed nebo atribut checked a tlačítko bude srozumitelné samo o sobě.',
      useCases: [
        'Tlačítka pro ztlumení a zrušení ztlumení',
        'Pole hesla se zobrazením a skrytím',
        'Hamburger menu a tlačítka pro zavření',
        'Ovládání přehrát a pozastavit',
        'Přepínače To se mi líbí, hvězdičky a záložek',
        'Zaškrtávací políčka, přepínače (radio) a vypínače',
      ],
      example:
        'Ikony přepínané kliknutím obvykle ovládají ztlumení, zobrazení a skrytí hesla, otevření a zavření menu, přehrávání a pauzu nebo tlačítka To se mi líbí.',
      description:
        'Kliknutím se přepíná mezi dvěma stavy; když uživatel preferuje omezený pohyb, přepne se okamžitě.',
      reducedMotion:
        'Když uživatel preferuje omezený pohyb, kliknutí přepne do druhého stavu okamžitě, bez animace mezi nimi.',
      plays: PLAY_FORMS['click-toggle'].plural,
    },
    'click-replay': {
      label: 'Přehrání kliknutím',
      title: 'Animované ikony na kliknutí',
      intro:
        'Tyto ikony se po každém kliknutí jednou přehrají od začátku a nenápadně tak potvrdí, že akce proběhla. Hodí se pro jednorázové akce, po kterých nezůstává žádný stav: odeslat, uložit, obnovit, stáhnout, vytisknout nebo smazat.',
      useCases: [
        'Tlačítka odeslat v chatu a formulářích komentářů',
        'Tlačítka uložit, stáhnout a nahrát',
        'Tlačítka obnovit a otočit',
        'Tlačítka Přidat do košíku',
        'Tlačítka formátování textu v editorech',
      ],
      example:
        'Ikony na kliknutí obvykle potvrzují odeslání, uložení, obnovení, stažení, přidání do košíku a formátování textu.',
      description:
        'Při každém kliknutí se jednou přehraje od začátku, pokud uživatel nepreferuje omezený pohyb.',
      reducedMotion:
        'Když uživatel preferuje omezený pohyb, kliknutí se k vašemu handleru dostanou dál, ale animace se nepřehraje.',
      plays: PLAY_FORMS['click-replay'].plural,
    },
    hover: {
      label: 'Hover',
      title: 'Animované ikony reagující na hover',
      intro:
        'Tyto ikony se při najetí myší přehrají dopředu a při odjetí pozpátku, takže pohyb sleduje kurzor a nikdy neskončí v půlce. Hodí se pro položky navigace a tlačítka, která naznačují, co otevírají: koši se nadzvedne víko, ozubené kolo nastavení se pootočí, složka se otevře.',
      useCases: [
        'Položky postranního panelu a navigačního menu',
        'Tlačítka smazat, která nadzvednou víko ještě před kliknutím',
        'Odkazy na nastavení a profil',
        'Ovládání přiblížení a oddálení',
        'Odkazy na sociální sítě v patičce',
      ],
      example:
        'Ikony reagující na hover obvykle označují položky navigace, tlačítka smazat, nastavení, ovládání přiblížení a odkazy na sociální sítě.',
      description:
        'Při najetí myší (mouseenter) se přehraje dopředu, při odjetí (mouseleave) pozpátku.',
      reducedMotion: 'Když uživatel preferuje omezený pohyb, najetí myší animaci nespustí.',
      plays: PLAY_FORMS.hover.plural,
    },
    'hover-replay': {
      label: 'Přehrání při hoveru',
      title: 'Animované ikony s přehráním při hoveru',
      intro:
        'Tyto ikony se při najetí myší jednou přehrají a doběhnou samy, takže rychlé přejetí přes panel nástrojů nezpůsobí roztěkaný pohyb. Takhle funguje většina sady: šipky, soubory, zařízení, počasí a ikony značek, které při hoveru ožijí.',
      useCases: [
        'Seznamy funkcí a ceníky',
        'Odkazy se šipkou a tlačítka s výzvou k akci',
        'Tlačítka panelů nástrojů v editorech a dashboardech',
        'Karty v mřížce na landing page',
        'Odkazy v patičce a kontakty',
      ],
      example:
        'Ikony s přehráním při hoveru obvykle oživí odkazy se šipkou, seznamy funkcí, tlačítka panelů nástrojů a karty na landing page.',
      description:
        'Při najetí myší (mouseenter) se jednou přehraje, pokud uživatel nepreferuje omezený pohyb. Odjetí myši ji nezastaví a nové najetí během přehrávání ji nespustí znovu.',
      reducedMotion: 'Když uživatel preferuje omezený pohyb, najetí myší animaci nespustí.',
      plays: PLAY_FORMS['hover-replay'].plural,
    },
    'hover-loop': {
      label: 'Smyčka při hoveru',
      title: 'Animované ikony se smyčkou při hoveru',
      intro:
        'Tyto ikony běží ve smyčce, dokud na nich zůstává kurzor, a po jeho odjetí dokončí rozběhnutý cyklus, takže se nikdy nezastaví uprostřed pohybu. Hodí se pro odkazy, které zvou k delšímu pohledu, hlavně ikony sociálních sítí a komunit.',
      useCases: [
        'Odkazy na sociální sítě v hlavičce a patičce',
        'Pozvánky do komunit a chatů',
        'Odkazy na portfolio a profil',
        'Výběr jazyka a regionu',
      ],
      example:
        'Ikony se smyčkou při hoveru obvykle označují odkazy na sociální sítě, pozvánky do komunit, odkazy na portfolio a výběr jazyka.',
      description:
        'Při hoveru běží ve smyčce, po odjetí myši (mouseleave) dokončí aktuální cyklus a při preferenci omezeného pohybu zůstane statická.',
      reducedMotion: 'Když uživatel preferuje omezený pohyb, ikona při hoveru zůstane statická.',
      plays: PLAY_FORMS['hover-loop'].plural,
    },
  },
};
