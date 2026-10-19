// 集合页：/icons、/categories、/interactions、/lottie-icons 和 /shadcn-animated-icons。
import type { Messages } from '../en';
import type { Faq } from '../en/hubs';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [`全部 ${count} 个动态图标（按类别）`, `全部 ${count} 个动态图标`],
    descriptions: (count: number, categories: number) => [
      `一页查看全部 useAnimations 图标：${categories} 个类别共 ${count} 个免费动态图标，支持 React、shadcn/ui、Lottie JSON 和 SVG，MIT 许可。`,
      `${categories} 个类别共 ${count} 个免费动态图标，支持 React、shadcn/ui、Lottie JSON 和 SVG，MIT 许可。`,
    ],
    title: '全部动态图标',
    badge: (count: number) => `${count} 个图标 · MIT 许可`,
    introHtml: (browser: string) =>
      `整套图标按类别排列。打开任意图标，可以查看实时预览、React 和 shadcn/ui 代码，并下载 Lottie JSON、SVG 和 ZIP。如果想按关键词搜索并直接试玩动画，请使用${link(browser, '图标浏览器')}。`,
    categoriesNav: '类别',
    byInteraction: '按交互方式：',
    categoryLink: (count: number, name: string) => `${count} 个${name}图标`,
  },

  categories: {
    titles: (categories: number) => [`动态图标分类：共 ${categories} 类`, '动态图标分类'],
    descriptions: (icons: number, categories: number) => [
      `按类别浏览 ${icons} 个免费动态图标，共 ${categories} 类：导航、操作、媒体、加载、社交媒体等，支持 React、shadcn/ui 和 Lottie。`,
      `按类别浏览 ${icons} 个免费动态图标，共 ${categories} 类，支持 React、shadcn/ui 和 Lottie。`,
    ],
    title: '动态图标分类',
    badge: (icons: number, categories: number) => `${icons} 个图标 · ${categories} 个类别`,
    introHtml: (interactions: string) =>
      `每个 useAnimations 图标都属于一个类别，从导航箭头、媒体控件到加载动画和社交媒体图标。打开某个类别，可以看到其中全部图标、适用场景以及添加图标的代码；也可以改为按${link(interactions, '交互方式')}浏览。`,
    iconCount: (n: number) => `${n} 个图标`,
  },

  interactions: {
    titles: ['微交互：悬停、点击与循环图标', '动态图标的微交互'],
    descriptions: (icons: number, interactions: number) => [
      `${icons} 个动态图标，涵盖 ${interactions} 种微交互：循环、点击切换、点击重播、悬停、悬停重播和悬停循环，支持减少动态效果。`,
      `${icons} 个动态图标，涵盖 ${interactions} 种微交互，支持减少动态效果。`,
    ],
    title: '动态图标的交互方式',
    badge: (interactions: number, icons: number) => `${interactions} 种交互 · ${icons} 个图标`,
    introHtml: `每个图标都自带为它设计的微交互：循环播放、点击切换或重播，或者在悬停时播放。React 组件会自动完成这些绑定，并尊重“减少动态效果”设置；<code class="font-mono text-base text-fg">interaction</code> 属性可以把任意图标换成另一种交互。`,
    iconCount: (n: number) => `${n} 个图标`,
    chooseTitle: '如何选择交互方式',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('持续存在的状态')}，例如正在加载或仍然有效的警告：${link(href, '循环')}。`,
      'click-toggle': (href: string) =>
        `${strong('开关类控件')}，例如静音、菜单或显示密码：${link(href, '点击切换')}，需要受控状态时配合 ${code('active')} 使用。`,
      'click-replay': (href: string) =>
        `${strong('一次性操作')}，例如发送、保存或刷新：${link(href, '点击重播')}。`,
      hover: (href: string) =>
        `${strong('提示链接将打开什么')}：${link(href, '悬停')}，指针离开时会反向播放。`,
      'hover-replay': (href: string) =>
        `${strong('用户会快速扫过的工具栏和列表')}：${link(href, '悬停重播')}，播放一次后自然结束。`,
      'hover-loop': (href: string) =>
        `${strong('值得多看一眼的链接')}，例如社交图标：${link(href, '悬停循环')}。`,
    },
    motionTitle: '减少动态效果',
    motionHtml: `React 组件遵循 ${code('prefers-reduced-motion')}，并在该设置变化时随之更新。在触摸屏上轻触永远不会触发悬停动画。`,
    reducedMotion: {
      loop: '图标不会自动播放，停留在静态的第一帧。',
      'click-toggle': '点击会直接切换到另一种状态，省去中间的动画。',
      'click-replay': '点击仍会触发您的事件处理函数，但不会播放动画。',
      hover: '悬停不会播放动画。',
      'hover-replay': '悬停不会播放动画。',
      'hover-loop': '悬停时图标保持静止。',
    },
  },

  lottie: {
    titles: (count: number) => [`免费 Lottie 图标：${count} 个 JSON 动画`, '免费 Lottie 动态图标'],
    descriptions: (count: number) => [
      `${count} 个免费 Lottie 图标，标准 Lottie JSON 格式，MIT 许可。附 lottie-web、dotLottie、React、iOS、Android 和 Flutter 的即用代码。`,
      `${count} 个免费 Lottie 图标，标准 Lottie JSON 格式，MIT 许可，附各平台播放器的即用代码。`,
      `${count} 个免费 Lottie 图标，标准 Lottie JSON 格式，MIT 许可。`,
    ],
    title: '免费 Lottie 图标',
    crumb: 'Lottie 图标',
    datasetName: 'useAnimations 图标目录',
    datasetDescription: (count: number) =>
      `${count} 个 Lottie 动态图标的元数据和文件网址：id、标题、类别、关键词、交互方式、尺寸和时长。`,
    badge: (count: number) => `${count} 个图标 · Lottie JSON · MIT 许可`,
    intro:
      '每个 useAnimations 图标都是标准的 Lottie JSON 动画，任何 Lottie 播放器都能播放：网页上的 lottie-web，以及 lottie-ios、lottie-android、Flutter 和 React Native。这些文件依据 MIT 许可证免费提供，无需注册，托管在固定网址上并已开启 CORS，既可以直接加载，也可以下载到项目中。',
    popular: '热门 Lottie 图标',
    allIcons: (count: number) => `全部 ${count} 个图标`,
    filesTitle: '文件与网址',
    filesIntroHtml: `每个图标在 ${code('/icons/&lt;id&gt;')} 都有一个页面，提供预览和下载。文件本身的地址如下：`,
    files: {
      json: 'Lottie JSON 动画',
      zip: 'JSON 与静态 SVG',
      svg: '每个状态的静态 SVG',
      catalog: '全部图标的目录',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} 列出了每个图标的 id、标题、类别、关键词、交互方式、尺寸、时长和文件网址，方便在脚本中按关键词挑选图标，或者交给编程智能体来选择。Lottie 文件大小的中位数为 ${median} kB。`,
    players: {
      web: {
        title: '网页：lottie-web',
        text: 'Airbnb 推出的参考播放器。从 CDN 加载，把它指向图标网址，并选择 SVG 渲染器：这样图标始终清晰，还能用 CSS 改色。请使用完整版（lottie.min.js），轻量版不支持表达式。',
        cssLabel: '跟随文字颜色（SVG 渲染器）',
      },
      'web-interactions': {
        title: '网页：悬停与点击交互',
        text: 'lottie-web 只负责播放和停止，交互需要您自己实现。下面是菜单图标的点击切换，并支持减少动态效果；其他交互的写法都与此相同，而下文的 React 组件会替您完成这一切。',
      },
      dotlottie: {
        title: '网页：dotLottie Web 组件',
        text: 'LottieFiles 推出的播放器，用 WebAssembly 引擎渲染到 canvas 上，既能播放普通的 Lottie JSON，也能播放 .lottie 文件。canvas 会保留文件中的颜色，因此除非修改 JSON 中的颜色，图标会保持黑色。',
        jsLabel: '或者使用 JavaScript API：npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React：react-useanimations',
        text: '无需安装 Lottie 播放器：这个软件包自带 8 kB 的播放器，会播放每个图标的交互、跟随文字颜色，并尊重减少动态效果设置。每个图标都是独立模块，只有您导入的图标才会被打包。',
      },
      'react-native': {
        title: 'React Native：lottie-react-native',
        text: '用 require() 把 JSON 打包进应用以便离线使用，或者从网址加载。',
      },
      ios: {
        title: 'iOS：lottie-ios（SwiftUI）',
        text: '通过 Swift Package Manager 从 https://github.com/airbnb/lottie-spm.git 添加依赖，然后把 JSON 放进应用包，或者从网址加载。',
      },
      android: {
        title: 'Android：lottie-android（Jetpack Compose）',
        text: '添加 com.airbnb.android:lottie-compose（使用 View 时添加 com.airbnb.android:lottie）。如需离线使用，把 JSON 放在 res/raw 中，并通过 LottieCompositionSpec.RawRes 加载。',
      },
      flutter: {
        title: 'Flutter：lottie',
        text: 'lottie 包是纯 Dart 实现的播放器，支持 Android、iOS、Web 和桌面端。',
      },
    },
    expressionsTitle: '使用表达式的图标',
    expressionsHtml: (count: number) =>
      `${count} 个图标用到了 After Effects 表达式（${code('loopOut')} 或 ${code('wiggle')}）。在网页上，请用 lottie-web 的完整版播放，而不是 ${code('lottie_light')}。原生播放器不会执行表达式，因此请在 iOS、Android 和 Flutter 上实际测试这些图标，或者换用其他图标；react-useanimations 则能按设计效果播放它们。`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: '这些 Lottie 图标可以免费商用吗？',
        answer: `可以。全部 ${f.count} 个 Lottie 图标都采用 MIT 许可证：可以在个人和商业项目中使用、修改和再分发，无需署名，下载也不需要注册账号。`,
      },
      {
        question: 'Lottie 文件是什么格式？',
        answer: `标准的 Lottie JSON（即 Bodymovin 格式），只包含形状图层：没有图片、字体或外部资源。每个图标绘制在 24 或 32 px 的画板上，可以缩放到任意尺寸，文件大小在 ${f.minSize} kB 到 ${f.maxSize} kB 之间，中位数为 ${f.medianSize} kB。`,
      },
      {
        question: '在 React 中使用这些图标需要 lottie-web 吗？',
        answer:
          '不需要。react-useanimations 自带 8 kB 的播放器，没有任何依赖，只需安装一个软件包，再导入需要的图标即可。只有在 React 之外，比如普通网页或其他框架中，才需要 lottie-web。',
      },
      {
        question: '哪些图标需要 lottie-web 的完整版？',
        answer: `有 ${f.expressions.length} 个图标用到了 After Effects 表达式（loopOut 或 wiggle）：${f.expressions.join('、')}。在网页上，它们需要 lottie-web 的完整版；lottie_light 会忽略表达式。原生播放器（lottie-ios、lottie-android、Flutter 的 lottie）同样不会执行表达式，因此这些图标在那里的动效可能会有所不同。`,
      },
      {
        question: '可以修改 Lottie 图标的颜色吗？',
        answer:
          '在网页上，lottie-web 的 SVG 渲染器会把颜色写成属性，因此给路径加一条 CSS 规则就能给图标改色。原生播放器则使用各自的动态属性 API：iOS 上是 ColorValueProvider，Android 上是 LottieProperty.COLOR 和 STROKE_COLOR，Flutter 中是 ValueDelegate.color。',
      },
    ],
    byCategory: '按类别浏览 Lottie 图标',
  },

  shadcn: {
    titles: (count: number) => [`shadcn/ui 动态图标：${count} 个组件`, 'shadcn/ui 动态图标'],
    descriptions: (count: number) => [
      `${count} 个适用于 shadcn/ui 的动态图标，一条 shadcn CLI 命令即可添加。内置悬停、点击和循环微交互，MIT 许可，无需 lottie-web。`,
      `${count} 个适用于 shadcn/ui 的动态图标，一条 shadcn CLI 命令即可添加，MIT 许可。`,
    ],
    title: 'shadcn/ui 动态图标',
    crumb: 'shadcn/ui',
    popularList: '热门 shadcn/ui 动态图标',
    badge: (count: number) => `${count} 个组件 · shadcn 注册表 · MIT 许可`,
    intro:
      '每个 useAnimations 图标都收录在 shadcn 注册表中。一条 CLI 命令就能把带类型的 React 组件添加到项目里，组件自带为图标设计的悬停、点击或循环交互，支持减少动态效果，颜色跟随您的主题。代码直接落在您的仓库中，和其他 shadcn/ui 组件一样。',
    addTitle: '添加图标',
    addIntro: '用图标的注册表网址运行 shadcn CLI：',
    namingHtml: `组件名为 ${code('Animated')} 加上 PascalCase 形式的图标 id（${code('check-box')} → ${code('AnimatedCheckBox')}），文件位于 ${code('components/animations/&lt;id&gt;.tsx')}。CLI 还会添加共用的 ${code('components/use-animation.tsx')} 封装组件，并安装 ${code('react-useanimations')}；它自带播放器，无需 lottie-web。`,
    namespaceTitle: '使用注册表命名空间的简短写法',
    namespaceHtml: `在 ${code('components.json')} 中添加一次注册表，之后就能按名称添加图标，一次可以添加多个：`,
    registryHtml: (registry: string) =>
      `注册表索引 ${link(registry, '/r/registry.json')} 列出了每一项的标题、类别和交互方式。`,
    usageTitle: '在 shadcn Button 中使用',
    usageHtml: `组件接受与 ${code('UseAnimations')} 相同的属性。对于菜单图标这类开关，请传入 ${code('active')}，并把状态保存在按钮中；每当状态变化，图标都会播放动画：`,
    colorHtml: (docs: string) =>
      `图标跟随文字颜色，因此 ${code('text-primary')} 或 ${code('text-muted-foreground')} 就能给它们改色，深色模式也无需额外处理。更多属性和用法请参阅${link(docs, '文档')}。`,
    codeText: { closeMenu: '关闭菜单', openMenu: '打开菜单' },
    popular: '热门 shadcn/ui 图标',
    allIcons: (count: number) => `全部 ${count} 个图标`,
    popularNote: '每个图标页面都提供对应的 shadcn 命令。',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'shadcn/ui 动态图标是免费的吗？',
        answer: `是的。全部 ${f.count} 个图标及组件代码都采用 MIT 许可证，可用于个人和商业项目。使用注册表不需要账号或 API 密钥。`,
      },
      {
        question: 'shadcn CLI 会往项目里添加什么？',
        answer: `位于 components/animations/<id>.tsx 的图标组件、位于 components/use-animation.tsx 的共用 UseAnimation 播放器封装（作为注册表依赖，只添加一次），以及来自 npm 的 react-useanimations@^${f.version}。不需要 lottie-web：这个软件包自带 8 kB 的播放器。`,
      },
      {
        question: '这些组件能在 Next.js 服务端组件中使用吗？',
        answer:
          '可以。组件标记为 "use client"，只在浏览器中绘制动画，因此可以直接在服务端组件和页面中渲染，无需动态导入，也不用设置 ssr: false。',
      },
      {
        question: '可以修改图标的外观和动效吗？',
        answer:
          '代码就在您自己的仓库里，可以随意修改。组件接受 UseAnimations 的属性：size、strokeColor、fillColor、interaction、active、autoplay、loop 和 speed。图标跟随文字颜色，因此 text-primary 或 text-muted-foreground 等 Tailwind 类名就能给它们改色。',
      },
    ],
    byCategory: '按类别浏览',
  },
};
