import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: 'Dokümantasyon — useAnimations',
  description: (iconCount: number) =>
    `${iconCount} animasyonlu ikonu React ve shadcn/ui’da kullanma rehberi: etkileşimler, prop’lar, renkler, dosyalar ve erişilebilirlik.`,
  badge: 'Dokümantasyon',
  onThisPage: 'Bu sayfada',
  viewAsMarkdown: 'Markdown olarak görüntüle',
  headline: 'useAnimations dokümantasyonu',
  summary: 'useAnimations animasyonlu ikonlarını React ve shadcn/ui’da kullanma rehberi.',
  crumb: 'Dokümantasyon',
  faq: [
    {
      question: 'useAnimations ticari projelerde ücretsiz mi?',
      answer: 'Evet. İkonlar ve React paketi MIT lisanslıdır; atıf gerekmez.',
    },
    {
      question: 'useAnimations ikonlarını React’te nasıl kullanırım?',
      answer:
        'react-useanimations paketini kurun, UseAnimations’ı ve bir ikonu (ör. react-useanimations/lib/checkmark) import edin, ardından <UseAnimations animation={checkmark} size={32} /> ile render edin.',
    },
    {
      question: 'Bir ikonun rengini nasıl değiştiririm?',
      answer:
        'İkonlar metin rengini izler. Rengi strokeColor ve fillColor ile, CSS color ile ya da path’lere stil vererek değiştirebilirsiniz.',
    },
    {
      question: 'React olmadan da çalışır mı?',
      answer:
        'Paket React içindir. Ancak her ikon aynı zamanda herhangi bir Lottie oynatıcısının (lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter) oynatabildiği standart bir Lottie JSON dosyası ve statik bir SVG’dir. Ayrıntılar “React olmadan kullanım” bölümünde ve useanimations.com/lottie-icons sayfasında.',
    },
  ],
};
