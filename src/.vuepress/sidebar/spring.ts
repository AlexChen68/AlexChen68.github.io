import { arraySidebar } from "vuepress-theme-hope";

export const springSidebar = arraySidebar([
  {
    text: "Spring Framework",
    icon: "alias",
    prefix: "spring/",
    children: [
      {
        text: "1. Core",
        prefix: "core/",
        children: ["ioc", "aop", "resources", "annotation"]
      },
      {
        text: "2. Web",
        children: ["web-servlet-mvc"]
      },
      {
        text: "3. DataAccess",
        children: ["data-access-transaction"]
      },
    ]
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
    prefix: "springcloud/",
    children: ["", "nacos"]
  },
  {
    text: "Spring 中文文档",
    icon: "alias",
    collapsable: true,
    link: "http://docs.jcohy.com/docs/spring-framework/5.3.21/html5/zh-cn/index.html"
  },
  {
    text: "Spring Boot 中文文档",
    icon: "alias",
    collapsable: true,
    link: "http://docs.jcohy.com/docs/spring-boot/2.7.1/html5/zh-cn/index.html"
  },
]);