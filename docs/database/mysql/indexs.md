---
title: Mysql 索引
date: 2023-05-28
order: 3
---

# Mysql 索引

本文将会从以下几个方面来讲述索引的相关知识：

- 什么是索引，索引的作用
- 索引的种类
- 高性能索引策略
- 索引设计准则：三星索引

<!-- more -->

## 前言

生产上为了高效地查询数据库中的数据，我们常常会给表中的字段添加索引，大家是否有考虑过如何添加索引才能使索引更高效，考虑如下问题：

- 添加的索引是越多越好吗
- 为啥有时候明明添加了索引却不生效
- 索引有哪些类型
- 如何评判一个索引设计的好坏

## 什么是索引，索引的作用

> 在关系数据库中，**索引**是一种单独的、物理的对数据库表中一列或多列的值进行排序的一种存储结构，它是某个表中一列或若干列值的集合和相应的指向表中物理标识这些值的数据页的逻辑指针清单。

**索引主要有以下几个作用：**

- 索引可以定位到要读取的页，大大减少了需要扫描的行数，能极大的提升效率
- 索引可以帮助服务器避免排序和临时表
- 索引可以将随机 IO 变成顺序 IO

### 快速定位数据页

这个很好理解，索引的作用相当于图书的目录，可以根据目录中的页码快速找到所需的内容。

如果没有索引，那么我们需要扫码全表的数据进行匹配；而加了索引之后，可以通过索引找到数据存储的页，大大减少查询时间。

### 避免排序和临时表

假设我们不用索引，试想运行如下语句

```sql
SELECT * FROM user order by age desc;
```

则 MySQL 的流程是这样的，扫描所有行，把所有行加载到内存后，再按 age 排序生成一张临时表，再把这表排序后将相应行返回给客户端，更糟的，如果这张临时表的大小大于 tmp_table_size 的值（默认为 16 M），内存临时表会转为磁盘临时表，性能会更差;

如果加了索引，索引本身是有序的，所以从磁盘读的行数本身就是按 age 排序好的，也就不会生成临时表，就不用再额外排序，无疑提升了性能。

### 随机 IO 变成顺序 IO

相信不少人应该吃过旋转火锅，服务员把一盘盘的菜放在旋转传输带上，然后等到这些菜转到我们面前，我们就可以拿到菜了，假设装一圈需要 4 分钟，则最短等待时间是 0（即菜就在你跟前），最长等待时间是 4 分钟（菜刚好在你跟前错过），那么平均等待时间即为 2 分钟，假设我们现在要拿四盘菜，这四盘菜随机分配在传输带上，则可知拿到这四盘菜的平均等待时间是 8 分钟（随机 IO），如果这四盘菜刚好紧邻着排在一起，则等待时间只需 2 分钟（顺序 IO）。

上述中传输带就类比磁道，磁道上的菜就类比扇区（sector）中的信息，磁盘块（block）是由多个相邻的扇区组成的，是操作系统读取的最小单元，这样如果信息能以 block 的形式聚集在一起，就能极大减少磁盘 IO 时间，这就是顺序 IO 带来的性能提升，下文中我们将会看到 B+ 树索引就起到这样的作用。

而如果信息在一个磁道中分散地分布在各个扇区中，或者分布在不同磁道的扇区上（寻道时间是随机 IO 主要瓶颈所在），将会造成随机 IO，影响性能。

## 索引的种类和概念

索引从存储结构上来分主要分为以下几类：

- B+ 树索引
- 哈希索引
- 全文索引 (不常用)
- 空间数据索引 (不常用)

从应用层次来分：普通索引，唯一索引，复合索引。

- 普通索引：即一个索引只包含单个列，一个表可以有多个单列索引
- 唯一索引：索引列的值必须唯一，但允许有空值
- 复合索引：多列值组成一个索引，专门用于组合搜索，其效率大于索引合并

### B+ 树索引

**B-Tree** 指的是 Balance Tree，也就是平衡树。平衡树是一颗查找树，并且所有叶子节点位于同一层。

B-Tree 能加快数据的访问速度，因为存储引擎不再需要进行全表扫描来获取数据，数据分布在各个节点之中。

![b-tree.png](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/database/b-tree.png)

