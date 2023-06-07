import { arraySidebar } from "vuepress-theme-hope";

export const springSidebar = arraySidebar([
  {
    text: "Spring Framework",
    icon: "spring",
    prefix: "spring/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "Spring Boot",
    icon: "spring",
    prefix: "springboot/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "Spring Cloud",
    icon: "spring",
    prefix: "springcloud/",
    collapsible: false,
    children: "structure"
  },
  {
    text: "Spring Security",
    icon: "spring",
    prefix: "springsecurity/",
    collapsible: false,
    children: "structure"
  }
]);
