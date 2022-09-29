import { arraySidebar } from "vuepress-theme-hope";

export const dbSidebar = ([
  {
    text: "Mysql 数据库",
    icon: "mysql",
    prefix: "mysql",
    collapsable: true,
    children: [
      "",
    ]
  },
  {
    text: "Redis 数据库",
    icon: "java",
    prefix: "redis",
    collapsable: true,
    children: [
      "started"
    ]
  },
])