**B+Tree** 是在 B-Tree 的基础上进行改进的一种数据结构，同时也是数据库索引索引所采用的存储结构。

在 B-Tree 中，你可以将键和值存放在内部节点和叶子节点；但在 B+Tree 中，数据都在叶子节点上，并且增加了顺序访问指针，每个叶子节点都指向相邻的叶子节点的地址。

相比 B-Tree 来说，进行范围查找时只需要查找两个节点，进行遍历即可。而 B-Tree 需要获取所有节点，相比之下 B+Tree 效率更高。

![b+tree.png](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/database/b+tree.png)

:::tip
为什么使用 B+Tree，而不是 B-Tree

- B+ 树的磁盘读写代价更低：B+ 树的内部节点并没有指向关键字具体信息的指针，因此其内部节点相对 B 树更小，如果把所有同一内部节点的关键字存放在同一盘块中，那么盘块所能容纳的关键字数量也越多，一次性读入内存的需要查找的关键字也就越多，相对 IO 读写次数就降低了。

- 由于 B+ 树的数据都存储在叶子结点中，分支结点均为索引，方便扫库，只需要扫一遍叶子结点即可，但是 B 树因为其分支结点同样存储着数据，我们要找到具体的数据，需要进行一次中序遍历按序来扫，所以 B+ 树更加适合在区间查询的情况，所以通常 B+ 树用于数据库索引。
:::

### 哈希索引

基于哈希表实现，只有精确匹配索引所有列的查询才有效，对于每一行数据，存储引擎都会对所有的索引列计算一个哈希码（hash code），并且 Hash 索引将所有的哈希码存储在索引中，同时在索引表中保存指向每个数据行的指针。

![hash_index.png](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/blog/database/hash_index.png)

### 覆盖索引

覆盖索引是指 select 的数据列只用从索引中就能够取得，不必读取数据行，换句话说查询列要被所建的索引覆盖。

### 主键索引和二级索引（辅助索引）

**主键索引**是 InnoDB 存储引擎默认给我们创建的一套索引结构，我们表里的数据也是直接放在主键索引里，作为叶子节点的数据页。

但我们在开发的过程中，往往会根据业务需要在不同的字段上建立索引，这些索引就是**二级索引**，也叫**辅助索引**，而且是**非聚集索引**。

:::tip
主键索引 == 聚集索引 == 聚簇索引。

普通索引 == 非聚集索引 == 辅助索引 == 二级索引。(o_o... ...)
:::

### 聚簇索引与非聚簇索引

根据中数据的物理顺序与键值的逻辑（索引）顺序关系：聚簇索引，非聚簇索引
- 聚簇索引 (聚集索引)：并不是一种单独的索引类型，而是一种数据存储方式。具体细节取决于不同的实现，InnoDB 的聚簇索引其实就是在同一个结构中保存了 B Tree 索引 (技术上来说是 B+ Tree ) 和数据行。
- 非聚簇索引：不是聚簇索引，就是非聚簇索引

聚簇索引与非聚簇索引的区别：

- 非聚集索引与聚集索引的区别在于非聚集索引的叶子节点不存储表中的数据，而是存储该列对应的主键（行号）;聚集索引会存储一行完整的数据。
- 对于 InnoDB 来说，想要查找数据我们还需要根据主键再去聚集索引中进行查找，这个再根据聚集索引查找数据的过程，我们称为回表。第一次索引一般是顺序 IO，回表的操作属于随机 IO。需要回表的次数越多，即随机 IO 次数越多，我们就越倾向于使用全表扫描。
- 通常情况下，主键索引（聚簇索引）查询只会查一次，而非主键索引（非聚簇索引）需要回表查询多次。当然，如果是覆盖索引的话，查一次即可。
- 注意：MyISAM 无论主键索引还是二级索引都是非聚簇索引，而 InnoDB 的主键索引是聚簇索引，二级索引是非聚簇索引。我们自己建的索引基本都是非聚簇索引。

