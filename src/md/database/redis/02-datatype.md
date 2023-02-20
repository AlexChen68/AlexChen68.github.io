---
title: Redis 数据类型
category: Redis
date: 2023-02-12
description: Redis 数据类型
---

## Redis 数据类型

Redis所有的key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的5种数据类型，分别是：**String**、**List**、**Set**、**Zset**、**Hash**。

此外，还有三种特殊的数据类型，分别是 **HyperLogLogs**（基数统计）， **Bitmaps** (位图) 和 **geospatial** （地理位置）。

Redis5.0 中还增加了一个数据类型Stream，它借鉴了Kafka的设计，是一个新的强大的支持多播的可持久化的消息队列

### 字符串

Redis 字符串存储字节序列，包括文本、序列化对象和二进制数组。

因此，字符串是最基本的 Redis 数据类型。

它们通常用于缓存，但它们支持额外的功能，也可以实现计数器并执行按位操作。

默认情况下，单个 Redis 字符串最大为 512 MB。

#### 获取和设置字符串

- [`SET`](https://redis.io/commands/set)存储一个字符串值。
- [`SETNX`](https://redis.io/commands/setnx)仅当键不存在时才存储字符串值。用于实现锁。
- [`GET`](https://redis.io/commands/get)检索字符串值。
- [`MGET`](https://redis.io/commands/mget)在单个操作中检索多个字符串值。

#### 管理计数器

- [`INCRBY`](https://redis.io/commands/incrby)以原子方式递增（并在传递负数时递减）存储在给定键处的计数器。
- 浮点计数器存在另一个命令：[INCRBYFLOAT](https://redis.io/commands/incrbyfloat)。

#### 位运算

要对字符串执行按位运算，请参阅[位图数据类型](https://redis.io/docs/data-types/bitmaps)文档。

## 参考资料

[Redis官方文档](https://redis.io/docs/)
[Redis教程｜菜鸟教程](https://www.runoob.com/redis/redis-tutorial.html)