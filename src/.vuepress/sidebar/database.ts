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
    text: "Redis 数据库",
    icon: "redis",
    prefix: "redis/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "ElasticSearch",
    icon: "elasticsearch",
    prefix: "es/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "Mongodb",
    icon: "mongodb",
    prefix: "mongodb/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "Neo4j",
    icon: "neo4j",
    prefix: "neo4j/",
    collapsible: true,
    children: "structure"
  },
])