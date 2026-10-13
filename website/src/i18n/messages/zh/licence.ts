// 许可页面（/licencing-and-terms）。LICENSE 原文在所有语言中都以英文显示。
import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: '许可与条款 — useAnimations',
  description:
    'useAnimations 图标和 react-useanimations 软件包采用 MIT 许可证：个人和商业用途均可免费使用和再分发，无需署名。',
  name: '许可与条款',
  heading: '免费使用，MIT 许可。',
  introHtml: (mitHref: string) =>
    `useAnimations 图标和 <code>react-useanimations</code> 软件包均以 <a href="${mitHref}">MIT 许可证</a>发布。`,
  canDo: '您可以',
  canDoItemsHtml: [
    '<strong>使用</strong>：在个人和商业网站、应用及产品中使用这些图标。',
    '<strong>修改</strong>：调整颜色、尺寸、节奏，甚至动效本身。',
    '<strong>再分发</strong>：包括放进图标包、模板、主题、UI 套件和组件注册表中分发。',
  ],
  attribution: '署名',
  attributionText:
    '不强制要求，但我们很欢迎。直接再分发这些文件时，请保留许可声明；如果您愿意注明出处，可以使用：',
  credit: (link: string) => `动态图标来自 ${link}`,
  noWarranty: '无担保',
  noWarrantyText: '图标和代码均按“原样”提供，不附带任何形式的担保。',
  licenseText: '许可证文本',
  bindingNote: '以下许可证文本为英文原版，具有法律效力的以该版本为准。',
};
