---
title: JDK 工具篇 - Executor 框架
date: 2023-03-07
---

## 简介

**Executor** 框架是指 JDK 1.5 中引入的一系列并发库中与 `Executor` 相关的功能类，包括 `Executor、Executors、ExecutorService、Future、Callable` 等。

Executor 框架主要包含三个部分：

- **任务**：包括 `Runnable` 和 `Callable`，其中 `Runnable` 表示一个可以异步执行的任务，而 `Callable` 表示一个会产生结果的任务。
- **任务的执行**：包括 Executor 框架的核心接口 `Executor` 以及其子接口 `ExecutorService`。在 Executor 框架中有两个关键类 `ThreadPoolExecutor` 和 `ScheduledThreadPoolExecutor` 实现了 ExecutorService 接口。
- **异步计算的结果**：包括接口 `Future` 和其实现类 `FutureTask`。

## 为什么要有线程池

线程池能够对线程进行统一分配，调优和监控：

- 降低资源消耗 (线程无限制地创建，然后使用完毕后销毁)
- 提高响应速度 (无须创建线程)
- 提高线程的可管理性

## Executor 核心类

Executor 框架的类图如下：

![Executor 框架类图](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/juc_executor_framework.png)

### Executor 和 ExecutorService

`Executor` 接口定义如下，它提供了一个执行可运行程序的抽象方法

```java
public interface Executor {

    void execute(Runnable command);
}
```

`ExecutorService` 继承了 `Executor`，并提供了提交任务等待返回和终止任务等方法

```java
public interface ExecutorService extends Executor {

    void shutdown();

    List<Runnable> shutdownNow();

    boolean isShutdown();

    boolean isTerminated();

    boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException;

    <T> Future<T> submit(Callable<T> task);

    <T> Future<T> submit(Runnable task, T result);

    Future<?> submit(Runnable task);

    <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks)
        throws InterruptedException;

    <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit)
        throws InterruptedException;

    <T> T invokeAny(Collection<? extends Callable<T>> tasks)
        throws InterruptedException, ExecutionException;


    <T> T invokeAny(Collection<? extends Callable<T>> tasks,long timeout, TimeUnit unit)
        throws InterruptedException, ExecutionException, TimeoutException;
}
```

### AbstractExecutorService 和 ThreadPoolExecutor

`AbstractExecutorService` 实现了 `ExecutorService` 接口，对 `ExecutorService` 的方法做了默认实现，例如：

```java
// AbstractExecutorService.java

protected <T> RunnableFuture<T> newTaskFor(Runnable runnable, T value) {
    return new FutureTask<T>(runnable, value);
}

public Future<?> submit(Runnable task) {
    if (task == null) throw new NullPointerException();
    RunnableFuture<Void> ftask = newTaskFor(task, null);
    execute(ftask);
    return ftask;
}
```

`ThreadPoolExecutor` 继承了 `AbstractExecutorService`，这就是我们经常使用到的线程池。

```java
public class ThreadPoolExecutor extends AbstractExecutorService {
  
  public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory,
                              RejectedExecutionHandler handler) {
        if (corePoolSize < 0 ||
            maximumPoolSize <= 0 ||
            maximumPoolSize < corePoolSize ||
            keepAliveTime < 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.acc = System.getSecurityManager() == null ?
                null :
                AccessController.getContext();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
    }
    // ... ...
}
```

线程池解决了两个不同的问题：
- 由于减少了每个任务的调用开销，它们通常在执行大量异步任务时提供改进的性能，并且它们提供了一种绑定和管理执行任务集合时消耗的资源（包括线程）的方法。
- 每个 ThreadPoolExecutor 还维护一些基本统计信息，例如已完成任务的数量。

### ScheduledExecutorService 和 ScheduledThreadPoolExecutor

`ExecutorService` 的另一个重要子接口是 `ScheduledExecutorService`, 它提定义了定时执行任务的抽象方法;

这些 schedule 方法创建具有各种延迟的任务，并返回可用于取消或检查执行的任务对象。

```java
public interface ScheduledExecutorService extends ExecutorService {

    public ScheduledFuture<?> schedule(Runnable command,
                                       long delay, TimeUnit unit);

    public <V> ScheduledFuture<V> schedule(Callable<V> callable,
                                           long delay, TimeUnit unit);

    public ScheduledFuture<?> scheduleAtFixedRate(Runnable command,
                                                  long initialDelay,
                                                  long period,
                                                  TimeUnit unit);

    public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command,
                                                     long initialDelay,
                                                     long delay,
                                                     TimeUnit unit);
}
```

