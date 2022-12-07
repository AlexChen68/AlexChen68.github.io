import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
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
  plugins: [],
});
