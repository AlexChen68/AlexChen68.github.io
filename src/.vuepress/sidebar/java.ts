import { arraySidebar } from "vuepress-theme-hope";

export const javaSidebar = arraySidebar([
  {
    text: "Java 基础",
    icon: "java",
    prefix: "basic/",
    children: "structure"
  },
  {
    text: "Java 集合框架",
    icon: "java",
    prefix: "collection/",
    children: "structure"
  },
  {
    text: "Java 并发框架",
    icon: "java",
    prefix: "juc/",
    children: "structure"
  },
  {
    text: "Java 虚拟机",
    icon: "java",
    prefix: "jvm/",
    children: "structure"
  },
  {
    text: "Java 新特性",
    icon: "java",
    prefix: "java8/",
    children: "structure"
  },
  {
    text: "Java 工具库",
    icon: "java",
    prefix: "tool/",
    children: "structure"
  },
]);
