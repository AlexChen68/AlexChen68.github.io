import { navbar } from "vuepress-theme-hope";

export default navbar([
   {
      text: "Home",
      icon: "blog-home",
      link: "/"
   },
   {
      text: "编程内功",
      icon: "programming",
      link: "/advance/"
      // children: [
      //    {
      //       text: "数据结构",
      //       icon: "data-structure",
      //       link: "ds/"
      //    },
      //    {
      //       text: "算法基础",
      //       icon: "algorithm",
      //       link: "algo/"
      //    },
      //    {
      //       text: "设计模式",
      //       icon: "design",
      //       link: "design/"
      //    },
      //    {
      //       text: "LeetCode",
      //       icon: "leetcode",
      //       link: "leetcode/001-两数之和"
      //    },
      // ]
   },
   {
      text: "Java 核心",
      icon: "java",
      link: "/java/basic/grammar"
      //  prefix: "/java/",
      //     children: [
      //       {
      //         text: "Java 基础知识",
      //         icon: "java",
      //         link: "basic/"
      //       },
      //       {
      //         text: "Java 集合框架",
      //         icon: "java",
      //         link: "collection/"
      //       },
      //       {
      //         text: "Java 并发框架",
      //         icon: "java",
      //         link: "concurrency/basic/concept/"
      //       },
      //       {
      //         text: "Java 虚拟机",
      //         icon: "java",
      //         link: "jvm/"
      //       },
      //       {
      //         text: "Java 新特性",
      //         icon: "java",
      //         link: "java8/optional"
      //       },
      //       {
      //         text: "Java 工具库",
      //         icon: "java",
      //         link: "tool/1-log"
      //       }
      //     ]
   },
   {
      text: "Spring 框架",
      icon: "spring",
      link: "/spring/",
      // prefix: "/spring/",
      // children: [
      //    {
      //       text: "Spring Framework",
      //       icon: "spring",
      //       link: "spring/"
      //    },
      //    {
      //       text: "Spring Boot",
      //       icon: "spring",
      //       link: "springboot/"
      //    },
      //    {
      //       text: "Spring Cloud",
      //       icon: "spring",
      //       link: "springcloud/"
      //    },
      //    {
      //       text: "Spring Security",
      //       icon: "spring",
      //       link: "springsecurity/"
      //    }
      // ]
   },
   {
      text: "数据库",
      icon: "mysql",
      link: "/database/",
      // prefix: "/database/",
      // children: [
      //    {
      //       text: "Mysql 关系数据库",
      //       icon: "mysql",
      //       link: "mysql/"
      //    },
      //    {
      //       text: "Redis 缓存数据库",
      //       icon: "redis",
      //       link: "redis/"
      //    },
      //    {
      //       text: "ElasticSearch 搜索引擎",
      //       icon: "elasticsearch",
      //       link: "elasticsearch/"
      //    },
      //    {
      //       text: "MongoDB 文档数据库",
      //       icon: "mongodb",
      //       link: "mongodb/"
      //    },
      //    {
      //       text: "Neo4j 图数据库",
      //       icon: "neo4j",
      //       link: "neo4j/"
      //    },
      // ]
   },
   {
      text: "开发运维",
      icon: "devops",
      link: "/devops/",
      // prefix: "/devops/",
      // children: [
      //    {
      //       text: "开发工具",
      //       icon: "tool",
      //       link: "tool/"
      //    },
      //    {
      //       text: "测试工具",
      //       icon: "testing",
      //       link: "test/"
      //    },
      //    {
      //       text: "Linux 系统",
      //       icon: "linux",
      //       link: "linux/"
      //    },
      //    {
      //       text: "计算机网络",
      //       icon: "network",
      //       link: "network/"
      //    },
      //    {
      //       text: "Docker 容器",
      //       icon: "docker",
      //       link: "docker/"
      //    }
      // ]
   },
   {
      text: "分布式",
      icon: "distributed",
      link: "/distributed/",
   },
   {
      text: "前端技术",
      icon: "frontend",
      link: "/frontend/",
   },
   {
      text: "编程资源",
      icon: "resource",
      link: "/resource/collection"
   },
]);
