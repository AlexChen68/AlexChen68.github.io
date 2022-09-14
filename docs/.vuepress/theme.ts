import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://github.com/AlexChen68",
  author: {
    name: "AlexChen",
    url: "https://github.com/AlexChen68",
  },
  iconAssets: "fontawesome",
  logo: "/logo.svg",
  repo: "https://github.com/AlexChen68/blog",

  docsDir: "docs",

  navbar: navbar,
  sidebar: sidebar,
  footer: "默认页脚",
  displayFooter: true,
  fullscreen: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    roundAvatar: true,
    description: "编程两年半的Java练习生",
    medias: {
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=1274812218&site=qq&menu=yes",
      GitHub: "https://github.com/AlexChen68",
      // Gmail: "mailto:alexchen.tech@gmail.com"
    },
  },
  // 文章加密设置
  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },
  plugins: {
    blog: {
      autoExcerpt: true,
    },
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
      imageSize: true,
      include: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
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
      tex: true,
      vpre: true,
      vuePlayground: true,
    },    
  },
});
