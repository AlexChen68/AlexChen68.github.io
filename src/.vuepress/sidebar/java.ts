import { arraySidebar } from "vuepress-theme-hope";

export const javaSidebar = arraySidebar([
  {
    text: "⭐Java 基础",
    prefix: "basic/",
    children: "structure"
  },
  {
    text: "⭐Java 集合框架",
    prefix: "collection/",
    children: "structure"
  },
  {
    text: "⭐Java 并发框架",
    prefix: "juc/",
    children: "structure"
  },
  {
    text: "⭐Java 虚拟机",
    prefix: "jvm/",
    children: "structure"
  },
  {
    text: "⭐Java 新特性",
    prefix: "java8/",
    children: "structure"
  },
  {
    text: "⭐Java 工具库",
    prefix: "tool/",
    children: "structure"
  },
]);
