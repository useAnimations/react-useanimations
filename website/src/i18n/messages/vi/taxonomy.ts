// Danh mục và tương tác như người đọc thấy trên trang.
import type { Messages } from '../en';

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Cảnh báo',
      title: 'Icon cảnh báo động',
      intro:
        'Tam giác cảnh báo, vòng tròn báo lỗi và biển dừng, nhấp nháy vừa đủ để gây chú ý mà không chói mắt. Hãy đặt chúng cạnh một trường form bị lỗi, ở đầu banner báo lỗi hoặc trong cột trạng thái, những chỗ mà icon tĩnh rất dễ bị lướt qua.',
      useCases: [
        'Lỗi validate ngay dưới các trường form',
        'Banner lỗi và cảnh báo ở đầu trang',
        'Các dòng thất bại trong bảng trạng thái deploy hoặc job',
        'Hộp thoại xác nhận hành động không thể hoàn tác',
        'Trang trạng thái hệ thống khi đang có sự cố',
      ],
    },
    Notifications: {
      name: 'Thông báo',
      title: 'Icon chuông thông báo động',
      intro:
        'Icon chuông rung lên khi có hoạt động mới, hoặc chuyển qua lại giữa chuông và chuông tắt tiếng. Một cú lắc nhẹ của chiếc chuông kéo ánh mắt về số tin chưa đọc, còn các phiên bản bật/tắt có thể dùng luôn làm nút tắt thông báo cho một kênh hay một luồng thảo luận.',
      useCases: [
        'Nút trung tâm thông báo trên header ứng dụng',
        'Badge tin chưa đọc rung lên khi có tin nhắn mới',
        'Nút bật/tắt thông báo cho một kênh hoặc luồng thảo luận',
        'Cài đặt thông báo email và push',
        'Nút đăng ký nhắc nhở và cảnh báo',
      ],
    },
    Navigation: {
      name: 'Điều hướng',
      title: 'Icon điều hướng và mũi tên động',
      intro:
        'Menu hamburger biến thành nút đóng, cùng các mũi tên, chevron và mũi tên góc khẽ nhích theo hướng của chúng khi hover. Nhờ vậy người dùng thấy ngay một nút sẽ dẫn đi đâu: mở drawer, quay lại, mở rộng một dòng hay rời khỏi trang.',
      useCases: [
        'Menu hamburger biến thành nút đóng trên mobile',
        'Nút trước và sau trong carousel và phân trang',
        'Chevron của accordion và dropdown',
        'Gợi ý cuộn lên đầu trang hoặc cuộn xuống',
        'Liên kết đăng nhập và đăng xuất',
        'Dấu hiệu liên kết ngoài và nút ẩn/hiện sidebar',
      ],
    },
    Action: {
      name: 'Thao tác',
      title: 'Icon thao tác động',
      intro:
        'Những “động từ” của giao diện: lưu, xóa, tải xuống, làm mới, thích, đánh dấu, tìm kiếm và cài đặt. Mỗi icon xác nhận lại cú click hay hover mà nó gắn với, nên trái tim sẽ được tô đầy khi bạn thích một bài viết, còn nắp thùng rác nhấc lên trước khi bạn xóa.',
      useCases: [
        'Nút thích, yêu thích và đánh dấu trên các thẻ',
        'Nút tải xuống, tải lên và lưu có phản hồi xác nhận',
        'Nút ẩn/hiện mật khẩu trong form đăng nhập',
        'Nút làm mới và đồng bộ trên dashboard',
        'Nút xóa trong bảng và danh sách tệp',
        'Ô tìm kiếm biến thành nút xóa nội dung',
      ],
    },
    Content: {
      name: 'Nội dung',
      title: 'Icon tệp, thư mục và người dùng động',
      intro:
        'Tệp, thư mục, sách, thư, tệp đính kèm và người dùng. Chúng gắn nhãn cho những thứ người dùng làm việc cùng, còn các biến thể thêm, bớt và đánh dấu giúp việc quản lý danh sách và thành viên nhóm có phản hồi rõ ràng hơn.',
      useCases: [
        'Trình quản lý tệp và danh sách tài liệu',
        'Nút đính kèm và sao chép vào clipboard',
        'Hộp thư đến và mục lưu trữ trong ứng dụng email',
        'Danh sách thành viên nhóm với thao tác thêm và xóa người dùng',
        'Menu chia sẻ tài liệu và liên kết',
      ],
    },
    Form: {
      name: 'Biểu mẫu',
      title: 'Icon điều khiển biểu mẫu động',
      intro:
        'Một checkbox, một radio button và một công tắc toggle chuyển động giữa trạng thái chọn và bỏ chọn. Hãy dùng chúng ở những chỗ mà input thông thường trông quá đơn điệu, như checklist onboarding hay màn hình cài đặt, mà trạng thái vẫn dễ đọc chỉ trong một cái nhìn.',
      useCases: [
        'Công tắc bật/tắt tính năng và tùy chọn trong cài đặt',
        'Checklist onboarding và danh sách việc cần làm',
        'Lựa chọn một đáp án trong khảo sát và bảng chọn gói',
        'Checkbox đồng ý điều khoản',
      ],
    },
    Media: {
      name: 'Đa phương tiện',
      title: 'Icon trình phát media động',
      intro:
        'Phát và tạm dừng, âm lượng, micro, camera, chuyển bài và phát ngẫu nhiên cho trình phát âm thanh và video. Các icon bật/tắt chuyển giữa hai trạng thái, từ phát sang tạm dừng hay từ micro sang tắt tiếng, nên nút bấm luôn cho thấy cú click tiếp theo sẽ làm gì.',
      useCases: [
        'Nút phát và tạm dừng trong trình phát âm thanh và video',
        'Nút tắt/bật tiếng trong cuộc gọi video',
        'Nút bật/tắt camera trong ứng dụng họp trực tuyến',
        'Điều khiển playlist: chuyển bài, lặp lại và phát ngẫu nhiên',
        'Nút cast và AirPlay',
        'Điều khiển trong ứng dụng podcast và nghe nhạc',
      ],
    },
    'Text editing': {
      name: 'Soạn thảo văn bản',
      title: 'Icon soạn thảo văn bản động',
      intro:
        'Icon in đậm, in nghiêng, gạch chân, căn lề và danh sách cho thanh công cụ soạn thảo rich text. Một hiệu ứng click ngắn xác nhận định dạng đã được áp dụng, rất có ích trong những trình soạn thảo mà thay đổi trên chính văn bản khó nhận ra.',
      useCases: [
        'Thanh công cụ của trình soạn thảo rich text',
        'Khung soạn bình luận và tin nhắn',
        'Trình soạn thảo CMS và bài blog',
        'Ứng dụng Markdown và ghi chú',
        'Điều khiển căn lề văn bản trong công cụ thiết kế',
      ],
    },
    Communication: {
      name: 'Liên lạc',
      title: 'Icon liên lạc động',
      intro:
        'Điện thoại, bong bóng chat, nút gửi, hộp thư thoại và RSS. Các icon cuộc gọi có đủ trạng thái gọi đến, gọi đi, gọi nhỡ và chuyển tiếp mà một nhật ký cuộc gọi cần, còn icon gửi tạo một chuyển động “tiễn” tin nhắn nho nhỏ khi click.',
      useCases: [
        'Nút gửi trong form chat và bình luận',
        'Nhật ký cuộc gọi với cuộc gọi đến, gọi đi và gọi nhỡ',
        'Nút liên hệ và hỗ trợ',
        'Nút mở widget chat',
        'Trường nhắc tên (mention) và địa chỉ email',
      ],
    },
    Devices: {
      name: 'Thiết bị',
      title: 'Icon thiết bị động',
      intro:
        'Điện thoại, máy tính bảng, màn hình, đồng hồ và máy in, cùng các chỉ báo kết nối đi kèm: wifi, Bluetooth và pin. Chúng hợp với bộ chọn thiết bị, nút chuyển chế độ xem trước responsive và trạng thái kết nối.',
      useCases: [
        'Nút chuyển chế độ xem trước responsive cho mobile, tablet và desktop',
        'Trạng thái kết nối wifi và Bluetooth',
        'Chỉ báo pin và sạc',
        'Danh sách thiết bị trong phần cài đặt bảo mật tài khoản',
        'Nút in trên hóa đơn và báo cáo',
      ],
    },
    Weather: {
      name: 'Thời tiết',
      title: 'Icon thời tiết động',
      intro:
        'Mặt trời, mặt trăng, mây, mưa, tuyết, sấm sét và gió cho dự báo thời tiết và mọi thứ thay đổi theo thời điểm trong ngày. Cặp mặt trời và mặt trăng cũng là lựa chọn tự nhiên cho nút chuyển giao diện sáng/tối.',
      useCases: [
        'Widget thời tiết và thẻ dự báo',
        'Nút chuyển giao diện sáng và tối',
        'Giờ mặt trời mọc và lặn trong ứng dụng du lịch',
        'Chỉ số nhiệt độ trên dashboard nhà thông minh',
        'Chỉ báo trạng thái năng lượng và nguồn điện',
      ],
    },
    'Maps & location': {
      name: 'Bản đồ & vị trí',
      title: 'Icon bản đồ và vị trí động',
      intro:
        'Ghim bản đồ, mũi tên chỉ đường, quả địa cầu, tâm ngắm và mỏ neo. Một chiếc ghim rơi xuống khi hover giúp trang tìm cửa hàng hay ô địa chỉ giao hàng nổi bật hơn, còn quả địa cầu dùng được làm nút chọn ngôn ngữ hoặc khu vực.',
      useCases: [
        'Trang tìm cửa hàng và ô nhập địa chỉ',
        'Nút vị trí hiện tại và chỉ đường',
        'Bộ chọn ngôn ngữ và khu vực',
        'Giao hàng và theo dõi đơn hàng',
        'Ứng dụng du lịch và đặt chỗ',
      ],
    },
    Commerce: {
      name: 'Thương mại',
      title: 'Icon thương mại điện tử động',
      intro:
        'Giỏ hàng, túi mua sắm, thẻ giá, hộp quà, thẻ tín dụng và xe giao hàng cho cửa hàng online. Hiệu ứng thêm vào giỏ xác nhận cú click mà không cần đến toast, còn icon xe tải và kiện hàng khiến trạng thái đơn hàng sinh động hơn một chút.',
      useCases: [
        'Nút thêm vào giỏ trên thẻ sản phẩm',
        'Nút giỏ hàng trên header của cửa hàng',
        'Thanh toán và chọn phương thức thanh toán',
        'Badge giảm giá, mã khuyến mãi và sale',
        'Các bước giao hàng và theo dõi đơn',
        'Thẻ quà tặng và tùy chọn gói quà',
      ],
    },
    Charts: {
      name: 'Biểu đồ',
      title: 'Icon biểu đồ động',
      intro:
        'Biểu đồ cột, biểu đồ tròn và mũi tên xu hướng cho phân tích và báo cáo. Icon xu hướng tăng và giảm cho thấy ngay một chỉ số đã tăng hay giảm, rất hợp với thẻ KPI và nhật ký thay đổi các con số.',
      useCases: [
        'Thẻ KPI với chỉ số tăng hoặc giảm',
        'Mục điều hướng tới trang phân tích và báo cáo',
        'Trạng thái trống của dashboard',
        'Tổng quan tài chính và danh mục đầu tư',
      ],
    },
    Development: {
      name: 'Lập trình',
      title: 'Icon lập trình động',
      intro:
        'Dấu ngoặc code, terminal, nhánh Git, commit, merge và pull request, cùng server và database. Được làm cho công cụ lập trình, trang tài liệu và trang trạng thái, nơi các khái niệm về Git và hạ tầng là một phần của giao diện.',
      useCases: [
        'Trạng thái pull request, merge và nhánh trong công cụ lập trình',
        'Nút chèn code snippet và embed trong tài liệu',
        'Phần giới thiệu terminal và CLI trên landing page',
        'Tình trạng server và database trên trang trạng thái',
        'Gợi ý phím tắt có phím Command',
      ],
    },
    'Design & layout': {
      name: 'Thiết kế & bố cục',
      title: 'Icon thiết kế và bố cục động',
      intro:
        'Icon lưới, cột, layer, cắt ảnh, công cụ bút và con trỏ cho trình chỉnh sửa và trình dựng trang. Chúng hợp với thanh công cụ nơi người dùng sắp xếp nội dung, chuyển giữa dạng lưới và dạng bảng, hoặc chọn một công cụ vẽ.',
      useCases: [
        'Nút chuyển dạng xem lưới, danh sách và bảng',
        'Bảng layer trong công cụ thiết kế và làm slide',
        'Công cụ cắt và crop trong trình sửa ảnh',
        'Trình dựng trang và bộ chọn bố cục',
        'Tay nắm kéo để di chuyển',
      ],
    },
    'Shapes & math': {
      name: 'Hình khối & toán học',
      title: 'Icon hình khối và toán học động',
      intro:
        'Hình tròn, hình vuông, tam giác, lục giác, một hình bát giác và dấu chia. Dùng chúng làm công cụ vẽ hình trong ứng dụng vẽ, làm phép toán trong máy tính, hoặc làm ký hiệu trung tính trong sơ đồ và các bước onboarding.',
      useCases: [
        'Công cụ vẽ hình trong ứng dụng whiteboard và vẽ',
        'Phép toán trong máy tính và trình soạn công thức',
        'Ký hiệu đầu dòng và đánh dấu bước trong sơ đồ',
        'Giao diện trắc nghiệm và trò chơi',
      ],
    },
    Loading: {
      name: 'Loading',
      title: 'Icon loading động',
      intro:
        'Spinner và loader lặp liên tục trong suốt thời gian một tác vụ đang chạy. Đặt một icon trong nút submit khi request đang xử lý, thay chỗ cho nội dung chưa tải xong, hoặc trên màn hình splash toàn trang; chúng đứng yên khi người dùng bật chế độ giảm chuyển động.',
      useCases: [
        'Nút submit đang chờ request',
        'Placeholder trong lúc danh sách hoặc biểu đồ đang tải',
        'Chỉ báo infinite scroll và nút tải thêm',
        'Màn hình splash toàn trang và chuyển route',
        'Tiến trình tải lên và xử lý tệp',
      ],
    },
    'Social media': {
      name: 'Mạng xã hội',
      title: 'Icon mạng xã hội động',
      intro:
        'Icon thương hiệu của các mạng xã hội và những công cụ mà lập trình viên, designer dùng để chia sẻ sản phẩm: X, Instagram, YouTube, Discord, Telegram, Figma và nhiều hơn nữa. Chúng chuyển động khi hover, giúp các liên kết ở footer và trang hồ sơ trông rõ là có thể click.',
      useCases: [
        'Liên kết mạng xã hội ở footer website',
        'Nút chia sẻ trên bài blog',
        'Liên kết hồ sơ tác giả và thành viên nhóm',
        'Nút mời tham gia server chat cộng đồng',
        'Đăng nhập bằng tài khoản mạng xã hội hoặc tài khoản lập trình viên',
      ],
    },
    Other: {
      name: 'Khác',
      title: 'Icon động khác',
      intro:
        'Những icon không thuộc nhóm lớn nào: khuôn mặt emoji để lấy phản hồi, tách cà phê, đồng hồ, đường nhịp tim và gợi ý cuộn xuống. Icon cuộn xuống là gợi ý quen thuộc ở phần hero rằng bên dưới vẫn còn nội dung.',
      useCases: [
        'Gợi ý cuộn xuống ở cuối phần hero',
        'Khuôn mặt vui, bình thường và buồn trong widget phản hồi',
        'Chỉ báo hoạt động và uptime',
        'Giờ mở cửa và bộ chọn thời gian',
        'Liên kết buy-me-a-coffee và ủng hộ',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Lặp',
      title: 'Icon động lặp liên tục',
      intro:
        'Những icon này phát liên tục chừng nào còn hiển thị trên màn hình, nên hợp với các trạng thái kéo dài: đang tải, một cảnh báo đang hoạt động, terminal đang chờ. Khi người dùng bật giảm chuyển động, chúng dừng ở khung hình đầu tiên và vẫn đọc được như một icon bình thường.',
      useCases: [
        'Spinner loading và chỉ báo tiến trình',
        'Trạng thái cảnh báo và lỗi đang diễn ra',
        'Chỉ báo đang phát trực tiếp và đang ghi',
        'Gợi ý cuộn xuống ở phần hero',
        'Dấu hiệu gây chú ý cho thông báo mới',
      ],
      example:
        'Icon lặp thường dùng cho spinner loading, cảnh báo đang hoạt động, chuông đang rung hoặc gợi ý cuộn xuống.',
      description:
        'Phát liên tục; đứng yên ở khung hình tĩnh đầu tiên khi người dùng bật giảm chuyển động.',
      reducedMotion:
        'Khi người dùng bật giảm chuyển động, icon không tự phát mà đứng yên ở khung hình tĩnh đầu tiên.',
      plays: 'lặp liên tục',
    },
    'click-toggle': {
      label: 'Click bật/tắt',
      title: 'Icon động bật/tắt khi click',
      intro:
        'Mỗi cú click làm icon chuyển động sang trạng thái còn lại và dừng ở đó, nên chúng chính là phần hình ảnh của một nút bật/tắt. Icon luôn thể hiện trạng thái hiện tại; chỉ cần kết hợp với aria-pressed hoặc thuộc tính checked là nút bấm tự nói lên chức năng của nó.',
      useCases: [
        'Nút tắt/bật tiếng',
        'Ô mật khẩu có nút ẩn/hiện',
        'Nút menu hamburger và nút đóng',
        'Nút phát và tạm dừng',
        'Nút thích, gắn sao và đánh dấu',
        'Checkbox, radio button và công tắc',
      ],
      example:
        'Icon bật/tắt khi click thường dùng cho các nút tắt/bật tiếng, ẩn/hiện mật khẩu, menu/đóng, phát/tạm dừng và thích.',
      description:
        'Chuyển giữa hai trạng thái khi click, hoặc chuyển ngay lập tức khi người dùng bật giảm chuyển động.',
      reducedMotion:
        'Khi người dùng bật giảm chuyển động, cú click chuyển ngay sang trạng thái còn lại, bỏ qua hiệu ứng ở giữa.',
      plays: 'chuyển giữa hai trạng thái khi click',
    },
    'click-replay': {
      label: 'Click phát lại',
      title: 'Icon động khi click',
      intro:
        'Những icon này phát lại từ đầu sau mỗi lần được click, như một lời xác nhận nhỏ rằng thao tác đã thành công. Chúng hợp với các thao tác một lần, không để lại trạng thái: gửi, lưu, làm mới, tải xuống, in hoặc xóa.',
      useCases: [
        'Nút gửi trong form chat và bình luận',
        'Nút lưu, tải xuống và tải lên',
        'Nút làm mới và xoay',
        'Nút thêm vào giỏ',
        'Nút định dạng văn bản trong trình soạn thảo',
      ],
      example:
        'Icon động khi click thường xác nhận các nút gửi, lưu, làm mới, tải xuống, thêm vào giỏ và định dạng văn bản.',
      description:
        'Phát lại một lần từ đầu sau mỗi lần click, trừ khi người dùng bật giảm chuyển động.',
      reducedMotion:
        'Khi người dùng bật giảm chuyển động, cú click vẫn đến được handler của bạn nhưng hiệu ứng không phát.',
      plays: 'phát lại sau mỗi lần click',
    },
    hover: {
      label: 'Hover',
      title: 'Icon động khi hover',
      intro:
        'Những icon này phát xuôi khi con trỏ đi vào và chạy ngược lại khi con trỏ rời đi, nên chuyển động luôn bám theo con trỏ và không bao giờ dừng lửng giữa chừng. Chúng hợp với mục điều hướng và nút bấm cần gợi ý trước nội dung sẽ mở ra: nắp thùng rác nhấc lên, bánh răng cài đặt xoay, thư mục mở ra.',
      useCases: [
        'Mục menu trong sidebar và thanh điều hướng',
        'Nút xóa nhấc nắp thùng rác trước khi click',
        'Liên kết cài đặt và hồ sơ',
        'Nút phóng to và thu nhỏ',
        'Liên kết mạng xã hội ở footer',
      ],
      example:
        'Icon động khi hover thường dùng cho mục điều hướng, nút xóa, cài đặt, nút phóng to/thu nhỏ và liên kết mạng xã hội.',
      description:
        'Phát xuôi khi con trỏ đi vào (mouseenter) và phát ngược khi con trỏ rời đi (mouseleave).',
      reducedMotion: 'Khi người dùng bật giảm chuyển động, hover không phát hiệu ứng.',
      plays: 'phát khi hover và chạy ngược khi rời chuột',
    },
    'hover-replay': {
      label: 'Hover phát lại',
      title: 'Icon động phát khi hover',
      intro:
        'Những icon này phát một lần khi con trỏ đi vào và tự chạy hết, nhờ vậy việc lướt chuột nhanh qua thanh công cụ không biến thành một loạt chuyển động giật cục. Phần lớn bộ icon hoạt động theo cách này: mũi tên, tệp, thiết bị, thời tiết và icon thương hiệu bừng lên khi hover.',
      useCases: [
        'Danh sách tính năng và bảng giá',
        'Liên kết mũi tên và nút kêu gọi hành động',
        'Nút trên thanh công cụ của trình soạn thảo và dashboard',
        'Thẻ trong lưới của landing page',
        'Liên kết ở footer và trang liên hệ',
      ],
      example:
        'Icon phát khi hover thường làm sinh động liên kết mũi tên, danh sách tính năng, nút trên thanh công cụ và thẻ trên landing page.',
      description:
        'Phát một lần khi con trỏ đi vào (mouseenter), trừ khi người dùng bật giảm chuyển động. Rời chuột không làm hiệu ứng dừng; hover lại trong lúc đang phát cũng không khởi động lại.',
      reducedMotion: 'Khi người dùng bật giảm chuyển động, hover không phát hiệu ứng.',
      plays: 'phát một lần khi hover',
    },
    'hover-loop': {
      label: 'Hover lặp',
      title: 'Icon động lặp khi hover',
      intro:
        'Những icon này lặp liên tục khi con trỏ còn nằm trên chúng và chạy nốt chu kỳ hiện tại sau khi con trỏ rời đi, nên không bao giờ dừng giữa chừng. Chúng hợp với các liên kết mời người dùng nán lại lâu hơn, chủ yếu là icon mạng xã hội và cộng đồng.',
      useCases: [
        'Liên kết mạng xã hội ở header và footer',
        'Nút mời tham gia cộng đồng và nhóm chat',
        'Liên kết portfolio và hồ sơ',
        'Bộ chọn ngôn ngữ và khu vực',
      ],
      example:
        'Icon lặp khi hover thường dùng cho liên kết mạng xã hội, lời mời tham gia cộng đồng, liên kết portfolio và bộ chọn ngôn ngữ.',
      description:
        'Lặp khi đang hover, chạy nốt chu kỳ hiện tại sau khi con trỏ rời đi (mouseleave) và đứng yên khi người dùng bật giảm chuyển động.',
      reducedMotion: 'Khi người dùng bật giảm chuyển động, icon đứng yên khi hover.',
      plays: 'lặp khi được hover',
    },
  },
};
