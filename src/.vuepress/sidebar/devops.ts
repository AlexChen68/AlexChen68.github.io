import { arraySidebar } from "vuepress-theme-hope";

export const devopsSidebar = arraySidebar([
  {
    text: "⭐Linux",
    icon: "structure",
    prefix: "linux/",
    children: "structure"
  },
  {
    text: "⭐Docker",
    icon: "structure",
    prefix: "docker/",
    children: "structure"
  },
  {
    text: "⭐开发工具",
    icon: "structure",
    prefix: "tool/",
    children: "structure"
  }
])