---
title: SpringCloud 简介
date: 2022-09-15
article: false
---

## SpringCloud 是什么

Spring Cloud 是一款基于 Spring Boot 实现的微服务框架。Spring Cloud 源自 Spring 社区，主要由 Pivotal 和 Netflix 两大公司提供技术迭代和维护。

随着微服务的火爆流行，国内外各大互联网公司都相继分享了他们在微服务架构中，针对不同场景出现的各种问题的解决方案和开源框架。
服务治理：阿里巴巴开源的 Dubbo 和当当网在其基础上扩展出来的 DubboX、Netflix 的 Eureka 以及 Apache 的 Consul 等。
分布式配置管理：百度的 Disconf、Netflix 的 Archaius、360 的 QConf、携程的 Apollo 以及 Spring Cloud 的 Config 等。
批量任务：当当网的 Elastic-Job、LinkedIn 的 Azkaban 以及 Spring Cloud 的 Task 等。
服务跟踪：京东的 Hydra、Spring Cloud 的 Sleuth 以及 Twitter 的 Zipkin 等。

以上这些微服务框架或解决方案都具有以下 2 个特点：
对于同一个微服务问题，各互联网公司给出的解决方案各不相同。
一个微服务框架或解决方案都只能解决微服务中的某一个或某几个问题，对于其他问题则无能为力。

这种情况下，搭建一套微分布式微服务系统，就需要针对这些问题从诸多的解决方案中做出选择，这使得我们不得不将大量的精力花费在前期的调研、分析以及实验上。

Spring Cloud 被称为构建分布式微服务系统的“全家桶”，它并不是某一门技术，而是一系列微服务解决方案或框架的有序集合。它将市面上成熟的、经过验证的微服务框架整合起来，并通过 Spring Boot 的思想进行再封装，屏蔽调其中复杂的配置和实现原理，最终为开发人员提供了一套简单易懂、易部署和易维护的分布式系统开发工具包。

Spring Cloud 中包含了 spring-cloud-config、spring-cloud-bus 等近 20 个子项目，提供了服务治理、服务网关、智能路由、负载均衡、断路器、监控跟踪、分布式消息队列、配置管理等领域的解决方案。

Spring Cloud 并不是一个拿来即可用的框架，它是一种微服务规范，共有以下 2 代实现：
第一代实现：Spring Cloud Netflix 
第二代实现：Spring Cloud Alibaba 

这里我们介绍的 Spring Cloud 特指 Spring Cloud 的第一代实现。

## Spring Cloud 常用组件

Spring Cloud 包括 Spring Cloud Gateway、Spring Cloud Config、Spring Cloud Bus 等近 20 个服务组件，这些组件提供了服务治理、服务网关、智能路由、负载均衡、熔断器、监控跟踪、分布式消息队列、配置管理等领域的解决方案。

常见组件：

![SpringCloud 组件](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/springcloud_modules.png)

## Spring Boot 和 Spring Cloud 的区别与联系

Spring Boot 和 Spring Cloud 都是 Spring 大家族的一员，它们在微服务开发中都扮演着十分重要的角色，两者之间既存在区别也存在联系。

1. Spring Boot 和 Spring Cloud 分工不同
Spring Boot 是一个基于 Spring 的快速开发框架，它能够帮助开发者迅速搭 Web 工程。在微服务开发中，Spring Boot 专注于快速、方便地开发单个微服务。

Spring Cloud 是微服务架构下的一站式解决方案。Spring Cloud 专注于全局微服务的协调和治理工作。换句话说，Spring Cloud 相当于微服务的大管家，负责将 Spring Boot 开发的一个个微服务管理起来，并为它们提供配置管理、服务发现、断路器、路由、微代理、事件总线、决策竞选以及分布式会话等服务。

2. Spring Cloud 是基于 Spring Boot 实现的

Spring Cloud 是基于 Spring Boot 实现的。与 Spring Boot 类似，Spring Cloud 也为提供了一系列 Starter，这些 Starter 是 Spring Cloud 使用 Spring Boot 思想对各个微服务框架进行再封装的产物。它们屏蔽了这些微服务框架中复杂的配置和实现原理，使开发人员能够快速、方便地使用 Spring Cloud 搭建一套分布式微服务系统。

3. Spring Boot 和 Spring Cloud 依赖项数量不同

Spring Boot 属于一种轻量级的框架，构建 Spring Boot 工程所需的依赖较少。

Spring Cloud 是一系列微服务框架技术的集合体，它的每个组件都需要一个独立的依赖项（Starter POM），因此想要构建一套完整的 Spring  Cloud 工程往往需要大量的依赖项。

4. Spring Cloud 不能脱离 Spring Boot 单独运行

Spring Boot 不需要 Spring Cloud，就能直接创建可独立运行的工程或模块。

Spring Cloud 是基于 Spring Boot 实现的，它不能独立创建工程或模块，更不能脱离 Spring Boot 独立运行。

## 参考资料

- [站长严长生 - Spring Cloud 是什么](http://c.biancheng.net/springcloud/what-is-cloud.html)