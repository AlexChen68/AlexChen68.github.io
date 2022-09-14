import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  base: '/blog-vuepress',
  lang: 'zh-CN',
  title: "AlexChen's Blog",
  description: '编程两年半的Java练习生',
  repo: "https://github.com/AlexChen68/blog-vuepress",
  repoLabel: "Github",
  head: [
    ['link', {rel: 'icon', href: '/ox.svg'}]
  ],
  // open: true,
  markdown: {
    code: {
      highlightLines: true,
      lineNumbers: 4
    }
  },
  plugins: [
    prismjsPlugin({
      preloadLanguages: ['markdown', 'java', 'sql', 'bash', 'html', 'javascript']
    }),
  ],
  theme: defaultTheme({
    sidebarDepth: 2,
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Java系列',
        children: [
          {
            text: 'Java 核心基础',
            link: '/java/core.md',
          },
          {
            text: 'Java 集合框架',
            link: '/java/collection.md',
          }
        ],
      },
      {
        text: 'Spring系列',
        children: [
          {
            text: 'Spring',
            link: '/java/core.md',
          },
          {
            text: 'SpringMVC',
            link: '/java/collection.md',
          }
        ],
      }
    ],
    // 页面
    docsRepo: 'https://github.com/AlexChen68/blog-vuepress',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdatedText: "上次更新",
    contributors: false,
    tip: "提示!",
    warning: "注意！",
    danger: "警告！",
    notFound: ['Not Found'],
    backToHome: "返回首页",
    colorModeSwitch: true,
    toggleColorMode: '白天/黑夜',
    toggleSidebar: 'toggle sidebar'
  }),
})