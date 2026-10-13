import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { pluralIn } from '../../format';

/** In Turkish a noun after a number stays singular: '12 ikon'. */
const icons = (n: number) => pluralIn('tr')(n, { one: 'ikon', other: 'ikon' });

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Kategorilere göre ${count} animasyonlu ikonun tamamı`,
      `${count} animasyonlu ikonun tamamı`,
      'Tüm animasyonlu ikonlar',
    ],
    descriptions: (count: number, categories: number) => [
      `Tüm useAnimations ikonları tek sayfada: ${categories} kategoride ${count} ücretsiz animasyonlu ikon; React, shadcn/ui, Lottie JSON ve SVG için. MIT lisanslı.`,
    ],
    title: 'Tüm animasyonlu ikonlar',
    badge: (count: number) => `${icons(count)} · MIT lisanslı`,
    introHtml: (browser: string) =>
      `Setteki her ikon, kategorilere göre gruplanmış hâlde. Canlı önizleme, React ve shadcn/ui kodu ile Lottie JSON, SVG ve ZIP indirmeleri için bir ikonu açın. Anahtar kelimeyle aramak ve animasyonları yerinde denemek için ${link(browser, 'ikon tarayıcısını')} kullanın.`,
    categoriesNav: 'Kategoriler',
    byInteraction: 'Etkileşime göre:',
    categoryLink: (count: number, name: string) => `${name} kategorisindeki ${icons(count)} →`,
  },

  categories: {
    titles: (categories: number) => [
      `Animasyonlu ikon kategorileri: ${categories} koleksiyon`,
      'Animasyonlu ikon kategorileri',
    ],
    descriptions: (iconCount: number, categories: number) => [
      `${categories} kategoride ${iconCount} ücretsiz animasyonlu ikon: navigasyon, eylemler, medya, yükleme, sosyal medya ve daha fazlası. React, shadcn/ui ve Lottie için.`,
    ],
    title: 'Animasyonlu ikon kategorileri',
    badge: (iconCount: number, categories: number) =>
      `${icons(iconCount)} · ${categories} kategori`,
    introHtml: (interactions: string) =>
      `Her useAnimations ikonu, navigasyon oklarından medya kontrollerine, loader’lardan sosyal medya logolarına kadar tek bir kategoriye aittir. Bir kategoriyi açtığınızda tüm ikonlarını, nerede kullanılacaklarını ve birini eklemek için gereken kodu görürsünüz; isterseniz ${link(interactions, 'etkileşime')} göre de göz atabilirsiniz.`,
    iconCount: icons,
  },

  interactions: {
    titles: [
      'Mikro etkileşimler: hover, tıklama ve döngü ikonları',
      'Animasyonlu ikonlar için mikro etkileşimler',
    ],
    descriptions: (iconCount: number, interactions: number) => [
      `${interactions} mikro etkileşimde ${iconCount} animasyonlu ikon: döngü, tıklayınca geçiş ve tekrar, hover, hover’da tekrar ve döngü. Azaltılmış hareket desteğiyle.`,
    ],
    title: 'Animasyonlu ikon etkileşimleri',
    badge: (interactions: number, iconCount: number) =>
      `${interactions} etkileşim · ${icons(iconCount)}`,
    introHtml: `Her ikon kendisi için tasarlanan mikro etkileşimle gelir: döngüde oynar, tıklandığında durum değiştirir ya da baştan oynar veya hover’da oynar. React bileşeni bunu kendisi bağlar ve azaltılmış hareket tercihine uyar; <code class="font-mono text-base text-fg">interaction</code> prop’u da herhangi bir ikonu başka bir etkileşime geçirir.`,
    iconCount: icons,
    chooseTitle: 'Etkileşim seçimi',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Süren bir durum')}, örneğin yükleme ya da aktif bir uyarı: ${link(href, 'döngü')}.`,
      'click-toggle': (href: string) =>
        `${strong('Bir aç/kapa kontrolü')}, örneğin sesi kapatma, menü ya da şifreyi gösterme: ${link(href, 'tıklayınca geçiş')}; kontrollü state için ${code('active')} ile.`,
      'click-replay': (href: string) =>
        `${strong('Tek seferlik bir işlem')}, örneğin gönder, kaydet ya da yenile: ${link(href, 'tıklayınca tekrar')}.`,
      hover: (href: string) =>
        `${strong('Bir bağlantının ne açacağına dair ipucu')}: ${link(href, 'hover')}; imleç ayrılınca geri oynar.`,
      'hover-replay': (href: string) =>
        `${strong('İmlecin hızla üzerinden geçtiği araç çubukları ve listeler')}: ${link(href, 'hover’da tekrar')}; kendiliğinden tamamlanır.`,
      'hover-loop': (href: string) =>
        `${strong('Daha uzun bakmaya davet eden bağlantılar')}, örneğin sosyal medya ikonları: ${link(href, 'hover’da döngü')}.`,
    },
    motionTitle: 'Azaltılmış hareket',
    motionHtml: `React bileşeni ${code('prefers-reduced-motion')} ayarını izler ve ayar değiştiğinde güncellenir. Dokunmatik ekranlarda dokunmak hover animasyonlarını asla başlatmaz.`,
    reducedMotion: {
      loop: 'ikon otomatik oynamaz ve statik ilk karesinde kalır.',
      'click-toggle': 'tıklama, aradaki animasyon olmadan anında diğer duruma geçer.',
      'click-replay': 'tıklamalar yine handler’ınıza ulaşır, ancak animasyon oynamaz.',
      hover: 'hover animasyonu oynatmaz.',
      'hover-replay': 'hover animasyonu oynatmaz.',
      'hover-loop': 'ikon hover sırasında statik kalır.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Ücretsiz Lottie ikonları: ${count} animasyonlu JSON ikon`,
      'Ücretsiz Lottie ikonları',
    ],
    descriptions: (count: number) => [
      `Düz Lottie JSON olarak ${count} ücretsiz Lottie ikonu, MIT lisanslı. lottie-web, dotLottie, React, React Native, iOS, Android ve Flutter için hazır kod.`,
    ],
    title: 'Ücretsiz Lottie ikonları',
    crumb: 'Lottie ikonları',
    datasetName: 'useAnimations ikon kataloğu',
    datasetDescription: (count: number) =>
      `${count} animasyonlu Lottie ikonunun meta verileri ve dosya URL’leri: id, başlık, kategori, anahtar kelimeler, etkileşim, boyut ve süre.`,
    badge: (count: number) => `${icons(count)} · Lottie JSON · MIT lisanslı`,
    intro:
      'Her useAnimations ikonu standart bir Lottie JSON animasyonudur, yani her Lottie oynatıcısı onu oynatabilir: web’de lottie-web, ayrıca lottie-ios, lottie-android, Flutter ve React Native. Dosyalar MIT lisansıyla ücretsizdir, kayıt gerektirmez ve CORS açık, kalıcı URL’lerden sunulur; doğrudan yükleyebilir ya da projenize indirebilirsiniz.',
    popular: 'Popüler Lottie ikonları',
    allIcons: (count: number) => `${count} ikonun tamamı →`,
    filesTitle: 'Dosyalar ve URL’ler',
    filesIntroHtml: `Her ikonun ${code('/icons/&lt;id&gt;')} adresinde önizleme ve indirmeler içeren bir sayfası vardır (ikon sayfaları İngilizcedir). Dosyaların kendisi:`,
    files: {
      json: 'Lottie JSON animasyonu',
      zip: 'JSON ve statik SVG’ler',
      svg: 'her durumun statik SVG’si',
      catalog: 'tüm ikonların kataloğu',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')} her ikonu id, başlık, kategori, anahtar kelimeler, etkileşim, boyut, süre ve dosya URL’leriyle listeler. Böylece bir script’te anahtar kelimeyle ikon seçmek ya da seçimi bir kodlama ajanına bırakmak kolaylaşır. Lottie dosyalarının medyan boyutu ${median} kB’tır.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'Airbnb’nin referans oynatıcısı. Bir CDN’den yükleyin, bir ikon URL’sini gösterin ve SVG renderer’ı seçin; böylece ikon keskin kalır ve CSS ile yeniden renklendirilebilir. Tam sürümü (lottie.min.js) kullanın: hafif sürüm ifadeleri (expressions) atlar.',
        cssLabel: 'Metin rengini izle (SVG renderer)',
      },
      'web-interactions': {
        title: 'Web: hover ve tıklama etkileşimleri',
        text: 'lottie-web oynatır ve durdurur, ama etkileşimler size kalmış. Aşağıdaki örnek, menü ikonunun azaltılmış hareket destekli tıklayınca geçiş etkileşimidir. Her etkileşim aynı kalıbı izler; daha aşağıda anlatılan React bileşeni ise bunların hepsini sizin yerinize yapar.',
      },
      dotlottie: {
        title: 'Web: dotLottie web component',
        text: 'LottieFiles’ın oynatıcısı bir WebAssembly motoruyla canvas’a çizer ve .lottie dosyalarının yanı sıra düz Lottie JSON da oynatır. Canvas dosyadaki renkleri korur; JSON’u yeniden renklendirmediğiniz sürece ikonlar siyah kalır.',
        jsLabel: 'Ya da JavaScript API’si: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Kurmanız gereken bir Lottie oynatıcısı yok: paketin kendi 8 kB’lık oynatıcısı var; her ikonun etkileşimini oynatır, metin rengini izler ve azaltılmış hareket tercihine uyar. Her ikon ayrı bir modüldür, yalnızca import ettikleriniz bundle’a girer.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Çevrimdışı kullanım için JSON’u require() ile bundle’a ekleyin ya da URL’sinden yükleyin.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Paketi Swift Package Manager ile https://github.com/airbnb/lottie-spm.git adresinden ekleyin, ardından JSON’u bundle’ınıza koyun ya da URL’sinden yükleyin.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'com.airbnb.android:lottie-compose ekleyin (view’lar için com.airbnb.android:lottie). Çevrimdışı kullanım için JSON’u res/raw klasörüne koyup LottieCompositionSpec.RawRes ile yükleyin.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'lottie paketi Android, iOS, web ve masaüstü için saf Dart ile yazılmış bir oynatıcıdır.',
      },
    },
    expressionsTitle: 'İfade (expression) kullanan ikonlar',
    expressionsHtml: (count: number) =>
      `${icons(count)} After Effects ifadeleri (${code('loopOut')} ya da ${code('wiggle')}) kullanır. Web’de bunları ${code('lottie_light')} ile değil, lottie-web’in tam sürümüyle oynatın. Native oynatıcılar ifadeleri işlemez; bu ikonları iOS, Android ve Flutter’da test edin ya da başka bir ikon seçin. react-useanimations bunları tasarlandığı gibi oynatır.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Bu Lottie ikonları ticari kullanım için ücretsiz mi?',
        answer: `Evet. ${f.count} Lottie ikonunun tamamı MIT lisanslıdır: kişisel ve ticari projelerde kullanabilir, değiştirebilir ve yeniden dağıtabilirsiniz. Atıf gerekmez, indirmek için hesap da gerekmez.`,
      },
      {
        question: 'Lottie dosyaları hangi formatta?',
        answer: `Yalnızca shape layer’lardan oluşan standart Lottie JSON (Bodymovin formatı): görsel, font ya da harici dosya yok. Her ikon 24 ya da 32 px’lik bir artboard üzerinde çizilmiştir, her boyuta ölçeklenir ve ${f.minSize} kB ile ${f.maxSize} kB arasındadır (medyan ${f.medianSize} kB).`,
      },
      {
        question: 'İkonları React’te kullanmak için lottie-web gerekli mi?',
        answer:
          'Hayır. react-useanimations’ın bağımlılığı olmayan, kendi 8 kB’lık oynatıcısı var; tek bir paket kurup ihtiyacınız olan ikonları import edersiniz. lottie-web yalnızca React dışında, düz web sayfalarında ya da başka framework’lerde gerekir.',
      },
      {
        question: 'Hangi ikonlar lottie-web’in tam sürümünü gerektirir?',
        answer: `${icons(f.expressions.length)} After Effects ifadeleri (loopOut ya da wiggle) kullanır: ${f.expressions.join(', ')}. Web’de bunlar lottie-web’in tam sürümünü gerektirir; lottie_light ifadeleri yok sayar. Native oynatıcılar (lottie-ios, lottie-android, Flutter’ın lottie paketi) da ifadeleri işlemediği için bu ikonlar orada farklı hareket edebilir.`,
      },
      {
        question: 'Bir Lottie ikonunun rengini değiştirebilir miyim?',
        answer:
          'Web’de lottie-web’in SVG renderer’ı renkleri öznitelik olarak yazar; path’lere uygulanan bir CSS kuralı ikonu yeniden renklendirir. Native oynatıcılar kendi dinamik özellik API’lerini kullanır: iOS’ta ColorValueProvider, Android’de LottieProperty.COLOR ve STROKE_COLOR, Flutter’da ValueDelegate.color.',
      },
    ],
    byCategory: 'Kategoriye göre Lottie ikonları',
  },

  shadcn: {
    titles: (count: number) => [
      `shadcn/ui için animasyonlu ikonlar: ${count} bileşen`,
      'shadcn/ui için animasyonlu ikonlar',
    ],
    descriptions: (count: number) => [
      `shadcn/ui için ${count} animasyonlu ikon, her biri tek shadcn CLI komutuyla eklenir. Hover, tıklama ve döngü mikro etkileşimleri; MIT, lottie-web’siz.`,
    ],
    title: 'shadcn/ui için animasyonlu ikonlar',
    crumb: 'shadcn/ui',
    popularList: 'Popüler shadcn/ui animasyonlu ikonları',
    badge: (count: number) => `${count} bileşen · shadcn registry · MIT lisanslı`,
    intro:
      'Her useAnimations ikonu bir shadcn registry’sinde yer alır. Tek bir CLI komutu projenize tipli bir React bileşeni ekler: ikonun kendisi için tasarlanan hover, tıklama ya da döngü etkileşimi, azaltılmış hareket desteği ve temanızı izleyen renklerle. Kod, diğer shadcn/ui bileşenleri gibi doğrudan sizin repository’nize girer.',
    addTitle: 'İkon ekleme',
    addIntro: 'shadcn CLI’ı ikonun registry URL’siyle çalıştırın:',
    namingHtml: `Bileşenin adı ${code('Animated')} + PascalCase yazılmış ikon id’sidir (${code('check-box')} → ${code('AnimatedCheckBox')}) ve ${code('components/animations/&lt;id&gt;.tsx')} dosyasına eklenir. CLI ayrıca ortak ${code('components/use-animation.tsx')} wrapper’ını ekler ve kendi oynatıcısıyla gelen ${code('react-useanimations')} paketini kurar: lottie-web gerekmez.`,
    namespaceTitle: 'Registry namespace’iyle kısa adlar',
    namespaceHtml: `Registry’yi bir kez ${code('components.json')} dosyasına ekleyin, sonra ikonları adlarıyla, birkaçını birden ekleyin:`,
    registryHtml: (registry: string) =>
      `${link(registry, '/r/registry.json')} adresindeki registry dizini her öğeyi başlığı, kategorisi ve etkileşimiyle listeler.`,
    usageTitle: 'shadcn Button içinde kullanım',
    usageHtml: `Bileşenler ${code('UseAnimations')} ile aynı prop’ları alır. Menü ikonu gibi bir geçiş ikonu için ${code('active')} geçin ve state’i düğmenizde tutun; ikon her değişiklikte animasyon oynatır:`,
    colorHtml: (docs: string) =>
      `İkonlar metin rengini izler; ${code('text-primary')} ya da ${code('text-muted-foreground')} onları yeniden renklendirir ve karanlık mod için ek bir şey gerekmez. Diğer prop’lar ve kalıplar ${link(docs, 'dokümantasyonda')}.`,
    codeText: { closeMenu: 'Menüyü kapat', openMenu: 'Menüyü aç' },
    popular: 'shadcn/ui için popüler ikonlar',
    allIcons: (count: number) => `${count} ikonun tamamı →`,
    popularNote: 'Her ikon sayfası kendi shadcn komutunu gösterir.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'shadcn/ui animasyonlu ikonları ücretsiz mi?',
        answer: `Evet. ${f.count} ikonun tamamı ve bileşen kodu MIT lisanslıdır; kişisel ve ticari projelerde kullanılabilir. Registry için hesap ya da API anahtarı gerekmez.`,
      },
      {
        question: 'shadcn CLI projeme neler ekler?',
        answer: `components/animations/<id>.tsx içinde ikon bileşenini, components/use-animation.tsx içinde ortak UseAnimation oynatıcı wrapper’ını (registry bağımlılığı olarak, bir kez) ve npm’den react-useanimations@^${f.version} paketini. lottie-web gerekmez: paketin kendi 8 kB’lık oynatıcısı var.`,
      },
      {
        question: 'Bileşenler Next.js server component’leriyle çalışır mı?',
        answer:
          'Evet. Bileşenler "use client" olarak işaretlidir ve animasyonu yalnızca tarayıcıda çizer; bu yüzden onları server component’lerden ve sayfalardan dynamic import ya da ssr: false olmadan render edebilirsiniz.',
      },
      {
        question: 'İkonların görünümünü ve hareketini değiştirebilir miyim?',
        answer:
          'Kod sizin, kendi repository’nizde. Bileşenler UseAnimations’ın prop’larını alır: size, strokeColor, fillColor, interaction, active, autoplay, loop ve speed. İkonlar metin rengini izlediği için text-primary ya da text-muted-foreground gibi Tailwind class’ları onları yeniden renklendirir.',
      },
    ],
    byCategory: 'Kategoriye göre göz at',
  },
};
