import type { Interaction } from 'react-useanimations';
import { formIn, listIn, pluralIn } from '../../format';
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { CATEGORY_TOPIC, PLAYS } from './taxonomy';

const list = listIn('ru');
const plural = pluralIn('ru');
const form = formIn('ru');

export const icons = (n: number) =>
  plural(n, { one: 'иконка', few: 'иконки', many: 'иконок', other: 'иконки' });
/** Genitive after «из», «среди»: «из 21 иконки», «из 12 иконок». */
export const iconsOf = (n: number) =>
  plural(n, { one: 'иконки', few: 'иконок', many: 'иконок', other: 'иконки' });
export const freeAnimated = (n: number) =>
  plural(n, {
    one: 'бесплатная анимированная иконка',
    few: 'бесплатные анимированные иконки',
    many: 'бесплатных анимированных иконок',
    other: 'бесплатной анимированной иконки',
  });
const plays = (interaction: Interaction, n: number) =>
  form(n, { one: PLAYS[interaction].one, other: PLAYS[interaction].other });
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);
const topic = (f: CategoryFacts) => CATEGORY_TOPIC[f.name] ?? `категории «${f.name}»`;

/** Up to `max` titles, then «и ещё N». */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} и ещё ${items.length - max}`
    : list(items);

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

/** The formats every icon comes in, ending with the SVG note. */
const formats = (f: CategoryFacts) => {
  const base = ['React-компонента', 'компонента shadcn/ui', 'анимации Lottie JSON'];
  if (f.withSvg === f.count) return `в виде ${list([...base, 'статичных SVG'])}`;
  const svg = f.withSvg ? `, а ${f.withSvg} из них есть ещё и в виде статичных SVG` : '';
  return `в виде ${list(base)}${svg}`;
};

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} для React и Lottie`,
      `${f.title} для React`,
      `Бесплатные анимированные иконки ${topic(f)}`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const head = `${freeAnimated(f.count)} ${topic(f)}`;
      const examples = list(f.titles.slice(0, 3));
      return [
        `${head}, среди них ${examples}. Микроанимации при наведении, по клику и в цикле для React, shadcn/ui и Lottie JSON, лицензия MIT.`,
        `${head}, среди них ${examples}. Для React, shadcn/ui и Lottie JSON, лицензия MIT.`,
        `${head}, среди них ${examples}. Для React, shadcn/ui и Lottie, MIT.`,
        `${head} для React, shadcn/ui и Lottie JSON, лицензия MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const how =
        f.groups.length > 1
          ? `Из ${iconsOf(f.count)} ${list(f.groups.map((g) => `${g.count} ${plays(g.interaction, g.count)}`))}.`
          : f.count === 1
            ? `Единственная иконка категории ${plays(f.groups[0].interaction, 1)}.`
            : `Все ${icons(f.count)} ${plays(f.groups[0].interaction, f.count)}.`;
      const each = f.count === 1 ? 'Она доступна' : 'Каждая доступна';
      return `${how} ${each} ${formats(f)}. Всё бесплатно, в том числе для коммерческих проектов, по лицензии MIT.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      const svg = f.withSvg
        ? '; статичные SVG лежат на странице каждой иконки (страницы иконок — на английском)'
        : '';
      const expressions = n
        ? n === 1
          ? `${f.expressions[0]} использует выражения After Effects, поэтому в браузере ей нужна полная сборка lottie-web.`
          : `${titles(f.expressions, 6)} используют выражения After Effects, поэтому в браузере им нужна полная сборка lottie-web.`
        : 'Ни одна иконка этой категории не использует выражения, так что достаточно облегчённой сборки lottie-web.';
      return [
        {
          question: `Какие ${name} есть в наборе?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Все они бесплатны для личных и коммерческих проектов по лицензии MIT, указывать авторство не нужно.`,
        },
        {
          question: `Как использовать эти ${name} в React?`,
          answer: `Установите react-useanimations, добавьте ${ex.importLine} и отрендерите <UseAnimations animation={${ex.exportName}} size={32} />. Иконка проигрывает своё взаимодействие («${ex.interactionLabel}») и берёт цвет текста. Если у вас shadcn/ui, вместо этого выполните ${ex.shadcnCommand}.`,
        },
        {
          question: `Можно ли использовать эти ${name} без React?`,
          answer: `Да. Каждая иконка — это файл Lottie JSON по адресу ${f.site}/icons/<id>.json (например, ${f.site}/icons/${ex.id}.json), который воспроизводят lottie-web, lottie-ios, lottie-android и пакет lottie для Flutter${svg}. ${expressions}`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · лицензия MIT`,
    allIcons: (name: string) => `Все иконки категории «${name}»`,
    whereToUse: 'Где их использовать',
    byInteraction: 'По взаимодействию',
    addOne: 'Добавьте иконку в приложение',
    addOneHtml: (label: string, name: string) =>
      `В React установите ${code('react-useanimations')} и импортируйте иконку: она сама проигрывает своё взаимодействие («${label}»). Все иконки этой категории подключаются так же — замените ${code(name)} на имя со страницы нужной иконки.`,
    shadcnHtml: (href: string) =>
      `С ${link(href, 'shadcn/ui')} готовый компонент добавляется через CLI:`,
    noReactHtml: (href: string) =>
      `Не используете React? Каждая иконка — это файл Lottie JSON по адресу ${code('/icons/&lt;id&gt;.json')}; плееры для веба, iOS, Android и Flutter описаны на странице ${link(href, 'Lottie-иконки')}.`,
    more: 'Другие категории',
    allIconsButton: 'Все иконки',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} для React и Lottie`,
      `${f.title} для React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const which = form(f.count, { one: 'которая', other: 'которые' });
      const head = `${freeAnimated(f.count)}, ${which} ${plays(f.interaction, f.count)}`;
      return [
        `${head}, например ${list(f.titles.slice(0, 3))}. Для React, shadcn/ui и Lottie JSON, MIT.`,
        `${head}. Для React, shadcn/ui и Lottie JSON, лицензия MIT.`,
        `${head}. Для React, shadcn/ui и Lottie, MIT.`,
      ];
    },
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Какие иконки используют взаимодействие «${f.label}»?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Что происходит, если у пользователя включено уменьшение движения?',
        answer: `${f.reducedMotion} React-компонент читает prefers-reduced-motion и реагирует на изменение настройки, так что писать для этого код не нужно.`,
      },
      {
        question: 'Как изменить взаимодействие иконки?',
        answer: `Каждая иконка проигрывает то взаимодействие, для которого её нарисовали. Передайте interaction="${f.interaction}", чтобы так же вела себя любая другая иконка, или другое значение ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay'), чтобы сменить его. Воспроизведение настраивается пропсами autoplay, loop и speed.${
          f.interaction === 'click-toggle'
            ? ' Чтобы управлять состоянием самостоятельно, передайте active={isOn} и меняйте его в onClick: тогда клики сами по себе иконку больше не переключают.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Все иконки со взаимодействием «${label}»`,
    behaviour: 'Как это работает',
    hoverNote:
      ' Касание сенсорного экрана hover-анимацию не запускает, а фокус с клавиатуры запускает, если иконка находится внутри фокусируемого элемента.',
    handled: 'Всё это берёт на себя React-компонент — вам остаётся только выбрать иконку.',
    whereToUse: 'Где использовать',
    byCategory: 'По категориям',
    useInReact: 'Использование в React',
    overrideHtml: `Перечисленные здесь иконки проигрывают это взаимодействие по умолчанию. Его можно задать и любой другой иконке — через проп ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} по умолчанию использует '${interaction}'`,
    extra: {
      loop: 'Зацикленные иконки запускаются сами и встают на паузу, когда уходят за пределы экрана. Замедлите анимацию через speed, проиграйте её один раз с loop={false} или оставьте неподвижной с autoplay={false}:',
      'click-toggle':
        'По умолчанию иконка переключается от кликов. Чтобы синхронизировать её с вашим состоянием, передайте active: иконка анимируется при каждом изменении active, а клики её больше не переключают.',
      'click-replay':
        'Поместите иконку в настоящую кнопку через render-проп, чтобы на неё можно было перевести фокус и чтобы скринридеры её объявляли. Ваш onClick выполняется первым; вызовите event.preventDefault(), чтобы пропустить анимацию.',
      hover:
        'Оберните иконку в ссылку или кнопку через render-проп: тогда анимация проигрывается и при фокусе с клавиатуры, а касания сенсорного экрана её не запускают.',
      'hover-replay':
        'Пусть на наведение реагирует вся карточка или ссылка, а не только иконка: с render-пропом события вешаются на ваш элемент, и фокус с клавиатуры тоже запускает анимацию.',
      'hover-loop':
        'Используйте render-проп, чтобы цикл запускала вся ссылка, в том числе при фокусе с клавиатуры. Темп меняется через speed:',
    },
    codeText: {
      halfSpeed: 'вдвое медленнее',
      playsOnce: 'проигрывается один раз и останавливается',
      staticFrame: 'статичный первый кадр',
      endState: 'true показывает конечное состояние',
      closeMenu: 'Закрыть меню',
      openMenu: 'Открыть меню',
      download: 'Скачать',
      archive: 'В архив',
      weeklyGrowth: 'Рост за неделю',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Все пропсы описаны в ${link(docs, 'документации')}. Вне React иконки — это файлы Lottie JSON; на странице ${link(lottie, 'Lottie-иконки')} показано, как воссоздать взаимодействия с помощью lottie-web.`,
    other: 'Другие взаимодействия',
    browseByCategory: 'Смотреть по категориям',
  },
};
