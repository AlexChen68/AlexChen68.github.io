---
title:  并发理论基础
article: false
date: 2023-03-13
---

## 什么是并发？

CPU、内存、I/O 设备的速度是有极大差异的，为了合理利用 CPU 的高性能，平衡这三者的速度差异，计算机体系结构、操作系统、编译程序都做出了贡献，主要体现为:
- CPU 增加了缓存，以均衡与内存的速度差异；// 导致**可见性**问题
- 操作系统增加了进程、线程，以分时复用 CPU，进而均衡 CPU 与 I/O 设备的速度差异；// 导致**原子性**问题
- 编译程序优化指令执行次序，使得缓存能够得到更加合理地利用。// 导致**有序性**问题

## 线程安全问题

1. **可见性问题**

> 可见性：指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。

在并发的时候，多个线程同时对一个共享变量进行修改操作，如果执行操作的两个线程不在一个 CPU 核心上，那么由于 CPU 高速缓存的存在，一个线程修改后的值，无法及时被另一个线程获知，导致最终结果不符合预期。

2. **原子性问题**

> 原子性：即一个操作或者多个操作 要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行。
>
> 原子操作：即不会被线程调度机制打断的操作，没有上下文切换。

3. **有序性问题**

> 有序性：即程序执行的顺序按照代码的先后顺序执行。


---

## 参考资料

- [Java 并发理论基础](https://pdai.tech/md/java/thread/java-thread-x-theorty.html) <Badge text="推荐" type="tip" />
- [Lesson: Concurrency (The Java™ Tutorials > Essential Java Classes) (oracle.com)](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)
- [Java 并发编程之可见性分析 volatile](https://blog.csdn.net/m0_73311735/article/details/127919267)