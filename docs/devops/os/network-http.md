---
title: HTTP 和 HTTPS
date: 2023-05-19
order: 21
---

# HTTP 和 HTTPS

## HTTP 协议

### HTTP 协议简介

HTTP 协议，全称超文本传输协议（Hypertext Transfer Protocol）。

顾名思义，HTTP 协议就是用来规范超文本的传输，超文本，也就是网络上的包括文本在内的各式各样的消息，具体来说，主要是来规范浏览器和服务器端的行为的。

并且，HTTP 是一个无状态（stateless）协议，也就是说服务器不维护任何有关客户端过去所发请求的消息。这其实是一种懒政，有状态协议会更加复杂，需要维护状态（历史信息），而且如果客户或服务器失效，会产生状态的不一致，解决这种不一致的代价更高。

:::tip 优点：
扩展性强、速度快、跨平台支持性好。
:::

### HTTP 协议通信过程

HTTP 是应用层协议，它以 TCP（传输层）作为底层协议，默认端口为 `80`,通信过程主要如下：

1.  服务器在 80 端口等待客户的请求。
2.  浏览器发起到服务器的 TCP 连接（创建套接字 Socket）。
3.  服务器接收来自浏览器的 TCP 连接。
4.  浏览器（HTTP 客户端）与 Web 服务器（HTTP 服务器）交换 HTTP 消息。
5.  关闭 TCP 连接。

## HTTPS 协议

### HTTPS 协议简介

HTTPS 协议（Hyper Text Transfer Protocol Secure），是 HTTP 的加强安全版本。

HTTPS 是基于 HTTP 的，也是用 TCP 作为底层协议，并额外使用 `SSL/TLS 协议` 用作加密和安全认证。默认端口号是 `443`。

HTTPS 协议中，SSL 通道通常使用基于密钥的加密算法，密钥长度通常是 40 比特或 128 比特。

:::tip 优点：
保密性好、信任度高。
:::

> bilibili 上面有一个非常不错讲解 Https 的视频： [https 技术鉴赏](https://www.bilibili.com/video/BV1uY4y1D7Ng)