import { arraySidebar, blog, sidebar } from "vuepress-theme-hope";

export const advanced = arraySidebar([
  "",
  "ds/",
  "algo/",
  {
    text: "设计模式",
    icon: "blog",
    link: "design/principle"
  }
]);

export const datastructure = arraySidebar([
  {
    text: "数据结构",
    icon: "structure",
    prefix: "ds/",
    children: "structure"
  }
]);

export const algo = arraySidebar([
  {
    text: "算法基础",
    icon: "function",
    collapsable: true,
    prefix: "algo/",
    children: "structure"
    // children: [
    //   "sort",
    //   "search",
    //   "other",
    //   // {
    //   //   text: "Leetcode",
    //   //   icon: "book",
    //   //   collapsable: true,
    //   //   prefix: "leetcode/",
    //   //   link: "leetcode/",
    //   //   children: "structure"
    //   // }
    // ]
  }
]);

export const design = arraySidebar([
  "principle",
  {
    text: "创建型模式",
    icon: "stack",
    prefix: "creational/",
    children: ["Singleton", "FactoryMethod", "AbstractFactory", "Builder", "Prototype"]
  },
  {
    text: "结构型模式",
    icon: "stack",
    prefix: "structural/",
    children: ["Facade", "Adapter"]
  },
  {
    text: "行为型模式",
    icon: "stack",
    prefix: "behavioural/",
    children: ["chain"]
  },
]);