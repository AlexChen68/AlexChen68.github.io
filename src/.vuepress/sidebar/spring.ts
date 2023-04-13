import { arraySidebar } from "vuepress-theme-hope";

export const springSidebar = arraySidebar([
  {
    text: "Spring Framework",
    icon: "spring",
    prefix: "spring/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "Spring Boot",
    icon: "spring",
    prefix: "springboot/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "Spring Cloud",
    icon: "spring",
    prefix: "springcloud/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "Spring Security",
    icon: "spring",
    prefix: "springsecurity/",
    collapsible: true,
    children: "structure"
  },
  {
    text: "分布式系统",
    icon: "spring",
    prefix: "distributed/",
    collapsible: true,
    children: "structure"
  }
]);
