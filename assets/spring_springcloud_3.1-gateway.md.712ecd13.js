import{_ as t,o as e,c as r,Q as a}from"./chunks/framework.419948d5.js";const y=JSON.parse('{"title":"SpringCloudGateway - API 网关","description":"微服务网关中心","frontmatter":{"title":"SpringCloudGateway - API 网关","tag":"SpringCloudGateway","date":"2023-02-12T00:00:00.000Z","description":"微服务网关中心"},"headers":[],"relativePath":"spring/springcloud/3.1-gateway.md","filePath":"spring/springcloud/3.1-gateway.md","lastUpdated":1697497069000}'),l={name:"spring/springcloud/3.1-gateway.md"},i=a('<h2 id="什么是网关" tabindex="-1">什么是网关？ <a class="header-anchor" href="#什么是网关" aria-label="Permalink to &quot;什么是网关？&quot;">​</a></h2><p>微服务背景下，一个系统被拆分为多个服务，但是像安全认证，流量控制，日志，监控等功能是每个服务都需要的，没有网关的话，我们就需要在每个服务中单独实现，这使得我们做了很多重复的事情并且没有一个全局的视图来统一管理这些功能。</p><p>在微服务架构中，通常一个系统会被拆分为多个微服务，面对这么多微服务客户端应该如何去调用呢？如果没有其他更优方法，我们只能记录每个微服务对应的地址，分别去调用，但是这样会有很多的问题和潜在因素：</p><ol><li>客户端多次请求不同的微服务，会增加客户端代码和配置的复杂性，维护成本比价高。</li><li>认证复杂，每个微服务可能存在不同的认证方式，客户端去调用，要去适配不同的认证，</li><li>存在跨域的请求，调用链有一定的相对复杂性（防火墙 / 浏览器不友好的协议）。</li><li>难以重构，随着项目的迭代，可能需要重新划分微服务</li></ol><p>为了解决上面的问题，微服务引入了 <strong>网关</strong> 的概念，网关为微服务架构的系统提供简单、有效且统一的 API 路由管理，作为系统的统一入口，提供内部服务的路由中转，给客户端提供统一的服务，可以实现一些和业务没有耦合的公用逻辑，主要功能包含认证、鉴权、路由转发、安全策略、防刷、流量控制、监控日志等。</p><h2 id="微服务网关的功能" tabindex="-1">微服务网关的功能 <a class="header-anchor" href="#微服务网关的功能" aria-label="Permalink to &quot;微服务网关的功能&quot;">​</a></h2><p>绝大部分网关可以提供下面这些功能：</p><ul><li><strong>请求转发</strong>：将请求转发到目标微服务。</li><li><strong>负载均衡</strong>：根据各个微服务实例的负载情况或者具体的负载均衡策略配置对请求实现动态的负载均衡。</li><li><strong>安全认证</strong>：对用户请求进行身份验证并仅允许可信客户端访问 API，并且还能够使用类似 RBAC 等方式来授权。</li><li><strong>参数校验</strong>：支持参数映射与校验逻辑。</li><li><strong>日志记录</strong>：记录所有请求的行为日志供后续使用。</li><li><strong>监控告警</strong>：从业务指标、机器指标、JVM 指标等方面进行监控并提供配套的告警机制。</li><li><strong>流量控制</strong>：对请求的流量进行控制，也就是限制某一时刻内的请求数。</li><li><strong>熔断降级</strong>：实时监控请求的统计信息，达到配置的失败阈值后，自动熔断，返回默认值。</li><li><strong>响应缓存</strong>：当用户请求获取的是一些静态的或更新不频繁的数据时，一段时间内多次请求获取到的数据很可能是一样的。对于这种情况可以将响应缓存起来。这样用户请求可以直接在网关层得到响应数据，无需再去访问业务服务，减轻业务服务的负担。</li><li><strong>响应聚合</strong>：某些情况下用户请求要获取的响应内容可能会来自于多个业务服务。网关作为业务服务的调用方，可以把多个服务的响应整合起来，再一并返回给用户。</li><li><strong>灰度发布</strong>：将请求动态分流到不同的服务版本（最基本的一种灰度发布）。</li><li><strong>异常处理</strong>：对于业务服务返回的异常响应，可以在网关层在返回给用户之前做转换处理。这样可以把一些业务侧返回的异常细节隐藏，转换成用户友好的错误提示返回。</li><li><strong>API 文档</strong>: 如果计划将 API 暴露给组织以外的开发人员，那么必须考虑使用 API 文档，例如 Swagger 或 OpenAPI。</li><li><strong>协议转换</strong>：通过协议转换整合后台基于 REST、AMQP、Dubbo 等不同风格和实现技术的微服务，面向 Web Mobile、开放平台等特定客户端提供统一服务。</li></ul><p>总结下来就是两件事：<strong>请求转发 + 请求过滤</strong>。</p><h2 id="spring-cloud-gateway-是什么" tabindex="-1">Spring Cloud Gateway 是什么？ <a class="header-anchor" href="#spring-cloud-gateway-是什么" aria-label="Permalink to &quot;Spring Cloud Gateway 是什么？&quot;">​</a></h2><p><strong>Spring Cloud Gateway</strong> 是 Spring Cloud 的一个全新的 API 网关项目，目的是为了替换掉 Zuul1，它基于 Spring5.0 + SpringBoot2.0 + WebFlux（基于性能的 Reactor 模式响应式通信框架 Netty，异步阻塞模型）等技术开发，性能于 Zuul，官测试，Spring Cloud GateWay 是 Zuul 的 1.6 倍，旨在为微服务架构提供种简单有效的统的 API 路由管理式。</p><p>为了提升网关的性能，SpringCloud Gateway 基于 Spring WebFlux。Spring WebFlux 使用 Reactor 库来实现响应式编程模型，底层基于 Netty 实现同步非阻塞的 I/O。它可以与 Spring Cloud Discovery Client（如 Eureka）、Ribbon、Hystrix 等组件配合使用，实现路由转发、负载均衡、熔断、鉴权、路径重写、志监控等。</p><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/springcloudgateway_demo.png" alt="springcloudgateway_demo.png"></p><h2 id="spring-cloud-gateway-基本原理" tabindex="-1">Spring Cloud Gateway 基本原理 <a class="header-anchor" href="#spring-cloud-gateway-基本原理" aria-label="Permalink to &quot;Spring Cloud Gateway 基本原理&quot;">​</a></h2><p>Gateway 本身是一个 Spring Boot 应用，它处理请求是逻辑是根据配置的路由对请求进行预处理和转发。Gateway 有几个比较核心的概念：</p><ul><li>Route: 一个 Route 由路由 ID，转发 URI，多个 Predicates 以及多个 Filters 构成。Gateway 上可以配置多个 Routes。处理请求时会按优先级排序，找到第一个满足所有 Predicates 的 Route。</li><li>Predicate: 表示路由的匹配条件，可以用来匹配请求的各种属性，如请求路径、方法、header 等。一个 Route 可以包含多个子 Predicates，多个子 Predicates 最终会合并成一个。</li><li>Filter: 过滤器包括了处理请求和响应的逻辑，可以分为 pre 和 post 两个阶段。多个 Filter 在 pre 阶段会按优先级高到低顺序执行，post 阶段则是反向执行。Gateway 包括两类 Filter <ul><li>全局 Filter: 每种全局 Filter 全局只会有一个实例，会对所有的 Route 都生效。</li><li>路由 Filter: 路由 Filter 是针对 Route 进行配置的，不同的 Route 可以使用不同的参数，因此会创建不同的实例。</li></ul></li></ul><p>下图展示了 Spring Cloud Gateway 的基本工作原理，过程比较简单。</p><p><img src="https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/spring/springcloudgateway_workflow.png" alt="springcloudgateway_workflow.png"></p><p>具体的流程分析：</p><ol><li><strong>路由判断</strong>：客户端的请求到达网关后，先经过 Gateway Handler Mapping 处理，这里面会做断言（Predicate）判断，看下符合哪个路由规则，这个路由映射后端的某个服务。</li><li><strong>请求过滤</strong>：然后请求到达 Gateway Web Handler，这里面有很多过滤器，组成过滤器链（Filter Chain），这些过滤器可以对请求进行拦截和修改，比如添加请求头、参数校验等等，有点像净化污水。然后将请求转发到实际的后端服务。这些过滤器逻辑上可以称作 Pre-Filters，Pre 可以理解为“在...之前”。</li><li><strong>服务处理</strong>：后端服务会对请求进行处理。</li><li><strong>响应过滤</strong>：后端处理完结果后，返回给 Gateway 的过滤器再次做处理，逻辑上可以称作 Post-Filters，Post 可以理解为“在...之后”。</li><li><strong>响应返回</strong>：响应经过过滤处理后，返回给客户端。</li></ol><p>Gateway 在启动时会创建 Netty Server，由它接收来自 Client 的请求。收到请求后根据路由的匹配条件找到第一个满足条件的路由，然后请求在被该路由配置的过滤器处理后由 Netty Client 转到目标服务。服务返回响应后会再次被过滤器处理，最后返回给 Client。</p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/" target="_blank" rel="noreferrer">SpringCloudGateway 官方文档</a></li><li><a href="https://www.cnblogs.com/mingyueyy/p/16366360.html" target="_blank" rel="noreferrer">SpringCloud GateWay 万字详解</a></li><li><a href="https://javaguide.cn/distributed-system/api-gateway.html" target="_blank" rel="noreferrer">API 网关基础知识总结</a></li><li><a href="https://blog.fintopia.tech/60e27b0e2078082a378ec5ed/" target="_blank" rel="noreferrer">Spring Cloud Gateway 原理介绍和应用</a></li></ul>',23),o=[i];function n(s,g,p,d,u,c){return e(),r("div",null,o)}const w=t(l,[["render",n]]);export{y as __pageData,w as default};