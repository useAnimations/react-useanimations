import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Цикл',
      'click-toggle': 'Клик',
      'click-replay': 'Клик',
      hover: 'Наведение',
      'hover-loop': 'Наведение',
      'hover-replay': 'Наведение',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Проигрывается сама',
      'click-toggle': 'Кликните, чтобы переключить',
      'click-replay': 'Кликните, чтобы повторить',
      hover: 'Наведите, чтобы запустить, уведите — чтобы вернуть назад',
      'hover-loop': 'Наведите, чтобы запустить цикл',
      'hover-replay': 'Наведите, чтобы запустить',
    },
    preview: 'Превью {title}',
    colors: 'Цвет превью',
    color: 'Цвет {color}',
    textColor: 'Цвет текста',
    interaction: 'Взаимодействие',
    duration: 'Длительность',
    seconds: '{seconds} с',
    import: 'Импорт',
    close: 'Закрыть',
    code: 'Код',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Файлы' },
    copy: 'Копировать',
    download: 'Скачать',
    iconPage: 'Страница иконки →',
  },
  interactionDemo: {
    click: 'Кликните по карточке',
    loop: 'Проигрывается сама',
    hover: 'Наведите на карточку',
  },
  mobileMenu: {
    menu: 'Меню',
    nav: 'Основная навигация',
  },
  themeToggle: {
    toLight: 'Включить светлую тему',
    toDark: 'Включить тёмную тему',
  },
};
