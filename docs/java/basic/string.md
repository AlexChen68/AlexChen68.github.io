---
title: Java String 详解
order: 2
date: 2022-09-15
---

# Java String 详解

## String 概述

String 内部使用**字符数组**实现，且 String 被声明为 `final`，不可以被继承，这意味着 value 数组初始化之后就不能再引用其它数组。并且 String 内部没有改变 value 数组的方法，因此可以保证 String 不可变。

当我们调用 String 类的任何方法（比如说 `trim()`、`substring()`、`toLowerCase()`）时，总会返回一个新的对象，而不影响之前的值。

Java 9 以前，String 是用 char 型数组实现的，之后改成了 byte 型数组实现，并增加了 `coder` 来表示编码。

:::tip
**String 不可变的优点**<Badge text="重要" type="warning" />

1. **可以缓存 hash 值**

因为 String 的 hash 值经常被使用，例如 String 用做 HashMap 的 key。不可变的特性可以使得 hash 值也不可变，因此只需要进行一次计算。

2. **String Pool 的需要**

如果一个 String 对象已经被创建过了，那么就会从 String Pool 中取得引用。只有 String 是不可变的，才可能使用 String Pool。

3. **安全性**

String 经常作为参数，String 不可变性可以保证参数不可变。例如在作为网络连接参数的情况下如果 String 是可变的，那么在网络连接过程中，String 被改变，改变 String 对象的那一方以为现在连接的是其它主机，而实际情况却不一定是。

4. **线程安全**

String 不可变性天生具备线程安全，可以在多个线程中安全地使用。
:::

## String 家族对比

| 类型          | 可变   | 线程安全                     |
| ------------- | ------ | ----------------------------|
| String        | 不可变 | 安全                         |
| StringBuilder | 可变   | 不安全                       |
| StringBuffer  | 可变   | 安全，使用 synchronized 同步 |

## `String.intern()`

使用 String.intern() 可以保证**相同内容的字符串变量引用同一的内存对象**。

下面示例中，s1 和 s2 采用 new String() 的方式新建了两个不同对象，而 s3 是通过 s1.intern() 方法取得一个对象引用。intern() 首先把 s1 引用的对象放到 String Pool(字符串常量池) 中，然后返回这个对象引用。因此 s3 和 s1 引用的是同一个字符串常量池的对象。

```java
String s1 = new String("aaa");
String s2 = new String("aaa");
System.out.println(s1 == s2);           // false
String s3 = s1.intern();
System.out.println(s1.intern() == s3);  // true
```

如果是采用 "bbb" 这种使用双引号的形式创建字符串实例，会自动地将新建的对象放入 **String Pool** 中。

```java
String s4 = "bbb";
String s5 = "bbb";
System.out.println(s4 == s5);  // true
```

## String Pool 字符串常量池

运行时常量池（Runtime Constant Pool）是虚拟机规范中是方法区的一部分，在加载类和结构到虚拟机后，就会创建对应的运行时常量池；而字符串常量池是这个过程中常量字符串的存放位置。所以从这个角度，字符串常量池属于虚拟机规范中的方法区，它是一个逻辑上的概念；而堆区，永久代以及元空间是实际的存放位置。

不同的虚拟机对虚拟机的规范（比如方法区）是不一样的，只有 HotSpot 才有永久代的概念，随着 HotSpot 的发展，在 JDK 8 中，取消了永久代，*类型信息、字段、方法、常量*保存在**本地内存的元空间**，但*字符串常量池、静态变量*仍在**堆**中。

## 参考资料

- [Java 基础 - 知识点](https://pdai.tech/md/java/basic/java-basic-lan-basic.html)