// 홈 페이지(/)와 FAQ, 허브 링크. 개수·패키지 버전·링크 주소는 인수로 받아 한국어 문장 전체를 만듭니다.
import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

// 한국어 명사는 수에 따라 형태가 바뀌지 않으므로 모든 수에 같은 형태를 씁니다.
const iconCount = { other: '아이콘 {n}개' };

export const home: Messages['home'] = {
  title: '애니메이션 아이콘 라이브러리 — useAnimations',
  description: (count: number) =>
    `무료 마이크로 애니메이션 ${count}개: 호버·클릭·루프가 내장된 React·shadcn/ui·Lottie 애니메이션 아이콘 라이브러리. MIT.`,

  hero: {
    badge: (count: number) => `아이콘 ${count}개 · 의존성 0 · MIT`,
    headline: { start: '', accent: '살아 움직이는', end: ' 아이콘.' },
    h1: 'React, shadcn/ui, Lottie용 무료 애니메이션 아이콘',
    intro: (count: number) =>
      `호버, 클릭, 루프 마이크로 인터랙션이 내장된, 직접 디자인한 마이크로 애니메이션 ${count}개. React 컴포넌트로 쓰거나, shadcn으로 추가하거나, SVG와 Lottie JSON으로 내려받으세요. MIT 라이선스입니다.`,
    browse: '아이콘 둘러보기',
    fieldHint: '포인터를 아이콘 위로 움직여 보세요.',
  },

  numbers: {
    label: '한눈에 보기',
    icons: '애니메이션 아이콘',
    interactions: '내장 인터랙션',
    size: '플레이어 크기(gzip)',
    dependencies: '의존성',
  },

  interactions: {
    eyebrow: '내장 인터랙션',
    title: '모든 아이콘이 움직이는 법을 압니다.',
    intro:
      '각 아이콘에는 디자인할 때 정한 인터랙션이 들어 있습니다. 넣기만 하면 바로 동작하고, prop 하나로 다른 인터랙션을 고를 수도 있습니다. 직접 해 보세요.',
    demos: {
      loop: '계속 재생됩니다. 로더와 상시 상태 표시에 어울립니다.',
      'click-toggle': '메뉴와 닫기, 재생과 일시정지처럼 두 상태 사이를 전환합니다.',
      'click-replay': '클릭할 때마다 처음부터 다시 재생되어 피드백을 줍니다.',
      hover: '포인터가 들어오면 정방향, 나가면 역방향으로 재생됩니다.',
      'hover-loop': '호버하는 동안 반복 재생되고, 벗어나면 현재 사이클을 마저 끝냅니다.',
      'hover-replay': '포인터가 들어올 때마다 처음부터 한 번 재생됩니다.',
    },
  },

  browser: {
    eyebrow: '라이브러리',
    title: (count: number) => `무료 애니메이션 아이콘 ${count}개`,
    intro:
      '호버하거나 클릭하면 재생됩니다. 아이콘을 열면 코드와 다운로드 파일(Lottie JSON, SVG, ZIP)을 볼 수 있습니다.',
    search: '아이콘 검색',
    searchPlaceholder: (count: number) =>
      `아이콘 ${count}개 검색 — “eye”, “bell”, “arrow”처럼 영어로 입력하세요`,
    interaction: '인터랙션',
    allInteractions: '모든 인터랙션',
    color: '아이콘 색상',
    colors: {
      text: '텍스트 색상',
      indigo: '인디고',
      red: '빨강',
      amber: '앰버',
      teal: '틸',
      violet: '바이올렛',
    },
    customColor: '사용자 지정 색상',
    size: '크기',
    category: '카테고리',
    all: '전체',
    count: iconCount,
    noMatch: '일치하는 아이콘이 없습니다.',
    noMatchHintHtml: (href: string) =>
      `다른 단어로 검색하거나 ${link(href, '아이콘을 제안해 주세요')}.`,
  },

  everywhere: {
    eyebrow: '원하는 방식으로',
    title: '설치하고, 가져오면 끝.',
    intro:
      '의존성 없는 React 컴포넌트, shadcn 레지스트리, 고정 URL로 내려받는 파일, 그리고 AI 에이전트가 읽을 수 있는 카탈로그를 제공합니다.',
    docs: '문서 읽기',
    tablist: '플랫폼',
    tabs: { react: 'React', shadcn: 'shadcn', files: '파일', agents: '에이전트' },
    codeText: {
      afterAdding: '추가한 뒤',
      files: '모든 아이콘을 SVG, 애니메이션(Lottie JSON), 둘을 묶은 ZIP으로 제공',
    },
  },

  features: {
    title: '가볍고, 접근성 있고, 스타일은 마음대로.',
    colors: '내 색상을 따라갑니다',
    colorsHtml: `아이콘은 ${code('currentColor')}를 사용하므로 텍스트 색상, 호버 상태, 다크 모드를 알아서 따라갑니다. prop, 클래스, 일반 CSS로 덮어쓸 수 있습니다.`,
    tiny: '작게 설계했습니다',
    tinyText: '내장 플레이어, 의존성 0. 아이콘 하나하나가 2 kB짜리 개별 모듈입니다.',
    accessible: '기본으로 접근성 지원',
    accessibleText:
      '동작 줄이기 설정을 존중하고, 키보드 포커스에도 호버 애니메이션을 재생하며, 레이블을 지정하지 않으면 스크린 리더에 노출되지 않습니다.',
    ssr: '서버 렌더링 지원',
    ssrText:
      'Next.js, Remix, Astro에서 안전하게 렌더링되는 클라이언트 컴포넌트입니다. 아이콘은 어디서든 가져올 수 있는 순수 데이터입니다.',
    agents: '에이전트를 위한 설계',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `모든 아이콘의 키워드가 담긴 타입 있는 카탈로그, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')}, 마크다운 문서를 제공합니다.`,
  },

  browse: {
    title: '알맞은 마이크로 애니메이션 찾기',
    byCategory: '카테고리별로 보기',
    byInteraction: '인터랙션별로 보기',
    formats: '전체 아이콘과 포맷',
  },

  hubs: {
    icons: '전체 애니메이션 아이콘',
    categories: '아이콘 카테고리',
    interactions: '인터랙션별 아이콘',
    lottie: 'Lottie 아이콘(JSON)',
    shadcn: 'shadcn/ui 애니메이션 아이콘',
  },

  faqTitle: '자주 묻는 질문',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: '마이크로 애니메이션과 애니메이션 아이콘이란 무엇인가요?',
      answer:
        '마이크로 애니메이션은 사용자 동작에 반응하는 짧고 목적이 하나인 움직임입니다. 닫기 버튼으로 바뀌는 메뉴 아이콘, 게시물에 좋아요를 누르면 채워지는 하트, 새 알림이 오면 울리는 벨 같은 것들이죠. 애니메이션 아이콘은 그중 가장 흔한 형태입니다. 인터페이스가 즉각 반응하는 느낌을 주고, 추가 텍스트 없이도 상태 변화를 보여 줍니다.',
    },
    {
      question: 'Lottie 파일과 SVG 파일은 무엇이 다른가요?',
      answer:
        'Lottie JSON 파일에는 애니메이션 전체가 들어 있어서 react-useanimations에 내장된 플레이어를 비롯해 어떤 Lottie 플레이어로도 재생할 수 있습니다. SVG 파일은 정지 상태의 아이콘 이미지로, 상태마다 하나씩(예: eye와 eye-off) 있습니다. 이메일, 문서, 디자인 도구, JavaScript를 쓸 수 없는 환경의 대체 이미지처럼 움직임이 없어야 하는 곳에 쓰세요.',
    },
    {
      question: 'Next.js와 서버 렌더링에서도 동작하나요?',
      answer:
        "네. 컴포넌트에 'use client'가 지정되어 있고 애니메이션은 브라우저에서만 그리므로, 동적 import 없이 서버 컴포넌트와 Next.js, Remix, Astro 같은 SSR 프레임워크에서 렌더링할 수 있습니다. 아이콘 모듈은 순수 데이터라서 서버 컴포넌트에서 가져와 props로 넘길 수 있습니다.",
      link: { href: f.links.serverRendering, label: 'Next.js와 서버 렌더링' },
    },
    {
      question: '상업용 프로젝트에 아이콘을 써도 되나요?',
      answer:
        '네. 아이콘과 react-useanimations 패키지는 MIT 라이선스이므로 개인·상업용 작업에서 사용, 수정, 재배포할 수 있습니다. 출처 표기는 해 주시면 감사하지만 필수는 아닙니다.',
      link: { href: f.links.licence, label: '라이선스 및 이용 약관' },
    },
    {
      question: 'React 없이도 아이콘을 쓸 수 있나요?',
      answer:
        '네. 모든 아이콘은 표준 Lottie JSON 파일이라서 순수 JavaScript, Vue, Svelte, Angular, CMS에서는 lottie-web으로, iOS, Android, Flutter에서는 각 플랫폼의 Lottie 플레이어로 재생할 수 있습니다. Lottie 아이콘 페이지에 파일 URL과 인터랙션별 lottie-web 예제 코드가 있습니다.',
      link: { href: f.links.lottie, label: 'Lottie 아이콘' },
    },
    {
      question: '아이콘을 쓰면 번들 크기가 얼마나 늘어나나요?',
      answer: `react-useanimations ${f.version}의 플레이어는 의존성 없이 gzip 기준 약 8 kB이고, 아이콘은 하나하나가 1~15 kB(중앙값 2 kB)의 개별 모듈이므로 번들에는 가져온 아이콘만 포함됩니다.`,
    },
  ],

  cta: {
    title: { start: '인터페이스에 ', accent: '생동감', end: '을 더하세요.' },
    text: '무료이고 MIT 라이선스입니다. 개인·상업용 작업 모두에 쓸 수 있습니다.',
    start: '시작하기',
  },

  schema: {
    software: (count: number) =>
      `호버, 클릭, 루프 인터랙션이 내장된 React 컴포넌트와 애니메이션 아이콘(Lottie) ${count}개. 의존성이 없습니다.`,
    catalogName: 'useAnimations 아이콘 카탈로그',
    catalog: (count: number) =>
      `useAnimations 아이콘 ${count}개 전체의 id, 제목, 카테고리, 키워드, 인터랙션, Lottie JSON·SVG·ZIP URL, React import 문, shadcn 명령.`,
  },
};
