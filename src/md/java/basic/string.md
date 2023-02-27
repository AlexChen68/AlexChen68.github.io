---
title: Java String 详解
order: 3
date: 2022-09-15
category: Java
tag: String
---

介绍 String 家族及其用法
<!-- more -->
## String 概述

String 内部使用字符数组实现，且 String 被声明为 final，不可以被继承，这意味着 value 数组初始化之后就不能再引用其它数组。并且 String 内部没有改变 value 数组的方法，因此可以保证 String 不可变。

当我们调用 String 类的任何方法（比如说 `trim()`、`substring()`、`toLowerCase()`）时，总会返回一个新的对象，而不影响之前的值。

Java 9 以前，String 是用 char 型数组实现的，之后改成了 byte 型数组实现，并增加了 coder 来表示编码。

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

## StringBuilder

