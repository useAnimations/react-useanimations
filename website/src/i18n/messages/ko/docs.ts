// 문서 페이지의 틀. 본문은 src/content/documentation.ko.md에 있습니다.
import type { Messages } from '../en';

export const docs: Messages['docs'] = {
  title: '문서 — useAnimations',
  description: (iconCount: number) =>
    `React와 shadcn/ui에서 애니메이션 아이콘 ${iconCount}개를 쓰는 방법: 인터랙션, props, 색상, 파일, 접근성.`,
  badge: '문서',
  onThisPage: '이 페이지의 내용',
  viewAsMarkdown: '마크다운으로 보기',
  headline: 'useAnimations 문서',
  summary: 'React와 shadcn/ui에서 useAnimations 애니메이션 아이콘을 사용하는 방법.',
  crumb: '문서',
  faq: [
    {
      question: 'useAnimations를 상업용 프로젝트에 무료로 쓸 수 있나요?',
      answer: '네. 아이콘과 React 패키지는 MIT 라이선스이며, 출처 표기도 필요 없습니다.',
    },
    {
      question: 'React에서 useAnimations 아이콘은 어떻게 쓰나요?',
      answer:
        'react-useanimations를 설치하고 UseAnimations와 아이콘(예: react-useanimations/lib/checkmark)을 가져온 뒤 <UseAnimations animation={checkmark} size={32} />를 렌더링하세요.',
    },
    {
      question: '아이콘 색상은 어떻게 바꾸나요?',
      answer:
        '아이콘은 텍스트 색상을 따라갑니다. strokeColor와 fillColor, CSS color, 또는 path에 직접 스타일을 지정해 바꿀 수 있습니다.',
    },
    {
      question: 'React 없이도 쓸 수 있나요?',
      answer:
        '패키지는 React용입니다. 하지만 모든 아이콘은 표준 Lottie JSON 파일이기도 해서 어떤 Lottie 플레이어(lottie-web, dotLottie, lottie-react-native, lottie-ios, lottie-android, Flutter)로도 재생할 수 있고, 정적 SVG로도 제공됩니다. 문서의 "React 없이 사용하기"와 useanimations.com/lottie-icons를 참고하세요.',
    },
  ],
};
