import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: 'ループ',
      'click-toggle': 'クリック',
      'click-replay': 'クリック',
      hover: 'ホバー',
      'hover-loop': 'ホバー',
      'hover-replay': 'ホバー',
    },
  },
  iconDialog: {
    hints: {
      loop: '自動で再生されます',
      'click-toggle': 'クリックで切り替え',
      'click-replay': 'クリックでもう一度再生',
      hover: 'ホバーで再生、離れると逆再生',
      'hover-loop': 'ホバー中はループ',
      'hover-replay': 'ホバーで再生',
    },
    preview: '{title} のプレビュー',
    colors: 'プレビューの色',
    color: '色 {color}',
    textColor: 'テキストの色',
    interaction: 'インタラクション',
    duration: '再生時間',
    seconds: '{seconds} 秒',
    import: 'インポート',
    close: '閉じる',
    code: 'コード',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'ファイル' },
    copy: 'コピー',
    download: 'ダウンロード',
    iconPage: 'アイコンのページ',
  },
  interactionDemo: {
    click: 'カードをクリック',
    loop: '自動で再生されます',
    hover: 'カードにホバー',
  },
  mobileMenu: {
    menu: 'メニュー',
    nav: 'メイン',
  },
  search: {
    clear: '検索をクリア',
  },
  themeToggle: {
    toLight: 'ライトテーマに切り替える',
    toDark: 'ダークテーマに切り替える',
  },
};
