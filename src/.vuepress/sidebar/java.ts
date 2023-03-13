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
    link: "concurrency/"
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

export const concurrencySidebar = arraySidebar([
  {
    text: "基础篇",
    icon: "java",
    prefix: "basic/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "原理篇",
    icon: "java",
    prefix: "principle/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "JDK 工具篇",
    icon: "java",
    prefix: "juc/",
    collapsible: false,
    children: "structure"
  },
])