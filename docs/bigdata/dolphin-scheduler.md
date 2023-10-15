---
title: DolphinScheduler 海豚调度
date: 2023-10-13
---

# Apache DolphinScheduler 海豚调度

## 关于 Apache DolphinScheduler

### 简介

Apache DolphinScheduler 是一个分布式易扩展的可视化 DAG 工作流任务调度开源系统。适用于企业级场景，提供了一个可视化操作任务、工作流和全生命周期数据处理过程的解决方案。

Apache DolphinScheduler 旨在解决复杂的大数据任务依赖关系，并为应用程序提供数据和各种 OPS 编排中的关系。解决数据研发 ETL 依赖错综复杂，无法监控任务健康状态的问题。DolphinScheduler 以 DAG（Directed Acyclic Graph，DAG）流式方式组装任务，可以及时监控任务的执行状态，支持重试、指定节点恢复失败、暂停、恢复、终止任务等操作。

![Alt](https://dolphinscheduler.apache.org/img/introduction_ui.png)

### 特性

1. 简单易用
   可视化 DAG: 用户友好的，通过拖拽定义工作流的，运行时控制工具
   模块化操作：模块化有助于轻松定制和维护。
2. 丰富的使用场景
   支持多种任务类型：支持 Shell、MR、Spark、SQL 等 10 余种任务类型，支持跨语言，易于扩展
   丰富的工作流操作：工作流程可以定时、暂停、恢复和停止，便于维护和控制全局和本地参数。
3. High Reliability
   高可靠性：去中心化设计，确保稳定性。原生 HA 任务队列支持，提供过载容错能力。DolphinScheduler 能提供高度稳健的环境。
4. High Scalability
   高扩展性：支持多租户和在线资源管理。支持每天 10 万个数据任务的稳定运行。

## 单机部署

### 使用 standalone-server 镜像

使用 docker，运行 `apache/dolphinscheduler-standalone-server` 镜像，前提是需要安装 docker。

```bash
docker run --name dolphinscheduler-standalone-server\ 
 -p 12345:12345\ 
 -p 25333:25333\ 
 -d apache/dolphinscheduler-standalone-server:3.1.8
```

:::warning
注意：请不要将 `apache/dolphinscheduler-standalone-server` 镜像作为生产镜像，应该仅仅作为快速体验 DolphinScheduler 的功能的途径。 
:::

访问 [`http://localhost:12345/dolphinscheduler/ui`](http://localhost:12345/dolphinscheduler/ui) 打开控制台页面。
   
默认的用户名为 `admin`, 密码 `dolphinscheduler123`。

## 参考资料

- [官方文档](https://dolphinscheduler.apache.org/zh-cn/docs/3.1.8)