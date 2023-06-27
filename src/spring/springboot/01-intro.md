---
title: SpringBoot 简介
tag: SpringBoot
category: SpringBoot
date: 2022-12-29
---

## SpringBoot 是什么？

Spring Boot 是由 Pivotal 团队提供的基于 Spring 的全新框架，旨在简化 Spring 应用的初始搭建和开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。

Spring 官网给的定义是：Spring Boot 是所有基于 Spring 开发项目的起点。Spring Boot 集成了绝大部分目前流行的开发框架，就像 Maven 集成了所有的 JAR 包一样，Spring Boot 集成了几乎所有的框架，使得开发者能快速搭建 Spring 项目。

Spring Boot 的核心设计思想是“约定优于配置”。基于这一设计原则，Spring Boot 极大地简化了项目和框架的配置。比如在使用 Spring 开发 Web 项目时，我们需要配置 web.xml、Spring 和 MyBatis 等，还需要将它们集成在一起。而使用 Spring Boot 一切将变得极其简单，它采用了大量的默认配置来简化这些文件的配置过程，只需引入对应的 Starters（启动器）。

Spring Boot 可以构建一切。设计它就是为了使用最少的配置，以最快的速度来启动和运行 Spring 项目。

## SpringBoot 核心组件

Spring Boot 官方提供了很多当前流行的基础功能组件的封装，命名一般以 spring-boot-starter 开头，比如 spring-boot-starter-quartz 定时任务组件和 spring-boot-starter-thymeleaf 页面模板引擎等。

另外，由于 Spring Boot 的流行，很多第三方中间件也按照 Spring Boot 的规范提供了针对 Spring Boot 项目的 Starters（启动器），一般以组件名开头，比如 MyBatis 针对 Spring Boot 提供的组件包 mybatis-spring-boot-starter。

Spring Boot 的核心组件如下图所示：

![1687839990722.png](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/images/1687839990722.png)

## Spring Boot 的优点

Spring Boot 继承了 Spring 一贯的优点和特性，同时增加了一些新功能和新特性，这让 Spring Boot 非常容易上手，也让编程变得更加简单。

总结起来 Spring Boot 有如下几个优点：
- 遵循“约定优于配置”的原则，使用 Spring Boot 只需要很少的配置或使用默认的配置。
- 使用 JavaConfig，避免使用 XML 的烦琐。
- 提供 Starters（启动器），简化 Maven 配置，避免依赖冲突。
- 提供内嵌 Servlet 容器，可选择内嵌 Tomcat、Jetty 等容器，不需要单独的 Web 服务器。这意味着不再需要启动 Tomcat 或其他任何中间件。
- 提供了一系列项目中常见的非功能特性，如安全监控、应用监控、健康检测等。
- 与云计算、微服务的天然集成。

## 相关资料

- [官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/)