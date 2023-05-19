import{_ as i,W as s,X as a,Z as r,$ as e,a0 as t,a1 as o,C as g}from"./framework-ea95e8eb.js";const l={},p=o('<h2 id="spring-模块" tabindex="-1"><a class="header-anchor" href="#spring-模块" aria-hidden="true">#</a> Spring 模块</h2><p>Spring 总共大约 20 个模块，这些模块被整合在核心容器、AOP 和设备支持、数据访问与集成、Web 组件、通信报文和集成测试、集成兼容等模块中。</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/spring/spring_framework_modules.png" alt="Spring 模块" loading="lazy"></p><p>各个模块之间存在一些依赖关系如下：</p><p><img src="https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/spring/spring_framework_modules_relation.png" alt="Spring 模块依赖关系" loading="lazy"></p><h3 id="core-container-核心容器" tabindex="-1"><a class="header-anchor" href="#core-container-核心容器" aria-hidden="true">#</a> Core Container（核心容器）</h3><p>Spring 核心容器包含了如下几个包：</p><ul><li><strong>spring-core</strong> 模块封装了 Spring 框架的底层部分，包括资源访问、类型转换及一些常用工具类。</li><li><strong>spring-bean</strong> 模块提供了框架的基础部分，包括控制反转（IOC）和依赖注入（DI）。</li><li><strong>spring-context</strong> 模块建立在 Core 和 Beans 模块的基础之上，集成 Beans 模块功能并添加资源绑定、数据验证、国际化、Java EE 支持、容器生命周期、事件传播等。ApplicationContext 是该模块的核心接口，它的超类是 BeanFactory。 <ul><li><strong>spring-context-support</strong> 模块是对 Spring IoC 容器及 IoC 子容器的扩展支持。</li><li><strong>spring-context-indexer</strong> 模块是 Spring 的类管理组件和 Classpath 扫描组件。</li></ul></li><li><strong>spring-expression</strong> 模块是 Spring 表达式语言（简称“SpEL”），它是一种强大的表达式语言，支持在运行时查询和操作对象图。语言语法类似于 Unified EL，但提供了额外的功能，最值得注意的是方法调用和基本的字符串模板功能。</li></ul><h3 id="aop、aspects、instrument-和-messaging" tabindex="-1"><a class="header-anchor" href="#aop、aspects、instrument-和-messaging" aria-hidden="true">#</a> AOP、Aspects、Instrument 和 Messaging</h3><p>在 Core Container 之上是 AOP、Aspects 等模块，各模块如下：</p><ul><li><p><strong>spring-aop</strong> 模块是 Spring 的另一个核心，提供了面向切面编程的实现。Spring 以 JVM 的动态代理技术为基础，设计出了一系列的 AOP 横切实现，比如前置通知、返回通知、异常通知等。同时，Pointcut 接口可以匹配切入点，可以使用现有的切入点来设计横切面，也可以扩展相关方法根据需求进行切入。</p></li><li><p>**spring-aspects ** 模块提供与 AspectJ 的集成，是一个功能强大且成熟的面向切面编程（AOP）框架。</p></li><li><p><strong>spring-instrument</strong> 模块是基于 Java SE 中的 java.lang.instrument 进行设计的，应该算 AOP 的一个支援模块，主要作用是在 JVM 启用时生成一个代理类，程序员通过代理类在运行时修改类的字节，从而改变一个类的功能，实现 AOP。</p></li><li><p><strong>spring-instrument</strong> 模块是 Spring 中 对消息传递体系结构和协议的实现。</p></li><li><p><strong>spring-jcl</strong> 模块是 Spring 5.x 中新增的日志框架集成。</p></li></ul><h3 id="data-access-integration-数据访问-集成" tabindex="-1"><a class="header-anchor" href="#data-access-integration-数据访问-集成" aria-hidden="true">#</a> Data Access/Integration（数据访问/集成）</h3><p>本层包括 JDBC、ORM、OXM、JMS 和 Transactions 模块，各模块如下：</p><ul><li><strong>spring-jdbc</strong> 模块提供了一个 JDBC 的样例模板，使用这些模板能消除传统冗长的 JDBC 编码还有必须的事务控制，而且能享受到 Spring 管理事务的好处。</li><li><strong>spring-orm</strong> 模块提供与流行的“对象 - 关系”映射框架无缝集成的 API，包括 JPA、JDO、Hibernate 和 MyBatis 等。而且还可以使用 Spring 事务管理，无需额外控制事务。</li><li><strong>spring-oxm</strong> 模块提供了一个支持 Object /XML 映射的抽象层实现，如 JAXB、Castor、XMLBeans、JiBX 和 XStream。将 Java 对象映射成 XML 数据，或者将 XML 数据映射成 Java 对象。</li><li><strong>spring-jms</strong> 模块指 Java 消息服务，提供一套“消息生产者、消息消费者”模板用于更加简单的使用 JMS，JMS 用于用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。</li><li><strong>spring-tx</strong> 模块是 Spring JDBC 事务控制实现模块。</li><li><strong>spring-r2dbc</strong> 模块（反应式关系数据库连接）是一个社区驱动的规范工作，旨在使用反应式模式标准化对 SQL 数据库的访问。</li></ul><h3 id="web-模块" tabindex="-1"><a class="header-anchor" href="#web-模块" aria-hidden="true">#</a> WEB 模块</h3><p>Spring 的 Web 层包括 Web、Servlet、WebSocket 和 Webflux 组件，各模块如下：</p><ul><li><strong>spring-web</strong> 模块提供了基本的 Web 开发集成特性，例如多文件上传功能、使用的 Servlet 监听器的 IOC 容器初始化以及 Web 应用上下文。</li><li><strong>spring-webmvc</strong> 模块是一个 Web-Servlet 模块，实现了 Spring MVC（Model-View- Controller）的 Web 应用。</li><li><strong>spring-websocket</strong> 模块是与 Web 前端进行全双工通信的协议。</li><li><strong>spring-webflux</strong> 模块是 Spring Framework 5.x 中引入的新的响应式 web 框架。与 Spring MVC 不同，它不需要 Servlet API，是完全异步且非阻塞的，并且通过 Reactor 项目实现了 Reactive Streams 规范。Spring WebFlux 用于创建基于事件循环执行模型的完全异步且非阻塞的应用程序。</li></ul><h3 id="test-模块" tabindex="-1"><a class="header-anchor" href="#test-模块" aria-hidden="true">#</a> TEST 模块</h3><p><strong>spring-test</strong> 模块是 Spring 支持 Junit 和 TestNG 的测试框架，而且还额外提供了一些基于 Spring 的测试功能，比如在测试 Web 框架时，模拟 Http 请求的功能。包含 Mock Objects, TestContext Framework, Spring MVC Test, WebTestClient。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',20),c={href:"https://pdai.tech/md/spring/spring.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://segmentfault.com/a/1190000040836027",target:"_blank",rel:"noopener noreferrer"};function d(u,S){const n=g("ExternalLinkIcon");return s(),a("div",null,[p,r("ul",null,[r("li",null,[r("a",c,[e("Java 全栈知识体系"),t(n)])]),r("li",null,[r("a",h,[e("Spring5 系统架构"),t(n)])])])])}const b=i(l,[["render",d],["__file","1.1-structure.html.vue"]]);export{b as default};