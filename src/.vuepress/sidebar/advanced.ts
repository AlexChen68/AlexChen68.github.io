import { arraySidebar } from "vuepress-theme-hope";

export const advancedSidebar = arraySidebar([
  "",
  {
    text: "数据结构",
    icon: "structure",
    collapsable: true,
    prefix: "ds/",
    children: ["linear", "tree", "graph"]
  },
  {
    text: "算法基础",
    icon: "function",
    collapsable: true,
    prefix: "algo/",
    children: [
      "sort",
      "search",
      "other",
      // {
      //   text: "Leetcode",
      //   icon: "book",
      //   collapsable: true,
      //   prefix: "leetcode/",
      //   link: "leetcode/",
      //   children: "structure"
      // }
    ]
  },
  {
    text: "设计模式",
    icon: "stack",
    collapsable: true,
    prefix: "design/",
    children: [
      "principle",
      {
        text: "创建型模式",
        collapsable: true,
        prefix: "creational/",
        children: ["Singleton", "FactoryMethod", "AbstractFactory", "Builder", "Prototype"]
      },
      {
        text: "结构型模式",
        collapsable: true,
        prefix: "structural/",
        children: ["Facade", "Adapter"]
      },
      {
        text: "行为型模式",
        collapsable: true,
        prefix: "behavioural/",
        children: ["chain"]
      },
    ]
  },
]);