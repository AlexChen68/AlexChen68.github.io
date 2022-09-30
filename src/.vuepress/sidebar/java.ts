import { arraySidebar } from "vuepress-theme-hope";

export const javaSidebar = arraySidebar([
  {
    text: "Java 基础",
    icon: "java",
    prefix: "basic/",
    collapsable: true,
    children: "structure"
  },
  {
    text: "Java 集合框架",
    icon: "java",
    prefix: "collection/",
    collapsable: true,
    children: "structure"
  },
  {
    text: "Java 并发框架",
    icon: "java",
    prefix: "juc/",
    collapsable: true,
    children: "structure"
  },
  {
    text: "Java 虚拟机",
    icon: "java",
    prefix: "jvm/",
    collapsable: true,
    children: "structure"
  },
]);