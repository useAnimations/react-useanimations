// React 岛组件（components/*.tsx）中的文字；'{name}' 占位符由组件填充。
import type { Messages } from '../en';

export const islands: Messages['islands'] = {
  iconCard: {
    hints: {
      loop: '循环',
      'click-toggle': '点击',
      'click-replay': '点击',
      hover: '悬停',
      'hover-loop': '悬停',
      'hover-replay': '悬停',
    },
  },
  iconDialog: {
    hints: {
      loop: '自动播放',
      'click-toggle': '点击切换',
      'click-replay': '点击重播',
      hover: '悬停播放，移开倒放',
      'hover-loop': '悬停循环播放',
      'hover-replay': '悬停播放',
    },
    preview: '{title} 预览',
    colors: '预览颜色',
    color: '颜色 {color}',
    textColor: '文字颜色',
    interaction: '交互方式',
    duration: '时长',
    seconds: '{seconds} 秒',
    import: '导入',
    close: '关闭',
    code: '代码',
    tabs: { react: 'React', shadcn: 'shadcn', files: '文件' },
    copy: '复制',
    download: '下载',
    iconPage: '图标页面',
  },
  interactionDemo: {
    click: '点击卡片',
    loop: '自动播放',
    hover: '将指针移到卡片上',
  },
  mobileMenu: {
    menu: '菜单',
    nav: '主导航',
  },
  search: {
    clear: '清除搜索',
  },
  themeToggle: {
    toLight: '切换到浅色主题',
    toDark: '切换到深色主题',
  },
};