`ScheduledThreadPoolExecutor` 既实现了定时执行器接口 `ScheduledExecutorService`，也继承了线程池类 `ThreadPoolExecutor` 

```java
public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor 
        implements ScheduledExecutorService {
}
```

这表明这是一个用于执行周期定时任务的线程池。

### ForkJoinPool

`AbstractExecutorService` 还有一个线程池实现类是 `ForkJoinPool`，它是 JDK 7 加入的一个线程池类，提供了分治算法 (Divide-and-Conquer) 的并行实现。

```java
public class ForkJoinPool extends AbstractExecutorService {
    private ForkJoinPool(int parallelism,
                     ForkJoinWorkerThreadFactory factory,
                     UncaughtExceptionHandler handler,
                     int mode,
                     String workerNamePrefix) {
        this.workerNamePrefix = workerNamePrefix;
        this.factory = factory;
        this.ueh = handler;
        this.config = (parallelism & SMASK) | mode;
        long np = (long)(-parallelism); // offset ctl counts
        this.ctl = ((np << AC_SHIFT) & AC_MASK) | ((np << TC_SHIFT) & TC_MASK);
    }
}
```

ForkJoinPool 线程池最大的特点就是分叉 (fork) 合并 (join)，将一个大任务拆分成多个小任务，并行执行，再结合工作窃取模式 (worksteal) 提高整体的执行效率，充分利用 CPU 资源。

## ThreadPoolExecutor

### 线程池的重要参数

**必需参数：**
- `int corePoolSize`：该线程池中核心线程数最大值。线程池中有两类线程，核心线程和非核心线程。核心线程默认情况下会一直存在于线程池中，即使这个核心线程什么都不干（铁饭碗），而非核心线程如果长时间的闲置，就会被销毁（临时工）。
- `int maximumPoolSize`：该线程池中线程总数最大值。该值等于核心线程数量 + 非核心线程数量。
- `long keepAliveTime`：非核心线程闲置超时时长；非核心线程如果处于闲置状态超过该值，就会被销毁。如果设置 `allowCoreThreadTimeOut(true)`，则会也作用于核心线程。
- `TimeUnit unit`：`keepAliveTime` 的时间单位。
- `BlockingQueue<Runnable> workQueue`：阻塞队列，维护着等待执行的 `Runnable` 任务对象。

    常用的几个阻塞队列：

    1. LinkedBlockingQueue

        链式阻塞队列，底层数据结构是链表，默认大小是 Integer.MAX_VALUE，也可以指定大小。

    2. ArrayBlockingQueue

        数组阻塞队列，底层数据结构是数组，需要指定队列的大小。

    3. SynchronousQueue

        同步队列，内部容量为 0，每个 put 操作必须等待一个 take 操作，反之亦然。

    4. DelayQueue

        延迟队列，该队列中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素。

**非必需参数：**
- `ThreadFactory threadFactory`：创建线程的工厂，用于批量创建线程，统一在创建线程时设置一些参数，如是否守护线程、线程的优先级等。如果不指定，会新建一个默认的线程工厂。

```java
static class DefaultThreadFactory implements ThreadFactory {
    // 省略属性
    // 构造函数
    DefaultThreadFactory() {
        SecurityManager s = System.getSecurityManager();
        group = (s != null) ? s.getThreadGroup() :
        Thread.currentThread().getThreadGroup();
        namePrefix = "pool-" +
            poolNumber.getAndIncrement() +
            "-thread-";
    }
    
    // 省略
}
```

- `RejectedExecutionHandler handler`：**拒绝处理策略**，线程数量大于最大线程数就会采用拒绝处理策略

    内置的四种拒绝处理的策略为：

    1. **ThreadPoolExecutor.AbortPolicy**：**默认拒绝处理策略**，丢弃任务并抛出 RejectedExecutionException 异常。 

    2. **ThreadPoolExecutor.DiscardPolicy**：丢弃新来的任务，但是不抛出异常。 

    3. **ThreadPoolExecutor.DiscardOldestPolicy**：丢弃队列头部（最旧的）的任务，然后重新尝试执行程序（如果再次失败，重复此过程）。

    4. **ThreadPoolExecutor.CallerRunsPolicy**：由调用线程处理该任务。

**其他内置属性：**
- `allowCoreThreadTimeOut`：如果为 `false`（默认值），则核心线程即使在空闲时也保持活动状态。如果为 true，则核心线程使用 `keepAliveTime` 来超时等待工作。

