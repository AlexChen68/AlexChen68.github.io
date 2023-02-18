import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import { sidebarConig } from "./sidebar";
import {  } from "module";

const github = "https://github.com/AlexChen68"
const repoUrl = "https://github.com/AlexChen68/blog"

export default hopeTheme({
  hostname: "https://AlexChen68.github.com/blog",
  author: {
    name: "AlexChen",
    url: github,
  },
  darkmode: "toggle",
  iconAssets: "iconfont",
  // iconAssets: "//at.alicdn.com/t/c/font_3648538_tagrvoelel.css",
  logo: "/logo.svg",
  repo: repoUrl,
  docsRepo: repoUrl,
  docsBranch: 'master',
  docsDir: 'src',
  editLinkPattern: ':repo/edit/:branch/:path',
  navbar: navbar,
  sidebar: sidebarConig,
  sidebarIcon: false,
  sidebarSorter: ["readme", "order", "filename", "title"],
  // footer: "备案号",
  displayFooter: false,
  fullscreen: true,
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  pageInfo: ["Author","Original", "Date", "Tag", "ReadingTime"],
  blog: {
    // intro: "/intro.html",
    description: "编程两年半的 Java 练习生",
    medias: {
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=1274812218&site=qq&menu=yes",
      GitHub: github,
      Zhihu: "https://www.zhihu.com/people/alexchen68",
      Gmail: "mailto:alexchen.tech@gmail.com"
    },
  },
  plugins: {
    //开启 git 支持，可以展示上次编辑时间和贡献者
    git: true,
    blog: true,
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imgSize: true,
      include: true,
      imgLazyload: true,
      mark: true,
      mermaid: true,
      footnote: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
