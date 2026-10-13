import type { Messages } from '../en';

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Uyarılar',
      title: 'Animasyonlu uyarı ikonları',
      intro:
        'Yanıp sönmeden, tam fark edilecek kadar hafifçe atan uyarı üçgenleri, uyarı daireleri ve dur işaretleri. Hatalı bir form alanının yanına, bir hata banner’ının başına ya da durum sütununa koyun; sabit bir ikonu kaydırırken gözden kaçırmak kolaydır.',
      useCases: [
        'Form alanlarının altındaki satır içi doğrulama hataları',
        'Sayfanın üstündeki hata ve uyarı banner’ları',
        'Deploy ya da iş durumu tablolarındaki başarısız satırlar',
        'Geri alınamaz işlemler için onay diyalogları',
        'Bir kesinti sırasında sistem durum sayfaları',
      ],
    },
    Notifications: {
      name: 'Bildirimler',
      title: 'Animasyonlu bildirim zili ikonları',
      intro:
        'Yeni bir hareket olduğunda çalan ya da zil ile sessiz zil arasında geçiş yapan zil ikonları. Zilin kısa bir sallanışı gözü okunmamış sayısına çeker; geçiş yapan sürümler aynı zamanda bir kanalın ya da konunun sessize alma düğmesi olarak işe yarar.',
      useCases: [
        'Uygulama başlığındaki bildirim merkezi düğmesi',
        'Yeni mesaj geldiğinde çalan okunmamış rozeti',
        'Bir kanal ya da konu için sessize alma ve sesi açma anahtarı',
        'E-posta ve push bildirimi ayarları',
        'Hatırlatıcı ve uyarı abonelik düğmeleri',
      ],
    },
    Navigation: {
      name: 'Navigasyon',
      title: 'Animasyonlu navigasyon ve ok ikonları',
      intro:
        'Kapatma düğmesine dönüşen hamburger menüler; hover’da kendi yönüne doğru hafifçe kayan oklar, chevron’lar ve köşe okları. Bir kontrolün nereye götürdüğünü açıkça gösterirler: çekmeceyi aç, geri dön, satırı genişlet, siteden çık.',
      useCases: [
        'Mobilde kapatma düğmesine dönüşen hamburger menü',
        'Carousel ve sayfalamada önceki ve sonraki düğmeleri',
        'Accordion ve açılır menü chevron’ları',
        'Başa dön ve aşağı kaydır ipuçları',
        'Giriş ve çıkış bağlantıları',
        'Harici bağlantı işaretleri ve kenar çubuğu açma/kapama düğmeleri',
      ],
    },
    Action: {
      name: 'Eylemler',
      title: 'Animasyonlu eylem ikonları',
      intro:
        'Arayüzün fiilleri: kaydet, sil, indir, yenile, beğen, yer imine ekle, ara ve ayarlar. Her biri ait olduğu tıklamayı ya da hover’ı onaylar; bir gönderiyi beğendiğinizde kalp dolar, silmeden önce çöp kutusunun kapağı kalkar.',
      useCases: [
        'Kartlardaki beğen, favori ve yer imi düğmeleri',
        'İşlemi onaylayan indir, yükle ve kaydet düğmeleri',
        'Giriş formunda şifreyi göster ve gizle düğmesi',
        'Dashboard’lardaki yenile ve senkronize et düğmeleri',
        'Tablolarda ve dosya listelerinde sil düğmeleri',
        'Temizle düğmesine dönüşen arama alanı',
      ],
    },
    Content: {
      name: 'İçerik',
      title: 'Animasyonlu dosya, klasör ve kullanıcı ikonları',
      intro:
        'Dosyalar, klasörler, kitaplar, posta, ekler ve kişiler. Kullanıcının üzerinde çalıştığı şeyleri etiketlerler; ekleme, çıkarma ve onay varyantları da liste ve ekip yönetimini daha canlı hissettirir.',
      useCases: [
        'Dosya yöneticileri ve belge listeleri',
        'Ek ve panoya kopyala düğmeleri',
        'E-posta istemcilerinde gelen kutusu ve arşiv görünümleri',
        'Kullanıcı ekleme ve çıkarma işlemleri olan ekip üyesi listeleri',
        'Belgeler ve bağlantılar için paylaşım menüleri',
      ],
    },
    Form: {
      name: 'Form',
      title: 'Animasyonlu form kontrolü ikonları',
      intro:
        'İşaretli ve işaretsiz durumları arasında animasyonla geçen bir onay kutusu, bir radyo düğmesi ve bir toggle switch. Sıradan bir input’un yavan kaldığı yerlerde, örneğin onboarding kontrol listelerinde ve ayar ekranlarında kullanın; durum yine tek bakışta okunur.',
      useCases: [
        'Özellikler ve tercihler için ayar anahtarları',
        'Onboarding ve yapılacaklar kontrol listeleri',
        'Anketlerde ve plan seçicilerde tek seçimli seçenekler',
        'Kullanım koşulları ve onay kutuları',
      ],
    },
    Media: {
      name: 'Medya',
      title: 'Animasyonlu medya oynatıcı ikonları',
      intro:
        'Ses ve video oynatıcılar için oynat ve duraklat, ses düzeyi, mikrofon, kamera, atla ve karıştır. Geçiş yapan ikonlar iki durumu arasında değişir (oynattan duraklata ya da mikrofondan sessize), böylece düğme her zaman bir tıklamanın ne yapacağını gösterir.',
      useCases: [
        'Ses ve video oynatıcılarda oynat ve duraklat düğmeleri',
        'Görüntülü görüşmelerde sesi kapat ve aç kontrolleri',
        'Toplantı uygulamalarında kamerayı aç ve kapat düğmeleri',
        'Atla, tekrarla ve karıştır için çalma listesi kontrolleri',
        'Yayınlama (cast) ve AirPlay düğmeleri',
        'Podcast ve müzik uygulaması kontrolleri',
      ],
    },
    'Text editing': {
      name: 'Metin düzenleme',
      title: 'Animasyonlu metin düzenleme ikonları',
      intro:
        'Zengin metin araç çubukları için kalın, italik, altı çizili, hizalama ve liste ikonları. Kısa bir tıklama animasyonu biçimlendirmenin uygulandığını onaylar; metnin kendisindeki değişikliğin zor fark edildiği editörlerde bu işe yarar.',
      useCases: [
        'Zengin metin editörü araç çubukları',
        'Yorum ve mesaj yazma alanları',
        'CMS ve blog yazısı editörleri',
        'Markdown ve not alma uygulamaları',
        'Tasarım araçlarında metin hizalama kontrolleri',
      ],
    },
    Communication: {
      name: 'İletişim',
      title: 'Animasyonlu iletişim ikonları',
      intro:
        'Telefonlar, sohbet balonları, gönder düğmeleri, sesli mesaj ve RSS. Arama ikonları bir arama geçmişinin ihtiyaç duyduğu gelen, giden, cevapsız ve yönlendirilmiş durumları karşılar; gönder ikonu da tıklandığında mesajı küçük bir hareketle uğurlar.',
      useCases: [
        'Sohbet ve yorum formlarındaki gönder düğmesi',
        'Gelen, giden ve cevapsız aramaları gösteren arama geçmişi',
        'İletişim ve destek düğmeleri',
        'Sohbet widget’ı açma düğmeleri',
        'Bahsetme (mention) ve e-posta adresi alanları',
      ],
    },
    Devices: {
      name: 'Cihazlar',
      title: 'Animasyonlu cihaz ikonları',
      intro:
        'Telefonlar, tabletler, monitörler, saatler ve yazıcılar; bunların yanında wifi, Bluetooth ve pil gibi bağlantı göstergeleri. Cihaz seçicilerde, responsive önizleme geçişlerinde ve bağlantı durumunda işe yarar.',
      useCases: [
        'Mobil, tablet ve masaüstü için responsive önizleme geçişleri',
        'Wifi ve Bluetooth bağlantı durumu',
        'Pil ve şarj göstergeleri',
        'Hesap güvenliği ayarlarındaki cihaz listeleri',
        'Faturalarda ve raporlarda yazdır düğmeleri',
      ],
    },
    Weather: {
      name: 'Hava durumu',
      title: 'Animasyonlu hava durumu ikonları',
      intro:
        'Hava tahminleri ve günün saatine bağlı her şey için güneş, ay, bulutlar, yağmur, kar, şimşek ve rüzgâr. Güneş ve ay aynı zamanda doğal bir açık/karanlık mod anahtarı oluşturur.',
      useCases: [
        'Hava durumu widget’ları ve tahmin kartları',
        'Açık ve koyu tema anahtarları',
        'Seyahat uygulamalarında gün doğumu ve gün batımı saatleri',
        'Akıllı ev dashboard’larında sıcaklık değerleri',
        'Enerji ve güç durumu göstergeleri',
      ],
    },
    'Maps & location': {
      name: 'Harita ve konum',
      title: 'Animasyonlu harita ve konum ikonları',
      intro:
        'Harita pinleri, navigasyon okları, küreler, hedefler ve çapalar. Hover’da düşen bir pin, mağaza bulucuyu ya da teslimat adresini öne çıkarır; küre ise dil veya bölge seçici olarak kullanılabilir.',
      useCases: [
        'Mağaza bulucular ve adres alanları',
        'Mevcut konum ve yol tarifi düğmeleri',
        'Dil ve bölge seçiciler',
        'Teslimat ve sipariş takibi',
        'Seyahat ve rezervasyon uygulamaları',
      ],
    },
    Commerce: {
      name: 'E-ticaret',
      title: 'Animasyonlu e-ticaret ikonları',
      intro:
        'Online mağazalar için alışveriş sepetleri, çantalar, fiyat etiketleri, hediyeler, kredi kartları ve kargo kamyonları. Sepete ekle animasyonu tıklamayı bir toast’a gerek kalmadan onaylar; kamyon ve paket ikonları da sipariş durumuna biraz hayat katar.',
      useCases: [
        'Ürün kartlarında sepete ekle düğmeleri',
        'Mağaza başlığında sepet ve çanta düğmeleri',
        'Ödeme adımı ve ödeme yöntemi seçimi',
        'İndirim, kupon ve kampanya rozetleri',
        'Kargo ve sipariş takibi adımları',
        'Hediye kartları ve hediye paketi seçenekleri',
      ],
    },
    Charts: {
      name: 'Grafikler',
      title: 'Animasyonlu grafik ikonları',
      intro:
        'Analitik ve raporlama için sütun grafikler, bir pasta grafik ve trend okları. Yükselen ve düşen trend ikonları bir metriğin arttığını mı azaldığını mı tek bakışta gösterir; KPI kartlarına ve sayı değişikliklerinin listelendiği sayfalara uyar.',
      useCases: [
        'Yükselen ya da düşen metrikleri gösteren KPI kartları',
        'Analitik ve rapor menü öğeleri',
        'Dashboard’ların boş durumları',
        'Finans ve portföy özetleri',
      ],
    },
    Development: {
      name: 'Geliştirme',
      title: 'Animasyonlu geliştirici ikonları',
      intro:
        'Kod parantezleri, bir terminal, Git branch’leri, commit’ler, merge’ler ve pull request’ler; ayrıca sunucular ve veritabanları. Git ve altyapı terimlerinin arayüzün parçası olduğu geliştirici araçları, dokümantasyon siteleri ve durum sayfaları için tasarlandı.',
      useCases: [
        'Geliştirici araçlarında pull request, merge ve branch durumu',
        'Dokümantasyonda kod parçacığı ve embed düğmeleri',
        'Landing page’lerde terminal ve CLI bölümleri',
        'Durum sayfalarında sunucu ve veritabanı sağlığı',
        'Command tuşuyla klavye kısayolu ipuçları',
      ],
    },
    'Design & layout': {
      name: 'Tasarım ve yerleşim',
      title: 'Animasyonlu tasarım ve yerleşim ikonları',
      intro:
        'Editörler ve sayfa oluşturucular için grid, sütun, katman, kırpma, kalem aracı ve imleç ikonları. Kullanıcıların içerik düzenlediği, grid ile tablo görünümü arasında geçtiği ya da bir çizim aracı seçtiği araç çubuklarına uyar.',
      useCases: [
        'Grid, liste ve tablo görünümü geçişleri',
        'Tasarım ve sunum araçlarında katman panelleri',
        'Görsel editörlerde kırpma ve kesme araçları',
        'Sayfa oluşturucular ve yerleşim seçiciler',
        'Sürükleyerek taşıma tutamaçları',
      ],
    },
    'Shapes & math': {
      name: 'Şekiller ve matematik',
      title: 'Animasyonlu şekil ve matematik ikonları',
      intro:
        'Daireler, kareler, üçgenler, altıgenler, bir sekizgen ve bölme işaretleri. Çizim uygulamalarında şekil aracı, hesap makinesinde operatör ya da diyagramlarda ve onboarding adımlarında nötr işaret olarak kullanın.',
      useCases: [
        'Beyaz tahta ve çizim uygulamalarında şekil araçları',
        'Hesap makinesi ve formül editörü operatörleri',
        'Diyagramlarda madde ve adım işaretleri',
        'Quiz ve oyun arayüzleri',
      ],
    },
    Loading: {
      name: 'Yükleme',
      title: 'Animasyonlu yükleme ikonları',
      intro:
        'Bir işlem sürdüğü müddetçe döngüde oynayan spinner’lar ve loader’lar. Bir istek çalışırken gönder düğmesinin içine, hâlâ yüklenen içeriğin yerine ya da tam ekran bir açılış ekranına koyun; kullanıcı azaltılmış hareketi tercih ettiğinde sabit kalırlar.',
      useCases: [
        'Bir isteğin yanıtını bekleyen gönder düğmeleri',
        'Liste ya da grafik yüklenirken yer tutucular',
        'Sonsuz kaydırma ve daha fazla yükle göstergeleri',
        'Tam ekran açılış ekranları ve sayfa geçişleri',
        'Dosya yükleme ve işleme ilerlemesi',
      ],
    },
    'Social media': {
      name: 'Sosyal medya',
      title: 'Animasyonlu sosyal medya ikonları',
      intro:
        'Sosyal ağların ve geliştiricilerle tasarımcıların işlerini paylaştığı araçların marka ikonları: X, Instagram, YouTube, Discord, Telegram, Figma ve daha fazlası. Hover’da canlanırlar; bu da footer ve profil bağlantılarının tıklanabilir olduğunu hissettirir.',
      useCases: [
        'Site footer’ındaki sosyal medya bağlantıları',
        'Blog yazılarında paylaş düğmeleri',
        'Yazar ve ekip profili bağlantıları',
        'Sohbet sunucuları için topluluk davet düğmeleri',
        'Sosyal medya ya da geliştirici hesabıyla giriş',
      ],
    },
    Other: {
      name: 'Diğer',
      title: 'Diğer animasyonlu ikonlar',
      intro:
        'Daha büyük bir gruba girmeyen ikonlar: geri bildirim için emoji yüzler, bir kahve fincanı, bir saat, bir nabız çizgisi ve bir aşağı kaydır ipucu. Aşağı kaydır ikonu, hero bölümlerinde aşağıda daha fazlası olduğunu gösteren yaygın bir ipucudur.',
      useCases: [
        'Hero bölümünün altında aşağı kaydır ipuçları',
        'Geri bildirim widget’larında mutlu, nötr ve üzgün yüzler',
        'Aktivite ve uptime göstergeleri',
        'Çalışma saatleri ve saat seçiciler',
        '“Bana bir kahve ısmarla” ve destek bağlantıları',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Döngü',
      title: 'Döngüsel animasyonlu ikonlar',
      intro:
        'Bu ikonlar ekranda kaldıkları sürece kesintisiz oynar; bu yüzden süren durumlara uyarlar: bir şey yükleniyor, bir uyarı aktif, bir terminal bekliyor. Azaltılmış hareket tercih edildiğinde ilk karede durur ve normal bir ikon gibi okunurlar.',
      useCases: [
        'Yükleme spinner’ları ve ilerleme göstergeleri',
        'Aktif uyarı ve hata durumları',
        'Canlı yayın ve kayıt göstergeleri',
        'Hero bölümlerinde aşağı kaydır ipuçları',
        'Yeni bildirimler için dikkat işaretleri',
      ],
      example:
        'Döngüsel ikonlar genellikle yükleme spinner’larında, aktif uyarılarda, çalan bir zilde ya da aşağı kaydır ipucunda kullanılır.',
      description:
        'Kesintisiz oynar; azaltılmış hareket tercih edildiğinde statik ilk karede kalır.',
      reducedMotion:
        'Azaltılmış hareket tercih edildiğinde ikon otomatik oynamaz ve statik ilk karesinde kalır.',
      plays: 'kesintisiz döngüde oynar',
    },
    'click-toggle': {
      label: 'Tıklayınca geçiş',
      title: 'Tıklayınca durum değiştiren animasyonlu ikonlar',
      intro:
        'Her tıklamada iki durum arasında animasyonla geçer ve yeni durumda kalırlar; bu da onları bir aç/kapa kontrolünün görsel yarısı yapar. İkon her zaman mevcut durumu gösterdiği için aria-pressed ya da checked özniteliğiyle birlikte kullanın, düğme kendini anlatsın.',
      useCases: [
        'Sesi kapat ve aç düğmeleri',
        'Şifreyi göster ve gizle alanları',
        'Hamburger menü ve kapat düğmeleri',
        'Oynat ve duraklat kontrolleri',
        'Beğen, yıldız ve yer imi düğmeleri',
        'Onay kutuları, radyo düğmeleri ve switch’ler',
      ],
      example:
        'Tıklayınca durum değiştiren ikonlar genellikle sesi kapat/aç, şifreyi göster/gizle, menü/kapat, oynat/duraklat ve beğen düğmelerinde kullanılır.',
      description:
        'Tıklandığında iki durum arasında geçiş yapar; azaltılmış hareket tercih edildiğinde ise animasyonsuz, anında geçer.',
      reducedMotion:
        'Azaltılmış hareket tercih edildiğinde tıklama, aradaki animasyon olmadan anında diğer duruma geçer.',
      plays: 'tıklandığında iki durum arasında geçiş yapar',
    },
    'click-replay': {
      label: 'Tıklayınca tekrar',
      title: 'Tıklamalı animasyonlu ikonlar',
      intro:
        'Bu ikonlar her tıklandıklarında baştan bir kez oynar; işlemin gerçekleştiğine dair küçük bir onaydır. Geride bir durum bırakmayan tek seferlik işlemlere uyarlar: gönder, kaydet, yenile, indir, yazdır ya da sil.',
      useCases: [
        'Sohbet ve yorum formlarında gönder düğmeleri',
        'Kaydet, indir ve yükle düğmeleri',
        'Yenile ve döndür düğmeleri',
        'Sepete ekle düğmeleri',
        'Editörlerde metin biçimlendirme düğmeleri',
      ],
      example:
        'Tıklamalı ikonlar genellikle gönder, kaydet, yenile, indir, sepete ekle ve biçimlendirme düğmelerinde işlemi onaylar.',
      description:
        'Azaltılmış hareket tercih edilmediği sürece her tıklamada baştan bir kez oynar.',
      reducedMotion:
        'Azaltılmış hareket tercih edildiğinde tıklamalar yine handler’ınıza ulaşır, ancak animasyon oynamaz.',
      plays: 'her tıklamada baştan oynar',
    },
    hover: {
      label: 'Hover',
      title: 'Hover efektli animasyonlu ikonlar',
      intro:
        'Bu ikonlar imleç üzerlerine geldiğinde ileri, ayrıldığında geri oynar; böylece hareket imleci izler ve asla yarıda kalmaz. Ne açtığını ima eden navigasyon öğelerine ve düğmelere uyarlar: çöp kutusunun kapağı kalkar, ayarlar dişlisi döner, klasör açılır.',
      useCases: [
        'Kenar çubuğu ve navigasyon menüsü öğeleri',
        'Tıklamadan önce kapağı kaldıran sil düğmeleri',
        'Ayarlar ve profil bağlantıları',
        'Yakınlaştır ve uzaklaştır kontrolleri',
        'Footer’daki sosyal medya bağlantıları',
      ],
      example:
        'Hover efektli ikonlar genellikle navigasyon öğelerinde, sil düğmelerinde, ayarlarda, yakınlaştırma kontrollerinde ve sosyal medya bağlantılarında kullanılır.',
      description: 'mouseenter’da ileri, mouseleave’de geri oynar.',
      reducedMotion: 'Azaltılmış hareket tercih edildiğinde hover animasyonu oynatmaz.',
      plays: 'hover’da ileri, imleç ayrılınca geri oynar',
    },
    'hover-replay': {
      label: 'Hover’da tekrar',
      title: 'Hover’da oynayan animasyonlu ikonlar',
      intro:
        'Bu ikonlar imleç üzerlerine geldiğinde bir kez oynar ve kendiliğinden tamamlanır; böylece araç çubuğunun üzerinden hızlıca geçmek titrek bir harekete dönüşmez. Setin büyük kısmı böyle çalışır: hover’da canlanan oklar, dosyalar, cihazlar, hava durumu ve marka ikonları.',
      useCases: [
        'Özellik listeleri ve fiyatlandırma tabloları',
        'Ok bağlantıları ve call-to-action düğmeleri',
        'Editörlerde ve dashboard’larda araç çubuğu düğmeleri',
        'Landing page grid’indeki kartlar',
        'Footer ve iletişim bağlantıları',
      ],
      example:
        'Hover’da oynayan ikonlar genellikle ok bağlantılarına, özellik listelerine, araç çubuğu düğmelerine ve landing page kartlarına canlılık katar.',
      description:
        'Azaltılmış hareket tercih edilmediği sürece mouseenter’da bir kez oynar. İmlecin ayrılması animasyonu durdurmaz; oynarken yeniden üzerine gelmek de baştan başlatmaz.',
      reducedMotion: 'Azaltılmış hareket tercih edildiğinde hover animasyonu oynatmaz.',
      plays: 'hover’da bir kez oynar',
    },
    'hover-loop': {
      label: 'Hover’da döngü',
      title: 'Hover’da döngüye giren animasyonlu ikonlar',
      intro:
        'Bu ikonlar imleç üzerlerinde kaldığı sürece döngüde oynar ve imleç ayrıldıktan sonra mevcut turu tamamlar; böylece hareketin ortasında asla durmazlar. Daha uzun bakmaya davet eden bağlantılara, çoğunlukla sosyal medya ve topluluk ikonlarına uyarlar.',
      useCases: [
        'Header ve footer’lardaki sosyal medya bağlantıları',
        'Topluluk ve sohbet davet düğmeleri',
        'Portföy ve profil bağlantıları',
        'Dil ve bölge seçiciler',
      ],
      example:
        'Hover’da döngüye giren ikonlar genellikle sosyal medya bağlantılarında, topluluk davetlerinde, portföy bağlantılarında ve dil seçicilerde kullanılır.',
      description:
        'Hover süresince döngüde oynar, mouseleave’den sonra mevcut turu tamamlar ve azaltılmış hareket tercih edildiğinde statik kalır.',
      reducedMotion: 'Azaltılmış hareket tercih edildiğinde ikon hover sırasında statik kalır.',
      plays: 'hover süresince döngüde oynar',
    },
  },
};
