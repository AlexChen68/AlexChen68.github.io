import { arraySidebar } from "vuepress-theme-hope";

export const devopsSidebar = arraySidebar([
  {
    text: "开发工具",
    icon: "tool",
    prefix: "tool/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "测试工具",
    icon: "testing",
    prefix: "test/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "Linux 系统",
    icon: "linux",
    prefix: "linux/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "计算机网络",
    icon: "network",
    prefix: "network/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "Docker 容器",
    icon: "docker",
    prefix: "docker/",
    collapsible: false,
    children: "structure"
  }
])