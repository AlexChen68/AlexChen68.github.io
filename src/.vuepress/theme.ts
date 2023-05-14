import { hopeTheme } from "vuepress-theme-hope/perf";
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
  iconAssets: "//at.alicdn.com/t/c/font_3648538_ll6qpsn6vza.css",
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
  pageInfo: ["Author", "Category", "Tag", "Date", "Word", "ReadingTime"],
  breadcrumb: false,
  pure: true,
  blog: {
    description: "纵有思绪万千，奈何才疏学浅，欲诉只无言。",
    medias: {
      GitHub: github,
      QQ: "//at.alicdn.com/t/c/font_3648538_qfi9o49aafk.css",
      Zhihu: "https://www.zhihu.com/people/alexchen68",
      Gmail: "mailto:alexchen.tech@gmail.com"
    },
  },
  plugins: {
    blog: true,
    mdEnhance: {
      align: true,
      attrs: true,
      tabs: true,
      codetabs: true,
      container: true,
      demo: true,
      imgSize: true,
      imgLazyload: true,
      mark: true,
      footnote: true,
      sub: true,
      sup: true
    },
  },
});
