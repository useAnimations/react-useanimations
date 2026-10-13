import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Mikro animasyonlar ve animasyonlu ikonlar — useAnimations',
  description: (count: number) =>
    `UI için ${count} ücretsiz mikro animasyon: React, shadcn/ui ve Lottie için hover, tıklama ve döngü hazır gelen animasyonlu ikon kütüphanesi. MIT.`,

  hero: {
    badge: (count: number) => `${count} ikon · sıfır bağımlılık · MIT`,
    headline: { start: 'İkonlarınız ', accent: 'canlansın.', end: '' },
    h1: 'React, shadcn/ui ve Lottie için ücretsiz animasyonlu ikonlar',
    intro: (count: number) =>
      `Hover, tıklama ve döngü mikro etkileşimleri hazır gelen, elle tasarlanmış ${count} mikro animasyon. React bileşeni olarak kullanın, shadcn ile ekleyin ya da SVG ve Lottie JSON olarak indirin. MIT lisanslı.`,
    browse: 'İkonlara göz at',
    fieldHint: 'İmleci alanın üzerinde gezdirin.',
  },

  numbers: {
    label: 'Kısaca',
    icons: 'animasyonlu ikon',
    interactions: 'hazır etkileşim',
    size: 'oynatıcı, gzip ile',
    dependencies: 'bağımlılık',
  },

  interactions: {
    eyebrow: 'Hazır etkileşimler',
    title: 'Her ikon nasıl hareket edeceğini bilir.',
    intro:
      'Her ikon kendisi için tasarlanan etkileşimle gelir. Sayfaya koyun, çalışsın; ya da tek bir prop ile başka bir etkileşim seçin. Deneyin:',
    demos: {
      loop: 'Kesintisiz oynar; loader’lar ve arka plandaki durumlar için.',
      'click-toggle': 'İki durum arasında geçiş yapar: menü ve kapat, oynat ve duraklat.',
      'click-replay': 'Geri bildirim olarak her tıklamada baştan oynar.',
      hover: 'İmleç gelince ileri, ayrılınca geri oynar.',
      'hover-loop': 'Hover süresince döngüde oynar, imleç ayrılınca turunu tamamlar.',
      'hover-replay': 'İmleç her geldiğinde baştan bir kez oynar.',
    },
  },

  browser: {
    eyebrow: 'Kütüphane',
    title: (count: number) => `${count} ücretsiz animasyonlu ikon`,
    intro:
      'Oynatmak için üzerine gelin ya da tıklayın. Kodu ve indirmeler (Lottie JSON, SVG ve ZIP) için bir ikonu açın.',
    search: 'İkonlarda ara',
    searchPlaceholder: (count: number) =>
      `${count} ikonda arayın: “eye”, “bell” ya da “arrow” deneyin`,
    interaction: 'Etkileşim',
    allInteractions: 'Tüm etkileşimler',
    color: 'İkon rengi',
    colors: {
      text: 'Metin rengi',
      indigo: 'Çivit mavisi',
      red: 'Kırmızı',
      amber: 'Kehribar',
      teal: 'Camgöbeği',
      violet: 'Mor',
    },
    customColor: 'Özel renk',
    size: 'Boyut',
    category: 'Kategori',
    all: 'Tümü',
    count: { one: '{n} ikon', other: '{n} ikon' },
    noMatch: 'Eşleşen ikon yok.',
    noMatchHintHtml: (href: string) =>
      `Başka bir kelime deneyin ya da ${link(href, 'bir ikon önerin')}.`,
  },

  everywhere: {
    eyebrow: 'İstediğiniz gibi kullanın',
    title: 'Kur, import et, bitti.',
    intro:
      'Bağımlılığı olmayan bir React bileşeni, bir shadcn registry, kalıcı URL’lerden indirilebilen dosyalar ve yapay zekâ ajanlarının okuyabildiği bir katalog.',
    docs: 'Dokümantasyonu okuyun →',
    tablist: 'Platform',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Dosyalar', agents: 'Ajanlar' },
    codeText: {
      afterAdding: 'ardından',
      files: 'Her ikon SVG olarak, animasyon (Lottie JSON) olarak ve ikisini içeren bir ZIP olarak',
    },
  },

  features: {
    title: 'Küçük, erişilebilir ve stili tamamen sizde.',
    colors: 'Renklerinizi izler',
    colorsHtml: `İkonlar ${code('currentColor')} kullanır: metin rengini, hover durumlarını ve karanlık modu kendiliğinden alırlar. Bir prop, bir class ya da düz CSS ile değiştirebilirsiniz.`,
    tiny: 'Bilerek küçük',
    tinyText: 'Dahili oynatıcı, sıfır bağımlılık. Her ikon 2 kB’lık ayrı bir modül.',
    accessible: 'Varsayılan olarak erişilebilir',
    accessibleText:
      'Azaltılmış hareket tercihine uyar, hover animasyonlarını klavye odağında da oynatır ve siz etiketlemedikçe ekran okuyuculara görünmez.',
    ssr: 'Sunucu tarafı render’a hazır',
    ssrText:
      'Next.js, Remix ve Astro’da sorunsuz render edilen bir client bileşeni. İkonlar her yerde import edebileceğiniz düz verilerdir.',
    agents: 'Ajanlar için yapıldı',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Her ikon için anahtar kelimeler içeren tipli bir katalog, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} ve Markdown dokümantasyon.`,
  },

  browse: {
    title: 'Doğru mikro animasyonu bulun.',
    byCategory: 'Kategoriye göre göz at',
    byInteraction: 'Etkileşime göre göz at',
    formats: 'Tüm ikonlar ve formatlar',
  },

  hubs: {
    icons: 'Tüm animasyonlu ikonlar',
    categories: 'İkon kategorileri',
    interactions: 'Etkileşime göre ikonlar',
    lottie: 'Lottie ikonları (JSON)',
    shadcn: 'shadcn/ui animasyonlu ikonları',
  },

  faqTitle: 'Sorular',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: 'Mikro animasyon ve animasyonlu ikon nedir?',
      answer:
        'Mikro animasyonlar, bir kullanıcı eylemine yanıt veren kısa ve tek amaçlı hareketlerdir: kapatma düğmesine dönüşen bir menü ikonu, bir gönderiyi beğendiğinizde dolan bir kalp, yeni bildirimde çalan bir zil. Animasyonlu ikonlar bunların en yaygın türüdür. Arayüzün tepki verdiğini hissettirir ve durum değişikliklerini ek metne gerek kalmadan gösterirler.',
    },
    {
      question: 'Lottie ve SVG dosyaları arasındaki fark nedir?',
      answer:
        'Lottie JSON dosyası animasyonun tamamını içerir ve react-useanimations’ın dahili oynatıcısı dahil her Lottie oynatıcısında oynar. SVG dosyaları ise ikonun durağan hâlinin görselleridir, her durum için bir tane (örneğin eye ve eye-off). Hiçbir şeyin hareket etmemesi gereken yerler içindir: e-postalar, belgeler, tasarım araçları ya da JavaScript’siz bir yedek.',
    },
    {
      question: 'Next.js ve sunucu tarafı render ile çalışır mı?',
      answer:
        "Evet. Bileşen 'use client' olarak işaretlidir ve animasyonu yalnızca tarayıcıda çizer; bu yüzden server component’lerden ve Next.js, Remix, Astro gibi SSR framework’lerinden dynamic import kullanmadan render edilir. İkon modülleri, server component’lerin import edip prop olarak geçebileceği düz verilerdir.",
      link: { href: f.links.serverRendering, label: 'Next.js ve sunucu tarafı render' },
    },
    {
      question: 'İkonları ticari projelerde kullanabilir miyim?',
      answer:
        'Evet. İkonlar ve react-useanimations paketi MIT lisanslıdır: kişisel ve ticari işlerde kullanabilir, değiştirebilir ve yeniden dağıtabilirsiniz. Atıf memnuniyetle karşılanır ama zorunlu değildir.',
      link: { href: f.links.licence, label: 'Lisans ve koşullar' },
    },
    {
      question: 'İkonları React olmadan kullanabilir miyim?',
      answer:
        'Evet. Her ikon standart bir Lottie JSON dosyasıdır; düz JavaScript, Vue, Svelte, Angular ya da bir CMS içinde lottie-web ile, iOS, Android ve Flutter’da ise Lottie oynatıcılarıyla oynar. Lottie ikonları sayfasında dosya URL’leri ve her etkileşim için hazır lottie-web kod parçacıkları var.',
      link: { href: f.links.lottie, label: 'Lottie ikonları' },
    },
    {
      question: 'İkonlar bundle boyutuma ne kadar ekler?',
      answer: `react-useanimations ${f.version} içindeki oynatıcı gzip ile yaklaşık 8 kB’tır ve bağımlılığı yoktur. Her ikon, boyutu 1 ile 15 kB arasında (medyan 2 kB) değişen ayrı bir modüldür; bundle yalnızca import ettiğiniz ikonları içerir.`,
    },
  ],

  cta: {
    title: { start: 'Arayüzünüze ', accent: 'hayat', end: ' katın.' },
    text: 'Ücretsiz ve MIT lisanslı; kişisel ve ticari işler için.',
    start: 'Hemen başlayın',
  },

  schema: {
    software: (count: number) =>
      `React bileşeni ve hover, tıklama ve döngü etkileşimleri hazır gelen ${count} animasyonlu ikon (Lottie). Bağımlılık yok.`,
    catalogName: 'useAnimations ikon kataloğu',
    catalog: (count: number) =>
      `${count} useAnimations ikonunun tamamı: id, başlık, kategori, anahtar kelimeler, etkileşim, Lottie JSON, SVG ve ZIP URL’leri, React import’u ve shadcn komutu.`,
  },
};
