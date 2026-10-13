// 카테고리·인터랙션 페이지(/categories/<slug>, /interactions/<slug>)의 문장. 사실(개수, 아이콘 이름,
// 예시)을 받아 한국어 어순으로 문장을 만듭니다. Html로 끝나는 문자열에는 <code>, <a> 태그가 들어갑니다.
import type { Interaction } from 'react-useanimations';
import { listIn } from '../../format';
import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';

const list = listIn('ko');
const count = (n: number) => `${n}개`;

/** 최대 `max`개의 이름, 넘치면 '외 N개'. */
const titles = (items: string[], max = 12) =>
  items.length > max ? `${items.slice(0, max).join(', ')} 외 ${items.length - max}개` : list(items);

/** 예시 몇 개: 'Heart, Menu, Eye 등'. */
const examples = (items: string[]) => `${items.slice(0, 3).join(', ')} 등`;

/** 그룹이 여럿일 때 문장을 잇는 형태('…되고'). 마지막 그룹은 PLAYS의 종결형을 씁니다. */
const PLAYS_AND: Record<Interaction, string> = {
  loop: '계속 반복 재생되고',
  'click-toggle': '클릭하면 두 상태 사이를 전환하고',
  'click-replay': '클릭할 때마다 다시 재생되고',
  hover: '호버하면 재생되었다가 포인터가 벗어나면 되돌아가고',
  'hover-replay': '호버하면 한 번 재생되고',
  'hover-loop': '호버하는 동안 반복 재생되고',
};

