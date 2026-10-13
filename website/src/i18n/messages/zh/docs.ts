// 文档页面的外框；正文在 src/content/documentation.zh.md。
import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: '文档 — useAnimations',
  description: (iconCount: number) =>
    `如何在 React 和 shadcn/ui 中使用 ${iconCount} 个动态图标：交互方式、属性、颜色、文件与无障碍。`,
  badge: '文档',
  onThisPage: '本页内容',
  viewAsMarkdown: '以 Markdown 格式查看',
  headline: 'useAnimations 文档',
  summary: '如何在 React 和 shadcn/ui 中使用 useAnimations 动态图标。',
  crumb: '文档',
  faq: [
    {
      question: 'useAnimations 可以免费用于商业项目吗？',
      answer: '可以。图标和 React 软件包都采用 MIT 许可证，无需署名。',
    },
    {
      question: '如何在 React 中使用 useAnimations 图标？',
      answer:
        '安装 react-useanimations，导入 UseAnimations 和一个图标（例如 react-useanimations/lib/checkmark），然后渲染 <UseAnimations animation={checkmark} size={32} />。',
    },
    {
      question: '如何修改图标的颜色？',
      answer:
        '图标默认跟随文字颜色。可以通过 strokeColor 和 fillColor、CSS color，或者直接给路径设置样式来修改。',
    },
    {
      question: '不使用 React 也能用吗？',
      answer:
        '这个软件包是为 React 设计的。不过每个图标同时也是标准的 Lottie JSON 文件，任何 Lottie 播放器都能播放（lottie-web、dotLottie、lottie-react-native、lottie-ios、lottie-android、Flutter），另外还提供静态 SVG。请参阅文档中的“不使用 React”一节以及 useanimations.com/lottie-icons。',
    },
  ],
};
