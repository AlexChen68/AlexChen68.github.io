---
title:  并发理论基础
date: 2023-03-13
order: -1
---

# 并发理论基础

## 什么是并发？

CPU、内存、I/O 设备的速度是有极大差异的，为了合理利用 CPU 的高性能，平衡这三者的速度差异，计算机体系结构、操作系统、编译程序都做出了贡献，主要体现为：
- CPU 增加了缓存，以均衡与内存的速度差异；// 导致**可见性**问题
- 操作系统增加了进程、线程，以分时复用 CPU，进而均衡 CPU 与 I/O 设备的速度差异；// 导致**原子性**问题
- 编译程序优化指令执行次序，使得缓存能够得到更加合理地利用。// 导致**有序性**问题

## 并发带来的安全问题

1. **可见性问题**

> 可见性：指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。

在并发的时候，多个线程同时对一个共享变量进行修改操作，如果执行操作的两个线程不在一个 CPU 核心上，那么由于 CPU 高速缓存的存在，一个线程修改后的值，无法及时被另一个线程获知，导致最终结果不符合预期。

2. **原子性问题**

> 原子性：即一个操作或者多个操作 要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行。
>
> 原子操作：即不会被线程调度机制打断的操作，没有上下文切换。

3. **有序性问题**

> 有序性：即程序执行的顺序按照代码的先后顺序执行。

## 怎么解决上述问题？

JMM 本质上可以理解为，Java 内存模型规范了 JVM 如何提供**按需禁用缓存**和**编译优化**的方法。具体来说，这些方法包括：

- volatile、synchronized 和 final 三个关键字
- Happens-Before 规则

### 解决原子性问题

在 Java 中，对基本数据类型的变量的**读取**和**赋值**操作是原子性操作，即这些操作是不可被中断的，要么执行，要么不执行。 

如果要实现更大范围操作的原子性，可以通过 `synchronized` 和 `Lock` 来实现。由于 `synchronized` 和 `Lock` 能够保证任一时刻只有一个线程执行该代码块，那么自然就不存在原子性问题了，从而保证了原子性。

### 解决可见性问题

1. Java 提供了 `volatile` 关键字来保证可见性。

当一个共享变量被 `volatile` 修饰时，它会**保证修改的值会立即被更新到主存**，当有其他线程需要读取时，它会去内存中读取新值。

2. 另外，通过 `synchronized` 和 `Lock` 也能够保证可见性，`synchronized` 和 `Lock` 能保证同一时刻只有一个线程获取锁然后执行同步代码，并且在释放锁之前会将对变量的修改刷新到主存当中。因此可以保证可见性。

### 解决有序性问题

在 Java 里面，可以通过 `volatile` 关键字来保证一定的“有序性”。另外可以通过 `synchronized` 和 `Lock` 来保证有序性，很显然，`synchronized` 和 `Lock` 保证每个时刻是有一个线程执行同步代码，相当于是让线程顺序执行同步代码，自然就保证了有序性。当然 JMM 是通过 `Happens-Before` 规则来保证有序性的。

### Happens-Before 原则

在 Java 中，有以下天然的 happens-before 关系：

* 程序顺序规则：一个线程中的每一个操作，happens-before 于该线程中的任意后续操作。
* 监视器锁规则：对一个锁的解锁，happens-before 于随后对这个锁的加锁。
* volatile 变量规则：对一个 volatile 域的写，happens-before 于任意后续对这个 volatile 域的读。
* 传递性：如果 A happens-before B，且 B happens-before C，那么 A happens-before C。
* start 规则：如果线程 A 执行操作 ThreadB.start() 启动线程 B，那么 A 线程的 ThreadB.start（）操作 happens-before 于线程 B 中的任意操作、
* join 规则：如果线程 A 执行操作 ThreadB.join（）并成功返回，那么线程 B 中的任意操作 happens-before 于线程 A 从 ThreadB.join() 操作成功返回。

## 参考资料

- [Java 并发理论基础](https://pdai.tech/md/java/thread/java-thread-x-theorty.html) <Badge text="推荐" type="tip" />
- [Lesson: Concurrency (The Java™ Tutorials > Essential Java Classes) (oracle.com)](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)
- [Java 并发编程之可见性分析 volatile](https://blog.csdn.net/m0_73311735/article/details/127919267)