---
title: Hadoop 大数据组件
date: 2023-10-14
order: 3
---

# Apache Hadoop

## 简介

**Hadoop 是什么**

- Hadoop 是一个由 Apache 基金会所开发的分布式系统基础架构。
- 主要解决，海量数据的存储和海量数据的分析计算问题。
- 广义上来说，Hadoop 通常是指一个更广泛的概念 —— Hadoop 生态圈。

**Hadoop 三大发行版本：Apache、Cloudera、Hortonworks**

1. Apache 版本最原始（最基础）的版本，对于入门学习最好。
2. Cloudera 在大型互联网企业中用的较多。
3. Hortonworks 文档较好。

**Hadoop 的优势**

- 高可靠性：Hadoop 底层维护多个数据副本，所以即使 Hadoop 某个计算元素或存储出现故障，也不会导致数据的丢失。
- 高扩展性：在集群间分配任务数据，可方便的扩展数以千计的节点。
- 高效性：在 MapReduce 的思想下，Hadoop 是并行工作的，以加快任务处理速度。
- 高容错性：能够自动将失败的任务重新分配。

## Hadoop 的组成

- HDFS 分布式文件系统
- MapReduce 分布式计算框架
- Yarn 资源协调框架
- Common 模块

![hadoop_1](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/hadoop_1.png)

### HDFS 分布式文件系统

一个高可靠、高吞吐量的分布式文件系统。对于 HDFS 而言，他具有数据切割、制作副本、分散存储数据的能力。

![20231016033754](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231016033754.png)

-   **NameNode**: 存储文件的元数据。比如文件名称、文件目录结构、文件属性（生成时间、副本数、文件权限）以及每个文件的块列表和块所在的 DataNode 等。-   **SecondaryNameNode**: 辅助 NameNode 更好的工作，用来监控 HDFS 状态的辅助后台程序，每隔一段时间获取 HDFS 元数据快照。

-   **DataNode**: 在本地文件系统存储文件块数据，以及块数据的校验。

### MapReduce 分布式离线并行计算框架

MapReduce 在处理任务时 ==> 拆解任务 + 分散处理 + 合并结果

MapReduce 计算 == > map 阶段 + reduce 阶段

map 阶段就是"分"的阶段，指的是并行的处理输入数据。

reduce 阶段就是"合"的阶段，对 map 阶段结果进行汇总。

![20231016033942](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231016033942.png)

### YARN 作业调度与集群管理框架

计算资源协调

![20231016033957](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/20231016033957.png)

-   **ResourceManager**: 处理客户端请求，启动/监控 ApplicationMaster、监控 NodeManager、资源分配与调度。-   **NodeManager**: 单个节点上的资源管理，处理来自 ResourceManager 的命令、处理来自 ApplicationMaster 的命令。-   **ApplicationMaster**: 数据切分，为应用程序申请资源，并分配给内部任务、任务监控与容错。-   **Container**: 对任务运行环境的抽象。封装了 CPU、内存等多维资源以及环境变量、启动命令等任务运行的相关信息。

ResourceManager 是老大 ---> NodeManager 是小弟 -----> ApplicationMaster 是计算任务专员。


### Common 模块

支持其他模块的工具模块（Configuration、RPC、序列化机制、日志操作）