// Khung của trang tài liệu. Nội dung chính nằm ở src/content/documentation.vi.md.
import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Tài liệu — useAnimations',
  description: (iconCount: number) =>
    `Cách dùng ${iconCount} icon động trong React và shadcn/ui: tương tác, prop, màu sắc, tệp và khả năng truy cập.`,
  badge: 'Tài liệu',
  onThisPage: 'Trên trang này',
  viewAsMarkdown: 'Xem dạng Markdown',
  headline: 'Tài liệu useAnimations',
  summary: 'Cách dùng bộ icon động useAnimations trong React và shadcn/ui.',
  crumb: 'Tài liệu',
  faq: [
    {
      question: 'useAnimations có miễn phí cho dự án thương mại không?',
      answer: 'Có. Bộ icon và package React đều dùng giấy phép MIT, không bắt buộc ghi nguồn.',
    },
    {
      question: 'Dùng icon useAnimations trong React như thế nào?',
      answer:
        'Cài react-useanimations, import UseAnimations và một icon (ví dụ react-useanimations/lib/checkmark), rồi render <UseAnimations animation={checkmark} size={32} />.',
    },
    {
      question: 'Đổi màu icon bằng cách nào?',
      answer:
        'Icon tự lấy theo màu chữ. Bạn có thể đổi màu bằng strokeColor và fillColor, bằng thuộc tính CSS color, hoặc style trực tiếp các path.',
    },
    {
      question: 'Có dùng được khi không có React không?',
      answer:
        'Package này dành cho React. Tuy vậy, mỗi icon còn là một tệp Lottie JSON chuẩn mà mọi Lottie player đều phát được (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter), kèm một SVG tĩnh. Xem mục Dùng không cần React và useanimations.com/lottie-icons.',
    },
  ],
};
