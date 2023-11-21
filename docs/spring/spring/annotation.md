---
title: Spring 常用注解
date: 2022-10-12
order: 100
---

# Spring 常用核心注解

## 核心注解

### @SpringBootApplication

通常用在启动类上，申明让 spring boot 自动给程序进行必要的配置，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：

- @SpringBootConfiguration
- @EnableAutoConfiguration
- @ComponentScan

### @SpringBootConfiguration

组合了 @Configuration 注解，实现配置文件的功能。

### @EnableAutoConfiguration

打开自动配置的功能，也可以关闭某个自动配置的选项。

如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })；

### @ComponentScan

Spring 组件扫描功能，让 spring Boot 扫描到 Configuration 类并把它加入到程序上下文。

可以通过配置其 basePackages 属性或者 value 属性来配置需要扫描的包路径。value 属性是 basePackages 的别名。

## 配置注解

### @Configuration

`@Configuration` 用于定义**配置类**，被注解的类内部包含有一个或多个被@Bean 注解的方法，这些方法将会被 `AnnotationConfigApplicationContext` 或 `AnnotationConfigWebApplicationContext` 类进行扫描，并用于构建 bean 定义，初始化 Spring 容器。

### @Bean

@Bean 注解主要的作用是告知 Spring，被此注解所标注的类将需要纳入到 Bean 管理工厂中。

`initMethod` 和 `destroyMethod` 属性用来配置初始化和销毁的回调方法。

### @Scope

@Scope 注解可以用来定义 @Component 标注的类的作用范围以及 @Bean 所标记的类的作用范围。

@Scope 所限定的作用范围有：singleton、prototype、request、session、globalSession 或者其他的自定义范围。

### @Import

用来导入其他配置类。

### @ImportResource

用来加载 xml 配置文件。

### @Autowired

自动导入依赖的 bean，自动导入依赖的 bean。byType 方式。把配置好的 Bean 拿来用，完成属性、方法的组装，它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。当加上（required=false）时，就算找不到 bean 也不报错。

### @Resource(name="name",type="type")

Spring 还通过在字段或 bean 属性 setter 方法上使用 JSR-250 @Resource(javax.annotation.Resource) 注解来支持注入。

@Resource 在没有明确指定 name 时，其行为类似于 @Autowired。

### @Inject

等价于默认的@Autowired，只是没有 required 属性。

### @Autowired

`@Autowired` 注解用于标记 Spring 将要解析和注入的依赖项。此注解可以作用在构造函数、字段和 setter 方法上。

### @Primary

当系统中需要配置多个具有相同类型的 Bean 时，`@Primary` 可以定义这些 Bean 的优先级。

### @Qualifier

当系统中存在同一类型的多个 Bean 时，`@Autowired` 在进行依赖注入的时候就不知道该选择哪一个实现类进行注入。此时，我们可以使用@Qualifier 注解来指定实现类。

### @value

@Value 通常用于注入外部属性。

### @Profiles

Spring Profiles 提供了一种隔离应用程序配置的方式，并让这些配置只能在特定的环境下生效。任何@Component 或@Configuration 都能被@Profile 标记，从而限制加载它的时机。

### @ConfigurationProperties

将外部配置的属性，绑定到当前 Bean 中，通常用于从 `application.yml` 等配置文件中加载自定义配置。

## 业务注解

### @Component

泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。

### @Controller

用于定义控制器类，在 spring 项目中由控制器负责将用户发来的 URL 请求转发到对应的服务接口（service 层），一般这个注解在类中，通常方法需要配合注解@RequestMapping；

### @ResponseBody

表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用，用于构建 RESTful 的 api。

在使用@RequestMapping 后，返回值通常解析为跳转路径，加上@esponsebody 后返回结果不会被解析为跳转路径，而是直接写入 HTTP response body 中。

比如异步获取 json 数据，加上@Responsebody 后，会直接返回 json 数据。该注解一般会配合@RequestMapping 一起使用；

### @RequestMapping

提供路由信息，负责 URL 到 Controller 中的具体函数的映射；

该注解包含以下 6 个属性：（常用 value）

- params：指定 request 中必须包含某些参数值是，才让该方法处理；
- headers：指定 request 中必须包含某些指定的 header 值，才能让该方法处理请求；
- value：指定请求的实际地址，指定的地址可以是 URI Template 模式；
- method：指定请求的 method 类型，GET、POST、PUT、DELETE 等；
- consumes：指定处理请求的提交内容类型（Content-Type），如 application/json,text/html；
- produces：指定返回的内容类型，仅当 request 请求头中的 (Accept) 类型中包含该指定类型才返回。

### @RestController

用于标注控制层组件 (如 struts 中的 action)，是@ResponseBody 和@Controller 的合集。

### @Service

一般用于修饰 service 层的组件。

### @Repository

用于标注数据访问组件，即 DAO 组件。

### @PathVariable

路径变量，参数与大括号里的名字一样要相同。