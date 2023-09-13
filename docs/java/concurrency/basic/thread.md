---
title: 基础篇 - Java 线程类和接口
date: 2022-09-30
tag: JUC
---

## Thread 类和 Runnable 接口

在 Java 中，我们是如何使用多线程的呢？

首先，我们需要有一个“线程”类。JDK 提供了 `Thread` 类和 `Runnable` 接口来让我们实现自己的“线程”类。

- 继承 `Thread` 类，并重写 `run` 方法；
- 实现 `Runnable` 接口的 `run` 方法。

### 继承 Thread 类 <Badge text="不推荐" type="warning" />

继承 `java.lang.Thread` 类（Thread 类实现了 `Runnable` 接口），并重写 `run` 方法。

```java
@Slf4j
public class ConcreteThread extends Thread {

    public ConcreteThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        log.info("{} - {}", Thread.currentThread().getName(), Thread.currentThread().getId());
    }

}

@Test
void threadTest() {
    Thread thread = new ConcreteThread("ConcreteThread");
    thread.start();
}
```

注意要调用`start()`方法后，该线程才算启动！

> 我们在程序里面调用了 start() 方法后，虚拟机会先为我们创建一个线程，然后等到这个线程第一次得到时间片时再调用 run() 方法。
>
> 注意不可多次调用 start() 方法。在第一次调用 start() 方法后，再次调用 start() 方法会抛出 IllegalThreadStateException 异常。

### 实现 Runnable 接口<Badge text="推荐" type="tip" />

实现 `java.lang.Runnable` 接口，并重写 `run()` 方法。通过 Thread 调用 start() 方法来启动线程。

`Runnable` 接口定义：

```java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

示例代码：

```java
@Slf4j
public class ConcreteRunnable implements Runnable {

    @Override
    public void run() {
        log.info("{} - {}", Thread.currentThread().getName(), Thread.currentThread().getId());
    }
}

@Test
void runnableTest() {
    Thread thread = new Thread(new ConcreteRunnable(), "ConcreteRunnableThread");
    thread.start();

     // Java 8 函数式编程，可以使用 Java 8 的函数式编程
    new Thread(() -> {
        System.out.println("Java 8 匿名内部类");
    }).start();
}
```

> 推荐使用这种方法，因为单继承、多实现，实现接口并不会影响类继承其他的类，而继承 `Thread` 接口会无法继承其他的业务类。

## Callable、Future 与 FutureTask

通常来说，我们使用 `Runnable` 和 `Thread` 来创建一个新的线程。但是它们有一个弊端，就是 `run` 方法是没有返回值的。而有时候我们希望开启一个线程去执行一个任务，并且这个任务执行完成后有一个返回值。

JDK 提供了 `Callable` 接口与 `Future` 接口为我们解决这个问题，这也是所谓的“异步”模型。

### 实现 Callable 接口 <Badge text="适用有返回值"/>     

与 `Runnable` 相比，`Callable` 可以有返回值，返回值通过 `FutureTask` 进行封装。

```java
@Slf4j
public class ConcreteCallable implements Callable<String> {

    @Override
    public String call() throws Exception {
        log.info("{} - {}", Thread.currentThread().getName(), Thread.currentThread().getId());
        return "callback value";
    }
}

@Test
@SneakyThrows
void CallableTest() {
    ConcreteCallable callable = new ConcreteCallable();
    FutureTask task = new FutureTask(callable);
    Thread callableThread = new Thread(task, "CallableThread");
    callableThread.start();
    log.info("Call value: {}", task.get());
}
```

### Future 接口

`Future`接口只有几个比较简单的方法：

```java
public abstract interface Future<V> {
    public abstract boolean cancel(boolean paramBoolean);
    public abstract boolean isCancelled();
    public abstract boolean isDone();
    public abstract V get() throws InterruptedException, ExecutionException;
    public abstract V get(long paramLong, TimeUnit paramTimeUnit)
            throws InterruptedException, ExecutionException, TimeoutException;
}
```

`cancel`方法是试图取消一个线程的执行。

注意是**试图**取消，**并不一定能取消成功**。因为任务可能已完成、已取消、或者一些其它因素不能取消，存在取消失败的可能。`boolean`类型的返回值是“是否取消成功”的意思。参数`paramBoolean`表示是否采用中断的方式取消线程执行。

所以有时候，为了让任务有能够取消的功能，就使用`Callable`来代替`Runnable`。如果为了可取消性而使用 `Future `但又不提供可用的结果，则可以声明 `Future<?> `形式类型、并返回 `null `作为底层任务的结果。

### FutureTask 类

`FutureTask`是实现的`RunnableFuture`接口的，而`RunnableFuture`接口同时继承了`Runnable`接口和`Future`接口：

```java
public interface RunnableFuture<V> extends Runnable, Future<V> {
    /**
     * Sets this Future to the result of its computation
     * unless it has been cancelled.
     */
    void run();
}

