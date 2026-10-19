// Trang chủ (/), phần FAQ và các liên kết tới trang tổng hợp.
import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Thư viện icon động & micro animation — useAnimations',
  description: (count: number) =>
    `${count} micro animation miễn phí cho UI: thư viện icon động cho React, shadcn/ui và Lottie, có sẵn hover, click và loop. Giấy phép MIT.`,

  hero: {
    badge: (count: number) => `${count} icon · không dependency · MIT`,
    headline: { start: 'Icon ', accent: 'sống động.', end: '' },
    h1: 'Icon động miễn phí cho React, shadcn/ui và Lottie',
    intro: (count: number) =>
      `${count} micro animation được làm thủ công, có sẵn micro-interaction hover, click và loop. Dùng như một React component, thêm bằng shadcn, hoặc tải về SVG và Lottie JSON. Giấy phép MIT.`,
    browse: 'Xem icon',
    fieldHint: 'Di chuyển con trỏ qua vùng icon.',
  },

  numbers: {
    label: 'Tổng quan',
    icons: 'icon động',
    interactions: 'tương tác có sẵn',
    size: 'player, đã gzip',
    dependencies: 'dependency',
  },

  interactions: {
    eyebrow: 'Tương tác có sẵn',
    title: 'Icon nào cũng biết cách chuyển động.',
    intro:
      'Mỗi icon đi kèm tương tác mà nó được thiết kế cho. Chỉ cần thả vào là chạy, hoặc chọn tương tác khác bằng một prop duy nhất. Hãy thử:',
    demos: {
      loop: 'Phát liên tục, cho loader và các trạng thái nền.',
      'click-toggle': 'Chuyển giữa hai trạng thái: menu và đóng, phát và tạm dừng.',
      'click-replay': 'Phát lại từ đầu sau mỗi lần click, như một phản hồi.',
      hover: 'Phát xuôi khi trỏ vào và chạy ngược khi rời đi.',
      'hover-loop': 'Lặp khi đang hover và chạy nốt chu kỳ khi rời đi.',
      'hover-replay': 'Phát một lần từ đầu mỗi khi trỏ vào.',
    },
  },

  browser: {
    eyebrow: 'Thư viện',
    title: (count: number) => `${count} icon động miễn phí`,
    intro:
      'Hover hoặc click để xem hiệu ứng. Mở một icon để lấy code và tải về Lottie JSON, SVG hoặc ZIP.',
    search: 'Tìm icon',
    searchPlaceholder: (count: number) =>
      `Tìm trong ${count} icon — thử “eye”, “bell” hoặc “arrow”`,
    interaction: 'Tương tác',
    allInteractions: 'Mọi tương tác',
    color: 'Màu icon',
    colors: {
      text: 'Màu chữ',
      indigo: 'Chàm',
      red: 'Đỏ',
      amber: 'Hổ phách',
      teal: 'Xanh mòng két',
      violet: 'Tím',
    },
    customColor: 'Màu tùy chọn',
    size: 'Kích thước',
    category: 'Danh mục',
    all: 'Tất cả',
    count: { other: '{n} icon' },
    noMatch: 'Không có icon nào phù hợp.',
    noMatchHintHtml: (href: string) => `Thử từ khóa khác, hoặc ${link(href, 'đề xuất một icon')}.`,
  },

  everywhere: {
    eyebrow: 'Dùng theo cách của bạn',
    title: 'Cài, import, xong.',
    intro:
      'Một React component không có dependency, một shadcn registry, các tệp tải về với URL cố định, và một catalog mà AI agent đọc được.',
    docs: 'Đọc tài liệu',
    tablist: 'Nền tảng',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Tệp', agents: 'Agent' },
    codeText: {
      afterAdding: 'sau đó',
      files: 'Mỗi icon có dạng SVG, dạng animation (Lottie JSON) và một tệp ZIP gồm cả hai',
    },
  },

  features: {
    title: 'Nhỏ gọn, dễ tiếp cận và tùy biến thoải mái.',
    colors: 'Theo màu của bạn',
    colorsHtml: `Icon dùng ${code('currentColor')}: tự lấy màu chữ, trạng thái hover và dark mode mà không cần cấu hình. Muốn ghi đè thì dùng prop, class hoặc CSS thuần.`,
    tiny: 'Nhỏ gọn ngay từ thiết kế',
    tinyText: 'Player tích hợp sẵn, không có dependency. Mỗi icon là một module riêng chỉ 2 kB.',
    accessible: 'Khả năng truy cập có sẵn',
    accessibleText:
      'Tôn trọng thiết lập giảm chuyển động, phát hiệu ứng hover khi focus bằng bàn phím và được trình đọc màn hình bỏ qua trừ khi bạn gắn nhãn.',
    ssr: 'Sẵn sàng cho server rendering',
    ssrText:
      'Một client component render an toàn trong Next.js, Remix và Astro. Icon chỉ là dữ liệu thuần, import ở đâu cũng được.',
    agents: 'Làm cho AI agent',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Catalog có kiểu dữ liệu với từ khóa cho từng icon, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} và tài liệu Markdown.`,
  },

  browse: {
    title: 'Tìm đúng micro animation bạn cần.',
    byCategory: 'Xem theo danh mục',
    byInteraction: 'Xem theo tương tác',
    formats: 'Tất cả icon và định dạng',
  },

  hubs: {
    icons: 'Tất cả icon động',
    categories: 'Danh mục icon',
    interactions: 'Icon theo tương tác',
    lottie: 'Icon Lottie (JSON)',
    shadcn: 'Icon động cho shadcn/ui',
  },

  faqTitle: 'Câu hỏi thường gặp',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: 'Micro animation và icon động là gì?',
      answer:
        'Micro animation là những chuyển động ngắn, chỉ phục vụ một mục đích, phản hồi lại thao tác của người dùng: icon menu biến thành nút đóng, trái tim được tô đầy khi bạn thích một bài viết, chiếc chuông rung lên khi có thông báo mới. Icon động là dạng micro animation phổ biến nhất. Chúng giúp giao diện có cảm giác phản hồi nhanh và thể hiện thay đổi trạng thái mà không cần thêm chữ.',
    },
    {
      question: 'Tệp Lottie và tệp SVG khác nhau thế nào?',
      answer:
        'Tệp Lottie JSON chứa toàn bộ animation và phát được trong mọi Lottie player, kể cả player tích hợp trong react-useanimations. Các tệp SVG là ảnh tĩnh của icon khi đứng yên, mỗi trạng thái một tệp (ví dụ eye và eye-off), dùng cho những nơi không nên có chuyển động: email, tài liệu, công cụ thiết kế hoặc phương án dự phòng khi không có JavaScript.',
    },
    {
      question: 'Có dùng được với Next.js và server rendering không?',
      answer:
        "Có. Component được đánh dấu 'use client' và chỉ vẽ animation trên trình duyệt, nên render được từ server component và các framework SSR như Next.js, Remix và Astro mà không cần dynamic import. Module icon là dữ liệu thuần, server component có thể import và truyền chúng xuống dưới dạng prop.",
      link: { href: f.links.serverRendering, label: 'Next.js và server rendering' },
    },
    {
      question: 'Có dùng icon trong dự án thương mại được không?',
      answer:
        'Được. Bộ icon và package react-useanimations dùng giấy phép MIT: bạn được dùng, chỉnh sửa và phân phối lại trong cả dự án cá nhân lẫn thương mại. Ghi nguồn là điều chúng tôi trân trọng nhưng không bắt buộc.',
      link: { href: f.links.licence, label: 'Giấy phép & Điều khoản' },
    },
    {
      question: 'Có dùng icon mà không cần React được không?',
      answer:
        'Được. Mỗi icon là một tệp Lottie JSON chuẩn, nên phát được bằng lottie-web trong JavaScript thuần, Vue, Svelte, Angular hay CMS, và trong các Lottie player cho iOS, Android và Flutter. Trang Icon Lottie có URL của các tệp và đoạn code lottie-web dùng ngay cho từng tương tác.',
      link: { href: f.links.lottie, label: 'Icon Lottie' },
    },
    {
      question: 'Icon làm bundle của tôi nặng thêm bao nhiêu?',
      answer: `Player trong react-useanimations ${f.version} nặng khoảng 8 kB sau khi gzip và không có dependency; mỗi icon là một module riêng từ 1 đến 15 kB (trung vị 2 kB), nên bundle chỉ chứa những icon bạn import.`,
    },
  ],

  cta: {
    title: { start: '', accent: 'Thổi hồn', end: ' vào giao diện của bạn.' },
    text: 'Miễn phí, giấy phép MIT, cho cả dự án cá nhân và thương mại.',
    start: 'Bắt đầu',
  },

  schema: {
    software: (count: number) =>
      `React component cùng ${count} icon động (Lottie) có sẵn tương tác hover, click và loop. Không có dependency.`,
    catalogName: 'Catalog icon useAnimations',
    catalog: (count: number) =>
      `Toàn bộ ${count} icon của useAnimations với id, tiêu đề, danh mục, từ khóa, tương tác, URL của Lottie JSON, SVG và ZIP, dòng import React và lệnh shadcn.`,
  },
};
