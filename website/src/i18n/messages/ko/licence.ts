// 라이선스 페이지(/licencing-and-terms). LICENSE 원문은 모든 언어에서 영어로 표시됩니다.
import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: '라이선스 및 이용 약관 — useAnimations',
  description:
    'MIT 라이선스: useAnimations 아이콘과 react-useanimations는 개인·상업용 사용·재배포 무료, 출처 표기 불필요.',
  name: '라이선스 및 이용 약관',
  heading: '자유롭게 쓰세요. MIT 라이선스입니다.',
  introHtml: (mitHref: string) =>
    `useAnimations 아이콘과 <code>react-useanimations</code> 패키지는 <a href="${mitHref}">MIT 라이선스</a>로 공개되어 있습니다.`,
  canDo: '할 수 있는 일',
  canDoItemsHtml: [
    '개인·상업용 웹사이트, 앱, 제품에서 아이콘을 <strong>사용</strong>할 수 있습니다.',
    '색상, 크기, 타이밍, 움직임 자체를 바꾸는 등 자유롭게 <strong>수정</strong>할 수 있습니다.',
    '아이콘 팩, 템플릿, 테마, UI 키트, 컴포넌트 레지스트리에 포함하는 것을 비롯해 <strong>재배포</strong>할 수 있습니다.',
  ],
  attribution: '출처 표기',
  attributionText:
    '필수는 아니지만, 해 주시면 감사하겠습니다. 파일 자체를 재배포할 때는 라이선스 고지를 유지하고, 출처를 밝히고 싶다면 다음 문구를 사용하세요.',
  credit: (link: string) => `애니메이션 아이콘 제공: ${link}`,
  noWarranty: '보증 없음',
  noWarrantyText: '아이콘과 코드는 어떠한 종류의 보증도 없이 "있는 그대로" 제공됩니다.',
  licenseText: '라이선스 원문',
  bindingNote: '아래 라이선스 원문은 영어 원본이며, 법적 효력은 이 영어 원본에 있습니다.',
};
