// 首页（/）、首页常见问题以及首页上的集合页链接。沿用原有中文首页（/zh）的标题、H1 和关键表述。
import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'useAnimations — 免费动态图标库：React 动画图标与 Lottie 微动画',
  description: (count: number) =>
    `${count} 个免费动态图标（微动画），内置悬停、点击与循环交互，支持 React、shadcn/ui 和 Lottie，可下载 SVG/JSON，MIT 许可。`,

  hero: {
    badge: (count: number) => `${count} 个图标 · 零依赖 · MIT`,
    headline: { start: '让图标', accent: '动起来', end: '' },
    h1: '免费动态图标库：适用于 React、shadcn/ui 和 Lottie 的动画图标',
    intro: (count: number) =>
      `useAnimations 提供 ${count} 个手工制作的微动画图标，每个图标都内置悬停、点击或循环微交互。您可以把它们作为 React 组件使用，通过 shadcn 一条命令添加到项目中，或者直接下载 SVG 和 Lottie JSON 文件。采用 MIT 许可证。`,
    browse: '浏览全部图标',
    fieldHint: '在图标阵列上移动指针试试。',
  },

  numbers: {
    label: '概览',
    icons: '动态图标',
    interactions: '内置交互',
    size: '播放器（gzip 压缩后）',
    dependencies: '依赖',
  },

  interactions: {
    eyebrow: '交互内置',
    title: '每个图标都知道该怎么动。',
    intro:
      '每个图标都自带为它设计的交互，放进页面即可使用，也可以用一个属性换成其他交互。动手试试：',
    demos: {
      loop: '持续播放，适合加载指示和持续性的状态提示。',
      'click-toggle': '在两种状态之间切换：菜单与关闭、播放与暂停。',
      'click-replay': '每次点击都从头播放，作为操作反馈。',
      hover: '指针移入时正向播放，移出时反向播放。',
      'hover-loop': '悬停期间循环播放，离开后播完当前一轮。',
      'hover-replay': '每次移入时从头播放一次。',
    },
  },

  browser: {
    eyebrow: '图标库',
    title: (count: number) => `${count} 个免费动态图标`,
    intro: '悬停或点击即可播放。打开图标可查看代码，并下载 Lottie JSON、SVG 和 ZIP。',
    search: '搜索图标',
    searchPlaceholder: (count: number) => `搜索 ${count} 个图标，试试 “eye”“bell” 或 “arrow”`,
    interaction: '交互方式',
    allInteractions: '全部交互方式',
    color: '图标颜色',
    colors: {
      text: '文字颜色',
      indigo: '靛蓝',
      red: '红色',
      amber: '琥珀色',
      teal: '青绿色',
      violet: '紫色',
    },
    customColor: '自定义颜色',
    size: '尺寸',
    category: '类别',
    all: '全部',
    count: { other: '{n} 个图标' },
    noMatch: '没有匹配的图标。',
    noMatchHintHtml: (href: string) => `换个关键词试试，或者${link(href, '建议新增图标')}。`,
  },

  everywhere: {
    eyebrow: '随心使用',
    title: '安装、导入，就这么简单。',
    intro:
      '零依赖的 React 组件、shadcn 注册表、带固定网址的可下载文件，以及 AI 智能体可以读取的图标目录。',
    docs: '阅读文档',
    tablist: '平台',
    tabs: { react: 'React', shadcn: 'shadcn', files: '文件', agents: '智能体' },
    codeText: {
      afterAdding: '然后',
      files: '每个图标都提供 SVG、动画（Lottie JSON）以及包含两者的 ZIP',
    },
  },

  features: {
    title: '小巧、无障碍，样式由您掌控。',
    colors: '跟随您的配色',
    colorsHtml: `图标使用 ${code('currentColor')}，自动继承文字颜色、悬停状态和深色模式。也可以通过属性、类名或普通 CSS 覆盖。`,
    tiny: '生来小巧',
    tinyText: '内置播放器，零依赖。每个图标都是约 2 kB 的独立模块。',
    accessible: '默认无障碍',
    accessibleText:
      '尊重系统的“减少动态效果”设置，键盘聚焦时同样播放悬停动画，并且在您添加标签之前不会干扰屏幕阅读器。',
    ssr: '支持服务端渲染',
    ssrText:
      '客户端组件，可以在 Next.js、Remix 和 Astro 中安全渲染。图标本身是普通数据，在任何地方都能导入。',
    agents: '为 AI 智能体准备',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `带类型定义的图标目录为每个图标列出关键词，另有 ${link(iconsJson, 'icons.json')}、${link(llmsTxt, 'llms.txt')} 和 Markdown 文档。`,
  },

  browse: {
    title: '找到合适的微动画。',
    byCategory: '按类别浏览',
    byInteraction: '按交互方式浏览',
    formats: '全部图标与格式',
  },

  hubs: {
    icons: '全部动画图标',
    categories: '图标类别',
    interactions: '按交互方式浏览图标',
    lottie: 'Lottie 图标（JSON）',
    shadcn: 'shadcn/ui 动画图标',
  },

  faqTitle: '常见问题',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: '什么是微动画和动态图标？',
      answer:
        '微动画是响应用户操作的简短动效，每个只表达一件事，例如菜单图标变成关闭按钮、点赞时爱心被填满、有新消息时铃铛摇动。动态图标是最常见的微动画，它让界面反馈更及时，不需要额外的文字就能表达状态变化。',
    },
    {
      question: 'Lottie 文件和 SVG 文件有什么区别？',
      answer:
        'Lottie JSON 文件包含完整的动画，可以在任何 Lottie 播放器中播放，包括 react-useanimations 内置的播放器。SVG 文件是图标静止时的图片，每个状态一张（例如 eye 和 eye-off），适合不需要动效的场景：邮件、文档、设计工具，或不运行 JavaScript 时的备用方案。',
    },
    {
      question: '可以在 Next.js 和服务端渲染中使用吗？',
      answer:
        "可以。组件标记为 'use client'，只在浏览器中绘制动画，因此可以在服务端组件以及 Next.js、Remix、Astro 等 SSR 框架中直接渲染，无需动态导入。图标模块是普通数据，服务端组件可以直接导入并作为属性传递。",
      link: { href: f.links.serverRendering, label: 'Next.js 与服务端渲染' },
    },
    {
      question: '可以用于商业项目吗？',
      answer:
        '可以。图标和 react-useanimations 软件包都采用 MIT 许可证，可以在个人和商业作品中使用、修改和再分发。署名不是必需的，但我们很欢迎。',
      link: { href: f.links.licence, label: '许可与条款' },
    },
    {
      question: '不使用 React 也能用吗？',
      answer:
        '可以。每个图标都是标准的 Lottie JSON 文件，可以通过 lottie-web 在原生 JavaScript、Vue、Svelte、Angular 或 CMS 中播放，也可以在 iOS、Android 和 Flutter 的 Lottie 播放器中使用。Lottie 图标页面列出了文件网址，并为每种交互提供了现成的 lottie-web 代码片段。',
      link: { href: f.links.lottie, label: 'Lottie 图标' },
    },
    {
      question: '会让打包体积增加多少？',
      answer: `react-useanimations ${f.version} 的播放器压缩后约 8 kB，没有依赖；每个图标是 1 到 15 kB 的独立模块（中位数 2 kB），最终只打包您导入的图标。`,
    },
  ],

  cta: {
    title: { start: '为界面注入', accent: '活力。', end: '' },
    text: '免费，采用 MIT 许可证，个人和商业项目均可使用。',
    start: '开始使用',
  },

  schema: {
    software: (count: number) =>
      `React 组件和 ${count} 个动态图标（Lottie），内置悬停、点击和循环交互，零依赖。`,
    catalogName: 'useAnimations 图标目录',
    catalog: (count: number) =>
      `全部 ${count} 个 useAnimations 图标，包含 id、标题、类别、关键词、交互方式、Lottie JSON、SVG 和 ZIP 网址、React 导入语句以及 shadcn 命令。`,
  },
};
