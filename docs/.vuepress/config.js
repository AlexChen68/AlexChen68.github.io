import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'


export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: "AlexChen's Blog",
  description: '编程两年半的Java练习生',
  head: [['link', { rel: 'icon', href: 'images/favicon.ico' }]],
  // open: true,
  markdown: {
    code: {
      highlightLines: true,
      lineNumbers: 4
    }
  },
  theme: defaultTheme({
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
  }),
})