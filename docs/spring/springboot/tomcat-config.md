---
title: SpringBoot Tomcat 配置
date: 2023-05-16
order: 21
---

# SpringBoot Tomcat 配置

## 前言

> SpringBoot 可以同时处理多少请求？

我们都知道，SpringBoot 默认的内嵌容器是 Tomcat，也就是我们的程序实际上是运行在 Tomcat 里的。

所以与其说 SpringBoot 可以处理多少请求，到不如说 Tomcat 可以处理多少请求。

## Tomcat 配置

关于 Tomcat 的默认配置，都在`spring-configuration-metadata.json`文件中，对应的配置类则是`org.springframework.boot.autoconfigure.web.ServerProperties`。

和处理请求数量相关的参数有四个：

- `server.tomcat.threads.min-spare`：最少的工作线程数，默认大小是 10。该参数相当于长期工，如果并发请求的数量达不到 10，就会依次使用这几个线程去处理请求。

- `server.tomcat.threads.max`：最大工作线程数，默认大小是 200。该参数相当于临时工，如果并发请求的数量在 10 到 200 之间，就会使用这些临时工线程进行处理。==（建议这个配置数可以在服务器 CUP 核心数的 200~250 倍之间）==

- `server.tomcat.max-connections`：最大连接数，默认大小是 8192。表示 Tomcat 可以处理的最大请求数量，超过 8192 的请求就会被放入到等待队列。

- `server.tomcat.accept-count`：等待队列的长度，默认大小是 100。

也就是说，SpringBoot 同时所能处理的最大请求数量是`max-connections+accept-count`，超过该数量的请求直接就会被丢掉。

## SpringBoot 配置 tomcat

在 spring boot 配置文件中 application.yml，添加以下配置：

```json
# Tomcat
server:
  tomcat:
    uri-encoding: UTF-8
    #最小线程数
    min-spare-threads: 500
    #最大线程数
    max-threads: 2500
    #最大链接数
    max-connections: 6500
    #最大等待队列长度
    accept-count: 1000
    #请求头最大长度kb
    max-http-header-size: 1048576
    #请请求体最大长度kb
    #max-http-post-size: 2097152
  #链接建立超时时间
  connection-timeout: 12000
```
