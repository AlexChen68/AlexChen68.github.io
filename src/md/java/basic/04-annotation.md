---
title: Java 注解机制
date: 2022-09-30
category: Java
tag: annotaion
---


<!-- more -->

## Java 注解

### 什么是注解

注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。

**注解的优点**：

1. 通过使用注解，你可以将元数据保存在 Java 源代码中。
2. 简单易读的代码。
3. 编译器类型检查。
4. 使用 annotation API 为自己的注解构造处理工具。

在 `java.lang` 包中，**内置**了一些注解：

- @Override:表示当前的方法定义将覆盖基类的方法。如果你不小心拼写错误，或 者方法签名被错误拼写的时候，编译器就会发出错误提示。
- @Deprecated:如果使用该注解的元素被调用，编译器就会发出警告信息。
- @SuppressWarnings:关闭不当的编译器警告信息。
- @SafeVarargs:在 Java 7 中加入用于禁止对具有泛型 varargs 参数的方法或构造函数的调用方发出警告。
- @FunctionalInterface:Java 8 中加入用于表示类型声明为函数式接口。

此外，在 `java.lang.annotaion` 包下还有几种额外的注解类型用于创造新的注解：

- @Target 定义你的注解可以应用在哪里(例如是方法还是字段)。
- @Retention 定义了注解在哪里可用，在源代码中(SOURCE)，class 文件(CLASS)中或者是在运行时(RUNTIME)。

### 定义注解

如下是一个注解的定义。注解的定义看起来很像接口的定义。事实上，它们和其他 Java 接口一样，也会被编译成 class 文件。

```java

```