// Trang giấy phép (/licencing-and-terms). Văn bản LICENSE luôn hiển thị bằng tiếng Anh.
import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Giấy phép & Điều khoản — useAnimations',
  description:
    'Icon của useAnimations và package react-useanimations dùng giấy phép MIT: miễn phí cho mục đích cá nhân, thương mại và phân phối lại, không cần ghi nguồn.',
  name: 'Giấy phép & Điều khoản',
  heading: 'Dùng miễn phí. Giấy phép MIT.',
  introHtml: (mitHref: string) =>
    `Bộ icon useAnimations và package <code>react-useanimations</code> được phát hành theo <a href="${mitHref}">giấy phép MIT</a>.`,
  canDo: 'Bạn được phép',
  canDoItemsHtml: [
    '<strong>Sử dụng</strong> icon trong website, ứng dụng và sản phẩm cá nhân lẫn thương mại.',
    '<strong>Chỉnh sửa</strong> icon: đổi màu, kích thước, thời gian hay chính chuyển động.',
    '<strong>Phân phối lại</strong> icon, kể cả trong các bộ icon, template, theme, UI kit và component registry.',
  ],
  attribution: 'Ghi nguồn',
  attributionText:
    'Không bắt buộc, nhưng chúng tôi rất trân trọng. Hãy giữ lại thông báo giấy phép khi bạn phân phối lại chính các tệp icon. Nếu muốn ghi nguồn, bạn có thể dùng dòng sau:',
  credit: (link: string) => `Icon động của ${link}`,
  noWarranty: 'Không bảo hành',
  noWarrantyText:
    'Icon và mã nguồn được cung cấp nguyên trạng, không kèm bất kỳ hình thức bảo hành nào.',
  licenseText: 'Văn bản giấy phép',
  bindingNote:
    'Văn bản giấy phép dưới đây là bản gốc tiếng Anh, và chỉ bản này có giá trị pháp lý.',
};
