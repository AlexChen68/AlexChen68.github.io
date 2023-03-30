import { arraySidebar } from "vuepress-theme-hope";

export const advanceSidebar = arraySidebar([
  {
    text: "数据结构",
    icon: "data-structure",
    link: "ds/",
    prefix: "ds/",
    children: [
      "array",
      "linkedlist",
      "hashtable",
      "tree",
      "graph",
    ]
  },
  {
    text: "算法基础",
    icon: "algorithm",
    link: "algo/",
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
    text: "设计模式 >>>",
    icon: "design",
    link: "design/"
  },
  {
    text: "LeetCode >>>",
    icon: "leetcode",
    link: "leetcode/"
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

export const leetcodeSidebar = arraySidebar([
  {
    text: "数组",
    icon: "leetcode",
    children: [
      "001-两数之和"
    ]
  },
  {
    text: "链表",
    icon: "leetcode",
    children: [
      "160-相交链表"
    ]
  },
  {
    text: "滑动窗口",
    icon: "leetcode",
    children: [
      "160-相交链表"
    ]
  },
]);