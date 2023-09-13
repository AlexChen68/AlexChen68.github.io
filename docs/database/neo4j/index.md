---
title: Neo4j 简介
date: 2023-05-12
---

## 什么是图数据库？

每个公司，在互联网下，都积累了庞大的数据，如果还是构架在关系数据库上，每次计算一次数据，耗费的计算机资源和时间是一个不可想象的事情。

比特币的挖矿就是一个典型的例子。

因此，**图数据库**就应运而生，图数据库是以点、边为基础存储单元，以高效存储、查询图数据为设计原理的数据管理系统，他不仅可以通过简洁的形式表示数据关系，更加形象的按照人的自然思考思维去构建商业世界的数据，同时整体效能也大大提高。

尤其是在金融风控领域，社交网络，电商，媒体传播分析等领域正发挥着不可或缺的作用。

常见的图数据库有：

- Neo4j
- OrientDB
- ArangoDB
- JanusGraph
- Dgraph

![图数据库对比](https://pic1.zhimg.com/80/v2-145838e8f9ce54b56d9a8d5757b756d0_720w.webp)

## Neo4j

**Neo4j 是一个高性能的，NOSQL 图形数据库**，它具有一下特点：

- 目前最流行的高性能的 NoSQL 图形数据库，结构化数据存储在网络上而不是在表中，完全由 java 开发。
- 支持完整的事务，在属性图中，图是由顶点（Vertex），边（Edge）和属性（Property）组成的，顶点和边都可以设置属性，顶点也称作节点，边也称作关 - 系，每个节点和关系都可以由一个或多个属性。
- Neo4j 创建的图是用顶点和边构建一个有向图，其查询语言 cypher 已经成为事实上的标准。

## 相关术语

### 图 Graph

- graph = Graph(url，图数据库 username=’name’,password=’pw’)

### 节点 Node

- 构成一张图的基本元素是节点和关系。
- 在 Neo4j 中，节点和关系都可以包含属性。
- class Node(*labels, **properties)

### 关系 Relationship

- 节点之间的关系是图数据库很重要的一部分。
- 一个关系连接两个节点，必须有一个开始节点和结束节点。
- class Relationship(start_node, type, end_node, **properties)

### 属性

- 节点和关系都可以设置自己的属性。
- 属性是由 Key-Value 键值对组成，键名是字符串。
- 属性值是要么是原始值，要么是原始值类型的一个数组。

## 相关链接

- 官网：https://neo4j.com/
- 官方手册：https://neo4j.com/docs/operations-manual/current/
- 中文文档：http://neo4j.com.cn/public/docs/index.html
- neo4j 教程：https://www.w3cschool.cn/neo4j/
- neo4j 初步认识和使用：https://segmentfault.com/a/1190000014488430?utm_source=tag-newest
- Neo4j 基础介绍：https://blog.csdn.net/liudongdong19/article/details/82772104
- Neo4j 学习笔记（-）：https://www.cnblogs.com/infoo/p/9840965.html
- Neo4j 学习笔记（二）：https://www.cnblogs.com/infoo/p/11947467.html
- [neo4j 开启远程 web 访问 7474 端口 以 用浏览器打开远程 neo4j 的 web 控制台界面](https://my.oschina.net/airship/blog/3003268)
- [图数据库哪家强，图数据库选型入门指南](https://baijiahao.baidu.com/s?id=1620612689035884669&wfr=spider&for=pc)
- [启动 Neo4j 失败：地址 localhost：7474 已经在使用](https://codeday.me/bug/20190929/1832633.html)

## 参考资料

- [Neo4j 使用教程](http://www.zhuzongkui.top/neo4j/)