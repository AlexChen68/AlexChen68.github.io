import { arraySidebar } from "vuepress-theme-hope";

export const advanceSidebar = arraySidebar([
  {
    text: "⭐数据结构",
    icon: "structure",
    prefix: "ds/",
    children: "structure"
  },
  {
    text: "⭐算法基础",
    icon: "function",
    prefix: "algo/",
    children: "structure"
  },
  {
    text: "⭐设计模式",
    icon: "blog",
    prefix: "design/",
    children: [
      "principle",
      {
        text: "创建型模式",
        icon: "stack",
        prefix: "creational/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "结构型模式",
        icon: "stack",
        prefix: "structural/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "行为型模式",
        icon: "stack",
        prefix: "behavioural/",
        collapsible: true,
        children: "structure"
      }
    ],
  },
  {
    text: "⭐LeetCode 题解",
    icon: "function",
    prefix: "leetcode/",
    children: "structure"
  },
]);

export const desginSidebar = arraySidebar([
  "principle",
  {
    text: "创建型模式",
    icon: "stack",
    prefix: "creational/",
    children: "structure"
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
  }
]);