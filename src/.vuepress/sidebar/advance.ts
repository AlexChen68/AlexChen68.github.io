import { arraySidebar } from "vuepress-theme-hope";

export const advanceSidebar = arraySidebar([
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
    prefix: "design/",
    children: [
      "",
      {
        text: "创建型模式",
        prefix: "01-creational/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "结构型模式",
        prefix: "02-structural/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "行为型模式",
        prefix: "03-behavioural/",
        collapsible: true,
        children: "structure"
      }
    ],
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
    prefix: "01-creational/",
    children: "structure"
  },
  {
    text: "结构型模式",
    icon: "design",
    prefix: "02-structural/",
    children: "structure"
  },
  {
    text: "行为型模式",
    icon: "design",
    prefix: "03-behavioural/",
    children: "structure"
  }
]);