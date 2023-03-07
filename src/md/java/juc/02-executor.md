---
title: Executor 详解
category: Java 并发
date: 2023-03-07
---

## 简介

**Executor** 框架是指 JDK 1.5 中引入的一系列并发库中与 `Executor` 相关的功能类，包括 `Executor、Executors、ExecutorService、Future、Callable` 等。

## Executors

`java.util.concurrent` 包下的 `Executors` 是 JDK 提供的工厂工具类，用来创建管理线程的工具例如线程池。

Executor 框架主要包含三个部分：

- **任务**：包括 Runnable 和 Callable，其中 Runnable 表示一个可以异步执行的任务，而 Callable 表示一个会产生结果的任务
- **任务的执行**：包括 Executor 框架的核心接口 Executor 以及其子接口 ExecutorService。在 Executor 框架中有两个关键类 ThreadPoolExecutor 和 ScheduledThreadPoolExecutor 实现了 ExecutorService 接口。
- **异步计算的结果**：包括接口 Future 和其实现类 FutureTask。


## 参考资料

- [Java Executors(线程池)](https://www.jianshu.com/p/d63d01550f0e)