/** 정적 SVG 안내 문장, 없으면 빈 문자열. */
const svgNote = (f: CategoryFacts) => {
  if (f.withSvg === f.count) return ' 모든 아이콘에 정적 SVG도 있습니다.';
  return f.withSvg ? ` 정적 SVG로도 제공되는 아이콘은 ${count(f.withSvg)}입니다.` : '';
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: (n: number) => `아이콘 ${count(n)}`,

  category: {
    titles: (f: CategoryFacts) => [
      `React·Lottie용 ${f.title}`,
      `React용 ${f.title}`,
      `무료 ${f.title}`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const ex = examples(f.titles);
      return [
        `무료 ${f.title} ${count(f.count)}: ${ex}. 호버·클릭·루프 마이크로 애니메이션, React·shadcn/ui·Lottie JSON 지원, MIT 라이선스.`,
        `무료 ${f.title} ${count(f.count)}: ${ex}. React·shadcn/ui·Lottie JSON 지원, MIT 라이선스.`,
        `무료 ${f.title} ${count(f.count)}: ${ex}. React·shadcn/ui·Lottie, MIT.`,
        `무료 ${f.title} ${count(f.count)}: ${examples(f.titles.slice(0, 2))}. React·Lottie, MIT.`,
        `무료 ${f.title} ${count(f.count)}. React·shadcn/ui·Lottie JSON 지원, MIT 라이선스.`,
        `무료 ${f.title} ${count(f.count)}. React·shadcn/ui·Lottie, MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays =
        f.groups.length === 1
          ? `아이콘 ${count(f.count)} 모두 ${f.groups[0].plays}.`
          : `아이콘 ${count(f.count)} 중 ${f.groups
              .map(({ interaction, count: n, plays: phrase }, i) =>
                i === f.groups.length - 1
                  ? `${count(n)}는 ${phrase}.`
                  : `${count(n)}는 ${PLAYS_AND[interaction]},`
              )
              .join(' ')}`;
      return `${plays} 각 아이콘은 React 컴포넌트, shadcn/ui 컴포넌트, Lottie JSON 애니메이션으로 제공되며, MIT 라이선스로 상업용 프로젝트에도 무료로 쓸 수 있습니다.${svgNote(f)}`;
    },
    faq: (f: CategoryFacts): Faq => {
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `어떤 ${f.title}이 들어 있나요?`,
          answer: `아이콘 ${count(f.count)}: ${titles(f.titles)}. 모두 MIT 라이선스로 개인·상업용 프로젝트에 무료로 쓸 수 있고, 출처 표기도 필요 없습니다.`,
        },
        {
          question: `이 ${f.title}을 React에서 어떻게 쓰나요?`,
          answer: `react-useanimations를 설치하고 import 문(${ex.importLine})을 추가한 뒤 <UseAnimations animation={${ex.exportName}} size={32} />를 렌더링하세요. 아이콘은 ${ex.interactionLabel} 인터랙션으로 재생되고 텍스트 색상을 따라갑니다. shadcn/ui를 쓴다면 대신 ${ex.shadcnCommand} 명령을 실행하세요.`,
        },
        {
          question: `이 ${f.title}을 React 없이 쓸 수 있나요?`,
          answer: `네. 각 아이콘은 ${f.site}/icons/<id>.json에 있는 Lottie JSON 파일(예: ${f.site}/icons/${ex.id}.json)이라 lottie-web, lottie-ios, lottie-android, Flutter의 lottie 패키지로 재생할 수 있습니다.${
            f.withSvg ? ' 정적 SVG는 각 아이콘 페이지(영어)에서 받을 수 있습니다.' : ''
          } ${
            n
              ? `${titles(f.expressions, 6)}에는 After Effects 익스프레션이 쓰였으므로, 웹에서는 lottie-web의 full 빌드가 필요합니다.`
              : '익스프레션을 쓰는 아이콘이 없으므로 lottie-web의 light 빌드로 충분합니다.'
          }`,
        },
      ];
    },
    badge: (n: number) => `아이콘 ${count(n)} · MIT 라이선스`,
    allIcons: (name: string) => `${name} 아이콘 전체`,
    whereToUse: '이런 곳에 쓰세요',
    byInteraction: '인터랙션별',
    addOne: '앱에 추가하기',
    addOneHtml: (label: string, name: string) =>
      `React에서는 ${code('react-useanimations')}를 설치하고 아이콘을 가져오면 됩니다. 아이콘은 별도 설정 없이 ${label} 인터랙션으로 재생됩니다. 이 카테고리의 다른 아이콘도 사용법이 같으니 ${code(name)}만 각 아이콘 페이지에 있는 이름으로 바꾸세요.`,
    shadcnHtml: (href: string) =>
      `${link(href, 'shadcn/ui')}에서는 CLI가 바로 쓸 수 있는 컴포넌트를 추가해 줍니다.`,
    noReactHtml: (href: string) =>
      `React를 쓰지 않나요? 각 아이콘은 ${code('/icons/&lt;id&gt;.json')}에 있는 Lottie JSON 파일입니다. 웹, iOS, Android, Flutter 플레이어는 ${link(href, 'Lottie 아이콘')} 페이지를 참고하세요.`,
    more: '다른 카테고리',
    allIconsButton: '전체 아이콘',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `React·Lottie용 ${f.title}`,
      `React용 ${f.title}`,
      `무료 ${f.title}`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => [
      `무료 ${f.title} ${count(f.count)}: ${examples(f.titles)}. ${f.plays}. React·shadcn/ui·Lottie JSON 지원, MIT 라이선스.`,
      `무료 ${f.title} ${count(f.count)}. ${f.plays}. React·shadcn/ui·Lottie JSON 지원, MIT 라이선스.`,
      `무료 ${f.title} ${count(f.count)}. React·shadcn/ui·Lottie JSON 지원, MIT 라이선스.`,
    ],
    faq: (f: InteractionFacts): Faq => [
      {
        question: `${f.label} 인터랙션을 쓰는 아이콘은 무엇인가요?`,
        answer: `아이콘 ${count(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: '사용자가 동작 줄이기를 설정했다면 어떻게 되나요?',
        answer: `${f.reducedMotion} React 컴포넌트가 prefers-reduced-motion을 읽고 설정이 바뀌면 바로 반영하므로, 따로 코드를 작성할 필요가 없습니다.`,
      },
      {
        question: '아이콘의 인터랙션은 어떻게 바꾸나요?',
        answer: `모든 아이콘은 디자인된 인터랙션으로 재생됩니다. 다른 아이콘에 이 동작을 적용하려면 interaction prop에 "${f.interaction}" 값을 전달하고, 다른 동작으로 바꾸려면 다른 값('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay')을 전달하세요. 재생 방식은 autoplay, loop, speed props로 조정합니다.${
          f.interaction === 'click-toggle'
            ? ' 상태를 직접 제어하려면 active={isOn}을 전달하고 onClick에서 값을 갱신하세요. 그러면 클릭만으로는 아이콘이 전환되지 않습니다.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `${label} 아이콘 전체`,
    behaviour: '동작 방식',
    hoverNote:
      ' 터치스크린에서 탭해도 호버 애니메이션은 시작되지 않으며, 아이콘이 포커스 가능한 요소 안에 있으면 키보드 포커스로도 재생됩니다.',
    handled: '이 모든 처리는 React 컴포넌트가 맡으니, 아이콘만 고르면 됩니다.',
    whereToUse: '이런 곳에 쓰세요',
    byCategory: '카테고리별',
    useInReact: 'React에서 사용하기',
    overrideHtml: `여기에 있는 아이콘은 기본적으로 이 인터랙션으로 재생됩니다. 다른 아이콘도 ${code('interaction')} prop을 전달하면 같은 인터랙션을 쓸 수 있습니다.`,
    normallyUses: (title: string, interaction: string) =>
      `${title}의 기본 인터랙션은 '${interaction}'`,
    extra: {
      loop: '루프 아이콘은 자동 재생되며, 스크롤해서 화면 밖으로 나가면 일시정지합니다. speed로 속도를 늦추거나, loop={false}로 한 번만 재생하거나, autoplay={false}로 정지 상태로 둘 수 있습니다.',
      'click-toggle':
        '클릭하면 아이콘이 알아서 전환됩니다. 상태와 동기화하려면 active를 전달하세요. active가 바뀔 때마다 아이콘이 애니메이션되고, 클릭만으로는 더 이상 전환되지 않습니다.',
      'click-replay':
        'render prop으로 아이콘을 실제 버튼 안에 넣으면 포커스를 받을 수 있고 스크린 리더도 읽어 줍니다. 직접 작성한 onClick이 먼저 실행되며, event.preventDefault()를 호출하면 애니메이션을 건너뜁니다.',
      hover:
        'render prop으로 아이콘을 링크나 버튼 안에 넣으세요. 그러면 요소가 키보드 포커스를 받을 때도 애니메이션이 재생되고, 터치스크린에서 탭해도 재생되지 않습니다.',
      'hover-replay':
        '아이콘만이 아니라 카드나 링크 전체에 호버하게 하세요. render prop을 쓰면 이벤트가 직접 만든 요소에 걸리고, 키보드 포커스로도 애니메이션이 재생됩니다.',
      'hover-loop':
        'render prop을 쓰면 키보드 포커스를 포함해 링크 전체가 루프를 시작합니다. 속도는 speed로 바꿉니다.',
    },
    codeText: {
      halfSpeed: '절반 속도',
      playsOnce: '한 번 재생하고 멈춤',
      staticFrame: '정지된 첫 프레임',
      endState: 'true면 끝 상태를 표시',
      closeMenu: '메뉴 닫기',
      openMenu: '메뉴 열기',
      download: '다운로드',
      archive: '보관',
      weeklyGrowth: '주간 성장률',
    },
    docsHtml: (docs: string, lottie: string) =>
      `모든 props는 ${link(docs, '문서')}에 정리되어 있습니다. React 밖에서는 아이콘이 Lottie JSON 파일이며, lottie-web으로 인터랙션을 재현하는 방법은 ${link(lottie, 'Lottie 아이콘')} 페이지에서 볼 수 있습니다.`,
    other: '다른 인터랙션',
    browseByCategory: '카테고리별로 보기',
  },
};
