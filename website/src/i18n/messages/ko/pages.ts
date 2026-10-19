// 허브 페이지: /icons, /categories, /interactions, /lottie-icons, /shadcn-animated-icons.
// Html로 끝나는 문자열에는 <code>, <a>, <strong> 태그가 들어갑니다. 링크 주소는 인수로 받습니다.
import type { Messages } from '../en';
import type { Faq } from '../en/hubs';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `카테고리별 애니메이션 아이콘 ${count}개`,
      `애니메이션 아이콘 ${count}개`,
    ],
    descriptions: (count: number, categories: number) => [
      `useAnimations 아이콘 전체를 한 페이지에: ${categories}개 카테고리, 무료 애니메이션 아이콘 ${count}개. React·shadcn/ui·Lottie JSON·SVG 지원, MIT.`,
      `무료 애니메이션 아이콘 ${count}개를 카테고리 ${categories}개로 정리. React·shadcn/ui·Lottie JSON·SVG, MIT.`,
    ],
    title: '전체 애니메이션 아이콘',
    badge: (count: number) => `아이콘 ${count}개 · MIT 라이선스`,
    introHtml: (browser: string) =>
      `세트의 모든 아이콘을 카테고리별로 모았습니다. 아이콘을 열면 실시간 미리보기, React·shadcn/ui 코드, Lottie JSON·SVG·ZIP 다운로드가 있습니다(아이콘 페이지는 영어로 제공됩니다). 키워드로 검색하고 애니메이션을 바로 재생해 보려면 ${link(browser, '아이콘 브라우저')}를 이용하세요.`,
    categoriesNav: '카테고리',
    byInteraction: '인터랙션별:',
    categoryLink: (count: number, name: string) => `${name} 아이콘 ${count}개`,
  },

  categories: {
    titles: (categories: number) => [
      `애니메이션 아이콘 카테고리 ${categories}개`,
      '애니메이션 아이콘 카테고리',
    ],
    descriptions: (icons: number, categories: number) => [
      `무료 애니메이션 아이콘 ${icons}개를 카테고리 ${categories}개로: 내비게이션, 액션, 미디어, 로딩, 소셜 미디어 등. React·shadcn/ui·Lottie용.`,
      `무료 애니메이션 아이콘 ${icons}개, 카테고리 ${categories}개. React·shadcn/ui·Lottie용, MIT.`,
    ],
    title: '애니메이션 아이콘 카테고리',
    badge: (icons: number, categories: number) => `아이콘 ${icons}개 · 카테고리 ${categories}개`,
    introHtml: (interactions: string) =>
      `useAnimations의 모든 아이콘은 내비게이션 화살표와 미디어 컨트롤부터 로더와 소셜 미디어 로고까지, 한 카테고리에 속합니다. 카테고리를 열면 해당 아이콘 전체와 쓰기 좋은 곳, 추가하는 코드를 볼 수 있습니다. ${link(interactions, '인터랙션')}별로 둘러볼 수도 있습니다.`,
    iconCount: (n: number) => `아이콘 ${n}개`,
  },

  interactions: {
    titles: ['마이크로 인터랙션: 호버·클릭·루프 아이콘', '마이크로 인터랙션 아이콘'],
    descriptions: (icons: number, interactions: number) => [
      `애니메이션 아이콘 ${icons}개, 마이크로 인터랙션 ${interactions}가지: 루프, 클릭 토글, 클릭 재생, 호버, 호버 재생, 호버 루프. 동작 줄이기 지원.`,
      `애니메이션 아이콘 ${icons}개와 마이크로 인터랙션 ${interactions}가지: 루프, 클릭, 호버. 동작 줄이기 지원.`,
    ],
    title: '애니메이션 아이콘 인터랙션',
    badge: (interactions: number, icons: number) =>
      `인터랙션 ${interactions}가지 · 아이콘 ${icons}개`,
    introHtml: `모든 아이콘에는 디자인할 때 정한 마이크로 인터랙션이 있습니다. 반복 재생되거나, 클릭하면 전환되거나 다시 재생되거나, 호버하면 재생됩니다. React 컴포넌트가 이를 연결하고 동작 줄이기 설정을 존중하며, <code class="font-mono text-base text-fg">interaction</code> prop으로 어떤 아이콘이든 다른 인터랙션으로 바꿀 수 있습니다.`,
    iconCount: (n: number) => `아이콘 ${n}개`,
    chooseTitle: '인터랙션 고르기',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('지속되는 상태')}(로딩, 활성 경고 등): ${link(href, '루프')}.`,
      'click-toggle': (href: string) =>
        `${strong('켜기·끄기 컨트롤')}(음소거, 메뉴, 비밀번호 표시 등): ${link(href, '클릭 토글')}. 상태를 직접 제어하려면 ${code('active')}를 쓰세요.`,
      'click-replay': (href: string) =>
        `${strong('일회성 동작')}(보내기, 저장, 새로고침 등): ${link(href, '클릭 재생')}.`,
      hover: (href: string) =>
        `${strong('링크가 무엇을 여는지 암시할 때')}: ${link(href, '호버')}. 포인터가 벗어나면 되돌아갑니다.`,
      'hover-replay': (href: string) =>
        `${strong('포인터가 훑고 지나가는 툴바와 목록')}: ${link(href, '호버 재생')}. 스스로 끝까지 재생됩니다.`,
      'hover-loop': (href: string) =>
        `${strong('오래 머물러 보게 하는 링크')}(소셜 아이콘 등): ${link(href, '호버 루프')}.`,
    },
    motionTitle: '동작 줄이기',
    motionHtml: `React 컴포넌트는 ${code('prefers-reduced-motion')}을 따르고 설정이 바뀌면 바로 반영합니다. 터치스크린에서 탭해도 호버 애니메이션은 시작되지 않습니다.`,
    reducedMotion: {
      loop: '아이콘이 자동 재생되지 않고 정지된 첫 프레임에 머뭅니다.',
      'click-toggle': '클릭하면 중간 애니메이션 없이 바로 다른 상태로 전환됩니다.',
      'click-replay': '클릭은 여전히 핸들러에 전달되지만 애니메이션은 재생되지 않습니다.',
      hover: '호버해도 애니메이션이 재생되지 않습니다.',
      'hover-replay': '호버해도 애니메이션이 재생되지 않습니다.',
      'hover-loop': '호버하는 동안에도 아이콘이 움직이지 않습니다.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `무료 Lottie 아이콘: 애니메이션 JSON 아이콘 ${count}개`,
      `무료 Lottie 아이콘 ${count}개`,
      '무료 Lottie 아이콘',
    ],
    descriptions: (count: number) => [
      `무료 Lottie 아이콘 ${count}개, 순수 Lottie JSON, MIT. lottie-web, dotLottie, React, React Native, iOS, Android, Flutter 예제 코드.`,
      `무료 Lottie 아이콘 ${count}개(Lottie JSON, MIT). 웹, React, iOS, Android, Flutter용 예제 코드 포함.`,
    ],
    title: '무료 Lottie 아이콘',
    crumb: 'Lottie 아이콘',
    datasetName: 'useAnimations 아이콘 카탈로그',
    datasetDescription: (count: number) =>
      `Lottie 애니메이션 아이콘 ${count}개의 메타데이터와 파일 URL: id, 제목, 카테고리, 키워드, 인터랙션, 크기, 재생 시간.`,
    badge: (count: number) => `아이콘 ${count}개 · Lottie JSON · MIT 라이선스`,
    intro:
      'useAnimations의 모든 아이콘은 표준 Lottie JSON 애니메이션이라서 웹의 lottie-web, lottie-ios, lottie-android, Flutter, React Native 등 어떤 Lottie 플레이어로도 재생할 수 있습니다. 파일은 MIT 라이선스로 무료이고 가입도 필요 없습니다. CORS가 허용된 고정 URL로 제공되므로 직접 불러오거나 프로젝트에 내려받아 쓰면 됩니다.',
    popular: '인기 Lottie 아이콘',
    allIcons: (count: number) => `아이콘 ${count}개 전체`,
    filesTitle: '파일과 URL',
    filesIntroHtml: `각 아이콘에는 미리보기와 다운로드가 있는 ${code('/icons/&lt;id&gt;')} 페이지가 있습니다. 파일은 다음과 같습니다.`,
    files: {
      json: 'Lottie JSON 애니메이션',
      zip: 'JSON과 정적 SVG',
      svg: '상태별 정적 SVG',
      catalog: '전체 아이콘 카탈로그',
    },
    catalogHtml: (catalog: string, median: number) =>
      `${link(catalog, 'icons.json')}에는 모든 아이콘의 id, 제목, 카테고리, 키워드, 인터랙션, 크기, 재생 시간, 파일 URL이 들어 있어서 스크립트에서 키워드로 아이콘을 고르거나 코딩 에이전트에게 고르게 하기 쉽습니다. Lottie 파일 크기의 중앙값은 ${median} kB입니다.`,
    players: {
      web: {
        title: '웹: lottie-web',
        text: 'Airbnb가 만든 레퍼런스 플레이어입니다. CDN에서 불러와 아이콘 URL을 지정하고 SVG 렌더러를 선택하세요. SVG 렌더러를 쓰면 아이콘이 선명하게 유지되고 CSS로 색을 바꿀 수 있습니다. light 빌드는 익스프레션을 건너뛰므로 full 빌드(lottie.min.js)를 쓰세요.',
        cssLabel: '텍스트 색상 따라가기(SVG 렌더러)',
      },
      'web-interactions': {
        title: '웹: 호버·클릭 인터랙션',
        text: 'lottie-web은 재생과 정지만 할 뿐, 인터랙션은 직접 구현해야 합니다. 아래는 동작 줄이기를 지원하는 menu 아이콘의 클릭 토글입니다. 다른 인터랙션도 모두 같은 패턴을 따르며, 아래의 React 컴포넌트는 이 모든 것을 대신 처리해 줍니다.',
      },
      dotlottie: {
        title: '웹: dotLottie 웹 컴포넌트',
        text: 'LottieFiles의 플레이어로, WebAssembly 엔진으로 캔버스에 렌더링하며 .lottie 파일뿐 아니라 일반 Lottie JSON도 재생합니다. 캔버스는 파일의 색상을 그대로 쓰므로, JSON의 색을 바꾸지 않으면 아이콘은 검은색으로 표시됩니다.',
        jsLabel: '또는 JavaScript API: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: '별도의 Lottie 플레이어를 설치할 필요가 없습니다. 패키지에 8 kB짜리 자체 플레이어가 있어서 각 아이콘의 인터랙션을 재생하고, 텍스트 색상을 따라가며, 동작 줄이기 설정을 존중합니다. 아이콘마다 별도 모듈이라 가져온 아이콘만 번들에 포함됩니다.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: '오프라인에서 쓰려면 require()로 JSON을 번들에 포함하고, 아니면 URL에서 불러오세요.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Swift Package Manager로 https://github.com/airbnb/lottie-spm.git 패키지를 추가한 뒤, JSON을 번들에 넣거나 URL에서 불러오세요.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'com.airbnb.android:lottie-compose(뷰 기반이라면 com.airbnb.android:lottie)를 추가하세요. 오프라인에서 쓰려면 JSON을 res/raw에 넣고 LottieCompositionSpec.RawRes로 불러옵니다.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'lottie 패키지는 Android, iOS, 웹, 데스크톱을 지원하는 순수 Dart 플레이어입니다.',
      },
    },
    expressionsTitle: '익스프레션을 쓰는 아이콘',
    expressionsHtml: (count: number) =>
      `아이콘 ${count}개에 After Effects 익스프레션(${code('loopOut')} 또는 ${code('wiggle')})이 쓰였습니다. 웹에서는 ${code('lottie_light')}가 아닌 lottie-web의 full 빌드로 재생하세요. 네이티브 플레이어는 익스프레션을 평가하지 않으므로 iOS, Android, Flutter에서는 직접 테스트하거나 다른 아이콘을 고르세요. react-useanimations는 디자인된 그대로 재생합니다.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: '이 Lottie 아이콘을 상업적으로 무료로 쓸 수 있나요?',
        answer: `네. Lottie 아이콘 ${f.count}개 모두 MIT 라이선스입니다. 개인·상업용 프로젝트에서 사용, 수정, 재배포할 수 있고, 출처 표기도 다운로드용 계정도 필요 없습니다.`,
      },
      {
        question: 'Lottie 파일은 어떤 포맷인가요?',
        answer: `셰이프 레이어로만 이루어진 표준 Lottie JSON(Bodymovin 포맷)입니다. 이미지, 폰트, 외부 에셋은 없습니다. 각 아이콘은 24 px 또는 32 px 아트보드에 그려져 어떤 크기로도 확대·축소되며, 파일 크기는 ${f.minSize}~${f.maxSize} kB, 중앙값 ${f.medianSize} kB입니다.`,
      },
      {
        question: 'React에서 아이콘을 쓰려면 lottie-web이 필요한가요?',
        answer:
          '아니요. react-useanimations에는 의존성 없는 8 kB짜리 자체 플레이어가 있으므로, 패키지 하나를 설치하고 필요한 아이콘만 가져오면 됩니다. lottie-web은 React 밖, 즉 일반 웹 페이지나 다른 프레임워크에서만 필요합니다.',
      },
      {
        question: 'lottie-web의 full 빌드가 필요한 아이콘은 무엇인가요?',
        answer: `아이콘 ${f.expressions.length}개에 After Effects 익스프레션(loopOut 또는 wiggle)이 쓰였습니다: ${f.expressions.join(', ')}. 웹에서는 lottie-web의 full 빌드가 필요하며, lottie_light는 익스프레션을 무시합니다. 네이티브 플레이어(lottie-ios, lottie-android, Flutter의 lottie)도 익스프레션을 평가하지 않으므로 이 아이콘들은 움직임이 다를 수 있습니다.`,
      },
      {
        question: 'Lottie 아이콘의 색상을 바꿀 수 있나요?',
        answer:
          '웹에서는 lottie-web의 SVG 렌더러가 색상을 속성으로 쓰기 때문에 path에 CSS 규칙을 적용하면 색이 바뀝니다. 네이티브 플레이어에서는 동적 속성 API를 씁니다. iOS는 ColorValueProvider, Android는 LottieProperty.COLOR와 STROKE_COLOR, Flutter는 ValueDelegate.color입니다.',
      },
    ],
    byCategory: '카테고리별 Lottie 아이콘',
  },

  shadcn: {
    titles: (count: number) => [
      `shadcn/ui용 애니메이션 아이콘: 컴포넌트 ${count}개`,
      'shadcn/ui용 애니메이션 아이콘',
      'shadcn/ui 애니메이션 아이콘',
    ],
    descriptions: (count: number) => [
      `shadcn/ui용 애니메이션 아이콘 ${count}개. shadcn CLI 명령 하나로 추가. 호버·클릭·루프 마이크로 인터랙션, MIT, lottie-web 불필요.`,
      `shadcn/ui용 애니메이션 아이콘 ${count}개. CLI 명령 하나로 추가하고, lottie-web 없이 동작. MIT.`,
    ],
    title: 'shadcn/ui용 애니메이션 아이콘',
    crumb: 'shadcn/ui',
    popularList: '인기 shadcn/ui 애니메이션 아이콘',
    badge: (count: number) => `컴포넌트 ${count}개 · shadcn 레지스트리 · MIT 라이선스`,
    intro:
      'useAnimations의 모든 아이콘은 shadcn 레지스트리에 있습니다. CLI 명령 하나로 타입이 지정된 React 컴포넌트가 프로젝트에 추가되며, 디자인된 호버·클릭·루프 인터랙션, 동작 줄이기 지원, 테마를 따라가는 색상이 함께 들어갑니다. 다른 shadcn/ui 컴포넌트처럼 코드는 내 저장소에 들어갑니다.',
    addTitle: '아이콘 추가하기',
    addIntro: '아이콘의 레지스트리 URL로 shadcn CLI를 실행하세요.',
    namingHtml: `컴포넌트 이름은 ${code('Animated')} + PascalCase로 쓴 아이콘 id(${code('check-box')} → ${code('AnimatedCheckBox')})이고, ${code('components/animations/&lt;id&gt;.tsx')}에 생성됩니다. CLI는 공용 래퍼 ${code('components/use-animation.tsx')}도 추가하고 ${code('react-useanimations')}를 설치합니다. 이 패키지에 자체 플레이어가 있으므로 lottie-web은 필요 없습니다.`,
    namespaceTitle: '레지스트리 네임스페이스로 짧게 쓰기',
    namespaceHtml: `${code('components.json')}에 레지스트리를 한 번만 추가하면, 이후에는 이름으로 여러 아이콘을 한꺼번에 추가할 수 있습니다.`,
    registryHtml: (registry: string) =>
      `레지스트리 인덱스 ${link(registry, '/r/registry.json')}에는 모든 항목의 제목, 카테고리, 인터랙션이 나열되어 있습니다.`,
    usageTitle: 'shadcn Button 안에서 쓰기',
    usageHtml: `컴포넌트는 ${code('UseAnimations')}와 같은 props를 받습니다. menu 아이콘 같은 토글이라면 ${code('active')}를 전달하고 상태는 버튼에서 관리하세요. 값이 바뀔 때마다 아이콘이 애니메이션됩니다.`,
    colorHtml: (docs: string) =>
      `아이콘은 텍스트 색상을 따라가므로 ${code('text-primary')}나 ${code('text-muted-foreground')}로 색을 바꿀 수 있고, 다크 모드에도 따로 할 일이 없습니다. 다른 props와 패턴은 ${link(docs, '문서')}에 있습니다.`,
    codeText: { closeMenu: '메뉴 닫기', openMenu: '메뉴 열기' },
    popular: 'shadcn/ui 인기 아이콘',
    allIcons: (count: number) => `아이콘 ${count}개 전체`,
    popularNote: '각 아이콘 페이지에 shadcn 명령이 나와 있습니다.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'shadcn/ui 애니메이션 아이콘은 무료인가요?',
        answer: `네. 아이콘 ${f.count}개와 컴포넌트 코드 모두 MIT 라이선스로 개인·상업용 프로젝트에 쓸 수 있습니다. 레지스트리에는 계정도 API 키도 필요 없습니다.`,
      },
      {
        question: 'shadcn CLI는 프로젝트에 무엇을 추가하나요?',
        answer: `components/animations/<id>.tsx의 아이콘 컴포넌트, components/use-animation.tsx의 공용 UseAnimation 플레이어 래퍼(레지스트리 의존성으로 한 번만), 그리고 npm의 react-useanimations@^${f.version}입니다. 패키지에 8 kB짜리 자체 플레이어가 있으므로 lottie-web은 필요 없습니다.`,
      },
      {
        question: 'Next.js 서버 컴포넌트에서도 동작하나요?',
        answer:
          '네. 컴포넌트에 "use client"가 지정되어 있고 애니메이션은 브라우저에서만 그리므로, 동적 import나 ssr: false 없이 서버 컴포넌트와 페이지에서 렌더링할 수 있습니다.',
      },
      {
        question: '아이콘의 모양과 움직임을 바꿀 수 있나요?',
        answer:
          '코드는 내 저장소에 있는 내 코드입니다. 컴포넌트는 UseAnimations의 props(size, strokeColor, fillColor, interaction, active, autoplay, loop, speed)를 받습니다. 아이콘은 텍스트 색상을 따라가므로 text-primary나 text-muted-foreground 같은 Tailwind 클래스로 색을 바꿀 수 있습니다.',
      },
    ],
    byCategory: '카테고리별로 보기',
  },
};
