// React 아일랜드(components/*.tsx) 안의 텍스트. '{name}' 자리표시자는 컴포넌트가 채웁니다.
import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: '루프',
      'click-toggle': '클릭',
      'click-replay': '클릭',
      hover: '호버',
      'hover-loop': '호버',
      'hover-replay': '호버',
    },
  },
  iconDialog: {
    hints: {
      loop: '자동으로 재생됩니다',
      'click-toggle': '클릭하면 전환됩니다',
      'click-replay': '클릭하면 다시 재생됩니다',
      hover: '호버하면 재생되고, 벗어나면 되돌아갑니다',
      'hover-loop': '호버하는 동안 반복 재생됩니다',
      'hover-replay': '호버하면 재생됩니다',
    },
    preview: '{title} 미리보기',
    colors: '미리보기 색상',
    color: '색상 {color}',
    textColor: '텍스트 색상',
    interaction: '인터랙션',
    duration: '재생 시간',
    seconds: '{seconds}초',
    import: '가져오기',
    close: '닫기',
    code: '코드',
    tabs: { react: 'React', shadcn: 'shadcn', files: '파일' },
    copy: '복사',
    download: '다운로드',
    iconPage: '아이콘 페이지 →',
  },
  interactionDemo: {
    click: '카드를 클릭해 보세요',
    loop: '자동으로 재생됩니다',
    hover: '카드에 마우스를 올려 보세요',
  },
  mobileMenu: {
    menu: '메뉴',
    nav: '주 메뉴',
  },
  themeToggle: {
    toLight: '라이트 테마로 전환',
    toDark: '다크 테마로 전환',
  },
};
