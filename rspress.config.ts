import * as path from 'node:path';
import {defineConfig} from 'rspress/config';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'MaaFramework',
  plugins: [mermaid()],
  description: '基于图像识别的自动化黑盒测试框架',
  icon: '/maafw.png',
  lang: 'zh',
  logo: {
    light: '/maafw.png',
    dark: '/maafw.png',
  },
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'MaaFramework',
      description: 'An automation black-box testing framework based on image recognition',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'MaaFramework',
      description: '基于图像识别的自动化黑盒测试框架',
    },
  ],
  themeConfig: {
    search: true,
    outline: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/MaaXYZ/MaaFramework',
      },
    ],
    prevPageText: 'Prev',
    nextPageText: 'Next',
    enableAppearanceAnimation: true,
    enableScrollToTop: true,
  },
});
