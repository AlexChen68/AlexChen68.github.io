---
title: Java 线程状态转换
category: Concurrency
date: 2023-03-13
---


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

### 线程中断

> 在某些情况下，我们在线程启动后发现并不需要它继续执行下去时，需要中断线程。目前在 Java 里还没有安全直接的方法来停止线程，但是 Java 提供了线程中断机制来处理需要中断线程的情况。
>
> 线程中断机制是一种协作机制。需要注意，通过中断操作并不能直接终止一个线程，而是通知需要被中断的线程自行处理。

简单介绍下 Thread 类里提供的关于线程中断的几个方法：

- Thread.interrupt()：中断线程。这里的中断线程并不会立即停止线程，而是设置线程的中断状态为 true（默认是 flase）；
- Thread.currentThread().isInterrupted()：测试当前线程是否被中断。线程的中断状态受这个方法的影响，意思是调用一次使线程中断状态设置为 true，连续调用两次会使得这个线程的中断状态重新转为 false；
- Thread.isInterrupted()：测试当前线程是否被中断。与上面方法不同的是调用这个方法并不会影响线程的中断状态。

> 在线程中断机制里，当其他线程通知需要被中断的线程后，线程中断的状态被设置为 true，但是具体被要求中断的线程要怎么处理，完全由被中断线程自己而定，可以在合适的实际处理中断请求，也可以完全不处理继续执行下去。

---

## 参考资料

- [Java 线程的状态及主要转化方法](http://concurrent.redspider.group/article/01/4.html)
- [Java 全栈知识体系【Java 并发 - 线程基础】](https://pdai.tech/md/java/thread/java-thread-x-thread-basic.html)
- [Java 线程的 6 种状态及切换 (透彻讲解)](https://tobebetterjavaer.com/thread/thread-state-and-method.html)
- [java 主线程等待所有子线程执行完毕再执行](https://blog.csdn.net/qq_36908872/article/details/127074466)
