import { arraySidebar } from "vuepress-theme-hope";

export const javaSidebar = arraySidebar([
   {
      text: "Java 基础知识",
      icon: "java",
      prefix: "basic/",
      collapsible: false,
      children: "structure"
   },
   {
      text: "Java 集合框架",
      icon: "data-structure",
      prefix: "collection/",
      collapsible: false,
      children: "structure"
   },
   {
      text: "Java 并发框架",
      icon: "concurrency",
      prefix: "concurrency/",
      collapsible: false,
      children: [
         "basic/concept",
         "basic/thread",
         "basic/thread-state",
         "basic/communication",
         "principle/memory-model",
         "principle/volatile",
         "principle/synchronized",
         "principle/cas",
         "principle/aqs",
         "juc/executor",
         "juc/blockingqueue",
         "juc/lock",
         "juc/collection"
         // {
         //    text: "基础篇",
         //    icon: "java",
         //    prefix: "basic/",
         //    // link: "basic/",
         //    collapsible: false,
         //    children: [
         //       "basic/concept",
         //       "basic/thread",
         //       "basic/thread-state",
         //       "basic/communication"
         //    ]
         // },
         // {
         //    text: "原理篇",
         //    icon: "java",
         //    prefix: "principle/",
         //    // link: "principle/",
         //    collapsible: false,
         //    children: [
         //       "principle/memory-model",
         //       "principle/volatile",
         //       "principle/synchronized",
         //       "principle/cas",
         //       "principle/aqs"
         //    ]
         // },
         // {
         //    text: "JDK 工具篇",
         //    icon: "java",
         //    prefix: "juc/",
         //    // link: "juc/",
         //    collapsible: false,
         //    children: [
         //       "juc/executor",
         //       "juc/blockingqueue",
         //       "juc/lock",
         //       "juc/collection"
         //    ]
         // }
      ]
   },
   {
      text: "Java 虚拟机",
      icon: "jvm",
      link: "jvm/",
      prefix: "jvm/",
      collapsible: false,
      children: "structure"
   },
   {
      text: "Java 新特性",
      icon: "feature",
      prefix: "java8/",
      collapsible: false,
      children: "structure"
   },
   {
      text: "Java 工具库",
      icon: "tool",
      prefix: "tool/",
      collapsible: false,
      children: "structure"
   },
]);

export const concurrencySidebar = arraySidebar([
   {
      text: "基础篇",
      icon: "java",
      prefix: "basic/",
      link: "basic/",
      collapsible: false,
      children: [
         "concept",
         "thread",
         "thread-state",
         "communication"
      ]
   },
   {
      text: "原理篇",
      icon: "java",
      prefix: "principle/",
      link: "principle/",
      collapsible: false,
      children: [
         "memory-model",
         "volatile",
         "synchronized",
         "cas",
         "aqs"
      ]
   },
   {
      text: "JDK 工具篇",
      icon: "java",
      prefix: "juc/",
      link: "juc/",
      collapsible: false,
      children: [
         "executor",
         "blockingqueue",
         "lock",
         "collection"
      ]
   },
])