public class FutureTask<V> implements RunnableFuture<V> {

    public FutureTask(Callable<V> callable) {
        if (callable == null)
            throw new NullPointerException();
        this.callable = callable;
        this.state = NEW;       // ensure visibility of callable
    }

    // 执行 Runnable 的话，需要指定固定的返回值
    public FutureTask(Runnable runnable, V result) {
        this.callable = Executors.callable(runnable, result);
        this.state = NEW;       // ensure visibility of callable
    }
}
```

### CompletableFuture 类

在 Java 8 中，新增加了一个包含 50 个方法左右的类：`CompletableFuture`，结合了 Future 的优点，提供了非常强大的 Future 的扩展功能，可以帮助我们简化异步编程的复杂性，提供了函数式编程的能力，可以通过回调的方式处理计算结果，并且提供了转换和组合 CompletableFuture 的方法。

`CompletableFuture` 被设计在 Java 中进行异步编程。异步编程意味着在主线程之外创建一个独立的线程，与主线程分隔开，并在上面运行一个非阻塞的任务，然后通知主线程进展，成功或者失败。

通过这种方式，你的主线程不用为了任务的完成而阻塞/等待，你可以用主线程去并行执行其他的任务。使用这种并行方式，极大地提升了程序的表现。

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T> {

}
```

**四种静态实例化方法：**

```java
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor);

public static CompletableFuture<Void> runAsync(Runnable runnable);
public static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor);
```

有两种格式，一种是 supply 开头的方法，一种是 run 开头的方法

- supply 开头：这种方法，可以返回异步线程执行之后的结果
- run 开头：这种不会返回结果，就只是执行线程任务

如果不指定线程池，默认使用 ForkJoinPool 的公共线程池 `ForkJoinPool.commonPool()`。

**使用 CompletableFuture 场景**

- 执行比较耗时的操作时，尤其是那些依赖一个或多个远程服务的操作，使用异步任务可以改善程序的性能，加快程序的响应速度。
- 使用 CompletableFuture 类，它提供了异常管理的机制，让你有机会抛出、管理异步任务执行种发生的异常。
- 如果这些异步任务之间相互独立，或者他们之间的的某一些的结果是另一些的输入，你可以讲这些异步任务构造或合并成一个。

## Thread 常用方法

- currentThread()：静态方法，返回对当前正在执行的线程对象的引用；
- start()：开始执行线程的方法，java 虚拟机会调用线程内的 run() 方法；
- yield()：yield 在英语里有放弃的意思，同样，这里的 yield() 指的是当前线程愿意让出对当前处理器的占用。这里需要注意的是，就算当前线程调用了 yield() 方法，程序在调度的时候，也还有可能继续运行这个线程的；
- sleep()：静态方法，使当前线程睡眠一段时间；
- join()：使当前线程等待另一个线程执行完毕之后再继续执行，内部调用的是 Object 类的 wait 方法实现的。

### `start()`

开始执行线程的方法，java 虚拟机会调用线程内的 run() 方法

:::warning
注意不可多次调用 start() 方法。在第一次调用 start() 方法后，再次调用 start() 方法会抛出 IllegalThreadStateException 异常。
:::

### `yield()`

