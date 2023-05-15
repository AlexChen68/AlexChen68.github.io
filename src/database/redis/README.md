---
title: Redis 简介
date: 2022-09-30
description: Redis
---

## Redis 是什么？

Redis 是一个使用 ANSI C 编写的开源、支持网络、基于内存、可选持久性的键值对存储数据库。

从 2015 年 6 月开始，Redis 的开发由 Redis Labs 赞助，而 2013 年 5 月至 2015 年 6 月期间，其开发由 Pivotal 赞助。在 2013 年 5 月之前，其开发由 VMware 赞助。根据月度排行网站 DB-Engines.com 的数据，Redis 是最流行的键值对存储数据库。

## 支持语言

许多语言都包含 Redis 支持，包括：

| - ActionScript | - Common Lisp | - Haxe    | - Objective-C | - R         |
| -------------- | ------------- | --------- | ------------- | ----------- |
| - C            | - Dart        | - Io      | - Perl        | - Ruby      |
| - C++          | - Erlang      | - Java    | - PHP         | - Scala     |
| - C#           | - Go          | - Fibjs   | - Pure Data   | - Smalltalk |
| - Clojure      | - Haskell     | - Node.js | - Python      | - Tcl       |
| - Lua          |               |           |               |             |

## 数据模型

Redis 的外围由一个键、值映射的字典构成。与其他非关系型数据库主要不同在于：Redis 中值的类型不仅限于字符串，还支持如下抽象数据类型：

- 字符串列表
- 无序不重复的字符串集合
- 有序不重复的字符串集合
- 键、值都为字符串的哈希表

值的类型决定了值本身支持的操作。Redis 支持不同无序、有序的列表，无序、有序的集合间的交集、并集等高级服务器端原子操作。

## 持久化

Redis 通常将全部的数据存储在内存中。2.4 版本后可配置为使用虚拟内存，一部分数据集存储在硬盘上，但这个特性废弃了。

目前通过两种方式实现持久化：

- 使用快照，一种半持久耐用模式。不时的将数据集以异步方式从内存以 RDB 格式写入硬盘。
- 1.1 版本开始使用更安全的 AOF 格式替代，一种只能追加的日志类型。将数据集修改操作记录起来。Redis 能够在后台对只可追加的记录作修改来避免无限增长的日志。

## 同步

Redis 支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得 Redis 可执行单层树复制。从盘可以有意无意的对数据进行写操作。由于完全实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。同步对读取操作的可扩展性和数据冗余很有帮助。

## 性能

当数据依赖不再需要，Redis 这种基于内存的性质，与在执行一个事务时将每个变化都写入硬盘的数据库系统相比就显得执行效率非常高。写与读操作速度没有明显差别。

## 外部链接

- [Redis 项目官网](http://redis.io/)（英文）
- [对 Salvatore Sanfillipo 的播客采访](https://web.archive.org/web/20110221132131/http://thechangelog.com/post/2801342864/episode-0-4-5-redis-with-salvatore-sanfilippo)（英文）
- [由 Simon Willison 讲解的 Redis 真实应用场景教程](https://web.archive.org/web/20121225104309/http://simonwillison.net/static/2010/redis-tutorial/)（英文）