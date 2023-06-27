---
title: Spring MVC
article: true
tag: Spring
category: Spring
date: 2022-12-29
---

## Spring MVC 简介

Spring Web MVC 是一种基于 Java 的实现了 Web MVC 设计模式的请求驱动类型的轻量级 Web 框架，即使用了 MVC 架 构模式的思想，将 web 层进行职责解耦，基于请求驱动指的就是使用请求 - 响应模型，框架的目的就是帮助我们简化开发，Spring Web MVC 也是要简化我们日常 Web 开发的。

Spring MVC 将应用程序分为 Controller Model View 三层，Controller 接收客户端请求，调用 Model 生成业务数据，传递给 View,Spring MVC 就是对这套流程的封装，屏蔽了很多底层代码，开放出接口，让开发者可以更加轻松、便捷地完成基于 MVC 模式的 Web 开发。

![1687805175823.png](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/images/1687805175823.png)

## 核心组件

- DispatcherServlet：中央控制器，前端控制器

用户请求到达前端控制器（dispatcherServlet），他是整个流程控制的中心，由它负责调用其它组件处理用户的请求，dispatcherServlet 的存在降低了组件之间的耦合性。

- handler：处理器

Handler 也叫后端控制器，在 DispatcherServlet 的控制下 Handler 对【具体的用户请求】进行处理，由于 Handler 涉及到【具体的用户业务请求】，所以一般情况需要程序员【根据业务需求开发 Handler】，也就是编写 Controller。

- View：视图

一般情况下，需要通过【页面标签或页面模版技术】将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面。目前我们接触过得视图技术就是 jsp，当然还有 Freemarker，Thymeleaf 等。

- HandlerMapping：处理器映射器

HandlerMapping 负责根据【用户请求 url】找到【Handler】即处理器，springmvc 提供了不同的【处理器映射器】实现，如配置文件方式，实现接口方式，注解方式等。

- HandlAdapter：处理器适配器

HandlerAdapter 负责调用具体的处理器，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行。我们写的 controller 中的方法，将来就是会由处理器适配器调用。

- ViewResolver：视图解析器

View Resolver 负责将处理结果生成 View 视图，View Resolver 首先根据【逻辑视图名】解析成【物理视图名】即具体的页面地址，再生成 View 视图对象，最后对 View 进行渲染将处理结果通过页面展示给用户。

## Spring MVC 的请求流程

![1687807324829.png](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/images/1687807324829.png)

**核心架构的具体流程步骤**如下：

1. **首先用户发送请求——>DispatcherServlet**，前端控制器收到请求后自己不进行处理，而是委托给其他的解析器进行 处理，作为统一访问点，进行全局的流程控制；
2. **DispatcherServlet——>HandlerMapping**，HandlerMapping 将会把请求映射为 HandlerExecutionChain 对象（包含一 个 Handler 处理器（页面控制器）对象、多个 HandlerInterceptor 拦截器）对象，通过这种策略模式，很容易添加新 的映射策略；
3. **DispatcherServlet——>HandlerAdapter**，HandlerAdapter 将会把处理器包装为适配器，从而支持多种类型的处理器，即适配器设计模式的应用，从而很容易支持很多类型的处理器；
4. **HandlerAdapter——>处理器功能处理方法的调用**，HandlerAdapter 将会根据适配的结果调用真正的处理器的功能处 理方法，完成功能处理；并返回一个 ModelAndView 对象（包含模型数据、逻辑视图名）；
5. **ModelAndView 的逻辑视图名——> ViewResolver**，ViewResolver 将把逻辑视图名解析为具体的 View，通过这种策 略模式，很容易更换其他视图技术；
6. **View——>渲染**，View 会根据传进来的 Model 模型数据进行渲染，此处的 Model 实际是一个 Map 数据结构，因此 很容易支持其他视图技术；
7. **返回控制权给 DispatcherServlet**，由 DispatcherServlet 返回响应给用户，到此一个流程结束。

## 参考资料

- [Spring 基础 - SpringMVC 请求流程和案例](https://pdai.tech/md/spring/spring-x-framework-springmvc.html)
- [SpringMVC 源码分析系列 (精简)](https://juejin.cn/post/6844903577547177991)
