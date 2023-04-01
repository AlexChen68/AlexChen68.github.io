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
    link: "/java/"
  },
  {
    text: "Spring 系列",
    icon: "spring",
    link: "/spring/"
  },
  {
    text: "数据库",
    icon: "mysql",
    link: "/database/"
  },
  {
    text: "中间件",
    icon: "middleware",
    link: "/middleware/",
  },
  {
    text: "开发运维",
    icon: "devops",
    link: "/devops/",
  },
  // {
  //   text: "前端技术",
  //   icon: "frontend",
  //   link: "/frontend/",
  // },
  {
    text: "编程进阶",
    icon: "programming",
    link: "/advance/ds/"
  },
  {
    text: "编程资源",
    icon: "resource",
    link: "/resource/docs"
  },
]);
