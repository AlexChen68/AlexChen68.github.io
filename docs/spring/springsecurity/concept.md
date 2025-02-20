---
title: Spring Security 简介
date: 2023-11-28
order: 1
---

# Spring Security 简介

## 什么是 SpringSecurity？

Spring Security 是一个提供**身份验证**、**授权**和**针对常见攻击的保护**的框架。凭借对保护 Servlet 和 reactive 应用程序的一流支持。

开始入门 Spring Security 可以参考如下资料：

- [Spring Security 入门](./1.0-spring-security)
- [Spring Security 官方文档](https://docs.spring.io/spring-security/reference/5.7/index.html)

## OAuth2 协议支持

OAuth（Open Authorization）是一个关于授权（authorization）的开放网络标准，允许用户授权第三方应用访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方移动应用或分享他们数据的所有内容。OAuth 在全世界得到广泛应用，目前的版本是 2.0 版。了解更多可以查看 [理解 OAuth2](./oauth2.md)。

SpringSecurity 提供了一系列对 OAuth2 协议的实现，可以分为授权服务器、资源服务器和授权客户端三个角色，并提供了 SpringBoot starter 的自动配置支持。

### Spring Authorization Server

在 Spring Security 6.0 时，Spring 团队将授权服务器单独抽离出来开发，名为 `Spring Authorization Server`，其余两个仍然在 Spring Security 中。值得一提的是，Spring Authorization Server 支持授权码、客户端、刷新、注销等 OAuth 协议，但是**不支持密码模式**，需要自己实现。

相关参考资料：

- [Spring Security - OAuth2 ｜ 官网](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html)
- [Spring Security - OAuth2 ｜ 中文翻译](https://springdoc.cn/spring-security/servlet/oauth2/index.html)
- [授权服务器 - 官网](https://docs.spring.io/spring-authorization-server/reference/overview.html)
- [授权服务器 - 中文翻译](https://springdoc.cn/spring-authorization-server/overview.html)

