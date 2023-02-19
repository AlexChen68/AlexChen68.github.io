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
      "00-principle",
      {
        text: "创建型模式",
        icon: "stack",
        prefix: "01-creational/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "结构型模式",
        icon: "stack",
        prefix: "02-structural/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "行为型模式",
        icon: "stack",
        prefix: "03-behavioural/",
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
  "00-principle",
  {
    text: "创建型模式",
    icon: "stack",
    prefix: "01-creational/",
    children: "structure"
  },
  {
    text: "结构型模式",
    icon: "stack",
    prefix: "02-structural/",
    children: "structure"
  },
  {
    text: "行为型模式",
    icon: "stack",
    prefix: "03-behavioural/",
    children: "structure"
  }
]);