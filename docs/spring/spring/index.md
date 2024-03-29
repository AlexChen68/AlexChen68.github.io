---
title: Spring 简介和模块组成
article: false
date: 2022-09-15
---

# Spring 简介

## 什么是 Spring？

Spring 框架是一个开放源代码的 J2EE 应用程序框架，由 Rod Johnson 发起，是针对 bean 的生命周期进行管理的轻量级容器（lightweight container）。Spring 解决了开发者在 J2EE 开发中遇到的许多常见的问题，提供了功能强大 IOC、AOP 及 Web MVC 等功能。Spring 可以单独应用于构筑应用程序，也可以和 Struts、Webwork、Tapestry 等众多 Web 框架组合使用。

Spring 框架分为多个模块，应用程序可以选择他们需要的模块。core 是核心容器的模块，包括配置模型和依赖注入机制。除此之外，Spring 框架还为不同的应用程序架构提供了基础支持，包括消息传递、事务数据和持久性以及 Web。它还包括基于 Servlet 的 Spring MVC Web 框架，以及并行的 Spring WebFlux 反应式 Web 框架。

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

## Spring 模块

Spring 总共大约 20 个模块，这些模块被整合在核心容器、AOP 和设备支持、数据访问与集成、Web 组件、通信报文和集成测试、集成兼容等模块中。

![Spring 模块](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/spring_framework_modules.png)

各个模块之间存在一些依赖关系如下：

![Spring 模块依赖关系](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/spring_framework_modules_relation.png)

### Core Container（核心容器）

Spring 核心容器包含了如下几个包：

- **spring-core** 模块封装了 Spring 框架的底层部分，包括资源访问、类型转换及一些常用工具类。
- **spring-bean** 模块提供了框架的基础部分，包括控制反转（IOC）和依赖注入（DI）。
- **spring-context** 模块建立在 Core 和 Beans 模块的基础之上，集成 Beans 模块功能并添加资源绑定、数据验证、国际化、Java EE 支持、容器生命周期、事件传播等。ApplicationContext 是该模块的核心接口，它的超类是 BeanFactory。
  - **spring-context-support** 模块是对 Spring IoC 容器及 IoC 子容器的扩展支持。
  - **spring-context-indexer** 模块是 Spring 的类管理组件和 Classpath 扫描组件。
- **spring-expression** 模块是 Spring 表达式语言（简称“SpEL”），它是一种强大的表达式语言，支持在运行时查询和操作对象图。语言语法类似于 Unified EL，但提供了额外的功能，最值得注意的是方法调用和基本的字符串模板功能。

### AOP、Aspects、Instrument 和 Messaging

在 Core Container 之上是 AOP、Aspects 等模块，各模块如下：

- **spring-aop** 模块是 Spring 的另一个核心，提供了面向切面编程的实现。Spring 以 JVM 的动态代理技术为基础，设计出了一系列的 AOP 横切实现，比如前置通知、返回通知、异常通知等。同时，Pointcut 接口可以匹配切入点，可以使用现有的切入点来设计横切面，也可以扩展相关方法根据需求进行切入。

- **spring-aspects ** 模块提供与 AspectJ 的集成，是一个功能强大且成熟的面向切面编程（AOP）框架。

- **spring-instrument** 模块是基于 Java SE 中的 java.lang.instrument 进行设计的，应该算 AOP 的一个支援模块，主要作用是在 JVM 启用时生成一个代理类，程序员通过代理类在运行时修改类的字节，从而改变一个类的功能，实现 AOP。

- **spring-instrument** 模块是 Spring 中 对消息传递体系结构和协议的实现。

- **spring-jcl** 模块是 Spring 5.x 中新增的日志框架集成。

### Data Access/Integration（数据访问/集成）

本层包括 JDBC、ORM、OXM、JMS 和 Transactions 模块，各模块如下：

- **spring-jdbc** 模块提供了一个 JDBC 的样例模板，使用这些模板能消除传统冗长的 JDBC 编码还有必须的事务控制，而且能享受到 Spring 管理事务的好处。
- **spring-orm** 模块提供与流行的“对象 - 关系”映射框架无缝集成的 API，包括 JPA、JDO、Hibernate 和 MyBatis 等。而且还可以使用 Spring 事务管理，无需额外控制事务。
- **spring-oxm** 模块提供了一个支持 Object /XML 映射的抽象层实现，如 JAXB、Castor、XMLBeans、JiBX 和 XStream。将 Java 对象映射成 XML 数据，或者将 XML 数据映射成 Java 对象。
- **spring-jms** 模块指 Java 消息服务，提供一套“消息生产者、消息消费者”模板用于更加简单的使用 JMS，JMS 用于用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。
- **spring-tx** 模块是 Spring JDBC 事务控制实现模块。
- **spring-r2dbc** 模块（反应式关系数据库连接）是一个社区驱动的规范工作，旨在使用反应式模式标准化对 SQL 数据库的访问。

### WEB 模块

Spring 的 Web 层包括 Web、Servlet、WebSocket 和 Webflux 组件，各模块如下：

- **spring-web** 模块提供了基本的 Web 开发集成特性，例如多文件上传功能、使用的 Servlet 监听器的 IOC 容器初始化以及 Web 应用上下文。
- **spring-webmvc**  模块是一个 Web-Servlet 模块，实现了 Spring MVC（Model-View- Controller）的 Web 应用。
- **spring-websocket** 模块是与 Web 前端进行全双工通信的协议。
- **spring-webflux** 模块是 Spring Framework 5.x 中引入的新的响应式 web 框架。与 Spring MVC 不同，它不需要 Servlet API，是完全异步且非阻塞的，并且通过 Reactor 项目实现了 Reactive Streams 规范。Spring WebFlux 用于创建基于事件循环执行模型的完全异步且非阻塞的应用程序。

### TEST 模块

**spring-test** 模块是 Spring 支持 Junit 和 TestNG 的测试框架，而且还额外提供了一些基于 Spring 的测试功能，比如在测试 Web 框架时，模拟 Http 请求的功能。包含 Mock Objects, TestContext Framework, Spring MVC Test, WebTestClient。

## 参考资料

- [Java 全栈知识体系](https://pdai.tech/md/spring/spring.html)
- [Spring5 系统架构](https://segmentfault.com/a/1190000040836027)