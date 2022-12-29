import { arraySidebar } from "vuepress-theme-hope";

export const java = arraySidebar([
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
]);
