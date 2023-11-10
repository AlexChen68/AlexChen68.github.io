import { defineConfig } from 'vitepress'
import sidebar from './sidebar'
import nav from './navbar'

/**
 * https://vitepress.qzxdp.cn/reference/site-config.html
 * https://vitepress.qzxdp.cn/reference/default-theme-config.html
 */
export default defineConfig({
   title: "AlexChen's Blog",
   description: "AlexChen's Blog",
   base: '/',
   head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
   ],
   lastUpdated: true,
   ignoreDeadLinks: true,
   themeConfig: {
      logo: '/logo.svg',
      nav,
      sidebar,
      outline: 'deep',
      outlineTitle: '大纲',
      footer: {
         copyright: 'Copyright © 2023-present <a href="https://github.com/alexchen68">AlexChen</a>'
      },
      socialLinks: [
         { icon: 'github', link: 'https://github.com/alexchen68' }
      ],
      search: {
         provider: 'local'
      }
   },
   markdown: {
      lineNumbers: true,
   }
})

