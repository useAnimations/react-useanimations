// Trang danh mục và trang tương tác (/categories/<slug>, /interactions/<slug>): câu được ghép từ dữ kiện.
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const list = listIn('vi');
const icons = (n: number) => pluralIn('vi')(n, { other: 'icon' });
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

/** Tối đa `max` tên, sau đó là “và N icon khác”. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} và ${items.length - max} icon khác`
    : list(items);

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

/** Câu về SVG tĩnh: cả bộ có SVG, chỉ một phần có, hoặc không có. */
const allSvg = (f: CategoryFacts) => f.withSvg === f.count;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} cho React & Lottie`,
      `${f.title} cho React`,
      `${f.title} miễn phí`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const name = lower(f.title);
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} ${name} miễn phí, gồm ${examples}. Micro animation hover, click và loop cho React, shadcn/ui và Lottie JSON, giấy phép MIT.`,
        `${f.count} ${name} miễn phí, gồm ${examples}. Dùng cho React, shadcn/ui và Lottie JSON, giấy phép MIT.`,
        `${f.count} ${name} miễn phí, gồm ${examples}. Cho React, shadcn/ui và Lottie, MIT.`,
        `${f.count} ${name} miễn phí cho React, shadcn/ui và Lottie JSON, giấy phép MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays =
        f.groups.length === 1
          ? `Cả ${icons(f.count)} đều ${f.groups[0].plays}.`
          : `Trong ${icons(f.count)}, ${list(f.groups.map(({ count, plays: phrase }) => `${icons(count)} ${phrase}`))}.`;
      const svg = allSvg(f)
        ? ''
        : f.withSvg
          ? ` ${icons(f.withSvg)} trong số đó còn có thêm SVG tĩnh.`
          : '';
      return `${plays} Mỗi icon có sẵn dưới dạng React component, component shadcn/ui và animation Lottie JSON${allSvg(f) ? ', kèm SVG tĩnh' : ''}, dùng miễn phí cả cho mục đích thương mại theo giấy phép MIT.${svg}`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `Bộ ${name} gồm những icon nào?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Tất cả đều miễn phí cho dự án cá nhân và thương mại theo giấy phép MIT, không bắt buộc ghi nguồn.`,
        },
        {
          question: `Dùng các ${name} này trong React như thế nào?`,
          answer: `Cài react-useanimations, thêm ${ex.importLine} rồi render <UseAnimations animation={${ex.exportName}} size={32} />. Icon sẽ chạy tương tác “${ex.interactionLabel}” của nó và tự lấy theo màu chữ. Nếu dùng shadcn/ui, hãy chạy ${ex.shadcnCommand}.`,
        },
        {
          question: `Có dùng được các ${name} này mà không cần React không?`,
          answer: `Được. Mỗi icon là một tệp Lottie JSON tại ${f.site}/icons/<id>.json (ví dụ ${f.site}/icons/${ex.id}.json), phát được bằng lottie-web, lottie-ios, lottie-android hoặc package lottie của Flutter${f.withSvg ? '; SVG tĩnh có trên trang riêng của từng icon (bằng tiếng Anh)' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} dùng expression của After Effects, nên trên web cần bản đầy đủ của lottie-web.`
              : 'Không icon nào dùng expression, nên bản rút gọn (light) của lottie-web là đủ.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · Giấy phép MIT`,
    allIcons: (name: string) => `Tất cả icon ${name.toLowerCase()}`,
    whereToUse: 'Dùng ở đâu',
    byInteraction: 'Theo tương tác',
    addOne: 'Thêm vào ứng dụng của bạn',
    addOneHtml: (label: string, name: string) =>
      `Với React, hãy cài ${code('react-useanimations')} rồi import icon; icon sẽ tự chạy tương tác “${label}” của nó. Mọi icon trong danh mục này đều dùng giống hệt: chỉ cần thay ${code(name)} bằng tên ghi trên trang của icon đó.`,
    shadcnHtml: (href: string) => `Với ${link(href, 'shadcn/ui')}, CLI sẽ thêm sẵn một component:`,
    noReactHtml: (href: string) =>
      `Không dùng React? Mỗi icon là một tệp Lottie JSON tại ${code('/icons/&lt;id&gt;.json')}; xem ${link(href, 'Icon Lottie')} để biết các player cho web, iOS, Android và Flutter.`,
    more: 'Danh mục khác',
    allIconsButton: 'Tất cả icon',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} cho React & Lottie`,
      `${f.title} cho React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => [
      `${f.count} icon động miễn phí ${f.plays}, như ${list(f.titles.slice(0, 3))}. Dùng cho React, shadcn/ui và Lottie JSON, giấy phép MIT.`,
      `${f.count} icon động miễn phí ${f.plays}. Dùng cho React, shadcn/ui và Lottie JSON, giấy phép MIT.`,
    ],
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Những icon nào dùng tương tác “${f.label}”?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Điều gì xảy ra khi người dùng bật giảm chuyển động?',
        answer: `${f.reducedMotion} React component tự đọc prefers-reduced-motion và cập nhật ngay khi thiết lập này thay đổi, nên bạn không cần viết thêm code nào.`,
      },
      {
        question: 'Làm sao đổi tương tác của một icon?',
        answer: `Mỗi icon chạy tương tác mà nó được thiết kế cho. Truyền interaction="${f.interaction}" để icon khác cũng có hành vi này, hoặc một giá trị khác ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') để đổi sang tương tác tương ứng. Các prop autoplay, loop và speed điều chỉnh cách phát.${
          f.interaction === 'click-toggle'
            ? ' Nếu muốn tự quản lý trạng thái, hãy truyền active={isOn} và cập nhật nó trong onClick: khi đó cú click sẽ không tự bật/tắt icon nữa.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Tất cả icon tương tác “${label}”`,
    behaviour: 'Cách hoạt động',
    hoverNote:
      ' Chạm trên màn hình cảm ứng không kích hoạt hiệu ứng hover, còn focus bằng bàn phím thì có, nếu icon nằm trong một phần tử có thể focus.',
    handled: 'React component lo hết những việc này; bạn chỉ cần chọn icon.',
    whereToUse: 'Dùng ở đâu',
    byCategory: 'Theo danh mục',
    useInReact: 'Dùng trong React',
    overrideHtml: `Các icon liệt kê ở đây mặc định chạy tương tác này. Icon khác cũng dùng được: chỉ cần truyền prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) => `${title} mặc định dùng '${interaction}'`,
    extra: {
      loop: 'Icon lặp tự phát và tạm dừng khi bị cuộn ra khỏi màn hình. Làm chậm lại bằng speed, chỉ phát một lần với loop={false}, hoặc giữ đứng yên với autoplay={false}:',
      'click-toggle':
        'Cú click tự bật/tắt icon. Để icon luôn khớp với state của bạn, hãy truyền active: icon sẽ chuyển động mỗi khi active thay đổi, và cú click không còn tự bật/tắt nó nữa.',
      'click-replay':
        'Đặt icon trong một button thật bằng render prop để nó có thể nhận focus và được trình đọc màn hình đọc lên. onClick của bạn chạy trước; gọi event.preventDefault() để bỏ qua hiệu ứng.',
      hover:
        'Đặt icon trong một link hoặc button bằng render prop: khi đó hiệu ứng cũng phát khi phần tử nhận focus bằng bàn phím, và chạm trên màn hình cảm ứng sẽ không kích hoạt nó.',
      'hover-replay':
        'Cho cả thẻ hoặc cả link nhận hover, không chỉ riêng icon: với render prop, các sự kiện được gắn vào phần tử của bạn, và focus bằng bàn phím cũng phát hiệu ứng.',
      'hover-loop':
        'Dùng render prop để cả link kích hoạt vòng lặp, kể cả khi focus bằng bàn phím. Đổi nhịp độ bằng speed:',
    },
    codeText: {
      halfSpeed: 'nửa tốc độ',
      playsOnce: 'phát một lần rồi dừng',
      staticFrame: 'khung hình tĩnh đầu tiên',
      endState: 'true hiển thị trạng thái cuối',
      closeMenu: 'Đóng menu',
      openMenu: 'Mở menu',
      download: 'Tải xuống',
      archive: 'Lưu trữ',
      weeklyGrowth: 'Tăng trưởng tuần',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Tất cả prop đều có trong ${link(docs, 'tài liệu')}. Ngoài React, các icon là tệp Lottie JSON; trang ${link(lottie, 'Icon Lottie')} hướng dẫn cách tái tạo các tương tác bằng lottie-web.`,
    other: 'Các tương tác khác',
    browseByCategory: 'Xem theo danh mục',
  },
};
