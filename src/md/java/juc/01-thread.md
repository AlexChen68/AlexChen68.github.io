---
title: Java 线程详解
article: true
date: 2022-09-30
tag: JUC
category: Java 并发
isOriginal: true
description: Java 线程
---

## 什么是线程

- 进程，是对运行时程序的封装，是系统进行资源调度和分配的基本单位，实现了操作系统的并发。
- 线程，是进程的子任务，是 CPU 调度和分派的基本单位，实现了进程内部的并发。

## 线程的状态

**首先来看操作系统中的线程的状态：**

> 在现在的操作系统中，线程是被视为轻量级进程的，所以操作系统线程的状态其实和操作系统进程的状态是一致的。

![操作系统线程状态](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/system_thread_state.png)


操作系统线程主要有以下三个状态：

- 就绪状态 (ready)：线程正在等待使用 CPU，经调度程序调用之后可进入 running 状态。
- 执行状态 (running)：线程正在使用 CPU。
- 等待状态 (waiting): 线程经过等待事件的调用或者正在等待其他资源（如 I/O）

**再来看看 java 中是如何定义线程的状态的：**

在 java 的 `java.lang.Thread` 类中，通过内部枚举类定义了六种状态

```java
public enum State {
    NEW,
    RUNNABLE,
    BLOCKED,
    WAITING,
    TIMED_WAITING,
    TERMINATED;
}
```

Java 线程状态定义：

![线程状态](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/juc_thread_state.png)

### 新建（NEW）

线程创建后尚未启动。新创建的线程还没有调用 `start()` 方法，此时线程处于 `NEW` 状态。

### 可运行 (Runnable)

- 表示当前线程正在运行中。处于 `RUNNABLE` 状态的线程在 Java 虚拟机中运行，也有可能在等待 CPU 分配资源。
- Java 线程的 `RUNNABLE` 状态包括了传统操作系统线程的 `ready` 和 `running` 两个状态。

### 阻塞 (BLOCKED)

阻塞状态。处于 `BLOCKED` 状态的线程正等待锁的释放以进入同步区。

### 无限期等待 (WAITING)

等待状态。处于等待状态的线程变成 `RUNNABLE` 状态需要其他线程唤醒。

调用如下 3 个方法会使线程进入等待状态：

- `Object.wait()`：使当前线程处于等待状态直到另一个线程唤醒它；
- `Thread.join()`：等待线程执行完毕，底层调用的是 `Object` 实例的 `wait` 方法；
- `LockSupport.park()`：除非获得调用许可，否则禁用当前线程进行线程调度。

### 限期等待 (TIMED_WAITING)

超时等待状态。线程等待一个具体的时间，时间到后会被自动唤醒。

调用如下方法会使线程进入超时等待状态：

- `Thread.sleep(long millis)`：使当前线程睡眠指定时间；
- `Object.wait(long timeout)`：线程休眠指定时间，等待期间可以通过 notify()/notifyAll() 唤醒；
- `Thread.join(long millis)`：等待当前线程最多执行 millis 毫秒，如果 millis 为 0，则会一直执行；
- `LockSupport.parkNanos(long nanos)`：除非获得调用许可，否则禁用当前线程进行线程调度指定时间；
- `LockSupport.parkUntil(long deadline)`：同上，也是禁止线程进行调度指定时间。

### 终止（TERMINATED）

终止状态。此时线程已执行完毕。

## 线程状态的转换

线程主要的状态转换如下：

