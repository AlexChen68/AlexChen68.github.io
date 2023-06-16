import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "AlexChen's Blog",
  description: '才疏学浅的 Java 练习生',
  theme,
  head: [
     ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    code: {
      highlightLines: true,
      lineNumbers: 4
    }
  }
});
