---
title: 逻辑结构 - 图
category: 数据结构
date: 2022-09-27
---

数据结构之图
<!-- more -->

#### 图的概述

**图的定义**

图 (Graph) 是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G(V,E)，其中，G 表示一个图，V 是图 G 中顶点的集合，E 是图 G 中边的集合。

和线性表，树的差异:

* 线性表中我们把数据元素叫元素，树中将数据元素叫结点，在图中数据元素，我们则称之为顶点 (Vertex)。

* 线性表可以没有元素，称为空表；树中可以没有节点，称为空树；但是，在图中不允许没有顶点 (有穷非空性)。

* 线性表中的各元素是线性关系，树中的各元素是层次关系，而图中各顶点的关系是用边来表示 (边集可以为空)。

**图的分类**

* 有向图：如果给图的每条边规定一个方向，那么得到的图称为**有向图**。

* 无向图：在有向图中，与一个节点相关联的边有出边和入边之分。相反，边没有方向的图称为**无向图**。

* 单图：一个图如果任意两顶点之间只有一条边（在有向图中为两顶点之间每个方向只有一条边）；边集中不含环，则称为**单图**。

**基本术语**

- 顶点的度：顶点 Vi 的度 (Degree) 是指在图中与 Vi 相关联的边的条数。对于有向图来说，有入度 (In-degree) 和出度 (Out-degree) 之分，有向图顶点的度等于该顶点的入度和出度之和。

- 邻接：
  - 若无向图中的两个顶点 V1 和 V2 存在一条边 (V1,V2)，则称顶点 V1 和 V2 邻接 (Adjacent)；
  - 若有向图中存在一条边<V3,V2>，则称顶点 V3 与顶点 V2 邻接，且是 V3 邻接到 V2 或 V2 邻接到 V3；

- 路径：在无向图中，若从顶点 Vi 出发有一组边可到达顶点 Vj，则称顶点 Vi 到顶点 Vj 的顶点序列为从顶点 Vi 到顶点 Vj 的路径 (Path)。

- 连通：若从 Vi 到 Vj 有路径可通，则称顶点 Vi 和顶点 Vj 是连通 (Connected) 的。

- 权 (Weight)：有些图的边或弧具有与它相关的数字，这种与图的边或弧相关的数叫做权 (Weight)。

- 连通：如果从 V 到 W 存在一条（无向）路径，则称 V 和 W 是连通的；

- 路径：V 到 W 的路径是一系列顶点{V, v 1, v 2, …, v n, W}的集合，其中任一对相邻的顶点间都有图中的边。路径的长度是路径中的边数（如果带 权，则是所有边的权重和）。如果 V 到 W 之间的所有顶点都不同，则称简单路径；

- 回路：起点等于终点的路径；

- 连通图：图中任意两顶点均连通

#### 图的表示

**邻接矩阵（数组存储）**

邻接矩阵 G\[N\]\[N\]——N 个顶点从 0 到 N-1 编号，若结点 V~i~ 和 结点 V~j~ 是 G 中的边，这 G\[i\]\[j\] = 1，否则等于 0，由此得出的 N * N 的矩阵为邻接矩阵。

![邻接矩阵](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/邻接矩阵.png)

表示无向图时：

![邻接矩阵](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/邻接矩阵-无向图.png)

对于无向图来说，V~i~ 和 V~j~ 的结果和 V~j~ 和 V~i~ 的结果是对称的。

> 不足：由于存在 n 个顶点的图需要 n*n 个数组元素进行存储，当图为稀疏图时，使用邻接矩阵存储方法将会出现大量 0 元素，这会造成极大的空间浪费。这时，可以考虑使用邻接表表示法来存储图中的数据。

**邻接表（链表存储）**

![邻接表](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/advance/邻接表.png)

#### **图的遍历**

##### 深度优先搜索 (DFS)

> 深度优先搜索 (Depth First Search)

##### 广度优先搜索（BFS）

> 广度优先搜索（Breadth First Search）