import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const list = listIn('tr');
const plural = pluralIn('tr');
/** In Turkish a noun after a number stays singular: '1 ikon', '12 ikon'. */
const icons = (n: number) => plural(n, { one: 'ikon', other: 'ikon' });
/** 'Animasyonlu uyarı ikonları' -> 'animasyonlu uyarı ikonları' (Turkish dotted/dotless i aware). */
const lower = (text: string) => text[0].toLocaleLowerCase('tr') + text.slice(1);

/** Up to `max` titles, then 'and N more'. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} ve ${items.length - max} ikon daha`
    : list(items);

/** How the category's files are offered, with or without static SVGs. */
const formats = (f: CategoryFacts) => {
  if (f.withSvg === f.count)
    return 'Her biri React bileşeni, shadcn/ui bileşeni, Lottie JSON animasyonu ve statik SVG olarak sunulur';
  const base =
    'Her biri React bileşeni, shadcn/ui bileşeni ve Lottie JSON animasyonu olarak sunulur';
  return f.withSvg ? `${base}; ${f.withSvg} tanesi statik SVG olarak da mevcuttur` : base;
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `React ve Lottie için ${lower(f.title)}`,
      `React için ${lower(f.title)}`,
      `Ücretsiz ${lower(f.title)}`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.title}: ${f.count} ücretsiz ikon, örneğin ${examples}. React, shadcn/ui ve Lottie JSON için hover, tıklama ve döngü mikro animasyonları; MIT lisanslı.`,
        `${f.title}: ${f.count} ücretsiz ikon, örneğin ${examples}. React, shadcn/ui ve Lottie JSON için, MIT lisanslı.`,
        `${f.title}: ${f.count} ücretsiz ikon, örneğin ${examples}. React, shadcn/ui ve Lottie için, MIT.`,
        `${f.title}: React, shadcn/ui ve Lottie JSON için ${f.count} ücretsiz ikon, MIT lisanslı.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays =
        f.groups.length === 1
          ? `${f.count} ikonun tamamı ${f.groups[0].plays}`
          : `${f.count} ikondan ${list(f.groups.map(({ count, plays: phrase }) => `${count} tanesi ${phrase}`))}`;
      return `${plays}. ${formats(f)}. MIT lisansı sayesinde ticari projelerde de ücretsiz kullanılabilir.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = lower(f.title);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `${f.name} kategorisinde hangi ikonlar var?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Hepsi MIT lisansıyla kişisel ve ticari projelerde ücretsiz kullanılabilir; atıf gerekmez.`,
        },
        {
          question: `Bu ${name} React’te nasıl kullanılır?`,
          answer: `react-useanimations paketini kurun, ${ex.importLine} satırını ekleyin ve <UseAnimations animation={${ex.exportName}} size={32} /> ile render edin. İkon kendi etkileşimini (${ex.interactionLabel}) oynatır ve metin rengini izler. shadcn/ui kullanıyorsanız bunun yerine ${ex.shadcnCommand} komutunu çalıştırın.`,
        },
        {
          question: `Bu ${name} React olmadan kullanılabilir mi?`,
          answer: `Evet. Her ikon ${f.site}/icons/<id>.json adresinde bir Lottie JSON dosyasıdır (örneğin ${f.site}/icons/${ex.id}.json) ve lottie-web, lottie-ios, lottie-android ya da Flutter’ın lottie paketiyle oynatılabilir${
            f.withSvg
              ? '; statik SVG’ler her ikonun kendi sayfasında (ikon sayfaları yalnızca İngilizce)'
              : ''
          }. ${
            n
              ? `${titles(f.expressions, 6)} After Effects ifadeleri (expressions) kullandığı için web’de lottie-web’in tam sürümü (full build) gerekir.`
              : 'Hiçbiri ifade (expression) kullanmadığı için lottie-web’in hafif sürümü (light build) yeterlidir.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · MIT lisanslı`,
    allIcons: (name: string) => `${name} kategorisindeki tüm ikonlar`,
    whereToUse: 'Nerede kullanılır',
    byInteraction: 'Etkileşime göre',
    addOne: 'Uygulamanıza ekleyin',
    addOneHtml: (label: string, name: string) =>
      `React’te ${code('react-useanimations')} paketini kurup ikonu import etmeniz yeterli; ikon kendi etkileşimini (${label}) kendiliğinden oynatır. Bu kategorideki her ikon aynı şekilde çalışır: ${code(name)} yerine ikonun sayfasındaki adı yazın.`,
    shadcnHtml: (href: string) => `${link(href, 'shadcn/ui')} ile CLI hazır bir bileşen ekler:`,
    noReactHtml: (href: string) =>
      `React kullanmıyor musunuz? Her ikon ${code('/icons/&lt;id&gt;.json')} adresinde bir Lottie JSON dosyasıdır; web, iOS, Android ve Flutter oynatıcıları için ${link(href, 'Lottie ikonları')} sayfasına bakın.`,
    more: 'Diğer kategoriler',
    allIconsButton: 'Tüm ikonlar',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `React ve Lottie için ${lower(f.title)}`,
      `React için ${lower(f.title)}`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => [
      `${f.title}: ${f.count} ücretsiz ikon, hepsi ${f.plays}. Örneğin ${list(f.titles.slice(0, 3))}. React, shadcn/ui ve Lottie JSON için, MIT lisanslı.`,
      `${f.title}: ${f.count} ücretsiz ikon, hepsi ${f.plays}. React, shadcn/ui ve Lottie JSON için, MIT lisanslı.`,
      `${f.title}: ${f.count} ücretsiz ikon. React, shadcn/ui ve Lottie JSON için, MIT lisanslı.`,
    ],
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Hangi ikonlar “${f.label}” etkileşimini kullanır?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'Kullanıcı azaltılmış hareketi tercih ederse ne olur?',
        answer: `${f.reducedMotion} React bileşeni prefers-reduced-motion ayarını okur ve ayar değiştiğinde güncellenir; bunun için kod yazmanız gerekmez.`,
      },
      {
        question: 'Bir ikonun etkileşimini nasıl değiştiririm?',
        answer: `Her ikon kendisi için tasarlanan etkileşimi oynatır. Herhangi bir ikona bu davranışı vermek için interaction="${f.interaction}" geçin; başka bir davranış için başka bir değer ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') kullanın. Oynatmayı autoplay, loop ve speed prop’larıyla ayarlayabilirsiniz.${
          f.interaction === 'click-toggle'
            ? ' Durumu kendiniz yönetmek için active={isOn} geçin ve onClick içinde güncelleyin: tıklamalar artık ikonu kendiliğinden değiştirmez.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `“${label}” etkileşimli tüm ikonlar`,
    behaviour: 'Nasıl davranır',
    hoverNote:
      ' Dokunmatik ekranlarda dokunmak hover animasyonlarını başlatmaz; ikon odaklanabilir bir öğenin içindeyse klavye odağı başlatır.',
    handled: 'Bunların hepsini React bileşeni halleder; siz yalnızca ikonu seçersiniz.',
    whereToUse: 'Nerede kullanılır',
    byCategory: 'Kategoriye göre',
    useInReact: 'React’te kullanın',
    overrideHtml: `Burada listelenen ikonlar varsayılan olarak bu etkileşimi oynatır. Diğer ikonlar da kullanabilir: ${code('interaction')} prop’unu geçmeniz yeterli.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} normalde '${interaction}' kullanır`,
    extra: {
      loop: 'Döngüler otomatik oynar ve ekranın dışına kaydırıldıklarında duraklar. speed ile yavaşlatabilir, loop={false} ile bir kez oynatabilir ya da autoplay={false} ile sabit tutabilirsiniz:',
      'click-toggle':
        'Tıklamalar ikonu kendiliğinden değiştirir. İkonu kendi state’inizle senkron tutmak için active geçin: ikon active her değiştiğinde animasyon oynatır ve tıklamalar artık onu kendi başına değiştirmez.',
      'click-replay':
        'Odaklanabilmesi ve ekran okuyucuların duyurabilmesi için ikonu render prop’uyla gerçek bir düğmenin içine koyun. Sizin onClick’iniz önce çalışır; animasyonu atlamak için event.preventDefault() çağırın.',
      hover:
        'İkonu render prop’uyla bir bağlantı ya da düğmenin içine koyun: animasyon, öğe klavye odağı aldığında da oynar ve dokunmatik ekranlardaki dokunuşlar onu tetiklemez.',
      'hover-replay':
        'Yalnızca ikonu değil, kartın ya da bağlantının tamamını hover alanı yapın: render prop’uyla olaylar sizin öğenize bağlanır ve klavye odağı da animasyonu oynatır.',
      'hover-loop':
        'Döngüyü klavye odağı da dahil bağlantının tamamının tetiklemesi için render prop’unu kullanın. Hızı speed ile değiştirin:',
    },
    codeText: {
      halfSpeed: 'yarı hız',
      playsOnce: 'bir kez oynar, sonra durur',
      staticFrame: 'statik ilk kare',
      endState: 'true bitiş durumunu gösterir',
      closeMenu: 'Menüyü kapat',
      openMenu: 'Menüyü aç',
      download: 'İndir',
      archive: 'Arşiv',
      weeklyGrowth: 'Haftalık büyüme',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Tüm prop’lar ${link(docs, 'dokümantasyonda')}. React dışında ikonlar Lottie JSON dosyalarıdır; etkileşimlerin lottie-web ile nasıl yeniden oluşturulacağını ${link(lottie, 'Lottie ikonları')} sayfası gösterir.`,
    other: 'Diğer etkileşimler',
    browseByCategory: 'Kategoriye göre göz at',
  },
};
