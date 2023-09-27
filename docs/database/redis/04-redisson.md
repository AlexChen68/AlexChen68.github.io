---
title: Redisson 客户端
date: 2023-02-19
---

## Redisson 简介

Redisson 是一个在 Redis 的基础上实现的 Java 驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的 Java 常用对象，还提供了许多分布式服务。

Redisson 的宗旨是促进使用者对 Redis 的关注分离（Separation of Concern），从而让使用者能够将精力更集中地放在处理业务逻辑上。

一个基于 Redis 实现的分布式工具，有基本分布式对象和高级又抽象的分布式服务，为每个试图再造分布式轮子的程序员带来了大部分分布式问题的解决办法。

## Redisson 和 Jedis、Lettuce 有什么区别？

Redisson 和它俩的区别就像一个用鼠标操作图形化界面，一个用命令行操作文件。Redisson 是更高层的抽象，Jedis 和 Lettuce 是 Redis 命令的封装。

- Jedis 是 Redis 官方推出的用于通过 Java 连接 Redis 客户端的一个工具包，提供了 Redis 的各种命令支持
- Lettuce 是一种可扩展的线程安全的 Redis 客户端，通讯框架基于 Netty，支持高级的 Redis 特性，比如哨兵，集群，管道，自动重新连接和 Redis 数据模型。Spring Boot 2.x 开始 Lettuce 已取代 Jedis 成为首选 Redis 的客户端。
- Redisson 是架设在 Redis 基础上，通讯基于 Netty 的综合的、新型的中间件，企业级开发中使用 Redis 的最佳范本

Jedis 把 Redis 命令封装好，Lettuce 则进一步有了更丰富的 Api，也支持集群等模式。但是两者也都点到为止，只给了你操作 Redis 数据库的脚手架，而 Redisson 则是基于 Redis、Lua 和 Netty 建立起了成熟的分布式解决方案，甚至 redis 官方都推荐的一种工具集。

## 参考资料

- [最强分布式锁工具：Redisson](https://mp.weixin.qq.com/s?__biz=MzU0OTE4MzYzMw==&mid=2247545794&idx=2&sn=88a3b1c73372006b49a43a6c133a10c3&chksm=fbb1ba3cccc6332ae1f5e609ab5e37c32fe972b7ba3a18b1a92735c5f3e7c9300e2318ca2280&scene=27)