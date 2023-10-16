import{_ as i,o as r,c as e,Q as t}from"./chunks/framework.419948d5.js";const O=JSON.parse('{"title":"Spring AOP 面向切面编程","description":"Spring AOP 切面","frontmatter":{"title":"Spring AOP 面向切面编程","date":"2022-09-15T00:00:00.000Z","tag":"AOP","description":"Spring AOP 切面"},"headers":[],"relativePath":"spring/spring/2.1-aop.md","filePath":"spring/spring/2.1-aop.md","lastUpdated":1697497069000}'),a={name:"spring/spring/2.1-aop.md"},p=t('<p>Spring AOP 面向切面编程，是 Spring 框架的核心功能之一。</p><h2 id="spring-面向切面编程" tabindex="-1">Spring 面向切面编程 <a class="header-anchor" href="#spring-面向切面编程" aria-label="Permalink to &quot;Spring 面向切面编程&quot;">​</a></h2><p>面向切面编程 (Aspect-oriented Programming 简称 AOP) ，是相对面向对象编程 (Object-oriented Programming 简称 OOP ) 的框架，作为 OOP 的一种功能补充。OOP 主要的模块单元是类 (class)。而 AOP 则是切面 (aspect)。切面会将诸如事务管理这样跨越多个类型和对象的关注点模块化 (在 AOP 的语义中，这类关注点被称为横切关注点 (crosscutting) )。</p><p>AOP 是 Spring 框架重要的组件，虽然 Spring IoC 容器没有依赖 AOP，因此 Spring 不会强迫开发者使用 AOP。但 AOP 提供了非常棒的功能，用做对 Spring IoC 的补充。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>Spring AOP 具有 AspectJ 切点 aop-pointcuts-designators</strong></p><p>Spring 引入了一种更简单、更强大的方式用来自定义切面，开发者可以选择使用基于模式 schema-based approach 的方式或使用 @AspectJ 注解风格方式来定义。 这两种方式都完全支持通知 (Advice) 类型和 AspectJ 的切点语义，虽然实际上仍然是使用 Spring AOP 织入 (weaving) 的。</p></div><h2 id="aop-概念" tabindex="-1">AOP 概念 <a class="header-anchor" href="#aop-概念" aria-label="Permalink to &quot;AOP 概念&quot;">​</a></h2><p><strong>AOP 术语：</strong></p><ul><li>Aspect (切面): 指关注点模块化，这个关注点可能会横切多个对象。事务管理是企业级 Java 应用中有关横切关注点的例子。在 Spring AOP 中，切面可以使用通用类 <a href="http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#aop-schema" target="_blank" rel="noreferrer">基于 schema 的方式</a>的方式或者在普通类中以 <a href="http://docs.jcohy.com/docs/spring-framework/5.3.6/html5/zh-cn/core.html#aop-ataspectj" target="_blank" rel="noreferrer"><code>@AspectJ</code></a>注解来实现。</li><li>Join point (连接点): 在程序执行过程中某个特定的点，例如某个方法调用的时间点或者处理异常的时间点。在 Spring AOP 中，一个连接点总是代表一个方法的执行。</li><li>Advice (通知): 在切面的某个特定的连接点上执行的动作。通知有多种类型，包括“around”, “before”和“after”等等。通知的类型将在后面的章节进行讨论。许多 AOP 框架，包括 Spring 在内，都是以拦截器做通知模型的，并维护着一个以连接点为中心的拦截器链。</li><li>Pointcut (切点): 匹配连接点的断言。通知和切点表达式相关联，并在满足这个切点的连接点上运行 (例如，当执行某个特定名称的方法时) 。切点表达式如何和连接点匹配是 AOP 的核心：Spring 默认使用 AspectJ 切点语义。</li><li>Introduction (引入): 声明额外的方法或者某个类型的字段。Spring 允许引入新的接口 (以及一个对应的实现) 到任何被通知的对象上。例如，可以使用引入来使 bean 实现 <code>IsModified</code> 接口，以便简化缓存机制 (在 AspectJ 社区，引入也被称为内部类型声明 (inter) ) 。</li><li>Target object (目标对象): 被一个或者多个切面所通知的对象。也被称作被通知 (advised) 对象。既然 Spring AOP 是通过运行时代理实现的，那么这个对象永远是一个被代理 (proxied) 的对象。</li><li>AOP proxy (AOP 代理): AOP 框架创建的对象，用来实现切面契约 (aspect contract) (包括通知方法执行等功能) 。在 Spring 中，AOP 代理可以是 JDK 动态代理或 CGLIB 代理。</li><li>Weaving (织入): 把切面连接到其它的应用程序类型或者对象上，并创建一个被被通知的对象的过程。这个过程可以在编译时 (例如使用 AspectJ 编译器) 、类加载时或运行时中完成。Spring 和其他纯 Java AOP 框架一样，是在运行时完成织入的。</li></ul><p><strong>Spring AOP 包含以下类型的通知：</strong></p><ul><li>Before advice (前置通知): 在连接点之前运行但无法阻止执行流程进入连接点的通知 (除非它引发异常) 。</li><li>After returning advice (后置返回通知): 在连接点正常完成后执行的通知 (例如，当方法没有抛出任何异常并正常返回时) 。</li><li>After throwing advice (后置异常通知): 在方法抛出异常退出时执行的通知。</li><li>After (finally) advice (后置通知 (总会执行) ): 当连接点退出的时候执行的通知 (无论是正常返回还是异常退出) 。</li><li>Around advice (环绕通知): 环绕连接点的通知，例如方法调用。这是最强大的一种通知类型，环绕通知可以在方法调用前后完成自定义的行为，它可以选择是否继续执行连接点或直接返回自定义的返回值又或抛出异常将执行结束。</li></ul><p>Spring 目前仅支持方法调用的方式作为连接点 (在 Spring bean 上通知方法的执行) . 虽然可以在不影响到 Spring AOP 核心 API 的情况下加入对成员变量拦截器支持，但 Spring 并没有实现成员变量拦截器。如果需要通知对成员变量的访问和更新连接点，可以考虑其它语言，例如 AspectJ。</p>',11),n=[p];function o(c,s,l,g,d,A){return r(),e("div",null,n)}const h=i(a,[["render",o]]);export{O as __pageData,h as default};