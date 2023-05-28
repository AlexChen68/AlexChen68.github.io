import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import { sidebarConig } from "./sidebar";

const github = "https://github.com/AlexChen68"
const repoUrl = "https://github.com/AlexChen68/AlexChen68.github.io"
const iconAssets = "//at.alicdn.com/t/c/font_3648538_qiahqqgcev.css"

export default hopeTheme({
  hostname: "https://github.com/AlexChen68/AlexChen68.github.io",
  author: {
    name: "AlexChen",
    url: github,
  },
  darkmode: "toggle",
  iconAssets: iconAssets,
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
    description: "一点也不沉先生",
    medias: {
      GitHub: github,
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=1274812218&site=qq&menu=yes",
      Zhihu: "https://www.zhihu.com/people/alexchen68",
      Gmail: "mailto:1274812218@qq.com"
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
