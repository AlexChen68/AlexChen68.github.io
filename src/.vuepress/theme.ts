import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import { sidebarConig } from "./sidebar";

const github = "https://github.com/AlexChen68"
const repoUrl = "https://github.com/AlexChen68/AlexChen68.github.io"

export default hopeTheme({
  hostname: "https://github.com/AlexChen68/AlexChen68.github.io",
  author: {
    name: "AlexChen",
    url: github,
  },
  darkmode: "toggle",
  iconAssets: "//at.alicdn.com/t/c/font_3648538_zpbf9wb0nh.css",
  logo: "/logo.svg",
  repo: repoUrl,
  docsRepo: repoUrl,
  docsBranch: 'master',
  docsDir: 'src',
  editLinkPattern: ':repo/edit/:branch/:path',
  copyright: "MIT Licensed | Copyright © 2022-present AlexChen",
  navbar: navbar,
  sidebar: sidebarConig,
  sidebarSorter: ["readme", "order", "filename", "title"],
  displayFooter: false,
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
  blog: {
    description: "才疏学浅的 Java 练习生",
    medias: {
      QQ: "//at.alicdn.com/t/c/font_3648538_qfi9o49aafk.css",
      GitHub: github,
      Zhihu: "https://www.zhihu.com/people/alexchen68",
      Gmail: "mailto:alexchen.tech@gmail.com"
    },
  },
  hotReload: true,
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
