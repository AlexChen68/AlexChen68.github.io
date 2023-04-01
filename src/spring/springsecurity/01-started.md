---
title: Spring Security 入门
category: Spring Security
date: 2023-02-14
description: Spring Security 入门
---

## Spring Security 项目模块

Spring security 各模块说明可以参考[官方文档](https://docs.spring.io/spring-security/reference/5.7/modules.html)，以实际使用版本对应文档为准。

## Mavne 依赖

1. 仅使用 Spring Security

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

2. 使用 Spring Security OAuth2

```xml
<dependency>
    <groupId>org.springframework.security.oauth.boot</groupId>
    <artifactId>spring-security-oauth2-autoconfigure</artifactId>
</dependency>
```

:::tip
版本号一般按 SpringBoot 或 SpringCloud 自动适配
:::

## 基本配置介绍

### 核心配置类

**SpringSecurity核心配置-WebSecurityConfigurerAdapter**

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

}
```

**授权服务器核心配置-AuthorizationServerConfig**

```java
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

}
```

### 密码编码器配置

Spring Security 提供了多种密码编码器 `PasswordEncoder` ，默认使用 `BCryptPasswordEncoder`；

可以通过在 Spring 中注入 Bean 配置需要的密码编码器。

```java
@Bean
  public PasswordEncoder passwordEncoder() {
      // 使用 BCrypt 加密密码
      return new BCryptPasswordEncoder();
  }
```

更多密码编码器可以参考[官方文档](https://docs.spring.io/spring-security/reference/5.7/features/authentication/password-storage.html)，以实际使用版本对应文档为准。
