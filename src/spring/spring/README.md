---
title: Spring 简介
date: 2022-09-15
index: false
article: false
---

## 什么是 Spring？

Spring 框架是一个开放源代码的 J2EE 应用程序框架，由 Rod Johnson 发起，是针对 bean 的生命周期进行管理的轻量级容器（lightweight container）。Spring 解决了开发者在 J2EE 开发中遇到的许多常见的问题，提供了功能强大 IOC、AOP 及 Web MVC 等功能。Spring 可以单独应用于构筑应用程序，也可以和 Struts、Webwork、Tapestry 等众多 Web 框架组合使用。

Spring 框架分为模块。应用程序可以选择他们需要的模块。核心是核心容器的模块，包括配置模型和依赖注入机制。除此之外，Spring 框架还为不同的应用程序架构提供了基础支持，包括消息传递、事务数据和持久性以及 Web。它还包括基于 Servlet 的 Spring MVC Web 框架，以及并行的 Spring WebFlux 反应式 Web 框架。

Spring 框架的**特性**：

- 非侵入式：基于 Spring 开发的应用中的对象可以不依赖于 Spring 的 API。
- 控制反转：IOC——Inversion of Control，指的是将对象的创建权交给 Spring 去创建。使用 Spring 之前，对象的创建都是由我们自己在代码中 new 创建。而使用 Spring 之后。对象的创建都是给了 Spring 框架。
- 依赖注入：DI——Dependency Injection，是指依赖的对象不需要手动调用 setXX 方法去设置，而是通过配置赋值。
- 面向切面编程：Aspect Oriented Programming——AOP
- 容器：Spring 是一个容器，因为它包含并且管理应用对象的生命周期
- 组件化：Spring 实现了使用简单的组件配置组合成一个复杂的应用。在 Spring 中可以使用 XML 和 Java 注解组合这些对象。
- 一站式：在 IOC 和 AOP 的基础上可以整合各种企业应用的开源框架和优秀的第三方类库（实际上 Spring 自身也提供了表现层的 SpringMVC 和持久层的 Spring JDBC）。

## Spring 的历史

要谈 Spring 的历史，就要先谈 J2EE。J2EE 应用程序的广泛实现是在 1999 年和 2000 年开始的，它的出现带来了诸如事务管理之类的核心中间层概念的标准化，但是在实践中并没有获得绝对的成功，因为开发效率，开发难度和实际的性能都令人失望。

曾经使用过 EJB 开发 JAVA EE 应用的人，一定知道，在 EJB 开始的学习和应用非常的艰苦，很多东西都不能一下子就很容易的理解。EJB 要严格地实现各种不同类型的接口，类似的或者重复的代码大量存在。而配置也是复杂和单调，同样使用 JNDI 进行对象查找的代码也是单调而枯燥。虽然有一些开发工作随着 xdoclet 的出现，而有所缓解，但是学习 EJB 的高昂代价，和极低的开发效率，极高的资源消耗，都造成了 EJB 的使用困难。而 Spring 出现的初衷就是为了解决类似的这些问题。

Spring 的一个最大的目的就是使 JAVA EE 开发更加容易。同时，Spring 之所以与 Struts、Hibernate 等单层框架不同，是因为 Spring 致力于提供一个以统一的、高效的方式构造整个应用，并且可以将单层框架以最佳的组合揉和在一起建立一个连贯的体系。可以说 Spring 是一个提供了更完善开发环境的一个框架，可以为 POJO(Plain Ordinary Java Object) 对象提供企业级的服务。

Spring 的形成，最初来自 Rod Jahnson 所著的一本很有影响力的书籍《Expert One-on-One J2EE Design and Development  (opens new window)》，就是在这本书中第一次出现了 Spring 的一些核心思想，该书出版于 2002 年。
