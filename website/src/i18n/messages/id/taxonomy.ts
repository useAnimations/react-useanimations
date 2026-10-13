import type { Messages } from '../en';

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Peringatan',
      title: 'Ikon animasi peringatan',
      intro:
        'Segitiga peringatan, lingkaran alert, dan rambu stop yang berdenyut cukup untuk menarik perhatian tanpa berkedip-kedip. Taruh di samping field formulir yang gagal divalidasi, di awal banner error, atau di kolom status, tempat ikon diam mudah terlewat saat menggulir.',
      useCases: [
        'Pesan error validasi di bawah field formulir',
        'Banner error dan peringatan di bagian atas halaman',
        'Baris yang gagal di tabel status deploy atau job',
        'Dialog konfirmasi untuk aksi yang menghapus data',
        'Halaman status sistem saat terjadi insiden',
      ],
    },
    Notifications: {
      name: 'Notifikasi',
      title: 'Ikon animasi lonceng notifikasi',
      intro:
        'Ikon lonceng yang berdering saat ada aktivitas baru atau beralih antara bell dan bell-off. Ayunan singkat pada lonceng menarik mata ke jumlah notifikasi yang belum dibaca, dan versi toggle-nya sekaligus bisa menjadi tombol bisukan untuk channel atau thread.',
      useCases: [
        'Tombol pusat notifikasi di header aplikasi',
        'Badge belum dibaca yang berdering saat pesan baru masuk',
        'Sakelar bisukan dan aktifkan suara untuk channel atau thread',
        'Pengaturan notifikasi email dan push',
        'Tombol berlangganan pengingat dan peringatan',
      ],
    },
    Navigation: {
      name: 'Navigasi',
      title: 'Ikon animasi navigasi dan panah',
      intro:
        'Menu hamburger yang berubah menjadi tombol tutup, serta panah, chevron, dan panah sudut yang bergeser sedikit ke arahnya saat di-hover. Ikon ini memperjelas ke mana sebuah kontrol membawa pengguna: membuka drawer, kembali, membentangkan baris, atau keluar dari situs.',
      useCases: [
        'Menu hamburger yang berubah menjadi tombol tutup di mobile',
        'Tombol sebelumnya dan berikutnya di carousel dan paginasi',
        'Chevron pada accordion dan dropdown',
        'Petunjuk kembali ke atas dan gulir ke bawah',
        'Tautan masuk dan keluar akun',
        'Penanda tautan eksternal dan toggle sidebar',
      ],
    },
    Action: {
      name: 'Aksi',
      title: 'Ikon animasi aksi',
      intro:
        'Kata kerja sebuah antarmuka: simpan, hapus, unduh, muat ulang, suka, bookmark, cari, dan pengaturan. Setiap ikon mengonfirmasi klik atau hover yang menjadi pemicunya, jadi hati terisi saat Anda menyukai postingan dan tutup tempat sampah terangkat sebelum Anda menghapus.',
      useCases: [
        'Tombol suka, favorit, dan bookmark di kartu',
        'Tombol unduh, unggah, dan simpan yang mengonfirmasi aksinya',
        'Toggle tampilkan dan sembunyikan kata sandi di formulir login',
        'Tombol muat ulang dan sinkronisasi di dashboard',
        'Tombol hapus di tabel dan daftar file',
        'Field pencarian yang berubah menjadi tombol hapus teks',
      ],
    },
    Content: {
      name: 'Konten',
      title: 'Ikon animasi file, folder, dan pengguna',
      intro:
        'File, folder, buku, surat, lampiran, dan orang. Ikon ini menandai hal-hal yang dikerjakan pengguna, dan varian tambah, hapus, serta centang membuat pengelolaan daftar dan tim terasa responsif.',
      useCases: [
        'Pengelola file dan daftar dokumen',
        'Tombol lampiran dan salin ke clipboard',
        'Tampilan kotak masuk dan arsip di aplikasi email',
        'Daftar anggota tim dengan aksi tambah dan hapus pengguna',
        'Menu berbagi untuk dokumen dan tautan',
      ],
    },
    Form: {
      name: 'Formulir',
      title: 'Ikon animasi kontrol formulir',
      intro:
        'Checkbox, radio button, dan toggle switch yang beranimasi saat berpindah antara keadaan tercentang dan tidak tercentang. Pakai di tempat input biasa terasa datar, misalnya checklist onboarding dan layar pengaturan, sambil tetap menjaga keadaannya mudah dibaca sekilas.',
      useCases: [
        'Sakelar pengaturan untuk fitur dan preferensi',
        'Checklist onboarding dan daftar tugas',
        'Pilihan tunggal di survei dan pemilih paket',
        'Checkbox persetujuan syarat dan ketentuan',
      ],
    },
    Media: {
      name: 'Media',
      title: 'Ikon animasi pemutar media',
      intro:
        'Play dan pause, volume, mikrofon, kamera, skip, dan shuffle untuk pemutar audio dan video. Ikon toggle beralih di antara dua keadaannya, dari play ke pause atau dari mikrofon ke bisu, sehingga tombol selalu menunjukkan apa yang akan terjadi saat diklik.',
      useCases: [
        'Tombol play dan pause di pemutar audio dan video',
        'Kontrol bisukan dan aktifkan suara di panggilan video',
        'Toggle kamera nyala dan mati di aplikasi rapat',
        'Kontrol playlist untuk skip, ulangi, dan acak',
        'Tombol casting dan AirPlay',
        'Kontrol aplikasi podcast dan musik',
      ],
    },
    'Text editing': {
      name: 'Pengeditan teks',
      title: 'Ikon animasi pengeditan teks',
      intro:
        'Ikon tebal, miring, garis bawah, perataan, dan daftar untuk toolbar rich text. Animasi klik yang singkat mengonfirmasi bahwa format sudah diterapkan, yang membantu di editor ketika perubahan pada teksnya sendiri nyaris tak terlihat.',
      useCases: [
        'Toolbar editor rich text',
        'Kolom penulisan komentar dan pesan',
        'Editor CMS dan postingan blog',
        'Aplikasi Markdown dan pencatatan',
        'Kontrol perataan teks di aplikasi desain',
      ],
    },
    Communication: {
      name: 'Komunikasi',
      title: 'Ikon animasi komunikasi',
      intro:
        'Telepon, balon chat, tombol kirim, pesan suara, dan RSS. Ikon telepon mencakup keadaan panggilan masuk, keluar, tak terjawab, dan diteruskan yang dibutuhkan riwayat panggilan, sementara ikon kirim memberi sedikit gerakan pelepasan saat pesan dikirim.',
      useCases: [
        'Tombol kirim di formulir chat dan komentar',
        'Riwayat panggilan masuk, keluar, dan tak terjawab',
        'Tombol kontak dan dukungan',
        'Peluncur widget chat',
        'Field mention dan alamat email',
      ],
    },
    Devices: {
      name: 'Perangkat',
      title: 'Ikon animasi perangkat',
      intro:
        'Ponsel, tablet, monitor, jam tangan, dan printer, plus indikator koneksi di sekitarnya: wifi, Bluetooth, dan baterai. Cocok untuk pemilih perangkat, pengalih pratinjau responsif, dan status konektivitas.',
      useCases: [
        'Pengalih pratinjau responsif untuk mobile, tablet, dan desktop',
        'Status koneksi wifi dan Bluetooth',
        'Indikator baterai dan pengisian daya',
        'Daftar perangkat di pengaturan keamanan akun',
        'Tombol cetak di invoice dan laporan',
      ],
    },
    Weather: {
      name: 'Cuaca',
      title: 'Ikon animasi cuaca',
      intro:
        'Matahari, bulan, awan, hujan, salju, petir, dan angin untuk prakiraan cuaca dan apa pun yang mengikuti waktu dalam sehari. Matahari dan bulan juga pas sebagai sakelar light mode dan dark mode.',
      useCases: [
        'Widget cuaca dan kartu prakiraan',
        'Sakelar tema terang dan gelap',
        'Waktu matahari terbit dan terbenam di aplikasi perjalanan',
        'Pembacaan suhu di dashboard rumah pintar',
        'Indikator status energi dan daya',
      ],
    },
    'Maps & location': {
      name: 'Peta & lokasi',
      title: 'Ikon animasi peta dan lokasi',
      intro:
        'Pin peta, panah navigasi, globe, target, dan jangkar. Pin yang jatuh saat di-hover membuat pencari lokasi toko atau alamat pengiriman lebih menonjol, dan globe cocok sebagai pengalih bahasa atau wilayah.',
      useCases: [
        'Pencari lokasi toko dan field alamat',
        'Tombol lokasi saat ini dan petunjuk arah',
        'Pemilih bahasa dan wilayah',
        'Pelacakan pengiriman dan pesanan',
        'Aplikasi perjalanan dan pemesanan',
      ],
    },
    Commerce: {
      name: 'E-commerce',
      title: 'Ikon animasi e-commerce',
      intro:
        'Keranjang belanja, tas, label harga, hadiah, kartu kredit, dan truk pengiriman untuk toko online. Animasi tambah ke keranjang mengonfirmasi klik tanpa perlu toast, dan ikon truk serta paket membuat status pesanan sedikit lebih hidup.',
      useCases: [
        'Tombol tambah ke keranjang di kartu produk',
        'Tombol keranjang dan tas di header toko',
        'Checkout dan pemilihan metode pembayaran',
        'Badge diskon, kupon, dan promo',
        'Tahapan pengiriman dan pelacakan pesanan',
        'Pilihan kartu hadiah dan bungkus kado',
      ],
    },
    Charts: {
      name: 'Grafik',
      title: 'Ikon animasi grafik',
      intro:
        'Grafik batang, diagram lingkaran, dan panah tren untuk analitik dan pelaporan. Ikon trending-up dan trending-down menunjukkan sekilas apakah sebuah metrik naik atau turun, cocok untuk kartu KPI dan riwayat perubahan angka.',
      useCases: [
        'Kartu KPI dengan metrik yang naik atau turun',
        'Item navigasi analitik dan laporan',
        'Empty state dashboard',
        'Ringkasan keuangan dan portofolio',
      ],
    },
    Development: {
      name: 'Pengembangan',
      title: 'Ikon animasi developer',
      intro:
        'Kurung kode, terminal, branch Git, commit, merge, dan pull request, plus server dan database. Dibuat untuk developer tools, situs dokumentasi, dan halaman status yang antarmukanya memang memakai istilah Git dan infrastruktur.',
      useCases: [
        'Status pull request, merge, dan branch di developer tools',
        'Tombol cuplikan kode dan embed di dokumentasi',
        'Bagian terminal dan CLI di landing page',
        'Kesehatan server dan database di halaman status',
        'Petunjuk pintasan keyboard dengan tombol Command',
      ],
    },
    'Design & layout': {
      name: 'Desain & tata letak',
      title: 'Ikon animasi desain dan tata letak',
      intro:
        'Ikon grid, kolom, layer, crop, pen tool, dan kursor untuk editor dan builder. Cocok untuk toolbar tempat pengguna menata konten, beralih antara tampilan grid dan tabel, atau memilih alat gambar.',
      useCases: [
        'Pengalih tampilan grid, daftar, dan tabel',
        'Panel layer di aplikasi desain dan presentasi',
        'Alat crop dan potong di editor gambar',
        'Page builder dan pemilih tata letak',
        'Handle untuk drag-to-move',
      ],
    },
    'Shapes & math': {
      name: 'Bentuk & matematika',
      title: 'Ikon animasi bentuk dan matematika',
      intro:
        'Lingkaran, persegi, segitiga, segi enam, segi delapan, dan tanda bagi. Pakai sebagai alat bentuk di aplikasi gambar, sebagai operator kalkulator, atau sebagai penanda netral di diagram dan langkah onboarding.',
      useCases: [
        'Alat bentuk di aplikasi whiteboard dan gambar',
        'Operator di kalkulator dan editor rumus',
        'Penanda poin dan langkah di diagram',
        'Antarmuka kuis dan game',
      ],
    },
    Loading: {
      name: 'Loading',
      title: 'Ikon animasi loading',
      intro:
        'Spinner dan loader yang terus berputar selama proses masih berjalan. Taruh di dalam tombol submit selama request berlangsung, di tempat konten yang masih dimuat, atau di splash screen layar penuh; ikon ini diam saat pengguna memilih reduced motion.',
      useCases: [
        'Tombol submit yang menunggu respons request',
        'Placeholder saat daftar atau grafik sedang dimuat',
        'Indikator infinite scroll dan muat lebih banyak',
        'Splash screen layar penuh dan transisi antarhalaman',
        'Progres unggah dan pemrosesan file',
      ],
    },
    'Social media': {
      name: 'Media sosial',
      title: 'Ikon animasi media sosial',
      intro:
        'Ikon merek untuk jejaring sosial dan platform tempat developer dan desainer berbagi karya: X, Instagram, YouTube, Discord, Telegram, Figma, dan lainnya. Ikon ini beranimasi saat di-hover, sehingga tautan di footer dan profil terasa bisa diklik.',
      useCases: [
        'Tautan media sosial di footer situs',
        'Tombol berbagi di postingan blog',
        'Tautan profil penulis dan tim',
        'Tombol undangan komunitas untuk server chat',
        'Masuk dengan akun media sosial atau akun developer',
      ],
    },
    Other: {
      name: 'Lainnya',
      title: 'Ikon animasi lainnya',
      intro:
        'Ikon yang tidak masuk ke kelompok yang lebih besar: wajah emoji untuk umpan balik, cangkir kopi, jam, garis denyut, dan petunjuk gulir ke bawah. Ikon gulir ke bawah adalah petunjuk umum di bagian hero bahwa masih ada konten di bawahnya.',
      useCases: [
        'Petunjuk gulir ke bawah di bagian bawah hero section',
        'Wajah senang, netral, dan sedih di widget umpan balik',
        'Indikator aktivitas dan uptime',
        'Jam buka dan pemilih waktu',
        'Tautan Buy Me a Coffee dan dukungan',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Loop',
      title: 'Ikon animasi loop',
      intro:
        'Ikon ini berputar terus selama tampil di layar, sehingga cocok untuk keadaan yang berlangsung lama: sesuatu sedang dimuat, sebuah peringatan sedang aktif, terminal sedang menunggu. Jika pengguna memilih reduced motion, ikon berhenti di frame pertamanya dan tetap terbaca sebagai ikon biasa.',
      useCases: [
        'Spinner loading dan indikator progres',
        'Keadaan peringatan dan error yang sedang aktif',
        'Indikator live dan rekaman',
        'Petunjuk gulir ke bawah di hero section',
        'Penanda perhatian untuk notifikasi baru',
      ],
      example:
        'Ikon loop biasanya dipakai untuk spinner loading, peringatan yang aktif, lonceng yang berdering, atau petunjuk gulir ke bawah.',
      description:
        'Berputar terus-menerus; jika reduced motion dipilih, ikon tetap diam di frame pertama.',
      reducedMotion:
        'Jika pengguna memilih reduced motion, ikon tidak berputar otomatis dan tetap diam di frame pertamanya.',
      plays: 'berputar terus-menerus',
    },
    'click-toggle': {
      label: 'Toggle saat klik',
      title: 'Ikon animasi toggle saat diklik',
      intro:
        'Setiap klik menganimasikan ikon ke keadaan lainnya dan ikon tetap di sana, sehingga ikon ini menjadi bagian visual dari kontrol nyala/mati. Ikon selalu menunjukkan keadaan saat ini; pasangkan dengan aria-pressed atau atribut checked, dan tombolnya sudah menjelaskan dirinya sendiri.',
      useCases: [
        'Tombol bisukan dan aktifkan suara',
        'Field tampilkan dan sembunyikan kata sandi',
        'Tombol menu hamburger dan tutup',
        'Kontrol play dan pause',
        'Toggle suka, bintang, dan bookmark',
        'Checkbox, radio button, dan switch',
      ],
      example:
        'Ikon toggle saat diklik biasanya dipakai untuk tombol bisukan/aktifkan suara, tampilkan/sembunyikan kata sandi, menu/tutup, play/pause, dan suka.',
      description:
        'Beralih antara dua keadaan saat diklik, atau langsung berpindah jika reduced motion dipilih.',
      reducedMotion:
        'Jika pengguna memilih reduced motion, klik langsung memindahkan ikon ke keadaan lainnya tanpa animasi peralihan.',
      plays: 'beralih antara dua keadaan saat diklik',
    },
    'click-replay': {
      label: 'Putar ulang saat klik',
      title: 'Ikon animasi klik',
      intro:
        'Ikon ini diputar sekali dari awal setiap kali diklik, sebagai konfirmasi kecil bahwa aksinya berhasil. Cocok untuk aksi sekali jalan yang tidak meninggalkan keadaan apa pun: kirim, simpan, muat ulang, unduh, cetak, atau hapus.',
      useCases: [
        'Tombol kirim di formulir chat dan komentar',
        'Tombol simpan, unduh, dan unggah',
        'Tombol muat ulang dan putar',
        'Tombol tambah ke keranjang',
        'Tombol format teks di editor',
      ],
      example:
        'Ikon klik biasanya mengonfirmasi tombol kirim, simpan, muat ulang, unduh, tambah ke keranjang, dan format teks.',
      description:
        'Diputar ulang sekali dari awal setiap kali diklik, kecuali jika reduced motion dipilih.',
      reducedMotion:
        'Jika pengguna memilih reduced motion, klik tetap sampai ke handler Anda, tetapi animasinya tidak diputar.',
      plays: 'diputar ulang setiap kali diklik',
    },
    hover: {
      label: 'Hover',
      title: 'Ikon animasi hover',
      intro:
        'Ikon ini diputar maju saat pointer masuk dan berjalan mundur saat pointer keluar, sehingga gerakannya mengikuti kursor dan tidak pernah berhenti di tengah jalan. Cocok untuk item navigasi dan tombol yang memberi petunjuk tentang apa yang akan dibukanya: tutup tempat sampah terangkat, roda gigi pengaturan berputar, folder terbuka.',
      useCases: [
        'Item sidebar dan menu navigasi',
        'Tombol hapus yang mengangkat tutupnya sebelum diklik',
        'Tautan pengaturan dan profil',
        'Kontrol zoom in dan zoom out',
        'Tautan media sosial di footer',
      ],
      example:
        'Ikon hover biasanya menandai item navigasi, tombol hapus, pengaturan, kontrol zoom, dan tautan media sosial.',
      description: 'Diputar maju saat mouseenter dan mundur saat mouseleave.',
      reducedMotion: 'Jika pengguna memilih reduced motion, hover tidak memutar animasinya.',
      plays: 'diputar saat di-hover dan berbalik saat kursor keluar',
    },
    'hover-replay': {
      label: 'Putar sekali saat hover',
      title: 'Ikon animasi yang diputar saat hover',
      intro:
        'Ikon ini diputar sekali saat pointer masuk dan selesai dengan sendirinya, sehingga kursor yang melintas cepat di atas toolbar tidak menghasilkan gerakan yang patah-patah. Sebagian besar ikon di koleksi ini bekerja dengan cara ini: panah, file, perangkat, cuaca, dan ikon merek yang menjadi hidup saat di-hover.',
      useCases: [
        'Daftar fitur dan tabel harga',
        'Tautan panah dan tombol call-to-action',
        'Tombol toolbar di editor dan dashboard',
        'Kartu di grid landing page',
        'Tautan footer dan kontak',
      ],
      example:
        'Ikon yang diputar saat hover biasanya menghidupkan tautan panah, daftar fitur, tombol toolbar, dan kartu landing page.',
      description:
        'Diputar sekali saat mouseenter, kecuali jika reduced motion dipilih. Keluar dari ikon tidak menghentikannya, dan masuk lagi selama animasi berjalan tidak memulainya ulang.',
      reducedMotion: 'Jika pengguna memilih reduced motion, hover tidak memutar animasinya.',
      plays: 'diputar sekali saat di-hover',
    },
    'hover-loop': {
      label: 'Loop saat hover',
      title: 'Ikon animasi loop saat hover',
      intro:
        'Ikon ini berputar berulang selama pointer berada di atasnya dan menyelesaikan siklus yang sedang berjalan setelah pointer keluar, sehingga tidak pernah berhenti di tengah gerakan. Cocok untuk tautan yang mengundang pengguna berlama-lama, kebanyakan ikon media sosial dan komunitas.',
      useCases: [
        'Tautan media sosial di header dan footer',
        'Tombol undangan komunitas dan chat',
        'Tautan portofolio dan profil',
        'Pemilih bahasa dan wilayah',
      ],
      example:
        'Ikon loop saat hover biasanya menandai tautan media sosial, undangan komunitas, tautan portofolio, dan pemilih bahasa.',
      description:
        'Berputar berulang selama di-hover, menyelesaikan siklusnya setelah mouseleave, dan tetap diam jika reduced motion dipilih.',
      reducedMotion: 'Jika pengguna memilih reduced motion, ikon tetap diam saat di-hover.',
      plays: 'berputar berulang selama di-hover',
    },
  },
};
