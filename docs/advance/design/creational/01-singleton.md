---
title: 单例模式
date: 2022-09-27
---

设计模式之单例模式
<!-- more -->

## 单例模式 (Singleton pattern)

- 确保一个类只有一个实例，并提供该实例的全局访问点；

- 使用一个私有构造函数、一个私有静态变量以及一个公有静态函数来实现，私有构造函数保证了不能通过构造函数来创建对象实例，只能通过公有静态函数返回唯一的私有静态变量。

**可能的问题：**

- 多线程安全和通过反射构造实例
- 通过序列化反序列化多次获取实例

**六种实现方式**

![单例模式比较](https://cdn.staticaly.com/gh/AlexChen68/OSS@master/blog/advance/compare_singleton.png)

### 懒汉式 - 线程不安全

延迟实例化，但是多线程环境下是不安全的，可能会多次实例化。

```java
public class Singleton {

    private static Singleton uniqueInstance;

    private Singleton() {}

    public static Singleton getUniqueInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}
```

### 懒汉式 - 线程安全

对获取实例的方法加锁，可以避免多次实例化，保证线程安全，但是由于锁的等待，会损耗性能。

```java
public class Singleton {

    private static Singleton uniqueInstance;

    private Singleton() {}

	public static synchronized Singleton getUniqueInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
	}
}
```

### 双重校验锁 - 线程安全

uniqueInstance 只需要被实例化一次，之后就可以直接使用了。加锁操作只需要对实例化那部分的代码进行，只有当 uniqueInstance 没有被实例化时，才需要进行加锁。

双重校验锁先判断 uniqueInstance 是否已经被实例化，如果没有被实例化，那么才对实例化语句进行加锁。

```java
public class Singleton {

    private volatile static Singleton uniqueInstance;

    private Singleton() {
    }

    public static Singleton getUniqueInstance() {
        if (uniqueInstance == null) {
            synchronized (Singleton.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

考虑下面的实现，也就是只使用了一个 if 语句。在 uniqueInstance == null 的情况下，如果两个线程同时执行 if 语句，那么两个线程就会同时进入 if 语句块内。虽然在 if 语句块内有加锁操作，但是两个线程都会执行 `uniqueInstance = new Singleton();` 这条语句，只是先后的问题，那么就会进行两次实例化，从而产生了两个实例。因此必须使用双重校验锁，也就是需要使用两个 if 语句。

```java
if (uniqueInstance == null) {
    synchronized (Singleton.class) {
        uniqueInstance = new Singleton();
    }
}
```

`uniqueInstance` 采用 `volatile` 关键字修饰也是很有必要的。`uniqueInstance = new Singleton();` 这段代码其实是分为三步执行。

1. 分配内存空间
2. 初始化对象
3. 将 `uniqueInstance` 指向分配的内存地址

但是由于 JVM 具有指令重排的特性，有可能执行顺序变为了 1>3>2，这在单线程情况下自然是没有问题。但如果是多线程下，有可能获得是一个还没有被初始化的实例，以致于程序出错。

使用 volatile` 可以禁止 JVM 的指令重排，保证在多线程环境下也能正常运行。

### 静态内部类实现

当 Singleton 类加载时，静态内部类 `SingletonHolder` 没有被加载进内存。只有当调用 `getUniqueInstance()` 方法从而触发 `SingletonHolder.INSTANCE` 时 `SingletonHolder` 才会被加载，此时初始化 INSTANCE 实例。

这种方式不仅具有延迟初始化的好处，而且 `SingletonHolder` 类是由 JVM 加载的，只会加载一遍，由虚拟机提供了对线程安全的支持。

```java
public class Singleton {

    private Singleton() {}

    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getUniqueInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

### 饿汉式 - 线程安全

直接初始化静态属性，线程安全，但是直接实例化的方式也丢失了延迟实例化带来的节约资源的好处。

```java
public class Singleton {

    private static Singleton uniqueInstance = new Singleton();

    private Singleton() {}

    public static Singleton getUniqueInstance() {
        return uniqueInstance;
    }
}

```

### 枚举实现

这是单例模式的**最佳实践**，它实现简单，并且在面对复杂的序列化或者反射攻击的时候，能够防止实例化多次。

```java
public enum Singleton {
    uniqueInstance;
}
```

Joshua Bloch 在《Effective Java》一书中写道：
> 使用枚举实现单例的方法虽然还没有广泛采用，但是单元素的枚举类型已经成为实现 Singleton 的最佳方法。

缺点：
- 不能显式继承
- 无法延迟加载

## 参考资料

- [单例模式 (Singleton pattern) - Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/2_singleton.html)
- [Java 单例模式的最佳实践？](https://vycc.cn/biancheng/2168684/)