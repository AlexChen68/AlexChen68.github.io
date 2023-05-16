import { arraySidebar } from "vuepress-theme-hope";

export const distributedSidebar = arraySidebar([
  {
    text: "消息队列",
    icon: "mq",
    link: "mq/",
    prefix: "mq/",
    // collapsible: true,
    children: "structure"
  },
])