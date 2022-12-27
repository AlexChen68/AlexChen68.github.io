import { arraySidebar } from "vuepress-theme-hope";

export const java = arraySidebar([
  {
    text: "Java 基础",
    icon: "java",
    prefix: "basic/",
    children: [
      "01-feature",
      "02-datatype",
      "03-string"
    ]
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
    collapsable: true,
    children: "structure"
  },
]);

