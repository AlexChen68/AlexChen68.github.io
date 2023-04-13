---
title: Java 数组详解
category: Java
order: 2
date: 2023-02-25
---

## Java 数组简介

数组是一个对象，它包含了一组固定数量的元素，并且这些元素的类型是相同的。

数组会按照索引的方式将元素放在指定的位置上，意味着我们可以通过索引来访问这些元素。

在 Java 中，索引是从 0 开始的。

:::tip 为什么数组的索引从 0 开始？
Java 是基于 C/C++ 语言实现的，而 C 语言的下标是从 0 开始的，所以 Java 就继承了这个良好的传统习惯。

C 语言有一个很重要概念，叫做指针，它实际上是一个偏移量，距离开始位置的偏移量，第一个元素就在开始的位置，它的偏移量就为 0，所以索引就为 0。
:::

## 数组的创建、访问和赋值

数组元素的类型可以是基本数据类型（比如说 int、double），也可以是引用数据类型（比如说 String），包括自定义类型。

**数组的声明方式：**

```java
// 方式一（常用）
int[] arr;
// 方式二
int arr[];
```

**数组的初始化：**

```java
// 方式一：指定数组长度
int[] anArray = new int[10];

// 方式二：直接初始化数组中的元素
int anOtherArray[] = new int[] {1, 2, 3, 4, 5};
```

通过方式一创建的数组，数组中的每个元素都会被初始化为默认值，int 类型的就为 0，Object 类型的就为 null。

**数组的访问**

数组通过指定索引访问对应位置上的元素，如果索引超出数组的界限，就会抛出 `ArrayIndexOutOfBoundException`。

```java
int anOtherArray[] = new int[] {1, 2, 3, 4, 5};
for (int i = 0; i < anOtherArray.length; i++) {
    System.out.println(anOtherArray[i]);
}
```

**数组的赋值**

数组通过数组索引加 `=` 为数组相应位置的元素赋值：

```java
// 赋值 anArray 数组的第一个元素为 10
anArray[0] = 10;
```

## 可变数组

在 Java 中，可以使用**可变参数**用于将任意数量的参数传递给方法，例如：

```java
  public void test(String... args) {
    //...
  }
```
