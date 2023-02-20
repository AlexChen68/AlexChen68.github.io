---
title: Spring 系列
date: 2022-09-15
index: false
article: false
---

Spring全家桶，从 Spring 容器、AOP 到 SpringCloud 微服务。
<!-- more -->

## Spring 简介

Spring框架是 Java 平台的一个开源的全栈（full-stack）应用程序框架和控制反转容器实现，一般被直接称为 Spring。该框架的一些核心功能理论上可用于任何 Java 应用，但 Spring 还为基于Java企业版平台构建的 Web 应用提供了大量的拓展支持。Spring 没有直接实现任何的编程模型，但它已经在 Java 社区中广为流行，基本上完全代替了企业级JavaBeans（EJB）模型。

Spring框架以 Apache License 2.0 开源许可协议的形式发布，该框架最初由 Rod Johnson 以及 Juergen Hoeller 等人开发。

**Spring 核心功能模块**

- 强大的、基于 JavaBeans 的、采用控制反转（Inversion of Control，IoC）原则的 配置管理，使得应用程序的组建更加简易快捷。
- 一个可用于 Java EE 等运行环境的核心 Bean工厂。
- 数据库事务的一般化抽象层，允许声明式（Declarative）事务管理器，简化事务的划分使之与底层无关。
- 内建的针对 JTA 和单个 JDBC 数据源的一般化策略，使Spring的事务支持不要求 Java EE 环境，这与一般的 JTA 或者 EJB CMT 相反。
- JDBC 抽象层提供了有针对性的异常等级（不再从 SQL 异常中提取原始代码），简化了错误处理，大大减少了程序员的编码量。再次利用 JDBC 时，你无需再写出另一个'终止'（finally）模块。并且面向 JDBC 的异常与 Spring 通用数据访问对象（Data Access Object）异常等级相一致。
- 以资源容器，DAO 实现和事务策略等形式与 Hibernate，JDO 和 MyBatis 、SQL Maps 集成。利用控制反转机制全面解决了许多典型的 Hibernate 集成问题。所有这些全部遵从 Spring 通用事务处理和通用数据访问对象异常等级规范。
- 灵活的基于核心 Spring 功能的 MVC 网页应用程序框架。开发者通过策略接口将拥有对该框架的高度控制，因而该框架将适应于多种呈现（View）技术，例如 JSP、FreeMarker、Velocity、Thymeleaf 等。值得注意的是，Spring 中间层可以轻易地结合于任何基于 MVC 框架的网页层，例如 Struts、WebWork 或 Tapestry。
- 提供诸如事务管理等服务的AOP框架。

在设计应用程序 Model 时，MVC模式（例如 Struts）通常难于给出一个简洁明了的框架结构。Spring 却具有能够让这部分工作变得简单的能力。程序开发员们可以使用Spring的JDBC抽象层重新设计那些复杂的框架结构。

## SpringBoot

SpringBoot 对上述 Spring 配置复杂等缺点进行的改善和优化，基于约定优于配置的思想，可以让开发人员不必在配置与逻辑业务之间进行思维的切换，全身心的投入到逻辑业务的代码编写中。

**SpringBoot 的特点**

1. 为基于Spring的开发提供更快的入门体验 
2. 开箱即用，没有代码生成，也无需XML配置。同时也可以修改默认值来满足特定的需求
3. 提供了一些大型项目中常见的非功能性特性，如嵌入式服务器、安全、指标，健康检测、外部配置等

SpringBoot不是对Spring功能上的增强，而是提供了一种快速使用Spring的方式 ¶

**SpringBoot 的核心功能** 

- 起步依赖
起步依赖本质上是一个Maven项目对象模型（Project Object Model，POM），定义了对其他库的传递依赖，这些东西加在一起即支持某项功能。 简单的说，起步依赖就是将具备某种功能的坐标打包到一起，并提供一些默认的功能。 

- 自动配置
Spring Boot的自动配置是一个运行时（更准确地说，是应用程序启动时）的过程，考虑了众多因素，才决定Spring配置应该用哪个，不该用哪个。该过程是Spring自动完成的。

## SpringCloud

Spring Cloud是一系列框架的有序集合。它利用Spring Boot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用Spring Boot的开发风格做到一键启动和部署。

Spring Cloud并没有重复制造轮子，它只是将各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包。