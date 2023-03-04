import { arraySidebar } from "vuepress-theme-hope";

export const advanceSidebar = arraySidebar([
  "",
  {
    text: "数据结构",
    icon: "data-structure",
    prefix: "ds/",
    children: "structure"
  },
  {
    text: "算法基础",
    icon: "algorithm",
    prefix: "algo/",
    children: [
      {
        text: "排序算法",
        prefix: "sort/",
        children: "structure"
      },
      {
        text: "查找算法",
        prefix: "search/",
        children: "structure"
      },
      {
        text: "领域算法",
        prefix: "domain/",
        children: "structure"
      },
    ]
  },
  {
    text: "设计模式",
    icon: "design",
    link: "design/"
  },
  {
    text: "LeetCode 题解",
    icon: "leetcode",
    prefix: "leetcode/",
    children: "structure"
  },
]);

export const desginSidebar = arraySidebar([
  "",
  {
    text: "创建型模式",
    icon: "design",
    prefix: "creational/",
    children: "structure"
  },
  {
    text: "结构型模式",
    icon: "design",
    prefix: "structural/",
    children: "structure"
  },
  {
    text: "行为型模式",
    icon: "design",
    prefix: "behavioural/",
    children: "structure"
  },
  {
    text: "设计模式的应用",
    icon: "design",
    prefix: "apply/",
    children: "structure"
  }
]);