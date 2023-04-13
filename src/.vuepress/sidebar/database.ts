import { arraySidebar } from "vuepress-theme-hope";

export const databaseSidebar = arraySidebar([
  {
    text: "Mysql 数据库",
    icon: "mysql",
    prefix: "mysql/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "ORM 框架",
    icon: "mapping",
    prefix: "orm/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "Redis 数据库",
    icon: "redis",
    prefix: "redis/",
    collapsible: true,
    children: "structure"
  }
])