// 类别页和交互方式页（/categories/<slug>、/interactions/<slug>）：根据事实数据生成的句子和页面文字。
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

/** 中文列举（Intl）；与英文名称相邻的“和”两侧加空格。 */
const list = (items: string[]) =>
  listIn('zh-Hans')(items)
    .replace(/(?<=[\x21-\x7e])和/g, ' 和')
    .replace(/和(?=[\x21-\x7e])/g, '和 ');
const count = (n: number) => pluralIn('zh-Hans')(n, { other: '个图标' });

/** 最多列出 max 个名称，其余写成“等另外 N 个”。 */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join('、')} 等另外 ${items.length - max} 个`
    : list(items);

/** 全部图标都有静态 SVG 时返回“，并附带静态 SVG”，否则说明有多少个提供。 */
const svgNote = (f: CategoryFacts) => {
  if (f.withSvg === f.count) return '，并附带静态 SVG';
  return f.withSvg ? `，其中 ${f.withSvg} 个还提供静态 SVG` : '';
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: count,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title}：React 与 Lottie`,
      `React ${f.title}`,
      `免费${f.title}`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} 个免费${f.title}，包括 ${examples}。内置悬停、点击和循环微动画，支持 React、shadcn/ui 和 Lottie JSON，MIT 许可。`,
        `${f.count} 个免费${f.title}，包括 ${examples}。支持 React、shadcn/ui 和 Lottie JSON，MIT 许可。`,
        `${f.count} 个免费${f.title}，包括 ${examples}。支持 React、shadcn/ui 和 Lottie。`,
        `${f.count} 个免费${f.title}，支持 React、shadcn/ui 和 Lottie JSON，MIT 许可。`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays =
        f.groups.length === 1
          ? `全部 ${f.count} 个图标都${f.groups[0].plays}`
          : `这 ${f.count} 个图标中，${f.groups.map((g) => `${g.count} 个${g.plays}`).join('，')}`;
      return `${plays}。每个图标都提供 React 组件、shadcn/ui 组件和 Lottie JSON 动画${svgNote(f)}，可依据 MIT 许可证免费用于商业项目。`;
    },
    faq: (f: CategoryFacts): Faq => {
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `包含哪些${f.title}？`,
          answer: `共 ${count(f.count)}：${titles(f.titles)}。全部可依据 MIT 许可证免费用于个人和商业项目，无需署名。`,
        },
        {
          question: `如何在 React 中使用这些${f.title}？`,
          answer: `安装 react-useanimations，添加 ${ex.importLine}，然后渲染 <UseAnimations animation={${ex.exportName}} size={32} />。图标会播放它的“${ex.interactionLabel}”交互，并跟随文字颜色。使用 shadcn/ui 时，改为运行 ${ex.shadcnCommand}。`,
        },
        {
          question: `不用 React 也能使用这些${f.title}吗？`,
          answer: `可以。每个图标都是一个 Lottie JSON 文件，地址为 ${f.site}/icons/<id>.json（例如 ${f.site}/icons/${ex.id}.json），可以用 lottie-web、lottie-ios、lottie-android 或 Flutter 的 lottie 包播放${svgNote(f) ? '；静态 SVG 可以在各个图标页面（英文）下载' : ''}。${
            n
              ? `${titles(f.expressions, 6)} 用到了 After Effects 表达式，因此在网页上需要使用 lottie-web 的完整版。`
              : '这些图标都没有用到表达式，因此 lottie-web 的轻量版（light build）就够用了。'
          }`,
        },
      ];
    },
    badge: (n: number) => `${count(n)} · MIT 许可`,
    allIcons: (name: string) => `全部${name}图标`,
    whereToUse: '适用场景',
    byInteraction: '按交互方式',
    addOne: '添加到您的应用',
    addOneHtml: (label: string, name: string) =>
      `在 React 中，安装 ${code('react-useanimations')} 并导入图标即可，它会自动播放“${label}”交互。本类别的所有图标用法都一样：把 ${code(name)} 换成图标页面上的名称。`,
    shadcnHtml: (href: string) => `使用 ${link(href, 'shadcn/ui')} 时，CLI 会添加一个现成的组件：`,
    noReactHtml: (href: string) =>
      `没有使用 React？每个图标都是位于 ${code('/icons/&lt;id&gt;.json')} 的 Lottie JSON 文件；网页、iOS、Android 和 Flutter 的播放器用法请参阅 ${link(href, 'Lottie 图标')}。`,
    more: '更多类别',
    allIconsButton: '全部图标',
  },

  interaction: {
    titles: (f: InteractionFacts) => [`${f.title}：React 与 Lottie`, `React ${f.title}`, f.title],
    descriptions: (f: InteractionFacts) => [
      `${f.count} 个免费${f.title}，${f.plays}，例如 ${list(f.titles.slice(0, 3))}。支持 React、shadcn/ui 和 Lottie JSON，MIT 许可。`,
      `${f.count} 个免费${f.title}，${f.plays}。支持 React、shadcn/ui 和 Lottie JSON，MIT 许可。`,
      `${f.count} 个免费${f.title}，${f.plays}，支持 React、shadcn/ui 和 Lottie。`,
    ],
    faq: (f: InteractionFacts): Faq => [
      {
        question: `哪些图标使用“${f.label}”交互？`,
        answer: `共 ${count(f.count)}：${titles(f.titles, 15)}。${f.example}`,
      },
      {
        question: '用户偏好减少动态效果时会怎样？',
        answer: `${f.reducedMotion}React 组件会读取 prefers-reduced-motion，并在该设置变化时自动更新，您无需为此编写任何代码。`,
      },
      {
        question: '如何更改图标的交互方式？',
        answer: `每个图标默认播放为它设计的交互。给其他任意图标传入 interaction="${f.interaction}"，就能让它获得这种效果；传入其他值（'loop'、'click-toggle'、'click-replay'、'hover'、'hover-loop'、'hover-replay'）则可换成别的交互。autoplay、loop 和 speed 属性用于调整播放方式。${
          f.interaction === 'click-toggle'
            ? '如果要自己控制状态，请传入 active={isOn} 并在 onClick 中更新它：这样点击就不会再自动切换图标。'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `全部${label}图标`,
    behaviour: '交互表现',
    hoverNote: '在触摸屏上轻触不会触发悬停动画；图标位于可聚焦元素内时，键盘聚焦也会触发动画。',
    handled: 'React 组件会处理好这一切，您只需挑选图标。',
    whereToUse: '适用场景',
    byCategory: '按类别',
    useInReact: '在 React 中使用',
    overrideHtml: `这里列出的图标默认使用这种交互。其他图标也可以使用：传入 ${code('interaction')} 属性即可。`,
    normallyUses: (title: string, interaction: string) => `${title} 默认使用 '${interaction}'`,
    extra: {
      loop: '循环图标会自动播放，滚出视口时暂停。可以用 speed 放慢速度，用 loop={false} 只播放一次，或者用 autoplay={false} 让它保持静止：',
      'click-toggle':
        '点击会自动切换图标。如果要与您的状态保持同步，请传入 active：每当 active 变化时图标都会播放动画，点击也不会再自行切换它。',
      'click-replay':
        '用 render 属性把图标放进真正的按钮里，这样它就能获得焦点并被屏幕阅读器读出。您的 onClick 会先执行；调用 event.preventDefault() 即可跳过动画。',
      hover:
        '用 render 属性把图标放进链接或按钮里：这样元素获得键盘焦点时也会播放动画，而在触摸屏上轻触不会触发。',
      'hover-replay':
        '让整张卡片或整个链接响应悬停，而不只是图标本身：使用 render 属性时，事件会绑定到您的元素上，键盘聚焦同样会播放动画。',
      'hover-loop': '使用 render 属性，让整个链接（包括键盘聚焦）都能触发循环。用 speed 调整节奏：',
    },
    codeText: {
      halfSpeed: '半速播放',
      playsOnce: '播放一次后停止',
      staticFrame: '静止在第一帧',
      endState: 'true 表示显示结束状态',
      closeMenu: '关闭菜单',
      openMenu: '打开菜单',
      download: '下载',
      archive: '归档',
      weeklyGrowth: '每周增长',
    },
    docsHtml: (docs: string, lottie: string) =>
      `所有属性都在${link(docs, '文档')}中。在 React 之外，这些图标就是 Lottie JSON 文件；${link(lottie, 'Lottie 图标')}页面介绍了如何用 lottie-web 实现这些交互。`,
    other: '其他交互方式',
    browseByCategory: '按类别浏览',
  },
};
