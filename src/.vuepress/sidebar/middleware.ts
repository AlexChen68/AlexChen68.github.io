import { arraySidebar } from "vuepress-theme-hope";

export const middlewareSidebar = arraySidebar([
  {
    text: "Web 服务器",
    icon: "web",
    prefix: "web/",
    children: "structure"
  },
  {
    text: "消息队列",
    icon: "mq",
    prefix: "mq/",
    children: "structure"
  },
])