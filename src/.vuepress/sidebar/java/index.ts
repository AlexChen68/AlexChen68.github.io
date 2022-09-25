import { arraySidebar } from "vuepress-theme-hope";

export const javaSidebar = arraySidebar([
  {
    text: "Java 基础",
    icon: "java",
    prefix: "basic",
    collapsable: true,
    children: [
      "datatype",
      'string'
    ]
  },
  {
    text: "Java 集合框架",
    icon: "java",
    prefix: "collection",
    collapsable: true,
    children: [
      "string"
    ]
  },
]);