![线程间转换方法](https://cdn.staticaly.com/gh/AlexChen68/image-hosting@master/blog/java/juc_thread_state_change.png)

### BLOCKED <-> RUNNABLE

我们来启动两个线程去同时执行一个加了锁的方法，在方法中 sleep 一段时间，此时一个线程获取到锁，它的状态应该是 `RUNNABLE`；另一个线程等待锁释放，它的状态应该是 `BLOCKED`。

```java
class BlockTestRunnable implements Runnable {
    @Override
    public void run() {
        testMethod();
    }
}

private synchronized void testMethod() {
    try {
        log.info("Thread {} get locked", Thread.currentThread().getName());
        Thread.sleep(1000L);
        log.info("Thread {} release lock", Thread.currentThread().getName());
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}

@Test
@SneakyThrows
public void blockedTest() {
    Thread a = new Thread(new BlockTestRunnable(), "A");
    Thread b = new Thread(new BlockTestRunnable(), "B");
    a.start();
    b.start();

    int count = 200;
    long step = 10L;
    while (true) {
        log.info("Thread A's state : {} and Thread B's state : {}", a.getState(), b.getState());
        Thread.sleep(step);
        if (count-- < 0) {
            break;
        }
    }
}
```

在这个例子中两个线程的状态转换如下（以 A 先获取到锁为例）

- A 的状态转换过程：
  - 执行 `a.start()`，状态转为 RUNNABLE；
  - 获取到 `testMethod` 方法的锁，执行 `Thread.sleep()`，状态变为 `TIMED_WATING`；
  - `sleep()` 时间到，状态变为 `RUNNABLE`（很短的时间，因为马上就终止了）；
  - 执行结束，线程变为终止状态 `TERMINATED`。
- B 的状态转换过程：
  - 执行 `a.start()`，状态转为 RUNNABLE；
  - 未获取到 `testMethod` 方法的锁，等待 A 释放锁，状态变为 `BLOCKED`;
  - A 释放锁，B 执行 `testMethod` 方法的 `Thread.sleep()`，状态变为 `TIMED_WATING`；
  - `sleep()` 时间到，状态变为 `RUNNABLE`（很短的时间，因为马上就终止了）；
  - 执行结束，线程变为终止状态 `TERMINATED`。

:::tip 思考
在 Java 中，如果主线程比子线程先结束，主线程结束后，子线程会怎么样？
:::

### WAITING <-> RUNNABLE

根据转换图我们知道有 3 个方法可以使线程从 `RUNNABLE` 状态转为 `WAITING` 状态。我们主要介绍下 `Object.wait()` 和 `Thread.join()`。

**Object.wait()**

> 调用 `wait()` 方法前线程必须持有对象的锁。
>
> 线程调用 `wait()` 方法时，会释放当前的锁，直到有其他线程调用 `notify()/notifyAll()` 方法唤醒等待锁的线程。
>
> 需要注意的是，其他线程调用 `notify()` 方法只会唤醒单个等待锁的线程，如有有多个线程都在等待这个锁的话不一定会唤醒到之前调用 `wait()` 方法的线程。
>
> 同样，调用 `notifyAll()` 方法唤醒所有等待锁的线程之后，也不一定会马上把时间片分给刚才放弃锁的那个线程，具体要看系统的调度。

**Thread.join()**

> 调用 `join()` 方法，会一直等待这个线程执行完毕（转换为 TERMINATED 状态）。 

在 上述案例的基础上，我们增加对 waiting 状态的测试

```java
@Test
@SneakyThrows
public void waitingTest() {
    Thread a = new Thread(new BlockTestRunnable(), "A");
    Thread b = new Thread(new BlockTestRunnable(), "B");
    a.start();
    // 执行 Thread.join() 方法后，会等待线程 A 全部执行完毕，即状态变为终止
    a.join();
    b.start();

    int count = 10;
    long step = 100L;
    while (true) {
        log.info("Thread A's state : {} and Thread B's state : {}", a.getState(), b.getState());
        Thread.sleep(step);
        if (count-- < 0) {
            break;
        }
    }
}
```

在 A 线程启动并调用 `a.join()` 后，主线程会等待线程 A 全部执行完毕，即线程 A 的状态变为 `TERMINATED` 后，才会执行后续的代码。

### TIMED_WAITING <-> RUNNABLE

TIMED_WAITING 与 WAITING 状态类似，只是 TIMED_WAITING 状态等待的时间是指定的。

**Thread.sleep(long)**

> 使当前线程睡眠指定时间。需要注意这里的“睡眠”只是暂时使线程停止执行，并不会释放锁。时间到后，线程会重新进入 RUNNABLE 状态。

**Object.wait(long)**

> `wait(long)` 方法使线程进入 `TIMED_WAITING` 状态。这里的 `wait(long)` 方法与无参方法 `wait()` 相同的地方是，都可以通过其他线程调用 `notify()` 或 `notifyAll()` 方法来唤醒。
>
> 不同的地方是，有参方法 wait(long) 就算其他线程不来唤醒它，经过指定时间 long 之后它会自动唤醒，拥有去争夺锁的资格。

**Thread.join(long)**

> join(long) 使当前线程执行指定时间，并且使线程进入 TIMED_WAITING 状态。

```java
@Test
    @SneakyThrows
    public void timedWaitingTest() {
        Thread a = new Thread(new BlockTestRunnable(), "A");
        Thread b = new Thread(new BlockTestRunnable(), "B");
        a.start();
        // 执行 Thread.join(long) 方法后，会等待线程 A 执行指定的时间
        a.join(500L);
        b.start();

        int count = 10;
        long step = 100L;
        while (true) {
            log.info("Thread A's state : {} and Thread B's state : {}", a.getState(), b.getState());
            Thread.sleep(step);
            if (count-- < 0) {
                break;
            }
        }
    }
```

在执行 `a.join(500L)` 后，线程 A 会先执行 500ms，然后线程 B 才会执行 `start()`。

## 创建线程的方式

### 实现 Runnable 接口<Badge text="推荐" type="tip" />

实现 `java.lang.Runnable` 接口，并重写 `run()` 方法。通过 Thread 调用 start() 方法来启动线程。

推荐使用这种方法，因为单继承、多实现，实现接口并不会影响类继承其他的类，而继承 `Thread` 接口会无法继承其他的业务类。
  
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
}
```

### 继承 Thread 类 <Badge text="不建议" type="warning" />

继承 `java.lang.Thread` 类，并重写 `run` 方法。

Thread 类是实现了 `Runnable` 接口的

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

`FutureTask` 实现了 `RunnableFuture<V>` 接口，进而实现了 `Runnable` 和 `Future<V>` 接口

```java
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