暂停当前正在执行的线程对象（及放弃当前拥有的 cup 资源），并执行其他线程。yield() 做的是让当前运行线程回到可运行状态，以允许具有相同优先级的其他线程获得运行机会。因此，使用 yield() 的目的是让相同优先级的线程之间能适当的轮转执行。

**但是，实际中无法保证 yield() 达到让步目的，因为让步的线程还有可能被线程调度程序再次选中。**

### `sleep()`

使当前正在执行的线程暂停指定的毫秒数，也就是进入休眠的状态。需要注意的是，sleep 的时候要对异常进行处理。

```java
try {
    Thread.sleep(1000L); //暂停 1 秒
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

### `join()`

等待这个线程执行完才会轮到后续线程得到 cpu 的执行权，使用这个也要抛出异常。

```java
@Test
void joinTest() throws InterruptedException {
    Thread t1 = new Thread(() -> {
        try {
            for (int i = 0; i < 5; i++) {
                log.info("Thread 1 ding ding ding " + i);
                Thread.sleep(1000L);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            log.info("Thread 1 exit");
        }
    });
    Thread t2 = new Thread(() -> {
        try {
            // 关键语句：需要等 t1 执行关闭，才会开始执行 t2 剩下的逻辑
            t1.join();
            for (int i = 0; i < 5; i++) {
                log.info("Thread 2 ding ding ding " + i);
                Thread.sleep(1000L);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            log.info("Thread 2 exit");
        }
    });
    t1.start();
    t2.start();
    // 让 t2 执行完，主线程再退出
    t2.join();
}
```

这里有两处使用了 `join()` 方法：
- 第一处在 t2 的 `run` 方法中，使用 `t1.join()`，来让 t1 和 t2 串起来，按照顺序执行，所以 t2 会在 t1 执行完毕后再执行；
- 第二处，在主线程中，使用 `t2.join()`，可以让主线程在 t2 执行完毕后再退出，而不是直接退出。

:::tip 扩展：让主线程等待子线程执行完毕再退出的方法
1. 使用 `sleep()` 方法让主线程等待，但是不好控制需要休眠的时间；
2. 使用 `join()` 方法，让主线程等待子线程执行完毕再继续往下执行；
3. 使用 `java.util.concurrent.CountDownLatch` 统计线程数，每个线程执行完后进行 `countDown()` 操作，主线程使用 `await()` 等待计数变为 0 再往下执行；
4. 使用 `java.util.concurrent.CyclicBarrier` 同步多个线程的操作；
5. 使用线程池的 `isTerminated()` 方法，判断所有子线程是否都执行完，注意需要先执行 `shutdown()`，否则永不为 true。
:::

### `setDaemon()`

> 将此线程标记为守护线程，准确来说，就是服务其他的线程，像 Java 中的垃圾回收线程，就是典型的守护线程。

```java
@Test
void daemonTest() throws InterruptedException {
    Thread t1 = new Thread(() -> {
        try {
            for (int i = 0; i < 5; i++) {
                log.info("Thread 1 ding ding ding " + i);
                Thread.sleep(1000L);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            log.info("Thread 1 exit");
        }
    });
    Thread t2 = new Thread(() -> {
        try {
            Thread.sleep(1000L);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            log.info("Thread 2 exit");
        }
    });
    t1.setDaemon(true);
    t1.start();
    t2.start();
    Thread.sleep(2000L);
}
```
如果其他线程都执行完毕，main 方法（主线程）也执行完毕，JVM 就会退出，也就是停止运行。如果 JVM 都停止运行了，守护线程自然也就停止了。

---

## 参考资料

- [第二章 Java 多线程入门类和接口](http://concurrent.redspider.group/article/01/2.html)
- [Java 全栈知识体系【Java 并发 - 线程基础】](https://pdai.tech/md/java/thread/java-thread-x-thread-basic.html)
- [Java 线程的 6 种状态及切换 (透彻讲解)](https://tobebetterjavaer.com/thread/thread-state-and-method.html)
- [java 主线程等待所有子线程执行完毕再执行](https://blog.csdn.net/qq_36908872/article/details/127074466)
- [CompletableFuture 用法详解](https://zhuanlan.zhihu.com/p/344431341)