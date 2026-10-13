import { listIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { freeAnimated, icons, iconsOf } from './hubs';

const plural = pluralIn('ru');
const animated = (n: number) =>
  plural(n, {
    one: 'анимированная иконка',
    few: 'анимированные иконки',
    many: 'анимированных иконок',
    other: 'анимированной иконки',
  });
const categoriesCount = (n: number) =>
  plural(n, { one: 'категория', few: 'категории', many: 'категорий', other: 'категории' });
/** «в 20 категориях», «в 21 категории». */
const inCategories = (n: number) =>
  plural(n, { one: 'категории', few: 'категориях', many: 'категориях', other: 'категории' });
/** Genitive: «для 300 анимированных иконок». */
const ofAnimated = (n: number) =>
  plural(n, {
    one: 'анимированной иконки',
    few: 'анимированных иконок',
    many: 'анимированных иконок',
    other: 'анимированной иконки',
  });
const microInteractions = (n: number) =>
  plural(n, {
    one: 'микровзаимодействие',
    few: 'микровзаимодействия',
    many: 'микровзаимодействий',
    other: 'микровзаимодействия',
  });
const interactionsCount = (n: number) =>
  plural(n, {
    one: 'взаимодействие',
    few: 'взаимодействия',
    many: 'взаимодействий',
    other: 'взаимодействия',
  });
const components = (n: number) =>
  plural(n, { one: 'компонент', few: 'компонента', many: 'компонентов', other: 'компонента' });

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [`Все ${animated(count)} по категориям`, `Все ${animated(count)}`],
    descriptions: (count: number, categories: number) => [
      `Все иконки useAnimations на одной странице: ${freeAnimated(count)} в ${inCategories(categories)} для React, shadcn/ui, Lottie JSON и SVG. Лицензия MIT.`,
    ],
    title: 'Все анимированные иконки',
    badge: (count: number) => `${icons(count)} · лицензия MIT`,
    introHtml: (browser: string) =>
      `Все иконки набора, сгруппированные по категориям. Откройте любую, чтобы увидеть живое превью, код для React и shadcn/ui и скачать Lottie JSON, SVG или ZIP. Чтобы искать по ключевым словам и пробовать анимации прямо на месте, используйте ${link(browser, 'поиск по иконкам')}.`,
    categoriesNav: 'Категории',
    byInteraction: 'По взаимодействию:',
    categoryLink: (count: number, name: string) => `${icons(count)} в категории «${name}» →`,
  },

  categories: {
    titles: (categories: number) => [
      `Категории анимированных иконок: ${categoriesCount(categories)}`,
      'Категории анимированных иконок',
    ],
    descriptions: (count: number, categories: number) => [
      `${freeAnimated(count)} в ${inCategories(categories)}: навигация, действия, медиа, загрузка, соцсети и другие. Для React, shadcn/ui и Lottie.`,
    ],
    title: 'Категории анимированных иконок',
    badge: (count: number, categories: number) =>
      `${icons(count)} · ${categoriesCount(categories)}`,
    introHtml: (interactions: string) =>
      `Каждая иконка useAnimations относится к одной категории — от стрелок навигации и кнопок медиаплеера до лоадеров и логотипов соцсетей. Откройте категорию, чтобы увидеть все её иконки, где их использовать и код для подключения, или выберите иконки по ${link(interactions, 'взаимодействию')}.`,
    iconCount: icons,
  },

  interactions: {
    titles: [
      'Микровзаимодействия: иконки с hover, кликом и циклом',
      'Микровзаимодействия для анимированных иконок',
    ],
    descriptions: (count: number, interactions: number) => [
      `${microInteractions(interactions)} для ${ofAnimated(count)}: цикл, переключение и повтор по клику, наведение, повтор и цикл при наведении. С учётом уменьшения движения.`,
      `${microInteractions(interactions)} для ${iconsOf(count)}: цикл, переключение и повтор по клику, наведение, повтор и цикл при наведении. С учётом уменьшения движения.`,
    ],
    title: 'Взаимодействия анимированных иконок',
    badge: (interactions: number, count: number) =>
      `${interactionsCount(interactions)} · ${icons(count)}`,
    introHtml: `Каждая иконка поставляется с микровзаимодействием, для которого её нарисовали: она крутится в цикле, переключается или повторяется по клику либо проигрывается при наведении. React-компонент всё это подключает и учитывает уменьшение движения, а проп <code class="font-mono text-base text-fg">interaction</code> переключает любую иконку на другое взаимодействие.`,
    iconCount: icons,
    chooseTitle: 'Как выбрать взаимодействие',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Длящееся состояние')}, например загрузка или активное предупреждение: ${link(href, 'цикл')}.`,
      'click-toggle': (href: string) =>
        `${strong('Элемент «вкл/выкл»')}, например звук, меню или показ пароля: ${link(href, 'переключение по клику')}, с ${code('active')} для контролируемого состояния.`,
      'click-replay': (href: string) =>
        `${strong('Разовое действие')}, например отправка, сохранение или обновление: ${link(href, 'повтор по клику')}.`,
      hover: (href: string) =>
        `${strong('Намёк на то, что откроет ссылка')}: ${link(href, 'наведение')}, анимация откатывается назад, когда курсор уходит.`,
      'hover-replay': (href: string) =>
        `${strong('Панели инструментов и списки, по которым быстро проводят курсором')}: ${link(
          href,
          'повтор при наведении'
        )}, анимация доигрывает сама.`,
      'hover-loop': (href: string) =>
        `${strong('Ссылки, на которых хочется задержаться')}, например иконки соцсетей: ${link(href, 'цикл при наведении')}.`,
    },
    motionTitle: 'Уменьшение движения',
    motionHtml: `React-компонент учитывает ${code('prefers-reduced-motion')} и реагирует на изменение настройки. Касания сенсорного экрана никогда не запускают hover-анимации.`,
    reducedMotion: {
      loop: 'иконка не запускается автоматически и остаётся на статичном первом кадре.',
      'click-toggle':
        'клик сразу переключает иконку в другое состояние, без промежуточной анимации.',
      'click-replay':
        'клики по-прежнему доходят до вашего обработчика, но анимация не проигрывается.',
      hover: 'наведение не запускает анимацию.',
      'hover-replay': 'наведение не запускает анимацию.',
      'hover-loop': 'иконка при наведении остаётся статичной.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Бесплатные Lottie-иконки: ${animated(count)} в JSON`,
      'Бесплатные Lottie-иконки',
    ],
    descriptions: (count: number) => [
      `${plural(count, { one: 'бесплатная Lottie-иконка', few: 'бесплатные Lottie-иконки', many: 'бесплатных Lottie-иконок', other: 'бесплатной Lottie-иконки' })} в обычном Lottie JSON, лицензия MIT. Готовый код для lottie-web, dotLottie, React, React Native, iOS, Android и Flutter.`,
    ],
    title: 'Бесплатные Lottie-иконки',
    crumb: 'Lottie-иконки',
    datasetName: 'Каталог иконок useAnimations',
    datasetDescription: (count: number) =>
      `Метаданные и URL файлов: ${animated(count)} в формате Lottie с id, названием, категорией, ключевыми словами, взаимодействием, размером и длительностью.`,
    badge: (count: number) => `${icons(count)} · Lottie JSON · лицензия MIT`,
    intro:
      'Каждая иконка useAnimations — это стандартная анимация Lottie JSON, поэтому её воспроизводит любой Lottie-плеер: lottie-web в браузере, lottie-ios, lottie-android, Flutter и React Native. Файлы бесплатны по лицензии MIT, без регистрации, и отдаются по постоянным URL с включённым CORS, так что их можно загружать напрямую или скачать в свой проект.',
    popular: 'Популярные Lottie-иконки',
    allIcons: (count: number) => `Все ${icons(count)} →`,
    filesTitle: 'Файлы и URL',
    filesIntroHtml: `У каждой иконки есть страница ${code('/icons/&lt;id&gt;')} с превью и файлами для скачивания (на английском). Сами файлы:`,
    files: {
      json: 'анимация Lottie JSON',
      zip: 'JSON и статичные SVG',
      svg: 'статичный SVG каждого состояния',
      catalog: 'каталог всех иконок',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} содержит все иконки с id, названием, категорией, ключевыми словами, взаимодействием, размером, длительностью и URL файлов — так иконки легко подбирать по ключевому слову в скрипте или доверить выбор ИИ-агенту. Медианный размер файла Lottie — ${median} КБ.`,
    players: {
      web: {
        title: 'Веб: lottie-web',
        text: 'Эталонный плеер от Airbnb. Подключите его с CDN, укажите URL иконки и выберите SVG-рендерер: так иконка остаётся чёткой, а цвет можно менять через CSS. Используйте полную сборку (lottie.min.js): облегчённая не поддерживает выражения.',
        cssLabel: 'Иконка в цвет текста (SVG-рендерер)',
      },
      'web-interactions': {
        title: 'Веб: взаимодействия при наведении и по клику',
        text: 'lottie-web умеет запускать и останавливать анимацию, а взаимодействия придётся писать самим. Ниже — переключение по клику для иконки меню с поддержкой уменьшения движения; остальные взаимодействия устроены так же, а React-компонент ниже делает всё это за вас.',
      },
      dotlottie: {
        title: 'Веб: веб-компонент dotLottie',
        text: 'Плеер от LottieFiles рендерит на canvas с помощью движка на WebAssembly и воспроизводит как обычный Lottie JSON, так и файлы .lottie. На canvas сохраняются цвета из файла, поэтому иконки останутся чёрными, если не перекрасить сам JSON.',
        jsLabel: 'Или JavaScript API: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Lottie-плеер устанавливать не нужно: у пакета есть собственный плеер на 8 КБ, который проигрывает взаимодействие каждой иконки, берёт цвет текста и учитывает уменьшение движения. Каждая иконка — отдельный модуль, поэтому в сборку попадают только импортированные.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Подключите JSON через require(), чтобы он работал офлайн, или загружайте его по URL.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Добавьте пакет https://github.com/airbnb/lottie-spm.git через Swift Package Manager, затем положите JSON в бандл приложения или загружайте его по URL.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Добавьте com.airbnb.android:lottie-compose (или com.airbnb.android:lottie для View). Для офлайн-работы положите JSON в res/raw и используйте LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'Пакет lottie — плеер на чистом Dart для Android, iOS, веба и десктопа.',
      },
    },
    expressionsTitle: 'Иконки с выражениями',
    expressionsHtml: (count: number) =>
      `${plural(count, { one: 'иконка использует', few: 'иконки используют', many: 'иконок используют', other: 'иконки используют' })} выражения After Effects (${code('loopOut')} или ${code('wiggle')}). В браузере воспроизводите их полной сборкой lottie-web, а не ${code('lottie_light')}. Нативные плееры выражения не вычисляют, поэтому проверьте такие иконки на iOS, Android и Flutter или выберите другие; react-useanimations проигрывает их так, как задумано.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Можно ли бесплатно использовать эти Lottie-иконки в коммерческих проектах?',
        answer: `Да. Все ${plural(f.count, { one: 'Lottie-иконка распространяется', few: 'Lottie-иконки распространяются', many: 'Lottie-иконок распространяются', other: 'Lottie-иконки распространяются' })} по лицензии MIT: их можно использовать, изменять и распространять в личных и коммерческих проектах, без указания авторства и без регистрации для скачивания.`,
      },
      {
        question: 'В каком формате файлы Lottie?',
        answer: `Стандартный Lottie JSON (формат Bodymovin) только со слоями фигур: без изображений, шрифтов и внешних ресурсов. Каждая иконка нарисована на артборде 24 или 32 px, масштабируется до любого размера и весит от ${f.minSize} до ${f.maxSize} КБ, медиана — ${f.medianSize} КБ.`,
      },
      {
        question: 'Нужен ли lottie-web, чтобы использовать иконки в React?',
        answer:
          'Нет. У react-useanimations есть собственный плеер на 8 КБ без зависимостей, так что вы устанавливаете один пакет и импортируете нужные иконки. lottie-web нужен только вне React — на обычных веб-страницах или в других фреймворках.',
      },
      {
        question: 'Каким иконкам нужна полная сборка lottie-web?',
        answer: `${plural(f.expressions.length, { one: 'иконка использует', few: 'иконки используют', many: 'иконок используют', other: 'иконки используют' })} выражения After Effects (loopOut или wiggle): ${listIn('ru')(f.expressions)}. В браузере им нужна полная сборка lottie-web, lottie_light выражения игнорирует. Нативные плееры (lottie-ios, lottie-android, lottie для Flutter) выражения тоже не вычисляют, поэтому там эти иконки могут двигаться иначе.`,
      },
      {
        question: 'Можно ли изменить цвет Lottie-иконки?',
        answer:
          'В браузере SVG-рендерер lottie-web записывает цвета в атрибуты, поэтому иконку перекрашивает CSS-правило для path. В нативных плеерах есть API динамических свойств: ColorValueProvider на iOS, LottieProperty.COLOR и STROKE_COLOR на Android и ValueDelegate.color во Flutter.',
      },
    ],
    byCategory: 'Lottie-иконки по категориям',
  },

  shadcn: {
    titles: (count: number) => [
      `Анимированные иконки для shadcn/ui: ${components(count)}`,
      'Анимированные иконки для shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${animated(count)} для shadcn/ui: любая добавляется одной командой shadcn CLI. Микровзаимодействия при наведении, по клику и в цикле, лицензия MIT, без lottie-web.`,
      `${animated(count)} для shadcn/ui: любая добавляется одной командой shadcn CLI. Анимация при наведении, по клику и в цикле, MIT, без lottie-web.`,
    ],
    title: 'Анимированные иконки для shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Популярные анимированные иконки для shadcn/ui',
    badge: (count: number) => `${components(count)} · реестр shadcn · лицензия MIT`,
    intro:
      'Все иконки useAnimations есть в реестре shadcn. Одна команда CLI добавляет в проект типизированный React-компонент со взаимодействием, для которого иконку нарисовали (при наведении, по клику или в цикле), поддержкой уменьшения движения и цветами, которые следуют вашей теме. Код попадает в ваш репозиторий, как и любой другой компонент shadcn/ui.',
    addTitle: 'Добавьте иконку',
    addIntro: 'Запустите shadcn CLI с URL иконки в реестре:',
    namingHtml: `Компонент называется ${code('Animated')} + id иконки в PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) и попадает в ${code('components/animations/&lt;id&gt;.tsx')}. CLI также добавляет общую обёртку ${code('components/use-animation.tsx')} и устанавливает ${code('react-useanimations')} со своим плеером — lottie-web не нужен.`,
    namespaceTitle: 'Короткие имена через неймспейс реестра',
    namespaceHtml: `Один раз добавьте реестр в ${code('components.json')}, и иконки можно будет добавлять по имени, по несколько сразу:`,
    registryHtml: (registry: string) =>
      `Индекс реестра ${link(registry, '/r/registry.json')} содержит все элементы с названием, категорией и взаимодействием.`,
    usageTitle: 'Использование в shadcn Button',
    usageHtml: `Компоненты принимают те же пропсы, что и ${code('UseAnimations')}. Для переключателя вроде иконки меню передайте ${code('active')} и храните состояние в кнопке — иконка анимируется при каждом его изменении:`,
    colorHtml: (docs: string) =>
      `Иконки берут цвет текста, поэтому их перекрашивают ${code('text-primary')} или ${code('text-muted-foreground')}, а для тёмной темы ничего дополнительно делать не нужно. Остальные пропсы и приёмы — в ${link(docs, 'документации')}.`,
    codeText: { closeMenu: 'Закрыть меню', openMenu: 'Открыть меню' },
    popular: 'Популярные иконки для shadcn/ui',
    allIcons: (count: number) => `Все ${icons(count)} →`,
    popularNote: 'Команда shadcn есть на странице каждой иконки.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Анимированные иконки для shadcn/ui бесплатны?',
        answer: `Да. Все ${icons(f.count)} и код компонентов распространяются по лицензии MIT — для личных и коммерческих проектов. Для реестра не нужны ни аккаунт, ни API-ключ.`,
      },
      {
        question: 'Что shadcn CLI добавляет в проект?',
        answer: `Компонент иконки в components/animations/<id>.tsx, общую обёртку плеера UseAnimation в components/use-animation.tsx (один раз, как зависимость из реестра) и react-useanimations@^${f.version} из npm. lottie-web не нужен: у пакета собственный плеер на 8 КБ.`,
      },
      {
        question: 'Работают ли компоненты с серверными компонентами Next.js?',
        answer:
          'Да. Компоненты помечены "use client" и рисуют анимацию только в браузере, поэтому их можно рендерить из серверных компонентов и страниц без динамического импорта и ssr: false.',
      },
      {
        question: 'Можно ли изменить внешний вид и анимацию иконок?',
        answer:
          'Код ваш и лежит в вашем репозитории. Компоненты принимают пропсы UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop и speed. Иконки берут цвет текста, поэтому их перекрашивают Tailwind-классы вроде text-primary или text-muted-foreground.',
      },
    ],
    byCategory: 'Смотреть по категориям',
  },
};
