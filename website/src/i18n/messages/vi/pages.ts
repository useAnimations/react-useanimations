// Các trang tổng hợp: /icons, /categories, /interactions, /lottie-icons và /shadcn-animated-icons.
import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { listIn } from '../../format';

const list = listIn('vi');

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Tất cả ${count} icon động theo danh mục`,
      `Tất cả ${count} icon động`,
    ],
    descriptions: (count: number, categories: number) => [
      `Mọi icon của useAnimations trên một trang: ${count} icon động miễn phí trong ${categories} danh mục, cho React, shadcn/ui, Lottie JSON và SVG. Giấy phép MIT.`,
    ],
    title: 'Tất cả icon động',
    badge: (count: number) => `${count} icon · Giấy phép MIT`,
    introHtml: (browser: string) =>
      `Toàn bộ bộ icon, nhóm theo danh mục. Mở một icon để xem trước trực tiếp, lấy code React và shadcn/ui, và tải về Lottie JSON, SVG hoặc ZIP. Để tìm theo từ khóa và thử hiệu ứng ngay tại chỗ, hãy dùng ${link(browser, 'trình duyệt icon')}.`,
    categoriesNav: 'Danh mục',
    byInteraction: 'Theo tương tác:',
    categoryLink: (count: number, name: string) => `${count} icon ${name.toLowerCase()}`,
  },

  categories: {
    titles: (categories: number) => [
      `Danh mục icon động: ${categories} bộ sưu tập`,
      'Danh mục icon động',
    ],
    descriptions: (icons: number, categories: number) => [
      `Xem ${icons} icon động miễn phí trong ${categories} danh mục: điều hướng, thao tác, media, loading, mạng xã hội và nhiều hơn nữa. Cho React, shadcn/ui và Lottie.`,
    ],
    title: 'Danh mục icon động',
    badge: (icons: number, categories: number) => `${icons} icon · ${categories} danh mục`,
    introHtml: (interactions: string) =>
      `Mỗi icon của useAnimations thuộc về một danh mục, từ mũi tên điều hướng, nút điều khiển media đến loader và logo mạng xã hội. Mở một danh mục để xem tất cả icon trong đó, nên dùng chúng ở đâu và code để thêm vào ứng dụng, hoặc xem theo ${link(interactions, 'tương tác')}.`,
    iconCount: (n: number) => `${n} icon`,
  },

  interactions: {
    titles: ['Micro-interaction: icon hover, click và loop', 'Micro-interaction cho icon động'],
    descriptions: (icons: number, interactions: number) => [
      `${icons} icon động với ${interactions} kiểu micro-interaction: lặp, click bật/tắt, click phát lại, hover, hover phát lại và hover lặp. Hỗ trợ giảm chuyển động.`,
    ],
    title: 'Tương tác của icon động',
    badge: (interactions: number, icons: number) => `${interactions} tương tác · ${icons} icon`,
    introHtml: `Mỗi icon đi kèm micro-interaction mà nó được thiết kế cho: lặp liên tục, bật/tắt hoặc phát lại khi click, hay phát khi hover. React component lo phần kết nối và tôn trọng thiết lập giảm chuyển động, còn prop <code class="font-mono text-base text-fg">interaction</code> cho phép chuyển bất kỳ icon nào sang tương tác khác.`,
    iconCount: (n: number) => `${n} icon`,
    chooseTitle: 'Chọn tương tác phù hợp',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Trạng thái kéo dài')}, như đang tải hoặc một cảnh báo đang hoạt động: ${link(href, 'lặp')}.`,
      'click-toggle': (href: string) =>
        `${strong('Nút bật/tắt')}, như tắt tiếng, menu hoặc hiện mật khẩu: ${link(href, 'click bật/tắt')}, kèm ${code('active')} nếu cần kiểm soát state.`,
      'click-replay': (href: string) =>
        `${strong('Thao tác một lần')}, như gửi, lưu hoặc làm mới: ${link(href, 'click phát lại')}.`,
      hover: (href: string) =>
        `${strong('Gợi ý trước nội dung một liên kết sẽ mở')}: ${link(href, 'hover')}, chạy ngược lại khi con trỏ rời đi.`,
      'hover-replay': (href: string) =>
        `${strong('Thanh công cụ và danh sách mà người dùng hay lướt chuột qua')}: ${link(href, 'hover phát lại')}, tự chạy hết hiệu ứng.`,
      'hover-loop': (href: string) =>
        `${strong('Liên kết mời người dùng nán lại lâu hơn')}, như icon mạng xã hội: ${link(href, 'hover lặp')}.`,
    },
    motionTitle: 'Giảm chuyển động',
    motionHtml: `React component tuân theo ${code('prefers-reduced-motion')} và cập nhật ngay khi thiết lập này thay đổi. Chạm trên màn hình cảm ứng không bao giờ kích hoạt hiệu ứng hover.`,
    reducedMotion: {
      loop: 'icon không tự phát và đứng yên ở khung hình tĩnh đầu tiên.',
      'click-toggle': 'cú click chuyển ngay sang trạng thái còn lại, bỏ qua hiệu ứng ở giữa.',
      'click-replay': 'cú click vẫn đến được handler của bạn nhưng hiệu ứng không phát.',
      hover: 'hover không phát hiệu ứng.',
      'hover-replay': 'hover không phát hiệu ứng.',
      'hover-loop': 'icon đứng yên khi được hover.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Icon Lottie miễn phí: ${count} icon động JSON`,
      'Icon Lottie miễn phí',
    ],
    descriptions: (count: number) => [
      `${count} icon Lottie miễn phí dạng Lottie JSON thuần, giấy phép MIT. Code copy-paste cho lottie-web, dotLottie, React, React Native, iOS, Android và Flutter.`,
    ],
    title: 'Icon Lottie miễn phí',
    crumb: 'Icon Lottie',
    datasetName: 'Catalog icon useAnimations',
    datasetDescription: (count: number) =>
      `Metadata và URL tệp của ${count} icon Lottie động: id, tiêu đề, danh mục, từ khóa, tương tác, kích thước và thời lượng.`,
    badge: (count: number) => `${count} icon · Lottie JSON · Giấy phép MIT`,
    intro:
      'Mỗi icon của useAnimations là một animation Lottie JSON chuẩn, nên mọi Lottie player đều phát được: lottie-web trên web, lottie-ios, lottie-android, Flutter và React Native. Các tệp miễn phí theo giấy phép MIT, không cần đăng ký, được phục vụ từ URL cố định có bật CORS, nên bạn có thể dùng thẳng từ URL hoặc tải về đưa vào dự án.',
    popular: 'Icon Lottie phổ biến',
    allIcons: (count: number) => `Tất cả ${count} icon`,
    filesTitle: 'Tệp và URL',
    filesIntroHtml: `Mỗi icon có một trang tại ${code('/icons/&lt;id&gt;')} với bản xem trước và các tệp tải về. Bản thân các tệp:`,
    files: {
      json: 'animation Lottie JSON',
      zip: 'tệp JSON và các SVG tĩnh',
      svg: 'SVG tĩnh của từng trạng thái',
      catalog: 'catalog của mọi icon',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} liệt kê mọi icon kèm id, tiêu đề, danh mục, từ khóa, tương tác, kích thước, thời lượng và URL tệp, nhờ vậy dễ dàng chọn icon theo từ khóa trong một script hoặc để coding agent tự chọn. Tệp Lottie có kích thước trung vị ${median} kB.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'Player tham chiếu của Airbnb. Tải nó từ CDN, trỏ tới URL của icon và chọn renderer SVG: icon giữ được độ sắc nét và có thể đổi màu bằng CSS. Hãy dùng bản đầy đủ (lottie.min.js), vì bản light bỏ qua expression.',
        cssLabel: 'Theo màu chữ (renderer SVG)',
      },
      'web-interactions': {
        title: 'Web: tương tác hover và click',
        text: 'lottie-web chỉ phát và dừng, còn tương tác thì bạn phải tự viết. Dưới đây là tương tác click bật/tắt của icon menu, có hỗ trợ giảm chuyển động; mọi tương tác khác đều theo cùng một khuôn mẫu, và React component bên dưới làm sẵn tất cả cho bạn.',
      },
      dotlottie: {
        title: 'Web: web component dotLottie',
        text: 'Player của LottieFiles render lên canvas bằng engine WebAssembly, phát được cả Lottie JSON thuần lẫn tệp .lottie. Canvas giữ nguyên màu trong tệp, nên icon sẽ có màu đen trừ khi bạn sửa màu trong JSON.',
        jsLabel: 'Hoặc dùng JavaScript API: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Không cần cài Lottie player: package có player riêng chỉ 8 kB, chạy tương tác của từng icon, tự theo màu chữ và tôn trọng thiết lập giảm chuyển động. Mỗi icon là một module riêng, nên bạn chỉ đưa vào bundle những icon đã import.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Đóng gói JSON bằng require() để dùng offline, hoặc tải từ URL của nó.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Thêm package từ https://github.com/airbnb/lottie-spm.git bằng Swift Package Manager, rồi đưa tệp JSON vào bundle hoặc tải từ URL của nó.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Thêm com.airbnb.android:lottie-compose (hoặc com.airbnb.android:lottie nếu dùng View). Đặt tệp JSON trong res/raw để dùng offline với LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'Package lottie là một player viết hoàn toàn bằng Dart, chạy trên Android, iOS, web và desktop.',
      },
    },
    expressionsTitle: 'Icon có expression',
    expressionsHtml: (count: number) =>
      `${count} icon dùng expression của After Effects (${code('loopOut')} hoặc ${code('wiggle')}). Trên web, hãy phát chúng bằng bản đầy đủ của lottie-web, không phải ${code('lottie_light')}. Các player native không xử lý expression, nên hãy kiểm tra những icon này trên iOS, Android và Flutter hoặc chọn icon khác; react-useanimations phát chúng đúng như thiết kế.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Các icon Lottie này có miễn phí cho mục đích thương mại không?',
        answer: `Có. Cả ${f.count} icon Lottie đều dùng giấy phép MIT: bạn được dùng, chỉnh sửa và phân phối lại trong dự án cá nhân lẫn thương mại, không bắt buộc ghi nguồn và không cần tài khoản để tải về.`,
      },
      {
        question: 'Tệp Lottie có định dạng gì?',
        answer: `Lottie JSON chuẩn (định dạng Bodymovin), chỉ gồm shape layer: không có ảnh, font hay tài nguyên bên ngoài. Mỗi icon được vẽ trên artboard 24 hoặc 32 px, co giãn tới mọi kích thước và nặng từ ${f.minSize} kB đến ${f.maxSize} kB, trung vị ${f.medianSize} kB.`,
      },
      {
        question: 'Có cần lottie-web để dùng icon trong React không?',
        answer:
          'Không. react-useanimations có player riêng chỉ 8 kB và không có dependency, nên bạn chỉ cần cài một package và import những icon cần dùng. lottie-web chỉ cần khi dùng ngoài React, trên trang web thuần hoặc trong framework khác.',
      },
      {
        question: 'Những icon nào cần bản đầy đủ của lottie-web?',
        answer: `${f.expressions.length} icon dùng expression của After Effects (loopOut hoặc wiggle): ${list(f.expressions)}. Trên web, chúng cần bản đầy đủ của lottie-web; lottie_light bỏ qua expression. Các player native (lottie-ios, lottie-android, package lottie của Flutter) cũng không xử lý expression, nên ở đó các icon này có thể chuyển động khác đi.`,
      },
      {
        question: 'Có đổi màu icon Lottie được không?',
        answer:
          'Trên web, renderer SVG của lottie-web ghi màu dưới dạng thuộc tính, nên một rule CSS nhắm vào các path là đổi được màu icon. Các player native dùng API dynamic property riêng: ColorValueProvider trên iOS, LottieProperty.COLOR và STROKE_COLOR trên Android, và ValueDelegate.color trong Flutter.',
      },
    ],
    byCategory: 'Icon Lottie theo danh mục',
  },

  shadcn: {
    titles: (count: number) => [
      `Icon động cho shadcn/ui: ${count} component`,
      'Icon động cho shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} icon động cho shadcn/ui: thêm bất kỳ icon nào bằng một lệnh shadcn CLI. Micro-interaction hover, click và loop, giấy phép MIT, không cần lottie-web.`,
    ],
    title: 'Icon động cho shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Icon động phổ biến cho shadcn/ui',
    badge: (count: number) => `${count} component · shadcn registry · Giấy phép MIT`,
    intro:
      'Mọi icon của useAnimations đều có trong một shadcn registry. Một lệnh CLI sẽ thêm vào dự án của bạn một React component có kiểu TypeScript, với tương tác hover, click hoặc loop mà icon được thiết kế cho, hỗ trợ giảm chuyển động và màu sắc theo theme của bạn. Code nằm ngay trong repository của bạn, giống mọi component shadcn/ui khác.',
    addTitle: 'Thêm một icon',
    addIntro: 'Chạy shadcn CLI với URL registry của icon:',
    namingHtml: `Component được đặt tên theo dạng ${code('Animated')} + id của icon ở dạng PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) và nằm trong ${code('components/animations/&lt;id&gt;.tsx')}. CLI cũng thêm wrapper dùng chung ${code('components/use-animation.tsx')} và cài ${code('react-useanimations')}, vốn có player riêng: không cần lottie-web.`,
    namespaceTitle: 'Tên ngắn với namespace của registry',
    namespaceHtml: `Thêm registry vào ${code('components.json')} một lần, sau đó thêm icon theo tên, nhiều icon cùng lúc:`,
    registryHtml: (registry: string) =>
      `Chỉ mục registry tại ${link(registry, '/r/registry.json')} liệt kê mọi mục kèm tiêu đề, danh mục và tương tác.`,
    usageTitle: 'Dùng trong shadcn Button',
    usageHtml: `Các component nhận đúng các prop như ${code('UseAnimations')}. Với icon bật/tắt như icon menu, hãy truyền ${code('active')} và giữ state trong button của bạn; icon sẽ chuyển động mỗi khi state thay đổi:`,
    colorHtml: (docs: string) =>
      `Icon tự theo màu chữ, nên ${code('text-primary')} hay ${code('text-muted-foreground')} là đổi được màu, và dark mode không cần thêm gì. Các prop và cách dùng khác có trong ${link(docs, 'tài liệu')}.`,
    codeText: { closeMenu: 'Đóng menu', openMenu: 'Mở menu' },
    popular: 'Icon phổ biến cho shadcn/ui',
    allIcons: (count: number) => `Tất cả ${count} icon`,
    popularNote: 'Trang của mỗi icon đều có lệnh shadcn tương ứng.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Icon động cho shadcn/ui có miễn phí không?',
        answer: `Có. Cả ${f.count} icon và code component đều dùng giấy phép MIT, cho dự án cá nhân lẫn thương mại. Registry không yêu cầu tài khoản hay API key.`,
      },
      {
        question: 'shadcn CLI thêm những gì vào dự án của tôi?',
        answer: `Component icon trong components/animations/<id>.tsx, wrapper player dùng chung UseAnimation trong components/use-animation.tsx (chỉ một lần, dưới dạng dependency của registry) và react-useanimations@^${f.version} từ npm. Không cần lottie-web: package có player riêng chỉ 8 kB.`,
      },
      {
        question: 'Các component có chạy được với server component của Next.js không?',
        answer:
          'Có. Các component được đánh dấu "use client" và chỉ vẽ animation trên trình duyệt, nên bạn có thể render chúng từ server component và page mà không cần dynamic import hay ssr: false.',
      },
      {
        question: 'Có thay đổi được giao diện và chuyển động của icon không?',
        answer:
          'Code là của bạn, nằm trong repository của bạn. Các component nhận prop của UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop và speed. Icon tự theo màu chữ, nên các class Tailwind như text-primary hay text-muted-foreground là đổi được màu.',
      },
    ],
    byCategory: 'Xem theo danh mục',
  },
};
