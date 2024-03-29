---
title: Redis 数据类型
date: 2023-02-12
order: 101
---

# Redis 数据类型

## 数据类型

Redis 所有的 key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的 5 种数据类型，分别是：

- **String**
- **List**
- **Set**
- **Zset**
- **Hash**

此外，还有三种特殊的数据类型，分别是 **HyperLogLogs**（基数统计）， **Bitmaps** (位图) 和 **geospatial** （地理位置）。

Redis5.0 中还增加了一个数据类型 Stream，它借鉴了 Kafka 的设计，是一个新的强大的支持多播的可持久化的消息队列

### String

Redis 字符串存储字节序列，包括文本、序列化对象和二进制数组。

因此，字符串是最基本的 Redis 数据类型。

它们通常用于缓存，但它们支持额外的功能，也可以实现计数器并执行按位操作。

默认情况下，单个 Redis 字符串最大为 512 MB。

**基本命令：**

- [`SET`](https://redis.io/commands/set) 存储字符串值。
- 仅当字符串值尚不存在时，[`SETNX`](https://redis.io/commands/setnx) 才会存储该值。对于实现锁很有用。
- [`GET`](https://redis.io/commands/get) 检索字符串值。
- [`MGET`](https://redis.io/commands/mget) 在单个操作中检索多个字符串值。
- [`INCRBY`](https://redis.io/commands/incrby)以原子方式递增（并在传递负数时递减）存储在给定键上的计数器。

官方文档：[Redis Strings | Redis](https://redis.io/docs/data-types/strings/)

String 完整命令列表：[Commands | Redis](https://redis.io/commands/?group=string)

### List

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

一个列表最多可以包含 2^32 - 1 个元素 (4294967295, 每个列表超过 40 亿个元素)。

**基本命令：**

- [`LPUSH`](https://redis.io/commands/lpush) 在列表的头部添加一个新元素;[`RPUSH`](https://redis.io/commands/rpush)添加到尾部。
- [`LPOP`](https://redis.io/commands/lpop) 从列表的头部删除并返回一个元素;[`RPOP`](https://redis.io/commands/rpop) 执行相同的操作，但从列表的尾部。
- [`LLEN`](https://redis.io/commands/llen) 返回列表的长度。
- [`LMOVE`](https://redis.io/commands/lmove) 以原子方式将元素从一个列表移动到另一个列表。
- [`LTRIM`](https://redis.io/commands/ltrim) 将列表缩减到指定的元素范围。
- [`BLPOP`](https://redis.io/commands/blpop) 从列表的头部删除并返回一个元素。如果列表为空，则该命令将一直阻止，直到元素可用或达到指定的超时。
- [`BLMOVE`](https://redis.io/commands/blmove) 以原子方式将元素从源列表移动到目标列表。如果源列表为空，则该命令将阻塞，直到新元素可用。

官方文档：[Redis lists | Redis](https://redis.io/docs/data-types/lists/)

List 完整命令列表：[Commands | Redis](https://redis.io/commands/?group=list)

### Set

Redis Set 是唯一字符串（成员）的无序集合。您可以使用 Redis 集有效地：

- 跟踪唯一项目（例如，跟踪访问给定博客文章的所有唯一 IP 地址）。
- 表示关系（例如，具有给定角色的所有用户的集合）。
- 执行常见的集合操作，例如交集、并集和差分。

**基本命令：**

- [`SADD`](https://redis.io/commands/sadd) 将新成员添加到集合中。
- [`SREM`](https://redis.io/commands/srem)从集合中删除指定的成员。
- [`SISMEMBER`](https://redis.io/commands/sismember)测试字符串的集合成员资格。
- [`SINTER`](https://redis.io/commands/sinter) 返回两个或多个集合共有的成员集（即交集）。
- [`SCARD`](https://redis.io/commands/scard) 返回集合的大小（也称为基数）。

官方文档：[Redis sets | Redis](https://redis.io/docs/data-types/sets/)

Set 完整命令列表：[Commands | Redis](https://redis.io/commands/?group=set)

### Sorted Set

Redis sorted set 和 set 一样也是 string 类型元素的集合，且不允许重复的成员。

不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。

有序集合的成员是唯一的，但分数 (score) 却可以重复。

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储 40 多亿个成员)。

Redis sorted set(排序集) 是按关联分数排序的唯一字符串（成员）的集合。当多个字符串具有相同的分数时，字符串按字典顺序排列。排序集的一些用例包括：

- 排行榜。例如，您可以使用排序集轻松维护大型在线游戏中最高分的有序列表。
- 速率限制器。特别是，您可以使用排序集来构建滑动窗口速率限制器，以防止过多的 API 请求。

**基本命令：**

- [`ZADD`](https://redis.io/commands/zadd)将新成员和关联的分数添加到已排序的集合中。如果该成员已经存在，则更新分数。
- [`ZRANGE`](https://redis.io/commands/zrange)返回在给定范围内排序的有序集合的成员。
- [`ZRANK`](https://redis.io/commands/zrank)返回所提供成员的排名，假设排序是按升序排列。
- [`ZREVRANK`](https://redis.io/commands/zrevrank)返回所提供成员的排名，假设排序集按降序排列。

官方文档：[Redis sorted sets | Redis](https://redis.io/docs/data-types/sorted-sets/#)

Zset 完整命令列表：[Commands | Redis](https://redis.io/commands/?group=sorted-set)


### Hash

Redis hash 是一个 string 类型的 field（字段）和 value（值）的映射表，hash 特别适合用于存储对象。

Redis 中每个 hash 可以存储 232 - 1 键值对（40 多亿）。

**基本命令：**

- [`HSET`](https://redis.io/commands/hset) 在哈希上设置一个或多个字段的值。
- [`HGET`](https://redis.io/commands/hget) 返回给定字段的值。
- [`HMGET`](https://redis.io/commands/hmget) 返回一个或多个给定字段的值。
- [`HINCRBY`](https://redis.io/commands/hincrby) 将给定字段的值按提供的整数递增。

官方文档：[Redis hashes | Redis](https://redis.io/docs/data-types/hashes/)

Hash 完整命令列表：[Commands | Redis](https://redis.io/commands/?group=hash)

## 参考资料

- [Redis 官方文档](https://redis.io/docs/)
- [Redis 教程｜菜鸟教程](https://www.runoob.com/redis/redis-tutorial.html)