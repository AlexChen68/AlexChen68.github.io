import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    icon: "home",
    link: "/"
  },
  {
    text: "博客主页",
    icon: "blog-home",
    link: "/home/"
  },
  {
    text: "Java 核心",
    icon: "java",
    link: "/md/java/"
  },
  {
    text: "Spring 系列",
    icon: "spring",
    link: "/md/spring/"
  },
  {
    text: "数据库",
    icon: "mysql",
    link: "/md/database/"
  },
  {
    text: "中间件",
    icon: "middleware",
    link: "/md/middleware/",
  },
  {
    text: "开发运维",
    icon: "devops",
    link: "/md/devops/",
  },
  // {
  //   text: "前端技术",
  //   icon: "frontend",
  //   link: "/md/frontend/",
  // },
  {
    text: "编程进阶",
    icon: "programming",
    link: "/md/advance/"
  },
  {
    text: "编程资源",
    icon: "resource",
    link: "/md/resource/docs"
  },
]);
