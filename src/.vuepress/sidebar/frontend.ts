import { arraySidebar } from "vuepress-theme-hope";

export const frontendSidebar = arraySidebar([
  {
    text: "网页入门",
    icon: "frontend",
    prefix: "basic/",
    children: "structure"
  },
  {
    text: "ES6 入门",
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
    text: "前端工程化",
    icon: "module",
    prefix: "module/",
    children: "structure"
  },
])