---
title: SpringBoot Starter 启动器
date: 2022-09-15
tag: [Springboot-Starter]
category: [Springboot]
isOriginal: true
description: SpringBoot Starter 启动器
---

SpringBoot Starter 启动器
<!-- more -->

## SpringBoot Starter 简介

### 什么是SpringBoot Starter？

Starter 是 Spring Boot 中的一个非常重要的概念，Starter 相当于模块，它能将模块所需的依赖整合起来并对模块内的 Bean 根据环境（ 条件）进行自动配置。

**使用者只需要依赖相应功能的 Starter，无需做过多的配置和依赖，Spring Boot 就能自动扫描并加载相应的模块并设置默认值，做到开箱即用。**

### SpringBoot 自动装配

SpringBoot 中的 starter 是一种非常重要的机制，能够抛弃以前繁杂的配置，将其统一集成进 starter，应用者只需要在 maven 中引入 starter 依赖，Spring Boot 就能自动扫描各个 jar 包下 classpath 路径的 `spring.factories` 文件，加载自动配置类信息，加载相应的 bean 信息并启动相应的`默认配置`。

Spring Boot 提供了针对日常企业应用研发各种场景的 spring-boot-starter 依赖模块。所有这些依赖模块都遵循着约定成俗的默认配置，并允许我们调整这些配置，即遵循 “`约定大于配置`” 的理念。

## 自定义 SpringBoot Starter

### 为什么要自定义 Starter？

**痛点**：日常开发中一些独立于业务之外的通用模块，如果多个工程需要复用的时候，需要将代码硬拷贝到另一个工程并重新集成一遍，麻烦至极。

**解决方案**：把这些功能模块封装成自定义的 starter，复用的时候只需要将其在 pom 中引用依赖即可，再由 SpringBoot 为我们完成自动装配。

**应用场景**：动态数据源、登录模块、基于 AOP 技术实现日志切面...

### Starter 的命名规则

**SpringBoot 官方提供的 starter**：以 `spring-boot-starter-XXX` 的方式命名的。

**自定义的 starter**：以 `XXX-spring-boot-starter` 命名规则。【为了区分 SpringBoot 生态提供的 starter】

### 如何自定义 SpringBoot Starter？

1. 新建 Maven 工程

2. 添加包含 `@Configuration`的配置类

3. 在 `resources` 目录下，添加 `META-INF` 文件夹，在其中增加 `spring.factories` 文件，用于需要自动加载的配置类全限定类名，例如：

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
     tech.alexchen.starter.swagger.SwaggerConfiguration
```

4. 在 SpringBoot3.x 中，将移除 `3.` 介绍的配置方式，这里介绍另一个方式：可以通过在自定义注解中，使用 `@Import` 导入需要装配的类；这样只需要在引入该 `Starter` 的工程配置类中，使用该注解即可自动装配该 `Starter` 的配置，例如：

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import({ SwaggerConfiguration.class })
public @interface EnableCommonSwagger {
}
```

