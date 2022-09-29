import { arraySidebar } from "vuepress-theme-hope";

export const springSidebar = arraySidebar([
  "",
  {
    text: "Spring 核心",
    icon: "alias",
    collapsable: true,
    prefix: "spring/",
    children: ["", "ioc", "aop"]
  },
  {
    text: "SpringBoot",
    icon: "alias",
    collapsable: true,
    prefix: "springboot/",
    children: ["", "starter", "swagger"]
  },
  {
    text: "SpringCloud",
    icon: "alias",
    collapsable: true,
    prefix: "springboot/",
    children: ["", "starter"]
  },
]);