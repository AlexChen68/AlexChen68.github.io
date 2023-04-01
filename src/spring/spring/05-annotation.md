---
title: Spring 核心注解
article: true
date: 2022-10-12
category: Spring
isOriginal: true
description: Spring 核心注解
---

## Bean 配置注解

1. @ComponentScan

> @ComponentScan 注解用于配置 Spring 需要扫描的被组件注解注释的类所在的包。
> 
> 可以通过配置其 basePackages 属性或者 value 属性来配置需要扫描的包路径。value 属性是 basePackages 的别名。


2. @Bean

> @Bean 注解主要的作用是告知 Spring，被此注解所标注的类将需要纳入到 Bean 管理工厂中。
>
> `initMethod` 和 `destroyMethod` 属性用来配置初始化和销毁的回调方法。

3. @Scope

> @Scope 注解可以用来定义 @Component 标注的类的作用范围以及 @Bean 所标记的类的作用范围。
> 
> @Scope 所限定的作用范围有：singleton、prototype、request、session、globalSession 或者其他的自定义范围。

4. @Autowired

> `@Autowired` 注解用于标记 Spring 将要解析和注入的依赖项。此注解可以作用在构造函数、字段和 setter 方法上。

5. @Primary

> 当系统中需要配置多个具有相同类型的 Bean 时，`@Primary` 可以定义这些 Bean 的优先级。

6. @Qualifier

> 当系统中存在同一类型的多个 Bean 时，`@Autowired` 在进行依赖注入的时候就不知道该选择哪一个实现类进行注入。此时，我们可以使用@Qualifier 注解来指定实现类。

7. @Resource

> Spring 还通过在字段或 bean 属性 setter 方法上使用 JSR-250 @Resource(javax.annotation.Resource)注解来支持注入。
>
> @Resource 在没有明确指定 name 时,其行为类似于 @Autowired。

8. @value

> @Value 通常用于注入外部属性。