可以参考这篇文章：[什么是 MySQL 的“回表”？](https://zhuanlan.zhihu.com/p/512662526)

## 索引操作

### 索引创建方式

mysql 中创建索引有两种方式：

1. 在创建表的时候创建索引；
2. 在表创建完成后，通过 `CREATE INDEX` 语法创建索引。

使用 `CREATE INDEX` 创建索引的语法：

```sql
CREATE [UNIQUE | FULLTEXT | SPATIAL] INDEX index_name
    [index_type]
    ON tbl_name (key_part,...)
    [index_option]
    [algorithm_option | lock_option] ...

key_part: {col_name [(length)] | (expr)} [ASC | DESC]

index_option:
    KEY_BLOCK_SIZE [=] value
  | index_type
  | WITH PARSER parser_name
  | COMMENT 'string'
  | {VISIBLE | INVISIBLE}

index_type:
    USING {BTREE | HASH}

algorithm_option:
    ALGORITHM [=] {DEFAULT | INPLACE | COPY}

lock_option:
    LOCK [=] {DEFAULT | NONE | SHARED | EXCLUSIVE}
```

可参考 [Mysql8 官方文档](https://dev.mysql.com/doc/refman/8.0/en/create-index.html) 或者 [第三方中文版](https://www.lanmper.cn/mysql/t7798)

### 主键索引

主键索引可以通过两种方式创建的示例如下：

- 通过在字段后面添加 `primary key` 关键字指定为主键

```sql
CREATE TABLE test (
    id bigint not null comment 'id' primary key,
    name varchar(20) not null comment '名称'
)
```

- 或者在字段命名最后，通过 `primary key (column_name)` 指定主键字段

```sql
CREATE TABLE test (
    id bigint not null comment 'id',
    name varchar(20) not null comment '名称',
    primary key (id)
)
```

### 唯一索引

唯一索引的列值不可以重复；唯一索引通过 `UNIQUE INDEX` 关键字标识，可以在建表时创建后建表后单独创建

::: tabs

@tab 建表时创建索引

```sql
CREATE TABLE test (
    id bigint not null comment 'id',
    name varchar(20) not null comment '名称',
    UNIQUE INDEX uniq_name (name) comment '名称唯一索引'
);
```

也可以使用 `constraint` 关键字：

```sql
create table test
(
    id   bigint      not null comment 'id',
    name varchar(20) not null comment '名称',
    constraint uniq_name
        unique (name) comment '名称唯一索引'
);
```

@tab 单独创建

```sql
CREATE TABLE test (
    id bigint not null comment 'id',
    name varchar(20) not null comment '名称'
);

CREATE UNIQUE INDEX uniq_name on test (name) comment '名称唯一索引';
```

或者使用 `ALTER TABLE` 语法添加唯一索引

```sql
CREATE TABLE test
(
    id   bigint      not null comment 'id',
    name varchar(20) not null comment '名称'
);

ALTER TABLE test
    add UNIQUE INDEX uniq_name (name) comment '名称唯一索引';
```

:::

### 普通索引和复合索引

如果我们对列的唯一性没有要求，那么创建普通索引就行，区别就是少了 `UNIQUE` 关键字；

另外，如果 where 条件中使用到多个字段，并且需要对多个字段建立索引，此时就可以考虑采用复合索引（在括号同时填入多个字段名称即可）。

组合索引有啥优势呢？

- 减少查询开销：建立复合索引（c1,c2,c3），实际上相当于建立了（c1）,（c1,c2）,（c1,c2,c3）三个索引。对于大表来说，可以极大减少开销。
- 覆盖索引：MySQL 可以直接通过遍历索引取得数据，而无需回表，减少了很多的随机 io 操作。
- 效率高：索引列越多，通过索引筛选出来的数据就越少，从而提升查询效率。

缺点：

- 索引字段越多，创建的索引越多，每个索引都会增加磁盘空间的开销；
- 索引越多对查询效率提升越高，但对需要更新索引的增删改操作会有效率影响；

:::tip 复合索引使用建议
单表最好不要超过 1 个复合索引，单个复合索引最好不超过 3 个字段。一旦超过，就需要考虑必要性和是否有其他替代方案。
:::

复合索引的创建：

::: tabs

@tab 建表时创建索引

```sql
create table test
(
    id    bigint      not null comment 'id',
    name  varchar(20) not null comment '名称',
    email varchar(32) not null comment '邮箱',
    phone varchar(20) not null comment '手机号码',
    INDEX comp (name, email, phone) comment '复合索引'
);
```

@tab 单独创建

```sql
create table test
(
    id    bigint      not null comment 'id',
    name  varchar(20) not null comment '名称',
    email varchar(32) not null comment '邮箱',
    phone varchar(20) not null comment '手机号码'
);

create index comp
    on test (name, email, phone)
    comment '复合索引';
```

或者使用 `ALTER TABLE`

```sql
create table test
(
    id    bigint      not null comment 'id',
    name  varchar(20) not null comment '名称',
    email varchar(32) not null comment '邮箱',
    phone varchar(20) not null comment '手机号码'
);
ALTER table test
    add INDEX comp (name, email, phone) comment '复合索引';
```
:::

## 索引使用注意事项

同的索引设计选择能对性能产生很大的影响，有人可能会发现生产中明明加了索引却不生效，有时候加了虽然生效但对搜索性能并没有提升多少，对于多列联合索引，哪列在前，哪列在后也是有讲究的，我们一起来看看。

### 索引失效

索引失效有以下几种可能：

1. 在进行查询时，索引列不能是表达式的一部分，也不能是函数的参数，否则无法使用索引。

反例：
```sql
SELECT book_id FROM BOOK WHERE book_id + 1 = 5;
// 或者
SELECT book_id FROM BOOK WHERE TO_DAYS(CURRENT_DATE) - TO_DAYS(gmt_create) <= 10
```

2. 隐式类型转换

反例：

```sql
SELECT * FROM tradelog WHERE tradeid=110717;
```

在表结构中，tradid 为字符串类型，但是查询条件是 int 值，发生了隐形转换，会隐式地将字符串转成整型，如下：

```sql
SELECT * FROM tradelog WHERE CAST(tradid AS signed int) = 110717;
```

这样也是发生了函数转换，不会走索引。

3. 隐式编码转换

两个表联结时，联结的字段在两个表中的编码不一样，就会通过 `CONVERT()` 函数自动转换，同样使用了函数，不会走索引。

4. 非聚簇索引的回表查询太慢导致使用全表扫描

```sql
SELECT * FROM user ORDER BY age DESC
```

age 虽然添加了索引，但是依然造成了全表扫描，这是因为我们使用了 `SELECT *`，导致回表查询，MySQL 认为回表的代价比全表扫描更大，所以不选择使用索引，如果想使用到 age 的索引，我们可以用**覆盖索引**来代替：

```sql
SELECT age FROM user ORDER BY age DESC
```

或者加上 limit 的条件（数据比较小，回表查询很快）

```sql
SELECT * FROM user ORDER BY age DESC limit 10
```

### 必须用函数时怎么使用索引

可以通过将函数修改为多个普通条件拼接。例如：

```sql
SELECT count(*) FROM tradelog WHERE month(t_modified)=7;
```

可以修改为：

```sql

SELECT count(*) FROM tradelog WHERE
    (t_modified >= '2016-7-1' AND t_modified<'2016-8-1') or
    (t_modified >= '2017-7-1' AND t_modified<'2017-8-1') or 
    (t_modified >= '2018-7-1' AND t_modified<'2018-8-1');
```

### 前缀索引与索引选择性

对于长字符串的字段（如 url），我们可以用伪哈希索引的形式来创建索引，以避免索引变得既大又慢，除此之外其实还可以用前缀索引（字符串的部分字符）的形式来达到我们的目的，那么这个前缀索引应该如何选取呢，这叫涉及到一个叫索引选择性的概念

> 索引选择性：不重复的索引值（也称为基数，cardinality）和数据表的记录总数的比值，比值越高，代表索引的选择性越好，唯一索引的选择性是最好的，比值是 1。

我们可以通过 `SHOW INDEXES FROM table` 来查看每个索引 `cardinality` 的值以评估索引设计的合理性。

## 参考资料

- [MySQL 索引连环 18 问！](https://blog.csdn.net/weixin_41385912/article/details/120500237)
- [常见的二叉树](https://www.cnblogs.com/jiahongwu/p/bTree.html)
- [什么是 MySQL 的“回表”？](https://zhuanlan.zhihu.com/p/512662526)