### Execute 原理

我们先来看看 `ThreadPoolExecutor` 内部是如何存储任务和线程的，在 `ThreadPoolExecutor` 内部有两个重要的属性：

```java
//存放任务的阻塞队列
private final BlockingQueue<Runnable> workQueue;
//worker 的集合，用 set 来存放
private final HashSet<Worker> workers = new HashSet<Worker>();
```

其中 `workQueue` 是一个用来存储可运行任务的阻塞队列，用来存储添加到线程池中的任务；

`workers` 是一个线程集合，线程池依据创建时提供的参数，在添加任务时动态创建线程，存储在 `workers` 之中。

当线程池执行 `execute` 方法时，其处理流程如下：   

1. 线程总数量 < corePoolSize，无论线程是否空闲，都会新建一个核心线程执行任务（让核心线程数量快速达到 corePoolSize，在核心线程数量 < corePoolSize 时）。**注意，这一步需要获得全局锁。**
2. 线程总数量 >= corePoolSize 时，新来的线程任务会进入任务队列中等待，然后空闲的核心线程会依次去缓存队列中取任务来执行（体现了**线程复用**）。 
3. 当缓存队列满了，说明这个时候任务已经多到爆棚，需要一些“临时工”来执行这些任务了。于是会创建非核心线程去执行这个任务。**注意，这一步需要获得全局锁。**
4. 缓存队列满了，且总线程数达到了 maximumPoolSize，则会采取上面提到的拒绝策略进行处理。

整个过程如图所示：

![线程池主要的处理流程](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/线程池主要的处理流程.png)

### 线程池状态

线程池本身有一个调度线程，这个线程就是用于管理布控整个线程池里的各种任务和事务，例如创建线程、销毁线程、任务队列管理、线程队列管理等等。

故线程池也有自己的状态。`ThreadPoolExecutor`类中使用了一些`final int`常量变量来表示线程池的状态，分别为 RUNNING、SHUTDOWN、STOP、TIDYING、TERMINATED。 

```java
// runState is stored in the high-order bits
private static final int RUNNING    = -1 << COUNT_BITS;
private static final int SHUTDOWN   =  0 << COUNT_BITS;
private static final int STOP       =  1 << COUNT_BITS;
private static final int TIDYING    =  2 << COUNT_BITS;
private static final int TERMINATED =  3 << COUNT_BITS;
```

- 线程池创建后处于**RUNNING**状态。

- 调用 shutdown() 方法后处于**SHUTDOWN**状态，线程池不能接受新的任务，清除一些空闲 worker，不会等待阻塞队列的任务完成。

- 调用 shutdownNow() 方法后处于**STOP**状态，线程池不能接受新的任务，中断所有线程，阻塞队列中没有被执行的任务全部丢弃。此时，poolsize=0，阻塞队列的 size 也为 0。

- 当所有的任务已终止，ctl 记录的”任务数量”为 0，线程池会变为**TIDYING**状态。接着会执行 terminated() 函数。 

  > ThreadPoolExecutor 中有一个控制状态的属性叫`ctl`，它是一个 AtomicInteger 类型的变量。线程池状态就是通过 AtomicInteger 类型的成员变量`ctl`来获取的。
  >
  > 获取的`ctl`值传入`runStateOf`方法，与`~CAPACITY`位与运算 (`CAPACITY`是低 29 位全 1 的 int 变量)。
  >
  > `~CAPACITY`在这里相当于掩码，用来获取 ctl 的高 3 位，表示线程池状态；而另外的低 29 位用于表示工作线程数

- 线程池处在 TIDYING 状态时，**执行完 terminated() 方法之后**，就会由 **TIDYING -> TERMINATED**，线程池被设置为 TERMINATED 状态。

![线程池的状态](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/java/线程池的状态.png)

### 关闭线程池

关闭线程池有两个方法，分别是：shutdown()、shutdownNow()

- shutdownNow()：调用该方法后，首先将线程池的状态设置为 `stop`，线程池拒绝接受新任务的提交，然后尝试停止所有正在执行或者暂停任务的线程（也就是线程池里现有的任务也不再执行)，并返回等待执行任务的列表。
- shutdown()：调用该方法后，会将线程池的状态设置为 `shutdown`，线程池拒绝接受新任务的提交，同时等待线程池内的任务执行完毕之后再关闭线程池。

