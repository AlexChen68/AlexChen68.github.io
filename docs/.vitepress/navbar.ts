import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
   { text: "Java 核心", link: "/java/"},
   { text: "Spring 系列", link: "/spring/"},
   { text: "数据库", link: "/database/"},
   { text: '系统架构', link: '/architecture/'},
   { text: "DevOps", link: "/devops/"},
   { text: "业务开发", link: "/business/word-export"},
   { text: "前端技术", link: "/frontend/"},
   { text: "编程内功", link: "/advance/algo/"},
   { text: "编程资源", link: "/resource/stars"},
   { text: "Link", items: [
      { text: "VitePress", link: "https://vitepress.dev/"},
      { text: "ChatGPT", link: "https://chat.alexchen.tech/"},
      { text: "文心一言", link: "https://yiyan.baidu.com/"}
   ]}
]

export default nav