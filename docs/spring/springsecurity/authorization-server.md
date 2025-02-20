---
title: Spring Authorization Server
date: 2023-06-07
order: 11
---

# Spring Authorization Server 实践

## 准备工作

1. 创建一个 SpringBoot 工程，用来做授权服务器
2. 添加依赖

```xml
<!-- Spring Authorization Server -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-oauth2-authorization-server</artifactId>
</dependency>
<!-- web -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## 配置授权服务器

> TODO 待完善