public interface RunnableFuture<V> extends Runnable, Future<V> {
    /**
     * Sets this Future to the result of its computation
     * unless it has been cancelled.
     */
    void run();
}
```

### Thread 常用方法

#### `sleep()`

使当前正在执行的线程暂停指定的毫秒数，也就是进入休眠的状态。需要注意的是，sleep 的时候要对异常进行处理。

```java
try {
    Thread.sleep(1000L); //暂停 1 秒
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

#### `join()`

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

:::tip
扩展：让主线程等待子线程执行完毕再退出的方法

1. 使用 `sleep()` 方法让主线程等待，但是不好控制需要休眠的时间；
2. 使用 `join()` 方法，让主线程等待子线程执行完毕再继续往下执行；
3. 使用 `java.util.concurrent.CountDownLatch` 统计线程数，每个线程执行完后进行 `countDown()` 操作，主线程使用 `await()` 等待计数变为 0 再往下执行；
4. 使用 `java.util.concurrent.CyclicBarrier` 同步多个线程的操作；
5. 使用线程池的 `isTerminated()` 方法，判断所有子线程是否都执行完，注意需要先执行 `shutdown()`，否则永不为 true。

:::

#### `setDaemon()`

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

<!-- ## 基础线程机制

## 线程中断

## 线程互斥同步

## 线程间的协作 -->

## 参考资料

- [Java 全栈知识体系【Java 并发 - 线程基础】](https://pdai.tech/md/java/thread/java-thread-x-thread-basic.html)
- [Java 线程的 6 种状态及切换 (透彻讲解)](https://tobebetterjavaer.com/thread/thread-state-and-method.html)
- [java 主线程等待所有子线程执行完毕再执行](https://blog.csdn.net/qq_36908872/article/details/127074466)