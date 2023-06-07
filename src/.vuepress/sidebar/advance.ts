import { arraySidebar } from "vuepress-theme-hope";

export const algoSidebar = arraySidebar([
   {
      text: "排序算法",
      icon: "algo-sort",
      prefix: "sort/",
      link: "sort/",
      children: "structure"
   },
   {
      text: "查找算法",
      icon: "search",
      prefix: "search/",
      link: "search/",
      children: "structure"
   },
   {
      text: "领域算法",
      icon: "domain",
      prefix: "domain/",
      link: "domain/",
      children: "structure"
   },
   {
      text: "算法应用",
      icon: "scenario",
      prefix: "scenario/",
      link: "scenario/",
      children: "structure"
   }
])

export const advanceSidebar = arraySidebar([
   {
      text: "数据结构",
      icon: "data-structure",
      link: "ds/"
   },
   {
      text: "算法基础",
      icon: "algorithm",
      link: "algo/",
      prefix: "algo/",
      children: [
         {
            text: "排序算法",
            icon: "algo-sort",
            link: "sort/",
         },
         {
            text: "查找算法",
            icon: "search",
            link: "search/",
         },
         {
            text: "领域算法",
            icon: "domain",
            link: "domain/",
         },
         {
            text: "算法应用",
            icon: "scenario",
            link: "scenario/",
         }
      ]
   },
   {
      text: "设计模式",
      icon: "design",
      link: "design/",
      prefix: "design/",
      children: [
         "",
         {
            text: "创建型模式",
            icon: "design",
            link: "creational/",
         },
         {
            text: "结构型模式",
            icon: "design",
            link: "structural/",
         },
         {
            text: "行为型模式",
            icon: "design",
            link: "behavioural/",
         }
      ]
   },
   {
      text: "LeetCode",
      icon: "leetcode",
      link: "leetcode/001-两数之和"
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