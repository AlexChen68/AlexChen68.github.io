import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "Home",
    icon: "blog-home",
    link: "/"
  },
  {
    text: "Java 核心",
    icon: "java",
    prefix: "/java/",
    children: [
      {
        text: "Java 基础知识",
        icon: "java",
        link: "basic/"
      },
      {
        text: "Java 集合框架",
        icon: "java",
        link: "collection/"
      },
      {
        text: "Java 并发框架",
        icon: "java",
        link: "concurrency/"
      },
      {
        text: "Java 虚拟机",
        icon: "java",
        link: "jvm/"
      },
      {
        text: "Java 新特性",
        icon: "java",
        link: "java8/"
      },
      {
        text: "Java 工具库",
        icon: "java",
        link: "tool/"
      }
    ]
  },
  {
    text: "编程内功",
    icon: "programming",
    prefix: "/advance/",
    children: [
      {
        text: "数据结构",
        icon: "data-structure",
        link: "ds/"
      },
      {
        text: "算法基础",
        icon: "algorithm",
        link: "algo/"
      },
      {
        text: "设计模式",
        icon: "design",
        link: "design/"
      },
      {
        text: "LeetCode",
        icon: "leetcode",
        link: "leetcode/001-两数之和"
      },
    ]
  },
  {
    text: "Spring 框架",
    icon: "spring",
    prefix: "/spring/",
    children: [
      {
        text: "Spring Framework",
        icon: "spring",
        link: "spring/"
      },
      {
        text: "Spring Boot",
        icon: "spring",
        link: "springboot/"
      },
      {
        text: "Spring Cloud",
        icon: "spring",
        link: "springcloud/"
      },
      {
        text: "Spring Security",
        icon: "spring",
        link: "springsecurity/"
      },
      {
        text: "分布式系统",
        icon: "spring",
        link: "distributed/"
      }
    ]
  },
  {
    text: "数据库",
    icon: "mysql",
    prefix: "/database/",
    children: [
      {
        text: "Mysql 关系数据库",
        icon: "mysql",
        link: "mysql/"
      },
      {
        text: "Redis 缓存数据库",
        icon: "redis",
        link: "redis/"
      },
      {
        text: "ElasticSearch 搜索引擎",
        icon: "elasticsearch",
        link: "es/"
      },
      {
        text: "MongoDB 文档数据库",
        icon: "mongodb",
        link: "mongodb/"
      },
      {
        text: "Neo4j 图数据库",
        icon: "neo4j",
        link: "neo4j/"
      },
    ]
  },
  // {
  //   text: "中间件",
  //   icon: "middleware",
  //   link: "/middleware/",
  // },
  {
    text: "开发运维",
    icon: "devops",
    prefix: "/devops/",
    children: [
      {
        text: "开发工具",
        icon: "tool",
        link: "tool/"
      },
      {
        text: "测试工具",
        icon: "testing",
        link: "test/"
      },
      {
        text: "Linux",
        icon: "linux",
        link: "linux/"
      },
      {
        text: "Network",
        icon: "network",
        link: "network/"
      },
      {
        text: "Docker",
        icon: "docker",
        link: "docker/"
      }
    ]
  },
  {
    text: "前端技术",
    icon: "frontend",
    link: "/frontend/",
  },
  {
    text: "编程资源",
    icon: "resource",
    link: "/resource/docs"
  },
]);
