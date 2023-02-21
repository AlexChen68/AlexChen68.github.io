import { arraySidebar } from "vuepress-theme-hope";

export const devopsSidebar = arraySidebar([
  {
    text: "开发工具",
    icon: "tool",
    prefix: "tool/",
    children: "structure"
  },
  {
    text: "测试工具",
    icon: "testing",
    prefix: "test/",
    children: "structure"
  },
  {
    text: "Linux",
    icon: "linux",
    prefix: "linux/",
    children: "structure"
  },
  {
    text: "Docker",
    icon: "docker",
    prefix: "docker/",
    children: "structure"
  }
])