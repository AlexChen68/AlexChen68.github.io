---
title: Spring 模块组成
tag: [Spring]
category: [Spring]
isOriginal: true
date: 2022-09-16
description: Spring 模块组成
---

## 什么是 Spring

Spring 框架是一个开放源代码的 J2EE 应用程序框架，由 Rod Johnson 发起，是针对 bean 的生命周期进行管理的轻量级容器（lightweight container）。 Spring 解决了开发者在 J2EE 开发中遇到的许多常见的问题，提供了功能强大 IOC、AOP 及 Web MVC 等功能。Spring 可以单独应用于构筑应用程序，也可以和 Struts、Webwork、Tapestry 等众多 Web 框架组合使用。

Spring 框架分为模块。应用程序可以选择他们需要的模块。核心是核心容器的模块，包括配置模型和依赖注入机制。除此之外，Spring 框架还为不同的应用程序架构提供了基础支持，包括消息传递、事务数据和持久性以及 Web。它还包括基于 Servlet 的 Spring MVC Web 框架，以及并行的 Spring WebFlux 反应式 Web 框架。

Spring 框架的**特性**：

- 非侵入式：基于Spring开发的应用中的对象可以不依赖于 Spring 的API。
- 控制反转：IOC——Inversion of Control，指的是将对象的创建权交给 Spring 去创建。使用 Spring 之前，对象的创建都是由我们自己在代码中new创建。而使用 Spring 之后。对象的创建都是给了 Spring 框架。
- 依赖注入：DI——Dependency Injection，是指依赖的对象不需要手动调用 setXX 方法去设置，而是通过配置赋值。
- 面向切面编程：Aspect Oriented Programming——AOP
- 容器：Spring 是一个容器，因为它包含并且管理应用对象的生命周期
- 组件化：Spring 实现了使用简单的组件配置组合成一个复杂的应用。在 Spring 中可以使用XML和Java注解组合这些对象。
- 一站式：在 IOC 和 AOP 的基础上可以整合各种企业应用的开源框架和优秀的第三方类库（实际上 Spring 自身也提供了表现层的 SpringMVC 和持久层的 Spring JDBC）。

## Spring 模块

Spring 总共大约20个模块，这些模块被整合在核心容器、AOP和设备支持、数据访问与集成、Web组件、通信报文和集成测试、集成兼容等模块中。

![Spring模块](https://cdn.staticaly.com/gh/AlexChen68/images@master/blog/spring/springframework_modules.png)

各个模块之间存在一些依赖关系如下：

![Spring模块依赖关系](https://cdn.staticaly.com/gh/AlexChen68/images@master/blog/spring/springframework_modules_relation.png)



### Core Container（核心容器）

Spring 核心容器包含了如下几个包：

- **spring-core** 模块封装了 Spring 框架的底层部分，包括资源访问、类型转换及一些常用工具类。
- **spring-bean** 模块提供了框架的基础部分，包括控制反转（IOC）和依赖注入（DI）。
- **spring-context** 模块建立在 Core 和 Beans 模块的基础之上，集成 Beans 模块功能并添加资源绑定、数据验证、国际化、Java EE 支持、容器生命周期、事件传播等。ApplicationContext是该模块的核心接口，它的超类是BeanFactory。
  - **spring-context-support** 模块是对Spring IoC容器及IoC子容器的扩展支持。
  - **spring-context-indexer** 模块是Spring的类管理组件和Classpath扫描组件。
- **spring-expression** 模块是 Spring 表达式语言（简称“SpEL”），它是一种强大的表达式语言，支持在运行时查询和操作对象图。语言语法类似于 Unified EL，但提供了额外的功能，最值得注意的是方法调用和基本的字符串模板功能。

### AOP、Aspects、Instrument 和 Messaging

在 Core Container 之上是 AOP、Aspects 等模块，各模块如下：

- **spring-aop** 模块是 Spring 的另一个核心，提供了面向切面编程的实现。Spring以JVM的动态代理技术为基础，设计出了一系列的AOP横切实现，比如前置通知、返回通知、异常通知等。同时，Pointcut接口可以匹配切入点，可以使用现有的切入点来设计横切面，也可以扩展相关方法根据需求进行切入。

- **spring-aspects ** 模块提供与 AspectJ 的集成，是一个功能强大且成熟的面向切面编程（AOP）框架。

- **spring-instrument** 模块是基于Java SE中的java.lang.instrument进行设计的，应该算AOP的一个支援模块，主要作用是在JVM启用时生成一个代理类，程序员通过代理类在运行时修改类的字节，从而改变一个类的功能，实现AOP。

- **spring-instrument** 模块是 Spring 中 对消息传递体系结构和协议的实现。

- **spring-jcl** 模块是 Spring 5.x 中新增的日志框架集成。

### Data Access/Integration（数据访问/集成）

本层包括 JDBC、ORM、OXM、JMS 和 Transactions 模块，各模块如下：

- **spring-jdbc** 模块提供了一个 JDBC 的样例模板，使用这些模板能消除传统冗长的 JDBC 编码还有必须的事务控制，而且能享受到 Spring 管理事务的好处。
- **spring-orm** 模块提供与流行的“对象-关系”映射框架无缝集成的 API，包括 JPA、JDO、Hibernate 和 MyBatis 等。而且还可以使用 Spring 事务管理，无需额外控制事务。
- **spring-oxm** 模块提供了一个支持 Object /XML 映射的抽象层实现，如 JAXB、Castor、XMLBeans、JiBX 和 XStream。将 Java 对象映射成 XML 数据，或者将XML 数据映射成 Java 对象。
- **spring-jms** 模块指 Java 消息服务，提供一套 “消息生产者、消息消费者”模板用于更加简单的使用 JMS，JMS 用于用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。
- **spring-tx** 模块是 Spring JDBC 事务控制实现模块。
- **spring-r2dbc** 模块（反应式关系数据库连接）是一个社区驱动的规范工作，旨在使用反应式模式标准化对 SQL 数据库的访问。

### WEB 模块

Spring 的 Web 层包括 Web、Servlet、WebSocket 和 Webflux 组件，各模块如下：

- **spring-web** 模块提供了基本的 Web 开发集成特性，例如多文件上传功能、使用的 Servlet 监听器的 IOC 容器初始化以及 Web 应用上下文。
- **spring-webmvc**  模块是一个 Web-Servlet 模块，实现了Spring MVC（Model-View- Controller）的Web应用。
- **spring-websocket** 模块是与Web前端进行全双工通信的协议。
- **spring-webflux** 模块是 Spring Framework 5.x中引入的新的响应式web框架。与Spring MVC不同，它不需要Servlet API，是完全异步且非阻塞的，并且通过Reactor项目实现了Reactive Streams规范。Spring WebFlux 用于创建基于事件循环执行模型的完全异步且非阻塞的应用程序。

### TEST 模块

**spring-test** 模块是Spring 支持 Junit 和 TestNG 的测试框架，而且还额外提供了一些基于 Spring 的测试功能，比如在测试 Web 框架时，模拟 Http 请求的功能。包含 Mock Objects, TestContext Framework, Spring MVC Test, WebTestClient。

## 参考资料

[Java 全栈知识体系](https://pdai.tech/md/spring/spring.html)

[Spring5 系统架构](https://segmentfault.com/a/1190000040836027)
