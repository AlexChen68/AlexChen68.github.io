---
title: SpringBoot 概述
index: false
article: false
date: 2022-09-15
---

## SpringBoot 是什么？

Spring Boot 是由 Pivotal 团队提供的基于 Spring 的全新框架，旨在简化 Spring 应用的初始搭建和开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。

Spring 官网给的定义是：Spring Boot 是所有基于 Spring 开发项目的起点。Spring Boot 集成了绝大部分目前流行的开发框架，就像 Maven 集成了所有的 JAR 包一样，Spring Boot 集成了几乎所有的框架，使得开发者能快速搭建 Spring 项目。

Spring Boot 的核心设计思想是“约定优于配置”。基于这一设计原则，Spring Boot 极大地简化了项目和框架的配置。比如在使用 Spring 开发 Web 项目时，我们需要配置 web.xml、Spring 和 MyBatis 等，还需要将它们集成在一起。而使用 Spring Boot 一切将变得极其简单，它采用了大量的默认配置来简化这些文件的配置过程，只需引入对应的 Starters（启动器）。

Spring Boot 可以构建一切。设计它就是为了使用最少的配置，以最快的速度来启动和运行 Spring 项目。

## Spring Boot 的背景

多年来，随着 Spring 的飞速发展，新功能不断增加，Spring 变得越来越复杂。

通过访问 Spring 官网就可以看到 Spring 的所有子项目和组件框架，如此多的子项目和组件使得 Spring 逐渐笨重起来，这显然已经无法适应云计算和微服务时代的发展趋势。

于是 Spring Boot 应运而生。Spring Boot 建立在 Spring 基础之上，遵循“约定优于配置”的原则，避免了创建项目或框架时必须做的繁杂配置，帮助开发者以最少的工作量，更加简单、方便地使用现有 Spring 中的所有功能组件。

## Spring Boot 的特性

Spring Boot 的一系列特性使得微服务架构的落地变得非常容易，对于目前众多的技术栈，Spring Boot 是 Java 领域微服务架构的最优落地技术。

下图所示为 Spring Boot 的一些特性：

![Alt](http://c.biancheng.net/uploads/allimg/221117/2-22111G45K42Y.gif)

## Spring Boot 的优点

Spring Boot 继承了 Spring 一贯的优点和特性，同时增加了一些新功能和新特性，这让 Spring Boot 非常容易上手，也让编程变得更加简单。

总结起来 Spring Boot 有如下几个优点：

- 遵循“约定优于配置”的原则，使用 Spring Boot 只需要很少的配置或使用默认的配置。
- 使用 JavaConfig，避免使用 XML 的烦琐。
- 提供 Starters（启动器），简化 Maven 配置，避免依赖冲突。
- 提供内嵌 Servlet 容器，可选择内嵌 Tomcat、Jetty 等容器，不需要单独的 Web 服务器。这意味着不再需要启动 Tomcat 或其他任何中间件。
- 提供了一系列项目中常见的非功能特性，如安全监控、应用监控、健康检测等。
- 与云计算、微服务的天然集成。

从软件发展的角度来讲，越简单的开发模式越流行，越有活力，其可以让开发者将精力集中在业务逻辑本身，提高软件开发效率。Spring Boot 就是尽可能地简化应用开发的门槛，让应用开发、测试、部署变得更加简单。

## 参考资料

- [Spring Boot 是什么](http://c.biancheng.net/view/9839.html)