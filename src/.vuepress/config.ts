import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  base: "/blog/",
  lang: "zh-CN",
  title: "AlexChen's Blog",
  description: '编程两年半的Java练习生',
  theme,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  markdown: {
    code: {
      highlightLines: true,
      lineNumbers: 4
    }
  },
  plugins: [
    // autoCatalogPlugin()
    // autoCatalogPlugin({
    //   level: 3,
    //   frontmatter: (path) => {
    //     return {
    //       // frontmatter you want
    //     };
    //   },
    // }),
  ],
});
