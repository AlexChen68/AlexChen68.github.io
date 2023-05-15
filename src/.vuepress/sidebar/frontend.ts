import { arraySidebar } from "vuepress-theme-hope";

export const frontendSidebar = arraySidebar([
  {
    text: "ES6 入门知识",
    icon: "es6",
    prefix: "es6/",
    children: "structure"
  },
  {
    text: "Node.js",
    icon: "nodejs",
    prefix: "node/",
    children: "structure"
  },
  {
    text: "前端工具",
    icon: "tool",
    prefix: "tool/",
    children: "structure"
  },
])