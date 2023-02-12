import { arraySidebar } from "vuepress-theme-hope";

export const database = arraySidebar([
  {
    text: "Mysql 数据库",
    icon: "mysql",
    prefix: "mysql/",
    children: "structure"
  },
  {
    text: "Redis 数据库",
    icon: "redis",
    prefix: "redis/",
    children: "structure"
  },
  {
    text: "ORM 框架",
    icon: "mysql",
    prefix: "mybatis/",
    children: "structure"
  },
])