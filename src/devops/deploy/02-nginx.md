---
title: Nginx 入门
icon: nginx
category: middleware
date: 2023-02-22
---

> 介绍 Nginx 的安装、配置，介绍部分功能的实现原理。
<!-- more -->

## Nginx 是什么？

Nginx (engine x) 是一个高性能的 HTTP 和反向代理 web 服务器，

Nginx 是一款轻量级的 Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，
并发能力强，事实上 nginx 的并发能力确实在同类型的网页服务器中表现较好，中国大陆使用 nginx 网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。

## 核心功能

1. 反向代理服务器
2. 负载均衡