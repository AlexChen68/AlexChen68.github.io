import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    icon: "home",
    link: "/",
  },
  {
    text: "博客",
    icon: "blog",
    link: "/blog"
  },
  // {
  //   text: "博文",
  //   icon: "edit",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "文章 1-4",
  //       icon: "edit",
  //       prefix: "article/",
  //       children: [
  //         { text: "文章 1", icon: "edit", link: "article1" }
  //       ],
  //     }
  //   ],
  // },
]);
