---
title: JUC - Executor 框架
category: Concurrency
date: 2023-03-07
---

## 简介

**Executor** 框架是指 JDK 1.5 中引入的一系列并发库中与 `Executor` 相关的功能类，包括 `Executor、Executors、ExecutorService、Future、Callable` 等。

Executor 框架主要包含三个部分：

- **任务**：包括 `Runnable` 和 `Callable`，其中 `Runnable` 表示一个可以异步执行的任务，而 `Callable` 表示一个会产生结果的任务。
- **任务的执行**：包括 Executor 框架的核心接口 `Executor` 以及其子接口 `ExecutorService`。在 Executor 框架中有两个关键类 `ThreadPoolExecutor` 和 `ScheduledThreadPoolExecutor` 实现了 ExecutorService 接口。
- **异步计算的结果**：包括接口 `Future` 和其实现类 `FutureTask`。

## Executor 核心类

Executor 框架的类图如下：

![Executor 框架类图](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/juc_executor_framework.png)

### Executor

`Executor` 接口定义如下，它提供了一个执行可运行程序的抽象方法

```java
public interface Executor {

    void execute(Runnable command);
}
```

### ExecutorService

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
### AbstractExecutorService

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

### ThreadPoolExecutor

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

### ScheduledExecutorService

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
### ScheduledThreadPoolExecutor

`ScheduledThreadPoolExecutor` 既实现了定时执行器接口 `ScheduledExecutorService`，也继承了线程池类 `ThreadPoolExecutor` 

```java
public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor implements ScheduledExecutorService {

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

## Executors

`java.util.concurrent` 包下的 `Executors` 是一个线程池工具类，用来创建不同类型的线程池。

常用的三类 `ThreadPoolExecutor`：

1. `FixedThreadPool`

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}

public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>(),
                                  threadFactory);
}
```

这种线程池的线程数量达 `corePoolSize` 后，即使线程池没有可执行任务时，也不会释放线程。

FixedThreadPool 的工作队列为无界队列 `LinkedBlockingQueue`(队列容量为 `Integer.MAX_VALUE`), 这会导致以下问题：
- 线程池里的线程数量不超过 `corePoolSize`，这导致了 `maximumPoolSize` 和 `keepAliveTime` 将会是个无用参数；
- 由于使用了无界队列，所以 FixedThreadPool 永远不会拒绝，即饱和策略失效。

2. `CachedThreadPool`

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}

public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>(),
                                  threadFactory);
}
```

线程池的线程数可达到 `Integer.MAX_VALUE`，即 2147483647，内部使用 `SynchronousQueue` 作为阻塞队列；和 `newFixedThreadPool` 创建的线程池不同，`newCachedThreadPool` 在没有任务执行时，当线程的空闲时间超过 `keepAliveTime`，会自动释放线程资源，当提交新任务时，如果没有空闲线程，则创建新线程执行任务，会导致一定的系统开销。

:::info 其执行过程：
1. 主线程调用 SynchronousQueue 的 offer() 方法放入 task, 倘若此时线程池中有空闲的线程尝试读取 SynchronousQueue 的 task, 即调用了 SynchronousQueue 的 poll(), 那么主线程将该 task 交给空闲线程。否则执行第二步；
2. 当线程池为空或者没有空闲的线程，则创建新的线程执行任务。
3. 执行完任务的线程倘若在 60s 内仍空闲，则会被终止。因此长时间空闲的 CachedThreadPool 不会持有任何线程资源。
:::

3. `SingleThreadExecutor`

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

初始化的线程池中只有一个线程，如果该线程异常结束，会重新创建一个新的线程继续执行任务，唯一的线程可以保证所提交任务的顺序执行。

由于使用了无界队列，所以 SingleThreadPool 永远不会拒绝，即饱和策略失效。

:::warning
在 Java 开发手册中，禁止使用 `Executors` 创建线程池，建议使用 `ThreadPoolExecutor` 指定参数创建，规避资源耗尽的风险。

Executors 各个方法的弊端：
- newFixedThreadPool 和 newSingleThreadExecutor:   主要问题是堆积的请求处理队列可能会耗费非常大的内存，甚至 OOM。
- newCachedThreadPool 和 newScheduledThreadPool:   主要问题是线程数最大数是 Integer.MAX_VALUE，可能会创建数量非常多的线程，甚至 OOM。

更多可以看看这里 [为什么禁止使用 Executors 创建线程池？](http://static.kancloud.cn/mtdev/java-manual/2686320)
:::

## ThreadPoolExecutor

### ThreadPoolExecutor 的重要参数

:::warning 线程池的重要参数：
- `int corePoolSize`：核心线程数，这是线程池的基本核心数，
- `int maximumPoolSize`：最大线程数
- `long keepAliveTime`：等待工作的空闲线程的超时时间（以纳秒为单位）。当存在超过 `corePoolSize` 或允许 `CoreThreadTimeOut` 时，线程使用此超时设置。否则，他们会永远等待新的工作。
- `TimeUnit unit`：`keepAliveTime` 的时间单位。
- `BlockingQueue<Runnable> workQueue`：用于保存任务和移交给工作线程的队列。
- `ThreadFactory threadFactory`：用于创建线程的工厂。
- `RejectedExecutionHandler handler`：无法由 `ThreadPoolExecutor 执行的任务的处理程序。
- `allowCoreThreadTimeOut`：如果为 `false`（默认值），则核心线程即使在空闲时也保持活动状态。如果为 true，则核心线程使用 `keepAliveTime` 来超时等待工作。
:::

我们先来看看 `ThreadPoolExecutor` 内部是如何存储任务和线程的，在 `ThreadPoolExecutor` 内部有两个重要的属性：

```java
//存放任务的阻塞队列
private final BlockingQueue<Runnable> workQueue;
//worker 的集合，用 set 来存放
private final HashSet<Worker> workers = new HashSet<Worker>();
```

其中 `workQueue` 是一个用来存储可运行任务的阻塞队列，用来存储添加到线程池中的任务；`workers` 是一个线程集合，线程池依据创建时提供的参数，在添加任务时动态创建线程，存储在 `workers` 之中。

我们用**poolSize**表示当前线程池线程数量，当新提交一个任务时：

1. 如果`poolSize < corePoolSize`，新增加一个线程处理新的任务。
2. 如果`poolSize == corePoolSize`，当前线程数已经达到核心线程数，新任务会被放入阻塞队列等待。
3. 如果阻塞队列的容量达到上限，如果这时`poolSize < maximumPoolSize`，新增线程来处理任务，知道当前线程数达到最大线程数 `maximumPoolSize`。
4. 如果阻塞队列满了，且`poolSize == maximumPoolSize`，那么线程池已经达到极限，会根据饱和策略 `RejectedExecutionHandler` 拒绝新的任务。

所以通过上面的描述可知 `corePoolSize <= maximumPoolSize`，`poolSize <= maximumPoolSize`；而 `poolSize` 和 `corePoolSize` 无法比较，`poolSize` 是有可能比 `corePoolSize` 大的。

### ThreadPoolExecutor 实例




在 Java 中和关闭线程池相关的方法主要有如下：
- `void shutdown()`
- `List<Runnable> shutDownNow`
- `boolean awaitTermination`
- `boolean isShutDown`
- `boolean isTerminated`

---

## 参考资料

- [Java 全栈知识体系](https://pdai.tech/md/java/thread/java-thread-x-overview.html)
- [Java Executors(线程池)](https://www.jianshu.com/p/d63d01550f0e)