import { arraySidebar } from "vuepress-theme-hope";

export const distributedSidebar = arraySidebar([
   {
      text: "分布式理论",
      icon: "distributed",
      link: "theory/",
      prefix: "theory/",
      children: "structure"
   },
   {
      text: "微服务基础组件",
      icon: "distributed",
      link: "microservices/",
      prefix: "microservices/",
      children: "structure"
   },
   {
      text: "消息队列",
      icon: "mq",
      link: "mq/",
      prefix: "mq/",
      children: "structure"
   },
   {
      text: "对象存储",
      icon: "distributed",
      link: "oss/",
      prefix: "oss/",
      children: "structure"
   },
   {
      text: "日志中心",
      icon: "distributed",
      link: "log/",
      prefix: "log/",
      children: "structure"
   },
])