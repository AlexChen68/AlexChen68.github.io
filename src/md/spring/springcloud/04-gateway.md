---
title: 微服务网关中心
category: SpringCloud
tag: SpringGateway
date: 2023-02-12
description: 微服务网关中心
---

## 什么是网关？

在微服务架构中，通常一个系统会被拆分为多个微服务，面对这么多微服务客户端应该如何去调用呢？如果没有其他更优方法，我们只能记录每个微服务对应的地址，分别去调用，但是这样会有很多的问题和潜在因素：

1. 客户端多次请求不同的微服务，会增加客户端代码和配置的复杂性，维护成本比价高。
2. 认证复杂，每个微服务可能存在不同的认证方式，客户端去调用，要去适配不同的认证，
3. 存在跨域的请求，调用链有一定的相对复杂性（防火墙 / 浏览器不友好的协议）。
4. 难以重构，随着项目的迭代，可能需要重新划分微服务

为了解决上面的问题，微服务引入了 **网关** 的概念，网关为微服务架构的系统提供简单、有效且统一的 API 路由管理，作为系统的统一入口，提供内部服务的路由中转，给客户端提供统一的服务，可以实现一些和业务没有耦合的公用逻辑，主要功能包含认证、鉴权、路由转发、安全策略、防刷、流量控制、监控日志等。

## SpringCloudGateway

**Spring Cloud Gateway** 是 Spring Cloud 的一个全新的 API 网关项目，目的是为了替换掉 Zuul1，它基于 Spring5.0 + SpringBoot2.0 + WebFlux（基于性能的 Reactor 模式响应式通信框架 Netty，异步阻塞模型）等技术开发，性能于 Zuul，官测试，Spring Cloud GateWay 是 Zuul 的 1.6 倍，旨在为微服务架构提供种简单有效的统的 API 路由管理式。

可以与 Spring Cloud Discovery Client（如 Eureka）、Ribbon、Hystrix 等组件配合使用，实现路由转发、负载均衡、熔断、鉴权、路径重写、志监控等

Gateway 还内置了限流过滤器，实现了限流的功能。设计优雅，容易拓展。





## 参考资料

- [SpringCloudGateway 官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/)
- [SpringCloud GateWay 万字详解](https://www.cnblogs.com/mingyueyy/p/16366360.html)