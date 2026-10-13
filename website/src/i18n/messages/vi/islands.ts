// Văn bản trong các React island (components/*.tsx); placeholder '{name}' do component điền vào.
import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'Lặp',
      'click-toggle': 'Click',
      'click-replay': 'Click',
      hover: 'Hover',
      'hover-loop': 'Hover',
      'hover-replay': 'Hover',
    },
  },
  iconDialog: {
    hints: {
      loop: 'Tự phát liên tục',
      'click-toggle': 'Click để bật/tắt',
      'click-replay': 'Click để phát lại',
      hover: 'Hover để phát, rời chuột để chạy ngược',
      'hover-loop': 'Hover để lặp',
      'hover-replay': 'Hover để phát',
    },
    preview: 'Xem trước {title}',
    colors: 'Màu xem trước',
    color: 'Màu {color}',
    textColor: 'Màu chữ',
    interaction: 'Tương tác',
    duration: 'Thời lượng',
    seconds: '{seconds} giây',
    import: 'Import',
    close: 'Đóng',
    code: 'Mã nguồn',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Tệp' },
    copy: 'Sao chép',
    download: 'Tải xuống',
    iconPage: 'Trang icon →',
  },
  interactionDemo: {
    click: 'Click vào thẻ',
    loop: 'Tự phát liên tục',
    hover: 'Hover lên thẻ',
  },
  mobileMenu: {
    menu: 'Menu',
    nav: 'Điều hướng chính',
  },
  themeToggle: {
    toLight: 'Chuyển sang giao diện sáng',
    toDark: 'Chuyển sang giao diện tối',
  },
};