调用两者都会让线程池不再接受新的任务，并且他们的原理都是遍历线程池中的工作线程，然后逐个调用线程的 inputter() 方法来中断线程，而两者的区别是，调用 shutdownNow() 会将线程池设置为 STOP 状态，该方法会返回等待执行的任务列表，而调用 shutdown() 方法会将线程池设置为 SHUTDOWN 状态，无返回值。

## Executors

`java.util.concurrent` 包下的 `Executors` 是一个线程池工具类，用来创建不同类型的线程池。

常用的线程池有四种，下面分别介绍。

### newCachedThreadPool

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
```

`CacheThreadPool`的**运行流程**如下：

1. 提交任务进线程池。
2. 因为**corePoolSize**为 0 的关系，不创建核心线程，线程池最大为 Integer.MAX_VALUE。
3. 尝试将任务添加到**SynchronousQueue**队列。
4. 如果 SynchronousQueue 入列成功，等待被当前运行的线程空闲后拉取执行。如果当前没有空闲线程，那么就创建一个非核心线程，然后从 SynchronousQueue 拉取任务并在当前线程执行。
5. 如果 SynchronousQueue 已有任务在等待，入列操作将会阻塞。

当需要执行很多**短时间**的任务时，CacheThreadPool 的线程复用率比较高，会显著的**提高性能**。而且线程 60s 后会回收，意味着即使没有任务进来，CacheThreadPool 并不会占用很多资源。 

### newFixedThreadPool

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>());
}
```

核心线程数量和总线程数量相等，都是传入的参数 nThreads，所以只能创建核心线程，不能创建非核心线程。因为 LinkedBlockingQueue 的默认大小是 Integer.MAX_VALUE，故如果核心线程空闲，则交给核心线程处理；如果核心线程不空闲，则入列等待，直到核心线程空闲。 

**与 CachedThreadPool 的区别**：

- 因为 corePoolSize == maximumPoolSize，所以 FixedThreadPool 只会创建核心线程。而 CachedThreadPool 因为 corePoolSize=0，所以只会创建非核心线程。
- 在 getTask() 方法，如果队列里没有任务可取，线程会一直阻塞在 LinkedBlockingQueue.take() ，线程不会被回收。CachedThreadPool 会在 60s 后收回。
- 由于线程不会被回收，会一直卡在阻塞，所以**没有任务的情况下，FixedThreadPool 占用资源更多**。 
- 都几乎不会触发拒绝策略，但是原理不同。FixedThreadPool 是因为阻塞队列可以很大（最大为 Integer 最大值），故几乎不会触发拒绝策略；CachedThreadPool 是因为线程池很大（最大为 Integer 最大值），几乎不会导致线程数量大于最大线程数，故几乎不会触发拒绝策略。

### newSingleThreadExecutor

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

有且仅有一个核心线程（corePoolSize == maximumPoolSize=1），使用了 LinkedBlockingQueue（容量很大），所以，**不会创建非核心线程**。所有任务按照**先来先执行**的顺序执行。如果这个唯一的线程不空闲，那么新来的任务会存储在任务队列里等待执行。

### newScheduledThreadPool

创建一个定长线程池，支持定时及周期性任务执行。 

```java
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}

//ScheduledThreadPoolExecutor():
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE,
          DEFAULT_KEEPALIVE_MILLIS, MILLISECONDS,
          new DelayedWorkQueue());
}
```

:::warning
四种常见的线程池基本够我们使用了，但是《阿里巴巴开发手册》不建议我们直接使用 Executors 类中的线程池，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学需要更加明确线程池的运行规则，规避资源耗尽的风险。

更多可以看看这里 [为什么禁止使用 Executors 创建线程池？](http://static.kancloud.cn/mtdev/java-manual/2686320)

但如果你及团队本身对线程池非常熟悉，又确定业务规模不会大到资源耗尽的程度（比如线程数量或任务队列长度可能达到 Integer.MAX_VALUE）时，其实是可以使用 JDK 提供的这几个接口的，它能让我们的代码具有更强的可读性。
:::
---

## 参考资料

- [线程池原理](http://concurrent.redspider.group/article/03/12.html#1234-newscheduledthreadpool)
- [Java 全栈知识体系](https://pdai.tech/md/java/thread/java-thread-x-overview.html)
- [Java Executors(线程池)](https://www.jianshu.com/p/d63d01550f0e)
- [你知道如何安全正确的关闭线程池吗？](https://cloud.tencent.com/developer/article/1523115)